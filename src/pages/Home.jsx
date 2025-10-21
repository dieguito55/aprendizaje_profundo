import React from 'react';
import { FaPlay, FaBookMedical, FaShieldAlt, FaMobileAlt, FaSyncAlt, FaChartLine, FaGlobeAmericas, FaUserMd, FaArrowRight, FaCheck, FaAward, FaLightbulb } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section Premium */}
      <section className="min-h-screen flex items-center justify-center text-center py-20 relative overflow-hidden">
        {/* Fondo Animado Mejorado */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-80 h-80 bg-[#8C7FE9]/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C19CFF]/15 rounded-full blur-3xl animate-float-medium"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#342B7C]/10 rounded-full blur-3xl animate-float-fast"></div>
          
          {/* Grid Sutil */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(#342B7C 1px, transparent 1px),
                               linear-gradient(90deg, #342B7C 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }}
          ></div>
        </div>

        <div className="relative z-10 animate-fadeInUp max-w-6xl mx-auto">
          {/* Logo y Badge Premium */}
          <div className="mb-12">
            <div className="relative inline-block">
              <div className="w-40 h-40 bg-gradient-to-br from-[#342B7C] via-[#8C7FE9] to-[#C19CFF] rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-6 animate-float relative overflow-hidden">
                {/* Imagen del logo - reemplaza con tu logo.png */}
                <img 
                  src="/logo.png" 
                  alt="DermApp Logo" 
                  className="w-24 h-24 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-24 h-24 hidden items-center justify-center text-white font-bold text-3xl font-serif">
                  D
                </div>
                
                {/* Efectos decorativos */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#C19CFF] rounded-full animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#8C7FE9] rounded-full"></div>
              </div>
              
              {/* Badge de IA */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#F15F79] to-[#C19CFF] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                AI Powered
              </div>
            </div>
          </div>

          {/* Título Principal */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#342B7C] mb-6 font-sans tracking-tight">
              DermApp
              <span className="block text-2xl md:text-3xl lg:text-4xl text-[#8C7FE9] mt-6 font-light tracking-wider bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] bg-clip-text text-transparent">
                Dermatología Inteligente
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#342B7C]/80 mb-12 max-w-5xl mx-auto leading-relaxed font-light">
              Plataforma educativa avanzada para el diagnóstico y reconocimiento de lesiones cutáneas 
              mediante <span className="font-semibold text-[#8C7FE9]">inteligencia artificial especializada</span>. 
              Formamos competencias, salvamos distancias.
            </p>
          </div>
          
          {/* Botones de Acción Mejorados */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="
              group relative
              bg-gradient-to-r from-[#342B7C] to-[#8C7FE9]
              text-white px-12 py-6 
              rounded-2xl font-semibold text-lg 
              shadow-2xl hover:shadow-3xl 
              transition-all duration-500 
              transform hover:scale-105
              overflow-hidden
              border-2 border-transparent hover:border-white/20
            ">
              <div className="absolute inset-0 bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex items-center space-x-4">
                <FaPlay className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" />
                <span className="tracking-wide">Comenzar Diagnóstico</span>
                <FaArrowRight className="w-4 h-4 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
              </div>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shine transition-all duration-1000"></div>
            </button>
            
            <button className="
              group relative
              border-2 border-[#342B7C] 
              text-[#342B7C] px-12 py-6 
              rounded-2xl font-semibold text-lg 
              bg-white/80 backdrop-blur-sm
              hover:bg-[#342B7C] hover:text-white
              transition-all duration-500
              transform hover:scale-105
              shadow-lg hover:shadow-xl
              hover:border-transparent
            ">
              <div className="relative z-10 flex items-center space-x-4">
                <FaBookMedical className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" />
                <span className="tracking-wide">Explorar Enfermedades</span>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
            </button>
          </div>

          {/* Mini Estadísticas */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { number: '94%', label: 'Precisión' },
              { number: '15+', label: 'Patologías' },
              { number: '0ms', label: 'Latencia' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-2xl font-bold text-[#342B7C] group-hover:text-[#8C7FE9] transition-colors duration-300">{stat.number}</div>
                <div className="text-sm text-[#342B7C]/70 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator Mejorado */}
          <div className="mt-20 animate-bounce-slow">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-[#342B7C]/60 text-sm font-medium tracking-wide">Explorar Más</span>
              <div className="w-6 h-10 border-2 border-[#342B7C]/20 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-[#8C7FE9] rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Características Premium */}
      <section className="py-32 relative">
        {/* Fondo Decorativo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-[#FDEEFD] to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#D8DFF9] to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#342B7C] mb-6 font-sans">
              Tecnología que
              <span className="block text-[#8C7FE9]">Transforma la Educación</span>
            </h2>
            <p className="text-xl text-[#342B7C]/70 max-w-3xl mx-auto leading-relaxed">
              Combinamos lo último en inteligencia artificial con una interfaz intuitiva 
              diseñada para profesionales de la salud.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: FaAward,
                title: 'Alta Precisión',
                description: 'Modelo IA con 94% de precisión validada en diagnóstico dermatológico',
                features: ['Validación clínica', 'Actualizaciones continuas', 'Benchmarking constante'],
                gradient: 'from-[#342B7C] to-[#8C7FE9]'
              },
              {
                icon: FaShieldAlt,
                title: 'Privacidad Total',
                description: 'Procesamiento 100% local, tus datos nunca salen de tu dispositivo',
                features: ['Cifrado local', 'Sin almacenamiento en nube', 'Compliance médico'],
                gradient: 'from-[#8C7FE9] to-[#C19CFF]'
              },
              {
                icon: FaMobileAlt,
                title: 'Multiplataforma',
                description: 'Experiencia optimizada para desktop, tablet y dispositivos móviles',
                features: ['Responsive design', 'Offline first', 'Sync inteligente'],
                gradient: 'from-[#C19CFF] to-[#342B7C]'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="
                  group relative
                  bg-white/80 backdrop-blur-xl
                  rounded-3xl p-8
                  shadow-2xl hover:shadow-3xl
                  border border-white/40
                  transition-all duration-500
                  transform hover:scale-105
                  overflow-hidden
                "
              >
                {/* Efecto de fondo */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Icono */}
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Contenido */}
                <h3 className="text-2xl font-bold text-[#342B7C] mb-4">{feature.title}</h3>
                <p className="text-[#342B7C]/70 mb-6 leading-relaxed">{feature.description}</p>
                
                {/* Features list */}
                <ul className="space-y-3">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-3 text-sm text-[#342B7C]/80">
                      <FaCheck className="w-4 h-4 text-[#8C7FE9] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Efecto de borde */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#8C7FE9]/20 transition-all duration-500"></div>
              </div>
            ))}
          </div>

          {/* Sección de Imagen y Texto */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              {/* Imagen placeholder - reemplaza con tu imagen */}
              <div className="
                relative
                bg-gradient-to-br from-[#342B7C] to-[#8C7FE9]
                rounded-3xl overflow-hidden
                shadow-2xl
                transform hover:scale-105
                transition-all duration-500
                h-96
              ">
                <div className="absolute inset-0 flex items-center justify-center text-white/20">
                  <FaUserMd className="w-32 h-32" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#342B7C] to-transparent p-8">
                  <div className="text-white text-center">
                    <p className="text-lg font-semibold">Interfaz de Diagnóstico Inteligente</p>
                  </div>
                </div>
              </div>
              
              {/* Elementos decorativos */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#C19CFF] rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-[#8C7FE9] rounded-full"></div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-4xl font-bold text-[#342B7C] mb-6 font-sans leading-tight">
                  Diseñado para
                  <span className="block text-[#8C7FE9]">Profesionales de la Salud</span>
                </h3>
                <div className="w-20 h-1 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] rounded-full mb-8"></div>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    title: 'Formación Avanzada',
                    description: 'Herramientas educativas integradas para el desarrollo continuo de competencias diagnósticas.',
                    icon: FaLightbulb
                  },
                  {
                    title: 'Casos Reales',
                    description: 'Base de datos con casos clínicos reales y variados para entrenamiento práctico.',
                    icon: FaBookMedical
                  },
                  {
                    title: 'Soporte Continuo',
                    description: 'Actualizaciones regulares y soporte técnico especializado para instituciones médicas.',
                    icon: FaSyncAlt
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-[#342B7C] mb-2">{item.title}</h4>
                      <p className="text-[#342B7C]/70 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Premium */}
      <section className="py-32 relative">
        <div className="
          relative
          bg-gradient-to-br from-[#342B7C] via-[#8C7FE9] to-[#C19CFF]
          rounded-4xl p-12 lg:p-20
          shadow-2xl hover:shadow-3xl
          transition-all duration-500
          overflow-hidden
          text-center
        ">
          {/* Elementos decorativos */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-32 translate-y-32"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 font-sans">
              ¿Listo para Revolucionar
              <span className="block text-[#FDEEFD]">tu Práctica Médica?</span>
            </h2>
            
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Únete a instituciones médicas que ya están transformando la educación dermatológica 
              con nuestra plataforma de inteligencia artificial.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="
                bg-white text-[#342B7C] 
                px-12 py-6 
                rounded-2xl font-bold text-lg
                shadow-2xl hover:shadow-3xl
                transition-all duration-300
                transform hover:scale-105
                hover:bg-[#FDEEFD]
                flex items-center space-x-3
                group
              ">
                <span>Comenzar Ahora</span>
                <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="
                border-2 border-white/30 text-white
                px-12 py-6 
                rounded-2xl font-bold text-lg
                backdrop-blur-sm
                hover:bg-white/10
                transition-all duration-300
                transform hover:scale-105
                flex items-center space-x-3
                group
              ">
                <span>Ver Demo</span>
                <FaPlay className="w-4 h-4 transform group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/60 text-sm">
              <div className="flex items-center space-x-2">
                <FaCheck className="w-4 h-4 text-green-400" />
                <span>Sin requerimientos técnicos</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCheck className="w-4 h-4 text-green-400" />
                <span>Implementación inmediata</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCheck className="w-4 h-4 text-green-400" />
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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
          animation: fadeInUp 0.8s ease-out;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-25px) scale(1.05); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(90deg); }
        }
        .animate-float-medium {
          animation: float-medium 10s ease-in-out infinite;
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-fast {
          animation: float-fast 5s ease-in-out infinite;
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shine {
          animation: shine 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;