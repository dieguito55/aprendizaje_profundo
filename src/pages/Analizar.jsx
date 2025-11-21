import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import {
  FaHome, FaChevronRight, FaUserMd, FaCheckCircle, FaTimes, 
  FaClock, FaBrain, FaCloudUploadAlt, FaChartBar, FaShieldAlt,
  FaExclamationTriangle, FaFilter, FaSearch, FaStar, FaEye,
  FaFileExport, FaHistory, FaLightbulb, FaAward, FaMicroscope,
  FaList, FaMapMarkerAlt, FaCalendarAlt, FaStethoscope
} from 'react-icons/fa';

const Analizar = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [filterQuality, setFilterQuality] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [selectedImage, setSelectedImage] = useState(null);
  const [pendingImages, setPendingImages] = useState([]);
  const [approvedImages, setApprovedImages] = useState([]);
  const [rejectedImages, setRejectedImages] = useState([]);
  const [rejectReason, setRejectReason] = useState('');

  // Cargar imágenes del historial con confianza >= 80%
  React.useEffect(() => {
    loadImagesFromHistory();
  }, []);

  const loadImagesFromHistory = () => {
    try {
      const history = JSON.parse(localStorage.getItem('dermapp_history') || '[]');
      const validatedData = JSON.parse(localStorage.getItem('dermapp_validated') || '[]');
      const rejectedData = JSON.parse(localStorage.getItem('dermapp_rejected') || '[]');
      
      // Filtrar imágenes con confianza >= 80% que no han sido validadas o rechazadas
      const validatedIds = validatedData.map(v => v.id);
      const rejectedIds = rejectedData.map(r => r.id);
      
      const pending = history
        .filter(item => {
          const confidence = parseFloat(item.confidence);
          return confidence >= 80 && 
                 !validatedIds.includes(item.id) && 
                 !rejectedIds.includes(item.id);
        })
        .map(item => ({
          id: item.id,
          disease: item.diagnosis,
          confidence: parseFloat(item.confidence),
          priority: parseFloat(item.confidence) >= 90 ? 'high' : parseFloat(item.confidence) >= 85 ? 'medium' : 'low',
          date: new Date(item.timestamp).toLocaleString('es-ES'),
          specialist: 'Sistema IA',
          img: item.image || '/derma1.png',
          aiVersion: 'v1.0'
        }));
      
      const approved = validatedData.map(item => ({
        id: item.id,
        disease: item.diagnosis,
        confidence: parseFloat(item.confidence),
        date: new Date(item.validatedAt).toLocaleDateString('es-ES'),
        reviewer: item.validatedBy || 'Usuario',
        img: item.image || '/derma1.png'
      }));
      
      const rejected = rejectedData.map(item => ({
        id: item.id,
        disease: item.diagnosis,
        confidence: parseFloat(item.confidence),
        reason: item.reason || 'Sin especificar',
        date: new Date(item.rejectedAt).toLocaleDateString('es-ES'),
        img: item.image || '/derma1.png'
      }));
      
      setPendingImages(pending);
      setApprovedImages(approved);
      setRejectedImages(rejected);
    } catch (e) {
      console.error('Error loading images:', e);
    }
  };

  const handleApprove = (image) => {
    try {
      const validated = JSON.parse(localStorage.getItem('dermapp_validated') || '[]');
      const newValidation = {
        id: image.id,
        diagnosis: image.disease,
        confidence: image.confidence,
        image: image.img,
        validatedBy: 'Usuario',
        validatedAt: Date.now(),
        correctDiagnosis: image.disease
      };
      
      validated.push(newValidation);
      localStorage.setItem('dermapp_validated', JSON.stringify(validated));
      loadImagesFromHistory();
    } catch (e) {
      console.error('Error approving image:', e);
    }
  };

  const handleReject = (image, reason) => {
    try {
      const rejected = JSON.parse(localStorage.getItem('dermapp_rejected') || '[]');
      const newRejection = {
        id: image.id,
        diagnosis: image.disease,
        confidence: image.confidence,
        image: image.img,
        rejectedBy: 'Usuario',
        rejectedAt: Date.now(),
        reason: reason || 'Sin especificar'
      };
      
      rejected.push(newRejection);
      localStorage.setItem('dermapp_rejected', JSON.stringify(rejected));
      loadImagesFromHistory();
    } catch (e) {
      console.error('Error rejecting image:', e);
    }
  };

  const stats = [
    { label: 'Pendientes Calificación', value: pendingImages.length, icon: FaClock, color: 'amber', change: '+3', trend: 'up' },
    { label: 'Validadas y Aprobadas', value: approvedImages.length, icon: FaCheckCircle, color: 'green', change: '+8', trend: 'up' },
    { label: 'Rechazadas', value: rejectedImages.length, icon: FaTimes, color: 'red', change: '-2', trend: 'down' },
    { label: 'Precisión del Modelo', value: '94.2%', icon: FaBrain, color: 'primary', change: '+2.1%', trend: 'up' }
  ];

  const ImageCard = ({ image, type = 'pending' }) => {
    const priorityConfig = {
      high: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', label: 'ALTA PRIORIDAD' },
      medium: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300', label: 'PRIORIDAD MEDIA' },
      low: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', label: 'PRIORIDAD BAJA' }
    };

    const priority = image.priority ? priorityConfig[image.priority] : null;

    return (
      <article className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:shadow-2xl transition-all duration-300 group">
        {/* Imagen con overlay */}
        <div className="relative h-56 bg-neutral-900 overflow-hidden">
          <img 
            src={image.img}
            alt={image.disease}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            {priority && type === 'pending' && (
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${priority.bg} ${priority.text} text-[10px] font-bold border ${priority.border} shadow-lg`}>
                <FaExclamationTriangle className="w-3 h-3" />
                {priority.label}
              </span>
            )}
            
            {type === 'approved' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#8ab824] text-white text-[10px] font-bold shadow-lg">
                <FaCheckCircle className="w-3 h-3" />
                APROBADA
              </span>
            )}
            
            {type === 'rejected' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-600 text-white text-[10px] font-bold shadow-lg">
                <FaTimes className="w-3 h-3" />
                RECHAZADA
              </span>
            )}

            <div className="ml-auto px-3 py-1.5 rounded-md bg-white dark:bg-neutral-900/95 backdrop-blur-sm shadow-lg">
              <span className="text-sm font-bold" style={{ color: '#A8D32C' }}>
                {image.confidence}%
              </span>
            </div>
          </div>

          {/* Bottom info on image */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-bold text-white text-base leading-tight mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {image.disease}
            </h3>
            <div className="flex items-center gap-2 text-xs text-white/90">
              <FaClock className="w-3 h-3" />
              <span>{image.date.split(' ')[0]}</span>
            </div>
          </div>
        </div>

        {/* Card content */}
        <div className="p-4">
          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 dark:text-neutral-500">Nivel de Confianza</span>
              <span className="text-xs font-bold text-neutral-900 dark:text-white">{image.confidence}%</span>
            </div>
            <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className="h-2 rounded-full transition-all duration-700"
                style={{ 
                  width: `${image.confidence}%`,
                  backgroundColor: image.confidence >= 90 ? '#A8D32C' : image.confidence >= 80 ? '#D97706' : '#DC2626'
                }}
              />
            </div>
          </div>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-2 mb-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#A8D32C]/10 flex items-center justify-center">
                <FaBrain className="w-3.5 h-3.5 text-[#A8D32C]" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wide font-semibold">Modelo IA</p>
                <p className="text-xs font-bold text-neutral-900 dark:text-white">{image.aiVersion || 'v1.0'}</p>
              </div>
            </div>
            
            {image.specialist && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#A8D32C]/10 flex items-center justify-center">
                  <FaUserMd className="w-3.5 h-3.5 text-[#A8D32C]" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wide font-semibold">Asignado</p>
                  <p className="text-xs font-bold text-neutral-900 dark:text-white truncate">{image.specialist}</p>
                </div>
              </div>
            )}

            {image.reviewer && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#A8D32C]/10 flex items-center justify-center">
                  <FaAward className="w-3.5 h-3.5 text-[#A8D32C]" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wide font-semibold">Validado</p>
                  <p className="text-xs font-bold text-neutral-900 dark:text-white truncate">{image.reviewer}</p>
                </div>
              </div>
            )}

            {image.reason && (
              <div className="col-span-2">
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wide font-semibold mb-1">Motivo Rechazo</p>
                <p className="text-xs text-red-700 font-medium">{image.reason}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          {type === 'pending' && (
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => handleApprove(image)}
                className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#A8D32C]/10 hover:bg-[#C5E86C]/20 text-[#8ab824] font-bold text-xs transition-all duration-200 hover:shadow-md"
              >
                <FaCheckCircle className="w-3.5 h-3.5" />
                Aprobar
              </button>
              <button 
                onClick={() => setSelectedImage({ ...image, modalType: 'reject' })}
                className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs transition-all duration-200 hover:shadow-md"
              >
                <FaTimes className="w-3.5 h-3.5" />
                Rechazar
              </button>
              <button 
                onClick={() => setSelectedImage({ ...image, modalType: 'pending' })}
                className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition-all duration-200 hover:shadow-md"
              >
                <FaEye className="w-3.5 h-3.5" />
                Ver
              </button>
            </div>
          )}

          {type === 'approved' && (
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#A8D32C]/10 hover:bg-[#C5E86C]/20 text-[#8ab824] font-bold text-xs transition-all duration-200">
                <FaFileExport className="w-3.5 h-3.5" />
                Exportar
              </button>
              <button 
                onClick={() => setSelectedImage({ ...image, modalType: 'approved' })}
                className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition-all duration-200"
              >
                <FaEye className="w-3.5 h-3.5" />
                Ver
              </button>
            </div>
          )}

          {type === 'rejected' && (
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold text-xs transition-all duration-200">
                <FaHistory className="w-3.5 h-3.5" />
                Revisar
              </button>
              <button 
                onClick={() => setSelectedImage({ ...image, modalType: 'rejected' })}
                className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition-all duration-200"
              >
                <FaEye className="w-3.5 h-3.5" />
                Ver
              </button>
            </div>
          )}
        </div>
      </article>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm">
              <Link to="/" className="flex items-center space-x-2 text-[#A8D32C] hover:text-[#A8D32C] transition-colors">
                <FaHome className="w-4 h-4" />
                <span className="font-semibold">Inicio</span>
              </Link>
              <FaChevronRight className="w-3 h-3 text-neutral-400 dark:text-neutral-500" />
              <span className="text-neutral-900 dark:text-white font-semibold">Sistema de Análisis Médico</span>
            </div>
            
            <div className="hidden md:flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 text-neutral-700 dark:text-neutral-300 font-semibold text-sm transition-all duration-200 hover:shadow-md">
                <FaFileExport className="w-4 h-4" />
                Exportar Datos
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm text-white transition-all duration-200 hover:shadow-lg dark:hover:shadow-neutral-900/50" style={{ backgroundColor: '#A8D32C' }}>
                <FaCloudUploadAlt className="w-4 h-4" />
                Cargar Imágenes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-xl dark:shadow-neutral-900/50" style={{ backgroundColor: '#A8D32C' }}>
              <FaMicroscope className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-white leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Sistema de Análisis Dermatológico
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 mt-1 text-base">
                Plataforma profesional de revisión médica con IA • Reentrenamiento continuo del modelo
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid - 4 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorMap = {
              amber: { bg: 'bg-amber-50', text: 'text-amber-700', icon: 'text-amber-600', border: 'border-amber-200' },
              green: { bg: 'bg-[#A8D32C]/10', text: 'text-[#8ab824]', icon: 'text-[#A8D32C]', border: 'border-[#C5E86C]' },
              red: { bg: 'bg-red-50', text: 'text-red-700', icon: 'text-red-600', border: 'border-red-200' },
              primary: { bg: 'bg-[#A8D32C]/10', text: 'text-[#8ab824]', icon: 'text-[#A8D32C]', border: 'border-[#C5E86C]' }
            };
            const colors = colorMap[stat.color];

            return (
              <div key={index} className={`bg-white dark:bg-neutral-900 rounded-xl p-5 border-2 ${colors.border} hover:shadow-xl dark:shadow-neutral-900/50 transition-all duration-300`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${colors.bg} ${colors.text}`}>
                    <span className="text-xs font-bold">{stat.change}</span>
                    {stat.trend === 'up' ? '↑' : '↓'}
                  </div>
                </div>
                <p className="text-3xl font-bold text-neutral-900 dark:text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {stat.value}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs para filtrar por estado */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm mb-6">
          <div className="flex border-b border-neutral-200 dark:border-neutral-700">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold transition-all duration-200 ${
                activeTab === 'all'
                  ? 'border-b-3 text-neutral-900 dark:text-white'
                  : 'text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:bg-neutral-900'
              }`}
              style={activeTab === 'all' ? { borderBottomColor: '#A8D32C', borderBottomWidth: '3px' } : {}}
            >
              <FaList className="w-4 h-4" />
              <span>Todas</span>
              <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                {pendingImages.length + approvedImages.length + rejectedImages.length}
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab('pending')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold transition-all duration-200 ${
                activeTab === 'pending'
                  ? 'border-b-3 text-neutral-900 dark:text-white'
                  : 'text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:bg-neutral-900'
              }`}
              style={activeTab === 'pending' ? { borderBottomColor: '#F59E0B', borderBottomWidth: '3px' } : {}}
            >
              <FaClock className="w-4 h-4" />
              <span>Pendientes</span>
              <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                {pendingImages.length}
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab('approved')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold transition-all duration-200 ${
                activeTab === 'approved'
                  ? 'border-b-3 text-neutral-900 dark:text-white'
                  : 'text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:bg-neutral-900'
              }`}
              style={activeTab === 'approved' ? { borderBottomColor: '#A8D32C', borderBottomWidth: '3px' } : {}}
            >
              <FaCheckCircle className="w-4 h-4" />
              <span>Validadas</span>
              <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold bg-[#C5E86C]/20 text-[#8ab824]">
                {approvedImages.length}
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab('rejected')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold transition-all duration-200 ${
                activeTab === 'rejected'
                  ? 'border-b-3 text-neutral-900 dark:text-white'
                  : 'text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:bg-neutral-900'
              }`}
              style={activeTab === 'rejected' ? { borderBottomColor: '#EF4444', borderBottomWidth: '3px' } : {}}
            >
              <FaTimes className="w-4 h-4" />
              <span>Rechazadas</span>
              <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
                {rejectedImages.length}
              </span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar - Diseño mejorado */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border-2 shadow-lg mb-8" style={{ borderColor: '#A8D32C' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#A8D32C' }}>
              <FaFilter className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Filtros y Búsqueda Avanzada
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-2 uppercase tracking-wide">
                <FaSearch className="inline w-3 h-3 mr-1.5" />
                Búsqueda
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enfermedad, especialista..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg focus:border-[#A8D32C] focus:ring-2 focus:ring-[#C5E86C]/30 outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-2 uppercase tracking-wide">
                <FaShieldAlt className="inline w-3 h-3 mr-1.5" />
                Calidad de Confianza
              </label>
              <select
                value={filterQuality}
                onChange={(e) => setFilterQuality(e.target.value)}
                className="w-full px-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg focus:border-[#A8D32C] focus:ring-2 focus:ring-[#C5E86C]/30 outline-none transition-all text-sm font-semibold appearance-none bg-white dark:bg-neutral-900 cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%232F8F4E'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25rem' }}
              >
                <option value="all">📊 Todas las Calidades</option>
                <option value="excellent">⭐ Excelente (95-100%)</option>
                <option value="good">✅ Buena (90-94%)</option>
                <option value="acceptable">⚠️ Aceptable (80-89%)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-2 uppercase tracking-wide">
                <FaChartBar className="inline w-3 h-3 mr-1.5" />
                Ordenamiento
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg focus:border-[#A8D32C] focus:ring-2 focus:ring-[#C5E86C]/30 outline-none transition-all text-sm font-semibold appearance-none bg-white dark:bg-neutral-900 cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%232F8F4E'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25rem' }}
              >
                <option value="date">🕐 Más Recientes Primero</option>
                <option value="confidence">📈 Mayor Confianza Primero</option>
                <option value="priority">🔥 Mayor Prioridad Primero</option>
              </select>
            </div>
          </div>
        </div>

        {/* Info Banner Premium */}
        <div className="mb-8 rounded-xl p-6 border-2 shadow-lg" style={{ backgroundColor: '#F0FDF4', borderColor: '#A8D32C' }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#A8D32C' }}>
              <FaLightbulb className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-neutral-900 dark:text-white text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Sistema de Validación Médica con IA
              </h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                Las imágenes son pre-analizadas por nuestro modelo de IA con <strong>94.2% de precisión</strong>. 
                Cada diagnóstico requiere validación por un dermatólogo certificado antes de ser utilizado para 
                el reentrenamiento del modelo, garantizando la mejora continua del sistema.
              </p>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-900 border border-[#C5E86C] text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  <FaShieldAlt className="w-3.5 h-3.5 text-[#A8D32C]" />
                  Rango de Confianza Óptimo: 80% - 100%
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-900 border border-[#C5E86C] text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  <FaStar className="w-3.5 h-3.5 text-amber-500" />
                  Validación Profesional Requerida
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido dinámico según tab activo */}
        {(activeTab === 'all' || activeTab === 'pending') && pendingImages.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <FaClock className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Pendientes de Calificación
                  </h2>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 dark:text-neutral-500">
                    {pendingImages.length} imágenes esperando validación médica
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingImages.map(image => (
                <ImageCard key={image.id} image={image} type="pending" />
              ))}
            </div>
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'approved') && approvedImages.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#C5E86C]/20 flex items-center justify-center">
                  <FaCheckCircle className="w-6 h-6 text-[#A8D32C]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Validadas para Reentrenamiento
                  </h2>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 dark:text-neutral-500">
                    {approvedImages.length} imágenes aprobadas por especialistas médicos
                  </p>
                </div>
              </div>
              <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-[#A8D32C]/10 hover:bg-[#C5E86C]/20 text-[#8ab824] font-semibold text-sm transition-all duration-200">
                <FaFileExport className="w-4 h-4" />
                Exportar Lote
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvedImages.map(image => (
                <ImageCard key={image.id} image={image} type="approved" />
              ))}
            </div>
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'rejected') && rejectedImages.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                  <FaTimes className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Imágenes Rechazadas
                  </h2>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 dark:text-neutral-500">
                    {rejectedImages.length} imágenes descartadas por criterios de calidad
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rejectedImages.map(image => (
                <ImageCard key={image.id} image={image} type="rejected" />
              ))}
            </div>
          </section>
        )}

        {/* Footer Disclaimer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-700 text-sm text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 shadow-sm">
            <FaExclamationTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <span>
              <strong className="text-neutral-900 dark:text-white">Sistema Académico de Demostración.</strong> Los datos mostrados son simulados con fines educativos. 
              En un entorno real, este sistema estaría conectado a una base de datos médica certificada.
            </span>
          </div>
        </div>
      </div>

      {/* Modal de Vista Detallada */}
      {selectedImage && createPortal(
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn" 
          style={{ zIndex: 999999 }}
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-white dark:bg-neutral-900 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl animate-scaleIn flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header con imagen - MÁS PEQUEÑO */}
            <div className="relative h-52 bg-neutral-900 flex-shrink-0">
              <img 
                src={selectedImage.img}
                alt={selectedImage.disease}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white dark:bg-neutral-900/20 backdrop-blur-sm hover:bg-white dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:bg-neutral-900/30 flex items-center justify-center transition-all duration-200"
              >
                <FaTimes className="w-4 h-4 text-white" />
              </button>

              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {selectedImage.disease}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-900/20 backdrop-blur-sm text-white font-semibold text-xs">
                    <FaBrain className="w-3.5 h-3.5" />
                    Confianza: {selectedImage.confidence}%
                  </span>
                  {selectedImage.priority && (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold text-xs ${
                      selectedImage.priority === 'high' ? 'bg-red-500' : 
                      selectedImage.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                    } text-white`}>
                      <FaExclamationTriangle className="w-3.5 h-3.5" />
                      {selectedImage.priority === 'high' ? 'Alta' : 
                       selectedImage.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Contenido del modal con scroll personalizado */}
            <div className="overflow-y-auto flex-1 custom-scrollbar-modal">
              <div className="p-6">{/* Progress bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Nivel de Confianza
                  </h3>
                  <span className="text-xl font-bold" style={{ color: '#A8D32C' }}>
                    {selectedImage.confidence}%
                  </span>
                </div>
                <div className="w-full h-3 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-3 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${selectedImage.confidence}%`,
                      backgroundColor: selectedImage.confidence >= 90 ? '#A8D32C' : selectedImage.confidence >= 80 ? '#D97706' : '#DC2626'
                    }}
                  />
                </div>
              </div>

              {/* Grid de información - MÁS COMPACTO */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#A8D32C' }}>
                      <FaCalendarAlt className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 font-semibold uppercase tracking-wide">Fecha</p>
                      <p className="text-sm font-bold text-neutral-900 dark:text-white">{selectedImage.date}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#A8D32C]/10 flex items-center justify-center">
                      <FaBrain className="w-4 h-4 text-[#A8D32C]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 font-semibold uppercase tracking-wide">Modelo IA</p>
                      <p className="text-sm font-bold text-neutral-900 dark:text-white">{selectedImage.aiVersion || 'v1.0'}</p>
                    </div>
                  </div>
                </div>

                {selectedImage.specialist && (
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                        <FaUserMd className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-[10px] text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 font-semibold uppercase tracking-wide">Especialista</p>
                        <p className="text-sm font-bold text-neutral-900 dark:text-white">{selectedImage.specialist}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedImage.reviewer && (
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-[#A8D32C]/10 flex items-center justify-center">
                        <FaAward className="w-4 h-4 text-[#A8D32C]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 font-semibold uppercase tracking-wide">Validado Por</p>
                        <p className="text-sm font-bold text-neutral-900 dark:text-white">{selectedImage.reviewer}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedImage.reason && (
                  <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200 md:col-span-2">
                    <div className="flex items-start gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                        <FaExclamationTriangle className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <p className="text-[10px] text-red-600 font-semibold uppercase tracking-wide mb-0.5">Motivo Rechazo</p>
                        <p className="text-sm font-bold text-red-900">{selectedImage.reason}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Información adicional simulada - MÁS COMPACTA */}
              <div className="border-t border-neutral-200 dark:border-neutral-700 pt-5">
                <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Información Clínica
                </h3>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <FaMapMarkerAlt className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Localización:</p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500">Extremidad superior derecha, zona del antebrazo</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <FaStethoscope className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Observaciones:</p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500">
                        Lesión pigmentada con bordes irregulares. El modelo identifica características compatibles con {selectedImage.disease}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de acción según tipo */}
              <div className="border-t border-neutral-200 dark:border-neutral-700 pt-5 mt-5">
                {selectedImage.modalType === 'pending' && (
                  <div className="grid md:grid-cols-3 gap-2.5">
                    <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#A8D32C] hover:bg-[#8ab824] text-white font-bold text-sm transition-all duration-200 hover:shadow-lg dark:hover:shadow-neutral-900/50">
                      <FaCheckCircle className="w-4 h-4" />
                      Aprobar
                    </button>
                    <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-all duration-200 hover:shadow-lg dark:hover:shadow-neutral-900/50">
                      <FaTimes className="w-4 h-4" />
                      Rechazar
                    </button>
                    <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm transition-all duration-200 hover:shadow-lg dark:hover:shadow-neutral-900/50">
                      <FaFileExport className="w-4 h-4" />
                      Exportar
                    </button>
                  </div>
                )}

                {selectedImage.modalType === 'approved' && (
                  <div>
                    <div className="bg-[#A8D32C]/10 border-2 border-[#C5E86C] rounded-lg p-4 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full bg-[#A8D32C] flex items-center justify-center flex-shrink-0">
                          <FaCheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#6d9419] text-base" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Imagen Validada
                          </h4>
                          <p className="text-xs text-[#8ab824]">
                            Aprobada por especialista médico
                          </p>
                        </div>
                      </div>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-sm transition-all duration-200 text-white hover:shadow-lg dark:hover:shadow-neutral-900/50" style={{ backgroundColor: '#A8D32C' }}>
                      <FaFileExport className="w-4 h-4" />
                      Exportar para Reentrenamiento
                    </button>
                    <button className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold text-sm transition-all duration-200">
                      <FaHistory className="w-4 h-4" />
                      Ver Historial
                    </button>
                  </div>
                )}

                {selectedImage.modalType === 'rejected' && (
                  <div>
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                          <FaExclamationTriangle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-red-900 text-base" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Imagen Rechazada
                          </h4>
                          <p className="text-xs text-red-700">
                            {selectedImage.reason || 'No cumple criterios de calidad'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition-all duration-200 hover:shadow-lg dark:hover:shadow-neutral-900/50">
                      <FaHistory className="w-4 h-4" />
                      Revisar y Recargar
                    </button>
                    <button className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold text-sm transition-all duration-200">
                      <FaFileExport className="w-4 h-4" />
                      Ver Historial
                    </button>
                  </div>
                )}
              </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Modal de Rechazo Profesional */}
      {selectedImage?.modalType === 'reject' && createPortal(
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn z-[999999]"
          onClick={() => {
            setSelectedImage(null);
            setRejectReason('');
          }}
        >
          <div 
            className="bg-white dark:bg-neutral-900 rounded-2xl max-w-lg w-full shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-t-2xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <FaExclamationTriangle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Rechazar Imagen
                  </h2>
                  <p className="text-red-100 text-sm mt-1">
                    Especifica el motivo del rechazo
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Imagen preview */}
              <div className="mb-6">
                <div className="relative h-40 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img 
                    src={selectedImage.img}
                    alt={selectedImage.disease}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-sm">{selectedImage.disease}</p>
                    <p className="text-white/80 text-xs">Confianza: {selectedImage.confidence}%</p>
                  </div>
                </div>
              </div>

              {/* Razones predefinidas */}
              <div className="mb-5">
                <label className="block text-sm font-bold text-neutral-900 dark:text-white mb-3">
                  Motivo del Rechazo
                </label>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    'Imagen borrosa',
                    'Mala iluminación',
                    'Fuera de foco',
                    'Ángulo inadecuado',
                    'Calidad insuficiente',
                    'Área incorrecta'
                  ].map((reason) => (
                    <button
                      key={reason}
                      onClick={() => setRejectReason(reason)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold border-2 transition-all duration-200 ${
                        rejectReason === reason
                          ? 'bg-red-500 border-red-500 text-white'
                          : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-red-300'
                      }`}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
              </div>

              {/* Motivo personalizado */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-neutral-900 dark:text-white mb-2">
                  O escribe un motivo personalizado
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Describe el motivo del rechazo (opcional)..."
                  className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 outline-none transition-all resize-none"
                  rows="3"
                />
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setRejectReason('');
                  }}
                  className="flex-1 px-4 py-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold transition-all duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    handleReject(selectedImage, rejectReason || 'Sin especificar');
                    setSelectedImage(null);
                    setRejectReason('');
                  }}
                  className="flex-1 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <FaTimes className="w-4 h-4" />
                  Rechazar Imagen
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Analizar;
