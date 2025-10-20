import React, { useState, useEffect } from 'react';
import DiseaseCard from './DiseaseCard';
import { FaSearch, FaFilter, FaSort, FaSyncAlt } from 'react-icons/fa';

const DiseaseGrid = ({ diseases, onDiseaseSelect }) => {
  const [filteredDiseases, setFilteredDiseases] = useState(diseases);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isLoading, setIsLoading] = useState(true);

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
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
        )
      );
    }

    // Filtro por severidad
    if (selectedSeverity !== 'all') {
      results = results.filter(disease => disease.severity === selectedSeverity);
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
        default:
          return 0;
      }
    });

    setFilteredDiseases(results);
  }, [diseases, searchTerm, selectedSeverity, sortBy]);

  const severityOptions = [
    { value: 'all', label: 'Todas las Severidades', color: 'from-[#082543] to-[#258CAB]' },
    { value: 'Alta', label: 'Alta Severidad', color: 'from-[#F15F79] to-[#4C2D4D]' },
    { value: 'Moderada-Alta', label: 'Moderada-Alta', color: 'from-[#F15F79] to-[#258CAB]' },
    { value: 'Moderada', label: 'Moderada', color: 'from-[#258CAB] to-[#4C2D4D]' },
    { value: 'Leve-Moderada', label: 'Leve-Moderada', color: 'from-[#258CAB] to-[#082543]' },
    { value: 'Leve', label: 'Leve', color: 'from-[#082543] to-[#258CAB]' },
    { value: 'Muy Baja', label: 'Muy Baja', color: 'from-gray-400 to-gray-600' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Nombre A-Z' },
    { value: 'severity', label: 'Severidad' },
    { value: 'urgency', label: 'Urgencia' }
  ];

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedSeverity('all');
    setSortBy('name');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-[#F15F79] to-[#258CAB] rounded-full animate-spin mx-auto mb-4">
              <div className="absolute inset-2 bg-white rounded-full"></div>
            </div>
            <FaSyncAlt className="w-6 h-6 text-[#082543] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="text-[#082543]/70 font-medium">Cargando enfermedades...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header con Controles */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          {/* Título y Estadísticas */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#082543] font-serif mb-2">
              Catálogo de Enfermedades
            </h1>
            <p className="text-[#082543]/70">
              {filteredDiseases.length} de {diseases.length} enfermedades encontradas
            </p>
          </div>

          {/* Botón Reset */}
          <button
            onClick={resetFilters}
            className="
              inline-flex items-center space-x-2 
              px-4 py-2 
              bg-gradient-to-r from-[#082543] to-[#4C2D4D]
              text-white rounded-xl 
              font-semibold text-sm
              shadow-lg hover:shadow-xl
              transition-all duration-300
              hover:scale-105
            "
          >
            <FaSyncAlt className="w-4 h-4" />
            <span>Reiniciar Filtros</span>
          </button>
        </div>

        {/* Controles de Filtro y Búsqueda */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          {/* Búsqueda */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#F15F79] to-[#258CAB] rounded-xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300"></div>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#082543]/50 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar enfermedades, síntomas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
                  w-full pl-12 pr-4 py-3
                  bg-white/90 backdrop-blur-sm
                  border border-[#082543]/10
                  rounded-xl
                  text-[#082543]
                  placeholder-[#082543]/50
                  focus:outline-none focus:ring-2 focus:ring-[#F15F79]/30
                  transition-all duration-300
                "
              />
            </div>
          </div>

          {/* Filtro por Severidad */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#258CAB] to-[#4C2D4D] rounded-xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300"></div>
            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#082543]/50 w-4 h-4" />
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="
                  w-full pl-12 pr-4 py-3
                  bg-white/90 backdrop-blur-sm
                  border border-[#082543]/10
                  rounded-xl
                  text-[#082543]
                  focus:outline-none focus:ring-2 focus:ring-[#258CAB]/30
                  transition-all duration-300
                  appearance-none
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

          {/* Ordenamiento */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4C2D4D] to-[#082543] rounded-xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300"></div>
            <div className="relative">
              <FaSort className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#082543]/50 w-4 h-4" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="
                  w-full pl-12 pr-4 py-3
                  bg-white/90 backdrop-blur-sm
                  border border-[#082543]/10
                  rounded-xl
                  text-[#082543]
                  focus:outline-none focus:ring-2 focus:ring-[#4C2D4D]/30
                  transition-all duration-300
                  appearance-none
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
      </div>

      {/* Estado de Resultados */}
      {filteredDiseases.length === 0 ? (
        <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20">
          <div className="w-24 h-24 bg-gradient-to-r from-[#082543]/10 to-[#258CAB]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaSearch className="w-8 h-8 text-[#082543]/40" />
          </div>
          <h3 className="text-xl font-bold text-[#082543] mb-2">
            No se encontraron enfermedades
          </h3>
          <p className="text-[#082543]/70 mb-4">
            Intenta ajustar los filtros o términos de búsqueda
          </p>
          <button
            onClick={resetFilters}
            className="
              inline-flex items-center space-x-2
              px-6 py-3
              bg-gradient-to-r from-[#F15F79] to-[#258CAB]
              text-white rounded-xl
              font-semibold
              shadow-lg hover:shadow-xl
              transition-all duration-300
              hover:scale-105
            "
          >
            <FaSyncAlt className="w-4 h-4" />
            <span>Mostrar Todas</span>
          </button>
        </div>
      ) : (
        /* Grid de Enfermedades Mejorado */
        <div className="
          grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 
          gap-8
          animate-fadeInUp
        ">
          {filteredDiseases.map((disease, index) => (
            <div
              key={disease.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <DiseaseCard
                disease={disease}
                onClick={() => onDiseaseSelect(disease)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Footer del Grid */}
      {filteredDiseases.length > 0 && (
        <div className="text-center pt-8 border-t border-[#082543]/10">
          <p className="text-[#082543]/50 text-sm font-light">
            Mostrando {filteredDiseases.length} enfermedades dermatológicas
          </p>
          <div className="flex justify-center space-x-1 mt-2">
            {[1, 2, 3].map((dot) => (
              <div
                key={dot}
                className="w-1 h-1 bg-[#082543]/20 rounded-full"
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseaseGrid;