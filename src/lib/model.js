// src/lib/model.js
import * as tf from '@tensorflow/tfjs';

// Cache key para IndexedDB
const MODEL_CACHE_KEY = 'dermnet_model_cache';
const CACHE_VERSION = 'v1.0';

// Función para guardar en cache (IndexedDB)
async function saveModelToCache(modelArtifacts) {
  try {
    console.log('💾 Guardando modelo en caché...');
    const cacheData = {
      version: CACHE_VERSION,
      timestamp: Date.now(),
      artifacts: modelArtifacts
    };
    localStorage.setItem(MODEL_CACHE_KEY + '_meta', JSON.stringify({
      version: CACHE_VERSION,
      timestamp: Date.now()
    }));
    // Usar tf.io.browserLocalStorage para guardar el modelo
    await tf.io.browserLocalStorage(MODEL_CACHE_KEY).save(modelArtifacts);
    console.log('✅ Modelo guardado en caché exitosamente');
  } catch (e) {
    console.warn('⚠️ No se pudo guardar en caché:', e.message);
  }
}

// Función para cargar desde cache
async function loadModelFromCache() {
  try {
    console.log('📂 Buscando modelo en caché...');
    const meta = localStorage.getItem(MODEL_CACHE_KEY + '_meta');
    if (!meta) {
      console.log('❌ No hay caché disponible');
      return null;
    }
    
    const { version, timestamp } = JSON.parse(meta);
    if (version !== CACHE_VERSION) {
      console.log('❌ Versión de caché obsoleta');
      return null;
    }
    
    // Cache válido por 7 días
    const cacheAge = Date.now() - timestamp;
    if (cacheAge > 7 * 24 * 60 * 60 * 1000) {
      console.log('❌ Caché expirado');
      return null;
    }
    
    console.log('✅ Caché encontrado, cargando...');
    const artifacts = await tf.io.browserLocalStorage(MODEL_CACHE_KEY).load();
    console.log('✅ Modelo cargado desde caché');
    return artifacts;
  } catch (e) {
    console.warn('⚠️ Error cargando desde caché:', e.message);
    return null;
  }
}

// Función para convertir inbound_nodes de Keras 3.x a TensorFlow.js
function convertInboundNodes(nodes) {
  if (!nodes || !Array.isArray(nodes) || nodes.length === 0) {
    return [];
  }
  
  const converted = [];
  
  for (const node of nodes) {
    // Si ya es array de arrays, no convertir
    if (Array.isArray(node[0])) {
      converted.push(node);
      continue;
    }
    
    // Convertir formato Keras 3.x
    if (node.args && Array.isArray(node.args)) {
      const nodeInputs = [];
      
      for (const arg of node.args) {
        if (Array.isArray(arg)) {
          // Array de tensores (como en Add layer)
          for (const subArg of arg) {
            if (subArg?.class_name === '__keras_tensor__' && subArg.config?.keras_history) {
              nodeInputs.push(subArg.config.keras_history);
            }
          }
        } else if (arg?.class_name === '__keras_tensor__' && arg.config?.keras_history) {
          // Tensor individual
          nodeInputs.push(arg.config.keras_history);
        }
      }
      
      if (nodeInputs.length > 0) {
        converted.push(nodeInputs);
      }
    }
  }
  
  return converted;
}

// Función para procesar layers recursivamente (incluye anidados)
function fixLayersRecursive(layers) {
  return layers.map(layer => {
    // Fix 1: batch_shape → batchInputShape
    if (layer.class_name === 'InputLayer' && layer.config?.batch_shape) {
      layer.config.batchInputShape = layer.config.batch_shape;
      delete layer.config.batch_shape;
    }
    
    // Fix 2: inbound_nodes
    if (layer.inbound_nodes) {
      layer.inbound_nodes = convertInboundNodes(layer.inbound_nodes);
    }
    
    // Fix 3: Layers anidados (recursivo para Functional models)
    if (layer.config?.layers && Array.isArray(layer.config.layers)) {
      layer.config.layers = fixLayersRecursive(layer.config.layers);
    }
    
    return layer;
  });
}

export async function loadModelFrom(manifest, version) {
  // Intentar cargar desde caché primero
  const cachedArtifacts = await loadModelFromCache();
  if (cachedArtifacts) {
    console.log('🚀 Usando modelo desde caché (carga instantánea)');
    const model = await tf.loadLayersModel(tf.io.fromMemory(cachedArtifacts));
    return model;
  }
  
  const baseUrl = `/models/${version}`;
  const modelUrl = `${baseUrl}/model.json`;
  
  console.log('🔄 Cargando modelo con Keras 3.x compatibility layer v3...');
  
  // Custom HTTP IOHandler para Keras 3.x
  const customHandler = {
    async load() {
      console.log('📥 Descargando model.json...');
      const response = await fetch(modelUrl);
      const modelArtifacts = await response.json();
      
      console.log('🔧 Convirtiendo formato Keras 3.x → TensorFlow.js (recursivo)...');
      // FIX: Convertir TODOS los layers (incluidos anidados)
      if (modelArtifacts.modelTopology?.model_config?.config?.layers) {
        const layersBefore = JSON.stringify(modelArtifacts.modelTopology.model_config.config.layers).length;
        modelArtifacts.modelTopology.model_config.config.layers = 
          fixLayersRecursive(modelArtifacts.modelTopology.model_config.config.layers);
        const layersAfter = JSON.stringify(modelArtifacts.modelTopology.model_config.config.layers).length;
        console.log(`✅ Procesados ${modelArtifacts.modelTopology.model_config.config.layers.length} layers principales`);
        console.log(`📊 Tamaño topology: ${(layersBefore/1024).toFixed(1)}KB → ${(layersAfter/1024).toFixed(1)}KB`);
      }
      
      console.log('📥 Descargando weights...');
      // Cargar weights
      const weightsManifest = modelArtifacts.weightsManifest;
      const weightSpecs = [];
      const weightData = [];
      
      for (const group of weightsManifest) {
        weightSpecs.push(...group.weights);
        
        for (const path of group.paths) {
          const weightResponse = await fetch(`${baseUrl}/${path}`);
          const buffer = await weightResponse.arrayBuffer();
          weightData.push(buffer);
          console.log(`  ✓ ${path} (${(buffer.byteLength / 1024 / 1024).toFixed(1)} MB)`);
        }
      }
      
      // Concatenar todos los buffers
      const totalBytes = weightData.reduce((sum, buf) => sum + buf.byteLength, 0);
      const concatenatedBuffer = new ArrayBuffer(totalBytes);
      const concatenatedArray = new Uint8Array(concatenatedBuffer);
      
      let offset = 0;
      for (const buffer of weightData) {
        concatenatedArray.set(new Uint8Array(buffer), offset);
        offset += buffer.byteLength;
      }
      
      console.log(`✅ Weights cargados: ${(totalBytes / 1024 / 1024).toFixed(1)} MB total`);
      
      return {
        modelTopology: modelArtifacts.modelTopology,
        weightSpecs: weightSpecs,
        weightData: concatenatedBuffer,
        format: modelArtifacts.format,
        generatedBy: modelArtifacts.generatedBy,
        convertedBy: modelArtifacts.convertedBy
      };
    }
  };
  
  console.log('🧠 Deserializando modelo...');
  const model = await tf.loadLayersModel(customHandler);
  console.log('✅ Modelo cargado exitosamente con compatibility layer');
  
  // Guardar en caché para próximas cargas
  try {
    const artifacts = await customHandler.load();
    await saveModelToCache(artifacts);
  } catch (e) {
    console.warn('⚠️ No se pudo cachear el modelo:', e.message);
  }
  
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

    // Mapear top con el formato correcto
    const result = top.map(item => ({
      className: item.diseaseName || item.label || `Clase ${item.index}`,
      probability: item.prob,
      index: item.index
    }));

    // Agregar propiedades extra al array
    result.vector = vector;
    result.rois = rois;
    result.roi = rois[0] ?? { x: 0.25, y: 0.25, w: 0.5, h: 0.5 };
    
    return result;
  } finally {
    if (x) x.dispose();
    if (y && y.dispose) y.dispose();
  }
}

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
