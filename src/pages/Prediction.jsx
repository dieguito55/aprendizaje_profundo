import React, { useState, useRef } from "react";
import ImageUpload from "../components/prediction/ImageUpload";
import WebcamCapture from "../components/prediction/WebcamCapture";
import Prediction3D from "../components/prediction/Prediction3D";
import ResultsPanel from "../components/prediction/ResultsPanel";
import { useModel } from "../hooks/useModel";
import { predictComplete } from "../lib/model";
import { 
  FaUpload, 
  FaCamera, 
  FaBrain, 
  FaClock, 
  FaSyncAlt, 
  FaRocket,
  FaShieldAlt,
  FaChartBar,
  FaCogs,
  FaUserMd
} from "react-icons/fa";

const Prediction = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [predictions, setPredictions] = useState(null);   // array + .vector + .rois
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionTime, setPredictionTime] = useState(null);
  const { model, labels, version, loading, error } = useModel();
  const canvasRef = useRef();

  const handlePrediction = async (imageElement) => {
    if (!model || isPredicting) return;
    setIsPredicting(true);
    setPredictions(null);
    setPredictionTime(null);
    const t0 = performance.now();
    try {
      const results = await predictComplete(model, imageElement, 3, labels);
      setPredictions(results);             // results = topK array con props .vector y .rois
      setSelectedImage(imageElement);
      setPredictionTime((performance.now() - t0).toFixed(0));
    } catch (e) {
      console.error("Prediction error:", e);
      alert("Error al procesar la imagen. Por favor, intente con otra imagen.");
    } finally {
      setIsPredicting(false);
    }
  };

  const handleNewAnalysis = () => {
    setPredictions(null);
    setSelectedImage(null);
    setPredictionTime(null);
  };

  const tabs = [
    { id: "upload", label: "Subir Imagen", icon: <FaUpload className="w-4 h-4" />, gradient: "from-[#342B7C] to-[#8C7FE9]" },
    { id: "webcam", label: "Cámara en Vivo", icon: <FaCamera className="w-4 h-4" />, gradient: "from-[#8C7FE9] to-[#C19CFF]" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Premium */}
      <div className="text-center mb-12 animate-fadeInUp">
        <div className="flex justify-center mb-6">
          <div className="relative group">
            <div className="
              w-20 h-20 
              bg-gradient-to-br from-[#342B7C] to-[#8C7FE9] 
              rounded-3xl 
              flex items-center justify-center 
              shadow-2xl 
              group-hover:shadow-3xl
              transition-all duration-500
              group-hover:scale-110
            ">
              <FaBrain className="text-white text-2xl transform group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="absolute -inset-3 bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-[#342B7C] mb-4 font-sans tracking-tight">
          Análisis Dermatológico IA
        </h1>
        <p className="text-xl text-[#342B7C]/80 max-w-3xl mx-auto leading-relaxed font-light mb-4">
          Utiliza nuestra <span className="font-semibold text-[#8C7FE9]">inteligencia artificial especializada</span> para analizar lesiones cutáneas con precisión médica educativa.
        </p>

        {/* Indicador de Modelo */}
        <div className="
          inline-flex items-center space-x-3 
          bg-white/80 backdrop-blur-xl 
          px-5 py-2 
          rounded-2xl 
          shadow-lg 
          border border-white/40
        ">
          <div className="w-8 h-8 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] rounded-xl flex items-center justify-center">
            <FaCogs className="text-white w-3 h-3" />
          </div>
          <div className="text-left">
            <p className="text-xs text-[#342B7C]/70 font-medium">Modelo activo</p>
            <p className="text-[#342B7C] font-bold text-sm">{version}</p>
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Estado de Carga del Modelo */}
      {loading && (
        <div className="
          flex flex-col items-center justify-center 
          py-20 
          bg-white/90 backdrop-blur-xl 
          rounded-3xl 
          shadow-2xl 
          border border-white/40
          animate-pulse-slow
        ">
          <div className="relative mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] rounded-2xl animate-spin">
              <div className="absolute inset-3 bg-white rounded-xl"></div>
            </div>
            <FaSyncAlt className="w-6 h-6 text-[#8C7FE9] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-[#342B7C] mb-2">Inicializando Sistema IA</h3>
          <p className="text-[#342B7C]/70 text-center max-w-md">
            Cargando modelo especializado en dermatología...
          </p>
        </div>
      )}

      {/* Error del Modelo */}
      {error && (
        <div className="
          bg-gradient-to-br from-[#FDEEFD] to-[#D8DFF9]
          border border-[#F15F79]/30 
          rounded-3xl p-8 
          text-center 
          backdrop-blur-xl
          shadow-2xl
          animate-fadeInUp
        ">
          <div className="w-16 h-16 bg-gradient-to-r from-[#F15F79] to-[#C19CFF] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FaShieldAlt className="text-white text-xl" />
          </div>
          <h3 className="text-2xl font-bold text-[#342B7C] mb-4">Error de Inicialización</h3>
          <p className="text-[#342B7C]/80 text-lg mb-6 max-w-2xl mx-auto">
            No se pudo cargar el modelo de inteligencia artificial.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="
              bg-gradient-to-r from-[#F15F79] to-[#C19CFF]
              text-white px-6 py-3 
              rounded-2xl 
              font-semibold
              shadow-lg hover:shadow-xl
              transition-all duration-300
            "
          >
            Reintentar Carga
          </button>
        </div>
      )}

      {/* Interfaz Principal */}
      {!loading && !error && (
        <div className="space-y-8 animate-fadeInUp">
          
          {/* Sección 1: Controles de Entrada */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Panel de Tabs y Carga */}
            <div className="space-y-6">
              {/* Tabs */}
              <div className="
                bg-white/90 backdrop-blur-xl 
                rounded-3xl 
                shadow-2xl 
                border border-white/40
                p-4
              ">
                <div className="flex space-x-2">
                  {tabs.map(tab => (
                    <button 
                      key={tab.id} 
                      onClick={() => setActiveTab(tab.id)}
                      disabled={isPredicting}
                      className={`
                        flex-1 py-4 px-4 rounded-2xl font-semibold transition-all duration-300
                        flex items-center justify-center space-x-2
                        ${activeTab === tab.id 
                          ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg` 
                          : 'text-[#342B7C]/70 hover:text-[#342B7C] hover:bg-white/50'
                        }
                        ${isPredicting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
                      `}
                    >
                      {tab.icon}
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Panel de Carga/Captura */}
              <div className="
                bg-white/90 backdrop-blur-xl 
                rounded-3xl 
                shadow-2xl 
                border border-white/40 
                p-6
              ">
                {activeTab === "upload" ? (
                  <ImageUpload 
                    onImageSelect={handlePrediction} 
                    disabled={isPredicting}
                  />
                ) : (
                  <WebcamCapture 
                    onCapture={handlePrediction} 
                    disabled={isPredicting}
                  />
                )}
              </div>
            </div>

            {/* Panel de Resultados y Tiempo */}
            <div className="space-y-6">
              {/* Indicador de Tiempo */}
              {predictionTime && (
                <div className="
                  bg-gradient-to-r from-[#FDEEFD] to-[#D8DFF9]
                  rounded-2xl p-5 
                  border border-[#8C7FE9]/20 
                  backdrop-blur-sm
                  shadow-lg
                ">
                  <div className="flex items-center space-x-4 text-[#342B7C]">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#258CAB] to-[#8C7FE9] rounded-xl flex items-center justify-center shadow-lg">
                      <FaClock className="text-white w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-lg">Análisis Completado</p>
                      <p className="text-sm text-[#342B7C]/70">
                        Procesado en <span className="font-bold text-[#258CAB]">{predictionTime}ms</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Panel de Resultados */}
              {predictions && !isPredicting && (
                <ResultsPanel 
                  predictions={predictions}
                  selectedImage={selectedImage} // <- necesario para mostrar la imagen
                  rois={predictions?.rois}      // <- array de ROIs del modelo
                  onNewAnalysis={handleNewAnalysis}
                />
              )}

              {/* Estado de Análisis */}
              {isPredicting && (
                <div className="
                  bg-white/90 backdrop-blur-xl 
                  rounded-2xl p-6 
                  shadow-lg 
                  border border-white/40
                  text-center
                ">
                  <div className="relative mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] rounded-2xl animate-spin mx-auto">
                      <div className="absolute inset-2 bg-white rounded-lg"></div>
                    </div>
                    <FaBrain className="w-5 h-5 text-[#8C7FE9] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <p className="text-[#342B7C] font-semibold">Analizando imagen...</p>
                  <p className="text-[#342B7C]/60 text-sm mt-1">Procesando patrones dermatológicos</p>
                </div>
              )}
            </div>
          </div>

          {/* Sección 2: Visualización 3D */}
          <div className="
            bg-white/90 backdrop-blur-xl 
            rounded-3xl 
            shadow-2xl 
            border border-white/40 
            p-6
          ">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] rounded-xl flex items-center justify-center">
                  <FaChartBar className="text-white w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#342B7C]">
                    Visualización 3D de Resultados
                  </h3>
                  <p className="text-sm text-[#342B7C]/60">
                    Análisis espacial de probabilidades del modelo IA
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[500px] bg-gradient-to-br from-[#FDEEFD] to-[#D8DFF9] rounded-xl border border-[#8C7FE9]/20 shadow-inner">
              <Prediction3D
                probsVector={predictions?.vector}
                topK={predictions}
                selectedImage={selectedImage}
                canvasRef={canvasRef}
              />
              
              {!predictions && !isPredicting && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#342B7C]/40">
                  <FaRocket className="w-16 h-16 mb-4 opacity-30" />
                  <p className="text-lg font-semibold">Visualización 3D</p>
                  <p className="text-sm mt-2">Realice un análisis para ver los resultados en 3D</p>
                </div>
              )}

              {isPredicting && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-xl">
                  <div className="text-center">
                    <div className="relative mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] rounded-2xl animate-spin">
                        <div className="absolute inset-2 bg-white rounded-lg"></div>
                      </div>
                    </div>
                    <p className="text-[#342B7C] font-semibold">Generando visualización 3D...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Información Educativa */}
      <div className="mt-12 
        bg-gradient-to-r from-[#FDEEFD] to-[#D8DFF9] 
        rounded-3xl p-8 
        border border-[#8C7FE9]/20 
        backdrop-blur-xl
        shadow-2xl
      ">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] rounded-xl flex items-center justify-center">
              <FaUserMd className="text-white text-lg" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[#342B7C] mb-4">
            🎓 Propósito Educativo
          </h3>
          <p className="text-[#342B7C]/80 leading-relaxed">
            Esta herramienta de análisis utiliza inteligencia artificial con fines <strong className="text-[#8C7FE9]">exclusivamente educativos</strong>. 
            Los resultados no constituyen un diagnóstico médico.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp { from {opacity:0; transform: translateY(30px);} to {opacity:1; transform: translateY(0);} }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
        @keyframes pulse-slow { 0%,100% {opacity:1} 50% {opacity:.8} }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Prediction;
