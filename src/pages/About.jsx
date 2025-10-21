import React, { useState, useEffect } from 'react';
import { 
  FaHeart, 
  FaBrain, 
  FaShieldAlt, 
  FaMobileAlt, 
  FaUserMd, 
  FaCode, 
  FaGraduationCap,
  FaGlobeAmericas,
  FaRocket,
  FaAward,
  FaUsers,
  FaLaptopCode,
  FaChevronDown,
  FaStar
} from 'react-icons/fa';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Paleta de colores profesional proporcionada
  const colors = {
    primary: '#342B7C',
    secondary: '#8C7FE9',
    accent: '#C19CFF',
    light: '#FDEEFD',
    medium: '#D8DFF9'
  };

  const teamMembers = [
    { 
      name: "Dr. Ana López", 
      role: "Dermatóloga Senior", 
      specialty: "Dermatología Oncológica",
      experience: "15+ años",
      icon: <FaUserMd className="w-6 h-6" />,
      color: `from-[${colors.secondary}] to-[${colors.primary}]`
    },
    { 
      name: "Ing. Carlos Ruiz", 
      role: "AI Research Lead", 
      specialty: "Computer Vision & Deep Learning",
      experience: "8+ años",
      icon: <FaBrain className="w-6 h-6" />,
      color: `from-[${colors.accent}] to-[${colors.primary}]`
    },
    { 
      name: "Dra. María Torres", 
      role: "Directora Educativa", 
      specialty: "Telemedicina & Educación Médica",
      experience: "12+ años",
      icon: <FaGraduationCap className="w-6 h-6" />,
      color: `from-[${colors.primary}] to-[${colors.secondary}]`
    }
  ];

  const technologies = [
    {
      name: "MobileNetV2 + Transfer Learning",
      description: "Arquitecturas de deep learning optimizadas para dispositivos móviles con alta precisión y bajo consumo computacional",
      icon: <FaBrain className="w-6 h-6" />,
      features: ["90%+ precisión validada", "Procesamiento eficiente", "Optimizado para móviles"],
      delay: "100ms"
    },
    {
      name: "TensorFlow.js Local",
      description: "Procesamiento 100% local garantizando privacidad total y funcionamiento sin conexión a internet",
      icon: <FaShieldAlt className="w-6 h-6" />,
      features: ["Privacidad total", "Funcionamiento offline", "Sin dependencia cloud"],
      delay: "200ms"
    },
    {
      name: "React + Tailwind CSS",
      description: "Interfaz moderna y responsive con optimización de rendimiento y experiencia de usuario excepcional",
      icon: <FaLaptopCode className="w-6 h-6" />,
      features: ["Interfaz responsive", "Rendimiento optimizado", "UX moderna"],
      delay: "300ms"
    }
  ];

  const values = [
    { icon: FaGlobeAmericas, title: "Accesibilidad", desc: "Para todos los contextos" },
    { icon: FaShieldAlt, title: "Privacidad", desc: "Datos 100% locales" },
    { icon: FaGraduationCap, title: "Educación", desc: "Enfoque formativo" },
    { icon: FaMobileAlt, title: "Innovación", desc: "Tecnología de punta" }
  ];

  // Animaciones personalizadas con Tailwind
  const animationClasses = `
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
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
    
    @keyframes pulse-glow {
      0%, 100% {
        box-shadow: 0 0 5px ${colors.accent}40;
      }
      50% {
        box-shadow: 0 0 20px ${colors.accent}80;
      }
    }
    
    .animate-fadeInUp {
      animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    
    .animate-pulse-glow {
      animation: pulse-glow 2s ease-in-out infinite;
    }
  `;

  return (
    <>
      <style>{animationClasses}</style>
      <div className="min-h-screen bg-gradient-to-br from-[#FDEEFD] via-[#D8DFF9] to-[#FDEEFD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Hero Mejorado */}
          <section className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-center mb-8 animate-float">
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-[#8C7FE9] to-[#342B7C] rounded-3xl flex items-center justify-center shadow-2xl animate-pulse-glow">
                  <FaHeart className="text-white text-4xl" />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] rounded-3xl opacity-30 blur-xl animate-pulse"></div>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#342B7C] mb-6 font-sans tracking-tight leading-tight">
              Acerca de DermApp
              <span className="block text-2xl md:text-3xl text-[#8C7FE9] mt-6 font-light">
                Innovación Educativa en Dermatología
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#342B7C]/90 max-w-4xl mx-auto leading-relaxed mb-8">
              Democratizando el acceso a herramientas dermatológicas de alta calidad 
              para <span className="font-semibold text-[#8C7FE9]">entornos de recursos limitados</span> 
              mediante inteligencia artificial especializada.
            </p>
            
            <div className="flex justify-center mt-10">
              <div className="animate-bounce">
                <FaChevronDown className="text-[#342B7C] text-2xl" />
              </div>
            </div>
          </section>

          <div className="space-y-20">
            {/* Misión Profesionalizada */}
            <section className={`transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/40 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-40 h-40 bg-[#8C7FE9]/10 rounded-full blur-2xl -translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#C19CFF]/10 rounded-full blur-2xl translate-x-24 translate-y-24"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#8C7FE9] to-[#342B7C] rounded-2xl flex items-center justify-center shadow-lg">
                      <FaRocket className="text-white text-2xl" />
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold text-[#342B7C] font-sans">Nuestra Misión</h2>
                      <div className="w-20 h-1 bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] rounded-full mt-2"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-6 text-[#342B7C]/90 leading-relaxed text-lg md:text-xl">
                    <div className="flex items-start space-x-4">
                      <FaStar className="text-[#8C7FE9] mt-1 flex-shrink-0" />
                      <p>
                        <strong className="text-[#342B7C]">DermApp</strong> nace de la necesidad crítica de 
                        democratizar el acceso a herramientas educativas dermatológicas de alta calidad en 
                        regiones con limitado acceso a especialistas.
                      </p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <FaStar className="text-[#8C7FE9] mt-1 flex-shrink-0" />
                      <p>
                        Combinamos <span className="font-semibold text-[#8C7FE9]">inteligencia artificial de vanguardia</span> 
                        {' '}con una interfaz intuitiva para formar competencias en reconocimiento de 
                        patrones cutáneos, especialmente diseñada para contextos como la región altoandina 
                        de Puno.
                      </p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <FaStar className="text-[#8C7FE9] mt-1 flex-shrink-0" />
                      <p>
                        Nuestro objetivo es <span className="font-semibold text-[#C19CFF]">salvar distancias</span> 
                        {' '}y formar competencias mediante tecnología accesible, ética y educativa.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tecnología Profesionalizada */}
            <section className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-gradient-to-br from-[#342B7C] to-[#1a1545] text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                {/* Elementos decorativos animados */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#8C7FE9]/20 rounded-full blur-3xl -translate-y-32 translate-x-32 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C19CFF]/20 rounded-full blur-3xl translate-y-32 -translate-x-32 animate-pulse" style={{animationDelay: '1s'}}></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-12">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                      <FaAward className="text-white text-2xl" />
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold font-sans">Tecnología de Vanguardia</h2>
                      <div className="w-20 h-1 bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] rounded-full mt-2"></div>
                    </div>
                  </div>
                  
                  <div className="grid lg:grid-cols-3 gap-8">
                    {technologies.map((tech, index) => (
                      <div 
                        key={index}
                        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 group hover:scale-105 hover:shadow-2xl"
                        style={{animationDelay: tech.delay}}
                      >
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 border border-white/30">
                          {tech.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{tech.name}</h3>
                        <p className="text-white/80 mb-6 leading-relaxed text-lg">
                          {tech.description}
                        </p>
                        <div className="space-y-3">
                          {tech.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-3 text-white/70">
                              <div className="w-2 h-2 bg-[#C19CFF] rounded-full flex-shrink-0"></div>
                              <span className="text-lg">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

        

            {/* Valores Profesionalizados */}
            <section className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-gradient-to-r from-[#8C7FE9]/10 to-[#342B7C]/5 rounded-3xl p-8 md:p-12 border border-[#8C7FE9]/20 backdrop-blur-lg">
                <h2 className="text-4xl font-bold text-[#342B7C] text-center mb-12 font-sans">
                  Nuestros Valores
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {values.map((value, index) => (
                    <div key={index} className="text-center p-6 group hover:scale-105 transition-transform duration-300">
                      <div className="w-20 h-20 bg-gradient-to-r from-[#8C7FE9] to-[#342B7C] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <value.icon className="text-white text-2xl" />
                      </div>
                      <h3 className="font-bold text-[#342B7C] text-xl mb-3">{value.title}</h3>
                      <p className="text-[#342B7C]/70 text-lg leading-relaxed">{value.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;