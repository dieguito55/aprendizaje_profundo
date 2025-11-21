import React from 'react';
import { 
  FaStethoscope, FaExclamationTriangle, FaShieldAlt, 
  FaVirus, FaClock, FaUserMd, FaChartLine, FaArrowRight
} from 'react-icons/fa';

const DiseaseCard = ({ disease, onClick }) => {
    // Imágenes médicas profesionales
  const getDiseaseImage = (diseaseName) => {
    const imageMap = {
      'Eccema': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop&q=85',
      'Melanoma': 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop&q=85',
      'Dermatitis Atópica': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&q=85',
      'Carcinoma Basocelular': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&h=600&fit=crop&q=85',
      'Nevus Melanocítico': 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=800&h=600&fit=crop&q=85',
      'Queratosis Benigna': 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=800&h=600&fit=crop&q=85',
      'Psoriasis': 'https://images.unsplash.com/photo-1579154204629-055a87ecfdd6?w=800&h=600&fit=crop&q=85',
      'Queratosis Seborreica': 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&h=600&fit=crop&q=85'
    };
    return imageMap[diseaseName] || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&q=85';
  };

  const getSeverityConfig = (severity) => {
    const configs = {
      'Alta': { color: '#DC2626', bg: 'bg-red-50', text: 'text-red-700', icon: FaExclamationTriangle },
      'Moderada-Alta': { color: '#EA580C', bg: 'bg-orange-50', text: 'text-orange-700', icon: FaExclamationTriangle },
      'Moderada': { color: '#D97706', bg: 'bg-amber-50', text: 'text-amber-700', icon: FaStethoscope },
      'Leve-Moderada': { color: '#A8D32C', bg: 'bg-[#A8D32C]/10', text: 'text-[#8ab824]', icon: FaStethoscope },
      'Leve': { color: '#A8D32C', bg: 'bg-[#A8D32C]/10', text: 'text-[#8ab824]', icon: FaShieldAlt },
      'Muy Baja': { color: '#64748B', bg: 'bg-slate-50', text: 'text-slate-700', icon: FaShieldAlt }
    };
    return configs[severity] || configs['Muy Baja'];
  };

  const severityConfig = getSeverityConfig(disease.severity);
  const SeverityIcon = severityConfig.icon;

  return (
    <article 
      onClick={onClick}
      className="group relative bg-white dark:bg-neutral-900 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border border-neutral-200 dark:border-neutral-700 hover:border-primary-400 hover:shadow-2xl"
      style={{
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
      }}
    >
      {/* Imagen principal 16:9 ratio */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <img 
          src={getDiseaseImage(disease.name)}
          alt={disease.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90" />
        
        {/* Badges estado - Top right */}
        {(disease.contagious || disease.urgent) && (
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {disease.contagious && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-600 shadow-lg">
                <FaVirus className="w-3 h-3 text-white" />
                <span className="text-[11px] font-bold text-white tracking-wide">CONTAGIOSO</span>
              </div>
            )}
            {disease.urgent && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-500 shadow-lg">
                <FaClock className="w-3 h-3 text-white" />
                <span className="text-[11px] font-bold text-white tracking-wide">URGENTE</span>
              </div>
            )}
          </div>
        )}

        {/* Icono grande - Top left */}
        <div className="absolute top-3 left-3">
          <div className="w-12 h-12 rounded-lg bg-white dark:bg-neutral-900/95 backdrop-blur-sm shadow-xl dark:shadow-neutral-900/50 flex items-center justify-center">
            <span className="text-2xl">{disease.icon}</span>
          </div>
        </div>

        {/* Título sobre imagen - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg leading-tight mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {disease.name}
          </h3>
          <p className="text-white/90 text-xs italic truncate">
            {disease.scientificName}
          </p>
        </div>
      </div>

      {/* Contenido - Padding 20px (1.25rem) según UX/UI standards */}
      <div className="p-5">
        
        {/* Severidad badge */}
        <div className="mb-4">
          <div 
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${severityConfig.bg} border`}
            style={{ borderColor: severityConfig.color }}
          >
            <SeverityIcon className="w-3.5 h-3.5" style={{ color: severityConfig.color }} />
            <span className={`text-xs font-bold ${severityConfig.text}`} style={{ letterSpacing: '0.3px' }}>
              SEVERIDAD: {disease.severity.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Descripción - Line height 1.6 para legibilidad */}
        <p className="text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 text-sm leading-relaxed mb-4 line-clamp-2" style={{ lineHeight: '1.6' }}>
          {disease.description}
        </p>

        {/* Metadata grid */}
        <div className="space-y-2 pb-4 mb-4 border-b border-neutral-100 dark:border-neutral-800">
          {disease.specialty && (
            <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500">
              <FaUserMd className="w-3.5 h-3.5 text-[#A8D32C] flex-shrink-0" />
              <span className="font-medium">{disease.specialty}</span>
            </div>
          )}
          {disease.prevalence && (
            <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500">
              <FaChartLine className="w-3.5 h-3.5 text-[#A8D32C] flex-shrink-0" />
              <span className="font-medium">Prevalencia: {disease.prevalence}</span>
            </div>
          )}
        </div>

        {/* CTA Button - Height 44px (estándar móvil touch target) */}
        <button 
          className="w-full h-11 flex items-center justify-center gap-2 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:shadow-lg dark:hover:shadow-neutral-900/50"
          style={{ backgroundColor: '#A8D32C' }}
        >
          <span style={{ letterSpacing: '0.3px' }}>VER DETALLES</span>
          <FaArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </article>
  );
};

export default DiseaseCard;
