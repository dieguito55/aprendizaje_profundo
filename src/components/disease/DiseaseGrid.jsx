import React, { useState, useEffect } from 'react';
import DiseaseCard from './DiseaseCard';
import { FaSearch, FaFilter, FaSort, FaSyncAlt, FaLayerGroup, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const DiseaseGrid = ({ diseases, onDiseaseSelect }) => {
  const [filteredDiseases, setFilteredDiseases] = useState(diseases);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filtros y búsqueda
  useEffect(() => {
    let results = diseases;

    // Filtro por búsqueda
    if (searchTerm) {
      results = results.filter(disease =>
        disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        disease.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        disease.symptoms.some(symptom => 
          symptom.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        disease.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por severidad
    if (selectedSeverity !== 'all') {
      results = results.filter(disease => disease.severity === selectedSeverity);
    }

    // Filtro por categoría
    if (selectedCategory !== 'all') {
      results = results.filter(disease => disease.category === selectedCategory);
    }

    // Ordenamiento
    results = [...results].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'severity':
          const severityOrder = {
            'Alta': 1,
            'Moderada-Alta': 2,
            'Moderada': 3,
            'Leve-Moderada': 4,
            'Leve': 5,
            'Muy Baja': 6
          };
          return severityOrder[a.severity] - severityOrder[b.severity];
        case 'urgency':
          return (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0);
        case 'contagious':
          return (b.contagious ? 1 : 0) - (a.contagious ? 1 : 0);
        default:
          return 0;
      }
    });

    setFilteredDiseases(results);
  }, [diseases, searchTerm, selectedSeverity, selectedCategory, sortBy]);

  const severityOptions = [
    { value: 'all', label: 'Todas las Severidades', color: 'from-[#342B7C] to-[#8C7FE9]' },
    { value: 'Alta', label: 'Alta Severidad', color: 'from-[#F15F79] to-[#C19CFF]' },
    { value: 'Moderada-Alta', label: 'Moderada-Alta', color: 'from-[#F15F79] to-[#8C7FE9]' },
    { value: 'Moderada', label: 'Moderada', color: 'from-[#8C7FE9] to-[#342B7C]' },
    { value: 'Leve-Moderada', label: 'Leve-Moderada', color: 'from-[#258CAB] to-[#8C7FE9]' },
    { value: 'Leve', label: 'Leve', color: 'from-[#342B7C] to-[#8C7FE9]' },
    { value: 'Muy Baja', label: 'Muy Baja', color: 'from-[#D8DFF9] to-[#8C7FE9]' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Nombre A-Z' },
    { value: 'severity', label: 'Severidad' },
    { value: 'urgency', label: 'Urgencia' },
    { value: 'contagious', label: 'Contagiosidad' }
  ];

  // Obtener categorías únicas
  const categories = ['all', ...new Set(diseases.map(d => d.category))];

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedSeverity('all');
    setSelectedCategory('all');
    setSortBy('name');
  };

  // Estadísticas en tiempo real
  const stats = {
    total: diseases.length,
    filtered: filteredDiseases.length,
    urgent: diseases.filter(d => d.urgent).length,
    contagious: diseases.filter(d => d.contagious).length,
    highSeverity: diseases.filter(d => d.severity === 'Alta' || d.severity === 'Moderada-Alta').length
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96 animate-fadeIn">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] rounded-full animate-spin mx-auto">
              <div className="absolute inset-3 bg-white rounded-full"></div>
            </div>
            <FaSyncAlt className="w-8 h-8 text-[#8C7FE9] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-[#342B7C] mb-2">Cargando catálogo</h3>
          <p className="text-[#342B7C]/70 font-light">Preparando información especializada...</p>
          
          {/* Skeleton loader */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 animate-pulse">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-[#D8DFF9] rounded-xl"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-[#D8DFF9] rounded w-3/4"></div>
                    <div className="h-3 bg-[#D8DFF9] rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-[#D8DFF9] rounded"></div>
                  <div className="h-3 bg-[#D8DFF9] rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Premium con Controles */}
      <div className="
        bg-white/90 backdrop-blur-xl 
        rounded-3xl p-8 
        shadow-2xl 
        border border-white/40
        relative
        overflow-hidden
      ">
        {/* Efectos de fondo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#8C7FE9]/10 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#C19CFF]/10 rounded-full blur-3xl translate-y-16 -translate-x-16"></div>

        <div className="relative z-10">
          {/* Título y Estadísticas Premium */}
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8">
            <div className="flex-1 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] rounded-2xl flex items-center justify-center shadow-lg">
                  <FaLayerGroup className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-[#342B7C] font-sans tracking-tight">
                    Catálogo de Enfermedades
                  </h1>
                  <p className="text-[#342B7C]/70 font-light">
                    Sistema especializado en dermatología educativa
                  </p>
                </div>
              </div>
              
              {/* Estadísticas en tiempo real */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#8C7FE9] rounded-full animate-pulse"></div>
                  <span className="text-[#342B7C]/70">
                    <strong className="text-[#342B7C] font-semibold">{stats.filtered}</strong> de {stats.total} enfermedades
                  </span>
                </div>
                {stats.urgent > 0 && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#F15F79] rounded-full"></div>
                    <span className="text-[#342B7C]/70">
                      <strong className="text-[#F15F79] font-semibold">{stats.urgent}</strong> urgentes
                    </span>
                  </div>
                )}
                {stats.contagious > 0 && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#C19CFF] rounded-full"></div>
                    <span className="text-[#342B7C]/70">
                      <strong className="text-[#C19CFF] font-semibold">{stats.contagious}</strong> contagiosas
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Botón Reset Premium */}
            <button
              onClick={resetFilters}
              className="
                group relative
                inline-flex items-center space-x-3 
                px-6 py-4 
                bg-gradient-to-r from-[#342B7C] to-[#8C7FE9]
                text-white rounded-2xl 
                font-semibold
                shadow-2xl hover:shadow-3xl
                transition-all duration-500
                transform hover:scale-105
                overflow-hidden
                border border-white/20
              "
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <FaSyncAlt className="w-5 h-5 relative z-10 transform group-hover:rotate-180 transition-transform duration-500" />
              <span className="relative z-10">Reiniciar Filtros</span>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/30 group-hover:animate-shine transition-all duration-1000"></div>
            </button>
          </div>

          {/* Búsqueda Principal Premium */}
          <div className="relative group mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] rounded-2xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500"></div>
            <div className="relative">
              <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-[#8C7FE9] w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar enfermedades, síntomas, descripciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
                  w-full pl-16 pr-6 py-5
                  bg-white/80 backdrop-blur-xl
                  border-2 border-[#D8DFF9]
                  rounded-2xl
                  text-[#342B7C]
                  placeholder-[#8C7FE9]/60
                  focus:outline-none focus:border-[#8C7FE9] focus:ring-4 focus:ring-[#8C7FE9]/20
                  transition-all duration-500
                  shadow-lg hover:shadow-xl
                  text-lg
                  font-light
                "
              />
            </div>
          </div>

          {/* Controles de Filtro Avanzados */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Filtro por Severidad Premium */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#F15F79] to-[#8C7FE9] rounded-2xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500"></div>
              <div className="relative">
                <FaExclamationTriangle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8C7FE9] w-4 h-4" />
                <select
                  value={selectedSeverity}
                  onChange={(e) => setSelectedSeverity(e.target.value)}
                  className="
                    w-full pl-12 pr-4 py-4
                    bg-white/80 backdrop-blur-xl
                    border-2 border-[#D8DFF9]
                    rounded-2xl
                    text-[#342B7C]
                    focus:outline-none focus:border-[#8C7FE9] focus:ring-4 focus:ring-[#8C7FE9]/20
                    transition-all duration-500
                    shadow-lg hover:shadow-xl
                    appearance-none
                    font-medium
                  "
                >
                  {severityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filtro por Categoría Premium */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#258CAB] to-[#8C7FE9] rounded-2xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500"></div>
              <div className="relative">
                <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8C7FE9] w-4 h-4" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="
                    w-full pl-12 pr-4 py-4
                    bg-white/80 backdrop-blur-xl
                    border-2 border-[#D8DFF9]
                    rounded-2xl
                    text-[#342B7C]
                    focus:outline-none focus:border-[#8C7FE9] focus:ring-4 focus:ring-[#8C7FE9]/20
                    transition-all duration-500
                    shadow-lg hover:shadow-xl
                    appearance-none
                    font-medium
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

            {/* Ordenamiento Premium */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#4C2D4D] to-[#8C7FE9] rounded-2xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500"></div>
              <div className="relative">
                <FaSort className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8C7FE9] w-4 h-4" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="
                    w-full pl-12 pr-4 py-4
                    bg-white/80 backdrop-blur-xl
                    border-2 border-[#D8DFF9]
                    rounded-2xl
                    text-[#342B7C]
                    focus:outline-none focus:border-[#8C7FE9] focus:ring-4 focus:ring-[#8C7FE9]/20
                    transition-all duration-500
                    shadow-lg hover:shadow-xl
                    appearance-none
                    font-medium
                  "
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Indicadores de Filtros Activos */}
          {(searchTerm || selectedSeverity !== 'all' || selectedCategory !== 'all') && (
            <div className="mt-6 flex flex-wrap gap-2">
              {searchTerm && (
                <span className="inline-flex items-center space-x-2 px-3 py-2 bg-[#8C7FE9]/10 text-[#342B7C] rounded-xl text-sm font-medium border border-[#8C7FE9]/20">
                  <FaSearch className="w-3 h-3" />
                  <span>"{searchTerm}"</span>
                </span>
              )}
              {selectedSeverity !== 'all' && (
                <span className="inline-flex items-center space-x-2 px-3 py-2 bg-[#F15F79]/10 text-[#342B7C] rounded-xl text-sm font-medium border border-[#F15F79]/20">
                  <FaExclamationTriangle className="w-3 h-3" />
                  <span>{severityOptions.find(s => s.value === selectedSeverity)?.label}</span>
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center space-x-2 px-3 py-2 bg-[#258CAB]/10 text-[#342B7C] rounded-xl text-sm font-medium border border-[#258CAB]/20">
                  <FaFilter className="w-3 h-3" />
                  <span className="capitalize">{selectedCategory}</span>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Estado de Resultados Premium */}
      {filteredDiseases.length === 0 ? (
        <div className="
          text-center py-20 
          bg-white/90 backdrop-blur-xl 
          rounded-3xl 
          shadow-2xl 
          border border-white/40
          animate-fadeInUp
        ">
          <div className="w-32 h-32 bg-gradient-to-r from-[#FDEEFD] to-[#D8DFF9] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FaSearch className="w-12 h-12 text-[#8C7FE9]" />
          </div>
          <h3 className="text-2xl font-bold text-[#342B7C] mb-3 font-sans">
            No se encontraron enfermedades
          </h3>
          <p className="text-[#342B7C]/70 text-lg mb-8 max-w-md mx-auto font-light">
            No hay resultados que coincidan con tu búsqueda. 
            Intenta con otros términos o ajusta los filtros aplicados.
          </p>
          <button
            onClick={resetFilters}
            className="
              group relative
              inline-flex items-center space-x-3
              px-8 py-4
              bg-gradient-to-r from-[#342B7C] to-[#8C7FE9]
              text-white rounded-2xl
              font-semibold text-lg
              shadow-2xl hover:shadow-3xl
              transition-all duration-500
              transform hover:scale-105
              overflow-hidden
              border border-white/20
            "
          >
            <FaSyncAlt className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Mostrar Todas las Enfermedades</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>
      ) : (
        /* Grid de Enfermedades Premium */
        <div className="
          grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 
          gap-8
          animate-fadeInUp
        ">
          {filteredDiseases.map((disease, index) => (
            <div
              key={disease.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <DiseaseCard
                disease={disease}
                onClick={() => onDiseaseSelect(disease)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Footer del Grid Premium */}
      {filteredDiseases.length > 0 && (
        <div className="
          text-center pt-8 
          border-t border-[#342B7C]/10
          animate-fadeInUp
        ">
          <div className="
            inline-flex items-center space-x-4 
            bg-white/80 backdrop-blur-sm 
            px-6 py-4 
            rounded-2xl 
            shadow-lg 
            border border-white/20
          ">
            <FaInfoCircle className="w-5 h-5 text-[#8C7FE9]" />
            <p className="text-[#342B7C]/70 font-medium">
              Mostrando <strong className="text-[#342B7C] font-bold">{filteredDiseases.length}</strong> enfermedades dermatológicas
            </p>
          </div>
          
          {/* Indicadores de paginación visual */}
          <div className="flex justify-center space-x-3 mt-6">
            {[1, 2, 3, 4, 5].map((dot) => (
              <div
                key={dot}
                className="w-2 h-2 bg-[#8C7FE9] rounded-full opacity-40 animate-pulse"
                style={{ animationDelay: `${dot * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseaseGrid;