// src/lib/model.js
import * as tf from '@tensorflow/tfjs';

export async function loadModelFrom(manifest, version) {
  const url = `/models/${version}/model.json`;
  const model = await tf.loadLayersModel(url);
  return model;
}

// Detecta si el modelo ya incluye Rescaling(1./255)
function modelHasRescaling(model) {
  try {
    return !!model?.layers?.some(
      (l) => l?.getClassName?.().toLowerCase().includes('rescaling')
    );
  } catch {
    return false;
  }
}

export function preprocess(imgEl, { size = 224, normalize = true } = {}) {
  return tf.tidy(() => {
    let t = tf.browser.fromPixels(imgEl).toFloat();
    t = tf.image.resizeBilinear(t, [size, size]);
    if (normalize) t = t.div(255);
    return t.expandDims(0); // [1,H,W,3]
  });
}

export function topK(values, k = 5, labels = []) {
  const arr = Array.isArray(values)
    ? values
    : values.dataSync
    ? Array.from(values.dataSync())
    : Array.from(values);

  return arr
    .map((p, i) => ({
      index: i,
      prob: p,
      diseaseName: labels[i] || `Clase ${i}`,
      label: labels[i] || `Clase ${i}`,
    }))
    .sort((a, b) => b.prob - a.prob)
    .slice(0, k);
}

export async function processPrediction(predTensor, k = 3, labels = []) {
  const probsT = predTensor.softmax ? predTensor.softmax() : predTensor;
  const arr = await probsT.data();
  if (probsT !== predTensor && probsT.dispose) probsT.dispose();

  return {
    top: topK(arr, k, labels),
    vector: Array.from(arr),
  };
}

/**
 * Calcula múltiples ROIs (cuadros) a partir de un mapa de saliencia
 * para la clase superior: umbral por percentil y componentes conexas.
 * Devuelve {x,y,w,h} normalizados en [0..1].
 */
async function computeRoisWithSaliency(
  model,
  x,
  classIndex,
  { maxRois = 3, thrPercentile = 0.85, minBoxPx = 10 } = {}
) {
  const gradFn = tf.grad((inp) => {
    const logits = model.predict(inp);          // [1,C] o [1,*,C]
    const squeezed = logits.squeeze();          // [C]
    const score = squeezed.gather(classIndex);  // escalar
    return score;
  });

  let grads, saliency;
  try {
    grads = gradFn(x);                           // [1,H,W,3]
    saliency = grads.abs().mean(-1).squeeze();   // [H,W]
  } catch {
    return [{ x: 0.2, y: 0.2, w: 0.6, h: 0.6 }];
  } finally {
    if (grads) grads.dispose();
  }

  const heat = await saliency.array();           // [[...], ...]
  saliency.dispose();

  const H = heat.length;
  const W = heat[0]?.length ?? 0;
  if (!H || !W) return [{ x: 0.2, y: 0.2, w: 0.6, h: 0.6 }];

  // Normalizar a [0,1]
  let minV = Infinity, maxV = -Infinity;
  for (let r = 0; r < H; r++) {
    for (let c = 0; c < W; c++) {
      const v = heat[r][c];
      if (v < minV) minV = v;
      if (v > maxV) maxV = v;
    }
  }
  const norm = heat.map(row =>
    row.map(v => (v - minV) / (maxV - minV + 1e-8))
  );

  // Umbral por percentil
  const flat = norm.flat().sort((a, b) => a - b);
  const thr = flat[Math.floor(thrPercentile * flat.length)] ?? 0.6;

  // Componentes conexas (4-neighborhood)
  const visited = Array.from({ length: H }, () => Array(W).fill(false));
  const rois = [];

  const inBounds = (r, c) => r >= 0 && r < H && c >= 0 && c < W;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

  for (let r = 0; r < H; r++) {
    for (let c = 0; c < W; c++) {
      if (!visited[r][c] && norm[r][c] >= thr) {
        let queue = [[r, c]];
        visited[r][c] = true;

        let rMin = r, rMax = r, cMin = c, cMax = c;
        let sum = 0, cnt = 0;

        while (queue.length) {
          const [rr, cc] = queue.pop();
          const val = norm[rr][cc];
          sum += val; cnt++;

          if (rr < rMin) rMin = rr;
          if (rr > rMax) rMax = rr;
          if (cc < cMin) cMin = cc;
          if (cc > cMax) cMax = cc;

          for (const [dr, dc] of dirs) {
            const nr = rr + dr, nc = cc + dc;
            if (inBounds(nr, nc) && !visited[nr][nc] && norm[nr][nc] >= thr) {
              visited[nr][nc] = true;
              queue.push([nr, nc]);
            }
          }
        }

        const wPx = (cMax - cMin + 1);
        const hPx = (rMax - rMin + 1);
        const areaPx = wPx * hPx;
        const minPx = Math.max(1, minBoxPx);

        // Filtra manchas muy pequeñas
        if (wPx >= minPx && hPx >= minPx) {
          const avg = sum / Math.max(1, cnt);
          rois.push({ rMin, rMax, cMin, cMax, score: avg * areaPx });
        }
      }
    }
  }

  if (!rois.length) {
    return [{ x: 0.2, y: 0.2, w: 0.6, h: 0.6 }];
  }

  // Ordenar por "importancia" (área * saliencia media)
  rois.sort((a, b) => b.score - a.score);

  // Convertir a normalizado y recortar top-N
  const out = rois.slice(0, maxRois).map((b) => {
    const x0 = b.cMin / W;
    const y0 = b.rMin / H;
    const w = Math.max(0.02, (b.cMax - b.cMin + 1) / W);
    const h = Math.max(0.02, (b.rMax - b.rMin + 1) / H);
    return {
      x: clamp(x0, 0, 1),
      y: clamp(y0, 0, 1),
      w: clamp(w, 0, 1),
      h: clamp(h, 0, 1),
    };
  });

  return out;
}

/**
 * Devuelve:
 *   - array topK (igual que antes)
 *   - props extra:
 *       .vector -> vector completo de probabilidades
 *       .rois   -> Array<{x,y,w,h}> normalizados (0..1)
 *       .roi    -> primer ROI (compatibilidad)
 */
export async function predictComplete(model, imageElement, k = 3, labels = []) {
  let x = null, y = null;
  try {
    const hasResc = modelHasRescaling(model);
    x = preprocess(imageElement, { size: 224, normalize: !hasResc });
    y = model.predict(x);

    const { top, vector } = await processPrediction(y, k, labels);
    const classIndex = top?.[0]?.index ?? 0;

    const rois = await computeRoisWithSaliency(model, x, classIndex, {
      maxRois: 3,
      thrPercentile: 0.85,
      minBoxPx: 10,
    });

    const out = top;
    out.vector = vector;
    out.rois = rois;
    out.roi = rois[0] ?? { x: 0.25, y: 0.25, w: 0.5, h: 0.5 };
    return out;
  } finally {
    if (x) x.dispose();
    if (y && y.dispose) y.dispose();
  }
}

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
