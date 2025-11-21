import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import DiseaseGrid from '../components/disease/DiseaseGrid';
import DiseaseDetail from '../components/disease/DiseaseDetail';
import { DISEASES_DATA } from '../data/diseases';
import { 
  FaHome, FaChevronRight, FaSearch, FaFilter, FaMicroscope, 
  FaExclamationTriangle, FaShieldAlt, FaBookMedical, FaStethoscope,
  FaInfoCircle, FaTimes, FaChartBar, FaClock
} from 'react-icons/fa';

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
    <>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
        {/* Breadcrumb Navigation */}
        <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Link to="/" className="flex items-center space-x-2 text-[#A8D32C] hover:text-[#A8D32C]">
              <FaHome className="w-4 h-4" />
              <span className="font-semibold">Inicio</span>
            </Link>
            <FaChevronRight className="w-3 h-3 text-neutral-400 dark:text-neutral-500" />
            <span className="text-neutral-900 dark:text-white font-semibold">Enfermedades</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-4 bg-[#A8D32C] rounded-xl">
              <FaMicroscope className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Catálogo de Enfermedades Dermatológicas
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                Base de conocimiento especializada • {stats.total} patologías registradas
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Enfermedades', value: stats.total, icon: FaBookMedical, color: 'primary' },
            { label: 'Casos Urgentes', value: stats.urgent, icon: FaExclamationTriangle, color: 'red' },
            { label: 'Contagiosas', value: stats.contagious, icon: FaShieldAlt, color: 'yellow' },
            { label: 'Alta Severidad', value: stats.highSeverity, icon: FaStethoscope, color: 'primary' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl p-6 hover:border-primary-300 hover:shadow-lg dark:hover:shadow-neutral-900/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[#A8D32C]/10 rounded-lg">
                  <stat.icon className={`w-6 h-6 ${
                    stat.color === 'red' ? 'text-red-500' :
                    stat.color === 'yellow' ? 'text-yellow-500' :
                    'text-[#A8D32C]'
                  }`} />
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold text-neutral-900 dark:text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {stat.value}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 dark:text-neutral-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, síntomas o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl focus:border-[#A8D32C] focus:outline-none transition-all duration-200"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:text-neutral-500"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <div className="relative">
                <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500 w-4 h-4" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl focus:border-[#A8D32C] focus:outline-none appearance-none transition-all duration-200"
                  style={{ fontFamily: 'Inter, sans-serif' }}
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

          {/* Results Counter */}
          <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 dark:text-neutral-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                <FaChartBar className="w-4 h-4 text-[#A8D32C]" />
                <span>
                  Mostrando <span className="font-bold text-[#A8D32C]">{filteredDiseases.length}</span> de{' '}
                  <span className="font-bold text-neutral-900 dark:text-white">{stats.total}</span> enfermedades
                </span>
              </div>
              {(searchTerm || selectedCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="text-[#A8D32C] hover:text-[#A8D32C] font-semibold flex items-center space-x-1"
                >
                  <FaTimes className="w-3 h-3" />
                  <span>Limpiar filtros</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Diseases Grid */}
        {filteredDiseases.length > 0 ? (
          <DiseaseGrid 
            diseases={filteredDiseases}
            onDiseaseSelect={setSelectedDisease}
          />
        ) : (
          <div className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl p-12 text-center">
            <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSearch className="w-10 h-10 text-neutral-400 dark:text-neutral-500" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              No se encontraron resultados
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              No hay enfermedades que coincidan con tu búsqueda. Intenta con otros términos.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-[#A8D32C] text-white rounded-xl font-semibold hover:bg-[#8ab824] transition-all duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Educational Notice */}
        <div className="mt-8 bg-white dark:bg-neutral-900 border-2 border-[#C5E86C] rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-[#A8D32C]/10 rounded-lg flex-shrink-0">
              <FaInfoCircle className="w-6 h-6 text-[#A8D32C]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Propósito Educativo
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Este catálogo tiene fines <strong className="text-[#A8D32C]">exclusivamente educativos</strong>. 
                La información proporcionada no sustituye el diagnóstico médico profesional. 
                Consulte siempre con un dermatólogo certificado para evaluación y tratamiento adecuados.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Modal - Renderizado con Portal fuera del Layout */}
      {selectedDisease && createPortal(
        <div 
          className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          style={{ zIndex: 99999 }}
        >
          {/* Overlay backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedDisease(null)}
          />
          
            {/* Modal Content - Card compacto centrado */}
          <div className="relative w-full max-w-4xl z-10">
            <DiseaseDetail 
              disease={selectedDisease}
              onClose={() => setSelectedDisease(null)}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Diseases;
