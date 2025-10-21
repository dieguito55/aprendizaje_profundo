import React from 'react';
import { FaStethoscope, FaExclamationTriangle, FaSkullCrossbones, FaShieldAlt, FaArrowRight, FaClock, FaUserMd, FaLayerGroup } from 'react-icons/fa';

const DiseaseCard = ({ disease, onClick }) => {
  const getSeverityConfig = (severity) => {
    const configs = {
      'Alta': { 
        color: 'from-[#F15F79] to-[#C19CFF]', 
        bg: 'bg-gradient-to-r from-[#F15F79]/15 to-[#C19CFF]/15', 
        border: 'border-[#F15F79]/30',
        text: 'text-[#F15F79]',
        icon: <FaExclamationTriangle className="w-3 h-3" />,
        glow: 'shadow-[#F15F79]/20'
      },
      'Moderada-Alta': { 
        color: 'from-[#F15F79] to-[#8C7FE9]', 
        bg: 'bg-gradient-to-r from-[#F15F79]/15 to-[#8C7FE9]/15', 
        border: 'border-[#F15F79]/25',
        text: 'text-[#F15F79]',
        icon: <FaExclamationTriangle className="w-3 h-3" />,
        glow: 'shadow-[#F15F79]/15'
      },
      'Moderada': { 
        color: 'from-[#8C7FE9] to-[#342B7C]', 
        bg: 'bg-gradient-to-r from-[#8C7FE9]/15 to-[#342B7C]/15', 
        border: 'border-[#8C7FE9]/25',
        text: 'text-[#8C7FE9]',
        icon: <FaStethoscope className="w-3 h-3" />,
        glow: 'shadow-[#8C7FE9]/15'
      },
      'Leve-Moderada': { 
        color: 'from-[#258CAB] to-[#8C7FE9]', 
        bg: 'bg-gradient-to-r from-[#258CAB]/15 to-[#8C7FE9]/15', 
        border: 'border-[#258CAB]/25',
        text: 'text-[#258CAB]',
        icon: <FaStethoscope className="w-3 h-3" />,
        glow: 'shadow-[#258CAB]/15'
      },
      'Leve': { 
        color: 'from-[#342B7C] to-[#8C7FE9]', 
        bg: 'bg-gradient-to-r from-[#342B7C]/15 to-[#8C7FE9]/15', 
        border: 'border-[#342B7C]/25',
        text: 'text-[#342B7C]',
        icon: <FaShieldAlt className="w-3 h-3" />,
        glow: 'shadow-[#342B7C]/10'
      },
      'Muy Baja': { 
        color: 'from-[#D8DFF9] to-[#8C7FE9]', 
        bg: 'bg-gradient-to-r from-[#D8DFF9] to-[#8C7FE9]/10', 
        border: 'border-[#8C7FE9]/20',
        text: 'text-[#342B7C]/70',
        icon: <FaShieldAlt className="w-3 h-3" />,
        glow: 'shadow-[#8C7FE9]/5'
      }
    };
    return configs[severity] || configs['Muy Baja'];
  };

  const severityConfig = getSeverityConfig(disease.severity);

  return (
    <div 
      className="
        group relative 
        bg-white/90 backdrop-blur-xl 
        rounded-3xl 
        shadow-2xl hover:shadow-3xl 
        transition-all duration-700 
        cursor-pointer 
        transform hover:scale-105 
        overflow-hidden
        border border-white/40 hover:border-[#8C7FE9]/30
        animate-fadeInUp
        hover:z-10
      "
      onClick={onClick}
      style={{ animationDelay: `${Math.random() * 500}ms` }}
    >
      {/* Efecto de gradiente superior animado */}
      <div className="relative h-3 bg-gradient-to-r from-[#342B7C] via-[#8C7FE9] to-[#C19CFF] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shine"></div>
        {/* Puntos decorativos */}
        <div className="absolute top-1 left-4 w-1 h-1 bg-white rounded-full animate-ping"></div>
        <div className="absolute top-1 right-6 w-0.5 h-0.5 bg-white rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
      </div>
      
      {/* Contenido principal */}
      <div className="p-6 lg:p-7 relative">
        {/* Efecto de fondo sutil al hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDEEFD]/50 to-[#D8DFF9]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
        
        {/* Header con Icono y Nombre Mejorado */}
        <div className="flex items-start justify-between mb-5 relative z-10">
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <div className="relative group/icon">
              <div className="
                w-14 h-14 
                bg-gradient-to-br from-[#342B7C] to-[#8C7FE9] 
                rounded-2xl 
                flex items-center justify-center 
                shadow-2xl 
                group-hover/icon:shadow-3xl 
                transition-all duration-500 
                group-hover/icon:scale-110
                group-hover/icon:rotate-3
              ">
                <span className="text-white text-xl font-bold transform group-hover/icon:scale-110 transition-transform duration-300">
                  {disease.icon}
                </span>
              </div>
              {/* Efecto de glow exterior */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] rounded-2xl opacity-0 group-hover/icon:opacity-30 blur-lg transition-opacity duration-500"></div>
              {/* Puntos decorativos */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#C19CFF] rounded-full animate-pulse"></div>
            </div>
            
            <div className="flex-1 min-w-0 space-y-1">
              <h3 className="
                text-xl font-bold 
                text-[#342B7C] 
                group-hover:text-[#8C7FE9] 
                transition-colors duration-500 
                truncate
                leading-tight
              ">
                {disease.name}
              </h3>
              <p className="
                text-sm 
                text-[#8C7FE9] 
                italic 
                truncate
                font-medium
              ">
                {disease.scientificName}
              </p>
              {/* Categoría */}
              <div className="flex items-center space-x-1">
                <FaLayerGroup className="w-3 h-3 text-[#342B7C]/50" />
                <span className="text-xs text-[#342B7C]/60 font-medium capitalize">
                  {disease.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Descripción Mejorada */}
        <div className="mb-5 relative z-10">
          <p className="
            text-sm 
            text-[#342B7C]/80 
            leading-relaxed 
            line-clamp-2 
            group-hover:line-clamp-3 
            transition-all duration-500
            font-light
          ">
            {disease.description}
          </p>
        </div>

        {/* Badges de Información Premium */}
        <div className="flex flex-wrap gap-2 mb-5 relative z-10">
          {/* Badge de Severidad Mejorado */}
          <span className={`
            inline-flex items-center space-x-2 
            px-3 py-2 
            rounded-xl 
            text-xs font-semibold 
            backdrop-blur-sm
            transition-all duration-500 
            group-hover:scale-105
            border
            ${severityConfig.bg} ${severityConfig.text} ${severityConfig.border}
            shadow-lg ${severityConfig.glow}
            group-hover:shadow-xl
          `}>
            {severityConfig.icon}
            <span className="font-bold">{disease.severity}</span>
          </span>

          {/* Badge Contagioso Mejorado */}
          {disease.contagious && (
            <span className="
              inline-flex items-center space-x-2 
              px-3 py-2 
              rounded-xl 
              text-xs font-semibold
              bg-gradient-to-r from-[#F15F79]/15 to-[#C19CFF]/15
              text-[#F15F79]
              border border-[#F15F79]/30
              backdrop-blur-sm 
              transition-all duration-500 
              group-hover:scale-105
              shadow-lg shadow-[#F15F79]/15
              group-hover:shadow-xl
            ">
              <FaSkullCrossbones className="w-3 h-3" />
              <span>Contagioso</span>
            </span>
          )}

          {/* Badge Urgente con Animación Premium */}
          {disease.urgent && (
            <span className="
              inline-flex items-center space-x-2 
              px-3 py-2 
              rounded-xl 
              text-xs font-semibold
              bg-gradient-to-r from-[#F15F79] to-[#C19CFF]
              text-white
              animate-pulse 
              shadow-2xl 
              group-hover:animate-none
              transition-all duration-500 
              group-hover:scale-105
              group-hover:shadow-3xl
              border border-[#F15F79]/40
            ">
              <FaExclamationTriangle className="w-3 h-3" />
              <span>¡Urgente!</span>
            </span>
          )}

          {/* Badge de Tiempo de Tratamiento */}
          {disease.treatmentTime && (
            <span className="
              inline-flex items-center space-x-2 
              px-3 py-2 
              rounded-xl 
              text-xs font-semibold
              bg-gradient-to-r from-[#258CAB]/15 to-[#8C7FE9]/15
              text-[#258CAB]
              border border-[#258CAB]/25
              backdrop-blur-sm
              transition-all duration-500 
              group-hover:scale-105
            ">
              <FaClock className="w-3 h-3" />
              <span>{disease.treatmentTime}</span>
            </span>
          )}
        </div>

        {/* Síntomas Principales Premium */}
        <div className="space-y-3 relative z-10">
          <h4 className="
            text-xs font-semibold 
            text-[#342B7C]/60 
            uppercase tracking-wider 
            flex items-center space-x-2
          ">
            <div className="w-8 h-8 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] rounded-lg flex items-center justify-center">
              <FaStethoscope className="w-3 h-3 text-white" />
            </div>
            <span>Síntomas Principales</span>
          </h4>
          <ul className="text-sm text-[#342B7C]/80 space-y-2.5">
            {disease.symptoms.slice(0, 3).map((symptom, index) => (
              <li 
                key={index} 
                className="
                  flex items-start 
                  group/item 
                  animate-fadeIn
                  p-2 
                  rounded-lg
                  hover:bg-white/50
                  transition-all duration-300
                "
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="
                  w-2 h-2 
                  bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] 
                  rounded-full 
                  mt-1.5 mr-3 
                  flex-shrink-0
                  group-hover/item:scale-150
                  transition-transform duration-300
                "></div>
                <span className="
                  leading-relaxed 
                  font-light
                  group-hover/item:translate-x-2 
                  group-hover/item:text-[#342B7C]
                  transition-all duration-300
                ">
                  {symptom}
                </span>
              </li>
            ))}
            {disease.symptoms.length > 3 && (
              <li className="
                text-xs 
                text-[#8C7FE9] 
                font-semibold 
                pt-2 
                flex items-center space-x-1
                group/more
                hover:translate-x-1
                transition-transform duration-300
              ">
                <span>+{disease.symptoms.length - 3} síntomas más</span>
                <FaArrowRight className="w-2 h-2 transform group-hover/more:translate-x-1 transition-transform duration-300" />
              </li>
            )}
          </ul>
        </div>

        {/* Footer Premium */}
        <div className="mt-6 pt-5 border-t border-[#342B7C]/10 flex justify-between items-center relative z-10">
          <div className="flex items-center space-x-2">
            <FaUserMd className="w-3 h-3 text-[#8C7FE9]" />
            <span className="text-xs text-[#342B7C]/60 font-semibold">
              {disease.specialty}
            </span>
          </div>
          <button className="
            inline-flex items-center space-x-2 
            text-sm font-semibold 
            text-[#342B7C] 
            hover:text-[#8C7FE9] 
            group/btn
            transition-all duration-500 
            hover:translate-x-1
            px-4 py-2
            rounded-xl
            hover:bg-white/50
            backdrop-blur-sm
          ">
            <span>Ver detalles</span>
            <FaArrowRight className="
              w-3 h-3 
              transform 
              group-hover/btn:translate-x-1 
              transition-transform duration-300
            " />
          </button>
        </div>
      </div>

      {/* Efectos de brillo y partículas */}
      <div className="
        absolute inset-0 
        rounded-3xl 
        bg-gradient-to-br from-[#8C7FE9]/0 via-[#C19CFF]/0 to-[#342B7C]/0 
        opacity-0 
        group-hover:opacity-10 
        transition-opacity duration-700 
        pointer-events-none
      "></div>
      
      {/* Partículas flotantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              top: `${20 + i * 25}%`,
              left: `${10 + i * 30}%`,
              animationDelay: `${i * 2}s`,
            }}
          >
            <div className="w-1 h-1 bg-[#8C7FE9] rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiseaseCard;