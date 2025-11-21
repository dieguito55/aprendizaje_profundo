import React from 'react';
import { 
  FaBrain, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaChartLine,
  FaSyncAlt,
  FaFileExport,
  FaAward,
  FaInfoCircle,
  FaImage
} from 'react-icons/fa';
import { DISEASES_DATA } from '../../data/diseases';

// Función helper para obtener el ID de la enfermedad por nombre
const getDiseaseIdByName = (diseaseName) => {
  if (!diseaseName) return 0;
  
  const disease = DISEASES_DATA.find(d => 
    d.name.toLowerCase().includes(diseaseName.toLowerCase()) ||
    diseaseName.toLowerCase().includes(d.name.toLowerCase())
  );
  
  return disease ? disease.id : 0;
};

const ResultsPanel = ({ predictions, onNewAnalysis }) => {
    if (!predictions || !Array.isArray(predictions) || predictions.length === 0) {
    return null;
  }

  const topPrediction = predictions[0];
  
  if (!topPrediction || typeof topPrediction.probability === 'undefined') {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
        <FaExclamationTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
        <p className="text-sm text-red-700 font-semibold">Error en los resultados</p>
      </div>
    );
  }

  const confidence = (topPrediction.probability * 100).toFixed(1);
  const confidenceNum = parseFloat(confidence);

  const getConfidenceLevel = (conf) => {
    const num = parseFloat(conf);
    if (isNaN(num)) return { label: 'Error', color: '#EF4444', icon: FaExclamationTriangle };
    if (num >= 90) return { label: 'Muy Alta', color: '#A8D32C', icon: FaAward };
    if (num >= 75) return { label: 'Alta', color: '#A8D32C', icon: FaCheckCircle };
    if (num >= 60) return { label: 'Moderada', color: '#F59E0B', icon: FaChartLine };
    return { label: 'Baja', color: '#EF4444', icon: FaExclamationTriangle };
  };

  const confidenceLevel = getConfidenceLevel(confidence);
  const ConfidenceIcon = confidenceLevel.icon;

  return (
    <div className="space-y-4">
      {/* Card Principal - Compacto */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg border-2 overflow-hidden" 
           style={{ borderColor: '#A8D32C' }}>
        
        {/* Header Compacto */}
        <div className="bg-gradient-to-r from-[#A8D32C]/10 to-white p-4 border-b" 
             style={{ borderColor: '#A8D32C' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md" 
                 style={{ backgroundColor: '#A8D32C' }}>
              <FaBrain className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white truncate" 
                  style={{ fontFamily: 'Poppins, sans-serif' }}>
                Resultado IA
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500">
                MobileNetV2 • TensorFlow.js
              </p>
            </div>
            <div className="hidden sm:block px-2 py-1 bg-[#C5E86C]/20 rounded-full">
              <span className="text-xs font-bold text-[#8ab824]">Activo</span>
            </div>
          </div>
        </div>

        {/* Cuerpo Compacto */}
        <div className="p-4 space-y-4">
          
          {/* Diagnóstico Principal - Más Pequeño */}
          <div className="bg-[#A8D32C]/10 rounded-lg p-4 border-2" 
               style={{ borderColor: '#A8D32C' }}>
            <p className="text-xs font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 mb-1">
              Diagnóstico Principal
            </p>
            <h4 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white break-words" 
                style={{ fontFamily: 'Poppins, sans-serif' }}>
              {topPrediction.className || 'No disponible'}
            </h4>
          </div>

          {/* Imagen de Referencia de la Enfermedad */}
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2 mb-3">
              <FaImage className="w-4 h-4 text-[#A8D32C]" />
              <p className="text-xs font-bold uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
                Imagen de Referencia
              </p>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-700">
              <img 
                src={`/images/diseases/${getDiseaseIdByName(topPrediction.className)}.jpg`}
                alt={topPrediction.className}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/images/diseases/0.jpg';
                }}
              />
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 text-center">
              Imagen médica de referencia: {topPrediction.className}
            </p>
          </div>

          {/* Confianza - Compacto y Responsive */}
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" 
                     style={{ backgroundColor: confidenceLevel.color }}>
                  <ConfidenceIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 dark:text-neutral-500">Confianza</p>
                  <p className="text-sm font-bold" style={{ color: confidenceLevel.color }}>
                    {confidenceLevel.label}
                  </p>
                </div>
              </div>
              
              <div className="text-right sm:text-left">
                <p className="text-3xl font-bold" style={{ color: confidenceLevel.color }}>
                  {confidence}%
                </p>
              </div>
            </div>
            
            {/* Barra de progreso */}
            <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden">
              <div 
                className="h-3 rounded-full transition-all duration-1000"
                style={{ 
                  width: `${confidenceNum}%`,
                  backgroundColor: confidenceLevel.color
                }}
              />
            </div>

            {/* Interpretación Compacta */}
            <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 mt-2 leading-relaxed">
              {confidenceNum >= 90 && '✓ Excelente confianza en el diagnóstico'}
              {confidenceNum >= 75 && confidenceNum < 90 && '✓ Alta confiabilidad'}
              {confidenceNum >= 60 && confidenceNum < 75 && '⚠ Confianza moderada'}
              {confidenceNum < 60 && '⚠ Confianza baja, consulte profesional'}
            </p>
          </div>

          {/* Diagnósticos Alternativos - Compactos */}
          {predictions.length > 1 && (
            <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2" 
                  style={{ fontFamily: 'Poppins, sans-serif' }}>
                <FaInfoCircle className="w-4 h-4" style={{ color: '#A8D32C' }} />
                Alternativas
              </h4>
              
              <div className="space-y-2">
                {predictions.slice(1, 4).map((pred, idx) => {
                  const altConfidence = (pred.probability * 100).toFixed(1);
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-neutral-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">{idx + 2}</span>
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
                          {pred.className || `Clase ${idx + 1}`}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                            <div 
                              className="h-1.5 rounded-full transition-all duration-700" 
                              style={{ 
                                width: `${altConfidence}%`,
                                backgroundColor: '#A8D32C',
                                opacity: 0.6
                              }}
                            />
                          </div>
                          <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 w-12 text-right">
                            {altConfidence}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Advertencia Compacta */}
          <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
            <div className="flex items-start gap-2">
              <FaExclamationTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <strong>Importante:</strong> Resultado educativo únicamente. 
                No reemplaza diagnóstico médico profesional.
              </p>
            </div>
          </div>

          {/* Info Modelo Compacta */}
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-neutral-600 dark:text-neutral-400 dark:text-neutral-500">Clases:</span>
                <p className="font-bold text-neutral-900 dark:text-white">
                  {predictions.vector?.length || 23}
                </p>
              </div>
              <div>
                <span className="text-neutral-600 dark:text-neutral-400 dark:text-neutral-500">Precisión:</span>
                <p className="font-bold text-neutral-900 dark:text-white">94.5%</p>
              </div>
            </div>
          </div>

          {/* Botones Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            <button
              onClick={onNewAnalysis}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-sm text-white transition-all duration-200 hover:shadow-lg dark:hover:shadow-neutral-900/50 active:scale-95"
              style={{ backgroundColor: '#A8D32C' }}
            >
              <FaSyncAlt className="w-4 h-4" />
              <span>Nuevo Análisis</span>
            </button>
            
            <button
              onClick={() => {
                const data = {
                  diagnosis: topPrediction.className,
                  confidence: confidence,
                  date: new Date().toISOString()
                };
                console.log('Exportar:', data);
                alert('Funcionalidad de exportación en desarrollo');
              }}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white dark:bg-neutral-900 border-2 border-neutral-300 hover:border-[#A8D32C] text-neutral-700 dark:text-neutral-300 hover:text-[#A8D32C] font-bold text-sm transition-all duration-200 hover:shadow-md active:scale-95"
            >
              <FaFileExport className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;
