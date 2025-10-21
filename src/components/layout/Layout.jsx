import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTools, FaRocket, FaLightbulb, FaCodeBranch } from 'react-icons/fa';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isXS, setIsXS] = useState(false); // teléfonos muy pequeños (<=380px)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  // Paleta de colores (por si luego la expones como CSS vars)
  const colors = {
    primary: '#342B7C',
    secondary: '#8C7FE9',
    accent: '#C19CFF',
    background: '#FDEEFD',
    lightBg: '#D8DFF9',
  };

  // Detectar dispositivo y manejar estados
  useEffect(() => {
    const checkMobile = () => {
      const w = window.innerWidth;
      const mobile = w < 1024;
      setIsMobile(mobile);
      setIsXS(w <= 380);

      if (mobile) {
        // En móvil el sidebar es overlay
        setSidebarCollapsed(true);
      } else {
        // En desktop mantenemos el colapso/expand
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Controlar scroll del body cuando el sidebar está abierto en móvil
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
      if (e.key === 'Escape' && sidebarOpen) setSidebarOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [sidebarOpen]);

  // Manejar cambios del sidebar desde el componente hijo (desktop)
  const handleSidebarStateChange = (isCollapsed, isHovered) => {
    if (!isMobile) {
      const collapsed = isCollapsed && !isHovered;
      setSidebarCollapsed(collapsed);
    }
  };

  // Detectar si hay contenido real en children
  const hasContent = React.Children.toArray(children).some(
    (child) =>
      child !== null &&
      child !== undefined &&
      !(typeof child === 'string' && child.trim() === '')
  );

  // Placeholder bonito "En Desarrollo"
  const WipEmptyState = () => (
    <div className="relative text-center py-16 px-6">
      <div className="mx-auto max-w-2xl bg-white/80 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl overflow-hidden">
        {/* Barra superior con brillo */}
        <div className="h-1 bg-gradient-to-r from-[#342B7C] via-[#8C7FE9] to-[#C19CFF] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine" />
        </div>

        <div className="px-8 py-10">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#F15F79] via-[#8C7FE9] to-[#4C2D4D] text-white shadow-xl flex items-center justify-center animate-float-slow">
              <FaTools className="w-9 h-9" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#082543] font-serif mb-3">
            En desarrollo
          </h2>
          <p className="text-[#082543]/70 max-w-xl mx-auto">
            Estamos construyendo esta sección para brindarte una experiencia impecable. 
            Muy pronto verás aquí nuevas funciones, visualizaciones y mejoras de rendimiento.
          </p>

          {/* Progreso / shimmer */}
          <div className="mt-8">
            <div className="h-3 rounded-full bg-[#8C7FE9]/10 overflow-hidden">
              <div className="h-full w-1/3 bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] animate-shine" />
            </div>
            <p className="mt-2 text-xs text-[#082543]/50 tracking-wide">
              Fase Beta continua • CI/CD activo
            </p>
          </div>

          {/* Features venideras */}
          <div className="grid sm:grid-cols-3 gap-4 mt-10 text-left">
            {[
              { icon: <FaRocket />, t: 'Rendimiento optimizado' },
              { icon: <FaLightbulb />, t: 'Nuevos módulos educativos' },
              { icon: <FaCodeBranch />, t: 'Integración con backend' },
            ].map((it, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#082543]/[0.03] border border-[#082543]/[0.06]"
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] text-white">
                  <span className="text-sm">{it.icon}</span>
                </div>
                <span className="text-sm text-[#082543]/80">{it.t}</span>
              </div>
            ))}
          </div>

          {/* Botones */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#F15F79] to-[#4C2D4D] shadow-lg hover:shadow-xl transition-all"
            >
              Volver al inicio
            </Link>
            <Link
              to="/enfermedades"
              className="px-6 py-3 rounded-xl font-semibold border-2 border-[#082543]/20 text-[#082543] bg-white/70 hover:bg-white transition-all"
            >
              Ver catálogo educativo
            </Link>
          </div>
        </div>
      </div>

      {/* decorativos sutiles */}
      <div className="absolute -z-10 inset-0 pointer-events-none">
        <div className="absolute -top-6 -left-6 w-40 h-40 rounded-full bg-[#8C7FE9]/10 blur-3xl" />
        <div className="absolute -bottom-6 -right-8 w-52 h-52 rounded-full bg-[#C19CFF]/10 blur-3xl" />
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh bg-gradient-to-br from-[#FDEEFD] via-[#D8DFF9] to-[#8C7FE9]/10 relative overflow-x-hidden">
      {/* Fondo Animado Premium (oculto en móviles para rendimiento) */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradientes animados */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#342B7C]/10 rounded-full blur-3xl animate-float-slow hidden md:block"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8C7FE9]/10 rounded-full blur-3xl animate-float-medium hidden lg:block"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#C19CFF]/10 rounded-full blur-3xl animate-float-fast hidden md:block"></div>

        {/* Grid sutil */}
        <div
          className="absolute inset-0 opacity-[0.015] hidden sm:block"
          style={{
            backgroundImage: `linear-gradient(#342B7C 1px, transparent 1px),
                              linear-gradient(90deg, #342B7C 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Líneas decorativas */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#8C7FE9]/10 to-transparent hidden md:block" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-[#C19CFF]/10 to-transparent hidden lg:block" />
      </div>

      {/* Layout Principal */}
      <div className="relative z-10 flex min-h-dvh">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onStateChange={handleSidebarStateChange}
        />

        {/* Contenido Principal */}
        <div
          className={`
            flex-1 min-h-dvh transition-all duration-300 ease-in-out
            ${isMobile ? 'ml-0' : sidebarCollapsed ? 'ml-20' : 'ml-64'}
          `}
        >
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
          <main
            className={`
              min-h-dvh transition-all duration-300
              pt-16 sm:pt-20 md:pt-24
            `}
          >
            <div className="px-3 sm:px-4 lg:px-6 xl:px-8 max-w-[100dvw] mx-auto">
              {/* Container Premium del Contenido */}
              <div
                className={`
                  relative
                  bg-white/80 backdrop-blur-xl 
                  rounded-2xl sm:rounded-3xl
                  border border-white/40 
                  shadow-xl sm:shadow-2xl shadow-[#342B7C]/10
                  overflow-hidden
                  animate-fadeInUp
                  hover:shadow-2xl hover:shadow-[#8C7FE9]/20
                  transition-all duration-300
                  ${isXS ? 'mobile-zoom' : ''}
                `}
              >
                {/* Barra superior de gradiente */}
                <div className="h-1 bg-gradient-to-r from-[#342B7C] via-[#8C7FE9] to-[#C19CFF] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine" />
                </div>

                {/* Esquinas */}
                <div className="absolute top-0 left-0 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-l-2 border-[#342B7CE6]/15 sm:border-[#342B7C]/20 rounded-tl-3xl" />
                <div className="absolute top-0 right-0 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-r-2 border-[#8C7FE9]/15 sm:border-[#8C7FE9]/20 rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-l-2 border-[#C19CFF]/15 sm:border-[#C19CFF]/20 rounded-bl-3xl" />
                <div className="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-r-2 border-[#342B7C]/15 sm:border-[#342B7C]/20 rounded-br-3xl" />

                {/* Contenido o Placeholder */}
                <div className="p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 relative z-10">
                  {hasContent ? <>{children}</> : <WipEmptyState />}
                </div>

                {/* Brillo hover */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-white/0 via-[#8C7FE9]/5 to-[#C19CFF]/5 ${isXS ? 'opacity-0' : 'opacity-0 hover:opacity-100'} transition-opacity duration-300 pointer-events-none`}
                />

                {/* Partículas internas */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute animate-float-slow hidden sm:block"
                      style={{
                        top: `${25 + i * 30}%`,
                        left: `${15 + i * 45}%`,
                        animationDelay: `${i * 1.2}s`,
                      }}
                    >
                      <div className="w-1 h-1 bg-[#8C7FE9]/25 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer del Layout */}
              <div className="mt-6 sm:mt-8 text-center">
                <p className="text-[11px] sm:text-sm text-[#342B7C]/50 font-medium tracking-wide">
                  DermApp Pro · Sistema de Diagnóstico con IA · v3.0
                </p>
                <div className="flex justify-center space-x-2 sm:space-x-3 mt-2 sm:mt-3">
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <div
                      key={dot}
                      className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#8C7FE9] rounded-full opacity-40 animate-pulse"
                      style={{ animationDelay: `${dot * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Partículas de fondo animadas (apagadas en móvil) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden md:block">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${20 + i * 3}s`,
            }}
          >
            <div
              className={`
                rounded-full blur-sm
                ${i % 3 === 0 ? 'w-3 h-3 bg-[#342B7C]/20' :
                  i % 3 === 1 ? 'w-2 h-2 bg-[#8C7FE9]/15' :
                    'w-1 h-1 bg-[#C19CFF]/10'}
              `}
            />
          </div>
        ))}
      </div>

      {/* Estilos de animación y responsividad adicionales */}
      <style jsx>{`
        /* Zoom inteligente para pantallas muy pequeñas */
        .mobile-zoom {
          transform: scale(0.92);
          transform-origin: top center;
        }
        @media (max-width: 360px) {
          .mobile-zoom {
            transform: scale(0.86);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(180deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-12px) scale(1.04); }
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }

        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-22px) rotate(90deg); }
        }
        .animate-float-medium {
          animation: float-medium 10s ease-in-out infinite;
        }

        @keyframes float-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
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

        /* Respeto a usuarios con movimiento reducido */
        @media (prefers-reduced-motion: reduce) {
          .animate-fadeInUp,
          .animate-fadeIn,
          .animate-float,
          .animate-float-slow,
          .animate-float-medium,
          .animate-float-fast,
          .animate-shine {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
