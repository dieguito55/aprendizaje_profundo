import React from 'react';
import { FaPlay, FaBookMedical, FaShieldAlt, FaMobileAlt, FaSyncAlt, FaChartLine, FaGlobeAmericas, FaUserMd } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero Section Mejorada */}
      <section className="min-h-screen flex items-center justify-center text-center py-20 relative overflow-hidden">
        {/* Elementos de fondo animados */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#F15F79]/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#258CAB]/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-[#4C2D4D]/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 animate-fadeInUp">
          {/* Logo Principal */}
          <div className="mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-[#F15F79] via-[#258CAB] to-[#4C2D4D] rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-6 animate-float">
              <span className="text-white text-4xl font-bold font-serif">D</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#082543] mb-6 font-serif tracking-tight">
        nuevoooooo
            <span className="block text-2xl md:text-3xl lg:text-4xl text-[#F15F79] mt-4 font-light tracking-wider">
              Dermatología Educativa Avanzada
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#082543]/80 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Plataforma educativa inteligente para el reconocimiento automático de lesiones cutáneas 
            mediante <span className="font-semibold text-[#258CAB]">inteligencia artificial especializada</span>. 
            Formamos competencias, salvamos distancias.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="
              group relative
              bg-gradient-to-r from-[#F15F79] to-[#4C2D4D]
              text-white px-10 py-5 
              rounded-2xl font-semibold text-lg 
              shadow-2xl hover:shadow-3xl 
              transition-all duration-500 
              transform hover:scale-105
              overflow-hidden
            ">
              <div className="absolute inset-0 bg-gradient-to-r from-[#258CAB] to-[#4C2D4D] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex items-center space-x-3">
                <FaPlay className="w-5 h-5" />
                <span>Comenzar Predicción</span>
              </div>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shine transition-all duration-1000"></div>
            </button>
            
            <button className="
              group relative
              border-2 border-[#082543] 
              text-[#082543] px-10 py-5 
              rounded-2xl font-semibold text-lg 
              bg-white/80 backdrop-blur-sm
              hover:bg-[#082543] hover:text-white
              transition-all duration-500
              transform hover:scale-105
              shadow-lg hover:shadow-xl
            ">
              <div className="relative z-10 flex items-center space-x-3">
                <FaBookMedical className="w-5 h-5" />
                <span>Explorar Enfermedades</span>
              </div>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-20 animate-bounce">
            <div className="w-6 h-10 border-2 border-[#082543]/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-[#082543]/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas Mejoradas */}
      <section className="py-20 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              number: '94%', 
              label: 'Precisión Validada',
              icon: <FaChartLine className="w-6 h-6" />,
              gradient: 'from-[#F15F79] to-[#4C2D4D]'
            },
            { 
              number: '15+', 
              label: 'Enfermedades',
              icon: <FaBookMedical className="w-6 h-6" />,
              gradient: 'from-[#258CAB] to-[#082543]'
            },
            { 
              number: '0ms', 
              label: 'Latencia Local',
              icon: <FaSyncAlt className="w-6 h-6" />,
              gradient: 'from-[#4C2D4D] to-[#258CAB]'
            },
            { 
              number: '100%', 
              label: 'Privacidad',
              icon: <FaShieldAlt className="w-6 h-6" />,
              gradient: 'from-[#082543] to-[#F15F79]'
            },
          ].map((stat, index) => (
            <div 
              key={index}
              className="
                group relative
                text-center p-8 
                bg-white/80 backdrop-blur-sm 
                rounded-3xl shadow-2xl 
                hover:shadow-3xl 
                transition-all duration-500
                border border-white/20
                hover:scale-105
              "
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className="text-4xl font-bold text-[#082543] mb-2 font-serif">{stat.number}</div>
              <div className="text-[#082543]/70 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Descripción Detallada Mejorada */}
      <section className="py-20 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#082543] mb-6 font-serif leading-tight">
                Innovación al Servicio de la 
                <span className="block text-[#F15F79]">Educación Dermatológica</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#F15F79] to-[#258CAB] rounded-full mb-8"></div>
            </div>
            
            <div className="space-y-6 text-[#082543]/90 leading-relaxed text-lg">
              <div className="flex items-start space-x-4 group">
                <div className="w-2 h-2 bg-[#F15F79] rounded-full mt-3 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                <p>
                  <strong className="text-[#082543]">DermApp</strong> representa un avance significativo en la formación 
                  dermatológica para entornos de recursos limitados. Combinando la potencia del 
                  <em className="text-[#258CAB]"> Transfer Learning con MobileNetV2</em> y la accesibilidad de 
                  <em className="text-[#258CAB]"> TensorFlow.js</em>, ofrecemos una solución educativa que funciona 
                  completamente localmente.
                </p>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="w-2 h-2 bg-[#258CAB] rounded-full mt-3 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                <p>
                  Nuestra plataforma está especialmente diseñada para contextos como la región 
                  altoandina de Puno, donde la distancia a centros especializados y la 
                  conectividad intermitente representan barreras críticas para la educación médica.
                </p>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="w-2 h-2 bg-[#4C2D4D] rounded-full mt-3 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                <p>
                  El sistema logra una <strong className="text-[#082543]">precisión superior al 94%</strong> en validación 
                  con un modelo compacto y de baja latencia, ideal para el reconocimiento 
                  en tiempo real de patrones dermatológicos complejos.
                </p>
              </div>
            </div>
          </div>
          
          <div className="
            relative
            bg-gradient-to-br from-[#082543] to-[#4C2D4D]
            rounded-3xl p-8 text-white
            shadow-2xl hover:shadow-3xl
            transition-all duration-500
            transform hover:scale-105
          ">
            {/* Elementos decorativos */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F15F79]/20 rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#258CAB]/20 rounded-full blur-2xl translate-y-16 -translate-x-16"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-8 font-serif flex items-center space-x-3">
                <FaShieldAlt className="w-8 h-8 text-[#F15F79]" />
                <span>Características Principales</span>
              </h3>
              
              <ul className="space-y-4">
                {[
                  { icon: FaShieldAlt, text: 'Procesamiento 100% local - máxima privacidad' },
                  { icon: FaMobileAlt, text: 'Interfaz intuitiva optimizada para móviles' },
                  { icon: FaBookMedical, text: 'Base de conocimiento educativa integrada' },
                  { icon: FaGlobeAmericas, text: 'Funcionalidad offline completa' },
                  { icon: FaSyncAlt, text: 'Actualizaciones continuas del modelo IA' },
                  { icon: FaUserMd, text: 'Soporte para diagnóstico educativo' }
                ].map((feature, index) => (
                  <li 
                    key={index}
                    className="flex items-center space-x-4 p-3 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-[#F15F79] to-[#258CAB] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium flex-1">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 text-center animate-fadeInUp" style={{ animationDelay: '600ms' }}>
        <div className="
          bg-gradient-to-r from-[#082543] to-[#4C2D4D]
          rounded-3xl p-12
          shadow-2xl
          relative overflow-hidden
        ">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-6 font-serif">
              ¿Listo para comenzar?
            </h2>
            <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto">
              Únete a la revolución de la educación dermatológica con inteligencia artificial
            </p>
            <button className="
              bg-white text-[#082543] 
              px-12 py-4 
              rounded-2xl font-bold text-lg
              shadow-2xl hover:shadow-3xl
              transition-all duration-300
              transform hover:scale-105
              hover:bg-[#F15F79] hover:text-white
            ">
              Comenzar Ahora
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;