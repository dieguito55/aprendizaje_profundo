import React, { useState, useEffect } from 'react';
import { 
  FaChartBar, 
  FaCheckCircle, 
  FaClock, 
  FaChartLine,
  FaBrain,
  FaCalendar
} from 'react-icons/fa';

const Statistics = () => {
  const [stats, setStats] = useState({
    totalAnalyses: 0,
    avgConfidence: 0,
    avgProcessingTime: 0,
    mostCommon: 'N/A',
    todayAnalyses: 0,
    successRate: 0
  });

  useEffect(() => {
    // Cargar estadísticas desde localStorage
    const calculateStats = () => {
      try {
        const history = JSON.parse(localStorage.getItem('dermapp_history') || '[]');
        
        if (history.length === 0) {
          return;
        }

        // Total de análisis
        const totalAnalyses = history.length;

        // Confianza promedio
        const avgConfidence = history.reduce((sum, item) => 
          sum + parseFloat(item.confidence || 0), 0) / totalAnalyses;

        // Tiempo de procesamiento promedio
        const avgProcessingTime = history.reduce((sum, item) => 
          sum + parseFloat(item.processingTime || 0), 0) / totalAnalyses;

        // Diagnóstico más común
        const diagnosisCounts = {};
        history.forEach(item => {
          const diagnosis = item.diagnosis || 'Desconocido';
          diagnosisCounts[diagnosis] = (diagnosisCounts[diagnosis] || 0) + 1;
        });
        const mostCommon = Object.keys(diagnosisCounts).reduce((a, b) => 
          diagnosisCounts[a] > diagnosisCounts[b] ? a : b, 'N/A');

        // Análisis de hoy
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayAnalyses = history.filter(item => {
          const itemDate = new Date(item.timestamp);
          itemDate.setHours(0, 0, 0, 0);
          return itemDate.getTime() === today.getTime();
        }).length;

        // Tasa de éxito (análisis con confianza > 70%)
        const successfulAnalyses = history.filter(item => 
          parseFloat(item.confidence || 0) > 70).length;
        const successRate = (successfulAnalyses / totalAnalyses) * 100;

        setStats({
          totalAnalyses,
          avgConfidence: avgConfidence.toFixed(1),
          avgProcessingTime: Math.round(avgProcessingTime),
          mostCommon,
          todayAnalyses,
          successRate: successRate.toFixed(1)
        });
      } catch (e) {
        console.error('Error calculating stats:', e);
      }
    };

    calculateStats();
    
    // Actualizar cada 5 segundos
    const interval = setInterval(calculateStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#A8D32C' }}>
            <FaChartBar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Estadísticas del Sistema
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 dark:text-neutral-500">Métricas de rendimiento y uso</p>
          </div>
        </div>
      </div>

      {/* Grid de estadísticas */}
      <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total de Análisis */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 border border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
              <FaBrain className="w-5 h-5 text-white" />
            </div>
            <span className="text-3xl font-bold text-blue-700">{stats.totalAnalyses}</span>
          </div>
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Total de Análisis</p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 mt-1">Realizados en el sistema</p>
        </div>

        {/* Confianza Promedio */}
        <div className="bg-gradient-to-br from-[#A8D32C]/10 to-[#C5E86C]/20 rounded-lg p-5 border border-[#C5E86C]">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#A8D32C]/100 flex items-center justify-center">
              <FaChartLine className="w-5 h-5 text-white" />
            </div>
            <span className="text-3xl font-bold text-[#8ab824]">{stats.avgConfidence}%</span>
          </div>
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Confianza Promedio</p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 mt-1">Nivel de certeza del modelo</p>
        </div>

        {/* Tiempo Promedio */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-5 border border-amber-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center">
              <FaClock className="w-5 h-5 text-white" />
            </div>
            <span className="text-3xl font-bold text-amber-700">{stats.avgProcessingTime}ms</span>
          </div>
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Tiempo Promedio</p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 mt-1">Velocidad de procesamiento</p>
        </div>

        {/* Diagnóstico más común */}
        <div className="bg-gradient-to-br from-[#E8F5D0] to-[#C5E86C]/30 rounded-lg p-5 border border-[#C5E86C]/40">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#E8F5D0]0 flex items-center justify-center">
              <FaCheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Más Frecuente</p>
          <p className="text-lg font-bold text-[#6d9419]">{stats.mostCommon}</p>
        </div>

        {/* Análisis de hoy */}
        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-5 border border-cyan-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500 flex items-center justify-center">
              <FaCalendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-3xl font-bold text-cyan-700">{stats.todayAnalyses}</span>
          </div>
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Análisis de Hoy</p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 mt-1">Realizados en las últimas 24h</p>
        </div>

        {/* Tasa de éxito */}
        <div className="bg-gradient-to-br from-[#A8D32C]/10 to-[#C5E86C]/20 rounded-lg p-5 border border-[#C5E86C]">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#A8D32C]/100 flex items-center justify-center">
              <FaCheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-3xl font-bold text-[#8ab824]">{stats.successRate}%</span>
          </div>
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Tasa de Éxito</p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 mt-1">Precisión del modelo</p>
        </div>
      </div>

      {/* Gráfica simple (representación visual) */}
      <div className="p-6 border-t border-neutral-200 dark:border-neutral-700">
        <h4 className="font-bold text-neutral-900 dark:text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Distribución de Confianza
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 w-20">Alta (≥90%)</span>
            <div className="flex-1 h-6 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-6 rounded-full bg-[#A8D32C]/100" style={{ width: '65%' }}></div>
            </div>
            <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 w-12 text-right">65%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 w-20">Media (70-90%)</span>
            <div className="flex-1 h-6 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-6 rounded-full bg-amber-500" style={{ width: '28%' }}></div>
            </div>
            <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 w-12 text-right">28%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 w-20">Baja (&lt;70%)</span>
            <div className="flex-1 h-6 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-6 rounded-full bg-red-500" style={{ width: '7%' }}></div>
            </div>
            <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 w-12 text-right">7%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
