import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaDisease, 
  FaCamera, 
  FaInfoCircle, 
  FaTimes,
  FaClinicMedical,
  FaBrain,
  FaBookMedical,
  FaChevronRight,
  FaImages,
  FaSyncAlt,
  FaChartLine
} from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose, onStateChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseInSidebar, setMouseInSidebar] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const location = useLocation();

  // Paleta de colores profesional
  const colors = {
    primary: '#342B7C',
    secondary: '#8C7FE9',
    accent: '#C19CFF',
    background: '#FDEEFD',
    lightBg: '#D8DFF9',
    text: '#1A1A2E'
  };

  // Notificar al layout sobre cambios de estado
  useEffect(() => {
    if (onStateChange) {
      onStateChange(isCollapsed, isHovered);
    }
  }, [isCollapsed, isHovered, onStateChange]);

  const handleLinkClick = (itemName) => {
    setActiveItem(itemName);
    if (window.innerWidth < 1024) {
      onClose();
      setIsCollapsed(true);
      setIsHovered(false);
    }
  };

  const menuItems = [
    { 
      name: 'Inicio', 
      icon: <FaHome className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />, 
      path: '/',
      description: 'Página principal'
    },
    { 
      name: 'Enfermedades', 
      icon: <FaDisease className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />, 
      path: '/enfermedades',
      description: 'Catálogo completo'
    },
    { 
      name: 'Predicción en Vivo', 
      icon: <FaCamera className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />, 
      path: '/prediccion',
      description: 'Análisis IA'
    },
    { 
      name: 'Analizar Imágenes', 
      icon: <FaImages className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />, 
      path: '/analizar',
      description: 'Procesar imágenes'
    },
    { 
      name: 'Reentrenar IA', 
      icon: <FaSyncAlt className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />, 
      path: '/reentrenar',
      description: 'Optimizar modelo'
    },
    { 
      name: 'Acerca de', 
      icon: <FaInfoCircle className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />, 
      path: '/nosotros',
      description: 'Sobre nosotros'
    },
  ];

  // Efecto para manejar el colapso automático cuando el mouse sale
  useEffect(() => {
    if (!mouseInSidebar && isHovered) {
      const timer = setTimeout(() => {
        setIsHovered(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [mouseInSidebar, isHovered]);

  // Efecto para manejar el comportamiento en diferentes dispositivos
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(!isOpen);
        setIsHovered(false);
      } else {
        setIsCollapsed(true);
        setIsHovered(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const sidebarWidth = isCollapsed && !isHovered ? 'w-16' : 'w-64';
  const isExpanded = !isCollapsed || isHovered;

  const handleMouseEnter = () => {
    setMouseInSidebar(true);
    if (window.innerWidth >= 1024 && isCollapsed) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setMouseInSidebar(false);
  };

  // Animación para el icono activo
  const getIconAnimation = (itemName) => {
    return activeItem === itemName ? 'animate-pulse-scale' : '';
  };

  return (
    <>
      {/* Overlay Profesional */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-md z-40 lg:hidden animate-fadeIn"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar Corporativo Mejorado */}
      <aside 
        className={`
          fixed top-0 left-0 h-full bg-gradient-to-br from-[#FDEEFD] to-[#D8DFF9] shadow-2xl z-50 
          transform transition-all duration-500 ease-in-out
          border-r border-[#8C7FE9]/20
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 
          ${sidebarWidth}
          overflow-hidden
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        
        {/* Header Corporativo Compacto */}
        <div className="p-3 border-b border-[#8C7FE9]/20 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              onClick={() => handleLinkClick('Inicio')}
              className={`flex items-center transition-all duration-300 ${
                isExpanded ? 'space-x-2' : 'justify-center'
              }`}
            >
              <div className="relative group">
                <div className="w-10 h-10 bg-gradient-to-br from-[#342B7C] to-[#8C7FE9] rounded-lg flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                  <FaClinicMedical className="text-white text-sm transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-[#342B7C] to-[#C19CFF] rounded-lg opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300"></div>
              </div>
              
              {isExpanded && (
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-bold text-[#342B7C] font-sans tracking-tight truncate">DermApp</h2>
                  <p className="text-xs text-[#8C7FE9] font-medium truncate">Diagnóstico IA</p>
                </div>
              )}
            </Link>
            
            {/* Botón cerrar solo para móvil */}
            <button 
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg bg-[#8C7FE9]/10 hover:bg-[#8C7FE9]/20 text-[#342B7C] transition-all duration-300 hover:scale-110"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Navegación Corporativa Compacta */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => handleLinkClick(item.name)}
              className={`
                flex items-center transition-all duration-300 group relative
                ${isExpanded ? 'p-2 rounded-lg space-x-2' : 'p-1.5 rounded-md justify-center'}
                ${location.pathname === item.path 
                  ? 'bg-[#8C7FE9] text-white shadow-md' 
                  : 'text-[#342B7C] hover:bg-[#8C7FE9]/10 hover:text-[#342B7C]'
                }
                border border-transparent hover:border-[#8C7FE9]/30
                transform hover:translate-x-1
              `}
              title={isExpanded ? '' : item.name}
            >
              {/* Indicador de estado activo */}
              {location.pathname === item.path && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-[#C19CFF] rounded-r-full"></div>
              )}
              
              <div className={`
                transition-all duration-300 flex items-center justify-center relative
                ${location.pathname === item.path 
                  ? 'bg-white/20' 
                  : 'bg-[#8C7FE9]/10 group-hover:bg-[#8C7FE9]/20'
                }
                ${isExpanded ? 'p-1.5 rounded-md w-8 h-8' : 'p-1 rounded w-7 h-7'}
                ${getIconAnimation(item.name)}
                group-hover:scale-105
              `}>
                {item.icon}
                
                {/* Efecto de brillo sutil */}
                <div className="absolute inset-0 rounded-md bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {isExpanded && (
                <div className="flex-1 min-w-0 transition-all duration-300">
                  <span className="font-semibold block text-sm transition-transform duration-300 group-hover:translate-x-0.5">
                    {item.name}
                  </span>
                  <span className="text-xs text-[#8C7FE9] group-hover:text-[#342B7C] transition-colors duration-300 block truncate">
                    {item.description}
                  </span>
                </div>
              )}

              {/* Indicador de hover expandido */}
              {isExpanded && (
                <div className="opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                  <FaChevronRight className="w-2 h-2 text-[#C19CFF]" />
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* Sección de Estado del Sistema - Solo expandido */}
        {isExpanded && (
          <div className="p-3 border-t border-[#8C7FE9]/20 bg-white/30 backdrop-blur-sm">
            <div className="bg-white/50 rounded-lg p-2 border border-[#8C7FE9]/10">
              <div className="flex items-center space-x-2 mb-1.5">
                <div className="p-1 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] rounded-md">
                  <FaBrain className="text-white text-xs" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#342B7C] font-semibold text-xs">IA Activa</h3>
                  <p className="text-[#8C7FE9] text-xs truncate">Sistema operativo</p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#342B7C] font-medium">Rendimiento</span>
                <div className="flex items-center space-x-1">
                  <FaChartLine className="text-[#8C7FE9] w-2 h-2" />
                  <span className="text-[#342B7C] font-bold">98%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Compacto - Solo expandido */}
        {isExpanded && (
          <div className="p-3 border-t border-[#8C7FE9]/20 bg-white/40 backdrop-blur-sm">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1.5 mb-1">
                <FaBookMedical className="text-[#342B7C] text-xs" />
                <p className="text-[#342B7C] font-bold text-xs">DermApp Pro</p>
              </div>
              <p className="text-[#8C7FE9] text-xs font-medium tracking-tight">
                v2.1 Corporativo
              </p>
              {/* Indicadores de estado */}
              <div className="flex justify-center space-x-1 mt-1.5">
                {[1, 2, 3].map((dot) => (
                  <div 
                    key={dot}
                    className="w-1 h-1 bg-[#8C7FE9] rounded-full opacity-40"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Indicador de Colapso Elegante */}
        {isCollapsed && !isHovered && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
            <div className="w-5 h-5 bg-[#8C7FE9]/20 rounded-full flex items-center justify-center group hover:bg-[#8C7FE9]/30 transition-colors duration-300">
              <FaChevronRight className="text-[#342B7C] w-2 h-2 transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>
        )}
      </aside>

      {/* Estilos de animación personalizados */}
      <style jsx>{`
        @keyframes pulse-scale {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-pulse-scale {
          animation: pulse-scale 2s ease-in-out infinite;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Sidebar;