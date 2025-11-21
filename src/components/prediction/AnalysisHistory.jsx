import React, { useState, useEffect } from 'react';
import { 
  FaHistory, 
  FaClock, 
  FaCheckCircle, 
  FaTrash,
  FaEye,
  FaDownload,
  FaChartLine
} from 'react-icons/fa';

const AnalysisHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Cargar historial del localStorage
    const savedHistory = localStorage.getItem('dermapp_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Error loading history:', e);
      }
    }
  }, []);

  const clearHistory = () => {
    if (window.confirm('¿Está seguro de que desea eliminar todo el historial?')) {
      localStorage.removeItem('dermapp_history');
      setHistory([]);
    }
  };

  const deleteItem = (id) => {
    const updated = history.filter(item => item.id !== id);
    localStorage.setItem('dermapp_history', JSON.stringify(updated));
    setHistory(updated);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (history.length === 0) {
    return (
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-4">
          <FaHistory className="w-10 h-10 text-neutral-300" />
        </div>
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Sin Historial de Análisis
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 dark:text-neutral-500">
          Los análisis realizados aparecerán aquí para su consulta posterior
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#A8D32C' }}>
              <FaHistory className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Historial de Análisis
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 dark:text-neutral-500">{history.length} análisis realizados</p>
            </div>
          </div>
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm transition-colors"
          >
            <FaTrash className="w-4 h-4" />
            Limpiar Historial
          </button>
        </div>
      </div>

      {/* Lista de análisis */}
      <div className="p-6 space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar-modal">
        {history.map((item) => (
          <div 
            key={item.id}
            className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 transition-all"
          >
            <div className="flex items-start gap-4">
              {/* Miniatura */}
              {item.image && (
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-neutral-200 flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt="Analysis" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Información */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h4 className="font-bold text-neutral-900 dark:text-white text-base mb-1">
                      {item.diagnosis || 'Diagnóstico no disponible'}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500">
                      <FaClock className="w-3 h-3" />
                      <span>{formatDate(item.timestamp)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <FaChartLine className="w-4 h-4" style={{ color: '#A8D32C' }} />
                      <span className="text-lg font-bold" style={{ color: '#A8D32C' }}>
                        {item.confidence}%
                      </span>
                    </div>
                    <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-[#C5E86C]/20 text-[#8ab824]">
                      Completado
                    </span>
                  </div>
                </div>

                {/* Tiempo de procesamiento */}
                {item.processingTime && (
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 mb-3">
                    Procesado en <strong>{item.processingTime}ms</strong>
                  </p>
                )}

                {/* Acciones */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(`Detalles: ${item.diagnosis} - ${item.confidence}%`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 hover:border-[#A8D32C] text-neutral-700 dark:text-neutral-300 hover:text-[#A8D32C] text-xs font-semibold transition-colors"
                  >
                    <FaEye className="w-3 h-3" />
                    Ver Detalles
                  </button>
                  <button
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 hover:border-blue-500 text-neutral-700 dark:text-neutral-300 hover:text-blue-600 text-xs font-semibold transition-colors"
                  >
                    <FaDownload className="w-3 h-3" />
                    Exportar
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-neutral-300 hover:border-red-500 text-neutral-700 dark:text-neutral-300 hover:text-red-600 text-xs font-semibold transition-colors"
                  >
                    <FaTrash className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisHistory;
