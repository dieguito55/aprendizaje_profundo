import React, { useEffect } from 'react';
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
  FaRegClock,
  FaInfoCircle,
  FaLightbulb,
  FaHandHoldingMedical,
  FaProcedures
} from 'react-icons/fa';

const DiseaseDetail = ({ disease, onClose }) => {
  if (!disease) return null;

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const getSeverityConfig = (severity) => {
    const configs = {
      'Alta': { 
        color: 'from-[#F15F79] to-[#C19CFF]',
        bg: 'bg-gradient-to-r from-[#F15F79] to-[#C19CFF]',
        lightBg: 'bg-gradient-to-r from-[#F15F79]/15 to-[#C19CFF]/15',
        border: 'border-[#F15F79]/30',
        icon: <FaExclamationTriangle className="w-4 h-4" />
      },
      'Moderada-Alta': { 
        color: 'from-[#F15F79] to-[#8C7FE9]',
        bg: 'bg-gradient-to-r from-[#F15F79] to-[#8C7FE9]',
        lightBg: 'bg-gradient-to-r from-[#F15F79]/15 to-[#8C7FE9]/15',
        border: 'border-[#F15F79]/25',
        icon: <FaExclamationTriangle className="w-4 h-4" />
      },
      'Moderada': { 
        color: 'from-[#8C7FE9] to-[#342B7C]',
        bg: 'bg-gradient-to-r from-[#8C7FE9] to-[#342B7C]',
        lightBg: 'bg-gradient-to-r from-[#8C7FE9]/15 to-[#342B7C]/15',
        border: 'border-[#8C7FE9]/25',
        icon: <FaHeartbeat className="w-4 h-4" />
      },
      'Leve-Moderada': { 
        color: 'from-[#258CAB] to-[#8C7FE9]',
        bg: 'bg-gradient-to-r from-[#258CAB] to-[#8C7FE9]',
        lightBg: 'bg-gradient-to-r from-[#258CAB]/15 to-[#8C7FE9]/15',
        border: 'border-[#258CAB]/25',
        icon: <FaHeartbeat className="w-4 h-4" />
      },
      'Leve': { 
        color: 'from-[#342B7C] to-[#8C7FE9]',
        bg: 'bg-gradient-to-r from-[#342B7C] to-[#8C7FE9]',
        lightBg: 'bg-gradient-to-r from-[#342B7C]/15 to-[#8C7FE9]/15',
        border: 'border-[#342B7C]/25',
        icon: <FaShieldAlt className="w-4 h-4" />
      },
      'Muy Baja': { 
        color: 'from-[#D8DFF9] to-[#8C7FE9]',
        bg: 'bg-gradient-to-r from-[#D8DFF9] to-[#8C7FE9]',
        lightBg: 'bg-gradient-to-r from-[#D8DFF9] to-[#8C7FE9]/10',
        border: 'border-[#8C7FE9]/20',
        icon: <FaShieldAlt className="w-4 h-4" />
      }
    };
    return configs[severity] || configs['Muy Baja'];
  };

  const severityConfig = getSeverityConfig(disease.severity);

  return (
    <>
      {/* Overlay fijo que cubre toda la pantalla */}
      <div 
        className="fixed inset-0 z-50 bg-[#342B7C]/80 backdrop-blur-xl animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Modal fijo que cubre toda la pantalla */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-modalIn">
        <div className="
          w-full max-w-6xl 
          max-h-[90vh] 
          overflow-hidden
          flex flex-col
        ">
          {/* Modal Content */}
          <div className="
            bg-white/95 backdrop-blur-2xl 
            rounded-3xl 
            shadow-2xl shadow-[#342B7C]/30
            border border-white/40
            flex flex-col
            h-full
          ">
            {/* Header Premium */}
            <div className="
              sticky top-0 
              bg-gradient-to-r from-[#342B7C] via-[#8C7FE9] to-[#C19CFF] 
              text-white p-8 
              rounded-t-3xl 
              z-20
              border-b border-white/20
            ">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-6 flex-1 min-w-0">
                  <div className="relative group">
                    <div className="
                      w-20 h-20 
                      bg-white/20 
                      rounded-2xl 
                      flex items-center justify-center 
                      shadow-2xl 
                      backdrop-blur-sm
                      border border-white/30
                      group-hover:scale-105
                      transition-transform duration-300
                    ">
                      <span className="text-3xl text-white font-bold">
                        {disease.icon}
                      </span>
                    </div>
                    {/* Efecto de glow */}
                    <div className="absolute -inset-3 bg-white/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    {/* Puntos decorativos */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#C19CFF] rounded-full animate-ping"></div>
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-3">
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-bold font-sans tracking-tight leading-tight">
                        {disease.name}
                      </h2>
                      <p className="text-white/80 italic text-lg mt-1 font-light">
                        {disease.scientificName}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <span className={`
                        inline-flex items-center space-x-2 
                        px-4 py-2 
                        rounded-full 
                        text-sm font-semibold 
                        ${severityConfig.bg} 
                        text-white 
                        shadow-lg
                        backdrop-blur-sm
                        border border-white/20
                      `}>
                        {severityConfig.icon}
                        <span className="font-bold">{disease.severity}</span>
                      </span>
                      
                      {disease.contagious && (
                        <span className="
                          inline-flex items-center space-x-2 
                          px-4 py-2 
                          bg-gradient-to-r from-[#F15F79] to-[#C19CFF]
                          rounded-full 
                          text-sm font-semibold 
                          text-white 
                          shadow-lg
                          backdrop-blur-sm
                          border border-white/20
                        ">
                          <FaSkullCrossbones className="w-3 h-3" />
                          <span>Contagioso</span>
                        </span>
                      )}

                      {/* Badge de categoría */}
                      <span className="
                        inline-flex items-center space-x-2 
                        px-4 py-2 
                        bg-white/20
                        rounded-full 
                        text-sm font-semibold 
                        text-white 
                        backdrop-blur-sm
                        border border-white/30
                      ">
                        <FaLightbulb className="w-3 h-3" />
                        <span className="capitalize">{disease.category}</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Botón cerrar mejorado */}
                <button
                  onClick={onClose}
                  className="
                    text-white/80 hover:text-white 
                    text-2xl p-3 
                    hover:bg-white/10 
                    rounded-xl 
                    transition-all duration-300
                    backdrop-blur-sm
                    hover:scale-110
                    border border-white/20
                    ml-4 flex-shrink-0
                  "
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Contenido Scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-8 space-y-10">
                {/* Descripción Completa */}
                <section className="animate-fadeInUp" style={{ animationDelay: '100ms' }}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-2 h-10 bg-gradient-to-b from-[#8C7FE9] to-[#C19CFF] rounded-full"></div>
                    <h3 className="text-2xl font-bold text-[#342B7C] font-sans">
                      Descripción Clínica
                    </h3>
                  </div>
                  <p className="
                    text-[#342B7C]/90 
                    leading-relaxed 
                    text-lg 
                    bg-gradient-to-br from-[#FDEEFD] to-[#D8DFF9]
                    p-6 
                    rounded-2xl 
                    border border-[#8C7FE9]/20 
                    backdrop-blur-sm
                    shadow-lg
                  ">
                    {disease.description}
                  </p>
                </section>

                {/* Información Rápida Premium */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                  {[
                    {
                      icon: FaExclamationTriangle,
                      label: 'Severidad',
                      value: disease.severity,
                      gradient: 'from-[#F15F79] to-[#C19CFF]'
                    },
                    {
                      icon: FaChartLine,
                      label: 'Prevalencia',
                      value: disease.prevalence,
                      gradient: 'from-[#8C7FE9] to-[#342B7C]'
                    },
                    {
                      icon: FaSkullCrossbones,
                      label: 'Contagioso',
                      value: disease.contagious ? 'Sí' : 'No',
                      gradient: disease.contagious ? 'from-[#F15F79] to-[#8C7FE9]' : 'from-[#258CAB] to-[#8C7FE9]',
                      color: disease.contagious ? 'text-[#F15F79]' : 'text-[#258CAB]'
                    },
                    {
                      icon: FaUserMd,
                      label: 'Especialidad',
                      value: disease.specialty,
                      gradient: 'from-[#342B7C] to-[#8C7FE9]'
                    }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="
                        group relative
                        bg-white/80 backdrop-blur-xl
                        p-6 rounded-2xl 
                        shadow-lg hover:shadow-2xl
                        border border-white/40
                        transition-all duration-500
                        transform hover:scale-105
                        overflow-hidden
                      "
                    >
                      <div className="flex items-center space-x-4 mb-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                          <item.icon className="text-white w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-semibold text-[#342B7C]/70">{item.label}</h4>
                      </div>
                      <p className={`text-xl font-bold ${item.color || 'text-[#342B7C]'}`}>
                        {item.value}
                      </p>
                      
                      {/* Efecto de fondo al hover */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    </div>
                  ))}
                </div>

                {/* Síntomas Completos Premium */}
                <section className="animate-fadeInUp" style={{ animationDelay: '300ms' }}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-2 h-10 bg-gradient-to-b from-[#F15F79] to-[#8C7FE9] rounded-full"></div>
                    <h3 className="text-2xl font-bold text-[#342B7C] font-sans">
                      Síntomas y Signos Clínicos
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {disease.symptoms.map((symptom, index) => (
                      <div 
                        key={index} 
                        className="
                          group relative
                          flex items-start space-x-4 p-4 
                          bg-white/80 backdrop-blur-xl
                          rounded-xl 
                          border border-white/40
                          shadow-lg hover:shadow-xl 
                          transition-all duration-300
                          hover:translate-x-2
                        "
                        style={{ animationDelay: `${400 + index * 50}ms` }}
                      >
                        <div className="
                          w-2 h-2 
                          bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] 
                          rounded-full 
                          mt-2 
                          flex-shrink-0
                          group-hover:scale-150
                          transition-transform duration-300
                        "></div>
                        <span className="
                          text-[#342B7C]/90 
                          leading-relaxed 
                          font-light
                          flex-1
                        ">
                          {symptom}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Tratamientos Premium */}
                <section className="animate-fadeInUp" style={{ animationDelay: '500ms' }}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-2 h-10 bg-gradient-to-b from-[#258CAB] to-[#8C7FE9] rounded-full"></div>
                    <h3 className="text-2xl font-bold text-[#342B7C] font-sans">
                      Opciones de Tratamiento
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {disease.treatments.map((treatment, index) => (
                      <div 
                        key={index} 
                        className="
                          group
                          flex items-center space-x-4 p-4
                          bg-gradient-to-br from-white to-white/80
                          rounded-xl 
                          border border-white/40
                          shadow-lg backdrop-blur-sm
                          hover:shadow-xl 
                          transition-all duration-300
                          hover:scale-105
                        "
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-[#258CAB] to-[#8C7FE9] rounded-xl flex items-center justify-center shadow-lg">
                          <FaMedkit className="text-white w-4 h-4" />
                        </div>
                        <span className="text-[#342B7C]/90 font-medium flex-1 leading-relaxed">
                          {treatment}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Prevención Premium */}
                <section className="animate-fadeInUp" style={{ animationDelay: '600ms' }}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-2 h-10 bg-gradient-to-b from-[#4C2D4D] to-[#342B7C] rounded-full"></div>
                    <h3 className="text-2xl font-bold text-[#342B7C] font-sans">
                      Medidas Preventivas
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {disease.prevention.map((measure, index) => (
                      <div 
                        key={index} 
                        className="
                          group
                          flex items-start space-x-4 p-4
                          bg-gradient-to-br from-[#FDEEFD] to-[#D8DFF9]
                          rounded-xl 
                          border border-[#8C7FE9]/20
                          shadow-lg backdrop-blur-sm
                          hover:shadow-xl 
                          transition-all duration-300
                          hover:translate-x-2
                        "
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] rounded-xl flex items-center justify-center shadow-lg mt-1">
                          <FaShieldAlt className="text-white w-4 h-4" />
                        </div>
                        <span className="text-[#342B7C]/90 leading-relaxed font-light flex-1">
                          {measure}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Factores de Riesgo Premium */}
                {disease.riskFactors && (
                  <section className="animate-fadeInUp" style={{ animationDelay: '700ms' }}>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-2 h-10 bg-gradient-to-b from-[#F15F79] to-[#C19CFF] rounded-full"></div>
                      <h3 className="text-2xl font-bold text-[#342B7C] font-sans">
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
                            bg-gradient-to-r from-[#F15F79] to-[#C19CFF]
                            text-white 
                            rounded-full 
                            text-sm font-semibold
                            shadow-lg hover:shadow-xl
                            transition-all duration-300
                            hover:scale-105
                            border border-white/20
                            backdrop-blur-sm
                          "
                        >
                          <FaExclamationTriangle className="w-3 h-3" />
                          <span>{factor}</span>
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {/* Información Adicional Premium */}
                {disease.survivalRate && (
                  <section className="animate-fadeInUp" style={{ animationDelay: '800ms' }}>
                    <div className="
                      bg-gradient-to-r from-[#FDEEFD] to-[#D8DFF9]
                      p-6 rounded-2xl 
                      border border-[#8C7FE9]/20 
                      backdrop-blur-sm
                      shadow-lg
                    ">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-[#258CAB] to-[#8C7FE9] rounded-xl flex items-center justify-center shadow-lg">
                          <FaRegClock className="text-white w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[#342B7C] mb-2 font-sans">
                            Pronóstico y Supervivencia
                          </h3>
                          <p className="text-[#342B7C]/90 text-lg">
                            <strong className="font-semibold">Tasa de Supervivencia:</strong>{' '}
                            <span className="text-[#8C7FE9] font-bold">{disease.survivalRate}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Advertencia Urgente Premium */}
                {disease.urgent && (
                  <div 
                    className="
                      bg-gradient-to-r from-[#F15F79]/10 to-[#C19CFF]/10 
                      border border-[#F15F79]/30 
                      p-6 rounded-2xl 
                      backdrop-blur-sm 
                      animate-pulse-slow
                    "
                    style={{ animationDelay: '900ms' }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#F15F79] to-[#C19CFF] rounded-xl flex items-center justify-center shadow-lg">
                        <FaExclamationTriangle className="text-white w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-[#F15F79] mb-2 font-sans">
                          ⚠️ Condición Médica Urgente
                        </h4>
                        <p className="text-[#342B7C]/90 text-lg leading-relaxed font-light">
                          Esta condición requiere <strong className="font-semibold">evaluación médica inmediata</strong>. 
                          Consulte a un dermatólogo especializado lo antes posible. 
                          No posponga la atención médica.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Premium */}
            <div className="
              sticky bottom-0 
              bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] 
              text-white p-6 
              rounded-b-3xl
              border-t border-white/20
              z-10
            ">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-[#C19CFF] w-5 h-5" />
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
                    whitespace-nowrap
                  "
                >
                  Cerrar Detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos de animación personalizados */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modalIn {
          animation: modalIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default DiseaseDetail;