import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import {
  FaHome, FaChartLine, FaClock, FaFileMedical, FaUserMd, FaMicroscope,
  FaClipboardCheck, FaHospital, FaChevronRight, FaCalendarAlt, FaCheckCircle,
  FaExclamationTriangle, FaArrowUp, FaArrowDown, FaEye, FaDownload,
  FaShare, FaBookmark, FaShieldAlt, FaBell
} from 'react-icons/fa';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  
  const recentAnalysis = [
    {
      id: 1,
      patientCode: "PAC-2024-001",
      diagnosis: "Melanoma Maligno",
      confidence: 94,
      date: "2024-11-20",
      status: "completed",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      patientCode: "PAC-2024-002", 
      diagnosis: "Carcinoma Basocelular",
      confidence: 89,
      date: "2024-11-19",
      status: "completed",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      patientCode: "PAC-2024-003",
      diagnosis: "Queratosis Actínica",
      confidence: 92,
      date: "2024-11-18",
      status: "pending",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop"
    }
  ];

  const stats = [
    { label: "Análisis Total", value: "247", change: "+12%", trend: "up", icon: FaClipboardCheck },
    { label: "Precisión Promedio", value: "91.5%", change: "+2.3%", trend: "up", icon: FaShieldAlt },
    { label: "Casos Pendientes", value: "8", change: "-5", trend: "down", icon: FaClock },
    { label: "Esta Semana", value: "23", change: "+8", trend: "up", icon: FaCalendarAlt }
  ];

  const quickActions = [
    { label: "Nuevo Diagnóstico", icon: FaMicroscope, path: "/prediccion", color: "bg-[#A8D32C]" },
    { label: "Ver Enfermedades", icon: FaHospital, path: "/enfermedades", color: "bg-[#8ab824]" },
    { label: "Analizar Imagen", icon: FaFileMedical, path: "/analizar", color: "bg-[#A8D32C]" },
    { label: "Reentrenar Modelo", icon: FaChartLine, path: "/reentrenar", color: "bg-[#8ab824]" }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Breadcrumb Navigation */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            <FaHome className="w-4 h-4 text-[#A8D32C]" />
            <span className="text-neutral-900 dark:text-white font-semibold">Inicio</span>
            <FaChevronRight className="w-3 h-3 text-neutral-400 dark:text-neutral-500" />
            <span className="text-neutral-500 dark:text-neutral-400 dark:text-neutral-500">Dashboard</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {isAuthenticated ? `Bienvenido, Dr. ${user?.name}` : 'Bienvenido a DermApp'}
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 dark:text-neutral-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                <FaUserMd className="inline w-4 h-4 mr-2 text-[#A8D32C]" />
                {isAuthenticated ? `${user?.role} • DermApp Clinical Solutions` : 'Sistema de diagnóstico dermatológico con IA'}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-3 bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl hover:border-primary-300 hover:bg-[#A8D32C]/10 transition-all duration-200">
                <FaBell className="w-5 h-5 text-neutral-600 dark:text-neutral-400 dark:text-neutral-500" />
              </button>
              <Link 
                to="/prediccion"
                className="px-6 py-3 bg-[#A8D32C] text-white rounded-xl font-semibold hover:bg-[#8ab824] transition-all duration-200 shadow-md hover:shadow-lg dark:hover:shadow-neutral-900/50 flex items-center space-x-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <FaMicroscope className="w-4 h-4" />
                <span>Nuevo Diagnóstico</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl p-6 hover:border-primary-300 hover:shadow-lg dark:hover:shadow-neutral-900/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[#A8D32C]/10 rounded-lg">
                  <stat.icon className="w-6 h-6 text-[#A8D32C]" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-[#A8D32C]' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <FaArrowUp className="w-3 h-3" /> : <FaArrowDown className="w-3 h-3" />}
                  <span>{stat.change}</span>
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

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Acciones Rápidas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className="group"
              >
                <div className={`${action.color} p-6 rounded-xl text-white hover:shadow-xl dark:shadow-neutral-900/50 transition-all duration-300 transform hover:scale-105`}>
                  <action.icon className="w-8 h-8 mb-3" />
                  <p className="font-semibold text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {action.label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Analysis */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Análisis Recientes
            </h2>
            <Link 
              to="/analizar"
              className="text-[#A8D32C] hover:text-[#A8D32C] font-semibold text-sm flex items-center space-x-2"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span>Ver todos</span>
              <FaChevronRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {recentAnalysis.map((analysis) => (
              <div 
                key={analysis.id}
                className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden hover:border-primary-300 hover:shadow-xl dark:shadow-neutral-900/50 transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-48 bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                  <img 
                    src={analysis.image} 
                    alt={analysis.diagnosis}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop';
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      analysis.status === 'completed' 
                        ? 'bg-[#A8D32C] text-white' 
                        : 'bg-yellow-500 text-white'
                    }`}>
                      {analysis.status === 'completed' ? 'Completado' : 'Pendiente'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 dark:text-neutral-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {analysis.patientCode}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 flex items-center space-x-1">
                      <FaCalendarAlt className="w-3 h-3" />
                      <span>{analysis.date}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {analysis.diagnosis}
                  </h3>

                  {/* Confidence Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <span className="text-neutral-600 dark:text-neutral-400 dark:text-neutral-500">Confianza</span>
                      <span className="font-bold text-[#A8D32C]">{analysis.confidence}%</span>
                    </div>
                    <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-2 border border-neutral-200 dark:border-neutral-700">
                      <div 
                        className="bg-[#A8D32C] h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${analysis.confidence}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 rounded-lg transition-colors duration-200">
                      <FaEye className="w-4 h-4 text-neutral-600 dark:text-neutral-400 dark:text-neutral-500" />
                    </button>
                    <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 rounded-lg transition-colors duration-200">
                      <FaDownload className="w-4 h-4 text-neutral-600 dark:text-neutral-400 dark:text-neutral-500" />
                    </button>
                    <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 rounded-lg transition-colors duration-200">
                      <FaShare className="w-4 h-4 text-neutral-600 dark:text-neutral-400 dark:text-neutral-500" />
                    </button>
                    <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 rounded-lg transition-colors duration-200">
                      <FaBookmark className="w-4 h-4 text-neutral-600 dark:text-neutral-400 dark:text-neutral-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI System Status */}
          <div className="bg-white dark:bg-neutral-900 border-2 border-[#C5E86C] rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-[#A8D32C] rounded-lg">
                <FaShieldAlt className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Estado del Sistema IA
                </h3>
                <p className="text-sm text-[#A8D32C]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Operativo y optimizado
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600 dark:text-neutral-400 dark:text-neutral-500" style={{ fontFamily: 'Inter, sans-serif' }}>Modelo Activo</span>
                <span className="text-sm font-bold text-neutral-900 dark:text-white">DermNet v2.1.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600 dark:text-neutral-400 dark:text-neutral-500" style={{ fontFamily: 'Inter, sans-serif' }}>Última Actualización</span>
                <span className="text-sm font-bold text-neutral-900 dark:text-white">20 Nov 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600 dark:text-neutral-400 dark:text-neutral-500" style={{ fontFamily: 'Inter, sans-serif' }}>Precisión Global</span>
                <span className="text-sm font-bold text-[#A8D32C]">90.0%</span>
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-[#A8D32C]/10 rounded-lg border-2 border-[#C5E86C]">
                <FaChartLine className="w-6 h-6 text-[#A8D32C]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Resumen de Actividad
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 dark:text-neutral-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Últimos 30 días
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="w-5 h-5 text-[#A8D32C]" />
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Diagnósticos Completados
                  </span>
                </div>
                <span className="text-lg font-bold text-neutral-900 dark:text-white">185</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center space-x-3">
                  <FaExclamationTriangle className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Casos Prioritarios
                  </span>
                </div>
                <span className="text-lg font-bold text-neutral-900 dark:text-white">12</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center space-x-3">
                  <FaFileMedical className="w-5 h-5 text-[#A8D32C]" />
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Informes Generados
                  </span>
                </div>
                <span className="text-lg font-bold text-neutral-900 dark:text-white">203</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
