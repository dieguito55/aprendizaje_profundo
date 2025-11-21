import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHeart, 
  FaBrain, 
  FaShieldAlt, 
  FaMobileAlt, 
  FaUserMd, 
  FaGraduationCap,
  FaGlobeAmericas,
  FaRocket,
  FaAward,
  FaUsers,
  FaLaptopCode,
  FaChevronDown,
  FaStar,
  FaCheckCircle,
  FaMicroscope,
  FaLightbulb,
  FaHandsHelping,
  FaChartLine,
  FaUniversity,
  FaLeaf,
  FaEye,
  FaBalanceScale
} from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const About = () => {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const impactStats = [
    { 
      number: "90%+", 
      label: "Precisión diagnóstica validada",
      icon: FaChartLine,
      color: "#A8D32C"
    },
    { 
      number: "100%", 
      label: "Privacidad de datos garantizada",
      icon: FaShieldAlt,
      color: "#A8D32C"
    },
    { 
      number: "24/7", 
      label: "Disponibilidad sin conexión",
      icon: FaMobileAlt,
      color: "#C5E86C"
    },
    { 
      number: "15+", 
      label: "Patologías dermatológicas",
      icon: FaMicroscope,
      color: "#A8D32C"
    }
  ];

  const technologies = [
    {
      name: "Deep Learning Médico",
      description: "Red neuronal convolucional MobileNetV2 especializada en clasificación de patrones dermatológicos con validación clínica",
      icon: FaBrain,
      features: [
        "Arquitectura optimizada para dispositivos móviles",
        "Transfer learning con dataset médico especializado",
        "Validación cruzada con casos clínicos reales"
      ],
      gradient: "from-[#A8D32C] to-[#A8D32C]"
    },
    {
      name: "Procesamiento Local Seguro",
      description: "Toda la inferencia se ejecuta localmente en el navegador mediante TensorFlow.js, garantizando privacidad absoluta",
      icon: FaShieldAlt,
      features: [
        "Sin transmisión de datos a servidores externos",
        "Cumplimiento total con normativas HIPAA y GDPR",
        "Funcionamiento offline completo"
      ],
      gradient: "from-[#A8D32C] to-[#A8D32C]"
    },
    {
      name: "Interfaz Profesional Adaptativa",
      description: "Diseño UX/UI centrado en el usuario con accesibilidad universal y experiencia fluida en cualquier dispositivo",
      icon: FaLaptopCode,
      features: [
        "Responsive design para todos los dispositivos",
        "Visualización 3D interactiva de resultados",
        "Navegación intuitiva y accesible"
      ],
      gradient: "from-[#C5E86C] to-[#A8D32C]"
    }
  ];

  const values = [
    { 
      icon: FaUniversity, 
      title: "Educación Médica", 
      desc: "Herramienta formativa para profesionales de la salud en regiones con recursos limitados",
      color: "#A8D32C"
    },
    { 
      icon: FaShieldAlt, 
      title: "Privacidad Total", 
      desc: "Procesamiento 100% local sin envío de datos sensibles a servidores externos",
      color: "#A8D32C"
    },
    { 
      icon: FaGlobeAmericas, 
      title: "Accesibilidad Universal", 
      desc: "Diseñada para funcionar en zonas remotas sin conexión a internet estable",
      color: "#C5E86C"
    },
    { 
      icon: FaHandsHelping, 
      title: "Impacto Social", 
      desc: "Democratización del conocimiento dermatológico en comunidades desatendidas",
      color: "#A8D32C"
    }
  ];

  const teamHighlights = [
    {
      icon: FaMicroscope,
      title: "Investigación Clínica",
      desc: "Validación con dermatólogos certificados y casos clínicos reales del Hospital Regional de Puno"
    },
    {
      icon: FaBrain,
      title: "Desarrollo IA",
      desc: "Arquitecturas de deep learning optimizadas con transfer learning y validación cruzada"
    },
    {
      icon: FaLeaf,
      title: "Sostenibilidad",
      desc: "Solución de bajo impacto computacional, funcionamiento en hardware limitado"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero Section - Compacto y Profesional */}
      <div className="relative bg-gradient-to-r from-[#A8D32C] to-[#8ab824] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&h=600&fit=crop" 
            alt="Medical background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8 md:pt-20 md:pb-12">
          <div className={`max-w-4xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center gap-3 mb-4">
              <FaHeart className="w-8 h-8" />
              <span className="text-sm font-semibold tracking-wider uppercase">Plataforma Médica Educativa</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              DermApp: Diagnóstico Dermatológico Inteligente
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mb-8">
              Herramienta de apoyo diagnóstico basada en inteligencia artificial para profesionales de la salud en regiones con acceso limitado a especialistas dermatológicos.
            </p>
          </div>

          {/* Stats Bar Inside Hero */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 relative z-10">
            {impactStats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-neutral-900 rounded-xl p-4 shadow-lg text-center hover:shadow-xl dark:shadow-neutral-900/50 transition-all duration-300 hover:scale-105"
              >
                <stat.icon className="w-6 h-6 mx-auto mb-2" style={{ color: stat.color }} />
                <p className="text-2xl font-bold mb-1" style={{ color: stat.color, fontFamily: 'Poppins, sans-serif' }}>
                  {stat.number}
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Mission Section - Compacto */}
        <section className="py-12 border-b border-neutral-100 dark:border-neutral-800">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#A8D32C' }}>
                  <FaRocket className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Nuestra Misión
                </h2>
              </div>

              <div className="space-y-4 text-neutral-700 dark:text-neutral-300">
                <p className="leading-relaxed">
                  DermApp democratiza el acceso a herramientas diagnósticas dermatológicas de calidad mediante inteligencia artificial, 
                  especialmente en regiones altoandinas con limitada presencia de especialistas.
                </p>
                
                <p className="leading-relaxed">
                  Nuestra plataforma combina <strong className="text-[#A8D32C]">deep learning especializado</strong> con una interfaz intuitiva, 
                  priorizando la privacidad del paciente mediante procesamiento completamente local.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#A8D32C]/10 text-[#A8D32C] rounded-lg text-sm font-medium">
                    <FaCheckCircle className="w-3.5 h-3.5" />
                    Validación Clínica
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#A8D32C]/10 text-[#A8D32C] rounded-lg text-sm font-medium">
                    <FaCheckCircle className="w-3.5 h-3.5" />
                    Procesamiento Local
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#A8D32C]/10 text-[#A8D32C] rounded-lg text-sm font-medium">
                    <FaCheckCircle className="w-3.5 h-3.5" />
                    Enfoque Educativo
                  </span>
                </div>
              </div>
            </div>

            <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop" 
                alt="Medical AI technology"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm font-semibold">Tecnología IA aplicada a la medicina dermatológica</p>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section - Compacto */}
        <section className="py-12 border-b border-neutral-100 dark:border-neutral-800">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Arquitectura Tecnológica
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 dark:text-neutral-500">Solución robusta, segura y accesible</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <div 
                key={index}
                className="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 hover:border-[#A8D32C] hover:shadow-lg dark:hover:shadow-neutral-900/50 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 bg-gradient-to-br ${tech.gradient}`}>
                  <tech.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {tech.name}
                </h3>

                <p className="text-sm text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 mb-4 leading-relaxed">
                  {tech.description}
                </p>

                <ul className="space-y-2">
                  {tech.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                      <div className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: '#A8D32C' }}></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section - Compacto */}
        <section className="py-12 border-b border-neutral-100 dark:border-neutral-800">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Principios Fundamentales
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 dark:text-neutral-500">Compromisos que guían nuestro desarrollo</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg dark:hover:shadow-neutral-900/50 transition-all duration-300 text-center"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: value.color }}
                >
                  <value.icon className="text-white text-xl" />
                </div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {value.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Highlights - Nuevo y Compacto */}
        <section className="py-12 border-b border-neutral-100 dark:border-neutral-800">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Áreas de Especialización
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 dark:text-neutral-500">Expertise multidisciplinario en salud digital</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {teamHighlights.map((highlight, index) => (
              <div 
                key={index}
                className="relative h-48 rounded-xl overflow-hidden group cursor-pointer"
              >
                <img 
                  src={
                    index === 0 
                      ? "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop"
                      : index === 1
                      ? "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop"
                      : "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop"
                  }
                  alt={highlight.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <highlight.icon className="w-8 h-8 text-white mb-2" />
                  <h3 className="text-white font-bold text-lg mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {highlight.title}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed">{highlight.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section - Compacto */}
        <section className="py-12">
          <div className="bg-gradient-to-r from-[#A8D32C] to-[#8ab824] rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=400&fit=crop" 
                alt="Medical technology"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-10">
              <FaLightbulb className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Transformando el Acceso a la Salud Dermatológica
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-6">
                Únase a nuestra misión de democratizar herramientas diagnósticas de alta calidad para profesionales de la salud.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/prediccion"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-neutral-900 text-[#A8D32C] rounded-lg font-semibold hover:shadow-xl dark:shadow-neutral-900/50 hover:scale-105 transition-all duration-300"
                >
                  <FaMicroscope className="w-4 h-4" />
                  Iniciar Diagnóstico
                </Link>
                <Link 
                  to="/enfermedades"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-neutral-900/10 backdrop-blur-sm text-white border border-white/30 rounded-lg font-semibold hover:bg-white dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:bg-neutral-900/20 transition-all duration-300"
                >
                  <FaGraduationCap className="w-4 h-4" />
                  Ver Patologías
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <section className="py-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
            <FaEye className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <p className="text-xs text-neutral-700 dark:text-neutral-300">
              <strong>Uso Educativo:</strong> Herramienta de apoyo. Consulte siempre con un dermatólogo certificado.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;