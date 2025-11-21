import React, { useState, useRef } from "react";
import ImageUpload from "../components/prediction/ImageUpload";
import WebcamCapture from "../components/prediction/WebcamCapture";
import Prediction3D from "../components/prediction/Prediction3D";
import ResultsPanel from "../components/prediction/ResultsPanel";
import ModelInfo from "../components/prediction/ModelInfo";
import AnalysisHistory from "../components/prediction/AnalysisHistory";
import Statistics from "../components/prediction/Statistics";
import { useModel } from "../hooks/useModel";
import { predictComplete } from "../lib/model";
import { 
  FaUpload, 
  FaCamera, 
  FaBrain, 
  FaClock, 
  FaSyncAlt, 
  FaShieldAlt,
  FaChartBar,
  FaCogs,
  FaUserMd,
  FaMicroscope,
  FaHome,
  FaChevronRight,
  FaExclamationTriangle,
  FaCheckCircle,
  FaLightbulb
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Prediction = () => {
    const [activeTab, setActiveTab] = useState("upload");
  const [activeSection, setActiveSection] = useState("predict"); // predict, history, stats, model
  const [predictions, setPredictions] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionTime, setPredictionTime] = useState(null);
  const { model, labels, version, loading, error } = useModel();
  const canvasRef = useRef();

  // Guardar análisis en historial
  const saveToHistory = (results, imageElement, processingTime) => {
    try {
      const historyItem = {
        id: Date.now(),
        timestamp: Date.now(),
        diagnosis: results[0]?.className || 'Desconocido',
        confidence: (results[0]?.probability * 100).toFixed(1),
        processingTime: processingTime,
        image: imageElement?.src || null,
        alternatives: results.slice(1, 3).map(r => ({
          name: r.className,
          confidence: (r.probability * 100).toFixed(1)
        }))
      };

      const existingHistory = JSON.parse(localStorage.getItem('dermapp_history') || '[]');
      const updatedHistory = [historyItem, ...existingHistory].slice(0, 50); // Mantener solo últimos 50
      localStorage.setItem('dermapp_history', JSON.stringify(updatedHistory));
    } catch (e) {
      console.error('Error saving to history:', e);
    }
  };

  const handlePrediction = async (imageElement) => {
    if (!imageElement) {
      // Si recibe null, resetear el análisis
      handleNewAnalysis();
      return;
    }
    if (!model || isPredicting) return;
    setIsPredicting(true);
    setPredictions(null);
    setPredictionTime(null);
    const t0 = performance.now();
    try {
      const results = await predictComplete(model, imageElement, 3, labels);
      const time = (performance.now() - t0).toFixed(0);
      setPredictions(results);
      setSelectedImage(imageElement);
      setPredictionTime(time);
      
      // Guardar en historial
      saveToHistory(results, imageElement, time);
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

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-6 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="flex items-center space-x-2 text-[#A8D32C] hover:text-[#A8D32C] transition-colors">
              <FaHome className="w-4 h-4" />
              <span className="font-semibold">Inicio</span>
            </Link>
            <FaChevronRight className="w-3 h-3 text-neutral-400 dark:text-neutral-500" />
            <span className="text-neutral-900 dark:text-white font-semibold">Diagnóstico IA</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-xl dark:shadow-neutral-900/50" style={{ backgroundColor: '#A8D32C' }}>
              <FaMicroscope className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-white leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Sistema de Diagnóstico con IA
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 mt-1 text-base">
                Análisis dermatológico profesional con inteligencia artificial • Resultados en tiempo real
              </p>
            </div>
            {!loading && !error && (
              <div className="hidden md:flex items-center gap-3 bg-white dark:bg-neutral-900 rounded-lg border-2 px-4 py-3 shadow-sm" style={{ borderColor: '#A8D32C' }}>
                <div className="w-2.5 h-2.5 rounded-full bg-[#A8D32C] animate-pulse"></div>
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 font-semibold uppercase tracking-wide">Modelo Activo</p>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">{version}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Estado de Carga */}
        {loading && (
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-12 shadow-lg border border-neutral-200 dark:border-neutral-700 text-center">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 rounded-xl animate-spin" style={{ backgroundColor: '#A8D32C' }}>
                <div className="absolute inset-3 bg-white dark:bg-neutral-900 rounded-lg"></div>
              </div>
              <FaSyncAlt className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-[#A8D32C] animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Inicializando Sistema IA
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 dark:text-neutral-500">Cargando modelo especializado en dermatología...</p>
          </div>
        )}

        {/* Error del Modelo */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 bg-red-500">
              <FaShieldAlt className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Error de Inicialización
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-6">
              No se pudo cargar el modelo de inteligencia artificial. Por favor, recargue la página.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-200 shadow-lg"
            >
              Reintentar Carga
            </button>
          </div>
        )}

        {/* Interfaz Principal */}
        {!loading && !error && (
          <div className="space-y-6">
            {/* Navegación por secciones */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm p-2">
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => setActiveSection("predict")}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    activeSection === "predict"
                      ? "text-white shadow-lg"
                      : "text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 hover:bg-neutral-50 dark:bg-neutral-900"
                  }`}
                  style={activeSection === "predict" ? { backgroundColor: '#A8D32C' } : {}}
                >
                  <FaMicroscope className="w-4 h-4" />
                  <span className="hidden sm:inline">Diagnóstico</span>
                </button>
                <button
                  onClick={() => setActiveSection("history")}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    activeSection === "history"
                      ? "text-white shadow-lg"
                      : "text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 hover:bg-neutral-50 dark:bg-neutral-900"
                  }`}
                  style={activeSection === "history" ? { backgroundColor: '#A8D32C' } : {}}
                >
                  <FaClock className="w-4 h-4" />
                  <span className="hidden sm:inline">Historial</span>
                </button>
                <button
                  onClick={() => setActiveSection("stats")}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    activeSection === "stats"
                      ? "text-white shadow-lg"
                      : "text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 hover:bg-neutral-50 dark:bg-neutral-900"
                  }`}
                  style={activeSection === "stats" ? { backgroundColor: '#A8D32C' } : {}}
                >
                  <FaChartBar className="w-4 h-4" />
                  <span className="hidden sm:inline">Estadísticas</span>
                </button>
                <button
                  onClick={() => setActiveSection("model")}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    activeSection === "model"
                      ? "text-white shadow-lg"
                      : "text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 hover:bg-neutral-50 dark:bg-neutral-900"
                  }`}
                  style={activeSection === "model" ? { backgroundColor: '#A8D32C' } : {}}
                >
                  <FaBrain className="w-4 h-4" />
                  <span className="hidden sm:inline">Modelo IA</span>
                </button>
              </div>
            </div>

            {/* Sección de Diagnóstico */}
            {activeSection === "predict" && (
              <>
            {/* Tabs para Upload/Webcam */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
              <div className="flex border-b border-neutral-200 dark:border-neutral-700">
                <button
                  onClick={() => setActiveTab("upload")}
                  disabled={isPredicting}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold transition-all duration-200 ${
                    activeTab === "upload"
                      ? "border-b-3 text-neutral-900 dark:text-white"
                      : "text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:bg-neutral-900"
                  } ${isPredicting ? "opacity-50 cursor-not-allowed" : ""}`}
                  style={activeTab === "upload" ? { borderBottomColor: '#A8D32C', borderBottomWidth: '3px' } : {}}
                >
                  <FaUpload className="w-4 h-4" />
                  <span>Subir Imagen</span>
                </button>
                
                <button
                  onClick={() => setActiveTab("webcam")}
                  disabled={isPredicting}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold transition-all duration-200 ${
                    activeTab === "webcam"
                      ? "border-b-3 text-neutral-900 dark:text-white"
                      : "text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:bg-neutral-900"
                  } ${isPredicting ? "opacity-50 cursor-not-allowed" : ""}`}
                  style={activeTab === "webcam" ? { borderBottomColor: '#A8D32C', borderBottomWidth: '3px' } : {}}
                >
                  <FaCamera className="w-4 h-4" />
                  <span>Cámara en Vivo</span>
                </button>
              </div>
            </div>

            {/* Layout de 2 columnas */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Columna Izquierda: Upload/Webcam */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm p-6">
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

                {/* Información sobre el análisis */}
                <div className="bg-[#A8D32C]/10 rounded-xl p-5 border-2" style={{ borderColor: '#A8D32C' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#A8D32C' }}>
                      <FaLightbulb className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 dark:text-white text-base mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Recomendaciones para el Análisis
                      </h3>
                      <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                        <li>✓ Imagen clara y bien iluminada</li>
                        <li>✓ Lesión enfocada en el centro</li>
                        <li>✓ Formato JPG, PNG o WebP (máx. 10MB)</li>
                        <li>✓ Resolución mínima recomendada: 224x224px</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Resultados */}
              <div className="space-y-6">
                {/* Tiempo de procesamiento */}
                {predictionTime && (
                  <div className="bg-white dark:bg-neutral-900 rounded-xl p-5 border-2 border-[#C5E86C] shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#A8D32C] flex items-center justify-center">
                        <FaCheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-neutral-900 dark:text-white text-base">Análisis Completado</p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 dark:text-neutral-500">
                          Procesado en <span className="font-bold" style={{ color: '#A8D32C' }}>{predictionTime}ms</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Panel de Resultados */}
                {predictions && !isPredicting && (
                  <ResultsPanel 
                    predictions={predictions}
                    selectedImage={selectedImage}
                    rois={predictions?.rois}
                    onNewAnalysis={handleNewAnalysis}
                  />
                )}

                {/* Estado Analizando */}
                {isPredicting && (
                  <div className="bg-white dark:bg-neutral-900 rounded-xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-sm text-center">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-xl animate-spin" style={{ backgroundColor: '#A8D32C' }}>
                        <div className="absolute inset-3 bg-white dark:bg-neutral-900 rounded-lg"></div>
                      </div>
                      <FaBrain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-[#A8D32C]" />
                    </div>
                    <p className="text-neutral-900 dark:text-white font-bold text-lg mb-1">Analizando Imagen</p>
                    <p className="text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 text-sm">Procesando patrones dermatológicos...</p>
                  </div>
                )}

                {/* Estado vacío */}
                {!predictions && !isPredicting && (
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-12 border-2 border-dashed border-neutral-300 text-center">
                    <FaBrain className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                    <p className="text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 font-semibold">Esperando imagen para análisis</p>
                    <p className="text-neutral-400 dark:text-neutral-500 text-sm mt-2">Suba o capture una imagen para comenzar</p>
                  </div>
                )}
              </div>
            </div>

            {/* Visualización 3D */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#A8D32C' }}>
                  <FaChartBar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Visualización 3D de Probabilidades
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 dark:text-neutral-500">
                    Representación espacial del análisis del modelo IA
                  </p>
                </div>
              </div>

              <div className="relative h-[450px] bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700">
                <Prediction3D
                  probsVector={predictions?.vector}
                  topK={predictions}
                  selectedImage={selectedImage}
                  canvasRef={canvasRef}
                />
                
                {!predictions && !isPredicting && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-500">
                    <FaChartBar className="w-16 h-16 mb-4 opacity-30" />
                    <p className="text-lg font-semibold">Visualización 3D</p>
                    <p className="text-sm mt-2">Realice un análisis para ver los resultados</p>
                  </div>
                )}

                {isPredicting && (
                  <div className="absolute inset-0 bg-white dark:bg-neutral-900/90 backdrop-blur-sm flex items-center justify-center rounded-xl">
                    <div className="text-center">
                      <div className="relative w-12 h-12 mx-auto mb-4">
                        <div className="absolute inset-0 rounded-xl animate-spin" style={{ backgroundColor: '#A8D32C' }}>
                          <div className="absolute inset-2 bg-white dark:bg-neutral-900 rounded-lg"></div>
                        </div>
                      </div>
                      <p className="text-neutral-900 dark:text-white font-semibold">Generando visualización 3D...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Disclaimer Educativo */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
                  <FaExclamationTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 dark:text-white text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Propósito Exclusivamente Educativo
                  </h3>
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                    Esta herramienta de análisis utiliza inteligencia artificial con fines <strong>exclusivamente educativos</strong>. 
                    Los resultados no constituyen un diagnóstico médico profesional. Siempre consulte con un dermatólogo 
                    certificado para cualquier preocupación sobre lesiones cutáneas.
                  </p>
                </div>
              </div>
            </div>
              </>
            )}

            {/* Sección de Historial */}
            {activeSection === "history" && <AnalysisHistory />}

            {/* Sección de Estadísticas */}
            {activeSection === "stats" && <Statistics />}

            {/* Sección de Información del Modelo */}
            {activeSection === "model" && <ModelInfo version={version} loading={loading} error={error} labels={labels} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Prediction;
