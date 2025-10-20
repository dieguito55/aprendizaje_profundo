import * as tf from '@tensorflow/tfjs';
import { LABELS } from './labels';

export async function loadModel() {
  try {
    const model = await tf.loadLayersModel('/models/v1.0/model.json');
    console.log('✅ Modelo cargado exitosamente');
    return model;
  } catch (error) {
    console.error('❌ Error cargando modelo:', error);
    try {
      const model = await tf.loadLayersModel('/model.json');
      console.log('✅ Modelo cargado desde fallback');
      return model;
    } catch (fallbackError) {
      console.error('❌ Fallback también falló:', fallbackError);
      throw new Error('No se pudo cargar el modelo en ninguna ubicación');
    }
  }
}

export function preprocess(imgEl) {
  return tf.tidy(() => {
    let tensor = tf.browser.fromPixels(imgEl)
      .resizeBilinear([224, 224])
      .toFloat();
    
    tensor = tensor.div(255.0);
    tensor = tensor.expandDims(0);
    
    return tensor;
  });
}

export function topK(probs, k = 5) {
  const values = Array.isArray(probs) ? probs : 
                probs.dataSync ? probs.dataSync() : 
                Array.from(probs);
  
  const indexedProbs = values.map((prob, index) => ({ 
    index, 
    prob,
    diseaseName: LABELS[index] || `Enfermedad ${index}`
  }));
  
  const sorted = indexedProbs.sort((a, b) => b.prob - a.prob);
  return sorted.slice(0, k);
}

// Función mejorada SIN tidy() para evitar el warning
export async function processPrediction(predictionTensor, k = 3) {
  try {
    // Aplicar softmax si es necesario
    let probabilities = predictionTensor;
    if (predictionTensor.softmax && typeof predictionTensor.softmax === 'function') {
      probabilities = predictionTensor.softmax();
    }
    
    // Obtener los datos como array - SIN tidy ya que es async
    const probsArray = await probabilities.data();
    
    // Usar topK con el array
    const results = topK(probsArray, k);
    
    // Limpiar tensores manualmente
    if (probabilities !== predictionTensor) {
      probabilities.dispose();
    }
    
    return results;
  } catch (error) {
    console.error('Error procesando predicción:', error);
    
    // Limpiar tensores en caso de error
    if (predictionTensor && predictionTensor.dispose) {
      predictionTensor.dispose();
    }
    
    return [];
  }
}

// Función completa de predicción que maneja todo el proceso
export async function predictComplete(model, imageElement, k = 3) {
  let tensor = null;
  let prediction = null;
  
  try {
    // 1. Preprocesar (esto usa tidy internamente)
    tensor = preprocess(imageElement);
    console.log('✅ Tensor preprocesado:', tensor.shape);
    
    // 2. Realizar predicción
    prediction = model.predict(tensor);
    console.log('✅ Predicción realizada:', prediction.shape);
    
    // 3. Procesar resultados
    const results = await processPrediction(prediction, k);
    console.log('✅ Resultados obtenidos:', results.length, 'predicciones');
    
    return results;
    
  } finally {
    // 4. Limpiar tensores (IMPORTANTE para evitar memory leaks)
    if (tensor) {
      tensor.dispose();
      console.log('🧹 Tensor de entrada liberado');
    }
    if (prediction) {
      prediction.dispose();
      console.log('🧹 Tensor de predicción liberado');
    }
  }
}

// Función utilitaria para limpiar memoria
export function cleanup() {
  tf.disposeVariables();
  console.log('🧹 Memoria de TensorFlow limpiada');
}