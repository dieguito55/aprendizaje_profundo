import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onMenuToggle }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#082543] shadow-2xl py-2' 
          : 'bg-gradient-to-r from-[#082543] to-[#4C2D4D] py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo y Título */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 group"
            >
              <svg 
                className="w-6 h-6 text-white group-hover:scale-110 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
            
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
            >
              <div 
                className="w-12 h-12 bg-gradient-to-br from-[#F15F79] to-[#4C2D4D] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
              >
                <span className="text-white font-bold text-xl tracking-wider">D</span>
              </div>
              <div className="transform transition-all duration-300 group-hover:translate-x-1">
                <h1 className="text-2xl font-bold text-white font-serif tracking-tight">
                  DermApp
                </h1>
                <p className="text-sm text-white/80 font-light tracking-wide">
                  Dermatología Educativa
                </p>
              </div>
            </Link>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className="relative text-white/90 hover:text-white font-medium transition-all duration-300 group"
            >
              Inicio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F15F79] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/enfermedades" 
              className="relative text-white/90 hover:text-white font-medium transition-all duration-300 group"
            >
              Enfermedades
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F15F79] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/prediccion" 
              className="relative text-white/90 hover:text-white font-medium transition-all duration-300 group"
            >
              Predicción en Vivo
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F15F79] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/nosotros" 
              className="relative text-white/90 hover:text-white font-medium transition-all duration-300 group"
            >
              Nosotros
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F15F79] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Botón Demo */}
          <Link 
            to="/prediccion"
            className="relative bg-gradient-to-r from-[#F15F79] to-[#4C2D4D] text-white px-8 py-3 rounded-full font-medium shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#258CAB] to-[#4C2D4D] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 font-semibold tracking-wide">
              Probar Demo
            </span>
            <div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shine transition-all duration-1000"></div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;