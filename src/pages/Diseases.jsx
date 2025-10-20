import React, { useState } from 'react';
import DiseaseGrid from '../components/disease/DiseaseGrid';
import DiseaseDetail from '../components/disease/DiseaseDetail';
import { DISEASES_DATA } from '../data/diseases';
import { FaStethoscope, FaExclamationTriangle, FaShieldAlt, FaBookMedical } from 'react-icons/fa';

const Diseases = () => {
  const [selectedDisease, setSelectedDisease] = useState(null);

  // Estadísticas dinámicas
  const stats = {
    total: DISEASES_DATA.length,
    urgent: DISEASES_DATA.filter(d => d.urgent).length,
    contagious: DISEASES_DATA.filter(d => d.contagious).length,
    highSeverity: DISEASES_DATA.filter(d => d.severity === 'Alta' || d.severity === 'Moderada-Alta').length
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header Mejorado */}
      <div className="text-center mb-16 animate-fadeInUp">
        {/* Icono decorativo */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-[#F15F79] to-[#4C2D4D] rounded-2xl flex items-center justify-center shadow-2xl">
              <FaBookMedical className="text-white text-2xl" />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-[#F15F79] to-[#258CAB] rounded-2xl opacity-20 blur-sm"></div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#082543] mb-6 font-serif tracking-tight">
          Catálogo de Enfermedades
          <span className="block text-2xl md:text-3xl text-[#F15F79] mt-4 font-light">
            Dermatológicas
          </span>
        </h1>
        
        <p className="text-xl text-[#082543]/80 max-w-4xl mx-auto leading-relaxed mb-8">
          Explora nuestra base de conocimiento especializada sobre las principales condiciones 
          cutáneas que <span className="font-semibold text-[#258CAB]">DermApp</span> puede identificar 
          y analizar mediante inteligencia artificial educativa.
        </p>

        {/* Estadísticas en Tiempo Real */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
            <div className="text-2xl font-bold text-[#082543] font-serif">{stats.total}</div>
            <div className="text-sm text-[#082543]/70">Enfermedades</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
            <div className="text-2xl font-bold text-[#F15F79] font-serif">{stats.urgent}</div>
            <div className="text-sm text-[#082543]/70 flex items-center justify-center space-x-1">
              <FaExclamationTriangle className="w-3 h-3" />
              <span>Urgentes</span>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
            <div className="text-2xl font-bold text-[#258CAB] font-serif">{stats.contagious}</div>
            <div className="text-sm text-[#082543]/70 flex items-center justify-center space-x-1">
              <FaShieldAlt className="w-3 h-3" />
              <span>Contagiosas</span>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
            <div className="text-2xl font-bold text-[#4C2D4D] font-serif">{stats.highSeverity}</div>
            <div className="text-sm text-[#082543]/70 flex items-center justify-center space-x-1">
              <FaStethoscope className="w-3 h-3" />
              <span>Alta Severidad</span>
            </div>
          </div>
        </div>

        {/* Indicador de Navegación */}
        <div className="flex justify-center space-x-2">
          {[1, 2, 3].map((dot) => (
            <div 
              key={dot}
              className="w-2 h-2 bg-[#082543]/30 rounded-full animate-pulse"
              style={{ animationDelay: `${dot * 0.5}s` }}
            ></div>
          ))}
        </div>
      </div>

      {/* Grid de Enfermedades Mejorado */}
      <div className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
        <DiseaseGrid 
          diseases={DISEASES_DATA}
          onDiseaseSelect={setSelectedDisease}
        />
      </div>

      {/* Información Educativa */}
      <div className="mt-20 p-8 bg-gradient-to-r from-[#082543]/5 to-[#258CAB]/5 rounded-3xl border border-[#082543]/10 backdrop-blur-sm">
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-[#082543] mb-4 font-serif">
            🎓 Propósito Educativo
          </h3>
          <p className="text-[#082543]/80 leading-relaxed">
            Este catálogo tiene fines <strong className="text-[#258CAB]">exclusivamente educativos</strong>. 
            La información proporcionada no sustituye el diagnóstico médico profesional. 
            Consulte siempre con un dermatólogo certificado para evaluación y tratamiento adecuados.
          </p>
        </div>
      </div>

      {/* Modal de Detalle */}
      {selectedDisease && (
        <DiseaseDetail 
          disease={selectedDisease}
          onClose={() => setSelectedDisease(null)}
        />
      )}
    </div>
  );
};

export default Diseases;