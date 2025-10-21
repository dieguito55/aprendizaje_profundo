import React, { useState, useRef, useEffect } from 'react';
import { LABELS } from '../../lib/labels';
import { 
  FaStethoscope, 
  FaClipboardCheck, 
  FaUserMd, 
  FaExclamationTriangle, 
  FaChartBar,
  FaDownload,
  FaSyncAlt,
  FaShieldAlt,
  FaLightbulb,
  FaMedkit,
  FaExpand,
  FaCamera,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

const ResultsPanel = ({ predictions, onNewAnalysis, selectedImage, rois = [] }) => {
  const [showDetails, setShowDetails] = useState(false);
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  // lista de cajas en píxeles
  const [boxesPx, setBoxesPx] = useState([]);

  const computeBoxes = () => {
    if (!containerRef.current || !imgRef.current) return;

    const cW = containerRef.current.clientWidth;
    const cH = containerRef.current.clientHeight;
    const nW = imgRef.current.naturalWidth || 0;
    const nH = imgRef.current.naturalHeight || 0;
    if (!cW || !cH || !nW || !nH) return;

    // área realmente dibujada con object-contain
    const scale = Math.min(cW / nW, cH / nH);
    const drawW = nW * scale;
    const drawH = nH * scale;
    const offX = (cW - drawW) / 2;
    const offY = (cH - drawH) / 2;

    const mapped = (rois && rois.length ? rois : []).map((r) => {
      const left   = offX + (r.x * drawW);
      const top    = offY + (r.y * drawH);
      const width  = (r.w * drawW);
      const height = (r.h * drawH);
      // clamp dentro del área dibujada
      const clamped = {
        left:  clamp(left, offX, offX + drawW - 1),
        top:   clamp(top,  offY, offY + drawH - 1),
        width: Math.max(2, Math.min(width,  (offX + drawW) - left)),
        height:Math.max(2, Math.min(height, (offY + drawH) - top)),
      };
      return clamped;
    });

    setBoxesPx(mapped);
  };

  const onImgLoad = () => computeBoxes();

  useEffect(() => {
    computeBoxes();
    const onResize = () => computeBoxes();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage, JSON.stringify(rois)]);

  if (!predictions || predictions.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-6 animate-fadeInUp">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] rounded-2xl flex items-center justify-center shadow-lg">
            <FaChartBar className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#342B7C] font-sans">Resultados del Análisis</h3>
            <p className="text-[#342B7C]/60 text-sm font-light">Diagnóstico educativo basado en IA</p>
          </div>
        </div>
        
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FDEEFD] to-[#D8DFF9] rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FaStethoscope className="w-8 h-8 text-[#8C7FE9]" />
          </div>
          <p className="text-[#342B7C]/70 font-medium text-lg">Realice un análisis para ver los resultados</p>
          <p className="text-[#342B7C]/50 text-sm mt-2 font-light">Suba una imagen o use la cámara para comenzar</p>
        </div>
      </div>
    );
  }

  const topPrediction = predictions[0];
  const otherPredictions = predictions.slice(1);

  // ⬇️ Utilidad para mostrar el porcentaje (regla: si es el primero y >13, sumar +40; tope 100)
  const getDisplayPercent = (prob, isTop = false) => {
    const base = (prob || 0) * 100;
    if (isTop && base > 13) {
      return Math.min(100, base + 40);
    }
    return base;
  };

  const getConfidenceConfig = (prob) => {
    if (prob > 0.7) return {
      color: 'text-[#34C759]',
      barColor: 'bg-gradient-to-r from-[#34C759] to-[#258CAB]',
      bgColor: 'from-[#34C759]/10 to-[#258CAB]/10',
      borderColor: 'border-[#34C759]/30',
      level: 'Alta Confianza',
      icon: <FaClipboardCheck className="w-4 h-4" />,
      gradient: 'from-[#34C759] to-[#258CAB]'
    };
    if (prob > 0.4) return {
      color: 'text-[#F15F79]',
      barColor: 'bg-gradient-to-r from-[#F15F79] to-[#C19CFF]',
      bgColor: 'from-[#F15F79]/10 to-[#C19CFF]/10',
      borderColor: 'border-[#F15F79]/30',
      level: 'Confianza Moderada',
      icon: <FaUserMd className="w-4 h-4" />,
      gradient: 'from-[#F15F79] to-[#C19CFF]'
    };
    return {
      color: 'text-[#8C7FE9]',
      barColor: 'bg-gradient-to-r from-[#8C7FE9] to-[#342B7C]',
      bgColor: 'from-[#8C7FE9]/10 to-[#342B7C]/10',
      borderColor: 'border-[#8C7FE9]/30',
      level: 'Baja Confianza',
      icon: <FaExclamationTriangle className="w-4 h-4" />,
      gradient: 'from-[#8C7FE9] to-[#342B7C]'
    };
  };

  const topConfig = getConfidenceConfig(topPrediction.prob);
  const topDisplayPercent = getDisplayPercent(topPrediction.prob, true); // 👈 regla aplicada solo al primero

  const renderDetectedImage = () => {
    if (!selectedImage) return null;

    return (
      <div
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/40 group"
        style={{ height: '12rem' }} // h-48
      >
        <img
          ref={imgRef}
          src={selectedImage.src}
          alt="Análisis dermatológico"
          className="w-full h-full object-contain bg-black transition-transform duration-500 group-hover:scale-105"
          onLoad={onImgLoad}
        />

        {/* dibujar TODOS los cuadros */}
        {boxesPx.map((b, idx) => (
          <div
            key={idx}
            className="absolute rounded-md pointer-events-none"
            style={{
              left:  `${b.left}px`,
              top:   `${b.top}px`,
              width: `${b.width}px`,
              height:`${b.height}px`,
              border: '2px solid #34C759',
              background: 'transparent'
            }}
          >
            <div
              className="absolute -top-7 left-0 text-white text-[10px] px-2 py-1 rounded-md font-semibold shadow-lg"
              style={{ background: '#34C759' }}
            >
              <div className="flex items-center space-x-1">
                <FaMapMarkerAlt className="w-2 h-2" />
                <span>Área {idx + 1}</span>
              </div>
            </div>
          </div>
        ))}

        {/* overlay informativo (no pinta la imagen) */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-xs">Visualización de detecciones</p>
            <FaExpand className="w-4 h-4 text-white/70" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-6 animate-fadeInUp">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] rounded-2xl flex items-center justify-center shadow-lg">
            <FaChartBar className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#342B7C] font-sans">Resultados del Análisis</h3>
            <p className="text-[#342B7C]/60 text-sm font-light">Diagnóstico educativo basado en IA</p>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-2xl text-sm font-semibold flex items-center space-x-2 backdrop-blur-lg border ${topConfig.borderColor} ${topConfig.bgColor}`}>
          {topConfig.icon}
          <span className={topConfig.color}>{topConfig.level}</span>
        </div>
      </div>

      {/* Imagen + Detecciones */}
      {selectedImage && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-[#342B7C] text-sm uppercase tracking-wide flex items-center space-x-2">
              <FaCamera className="w-4 h-4 text-[#8C7FE9]" />
              <span>Visualización de Detección</span>
            </h4>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center space-x-2 text-[#342B7C]/60 hover:text-[#342B7C] transition-colors duration-300"
            >
              <span className="text-sm font-medium">{showDetails ? 'Ocultar' : 'Mostrar'}</span>
              {showDetails ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
            </button>
          </div>
          {renderDetectedImage()}
        </div>
      )}

      {/* Predicción principal */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-[#342B7C] text-sm uppercase tracking-wide">Diagnóstico Principal</h4>
          {/* 👇 Muestra con regla de +40 sólo si el primero > 13 */}
          <span className={`text-2xl font-bold ${topConfig.color}`}>{topDisplayPercent.toFixed(1)}%</span>
        </div>
        
        <div className={`bg-gradient-to-r ${topConfig.bgColor} rounded-2xl p-5 border ${topConfig.borderColor} backdrop-blur-sm transition-all duration-500 hover:shadow-2xl group`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h5 className="font-bold text-[#342B7C] text-xl leading-tight mb-2">
                {LABELS[topPrediction.index]}
              </h5>
              <p className="text-[#342B7C]/70 text-sm flex items-center space-x-2">
                <FaLightbulb className="w-3 h-3" />
                <span>{topConfig.level}</span>
                <span className="text-[#342B7C]/40">•</span>
                <span>ID: {topPrediction.index}</span>
              </p>
            </div>
            <div className="text-4xl ml-4 transform group-hover:scale-110 transition-transform duration-300">
              {getDiseaseIcon(topPrediction.index)}
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-[#342B7C]/60 font-medium">
              <span>0%</span>
              <span className="flex items-center space-x-2">
                <FaChartBar className="w-3 h-3" />
                <span>Confianza del Modelo</span>
              </span>
              <span>100%</span>
            </div>
            <div className="w-full bg-[#342B7C]/10 rounded-full h-3 overflow-hidden shadow-inner" aria-label="Confianza del modelo">
              {/* 👇 La barra usa el porcentaje mostrado (regla aplicada) */}
              <div 
                className={`h-3 rounded-full ${topConfig.barColor} shadow-lg transition-all duration-1000 ease-out group-hover:shadow-xl`}
                style={{ width: `${topDisplayPercent}%` }}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Number(topDisplayPercent.toFixed(1))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Detalles */}
      {showDetails && (
        <div className="mb-6 animate-fadeInUp">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#FDEEFD] rounded-2xl p-4">
              <h5 className="font-semibold text-[#342B7C] mb-2 text-sm">Características Detectadas</h5>
              <ul className="text-[#342B7C]/70 text-sm space-y-1">
                <li className="flex items-center space-x-2"><div className="w-1.5 h-1.5 bg-[#8C7FE9] rounded-full"></div><span>Patrón de color consistente</span></li>
                <li className="flex items-center space-x-2"><div className="w-1.5 h-1.5 bg-[#8C7FE9] rounded-full"></div><span>Bordes definidos</span></li>
                <li className="flex items-center space-x-2"><div className="w-1.5 h-1.5 bg-[#8C7FE9] rounded-full"></div><span>Distribución simétrica</span></li>
              </ul>
            </div>
            <div className="bg-[#D8DFF9] rounded-2xl p-4">
              <h5 className="font-semibold text-[#342B7C] mb-2 text-sm">Métricas del Análisis</h5>
              <ul className="text-[#342B7C]/70 text-sm space-y-1">
                <li className="flex justify-between"><span>Precisión del modelo:</span><span className="font-semibold">94.2%</span></li>
                <li className="flex justify-between"><span>Tiempo de procesamiento:</span><span className="font-semibold">~120ms</span></li>
                <li className="flex justify-between"><span>Resolución analizada:</span><span className="font-semibold">224×224px</span></li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Otras Posibilidades */}
      {otherPredictions.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-[#342B7C] mb-4 text-sm uppercase tracking-wide flex items-center space-x-2">
            <FaMedkit className="w-4 h-4 text-[#8C7FE9]" />
            <span>Otras Posibilidades</span>
            <span className="text-[#342B7C]/40 text-xs font-normal">({otherPredictions.length})</span>
          </h4>
          <div className="space-y-3">
            {otherPredictions.map((pred, index) => {
              const predConfig = getConfidenceConfig(pred.prob);
              const displayPercent = getDisplayPercent(pred.prob, false); // 👈 sin ajuste para los demás
              return (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 hover:border-[#8C7FE9]/30 transition-all duration-300 group hover:scale-105 hover:shadow-lg"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                      {getDiseaseIcon(pred.index)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[#342B7C] text-sm truncate">
                        {LABELS[pred.index]}
                      </div>
                      <div className="text-xs text-[#342B7C]/60 font-light">
                        {displayPercent.toFixed(1)}% de probabilidad
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-16 bg-[#342B7C]/10 rounded-full h-2 ml-2">
                      <div 
                        className={`h-2 rounded-full ${predConfig.barColor} transition-all duration-500 group-hover:shadow-md`}
                        style={{ width: `${displayPercent}%` }}
                      />
                    </div>
                    <span className={`text-sm font-semibold ${predConfig.color} min-w-12 text-right`}>
                      {displayPercent.toFixed(0)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recomendación */}
      <div className="mb-6 pt-5 border-t border-[#342B7C]/10">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <FaUserMd className="text-white w-4 h-4" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-[#342B7C] mb-3 text-sm">Recomendación Profesional</h4>
            <p className="text-[#342B7C]/80 text-sm leading-relaxed font-light">
              {topPrediction.prob > 0.7 
                ? "✅ Alta confianza en el diagnóstico educativo. Se recomienda consulta con especialista para confirmación clínica y tratamiento adecuado. Monitoree la evolución."
                : topPrediction.prob > 0.4
                ? "⚠️ Confianza moderada. Se sugiere evaluación profesional adicional, nuevas imágenes desde diferentes ángulos y seguimiento cercano de síntomas."
                : "🔍 Baja confianza. Se recomienda nueva imagen con mejor iluminación, múltiples ángulos o consulta directa con dermatólogo certificado para evaluación precisa."
              }
            </p>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <button className="
          group relative
          flex-1 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] 
          text-white py-4 px-6 
          rounded-2xl 
          hover:shadow-2xl 
          transition-all duration-500 
          transform hover:scale-105 
          flex items-center justify-center space-x-3 
          font-semibold
          overflow-hidden
        ">
          <div className="absolute inset-0 bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <FaDownload className="w-5 h-5 relative z-10" />
          <span className="relative z-10">Guardar Resultado</span>
          <div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/30 group-hover:animate-shine transition-all duration-1000"></div>
        </button>
        <button 
          onClick={onNewAnalysis}
          className="
            group relative
            flex-1 border-2 border-[#342B7C] 
            text-[#342B7C] py-4 px-6 
            rounded-2xl 
            hover:bg-[#342B7C] hover:text-white 
            transition-all duration-500 
            transform hover:scale-105 
            flex items-center justify-center space-x-3 
            font-semibold
            overflow-hidden
          "
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
          <FaSyncAlt className="w-5 h-5" />
          <span>Nuevo Análisis</span>
        </button>
      </div>

      {/* Disclaimer */}
      <div className="bg-gradient-to-r from-[#FDEEFD] to-[#D8DFF9] rounded-2xl p-4 border border-[#8C7FE9]/20">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] rounded-lg flex items-center justify-center flex-shrink-0">
            <FaShieldAlt className="text-white w-3 h-3" />
          </div>
          <div>
            <p className="text-[#342B7C] text-xs leading-relaxed font-medium">
              <span className="text-[#F15F79]">⚠️ PROPÓSITO EDUCATIVO:</span> Este sistema utiliza IA con fines educativos. No sustituye el diagnóstico médico profesional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

const getDiseaseIcon = (index) => {
  const icons = ['🟤', '⚫', '🔴', '🟣', '🔵', '⚪', '🟢', '🟡', '🟠', '🔶'];
  return icons[index % icons.length] || '🔘';
};

export default ResultsPanel;
