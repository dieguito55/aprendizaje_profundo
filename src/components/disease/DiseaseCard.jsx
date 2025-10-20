import React from 'react';
import { FaStethoscope, FaExclamationTriangle, FaSkullCrossbones, FaShieldAlt, FaArrowRight } from 'react-icons/fa';

const DiseaseCard = ({ disease, onClick }) => {
  const getSeverityConfig = (severity) => {
    const configs = {
      'Alta': { 
        color: 'from-[#F15F79] to-[#4C2D4D]', 
        bg: 'bg-[#F15F79]/10', 
        text: 'text-[#F15F79]',
        icon: <FaExclamationTriangle className="w-3 h-3" />
      },
      'Moderada-Alta': { 
        color: 'from-[#F15F79] to-[#258CAB]', 
        bg: 'bg-[#F15F79]/10', 
        text: 'text-[#F15F79]',
        icon: <FaExclamationTriangle className="w-3 h-3" />
      },
      'Moderada': { 
        color: 'from-[#258CAB] to-[#4C2D4D]', 
        bg: 'bg-[#258CAB]/10', 
        text: 'text-[#258CAB]',
        icon: <FaStethoscope className="w-3 h-3" />
      },
      'Leve-Moderada': { 
        color: 'from-[#258CAB] to-[#082543]', 
        bg: 'bg-[#258CAB]/10', 
        text: 'text-[#258CAB]',
        icon: <FaStethoscope className="w-3 h-3" />
      },
      'Leve': { 
        color: 'from-[#082543] to-[#258CAB]', 
        bg: 'bg-[#082543]/10', 
        text: 'text-[#082543]',
        icon: <FaShieldAlt className="w-3 h-3" />
      },
      'Muy Baja': { 
        color: 'from-gray-400 to-gray-600', 
        bg: 'bg-gray-100', 
        text: 'text-gray-600',
        icon: <FaShieldAlt className="w-3 h-3" />
      }
    };
    return configs[severity] || configs['Muy Baja'];
  };

  const severityConfig = getSeverityConfig(disease.severity);

  return (
    <div 
      className="
        group relative bg-white/90 backdrop-blur-sm rounded-2xl 
        shadow-lg hover:shadow-2xl transition-all duration-500 
        cursor-pointer transform hover:scale-105 overflow-hidden
        border border-white/20 hover:border-[#F15F79]/20
        animate-fadeInUp
      "
      onClick={onClick}
      style={{ animationDelay: `${Math.random() * 300}ms` }}
    >
      {/* Efecto de gradiente superior */}
      <div 
        className="h-2 bg-gradient-to-r from-[#F15F79] via-[#258CAB] to-[#4C2D4D] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse-slow"></div>
      </div>
      
      {/* Contenido principal */}
      <div className="p-6 relative">
        {/* Efecto de fondo sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Header con Icono y Nombre */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="flex items-center space-x-3 flex-1">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-[#082543] to-[#4C2D4D] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <span className="text-white text-lg font-bold">{disease.icon}</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#F15F79] to-[#258CAB] rounded-xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-[#082543] group-hover:text-[#F15F79] transition-colors duration-300 truncate">
                {disease.name}
              </h3>
              <p className="text-sm text-[#082543]/70 italic truncate">
                {disease.scientificName}
              </p>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <div className="mb-4 relative z-10">
          <p className="text-sm text-[#082543]/80 leading-relaxed line-clamp-2 group-hover:line-clamp-3 transition-all duration-300">
            {disease.description}
          </p>
        </div>

        {/* Badges de Información Mejorados */}
        <div className="flex flex-wrap gap-2 mb-4 relative z-10">
          {/* Badge de Severidad */}
          <span className={`
            inline-flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold 
            ${severityConfig.bg} ${severityConfig.text} 
            border border-current/20 backdrop-blur-sm
            transition-all duration-300 group-hover:scale-105
          `}>
            {severityConfig.icon}
            <span>{disease.severity}</span>
          </span>

          {/* Badge Contagioso */}
          {disease.contagious && (
            <span className="
              inline-flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold
              bg-[#F15F79]/10 text-[#F15F79] border border-[#F15F79]/20
              backdrop-blur-sm transition-all duration-300 group-hover:scale-105
            ">
              <FaSkullCrossbones className="w-3 h-3" />
              <span>Contagioso</span>
            </span>
          )}

          {/* Badge Urgente con Animación */}
          {disease.urgent && (
            <span className="
              inline-flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold
              bg-gradient-to-r from-[#F15F79] to-[#4C2D4D] text-white
              animate-pulse shadow-lg group-hover:animate-none
              transition-all duration-300 group-hover:scale-105
            ">
              <FaExclamationTriangle className="w-3 h-3" />
              <span>¡Urgente!</span>
            </span>
          )}
        </div>

        {/* Síntomas Principales Mejorados */}
        <div className="space-y-2 relative z-10">
          <h4 className="text-xs font-semibold text-[#082543]/60 uppercase tracking-wider flex items-center space-x-1">
            <FaStethoscope className="w-3 h-3" />
            <span>Síntomas Principales:</span>
          </h4>
          <ul className="text-xs text-[#082543]/80 space-y-1.5">
            {disease.symptoms.slice(0, 3).map((symptom, index) => (
              <li 
                key={index} 
                className="flex items-start group/item animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#F15F79] to-[#258CAB] rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                <span className="leading-relaxed group-hover/item:translate-x-1 transition-transform duration-300">
                  {symptom}
                </span>
              </li>
            ))}
            {disease.symptoms.length > 3 && (
              <li className="text-xs text-[#082543]/50 font-medium pt-1">
                +{disease.symptoms.length - 3} síntomas más...
              </li>
            )}
          </ul>
        </div>

        {/* Footer Mejorado */}
        <div className="mt-6 pt-4 border-t border-[#082543]/10 flex justify-between items-center relative z-10">
          <span className="text-xs text-[#082543]/50 font-medium">
            {disease.specialty}
          </span>
          <button className="
            inline-flex items-center space-x-1 text-sm font-semibold 
            text-[#082543] hover:text-[#F15F79] 
            transition-all duration-300 group-hover:translate-x-1
          ">
            <span>Ver detalles</span>
            <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F15F79]/0 via-[#258CAB]/0 to-[#4C2D4D]/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default DiseaseCard;