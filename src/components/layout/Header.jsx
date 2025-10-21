import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ onMenuToggle, sidebarCollapsed }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 5;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Enfermedades', path: '/enfermedades' },
    { name: 'Predicción IA', path: '/prediccion' },
    { name: 'Analizar Imágenes', path: '/analizar' },
    { name: 'Reentrenar Modelo', path: '/reentrenar' },
    { name: 'Nosotros', path: '/nosotros' },
  ];

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md
        ${scrolled 
          ? 'bg-white/90 shadow-2xl border-b border-[#8C7FE9]/20 py-3' 
          : 'bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] py-4 shadow-xl'
        }
        ${sidebarCollapsed ? 'lg:left-20' : 'lg:left-64'}
        transition-all duration-500
      `}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between">
          
          {/* Logo y Menú Hamburguesa - Solo en móvil */}
          <div className="flex items-center space-x-3">
            {/* Botón Menú Hamburguesa - SOLO MOBILE */}
            <button 
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 group relative overflow-hidden"
            >
              <div className="flex flex-col space-y-1">
                <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isHovered ? 'transform rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}></div>
                <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isHovered ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></div>
              </div>
              
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
            
            {/* Logo y Título Mejorado con Imagen */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative">
                <div 
                  className={`
                    w-12 h-12 rounded-xl flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:shadow-3xl overflow-hidden
                    ${scrolled 
                      ? 'bg-gradient-to-br from-[#342B7C] to-[#8C7FE9]' 
                      : 'bg-white/20 backdrop-blur-sm'
                    }
                    group-hover:scale-110 border-2 border-white/20
                  `}
                >
                  {/* Imagen del logo - Reemplaza con tu archivo logo.png */}
                  <img 
                    src="/logo.png" 
                    alt="DermApp Logo" 
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      // Fallback si la imagen no existe
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback si no hay imagen */}
                  <div 
                    className="w-10 h-10 hidden items-center justify-center text-white font-bold text-lg"
                    style={{ display: 'none' }}
                  >
                    D
                  </div>
                </div>
                
                {/* Puntos decorativos */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#C19CFF] rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-[#8C7FE9] rounded-full"></div>
              </div>
              
              <div className="transform transition-all duration-500 group-hover:translate-x-1">
                <h1 className={`text-xl font-bold font-sans tracking-tight transition-colors duration-300 ${
                  scrolled ? 'text-[#342B7C]' : 'text-white'
                }`}>
                  DermApp
                </h1>
                <p className={`text-xs transition-colors duration-300 ${
                  scrolled ? 'text-[#8C7FE9]' : 'text-white/80'
                } font-medium tracking-wide`}>
                  AI Dermatology
                </p>
              </div>
            </Link>
          </div>

          {/* Navegación Desktop Mejorada */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link 
                key={item.name}
                to={item.path}
                className={`
                  relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group overflow-hidden
                  ${location.pathname === item.path 
                    ? 'text-[#342B7C] bg-white/80 shadow-lg' 
                    : scrolled 
                      ? 'text-[#342B7C] hover:bg-[#8C7FE9]/10' 
                      : 'text-white hover:bg-white/10'
                  }
                `}
              >
                <span className="relative z-10 text-sm font-semibold tracking-wide">
                  {item.name}
                </span>
                
                {/* Efecto de fondo animado */}
                <div className={`
                  absolute inset-0 rounded-lg transition-all duration-300
                  ${location.pathname === item.path 
                    ? 'bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF]' 
                    : 'bg-gradient-to-r from-[#8C7FE9]/0 to-[#C19CFF]/0 group-hover:from-[#8C7FE9]/10 group-hover:to-[#C19CFF]/10'
                  }
                `}></div>
                
                {/* Indicador activo */}
                {location.pathname === item.path && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-[#C19CFF] rounded-full"></div>
                )}
                
                {/* Efecto de brillo al hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>
            ))}
          </nav>

          {/* Botón CTA Premium */}
          <Link 
            to="/prediccion"
            className="relative group"
          >
            <div className={`
              relative px-6 py-3 rounded-xl font-semibold shadow-2xl transition-all duration-500 overflow-hidden
              ${scrolled 
                ? 'bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] text-white hover:shadow-3xl' 
                : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
              }
              transform hover:scale-105
            `}>
              {/* Texto */}
              <span className="relative z-10 flex items-center space-x-2 text-sm tracking-wide">
                <span>Probar IA</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              
              {/* Gradiente animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Efecto de partículas */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-1 left-4 w-1 h-1 bg-white rounded-full animate-ping"></div>
                <div className="absolute bottom-2 right-6 w-0.5 h-0.5 bg-white rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
              </div>
              
              {/* Brillo animado */}
              <div className="absolute top-0 -inset-full h-full w-1/2 transform -skew-x-12 bg-gradient-to-r from-transparent to-white/30 group-hover:animate-shine transition-all duration-1000"></div>
            </div>
            
            {/* Sombra animada */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
          </Link>
        </div>
      </div>

      {/* Barra de progreso sutil */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C19CFF] to-transparent opacity-60"></div>
    </header>
  );
};

export default Header;