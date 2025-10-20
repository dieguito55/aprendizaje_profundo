// src/lib/model.js
import * as tf from '@tensorflow/tfjs';

export async function loadModelFrom(manifest, version) {
  const url = `/models/${version}/model.json`;
  const model = await tf.loadLayersModel(url);
  return model;
}

export function preprocess(imgEl) {
  return tf.tidy(() => {
    let t = tf.browser.fromPixels(imgEl).resizeBilinear([224, 224]).toFloat();
    t = t.div(255).expandDims(0);
    return t;
  });
}

export function topK(values, k = 5, labels = []) {
  const arr = Array.isArray(values) ? values : values.dataSync ? values.dataSync() : Array.from(values);
  return arr.map((p, i) => ({ index: i, prob: p, diseaseName: labels[i] || `Clase ${i}` }))
            .sort((a,b)=>b.prob-a.prob)
            .slice(0, k);
}

export async function processPrediction(predTensor, k = 3, labels = []) {
  let probs = predTensor.softmax ? predTensor.softmax() : predTensor;
  const arr = await probs.data();
  if (probs !== predTensor && probs.dispose) probs.dispose();
  return topK(arr, k, labels);
}

export async function predictComplete(model, imageElement, k = 3, labels = []) {
  let x=null, y=null;
  try {
    x = preprocess(imageElement);
    y = model.predict(x);
    const results = await processPrediction(y, k, labels);
    return results;
  } finally {
    if (x) x.dispose();
    if (y) y.dispose();
  }
}
