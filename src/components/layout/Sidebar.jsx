import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/useAuth';
import LoginModal from '../auth/LoginModal';
import { 
  FaHome, 
  FaDisease, 
  FaCamera, 
  FaInfoCircle, 
  FaTimes,
  FaImages,
  FaSyncAlt,
  FaCog,
  FaUserMd,
  FaShieldAlt,
  FaCheckCircle,
  FaBell,
  FaMicroscope,
  FaHeartbeat,
  FaClipboardCheck,
  FaMoon,
  FaSun,
  FaSignInAlt,
  FaSignOutAlt
} from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  // Actualizar contador de notificaciones en tiempo real
  useEffect(() => {
    if (!isAuthenticated) {
      setNotificationCount(0);
      return;
    }

    const updateNotifications = () => {
      try {
        const history = JSON.parse(localStorage.getItem('dermapp_history') || '[]');
        const validated = JSON.parse(localStorage.getItem('dermapp_validated') || '[]');
        const rejected = JSON.parse(localStorage.getItem('dermapp_rejected') || '[]');
        
        const validatedIds = validated.map(v => v.id);
        const rejectedIds = rejected.map(r => r.id);
        
        const pendingCount = history.filter(item => {
          const confidence = parseFloat(item.confidence);
          return confidence >= 80 && 
                 !validatedIds.includes(item.id) && 
                 !rejectedIds.includes(item.id);
        }).length;
        
        setNotificationCount(pendingCount);
      } catch (e) {
        console.error('Error updating notifications:', e);
      }
    };

    updateNotifications();
    const interval = setInterval(updateNotifications, 3000);
    window.addEventListener('storage', updateNotifications);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', updateNotifications);
    };
  }, [isAuthenticated]);

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const menuItems = [
    { 
      name: 'Inicio', 
      icon: <FaHome className="w-5 h-5" />, 
      path: '/',
      badge: null,
      requiresAuth: false
    },
    { 
      name: 'Enfermedades', 
      icon: <FaMicroscope className="w-5 h-5" />, 
      path: '/enfermedades',
      badge: '10',
      requiresAuth: false
    },
    { 
      name: 'Diagnóstico IA', 
      icon: <FaClipboardCheck className="w-5 h-5" />, 
      path: '/prediccion',
      badge: null,
      requiresAuth: false
    },
    { 
      name: 'Analizar', 
      icon: <FaImages className="w-5 h-5" />, 
      path: '/analizar',
      badge: 'NUEVO',
      badgeColor: 'red',
      requiresAuth: true // Solo visible si está autenticado
    },
    { 
      name: 'Reentrenar', 
      icon: <FaSyncAlt className="w-5 h-5" />, 
      path: '/reentrenar',
      badge: null,
      requiresAuth: true // Solo visible si está autenticado
    },
    { 
      name: 'Nosotros', 
      icon: <FaInfoCircle className="w-5 h-5" />, 
      path: '/nosotros',
      badge: null,
      requiresAuth: false
    },
  ];

  // Filtrar items según autenticación
  const visibleMenuItems = menuItems.filter(item => !item.requiresAuth || isAuthenticated);

  return (
    <>
      {/* Overlay Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 h-screen shadow-xl dark:shadow-neutral-900/50 z-50 
          transform transition-all duration-300 ease-in-out
          border-r
          ${isDark 
            ? 'bg-neutral-900 border-neutral-800' 
            : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700'
          }
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 
          w-64
          flex flex-col
        `}
      >
        {/* Barra verde superior */}
        <div className="h-0.5 bg-[#A8D32C] flex-shrink-0"></div>

        {/* Header con Logo */}
        <div className={`p-3 border-b flex-shrink-0 ${isDark ? 'border-neutral-800' : 'border-neutral-100 dark:border-neutral-800'}`}>
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              onClick={handleLinkClick}
              className="flex items-center space-x-3 transition-all duration-300"
            >
              <div className="relative flex-shrink-0">
                <div className="w-9 h-9 rounded-xl bg-white dark:bg-neutral-900 border-2 border-[#C5E86C] flex items-center justify-center shadow-sm hover:shadow-md hover:border-primary-300 transition-all duration-300">
                  <img 
                    src="/logo.png" 
                    alt="DermApp" 
                    className="w-6 h-6 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.classList.remove('hidden');
                      e.target.nextElementSibling.classList.add('flex');
                    }}
                  />
                  <svg 
                    className="w-5 h-5 text-[#A8D32C] hidden items-center justify-center" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                    />
                  </svg>
                  
                  {/* Badge de verificación */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#A8D32C] rounded-full border-2 border-white flex items-center justify-center">
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col min-w-0">
                <h2 className={`text-sm font-bold tracking-tight truncate ${isDark ? 'text-white' : 'text-neutral-900 dark:text-white'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>DermApp</h2>
                <p className={`text-[10px] font-medium truncate ${isDark ? 'text-neutral-400 dark:text-neutral-500' : 'text-neutral-500 dark:text-neutral-400 dark:text-neutral-500'}`} style={{ fontFamily: 'Inter, sans-serif' }}>Clinical Solutions</p>
              </div>
            </Link>
            
            {/* Botón de Modo Oscuro */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDark 
                  ? 'bg-neutral-800 hover:bg-neutral-700 text-yellow-400' 
                  : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
              }`}
              title={isDark ? 'Modo Claro' : 'Modo Oscuro'}
            >
              {isDark ? (
                <FaSun className="w-4 h-4" />
              ) : (
                <FaMoon className="w-4 h-4" />
              )}
            </button>
            
            {/* Botón cerrar móvil */}
            <button 
              onClick={onClose}
              className={`lg:hidden p-2 rounded-lg transition-all duration-200 ${
                isDark ? 'hover:bg-neutral-800 text-neutral-400 dark:text-neutral-500' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 dark:text-neutral-500'
              }`}
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navegación Principal */}
        <nav className="p-3 pt-4 space-y-1.5 flex-1 min-h-0">
          {visibleMenuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={handleLinkClick}
              className={`
                flex items-center px-3 py-2 rounded-xl transition-all duration-200 group relative
                ${location.pathname === item.path 
                  ? 'bg-[#A8D32C] text-white shadow-md' 
                  : isDark 
                    ? 'text-neutral-300 hover:bg-[#A8D32C]/20 hover:text-[#A8D32C]'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-[#A8D32C]/10 hover:text-[#8ab824]'}
              `}
            >
              {/* Indicador activo */}
              {location.pathname === item.path && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-7 bg-primary-400 rounded-r-full"></div>
              )}
              
              <div className="flex-shrink-0">
                {item.icon}
              </div>
              
              <span className="ml-3 text-xs font-semibold truncate flex-1" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.01em' }}>
                {item.name}
              </span>

              {item.badge && (
                <span className={`
                  ml-auto flex-shrink-0 px-2 py-0.5 text-[9px] font-bold rounded-lg
                  ${item.badgeColor === 'red'
                    ? 'bg-red-500 text-white animate-pulse'
                    : location.pathname === item.path 
                      ? 'bg-white dark:bg-neutral-900/20 text-white' 
                      : 'bg-[#C5E86C]/20 text-[#8ab824] border border-[#C5E86C]'}
                `} style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Sección de Notificaciones */}
        {isAuthenticated && (
          <div className="p-2.5 border-t border-neutral-100 dark:border-neutral-800 flex-shrink-0">
            <Link 
              to="/analizar"
              onClick={handleLinkClick}
              className={`block bg-white dark:bg-neutral-900 border-2 rounded-xl p-2.5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${
                notificationCount > 0 
                  ? 'border-red-400 hover:border-red-500 bg-red-50/50 dark:bg-red-900/10' 
                  : 'border-[#C5E86C] hover:border-primary-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div className={`p-1.5 rounded-lg shadow-sm ${
                      notificationCount > 0 ? 'bg-red-500' : 'bg-[#A8D32C]'
                    }`}>
                      <FaBell className="text-white text-sm" />
                    </div>
                    {notificationCount > 0 && (
                      <>
                        <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full border-2 border-white flex items-center justify-center px-1">
                          <span className="text-white text-[9px] font-bold">
                            {notificationCount > 99 ? '99+' : notificationCount}
                          </span>
                        </div>
                        <span className="absolute -top-1 -right-1 flex h-[18px] w-[18px]">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-neutral-900 dark:text-white font-bold text-[10px]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Notificaciones
                    </h3>
                    <p className={`text-[9px] font-medium ${
                      notificationCount > 0 ? 'text-red-600 dark:text-red-400' : 'text-neutral-500 dark:text-neutral-400'
                    }`} style={{ fontFamily: 'Inter, sans-serif' }}>
                      {notificationCount > 0 
                        ? `${notificationCount} pendiente${notificationCount !== 1 ? 's' : ''}` 
                        : 'Sin notificaciones'}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Sección de Estado del Sistema */}
        <div className={`p-2.5 border-t flex-shrink-0 ${isDark ? 'border-neutral-800' : 'border-neutral-100 dark:border-neutral-800'}`}>
          <div className={`rounded-xl p-2.5 shadow-sm hover:shadow-md transition-all duration-300 border-2 ${
            isDark 
              ? 'bg-neutral-800 border-neutral-700 hover:border-[#A8D32C]/50' 
              : 'bg-white dark:bg-neutral-900 border-[#C5E86C] hover:border-primary-300'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-1.5 bg-[#A8D32C] rounded-lg shadow-sm">
                <FaShieldAlt className="text-white text-xs animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-bold text-[10px] ${isDark ? 'text-white' : 'text-neutral-900 dark:text-white'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>Sistema IA</h3>
                <p className="text-[#A8D32C] text-[9px] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Activo y operativo</p>
              </div>
              <FaCheckCircle className="text-[#A8D32C] w-3.5 h-3.5 flex-shrink-0" />
            </div>
            
            <div className="flex items-center justify-between text-[9px] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span className={`font-medium ${isDark ? 'text-neutral-400 dark:text-neutral-500' : 'text-neutral-600 dark:text-neutral-400 dark:text-neutral-500'}`}>Precisión</span>
              <span className="text-[#A8D32C] font-bold text-[10px]">90%</span>
            </div>
            
            <div className="w-full bg-[#C5E86C]/20 rounded-full h-1.5 relative overflow-hidden border border-[#C5E86C]">
              <div className="bg-[#A8D32C] h-1.5 rounded-full transition-all duration-1000" style={{width: '90%'}}></div>
              <div className="absolute inset-0 bg-white dark:bg-neutral-900/30 animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Card de Usuario Profesional / Botón Ingresar */}
        <div className={`p-2.5 border-t flex-shrink-0 ${isDark ? 'border-neutral-800' : 'border-neutral-100 dark:border-neutral-800'}`}>
          {isAuthenticated ? (
            // Usuario autenticado - Mostrar perfil
            <div className={`flex items-center space-x-2.5 p-2.5 rounded-xl border-2 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md group ${
              isDark 
                ? 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700 hover:border-[#A8D32C]/50' 
                : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 hover:bg-[#A8D32C]/10 hover:border-[#C5E86C]'
            }`}
            onClick={logout}>
              <div className="w-8 h-8 rounded-lg bg-[#A8D32C] border-2 border-[#A8D32C] flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg dark:hover:shadow-neutral-900/50 transition-shadow duration-300">
                <FaUserMd className="text-white text-sm" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-neutral-900 dark:text-white'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Dr. {user?.name}
                </p>
                <p className={`text-[10px] truncate ${isDark ? 'text-neutral-400 dark:text-neutral-500' : 'text-neutral-500 dark:text-neutral-400 dark:text-neutral-500'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  {user?.role}
                </p>
              </div>
              <FaSignOutAlt className="text-neutral-400 dark:text-neutral-500 group-hover:text-red-500 w-3.5 h-3.5 flex-shrink-0 transition-all duration-300" />
            </div>
          ) : (
            // No autenticado - Mostrar botón Ingresar
            <button
              onClick={() => setShowLoginModal(true)}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                isDark
                  ? 'bg-[#A8D32C] hover:bg-[#8ab824] text-white'
                  : 'bg-gradient-to-r from-[#A8D32C] to-[#8ab824] hover:shadow-lg text-white'
              }`}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <FaSignInAlt className="w-4 h-4" />
              <span>Ingresar</span>
            </button>
          )}
        </div>

        {/* Footer Info */}
        <div className={`p-2.5 border-t flex-shrink-0 ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800'}`}>
          <div className="text-center">
            <p className={`text-[9px] font-medium mb-0.5 ${isDark ? 'text-neutral-400 dark:text-neutral-500' : 'text-neutral-500 dark:text-neutral-400 dark:text-neutral-500'}`} style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.02em' }}>DermApp Professional</p>
            <p className={`text-[8px] ${isDark ? 'text-neutral-600 dark:text-neutral-400 dark:text-neutral-500' : 'text-neutral-400 dark:text-neutral-500'}`} style={{ fontFamily: 'Inter, sans-serif' }}>Version 1.0.0</p>
            <div className="flex justify-center space-x-1 mt-1.5">
              <div className="w-1 h-1 bg-[#A8D32C] rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
              <div className="w-1 h-1 bg-primary-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-1 h-1 bg-primary-300 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Modal de Login */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default Sidebar;
