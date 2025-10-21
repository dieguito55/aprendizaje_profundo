import React, { useState, useEffect } from 'react';
import DiseaseGrid from '../components/disease/DiseaseGrid';
import DiseaseDetail from '../components/disease/DiseaseDetail';
import { DISEASES_DATA } from '../data/diseases';
import { FaStethoscope, FaExclamationTriangle, FaShieldAlt, FaBookMedical, FaSearch, FaFilter, FaInfoCircle } from 'react-icons/fa';

const Diseases = () => {
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDiseases, setFilteredDiseases] = useState(DISEASES_DATA);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Estadísticas dinámicas
  const stats = {
    total: DISEASES_DATA.length,
    urgent: DISEASES_DATA.filter(d => d.urgent).length,
    contagious: DISEASES_DATA.filter(d => d.contagious).length,
    highSeverity: DISEASES_DATA.filter(d => d.severity === 'Alta' || d.severity === 'Moderada-Alta').length
  };

  // Categorías únicas
  const categories = ['all', ...new Set(DISEASES_DATA.map(d => d.category))];

  // Filtrar enfermedades
  useEffect(() => {
    let filtered = DISEASES_DATA;

    if (searchTerm) {
      filtered = filtered.filter(disease =>
        disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        disease.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase())) ||
        disease.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(disease => disease.category === selectedCategory);
    }

    setFilteredDiseases(filtered);
  }, [searchTerm, selectedCategory]);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (selectedDisease) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedDisease]);

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Premium */}
      <div className="text-center mb-16 animate-fadeInUp">
        {/* Icono decorativo premium */}
        <div className="flex justify-center mb-8">
          <div className="relative group">
            <div className="w-24 h-24 bg-gradient-to-br from-[#342B7C] to-[#8C7FE9] rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-500">
              <FaBookMedical className="text-white text-3xl" />
            </div>
            {/* Efectos decorativos */}
            <div className="absolute -inset-3 bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#C19CFF] rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#8C7FE9] rounded-full"></div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#342B7C] mb-6 font-sans tracking-tight">
          Catálogo de Enfermedades
          <span className="block text-2xl md:text-3xl lg:text-4xl text-[#8C7FE9] mt-4 font-light bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] bg-clip-text text-transparent">
            Dermatológicas Especializadas
          </span>
        </h1>
        
        <p className="text-xl text-[#342B7C]/80 max-w-5xl mx-auto leading-relaxed mb-12 font-light">
          Explora nuestra base de conocimiento especializada sobre las principales condiciones 
          cutáneas que <span className="font-semibold text-[#8C7FE9]">DermApp</span> puede identificar 
          y analizar mediante inteligencia artificial educativa avanzada.
        </p>

        {/* Barra de búsqueda y filtros */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
            {/* Barra de búsqueda */}
            <div className="relative flex-1 max-w-2xl w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-[#8C7FE9] w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Buscar enfermedades, síntomas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
                  w-full pl-12 pr-4 py-4
                  bg-white/80 backdrop-blur-sm
                  border-2 border-[#D8DFF9]
                  rounded-2xl
                  text-[#342B7C]
                  placeholder-[#8C7FE9]/60
                  focus:outline-none focus:border-[#8C7FE9] focus:ring-4 focus:ring-[#8C7FE9]/20
                  transition-all duration-300
                  shadow-lg hover:shadow-xl
                "
              />
            </div>

            {/* Filtro por categoría */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-[#8C7FE9] w-4 h-4" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="
                  pl-10 pr-8 py-4
                  bg-white/80 backdrop-blur-sm
                  border-2 border-[#D8DFF9]
                  rounded-2xl
                  text-[#342B7C]
                  focus:outline-none focus:border-[#8C7FE9] focus:ring-4 focus:ring-[#8C7FE9]/20
                  transition-all duration-300
                  shadow-lg hover:shadow-xl
                  appearance-none
                "
              >
                <option value="all">Todas las categorías</option>
                {categories.filter(cat => cat !== 'all').map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Estadísticas en Tiempo Real Mejoradas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
          {[
            { 
              value: stats.total, 
              label: 'Enfermedades', 
              icon: FaBookMedical,
              color: 'from-[#342B7C] to-[#8C7FE9]',
              bgColor: 'bg-[#342B7C]/5'
            },
            { 
              value: stats.urgent, 
              label: 'Urgentes', 
              icon: FaExclamationTriangle,
              color: 'from-[#F15F79] to-[#C19CFF]',
              bgColor: 'bg-[#F15F79]/5'
            },
            { 
              value: stats.contagious, 
              label: 'Contagiosas', 
              icon: FaShieldAlt,
              color: 'from-[#258CAB] to-[#8C7FE9]',
              bgColor: 'bg-[#258CAB]/5'
            },
            { 
              value: stats.highSeverity, 
              label: 'Alta Severidad', 
              icon: FaStethoscope,
              color: 'from-[#8C7FE9] to-[#342B7C]',
              bgColor: 'bg-[#8C7FE9]/5'
            },
          ].map((stat, index) => (
            <div 
              key={index}
              className="
                group relative
                bg-white/80 backdrop-blur-xl
                rounded-2xl p-6
                shadow-2xl hover:shadow-3xl
                border border-white/40
                transition-all duration-500
                transform hover:scale-105
                overflow-hidden
              "
            >
              {/* Efecto de fondo gradiente */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Icono */}
              <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="text-white text-xl" />
              </div>
              
              {/* Contenido */}
              <div className="text-3xl font-bold text-[#342B7C] font-sans">{stat.value}</div>
              <div className="text-sm text-[#342B7C]/70 font-medium">{stat.label}</div>
              
              {/* Efecto de borde al hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#8C7FE9]/20 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Contador de resultados */}
        <div className="text-center mb-8">
          <p className="text-[#342B7C]/70 font-medium">
            Mostrando <span className="text-[#8C7FE9] font-bold">{filteredDiseases.length}</span> de{' '}
            <span className="text-[#342B7C] font-bold">{stats.total}</span> enfermedades
            {searchTerm && (
              <span> para "<span className="text-[#8C7FE9] font-semibold">{searchTerm}</span>"</span>
            )}
            {selectedCategory !== 'all' && (
              <span> en <span className="text-[#8C7FE9] font-semibold">{selectedCategory}</span></span>
            )}
          </p>
        </div>

        {/* Indicador de Navegación Mejorado */}
        <div className="flex justify-center space-x-3">
          {[1, 2, 3].map((dot) => (
            <div 
              key={dot}
              className="w-3 h-3 bg-[#8C7FE9] rounded-full opacity-40 animate-pulse"
              style={{ animationDelay: `${dot * 0.3}s` }}
            ></div>
          ))}
        </div>
      </div>

      {/* Grid de Enfermedades Mejorado */}
      <div className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
        {filteredDiseases.length > 0 ? (
          <DiseaseGrid 
            diseases={filteredDiseases}
            onDiseaseSelect={setSelectedDisease}
          />
        ) : (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-[#FDEEFD] to-[#D8DFF9] rounded-3xl flex items-center justify-center mx-auto mb-6">
              <FaSearch className="text-[#8C7FE9] text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-[#342B7C] mb-4">No se encontraron resultados</h3>
            <p className="text-[#342B7C]/70 max-w-md mx-auto">
              No hay enfermedades que coincidan con tu búsqueda. Intenta con otros términos o ajusta los filtros.
            </p>
          </div>
        )}
      </div>

      {/* Información Educativa Mejorada */}
      <div className="mt-20 p-8 lg:p-12 bg-gradient-to-r from-[#FDEEFD] to-[#D8DFF9] rounded-3xl border border-[#8C7FE9]/20 backdrop-blur-sm shadow-2xl">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] rounded-2xl flex items-center justify-center shadow-lg">
              <FaInfoCircle className="text-white text-2xl" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-[#342B7C] mb-6 font-sans">
            🎓 Propósito Educativo
          </h3>
          <p className="text-[#342B7C]/80 leading-relaxed text-lg">
            Este catálogo tiene fines <strong className="text-[#8C7FE9]">exclusivamente educativos</strong>. 
            La información proporcionada no sustituye el diagnóstico médico profesional. 
            Consulte siempre con un dermatólogo certificado para evaluación y tratamiento adecuados.
          </p>
        </div>
      </div>

      {/* Modal de Detalle - Siempre centrado */}
      {selectedDisease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay con backdrop blur */}
          <div 
            className="absolute inset-0 bg-[#342B7C]/60 backdrop-blur-lg transition-opacity duration-500"
            onClick={() => setSelectedDisease(null)}
          />
          
          {/* Contenedor del modal centrado */}
          <div className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden animate-modalIn">
            <DiseaseDetail 
              disease={selectedDisease}
              onClose={() => setSelectedDisease(null)}
            />
          </div>
        </div>
      )}

      {/* Estilos de animación personalizados */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modalIn {
          animation: modalIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Diseases;