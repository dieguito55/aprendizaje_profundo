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
  FaChevronRight
} from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose, onStateChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Siempre colapsado por defecto
  const [isHovered, setIsHovered] = useState(false);
  const [mouseInSidebar, setMouseInSidebar] = useState(false);
  const location = useLocation();

  // Notificar al layout sobre cambios de estado
  useEffect(() => {
    if (onStateChange) {
      onStateChange(isCollapsed, isHovered);
    }
  }, [isCollapsed, isHovered, onStateChange]);

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
    // En móvil, colapsar automáticamente después del clic
    if (window.innerWidth < 1024) {
      setIsCollapsed(true);
      setIsHovered(false);
    }
  };

  const menuItems = [
    { 
      name: 'Inicio', 
      icon: <FaHome className="w-5 h-5" />, 
      path: '/',
      description: 'Página principal'
    },
    { 
      name: 'Enfermedades', 
      icon: <FaDisease className="w-5 h-5" />, 
      path: '/enfermedades',
      description: 'Catálogo completo'
    },
    { 
      name: 'Predicción en Vivo', 
      icon: <FaCamera className="w-5 h-5" />, 
      path: '/prediccion',
      description: 'Análisis IA'
    },
    { 
      name: 'Acerca de', 
      icon: <FaInfoCircle className="w-5 h-5" />, 
      path: '/nosotros',
      description: 'Sobre nosotros'
    },
  ];

  // Efecto para manejar el colapso automático cuando el mouse sale
  useEffect(() => {
    if (!mouseInSidebar && isHovered) {
      const timer = setTimeout(() => {
        setIsHovered(false);
      }, 300); // Pequeño delay para evitar flickering
      return () => clearTimeout(timer);
    }
  }, [mouseInSidebar, isHovered]);

  // Efecto para manejar el comportamiento en diferentes dispositivos
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        // En móvil, siempre expandido cuando está abierto
        setIsCollapsed(!isOpen);
        setIsHovered(false);
      } else {
        // En desktop, siempre colapsado por defecto
        setIsCollapsed(true);
        setIsHovered(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const sidebarWidth = isCollapsed && !isHovered ? 'w-20' : 'w-80';
  const isExpanded = !isCollapsed || isHovered;

  const handleMouseEnter = () => {
    setMouseInSidebar(true);
    if (window.innerWidth >= 1024 && isCollapsed) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setMouseInSidebar(false);
    if (window.innerWidth >= 1024) {
      // Colapsar automáticamente después de un pequeño delay
      setTimeout(() => {
        if (!mouseInSidebar) {
          setIsHovered(false);
        }
      }, 150);
    }
  };

  return (
    <>
      {/* Overlay Mejorado */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[#082543] bg-opacity-80 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar Colapsable */}
      <aside 
        className={`
          fixed top-0 left-0 h-full bg-gradient-to-b from-[#082543] to-[#4C2D4D] shadow-2xl z-50 
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 
          ${sidebarWidth}
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        
        {/* Header del Sidebar */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              onClick={handleLinkClick} 
              className={`flex items-center transition-all duration-300 ${
                isExpanded ? 'space-x-3' : 'justify-center'
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F15F79] to-[#4C2D4D] rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <FaClinicMedical className="text-white text-lg" />
                </div>
                {isExpanded && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#F15F79] to-[#258CAB] rounded-xl opacity-20 blur-sm"></div>
                )}
              </div>
              
              {isExpanded && (
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-white font-serif tracking-tight truncate">DermApp</h2>
                  <p className="text-xs text-white/70 font-light truncate">Diagnóstico Inteligente</p>
                </div>
              )}
            </Link>
            
            {/* Solo botón cerrar para móvil */}
            <button 
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Navegación Mejorada */}
        <nav className="p-4 space-y-2 flex-1">
          {menuItems.map((item, index) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={handleLinkClick}
              className={`
                flex items-center transition-all duration-300 group
                ${isExpanded ? 'p-3 rounded-xl space-x-3' : 'p-2 rounded-lg justify-center'}
                ${location.pathname === item.path 
                  ? 'bg-white/20 text-white shadow-lg' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
                }
                border border-transparent hover:border-white/10
              `}
              title={isExpanded ? '' : item.name}
            >
              <div className={`
                transition-all duration-300 flex items-center justify-center
                ${location.pathname === item.path 
                  ? 'bg-gradient-to-r from-[#F15F79] to-[#258CAB]' 
                  : 'bg-white/10 group-hover:bg-gradient-to-r group-hover:from-[#F15F79] group-hover:to-[#258CAB]'
                }
                ${isExpanded ? 'p-2 rounded-lg w-10 h-10' : 'p-1 rounded-md w-8 h-8'}
                group-hover:scale-110
              `}>
                {item.icon}
              </div>
              
              {isExpanded && (
                <div className="flex-1 min-w-0">
                  <span className="font-semibold block text-sm group-hover:translate-x-1 transition-transform duration-300">
                    {item.name}
                  </span>
                  <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors duration-300 block truncate">
                    {item.description}
                  </span>
                </div>
              )}

              {isExpanded && (
                <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <div className="w-1.5 h-1.5 bg-[#F15F79] rounded-full"></div>
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* Sección Informativa - Solo muestra cuando está expandido */}
        {isExpanded && (
          <div className="p-4 border-t border-white/10">
            <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm border border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <div className="p-1.5 bg-gradient-to-r from-[#258CAB] to-[#4C2D4D] rounded-lg">
                  <FaBrain className="text-white text-sm" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-xs">IA Especializada</h3>
                  <p className="text-white/60 text-xs">Tecnología avanzada</p>
                </div>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">
                Sistema educativo con IA para diagnóstico dermatológico.
              </p>
            </div>
          </div>
        )}

        {/* Footer Sidebar - Solo muestra cuando está expandido */}
        {isExpanded && (
          <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <FaBookMedical className="text-[#F15F79] text-xs" />
                <p className="text-white font-semibold text-xs">DermApp v2.0</p>
              </div>
              <p className="text-white/50 text-xs font-light tracking-wide">
                Sistema Educativo Inteligente
              </p>
              <div className="flex justify-center space-x-1 mt-2">
                {[1, 2, 3].map((dot) => (
                  <div 
                    key={dot}
                    className="w-1 h-1 bg-white/30 rounded-full"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Indicador de Colapso - Solo muestra cuando está colapsado y no hay hover */}
        {isCollapsed && !isHovered && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
              <FaChevronRight className="text-white/60 w-2 h-2" />
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;