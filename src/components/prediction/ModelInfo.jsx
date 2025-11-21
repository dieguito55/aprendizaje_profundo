import React, { useState, useEffect } from 'react';
import { 
  FaBrain, 
  FaDatabase, 
  FaClock, 
  FaChartLine,
  FaMicrochip,
  FaShieldAlt,
  FaCheckCircle,
  FaCog,
  FaNetworkWired,
  FaLayerGroup,
  FaRocket,
  FaAward
} from 'react-icons/fa';

const ModelInfo = ({ version, loading, error, labels }) => {
  const [realtimeStats, setRealtimeStats] = useState({
    totalPredictions: 0,
    avgInferenceTime: 0,
    lastPrediction: null
  });

  useEffect(() => {
    // Actualizar estadísticas en tiempo real
    const updateStats = () => {
      try {
        const history = JSON.parse(localStorage.getItem('dermapp_history') || '[]');
        
        if (history.length > 0) {
          const avgTime = history.reduce((sum, item) => 
            sum + parseFloat(item.processingTime || 0), 0) / history.length;
          
          setRealtimeStats({
            totalPredictions: history.length,
            avgInferenceTime: Math.round(avgTime),
            lastPrediction: history[0]?.timestamp || null
          });
        }
      } catch (e) {
        console.error('Error updating realtime stats:', e);
      }
    };

    updateStats();
    const interval = setInterval(updateStats, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading || error) return null;

  // Calcular información del modelo
  const numClasses = labels?.length || 23;
  const modelVersion = version || 'v1.0';
  
  const modelSpecs = {
    architecture: 'MobileNetV2',
    classes: numClasses,
    accuracy: '94.5%',
    inputSize: '224×224',
    framework: 'TensorFlow.js',
    backend: 'WebGL',
    parameters: '~3.5M',
    lastUpdate: 'Noviembre 2024',
    trainingDataset: 'HAM10000 + ISIC',
    inferenceTime: realtimeStats.avgInferenceTime > 0 
      ? `~${realtimeStats.avgInferenceTime}ms` 
      : '~200-400ms',
    totalPredictions: realtimeStats.totalPredictions
  };

  return (
    <div className="space-y-6">
      {/* Header Principal */}
      <div className="bg-gradient-to-br from-white to-neutral-50 rounded-2xl border-2 shadow-xl dark:shadow-neutral-900/50 overflow-hidden" 
           style={{ borderColor: '#A8D32C' }}>
        <div className="relative bg-white dark:bg-neutral-900 p-8 border-b-2" style={{ borderColor: '#A8D32C' }}>
          <div className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none">
            <FaBrain className="w-full h-full" style={{ color: '#A8D32C' }} />
          </div>
          
          <div className="relative flex items-start gap-5">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl dark:shadow-neutral-900/50 transform hover:rotate-12 transition-transform" 
                 style={{ backgroundColor: '#A8D32C' }}>
              <FaBrain className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Modelo de Inteligencia Artificial
                </h2>
                <div className="px-3 py-1 bg-[#C5E86C]/20 rounded-full flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#A8D32C]/100 animate-pulse"></div>
                  <span className="text-xs font-bold text-[#8ab824]">ACTIVO</span>
                </div>
              </div>
              <p className="text-base text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 font-medium mb-4">
                Sistema especializado en diagnóstico dermatológico mediante deep learning
              </p>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 font-semibold">Versión Actual</p>
                  <p className="text-lg font-bold text-blue-700">{modelVersion}</p>
                </div>
                <div className="px-4 py-2 bg-[#E8F5D0] rounded-lg border border-[#C5E86C]/40">
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 font-semibold">Precisión</p>
                  <p className="text-lg font-bold text-[#6d9419]">{modelSpecs.accuracy}</p>
                </div>
                <div className="px-4 py-2 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 font-semibold">Clases</p>
                  <p className="text-lg font-bold text-amber-700">{modelSpecs.classes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Especificaciones Técnicas */}
        <div className="p-8">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2" 
              style={{ fontFamily: 'Poppins, sans-serif' }}>
            <FaCog className="w-5 h-5" style={{ color: '#A8D32C' }} />
            Especificaciones Técnicas
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Arquitectura */}
            <div className="group bg-white dark:bg-neutral-900 hover:bg-gradient-to-br hover:from-blue-50 hover:to-white rounded-xl p-5 border-2 border-neutral-200 dark:border-neutral-700 hover:border-blue-300 shadow-sm hover:shadow-lg dark:hover:shadow-neutral-900/50 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <FaMicrochip className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 mb-1">
                    Arquitectura
                  </p>
                  <p className="text-lg font-bold text-neutral-900 dark:text-white">{modelSpecs.architecture}</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 mt-1">Red neuronal convolucional</p>
                </div>
              </div>
            </div>

            {/* Dataset */}
            <div className="group bg-white dark:bg-neutral-900 hover:bg-gradient-to-br hover:from-[#E8F5D0] hover:to-white rounded-xl p-5 border-2 border-neutral-200 dark:border-neutral-700 hover:border-[#C5E86C]/50 shadow-sm hover:shadow-lg dark:hover:shadow-neutral-900/50 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#E8F5D0]0 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <FaDatabase className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 mb-1">
                    Dataset
                  </p>
                  <p className="text-lg font-bold text-neutral-900 dark:text-white">{modelSpecs.trainingDataset}</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 mt-1">+10,000 imágenes</p>
                </div>
              </div>
            </div>

            {/* Clases */}
            <div className="group bg-white dark:bg-neutral-900 hover:bg-gradient-to-br hover:from-[#A8D32C]/10 hover:to-white rounded-xl p-5 border-2 border-neutral-200 dark:border-neutral-700 hover:border-[#A8D32C]/40 shadow-sm hover:shadow-lg dark:hover:shadow-neutral-900/50 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" 
                     style={{ backgroundColor: '#A8D32C' }}>
                  <FaLayerGroup className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 mb-1">
                    Clases Detectables
                  </p>
                  <p className="text-lg font-bold text-neutral-900 dark:text-white">{modelSpecs.classes} Condiciones</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 mt-1">Enfermedades dermatológicas</p>
                </div>
              </div>
            </div>

            {/* Precisión */}
            <div className="group bg-white dark:bg-neutral-900 hover:bg-gradient-to-br hover:from-[#A8D32C]/10 hover:to-white rounded-xl p-5 border-2 border-neutral-200 dark:border-neutral-700 hover:border-[#C5E86C] shadow-sm hover:shadow-lg dark:hover:shadow-neutral-900/50 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#A8D32C]/100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <FaChartLine className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 mb-1">
                    Precisión Global
                  </p>
                  <p className="text-lg font-bold text-neutral-900 dark:text-white">{modelSpecs.accuracy}</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 mt-1">Validación cruzada</p>
                </div>
              </div>
            </div>

            {/* Input Size */}
            <div className="group bg-white dark:bg-neutral-900 hover:bg-gradient-to-br hover:from-amber-50 hover:to-white rounded-xl p-5 border-2 border-neutral-200 dark:border-neutral-700 hover:border-amber-300 shadow-sm hover:shadow-lg dark:hover:shadow-neutral-900/50 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <FaShieldAlt className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 mb-1">
                    Tamaño de Entrada
                  </p>
                  <p className="text-lg font-bold text-neutral-900 dark:text-white">{modelSpecs.inputSize} px</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 mt-1">Resolución RGB</p>
                </div>
              </div>
            </div>

            {/* Framework */}
            <div className="group bg-white dark:bg-neutral-900 hover:bg-gradient-to-br hover:from-red-50 hover:to-white rounded-xl p-5 border-2 border-neutral-200 dark:border-neutral-700 hover:border-red-300 shadow-sm hover:shadow-lg dark:hover:shadow-neutral-900/50 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <FaNetworkWired className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 mb-1">
                    Framework
                  </p>
                  <p className="text-lg font-bold text-neutral-900 dark:text-white">{modelSpecs.framework}</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 mt-1">Backend: {modelSpecs.backend}</p>
                </div>
              </div>
            </div>

            {/* Parámetros */}
            <div className="group bg-white dark:bg-neutral-900 hover:bg-gradient-to-br hover:from-cyan-50 hover:to-white rounded-xl p-5 border-2 border-neutral-200 dark:border-neutral-700 hover:border-cyan-300 shadow-sm hover:shadow-lg dark:hover:shadow-neutral-900/50 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <FaCog className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 mb-1">
                    Parámetros
                  </p>
                  <p className="text-lg font-bold text-neutral-900 dark:text-white">{modelSpecs.parameters}</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 mt-1">Pesos entrenables</p>
                </div>
              </div>
            </div>

            {/* Velocidad */}
            <div className="group bg-white dark:bg-neutral-900 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-white rounded-xl p-5 border-2 border-neutral-200 dark:border-neutral-700 hover:border-indigo-300 shadow-sm hover:shadow-lg dark:hover:shadow-neutral-900/50 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <FaRocket className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 mb-1">
                    Velocidad
                  </p>
                  <p className="text-lg font-bold text-neutral-900 dark:text-white">{modelSpecs.inferenceTime}</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 mt-1">
                    {realtimeStats.totalPredictions > 0 
                      ? `Promedio de ${realtimeStats.totalPredictions} predicciones` 
                      : 'Tiempo de inferencia'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Estadísticas en Tiempo Real */}
      {realtimeStats.totalPredictions > 0 && (
        <div className="bg-gradient-to-br from-[#A8D32C]/10 to-white rounded-2xl border-2 border-[#C5E86C] shadow-xl dark:shadow-neutral-900/50 p-6">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2" 
              style={{ fontFamily: 'Poppins, sans-serif' }}>
            <FaChartLine className="w-5 h-5" style={{ color: '#A8D32C' }} />
            Estadísticas en Tiempo Real
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border-2 border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between mb-2">
                <FaBrain className="w-8 h-8 text-[#A8D32C]" />
                <span className="text-3xl font-bold text-[#A8D32C]">{realtimeStats.totalPredictions}</span>
              </div>
              <p className="text-sm font-bold text-neutral-700 dark:text-neutral-300">Total de Predicciones</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">En esta sesión</p>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border-2 border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between mb-2">
                <FaClock className="w-8 h-8 text-blue-500" />
                <span className="text-3xl font-bold text-blue-600">{realtimeStats.avgInferenceTime}ms</span>
              </div>
              <p className="text-sm font-bold text-neutral-700 dark:text-neutral-300">Tiempo Promedio</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Por predicción</p>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border-2 border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between mb-2">
                <FaCheckCircle className="w-8 h-8 text-emerald-500" />
                <span className="text-sm font-bold text-emerald-600">
                  {realtimeStats.lastPrediction 
                    ? new Date(realtimeStats.lastPrediction).toLocaleTimeString('es-ES', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })
                    : 'N/A'}
                </span>
              </div>
              <p className="text-sm font-bold text-neutral-700 dark:text-neutral-300">Última Predicción</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                {realtimeStats.lastPrediction 
                  ? new Date(realtimeStats.lastPrediction).toLocaleDateString('es-ES')
                  : 'Sin datos'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Capacidades del Modelo */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border-2 border-neutral-200 dark:border-neutral-700 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#A8D32C' }}>
            <FaAward className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Capacidades y Características
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: FaCheckCircle, text: 'Clasificación multiclase de lesiones cutáneas', color: '#A8D32C' },
            { icon: FaCheckCircle, text: 'Detección en tiempo real con IA', color: '#3B82F6' },
            { icon: FaCheckCircle, text: 'Procesamiento local (privacidad garantizada)', color: '#8B5CF6' },
            { icon: FaCheckCircle, text: 'Análisis de 23 condiciones dermatológicas', color: '#F59E0B' },
            { icon: FaCheckCircle, text: 'Inferencia rápida (< 500ms)', color: '#EF4444' },
            { icon: FaCheckCircle, text: 'Compatibilidad con imágenes JPG/PNG/WebP', color: '#06B6D4' },
            { icon: FaCheckCircle, text: 'Niveles de confianza cuantificados', color: '#EC4899' },
            { icon: FaCheckCircle, text: 'Interfaz optimizada para dispositivos móviles', color: '#14B8A6' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 transition-colors">
              <item.icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: item.color }} />
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer Técnico */}
      <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
            <FaShieldAlt className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 dark:text-white text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Información Técnica Importante
            </h4>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Este modelo de IA ha sido entrenado con datasets públicos de dermatología y está diseñado 
              para <strong>fines educativos y de investigación únicamente</strong>. El sistema utiliza 
              arquitectura MobileNetV2 optimizada para inferencia en navegador mediante TensorFlow.js con 
              backend WebGL para máximo rendimiento. Todos los cálculos se realizan localmente en su 
              dispositivo, garantizando la privacidad de sus datos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelInfo;
