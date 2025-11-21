import React, { useEffect } from 'react';
import { 
  FaTimes, FaStethoscope, FaExclamationTriangle, FaShieldAlt, 
  FaPills, FaHeartbeat, FaUserMd, FaVirus, FaClock,
  FaCheckCircle, FaBook, FaBan, FaChartLine, FaHospital
} from 'react-icons/fa';

const DiseaseDetail = ({ disease, onClose }) => {
    
  // Usar imagen basada en el ID de la enfermedad
  const getDiseaseImage = (disease) => {
    return `/images/diseases/${disease.id}.jpg`;
  };

  const getSeverityConfig = (severity) => {
    const configs = {
      'Alta': { color: '#DC2626', icon: FaExclamationTriangle, bg: 'bg-red-600' },
      'Moderada-Alta': { color: '#EA580C', icon: FaExclamationTriangle, bg: 'bg-orange-600' },
      'Moderada': { color: '#D97706', icon: FaStethoscope, bg: 'bg-amber-600' },
      'Leve-Moderada': { color: '#A8D32C', icon: FaStethoscope, bg: 'bg-[#A8D32C]' },
      'Leve': { color: '#A8D32C', icon: FaShieldAlt, bg: 'bg-[#A8D32C]' },
      'Muy Baja': { color: '#64748B', icon: FaShieldAlt, bg: 'bg-slate-600' }
    };
    return configs[severity] || configs['Muy Baja'];
  };

  const severityConfig = getSeverityConfig(disease.severity);
  const SeverityIcon = severityConfig.icon;

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div 
      className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-scaleIn"
      style={{ 
        maxHeight: '80vh',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
      }}
    >
      {/* Header con imagen - Compacto */}
      <div className="relative h-[140px] flex-shrink-0 overflow-hidden bg-neutral-900">
        <img 
          src={getDiseaseImage(disease)}
          alt={disease.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
        
        {/* Close button - 48x48 touch target */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-white dark:bg-neutral-900/90 hover:bg-white dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:bg-neutral-900 rounded-full transition-all duration-200 shadow-xl dark:shadow-neutral-900/50 z-10"
        >
          <FaTimes className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
        </button>

        {/* Header content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <div>
            {/* Badges row */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${severityConfig.bg} shadow-lg`}>
                <SeverityIcon className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white tracking-wide">
                  {disease.severity.toUpperCase()}
                </span>
              </div>
              
              {disease.contagious && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 shadow-lg">
                  <FaVirus className="w-4 h-4 text-white" />
                  <span className="text-sm font-bold text-white tracking-wide">CONTAGIOSO</span>
                </div>
              )}
              
              {disease.urgent && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 shadow-lg">
                  <FaClock className="w-4 h-4 text-white" />
                  <span className="text-sm font-bold text-white tracking-wide">URGENTE</span>
                </div>
              )}
            </div>

            {/* Title */}
            <div className="flex items-end gap-2">
              <div className="w-10 h-10 rounded-lg bg-white dark:bg-neutral-900/95 backdrop-blur-sm shadow-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">{disease.icon}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-white mb-0.5 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {disease.name}
                </h2>
                <p className="text-white/90 text-xs italic mb-1 truncate">
                  {disease.scientificName}
                </p>
                {disease.specialty && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-900/20 backdrop-blur-md border border-white/30">
                    <FaUserMd className="w-3.5 h-3.5 text-white" />
                    <span className="text-xs font-semibold text-white">{disease.specialty}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable content - Compacto */}
      <div className="flex-1 overflow-y-auto scrollbar-thin bg-neutral-50 dark:bg-neutral-900">
        <div className="px-4 py-4 space-y-4">
          
          {/* Stats cards - Compactos */}
          {(disease.prevalence || disease.survivalRate) && (
            <div className="grid grid-cols-2 gap-2">
              {disease.prevalence && (
                <div className="bg-white dark:bg-neutral-900 rounded-lg p-3 shadow border border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center gap-2 mb-1">
                    <FaChartLine className="w-4 h-4 text-[#A8D32C]" />
                    <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Prevalencia</span>
                  </div>
                  <p className="text-lg font-bold text-neutral-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {disease.prevalence}
                  </p>
                </div>
              )}
              
              {disease.survivalRate && (
                <div className="bg-white dark:bg-neutral-900 rounded-lg p-3 shadow border border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center gap-2 mb-1">
                    <FaHeartbeat className="w-4 h-4 text-[#A8D32C]" />
                    <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Supervivencia</span>
                  </div>
                  <p className="text-lg font-bold text-[#A8D32C]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {disease.survivalRate}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <section className="bg-white dark:bg-neutral-900 rounded-lg p-4 shadow border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2 mb-3">
              <FaBook className="w-4 h-4 text-[#A8D32C]" />
              <h3 className="text-base font-bold text-neutral-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Descripción Clínica
              </h3>
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed" style={{ lineHeight: '1.6' }}>
              {disease.description}
            </p>
          </section>

          {/* Symptoms */}
          {disease.symptoms && disease.symptoms.length > 0 && (
            <section className="bg-white dark:bg-neutral-900 rounded-lg p-4 shadow border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-2 mb-3">
                <FaExclamationTriangle className="w-4 h-4 text-red-600" />
                <h3 className="text-base font-bold text-neutral-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Síntomas Principales
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {disease.symptoms.slice(0, 6).map((symptom, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-red-50 border border-red-100">
                    <FaCheckCircle className="w-3 h-3 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">{symptom}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Treatments */}
          {disease.treatments && disease.treatments.length > 0 && (
            <section className="bg-white dark:bg-neutral-900 rounded-lg p-4 shadow border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-2 mb-3">
                <FaPills className="w-4 h-4 text-[#A8D32C]" />
                <h3 className="text-base font-bold text-neutral-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Tratamientos
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {disease.treatments.slice(0, 6).map((treatment, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-primary-50 border border-primary-100">
                    <FaCheckCircle className="w-3 h-3 text-[#A8D32C] flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">{treatment}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Prevention & Risk Factors combinados */}
          <div className="grid grid-cols-2 gap-2">
            {disease.prevention && disease.prevention.length > 0 && (
              <section className="bg-white dark:bg-neutral-900 rounded-lg p-4 shadow border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-2 mb-2">
                  <FaShieldAlt className="w-4 h-4 text-[#A8D32C]" />
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Prevención
                  </h3>
                </div>
                <ul className="space-y-1">
                  {disease.prevention.slice(0, 3).map((prevention, index) => (
                    <li key={index} className="flex items-start gap-1.5">
                      <FaCheckCircle className="w-2.5 h-2.5 text-[#A8D32C] flex-shrink-0 mt-1" />
                      <span className="text-xs text-neutral-700 dark:text-neutral-300 leading-tight">{prevention}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {disease.riskFactors && disease.riskFactors.length > 0 && (
              <section className="bg-white dark:bg-neutral-900 rounded-lg p-4 shadow border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-2 mb-2">
                  <FaBan className="w-4 h-4 text-amber-600" />
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Factores de Riesgo
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1">
                  {disease.riskFactors.slice(0, 4).map((factor, index) => (
                    <span 
                      key={index} 
                      className="inline-block px-2 py-1 bg-amber-50 text-amber-800 rounded text-[10px] font-semibold border border-amber-200"
                    >
                      {factor}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Medical Disclaimer - Compacto */}
          <div className="rounded-lg p-4 shadow border-2" style={{ backgroundColor: '#A8D32C', borderColor: '#8ab824' }}>
            <div className="flex items-start gap-3">
              <FaHospital className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Consulta Médica Profesional
                </h4>
                <p className="text-white/95 text-xs leading-relaxed">
                  Información educativa. Consulte con un <strong>dermatólogo certificado</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetail;
