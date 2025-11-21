import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSyncAlt, 
  FaBrain, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaDownload,
  FaUpload,
  FaChartLine,
  FaDatabase,
  FaClock,
  FaServer,
  FaCodeBranch,
  FaFileExport,
  FaPlay,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTrash,
  FaEye,
  FaFilter,
  FaCalendar,
  FaMicroscope,
  FaShieldAlt,
  FaHistory,
  FaHome,
  FaChevronRight
} from 'react-icons/fa';

const Retrain = () => {
  const [validatedImages, setValidatedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all'); // all, validated, pending
  const [isRetraining, setIsRetraining] = useState(false);
  const [retrainProgress, setRetrainProgress] = useState(0);

  // Cargar imágenes validadas del localStorage
  useEffect(() => {
    loadValidatedImages();
  }, []);

  const loadValidatedImages = () => {
    try {
      const validated = JSON.parse(localStorage.getItem('dermapp_validated') || '[]');
      
      // Solo cargar las imágenes VALIDADAS (no rechazadas)
      const validatedImages = validated.map(item => ({
        id: item.id,
        timestamp: item.validatedAt,
        diagnosis: item.diagnosis,
        confidence: item.confidence,
        image: item.image,
        validated: true,
        validatedBy: item.validatedBy || 'Usuario',
        validatedAt: item.validatedAt,
        correctDiagnosis: item.correctDiagnosis || item.diagnosis,
        processingTime: 'N/A'
      }));
      
      setValidatedImages(validatedImages);
    } catch (e) {
      console.error('Error loading validated images:', e);
    }
  };

  const modelInfo = {
    version: "v1.0",
    architecture: "MobileNetV2",
    lastTrained: "2024-11-15",
    totalSamples: validatedImages.length,
    validatedSamples: validatedImages.filter(img => img.validated).length,
    accuracy: "90.5%",
    framework: "TensorFlow.js"
  };

  const handleSelectImage = (imageId) => {
    setSelectedImages(prev => {
      if (prev.includes(imageId)) {
        return prev.filter(id => id !== imageId);
      }
      return [...prev, imageId];
    });
  };

  const handleSelectAll = () => {
    const filtered = getFilteredImages();
    if (selectedImages.length === filtered.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(filtered.map(img => img.id));
    }
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`¿Eliminar ${selectedImages.length} imagen(es) seleccionada(s)?`)) {
      const updatedImages = validatedImages.filter(img => !selectedImages.includes(img.id));
      setValidatedImages(updatedImages);
      
      const history = JSON.parse(localStorage.getItem('dermapp_history') || '[]');
      const updatedHistory = history.filter(item => !selectedImages.includes(item.id));
      localStorage.setItem('dermapp_history', JSON.stringify(updatedHistory));
      
      setSelectedImages([]);
    }
  };

  const handleStartRetraining = async () => {
    const validatedCount = validatedImages.filter(img => img.validated).length;
    
    // Contar imágenes por enfermedad
    const diseaseCount = {};
    validatedImages.forEach(img => {
      if (img.validated) {
        diseaseCount[img.diagnosis] = (diseaseCount[img.diagnosis] || 0) + 1;
      }
    });
    
    // Verificar si alguna enfermedad tiene al menos 100 imágenes
    const maxDisease = Object.entries(diseaseCount).reduce((max, [disease, count]) => {
      return count > (max.count || 0) ? { disease, count } : max;
    }, {});
    
    if (maxDisease.count < 100) {
      alert(
        `Se necesitan al menos 100 imágenes de la misma enfermedad para iniciar el reentrenamiento.\n\n` +
        `Actualmente tienes:\n` +
        Object.entries(diseaseCount)
          .sort((a, b) => b[1] - a[1])
          .map(([disease, count]) => `• ${disease}: ${count} imagen(es)`)
          .join('\n') +
        `\n\nLa enfermedad con más imágenes es "${maxDisease.disease}" con ${maxDisease.count} validada(s).`
      );
      return;
    }

    if (!window.confirm(
      `¿Iniciar reentrenamiento con ${validatedCount} imágenes validadas?\n\n` +
      `Enfermedad principal: ${maxDisease.disease} (${maxDisease.count} imágenes)`
    )) {
      return;
    }

    setIsRetraining(true);
    setRetrainProgress(0);

    // Simular proceso de reentrenamiento
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setRetrainProgress(i);
    }

    alert('Reentrenamiento completado exitosamente. Nuevo modelo: v1.1');
    setIsRetraining(false);
    setRetrainProgress(0);
  };

  const handleExportDataset = () => {
    const validatedData = validatedImages.filter(img => img.validated);
    const dataStr = JSON.stringify(validatedData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dermapp_validated_dataset_${Date.now()}.json`;
    link.click();
  };

  const getFilteredImages = () => {
    if (filterStatus === 'validated') {
      return validatedImages.filter(img => img.validated);
    }
    if (filterStatus === 'pending') {
      return validatedImages.filter(img => !img.validated);
    }
    return validatedImages;
  };

  const filteredImages = getFilteredImages();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-6 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="flex items-center space-x-2 text-[#A8D32C] hover:text-[#8ab824] transition-colors">
              <FaHome className="w-4 h-4" />
              <span className="font-semibold">Inicio</span>
            </Link>
            <FaChevronRight className="w-3 h-3 text-neutral-400" />
            <span className="text-neutral-900 dark:text-white font-semibold">Reentrenamiento</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#A8D32C' }}>
              <FaSyncAlt className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Reentrenamiento del Modelo
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                Gestiona y valida imágenes para mejorar la precisión del modelo de IA
              </p>
            </div>
          </div>

          {/* Model Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            <div className="bg-gradient-to-br from-[#A8D32C] to-[#8ab824] rounded-lg p-3 text-white">
              <FaCodeBranch className="w-5 h-5 mb-2 opacity-80" />
              <p className="text-xs opacity-80 mb-1">Versión</p>
              <p className="text-lg font-bold">{modelInfo.version}</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 text-white">
              <FaBrain className="w-5 h-5 mb-2 opacity-80" />
              <p className="text-xs opacity-80 mb-1">Arquitectura</p>
              <p className="text-sm font-bold">{modelInfo.architecture}</p>
            </div>

            <div className="bg-gradient-to-br from-[#E8F5D0]0 to-[#8ab824] rounded-lg p-3 text-white">
              <FaClock className="w-5 h-5 mb-2 opacity-80" />
              <p className="text-xs opacity-80 mb-1">Último Entrenamiento</p>
              <p className="text-sm font-bold">{modelInfo.lastTrained}</p>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg p-3 text-white">
              <FaDatabase className="w-5 h-5 mb-2 opacity-80" />
              <p className="text-xs opacity-80 mb-1">Total Muestras</p>
              <p className="text-lg font-bold">{modelInfo.totalSamples}</p>
            </div>

            <div className="bg-gradient-to-br from-[#A8D32C] to-[#8ab824] rounded-lg p-3 text-white">
              <FaCheckCircle className="w-5 h-5 mb-2 opacity-80" />
              <p className="text-xs opacity-80 mb-1">Validadas</p>
              <p className="text-lg font-bold">{modelInfo.validatedSamples}</p>
            </div>

            <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg p-3 text-white">
              <FaChartLine className="w-5 h-5 mb-2 opacity-80" />
              <p className="text-xs opacity-80 mb-1">Precisión</p>
              <p className="text-lg font-bold">{modelInfo.accuracy}</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-3 text-white">
              <FaServer className="w-5 h-5 mb-2 opacity-80" />
              <p className="text-xs opacity-80 mb-1">Framework</p>
              <p className="text-sm font-bold">{modelInfo.framework}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Actions Bar */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Filter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-900 rounded-lg p-1">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    filterStatus === 'all'
                      ? 'bg-white dark:bg-neutral-900 text-[#A8D32C] shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:text-white'
                  }`}
                >
                  Todas ({validatedImages.length})
                </button>
                <button
                  onClick={() => setFilterStatus('validated')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    filterStatus === 'validated'
                      ? 'bg-white dark:bg-neutral-900 text-[#A8D32C] shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:text-white'
                  }`}
                >
                  Validadas ({validatedImages.filter(img => img.validated).length})
                </button>
                <button
                  onClick={() => setFilterStatus('pending')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    filterStatus === 'pending'
                      ? 'bg-white dark:bg-neutral-900 text-[#A8D32C] shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:text-white'
                  }`}
                >
                  Pendientes ({validatedImages.filter(img => !img.validated).length})
                </button>
              </div>

              {selectedImages.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                    {selectedImages.length} seleccionada(s)
                  </span>
                  <button
                    onClick={handleDeleteSelected}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors"
                  >
                    <FaTrash className="w-3 h-3" />
                    Eliminar
                  </button>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleSelectAll}
                className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg text-sm font-semibold hover:bg-neutral-200 transition-colors"
              >
                <FaCheckCircle className="w-4 h-4" />
                {selectedImages.length === filteredImages.length ? 'Deseleccionar' : 'Seleccionar Todo'}
              </button>

              <button
                onClick={handleExportDataset}
                disabled={validatedImages.filter(img => img.validated).length === 0}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaFileExport className="w-4 h-4" />
                Exportar Dataset
              </button>

              <button
                onClick={handleStartRetraining}
                disabled={isRetraining || validatedImages.filter(img => img.validated).length < 5}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold text-white transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#A8D32C' }}
              >
                {isRetraining ? (
                  <>
                    <FaSyncAlt className="w-4 h-4 animate-spin" />
                    Reentrenando... {retrainProgress}%
                  </>
                ) : (
                  <>
                    <FaPlay className="w-4 h-4" />
                    Iniciar Reentrenamiento
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          {isRetraining && (
            <div className="mt-4">
              <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#A8D32C] to-[#8ab824] transition-all duration-300 rounded-full"
                  style={{ width: `${retrainProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Info Alert */}
        {validatedImages.filter(img => img.validated).length < 5 && validatedImages.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <FaExclamationTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900 mb-1">
                Insuficientes muestras validadas
              </p>
              <p className="text-sm text-amber-700">
                Se necesitan al menos 100 imágenes validadas para iniciar el reentrenamiento. 
                Actualmente tienes {validatedImages.filter(img => img.validated).length} validada(s).
              </p>
            </div>
          </div>
        )}

        {/* Images Grid */}
        {filteredImages.length === 0 ? (
          <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 p-12 text-center">
            <FaHistory className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              No hay imágenes disponibles
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Las imágenes analizadas aparecerán aquí para su validación y reentrenamiento
            </p>
            <Link
              to="/prediccion"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white hover:shadow-lg transition-all duration-300"
              style={{ backgroundColor: '#A8D32C' }}
            >
              <FaMicroscope className="w-5 h-5" />
              Ir a Diagnóstico
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div 
                key={image.id}
                className={`bg-white dark:bg-neutral-900 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                  selectedImages.includes(image.id)
                    ? 'border-[#A8D32C] shadow-lg'
                    : 'border-neutral-200 dark:border-neutral-700'
                }`}
              >
                {/* Image */}
                <div className="relative aspect-square rounded-t-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  {image.image && (
                    <img 
                      src={image.image} 
                      alt={image.diagnosis}
                      className="w-full h-full object-cover"
                    />
                  )}
                  
                  {/* Checkbox */}
                  <div className="absolute top-3 left-3">
                    <input
                      type="checkbox"
                      checked={selectedImages.includes(image.id)}
                      onChange={() => handleSelectImage(image.id)}
                      className="w-5 h-5 rounded border-2 border-white shadow-lg cursor-pointer"
                    />
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    {image.validated ? (
                      <div className="flex items-center gap-1.5 bg-[#A8D32C] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
                        <FaCheckCircle className="w-3 h-3" />
                        Validada
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 bg-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
                        <FaClock className="w-3 h-3" />
                        Pendiente
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-1 truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {image.diagnosis}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                        <FaClock className="w-3 h-3" />
                        {new Date(image.timestamp).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold" style={{ color: '#A8D32C' }}>
                        {image.confidence}%
                      </p>
                    </div>
                  </div>

                  {/* Validation Status */}
                  {image.validated && (
                    <div className="bg-[#A8D32C]/10 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <FaCheckCircle className="w-4 h-4 text-[#A8D32C]" />
                        <p className="text-xs text-[#8ab824] font-semibold">
                          Imagen Validada
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-[#A8D32C]">
                          <strong>Diagnóstico:</strong> {image.correctDiagnosis}
                        </p>
                        <p className="text-xs text-[#A8D32C]">
                          <strong>Confianza:</strong> {image.confidence}%
                        </p>
                        {image.processingTime && (
                          <p className="text-xs text-[#A8D32C]">
                            <strong>Tiempo:</strong> {image.processingTime}ms
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteSelected()}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg text-xs font-semibold hover:bg-neutral-200 transition-colors"
                    >
                      <FaEye className="w-3 h-3" />
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Retrain;
