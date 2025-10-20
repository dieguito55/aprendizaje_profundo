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
  FaChartBar
} from "react-icons/fa";

const Prediction = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [predictions, setPredictions] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionTime, setPredictionTime] = useState(null);
  const { model, loading, error } = useModel();
  const canvasRef = useRef();

  const handlePrediction = async (imageElement) => {
    if (!model || isPredicting) return;
    
    setIsPredicting(true);
    setPredictions(null);
    setPredictionTime(null);
    
    const t0 = performance.now();
    try {
      const results = await predictComplete(model, imageElement, 3);
      setPredictions(results);
      setSelectedImage(imageElement);
      setPredictionTime((performance.now() - t0).toFixed(0));
    } catch (e) {
      console.error("Prediction error:", e);
      // Aquí podrías usar un toast o notificación más elegante
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
    { id: "upload", label: "Subir Imagen", icon: <FaUpload className="w-4 h-4" /> },
    { id: "webcam", label: "Cámara en Vivo", icon: <FaCamera className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header Mejorado */}
      <div className="text-center mb-12 animate-fadeInUp">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-[#F15F79] to-[#4C2D4D] rounded-2xl flex items-center justify-center shadow-2xl">
              <FaBrain className="text-white text-2xl" />
            </div>
            <div className="absolute -inset-3 bg-gradient-to-r from-[#F15F79] to-[#258CAB] rounded-2xl opacity-20 blur-lg"></div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#082543] mb-4 font-serif tracking-tight">
          Análisis en Tiempo Real
        </h1>
        <p className="text-xl text-[#082543]/80 max-w-3xl mx-auto leading-relaxed">
          Utiliza nuestra <span className="font-semibold text-[#258CAB]">inteligencia artificial especializada</span> 
          {' '}para analizar lesiones cutáneas con precisión médica educativa
        </p>
      </div>

      {/* Estado de Carga del Modelo */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 animate-pulse">
          <div className="relative mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-[#F15F79] to-[#258CAB] rounded-2xl animate-spin">
              <div className="absolute inset-2 bg-white rounded-xl"></div>
            </div>
            <FaSyncAlt className="w-6 h-6 text-[#082543] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-[#082543] mb-2">Cargando Modelo IA</h3>
          <p className="text-[#082543]/70 text-center max-w-md">
            Inicializando el sistema de análisis dermatológico...
          </p>
        </div>
      )}

      {/* Error del Modelo */}
      {error && (
        <div className="bg-gradient-to-r from-[#F15F79]/10 to-[#4C2D4D]/10 border border-[#F15F79]/30 rounded-3xl p-8 text-center backdrop-blur-sm">
          <div className="w-16 h-16 bg-gradient-to-r from-[#F15F79] to-[#4C2D4D] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaShieldAlt className="text-white text-xl" />
          </div>
          <h3 className="text-2xl font-bold text-[#082543] mb-3">Error de Carga</h3>
          <p className="text-[#082543]/80 mb-4">
            No se pudo cargar el modelo de inteligencia artificial. 
            Por favor, recargue la página o intente más tarde.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-[#F15F79] to-[#4C2D4D] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Reintentar Carga
          </button>
        </div>
      )}

      {/* Interfaz Principal de Predicción */}
      {!loading && !error && (
        <div className="grid lg:grid-cols-3 gap-8 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          
          {/* Panel Izquierdo - Controles */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Tabs Mejorados */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-2">
              <div className="flex space-x-1">
                {tabs.map(tab => (
                  <button 
                    key={tab.id} 
                    onClick={() => setActiveTab(tab.id)}
                    disabled={isPredicting}
                    className={`
                      flex-1 py-4 px-4 rounded-xl font-semibold transition-all duration-300
                      flex items-center justify-center space-x-2
                      ${activeTab === tab.id 
                        ? 'bg-gradient-to-r from-[#F15F79] to-[#4C2D4D] text-white shadow-lg transform scale-105' 
                        : 'text-[#082543]/70 hover:text-[#082543] hover:bg-[#082543]/5'
                      }
                      ${isPredicting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
                    `}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Panel de Carga/Captura */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 transition-all duration-300 hover:shadow-2xl">
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

            {/* Indicador de Tiempo de Análisis */}
            {predictionTime && (
              <div className="bg-gradient-to-r from-[#258CAB]/10 to-[#082543]/5 rounded-2xl p-4 border border-[#258CAB]/20 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-3 text-[#082543]">
                  <FaClock className="w-4 h-4 text-[#258CAB]" />
                  <div className="text-center">
                    <p className="font-semibold">Análisis Completado</p>
                    <p className="text-sm text-[#082543]/70">
                      Tiempo de procesamiento: <span className="font-bold text-[#258CAB]">{predictionTime}ms</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Panel de Resultados */}
            {predictions && !isPredicting && (
              <ResultsPanel 
                predictions={predictions} 
                onNewAnalysis={handleNewAnalysis}
              />
            )}
          </div>

          {/* Panel Central - Visualización 3D */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-6 h-[600px] relative overflow-hidden group hover:shadow-3xl transition-all duration-500">
              
              {/* Header del Visualizador */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#258CAB] to-[#082543] rounded-xl flex items-center justify-center">
                    <FaChartBar className="text-white w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#082543] font-serif">
                      Visualización 3D
                    </h3>
                    <p className="text-sm text-[#082543]/60">
                      Análisis espacial de probabilidades
                    </p>
                  </div>
                </div>
                
                {isPredicting && (
                  <div className="flex items-center space-x-2 px-3 py-1 bg-[#082543]/5 rounded-full">
                    <div className="w-2 h-2 bg-[#F15F79] rounded-full animate-pulse"></div>
                    <span className="text-sm text-[#082543]/70 font-medium">Procesando...</span>
                  </div>
                )}
              </div>

              {/* Contenedor 3D */}
              <div className="relative h-[500px] bg-gradient-to-br from-[#082543]/5 to-[#258CAB]/5 rounded-xl border border-[#082543]/10">
                <Prediction3D
                  probsVector={predictions?.vector}
                  topK={predictions}
                  selectedImage={selectedImage}
                  canvasRef={canvasRef}
                />
                
                {/* Estado Vacío Mejorado */}
                {!predictions && !isPredicting && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-[#082543]/40">
                    <FaRocket className="w-16 h-16 mb-4 opacity-30" />
                    <p className="text-lg font-semibold">Esperando análisis...</p>
                    <p className="text-sm mt-2">Suba una imagen o use la cámara para comenzar</p>
                  </div>
                )}

                {/* Overlay de Carga */}
                {isPredicting && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-xl">
                    <div className="text-center">
                      <div className="relative mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#F15F79] to-[#258CAB] rounded-2xl animate-spin">
                          <div className="absolute inset-2 bg-white rounded-lg"></div>
                        </div>
                        <FaBrain className="w-5 h-5 text-[#082543] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <p className="text-[#082543] font-semibold">Analizando imagen...</p>
                      <p className="text-[#082543]/60 text-sm mt-1">El modelo IA está procesando</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Información Educativa */}
      <div className="mt-12 bg-gradient-to-r from-[#082543]/5 to-[#258CAB]/5 rounded-3xl p-8 border border-[#082543]/10 backdrop-blur-sm">
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-[#082543] mb-4 font-serif">
            🎓 Propósito Educativo
          </h3>
          <p className="text-[#082543]/80 leading-relaxed text-lg">
            Esta herramienta de análisis utiliza inteligencia artificial con fines 
            <strong className="text-[#258CAB]"> exclusivamente educativos</strong>. 
            Los resultados no constituyen un diagnóstico médico. Para evaluación clínica 
            precisa, consulte siempre con un dermatólogo certificado.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Prediction;