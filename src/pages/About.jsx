import React from 'react';
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
  FaLaptopCode
} from 'react-icons/fa';

const About = () => {
  const teamMembers = [
    { 
      name: "Dr. Ana López", 
      role: "Dermatóloga Senior", 
      specialty: "Dermatología Oncológica",
      experience: "15+ años",
      icon: <FaUserMd className="w-6 h-6" />,
      color: "from-[#F15F79] to-[#4C2D4D]"
    },
    { 
      name: "Ing. Carlos Ruiz", 
      role: "AI Research Lead", 
      specialty: "Computer Vision & Deep Learning",
      experience: "8+ años",
      icon: <FaBrain className="w-6 h-6" />,
      color: "from-[#258CAB] to-[#082543]"
    },
    { 
      name: "Dra. María Torres", 
      role: "Directora Educativa", 
      specialty: "Telemedicina & Educación Médica",
      experience: "12+ años",
      icon: <FaGraduationCap className="w-6 h-6" />,
      color: "from-[#4C2D4D] to-[#258CAB]"
    }
  ];

  const technologies = [
    {
      name: "MobileNetV2 + Transfer Learning",
      description: "Arquitecturas de deep learning optimizadas para dispositivos móviles con alta precisión y bajo consumo computacional",
      icon: <FaBrain className="w-6 h-6" />,
      features: ["90%+ precisión validada", "Procesamiento eficiente", "Optimizado para móviles"]
    },
    {
      name: "TensorFlow.js Local",
      description: "Procesamiento 100% local garantizando privacidad total y funcionamiento sin conexión a internet",
      icon: <FaShieldAlt className="w-6 h-6" />,
      features: ["Privacidad total", "Funcionamiento offline", "Sin dependencia cloud"]
    },
    {
      name: "React + Tailwind CSS",
      description: "Interfaz moderna y responsive con optimización de rendimiento y experiencia de usuario excepcional",
      icon: <FaLaptopCode className="w-6 h-6" />,
      features: ["Interfaz responsive", "Rendimiento optimizado", "UX moderna"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header Hero */}
      <div className="text-center mb-16 animate-fadeInUp">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-[#F15F79] via-[#258CAB] to-[#4C2D4D] rounded-3xl flex items-center justify-center shadow-2xl">
              <FaHeart className="text-white text-3xl" />
            </div>
            <div className="absolute -inset-3 bg-gradient-to-r from-[#F15F79] to-[#258CAB] rounded-3xl opacity-20 blur-lg"></div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#082543] mb-6 font-serif tracking-tight">
          Acerca de DermApp
          <span className="block text-2xl md:text-3xl text-[#F15F79] mt-4 font-light">
            Innovación Educativa en Dermatología
          </span>
        </h1>
        
        <p className="text-xl text-[#082543]/80 max-w-3xl mx-auto leading-relaxed">
          Democratizando el acceso a herramientas dermatológicas de alta calidad 
          para <span className="font-semibold text-[#258CAB]">entornos de recursos limitados</span> 
          mediante inteligencia artificial especializada.
        </p>
      </div>

      <div className="space-y-12">
        {/* Misión Mejorada */}
        <section className="animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#F15F79]/10 rounded-full blur-2xl -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#258CAB]/10 rounded-full blur-2xl translate-x-16 translate-y-16"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#F15F79] to-[#4C2D4D] rounded-2xl flex items-center justify-center">
                  <FaRocket className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-[#082543] font-serif">Nuestra Misión</h2>
              </div>
              
              <div className="space-y-4 text-[#082543]/90 leading-relaxed text-lg">
                <p>
                  <strong className="text-[#082543]">DermApp</strong> nace de la necesidad crítica de 
                  democratizar el acceso a herramientas educativas dermatológicas de alta calidad en 
                  regiones con limitado acceso a especialistas.
                </p>
                <p>
                  Combinamos <span className="font-semibold text-[#258CAB]">inteligencia artificial de vanguardia</span> 
                  {' '}con una interfaz intuitiva para formar competencias en reconocimiento de 
                  patrones cutáneos, especialmente diseñada para contextos como la región altoandina 
                  de Puno.
                </p>
                <p>
                  Nuestro objetivo es <span className="font-semibold text-[#F15F79]">salvar distancias</span> 
                  {' '}y formar competencias mediante tecnología accesible, ética y educativa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tecnología Mejorada */}
        <section className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <div className="bg-gradient-to-br from-[#082543] to-[#4C2D4D] text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#F15F79]/20 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#258CAB]/20 rounded-full blur-3xl translate-y-16 -translate-x-16"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <FaAward className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold font-serif">Tecnología de Vanguardia</h2>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-6">
                {technologies.map((tech, index) => (
                  <div 
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 group hover:scale-105"
                  >
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      {tech.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{tech.name}</h3>
                    <p className="text-white/80 mb-4 leading-relaxed">
                      {tech.description}
                    </p>
                    <div className="space-y-2">
                      {tech.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2 text-white/70 text-sm">
                          <div className="w-1.5 h-1.5 bg-[#F15F79] rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Equipo Mejorado */}
        <section className="animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#258CAB] to-[#082543] rounded-2xl flex items-center justify-center">
                  <FaUsers className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-[#082543] font-serif">Equipo Multidisciplinario</h2>
              </div>
              <p className="text-[#082543]/70 text-lg max-w-2xl mx-auto">
                Combinamos experiencia médica, tecnológica y educativa para crear soluciones innovadoras
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="text-center p-6 bg-gradient-to-br from-white to-white/80 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-500 group hover:scale-105"
                >
                  <div className={`w-20 h-20 bg-gradient-to-r ${member.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <div className="text-white">
                      {member.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#082543] mb-2">{member.name}</h3>
                  <p className="text-[#258CAB] font-semibold mb-1">{member.role}</p>
                  <p className="text-[#082543]/70 mb-3">{member.specialty}</p>
                  <div className="inline-flex items-center space-x-1 px-3 py-1 bg-[#082543]/5 rounded-full">
                    <span className="text-[#082543]/60 text-sm">Experiencia:</span>
                    <span className="text-[#082543] font-semibold text-sm">{member.experience}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          <div className="bg-gradient-to-r from-[#258CAB]/10 to-[#082543]/5 rounded-3xl p-8 border border-[#258CAB]/20 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-[#082543] text-center mb-8 font-serif">
              Nuestros Valores
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: FaGlobeAmericas, title: "Accesibilidad", desc: "Para todos los contextos" },
                { icon: FaShieldAlt, title: "Privacidad", desc: "Datos 100% locales" },
                { icon: FaGraduationCap, title: "Educación", desc: "Enfoque formativo" },
                { icon: FaMobileAlt, title: "Innovación", desc: "Tecnología de punta" }
              ].map((value, index) => (
                <div key={index} className="text-center p-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#F15F79] to-[#258CAB] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="text-white text-xl" />
                  </div>
                  <h3 className="font-bold text-[#082543] mb-2">{value.title}</h3>
                  <p className="text-[#082543]/70 text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;