import React from 'react';
import { LABELS } from '../../lib/labels';
import { 
  FaStethoscope, 
  FaClipboardCheck, 
  FaUserMd, 
  FaExclamationTriangle, 
  FaChartBar,
  FaDownload,
  FaSyncAlt,
  FaShieldAlt,
  FaLightbulb,
  FaMedkit
} from 'react-icons/fa';

const ResultsPanel = ({ predictions, onNewAnalysis }) => {
  if (!predictions || predictions.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 animate-fadeInUp">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-[#082543] to-[#4C2D4D] rounded-xl flex items-center justify-center">
            <FaChartBar className="text-white w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-[#082543] font-serif">
            Resultados del Análisis
          </h3>
        </div>
        
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#082543]/10 to-[#258CAB]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaStethoscope className="w-6 h-6 text-[#082543]/40" />
          </div>
          <p className="text-[#082543]/60 font-medium">Realice un análisis para ver los resultados</p>
          <p className="text-[#082543]/40 text-sm mt-1">Suba una imagen o use la cámara para comenzar</p>
        </div>
      </div>
    );
  }

  const topPrediction = predictions[0];
  const otherPredictions = predictions.slice(1);

  const getConfidenceConfig = (prob) => {
    if (prob > 0.7) return {
      color: 'text-[#258CAB]',
      barColor: 'bg-[#258CAB]',
      bgColor: 'from-[#258CAB]/10 to-[#082543]/5',
      borderColor: 'border-[#258CAB]/30',
      level: 'Alta Confianza',
      icon: <FaClipboardCheck className="w-4 h-4" />
    };
    if (prob > 0.4) return {
      color: 'text-[#F15F79]',
      barColor: 'bg-[#F15F79]',
      bgColor: 'from-[#F15F79]/10 to-[#4C2D4D]/5',
      borderColor: 'border-[#F15F79]/30',
      level: 'Confianza Moderada',
      icon: <FaUserMd className="w-4 h-4" />
    };
    return {
      color: 'text-[#4C2D4D]',
      barColor: 'bg-[#4C2D4D]',
      bgColor: 'from-[#4C2D4D]/10 to-[#082543]/5',
      borderColor: 'border-[#4C2D4D]/30',
      level: 'Baja Confianza',
      icon: <FaExclamationTriangle className="w-4 h-4" />
    };
  };

  const topConfig = getConfidenceConfig(topPrediction.prob);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-6 animate-fadeInUp">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#F15F79] to-[#4C2D4D] rounded-xl flex items-center justify-center">
            <FaChartBar className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#082543] font-serif">
              Resultados del Análisis
            </h3>
            <p className="text-[#082543]/60 text-sm">Diagnóstico basado en IA educativa</p>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${topConfig.color} bg-white/80 backdrop-blur-sm border ${topConfig.borderColor}`}>
          {topConfig.icon}
          <span>{topConfig.level}</span>
        </div>
      </div>

      {/* Predicción Principal Mejorada */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-[#082543] text-sm uppercase tracking-wide">Diagnóstico Principal</h4>
          <span className={`text-lg font-bold ${topConfig.color}`}>
            {(topPrediction.prob * 100).toFixed(1)}%
          </span>
        </div>
        
        <div className={`bg-gradient-to-r ${topConfig.bgColor} rounded-xl p-4 border ${topConfig.borderColor} backdrop-blur-sm transition-all duration-500 hover:shadow-lg`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1">
              <h5 className="font-bold text-[#082543] text-lg leading-tight">
                {LABELS[topPrediction.index]}
              </h5>
              <p className="text-[#082543]/70 text-sm mt-1 flex items-center space-x-1">
                <FaLightbulb className="w-3 h-3" />
                <span>{topConfig.level}</span>
              </p>
            </div>
            <div className="text-3xl ml-4">
              {getDiseaseIcon(topPrediction.index)}
            </div>
          </div>
          
          {/* Barra de Confianza Mejorada */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-[#082543]/60">
              <span>0%</span>
              <span>Confianza del Modelo</span>
              <span>100%</span>
            </div>
            <div className="w-full bg-[#082543]/10 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-3 rounded-full ${topConfig.barColor} shadow-lg transition-all duration-1000 ease-out`}
                style={{ width: `${topPrediction.prob * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Otras Posibilidades Mejoradas */}
      {otherPredictions.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-[#082543] mb-3 text-sm uppercase tracking-wide flex items-center space-x-2">
            <FaMedkit className="w-3 h-3 text-[#258CAB]" />
            <span>Otras Posibilidades</span>
          </h4>
          <div className="space-y-2">
            {otherPredictions.map((pred, index) => {
              const predConfig = getConfidenceConfig(pred.prob);
              return (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 hover:border-[#082543]/10 transition-all duration-300 group hover:scale-105 hover:shadow-md"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="text-2xl">
                      {getDiseaseIcon(pred.index)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-[#082543] text-sm truncate">
                        {LABELS[pred.index]}
                      </div>
                      <div className="text-xs text-[#082543]/60">
                        {(pred.prob * 100).toFixed(1)}% de probabilidad
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-12 bg-[#082543]/10 rounded-full h-1.5 ml-2">
                    <div 
                      className={`h-1.5 rounded-full ${predConfig.barColor} transition-all duration-500`}
                      style={{ width: `${pred.prob * 100}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recomendaciones Mejoradas */}
      <div className="mb-6 pt-4 border-t border-[#082543]/10">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-[#258CAB] to-[#082543] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
            <FaUserMd className="text-white w-3 h-3" />
          </div>
          <div>
            <h4 className="font-semibold text-[#082543] mb-2 text-sm">
              Recomendación Profesional
            </h4>
            <p className="text-[#082543]/80 text-sm leading-relaxed">
              {topPrediction.prob > 0.7 
                ? "Alta confianza en el diagnóstico educativo. Se recomienda consulta con especialista para confirmación clínica y tratamiento adecuado."
                : topPrediction.prob > 0.4
                ? "Confianza moderada. Se sugiere evaluación profesional adicional y posiblemente nuevas imágenes desde diferentes ángulos."
                : "Baja confianza. Se recomienda nueva imagen con mejor iluminación o consulta directa con dermatólogo certificado."
              }
            </p>
          </div>
        </div>
      </div>

      {/* Acciones Mejoradas */}
      <div className="flex space-x-3 mb-4">
        <button className="flex-1 bg-gradient-to-r from-[#F15F79] to-[#4C2D4D] text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 font-semibold">
          <FaDownload className="w-4 h-4" />
          <span>Guardar Resultado</span>
        </button>
        <button 
          onClick={onNewAnalysis}
          className="flex-1 border border-[#082543] text-[#082543] py-3 px-4 rounded-xl hover:bg-[#082543] hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 font-semibold"
        >
          <FaSyncAlt className="w-4 h-4" />
          <span>Nuevo Análisis</span>
        </button>
      </div>

      {/* Disclaimer Mejorado */}
      <div className="bg-gradient-to-r from-[#082543]/5 to-[#258CAB]/5 rounded-xl p-3 border border-[#082543]/10">
        <div className="flex items-start space-x-2">
          <FaShieldAlt className="w-4 h-4 text-[#258CAB] mt-0.5 flex-shrink-0" />
          <p className="text-[#082543]/60 text-xs leading-relaxed">
            <strong className="text-[#082543]">⚠️ Propósito Educativo:</strong> Este sistema utiliza inteligencia artificial con fines exclusivamente educativos. No sustituye el diagnóstico médico profesional. Consulte siempre con dermatólogos certificados.
          </p>
        </div>
      </div>
    </div>
  );
};

// Función auxiliar mejorada para obtener iconos
const getDiseaseIcon = (index) => {
  const icons = ['🟤', '⚫', '🔴', '🟣', '🔵', '⚪', '🔵', '🟤', '🟢', '🟡'];
  return icons[index] || '🔘';
};

export default ResultsPanel;