import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Diseases from './pages/Diseases';
import Prediction from './pages/Prediction';
import About from './pages/About';
import { FaTools, FaBookMedical } from 'react-icons/fa';
import './index.css'; // Cambiar esta línea

// Página placeholder "En desarrollo"
const EnDesarrollo = () => (
  <div className="w-full flex items-center justify-center py-16 px-6">
    <div className="mx-auto max-w-2xl bg-white/80 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl overflow-hidden text-center">
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
            className="px-6 py-3 rounded-xl font-semibold border-2 border-[#082543]/20 text-[#082543] bg-white/70 hover:bg-white transition-all flex items-center gap-2 justify-center"
          >
            <FaBookMedical className="w-4 h-4" />
            Ver catálogo educativo
          </Link>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/enfermedades" element={<Diseases />} />
          <Route path="/prediccion" element={<Prediction />} />
          <Route path="/nosotros" element={<About />} />

          {/* Ruta opcional para usar explícitamente el placeholder */}
          <Route path="/en-desarrollo" element={<EnDesarrollo />} />

          {/* Catch-all: cualquier ruta desconocida muestra "En desarrollo" */}
          <Route path="*" element={<EnDesarrollo />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
