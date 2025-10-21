// src/pages/Analizar.jsx
import React, { useEffect, useState } from 'react';
import {
  FaImages,
  FaUserMd,
  FaChevronDown,
  FaCheckCircle,
  FaTimes,
  FaClock,
  FaLayerGroup,
  FaBrain,
  FaShieldAlt
} from 'react-icons/fa';

const Analizar = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  // Paleta
  const colors = {
    primary: '#342B7C',
    secondary: '#8C7FE9',
    accent: '#C19CFF',
    light: '#FDEEFD',
    medium: '#D8DFF9'
  };

  // ---- Mock data ----
  // Finta de 4 para calificación (con nombres dermaX.png)
  const pendingImages = [
    { id: 'p1', disease: 'Melanoma',                percent: 0.82, qualified: false, img: '/derma1.png' },
    { id: 'p2', disease: 'Nevus atípico',           percent: 0.85, qualified: false, img: '/derma2.png' },
    { id: 'p3', disease: 'Queratosis seborreica',   percent: 0.90, qualified: false, img: '/derma3.png' },
    { id: 'p4', disease: 'Carcinoma basocelular',   percent: 0.92, qualified: false, img: '/derma4.png' }
  ];

  // Revisadas (aprobadas / rechazadas) con derma5+ y % dentro del 80-100
  const reviewedOK = [
    { id: 'ok1', disease: 'Melanoma',                percent: 0.91, img: '/derma5.png' },
    { id: 'ok2', disease: 'Carcinoma basocelular',   percent: 0.82, img: '/derma6.png' },
    { id: 'ok3', disease: 'Lesión actínica',         percent: 0.93, img: '/derma7.png' }
  ];
  const reviewedBad = [
    { id: 'bad1', disease: 'Nevus (artefactos)',     percent: 0.94, img: '/derma8.png' },
    { id: 'bad2', disease: 'Lesión borrosa',         percent: 0.86, img: '/derma9.png' }
  ];

  // Intervalo 80–100% aplicado a las secciones de “ya revisadas”
  const RANGE = { min: 0.8, max: 1.0 };
  const inRange = (p) => p >= RANGE.min && p <= RANGE.max;
  const reviewedOKFiltered = reviewedOK.filter(i => inRange(i.percent));
  const reviewedBadFiltered = reviewedBad.filter(i => inRange(i.percent));

  // Animaciones
  const animationClasses = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes float {
      0%,100% { transform: translateY(0); }
      50%     { transform: translateY(-10px); }
    }
    @keyframes pulse-glow {
      0%,100% { box-shadow: 0 0 5px ${colors.accent}40; }
      50%     { box-shadow: 0 0 20px ${colors.accent}80; }
    }
    .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
    .animate-float { animation: float 3s ease-in-out infinite; }
    .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
  `;

  return (
    <>
      <style>{animationClasses}</style>

      <div className="min-h-screen bg-gradient-to-br from-[#FDEEFD] via-[#D8DFF9] to-[#FDEEFD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Header / Hero */}
          <section className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-center mb-8 animate-float">
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-[#8C7FE9] to-[#342B7C] rounded-3xl flex items-center justify-center shadow-2xl animate-pulse-glow">
                  <FaImages className="text-white text-4xl" />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] rounded-3xl opacity-30 blur-xl animate-pulse" />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-[#342B7C] leading-tight">
              Analizar imágenes
              <span className="block text-2xl md:text-3xl text-[#8C7FE9] mt-4 font-light">
                Flujo de calificación y reentrenamiento
              </span>
            </h1>

            <p className="text-[#342B7C]/80 text-xl mt-6 max-w-3xl mx-auto">
              Revisión por dermatólogo con priorización por probabilidad y separación clara
              de material que <span className="font-semibold text-[#8C7FE9]">sirve para reentrenamiento</span> o que <span className="font-semibold text-[#C19CFF]">no cumple criterios</span>.
            </p>

            <div className="flex justify-center mt-8">
              <FaChevronDown className="text-[#342B7C] text-2xl animate-bounce" />
            </div>
          </section>

          <div className="space-y-16">
            {/* Sección 1: Imágenes para calificación (finta de 4) */}
            <section className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl border border-white/40 relative overflow-hidden">
                {/* Decoración */}
                <div className="absolute -top-16 -left-16 w-48 h-48 bg-[#8C7FE9]/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-[#C19CFF]/10 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#8C7FE9] to-[#342B7C] rounded-xl flex items-center justify-center shadow-lg">
                        <FaUserMd className="text-white w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#342B7C]">
                          Imágenes para calificación por dermatólogo
                        </h2>
                        <p className="text-[#342B7C]/60">Lote actual — 4 pendientes</p>
                      </div>
                    </div>

                    {/* Botón cambiado a “Calificar” */}
                    <div className="hidden sm:flex items-center space-x-2">
                      <span className="text-sm text-[#342B7C]/50">Acción</span>
                      <button
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] text-white font-semibold shadow-lg hover:shadow-xl transition"
                        type="button"
                      >
                        <FaCheckCircle className="inline-block mr-2 -mt-1" />
                        Calificar
                      </button>
                    </div>
                  </div>

                  {/* Grid de 4 tarjetas */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pendingImages.map((item) => (
                      <article
                        key={item.id}
                        className="
                          group relative overflow-hidden rounded-2xl
                          bg-white/70 backdrop-blur-sm border border-white/40
                          shadow-lg hover:shadow-2xl transition-all duration-300
                          hover:-translate-y-1
                        "
                      >
                        <div className="relative h-40 bg-[#000]">
                          <img
                            src={item.img}
                            alt={item.disease}
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition"
                          />
                          {/* Etiqueta probabilidad */}
                          <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md
                                          bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF]">
                            {(item.percent * 100).toFixed(0)}%
                          </div>
                        </div>

                        <div className="p-4 space-y-2">
                          <h3 className="font-bold text-[#342B7C] text-lg truncate">{item.disease}</h3>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[#342B7C]/60">Calificado</span>
                            <span
                              className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                                item.qualified
                                  ? 'bg-gradient-to-r from-[#34C759] to-[#258CAB] text-white'
                                  : 'bg-gradient-to-r from-[#FDEEFD] to-[#D8DFF9] text-[#342B7C]'
                              }`}
                            >
                              {item.qualified ? 'Sí' : 'No'}
                            </span>
                          </div>

                          {/* Barra de probabilidad */}
                          <div className="w-full bg-[#342B7C]/10 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-[#8C7FE9] to-[#342B7C]"
                              style={{ width: `${item.percent * 100}%` }}
                            />
                          </div>

                          {/* Chips info */}
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2 text-[#342B7C]/60">
                              <FaBrain className="w-3 h-3" />
                              <span>Modelo</span>
                            </div>
                            <div className="flex items-center space-x-2 text-[#342B7C]/60">
                              <FaShieldAlt className="w-3 h-3" />
                              <span>Privado</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Intervalo 80-100 debajo de esas imágenes */}
                  <div className="mt-6 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full text-sm font-semibold text-[#342B7C] bg-gradient-to-r from-[#FDEEFD] to-[#D8DFF9] border border-[#8C7FE9]/20">
                      Intervalo de probabilidad activo para revisadas: <strong className="ml-1">80% – 100%</strong>
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección 2: Ya revisadas — Cumple / No cumple (filtradas por 80–100) */}
            <section className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl border border-white/40 relative overflow-hidden">
                <div className="absolute -top-24 right-0 w-64 h-64 bg-[#8C7FE9]/10 rounded-full blur-3xl translate-x-16" />
                <div className="relative z-10 space-y-10">

                  {/* Cumple para reentrenamiento */}
                  <div>
                    <div className="flex items-center space-x-3 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#34C759] to-[#258CAB] text-white flex items-center justify-center shadow-lg">
                        <FaCheckCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#342B7C]">Cumple para reentrenamiento</h3>
                        <p className="text-[#342B7C]/60">Imágenes validadas por dermatólogo (filtradas 80–100%)</p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {reviewedOKFiltered.map((item) => (
                        <article
                          key={item.id}
                          className="group rounded-2xl overflow-hidden bg-white/70 border border-white/40 shadow-lg hover:shadow-2xl transition"
                        >
                          <div className="relative h-44">
                            <img src={item.img} alt={item.disease} className="w-full h-full object-cover" />
                            <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md bg-gradient-to-r from-[#34C759] to-[#258CAB]">
                              Aprobada
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-[#342B7C]">{item.disease}</h4>
                              <span className="text-sm px-2 py-1 rounded-lg bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] text-white font-semibold">
                                {(item.percent * 100).toFixed(0)}%
                              </span>
                            </div>
                            <div className="mt-3 w-full bg-[#342B7C]/10 rounded-full h-2 overflow-hidden">
                              <div
                                className="h-2 rounded-full bg-gradient-to-r from-[#34C759] to-[#258CAB]"
                                style={{ width: `${item.percent * 100}%` }}
                              />
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>

                  {/* No cumple */}
                  <div>
                    <div className="flex items-center space-x-3 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#F15F79] to-[#C19CFF] text-white flex items-center justify-center shadow-lg">
                        <FaTimes className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#342B7C]">No cumple</h3>
                        <p className="text-[#342B7C]/60">Criterios insuficientes (filtradas 80–100%)</p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {reviewedBadFiltered.map((item) => (
                        <article
                          key={item.id}
                          className="group rounded-2xl overflow-hidden bg-white/70 border border-white/40 shadow-lg hover:shadow-2xl transition"
                        >
                          <div className="relative h-44">
                            <img src={item.img} alt={item.disease} className="w-full h-full object-cover" />
                            <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md bg-gradient-to-r from-[#F15F79] to-[#C19CFF]">
                              Rechazada
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-[#342B7C]">{item.disease}</h4>
                              <span className="text-sm px-2 py-1 rounded-lg bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] text-white font-semibold">
                                {(item.percent * 100).toFixed(0)}%
                              </span>
                            </div>
                            <div className="mt-3 w-full bg-[#342B7C]/10 rounded-full h-2 overflow-hidden">
                              <div
                                className="h-2 rounded-full bg-gradient-to-r from-[#F15F79] to-[#C19CFF]"
                                style={{ width: `${item.percent * 100}%` }}
                              />
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>

                  {/* Resumen / CTA inferior */}
                  <div className="mt-4 grid md:grid-cols-3 gap-4">
                    <div className="rounded-2xl p-4 bg-gradient-to-br from-[#FDEEFD] to-[#D8DFF9] border border-[#8C7FE9]/20">
                      <div className="flex items-center space-x-3 text-[#342B7C]">
                        <FaClock className="w-5 h-5" />
                        <div>
                          <p className="text-sm text-[#342B7C]/70">Pendientes</p>
                          <p className="font-bold text-lg">{pendingImages.length}</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl p-4 bg-gradient-to-br from-[#34C759]/10 to-[#258CAB]/10 border border-[#34C759]/30">
                      <div className="flex items-center space-x-3 text-[#2a7d3a]">
                        <FaCheckCircle className="w-5 h-5" />
                        <div>
                          <p className="text-sm text-[#2a7d3a]/80">Aprobadas</p>
                          <p className="font-bold text-lg">{reviewedOKFiltered.length}</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl p-4 bg-gradient-to-br from-[#F15F79]/10 to-[#C19CFF]/10 border border-[#F15F79]/30">
                      <div className="flex items-center space-x-3 text-[#a43b50]">
                        <FaTimes className="w-5 h-5" />
                        <div>
                          <p className="text-sm text-[#a43b50]/80">Rechazadas</p>
                          <p className="font-bold text-lg">{reviewedBadFiltered.length}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </div>

          {/* Pie informativo */}
          <div className="mt-12 text-center text-[#342B7C]/60 text-sm">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/60 border border-white/40 backdrop-blur-sm">
              <FaLayerGroup className="w-4 h-4" />
              <span>
                Este módulo es <strong className="text-[#342B7C]">educativo</strong> y simula un flujo real de revisión para reentrenamiento del modelo.
              </span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Analizar;
