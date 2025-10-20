import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState('w-80'); // Estado para el ancho del sidebar

  // Detectar si es móvil y manejar el ancho del sidebar
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      // En móvil, el sidebar siempre está expandido cuando está abierto
      if (mobile) {
        setSidebarWidth(sidebarOpen ? 'w-80' : 'w-0');
      } else {
        // En desktop, manejar el estado colapsado
        setSidebarWidth('w-20'); // Por defecto colapsado en desktop
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [sidebarOpen]);

  // Efecto para deshabilitar scroll cuando sidebar está abierto en móvil
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

  // Manejar cierre del sidebar con tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [sidebarOpen]);

  // Función para manejar cambios en el estado del sidebar
  const handleSidebarStateChange = (isCollapsed, isHovered) => {
    if (!isMobile) {
      if (isCollapsed && !isHovered) {
        setSidebarWidth('w-20'); // Colapsado
      } else {
        setSidebarWidth('w-80'); // Expandido
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#082543]/5 via-[#258CAB]/10 to-[#4C2D4D]/5 relative overflow-hidden">
      {/* Elementos de fondo decorativos */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradientes circulares de fondo */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#F15F79]/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#258CAB]/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#4C2D4D]/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Patrón de grid sutil */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#082543 1px, transparent 1px),
                             linear-gradient(90deg, #082543 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Layout principal */}
      <div className="relative z-10 flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          onStateChange={handleSidebarStateChange}
        />
        
        {/* Contenido principal que se adapta al ancho del sidebar */}
        <div className={`flex-1 transition-all duration-500 ${
          isMobile 
            ? (sidebarOpen ? 'ml-0' : 'ml-0') 
            : sidebarWidth === 'w-20' ? 'ml-20' : 'ml-80'
        }`}>
          <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          
          {/* Overlay para móvil con efecto de blur */}
          {sidebarOpen && isMobile && (
            <div 
              className="fixed inset-0 bg-[#082543]/80 backdrop-blur-md z-40 lg:hidden animate-fadeIn"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          {/* Contenido principal con transiciones mejoradas */}
          <main className="min-h-screen transition-all duration-500 pt-20 lg:pt-24">
            {/* Efecto de borde sutil en el contenido */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#F15F79]/20 to-transparent hidden lg:block"></div>
            
            <div className="p-6 lg:p-8 max-w-7xl mx-auto">
              {/* Container del contenido con efectos premium */}
              <div 
                className="
                  bg-white/80 backdrop-blur-sm rounded-3xl 
                  border border-white/20 
                  shadow-2xl shadow-[#082543]/10
                  overflow-hidden
                  animate-fadeInUp
                "
              >
                {/* Efecto de gradiente en el borde superior */}
                <div className="h-1 bg-gradient-to-r from-[#F15F79] via-[#258CAB] to-[#4C2D4D]"></div>
                
                {/* Contenido con padding optimizado */}
                <div className="p-6 lg:p-8 xl:p-10">
                  {children}
                </div>
                
                {/* Efecto de brillo en hover para todo el container */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/0 via-[#F15F79]/0 to-[#258CAB]/0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
              
              {/* Footer sutil del layout */}
              <div className="mt-8 text-center">
                <p className="text-sm text-[#082543]/40 font-light tracking-wide">
                  DermApp · Sistema de Diagnóstico Educativo · v2.0
                </p>
                <div className="flex justify-center space-x-2 mt-2">
                  {[1, 2, 3].map((dot) => (
                    <div 
                      key={dot}
                      className="w-1 h-1 bg-[#082543]/20 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Efectos de partículas sutiles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${15 + i * 5}s`
            }}
          >
            <div className="w-2 h-2 bg-[#F15F79]/10 rounded-full blur-sm"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layout;