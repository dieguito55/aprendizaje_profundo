import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState('w-20');

  // Paleta de colores
  const colors = {
    primary: '#342B7C',
    secondary: '#8C7FE9',
    accent: '#C19CFF',
    background: '#FDEEFD',
    lightBg: '#D8DFF9'
  };

  // Detectar dispositivo y manejar estados
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      if (mobile) {
        setSidebarWidth(sidebarOpen ? 'w-64' : 'w-0');
        setSidebarCollapsed(true);
      } else {
        setSidebarWidth(sidebarCollapsed ? 'w-20' : 'w-64');
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [sidebarOpen, sidebarCollapsed]);

  // Controlar scroll del body
  useEffect(() => {
    if (sidebarOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen, isMobile]);

  // Tecla Escape para cerrar sidebar
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [sidebarOpen]);

  // Manejar cambios del sidebar
  const handleSidebarStateChange = (isCollapsed, isHovered) => {
    if (!isMobile) {
      setSidebarCollapsed(isCollapsed && !isHovered);
      setSidebarWidth((isCollapsed && !isHovered) ? 'w-20' : 'w-64');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDEEFD] via-[#D8DFF9] to-[#8C7FE9]/10 relative overflow-hidden">
      {/* Fondo Animado Premium */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradientes animados */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#342B7C]/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8C7FE9]/10 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#C19CFF]/10 rounded-full blur-3xl animate-float-fast"></div>
        
        {/* Grid sutil */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(#342B7C 1px, transparent 1px),
                             linear-gradient(90deg, #342B7C 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        ></div>
        
        {/* Líneas decorativas */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#8C7FE9]/10 to-transparent"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-[#C19CFF]/10 to-transparent"></div>
      </div>

      {/* Layout Principal */}
      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          onStateChange={handleSidebarStateChange}
        />
        
        {/* Contenido Principal */}
        <div className={`
          flex-1 min-h-screen transition-all duration-500 ease-in-out
          ${isMobile 
            ? 'ml-0' 
            : sidebarCollapsed ? 'ml-20' : 'ml-64'
          }
        `}>
          {/* Header */}
          <Header 
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
            sidebarCollapsed={sidebarCollapsed}
          />
          
          {/* Overlay para móvil */}
          {sidebarOpen && isMobile && (
            <div 
              className="fixed inset-0 bg-[#342B7C]/60 backdrop-blur-lg z-40 lg:hidden animate-fadeIn"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          {/* Contenido Principal */}
          <main className="min-h-screen transition-all duration-500 pt-24">
            <div className="p-4 lg:p-6 xl:p-8 max-w-9xl mx-auto">
              
              {/* Container Premium del Contenido */}
              <div 
                className="
                  relative
                  bg-white/70 backdrop-blur-xl 
                  rounded-3xl 
                  border border-white/40 
                  shadow-2xl shadow-[#342B7C]/10
                  overflow-hidden
                  animate-fadeInUp
                  hover:shadow-3xl hover:shadow-[#8C7FE9]/20
                  transition-all duration-500
                "
              >
                {/* Barra superior de gradiente */}
                <div className="h-1.5 bg-gradient-to-r from-[#342B7C] via-[#8C7FE9] to-[#C19CFF] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shine"></div>
                </div>
                
                {/* Efectos de esquina */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#342B7C]/20 rounded-tl-3xl"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#8C7FE9]/20 rounded-tr-3xl"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#C19CFF]/20 rounded-bl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#342B7C]/20 rounded-br-3xl"></div>

                {/* Contenido con padding optimizado */}
                <div className="p-6 lg:p-8 xl:p-10 relative z-10">
                  {children}
                </div>
                
                {/* Efecto de brillo al hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/0 via-[#8C7FE9]/5 to-[#C19CFF]/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                {/* Partículas flotantes internas */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute animate-float-slow"
                      style={{
                        top: `${20 + i * 25}%`,
                        left: `${10 + i * 40}%`,
                        animationDelay: `${i * 1.5}s`,
                      }}
                    >
                      <div className="w-1 h-1 bg-[#8C7FE9]/30 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Footer del Layout */}
              <div className="mt-8 text-center">
                <p className="text-sm text-[#342B7C]/50 font-medium tracking-wide">
                  DermApp Pro · Sistema de Diagnóstico con IA · v3.0
                </p>
                <div className="flex justify-center space-x-3 mt-3">
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <div 
                      key={dot}
                      className="w-1 h-1 bg-[#8C7FE9] rounded-full opacity-40 animate-pulse"
                      style={{animationDelay: `${dot * 0.2}s`}}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Partículas de fondo animadas */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${20 + i * 3}s`
            }}
          >
            <div 
              className={`
                rounded-full blur-sm
                ${i % 3 === 0 ? 'w-3 h-3 bg-[#342B7C]/20' : 
                  i % 3 === 1 ? 'w-2 h-2 bg-[#8C7FE9]/15' : 
                  'w-1 h-1 bg-[#C19CFF]/10'}
              `}
            ></div>
          </div>
        ))}
      </div>

      {/* Estilos de animación personalizados */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(90deg); }
        }
        .animate-float-medium {
          animation: float-medium 10s ease-in-out infinite;
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-fast {
          animation: float-fast 6s ease-in-out infinite;
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shine {
          animation: shine 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Layout;