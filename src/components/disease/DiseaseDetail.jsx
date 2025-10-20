import React from 'react';
import { 
  FaTimes, 
  FaSkullCrossbones, 
  FaShieldAlt, 
  FaStethoscope, 
  FaMedkit, 
  FaHeartbeat,
  FaExclamationTriangle,
  FaUserMd,
  FaChartLine,
  FaCheckCircle,
  FaRegClock
} from 'react-icons/fa';

const DiseaseDetail = ({ disease, onClose }) => {
  if (!disease) return null;

  const getSeverityConfig = (severity) => {
    const configs = {
      'Alta': { 
        color: 'from-[#F15F79] to-[#4C2D4D]',
        bg: 'bg-gradient-to-r from-[#F15F79] to-[#4C2D4D]',
        icon: <FaExclamationTriangle className="w-4 h-4" />
      },
      'Moderada-Alta': { 
        color: 'from-[#F15F79] to-[#258CAB]',
        bg: 'bg-gradient-to-r from-[#F15F79] to-[#258CAB]',
        icon: <FaExclamationTriangle className="w-4 h-4" />
      },
      'Moderada': { 
        color: 'from-[#258CAB] to-[#4C2D4D]',
        bg: 'bg-gradient-to-r from-[#258CAB] to-[#4C2D4D]',
        icon: <FaHeartbeat className="w-4 h-4" />
      },
      'Leve-Moderada': { 
        color: 'from-[#258CAB] to-[#082543]',
        bg: 'bg-gradient-to-r from-[#258CAB] to-[#082543]',
        icon: <FaHeartbeat className="w-4 h-4" />
      },
      'Leve': { 
        color: 'from-[#082543] to-[#258CAB]',
        bg: 'bg-gradient-to-r from-[#082543] to-[#258CAB]',
        icon: <FaShieldAlt className="w-4 h-4" />
      },
      'Muy Baja': { 
        color: 'from-gray-400 to-gray-600',
        bg: 'bg-gradient-to-r from-gray-400 to-gray-600',
        icon: <FaShieldAlt className="w-4 h-4" />
      }
    };
    return configs[severity] || configs['Muy Baja'];
  };

  const severityConfig = getSeverityConfig(disease.severity);

  return (
    <div className="fixed inset-0 bg-[#082543]/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="
        bg-white/95 backdrop-blur-lg rounded-3xl 
        max-w-6xl max-h-[95vh] overflow-y-auto w-full
        shadow-2xl shadow-[#082543]/20
        border border-white/20
        animate-scaleIn
      ">
        {/* Header Mejorado */}
        <div className="sticky top-0 bg-gradient-to-r from-[#082543] to-[#4C2D4D] text-white p-8 rounded-t-3xl z-10">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-6 flex-1">
              <div className="relative">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-sm">
                  <span className="text-3xl text-white">{disease.icon}</span>
                </div>
                <div className="absolute -inset-2 bg-white/10 rounded-2xl blur-sm"></div>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold font-serif tracking-tight">
                  {disease.name}
                </h2>
                <p className="text-white/80 italic text-lg mt-1">
                  {disease.scientificName}
                </p>
                <div className="flex items-center space-x-3 mt-3">
                  <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold ${severityConfig.bg} text-white shadow-lg`}>
                    {severityConfig.icon}
                    <span>{disease.severity}</span>
                  </span>
                  {disease.contagious && (
                    <span className="inline-flex items-center space-x-2 px-4 py-2 bg-[#F15F79] rounded-full text-sm font-semibold text-white shadow-lg">
                      <FaSkullCrossbones className="w-3 h-3" />
                      <span>Contagioso</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="
                text-white/80 hover:text-white 
                text-2xl p-3 hover:bg-white/10 
                rounded-xl transition-all duration-300
                backdrop-blur-sm
                hover:scale-110
              "
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-10">
          {/* Descripción Completa */}
          <section className="animate-fadeInUp" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-[#F15F79] to-[#258CAB] rounded-full"></div>
              <h3 className="text-2xl font-bold text-[#082543] font-serif">
                Descripción Clínica
              </h3>
            </div>
            <p className="text-[#082543]/90 leading-relaxed text-lg bg-white/50 p-6 rounded-2xl border border-[#082543]/10 backdrop-blur-sm">
              {disease.description}
            </p>
          </section>

          {/* Información Rápida Mejorada */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <div className="bg-gradient-to-br from-white to-white/80 p-6 rounded-2xl shadow-lg border border-white/20 backdrop-blur-sm group hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-[#F15F79] to-[#4C2D4D] rounded-lg">
                  <FaExclamationTriangle className="text-white w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-[#082543]/70">Severidad</h4>
              </div>
              <p className="text-xl font-bold text-[#082543]">{disease.severity}</p>
            </div>

            <div className="bg-gradient-to-br from-white to-white/80 p-6 rounded-2xl shadow-lg border border-white/20 backdrop-blur-sm group hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-[#258CAB] to-[#082543] rounded-lg">
                  <FaChartLine className="text-white w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-[#082543]/70">Prevalencia</h4>
              </div>
              <p className="text-xl font-bold text-[#082543]">{disease.prevalence}</p>
            </div>

            <div className="bg-gradient-to-br from-white to-white/80 p-6 rounded-2xl shadow-lg border border-white/20 backdrop-blur-sm group hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-[#F15F79] to-[#258CAB] rounded-lg">
                  <FaSkullCrossbones className="text-white w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-[#082543]/70">Contagioso</h4>
              </div>
              <p className={`text-xl font-bold ${disease.contagious ? 'text-[#F15F79]' : 'text-[#258CAB]'}`}>
                {disease.contagious ? 'Sí' : 'No'}
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-white/80 p-6 rounded-2xl shadow-lg border border-white/20 backdrop-blur-sm group hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-[#4C2D4D] to-[#082543] rounded-lg">
                  <FaUserMd className="text-white w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-[#082543]/70">Especialidad</h4>
              </div>
              <p className="text-xl font-bold text-[#082543]">{disease.specialty}</p>
            </div>
          </div>

          {/* Síntomas Completos Mejorados */}
          <section className="animate-fadeInUp" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-[#F15F79] to-[#258CAB] rounded-full"></div>
              <h3 className="text-2xl font-bold text-[#082543] font-serif">
                Síntomas y Signos Clínicos
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {disease.symptoms.map((symptom, index) => (
                <div 
                  key={index} 
                  className="
                    flex items-start space-x-4 p-4 
                    bg-gradient-to-br from-white to-white/80 
                    rounded-xl border border-white/20 
                    shadow-lg backdrop-blur-sm
                    hover:shadow-xl transition-all duration-300
                    group
                  "
                  style={{ animationDelay: `${400 + index * 50}ms` }}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-[#F15F79] to-[#258CAB] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[#082543]/90 leading-relaxed group-hover:translate-x-1 transition-transform duration-300">
                    {symptom}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Tratamientos Mejorados */}
          <section className="animate-fadeInUp" style={{ animationDelay: '500ms' }}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-[#258CAB] to-[#4C2D4D] rounded-full"></div>
              <h3 className="text-2xl font-bold text-[#082543] font-serif">
                Opciones de Tratamiento
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {disease.treatments.map((treatment, index) => (
                <div 
                  key={index} 
                  className="
                    flex items-center space-x-4 p-4
                    bg-gradient-to-br from-white to-white/80
                    rounded-xl border border-white/20
                    shadow-lg backdrop-blur-sm
                    hover:shadow-xl transition-all duration-300
                    group
                  "
                >
                  <div className="p-2 bg-gradient-to-r from-[#258CAB] to-[#4C2D4D] rounded-lg">
                    <FaMedkit className="text-white w-4 h-4" />
                  </div>
                  <span className="text-[#082543]/90 font-medium flex-1">
                    {treatment}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Prevención Mejorada */}
          <section className="animate-fadeInUp" style={{ animationDelay: '600ms' }}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-[#4C2D4D] to-[#082543] rounded-full"></div>
              <h3 className="text-2xl font-bold text-[#082543] font-serif">
                Medidas Preventivas
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {disease.prevention.map((measure, index) => (
                <div 
                  key={index} 
                  className="
                    flex items-start space-x-4 p-4
                    bg-gradient-to-br from-[#258CAB]/10 to-[#082543]/5
                    rounded-xl border border-[#258CAB]/20
                    shadow-lg backdrop-blur-sm
                    hover:shadow-xl transition-all duration-300
                    group
                  "
                >
                  <div className="p-2 bg-gradient-to-r from-[#258CAB] to-[#082543] rounded-lg">
                    <FaShieldAlt className="text-white w-4 h-4" />
                  </div>
                  <span className="text-[#082543]/90 leading-relaxed">
                    {measure}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Factores de Riesgo Mejorados */}
          {disease.riskFactors && (
            <section className="animate-fadeInUp" style={{ animationDelay: '700ms' }}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-[#F15F79] to-[#4C2D4D] rounded-full"></div>
                <h3 className="text-2xl font-bold text-[#082543] font-serif">
                  Factores de Riesgo
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {disease.riskFactors.map((factor, index) => (
                  <span
                    key={index}
                    className="
                      inline-flex items-center space-x-2 
                      px-4 py-2 
                      bg-gradient-to-r from-[#F15F79] to-[#4C2D4D]
                      text-white rounded-full 
                      text-sm font-semibold
                      shadow-lg hover:shadow-xl
                      transition-all duration-300
                      hover:scale-105
                    "
                  >
                    <FaExclamationTriangle className="w-3 h-3" />
                    <span>{factor}</span>
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Información Adicional Mejorada */}
          {disease.survivalRate && (
            <section className="animate-fadeInUp" style={{ animationDelay: '800ms' }}>
              <div className="bg-gradient-to-r from-[#258CAB]/10 to-[#082543]/10 p-6 rounded-2xl border border-[#258CAB]/20 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-[#258CAB] to-[#082543] rounded-xl">
                    <FaRegClock className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#082543] mb-2">
                      Pronóstico y Supervivencia
                    </h3>
                    <p className="text-[#082543]/90 text-lg">
                      <strong className="font-semibold">Tasa de Supervivencia:</strong>{' '}
                      <span className="text-[#258CAB] font-bold">{disease.survivalRate}</span>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Advertencia Urgente Mejorada */}
          {disease.urgent && (
            <div 
              className="
                bg-gradient-to-r from-[#F15F79]/10 to-[#4C2D4D]/10 
                border border-[#F15F79]/30 p-6 rounded-2xl 
                backdrop-blur-sm animate-pulse-slow
              "
              style={{ animationDelay: '900ms' }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-[#F15F79] to-[#4C2D4D] rounded-xl">
                  <FaExclamationTriangle className="text-white w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-[#F15F79] mb-2">
                    ⚠️ Condición Médica Urgente
                  </h4>
                  <p className="text-[#082543]/90 text-lg leading-relaxed">
                    Esta condición requiere <strong>evaluación médica inmediata</strong>. 
                    Consulte a un dermatólogo especializado lo antes posible. 
                    No posponga la atención médica.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Mejorado */}
        <div className="sticky bottom-0 bg-gradient-to-r from-[#082543] to-[#4C2D4D] text-white p-6 rounded-b-3xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FaCheckCircle className="text-[#258CAB] w-4 h-4" />
              <p className="text-white/80 text-sm font-light">
                Información educativa - Consulte siempre a un profesional de la salud
              </p>
            </div>
            <button
              onClick={onClose}
              className="
                bg-white/20 hover:bg-white/30 
                text-white px-8 py-3 
                rounded-xl font-semibold
                backdrop-blur-sm
                transition-all duration-300
                hover:scale-105 hover:shadow-lg
                border border-white/20
              "
            >
              Cerrar Detalles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetail;