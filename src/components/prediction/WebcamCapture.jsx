import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { 
  FaCamera, 
  FaSync, 
  FaCheck, 
  FaRedo, 
  FaVideo, 
  FaLightbulb,
  FaExpand,
  FaCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

const WebcamCapture = ({ onCapture, disabled = false }) => {
  const webcamRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [facingMode, setFacingMode] = useState('user');
  const [lastCapture, setLastCapture] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const videoConstraints = {
    facingMode: facingMode,
    width: 1280,
    height: 720
  };

  const capture = useCallback(() => {
    if (!webcamRef.current || disabled) return;

    setIsCapturing(true);
    
    // Pequeño delay para feedback visual
    setTimeout(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setLastCapture(imageSrc);
      
      // Crear elemento imagen para procesamiento
      const img = new Image();
      img.onload = () => {
        onCapture(img);
        setIsCapturing(false);
      };
      img.onerror = () => {
        console.error('Error loading captured image');
        setIsCapturing(false);
      };
      img.src = imageSrc;
    }, 200);
  }, [webcamRef, onCapture, disabled]);

  const switchCamera = () => {
    if (disabled) return;
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    setIsLoading(true);
  };

  const retakePhoto = () => {
    setLastCapture(null);
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    console.error('Error loading webcam');
  };

  return (
    <div className="space-y-6">
      {/* Header Mejorado */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#F15F79] to-[#4C2D4D] rounded-xl flex items-center justify-center">
            <FaVideo className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#082543] font-serif">
              Captura en Tiempo Real
            </h3>
            <p className="text-[#082543]/60 text-sm">
              {facingMode === 'user' ? 'Cámara frontal' : 'Cámara trasera'}
            </p>
          </div>
        </div>

        <button
          onClick={switchCamera}
          disabled={disabled}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300
            ${disabled 
              ? 'bg-[#082543]/20 text-[#082543]/40 cursor-not-allowed' 
              : 'bg-gradient-to-r from-[#258CAB] to-[#082543] text-white hover:shadow-lg transform hover:scale-105'
            }
          `}
        >
          <FaSync className="w-4 h-4" />
          <span className="text-sm">
            {facingMode === 'user' ? 'Trasera' : 'Frontal'}
          </span>
        </button>
      </div>

      {/* Webcam o Preview */}
      {!lastCapture ? (
        <div className="relative bg-gradient-to-br from-[#082543]/5 to-[#258CAB]/5 rounded-2xl p-2 border border-[#082543]/10">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/80 backdrop-blur-sm rounded-xl">
              <div className="text-center">
                <div className="relative mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#F15F79] to-[#258CAB] rounded-2xl animate-spin">
                    <div className="absolute inset-2 bg-white rounded-lg"></div>
                  </div>
                  <FaCamera className="w-5 h-5 text-[#082543] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-[#082543] font-medium">Inicializando cámara...</p>
              </div>
            </div>
          )}

          <div className="relative rounded-xl overflow-hidden">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              onUserMedia={handleVideoLoad}
              onUserMediaError={handleVideoError}
              className="w-full h-64 object-cover rounded-xl shadow-lg transition-all duration-500"
              style={{ 
                filter: isCapturing ? 'brightness(0.8)' : 'brightness(1)',
                transform: isCapturing ? 'scale(1.02)' : 'scale(1)'
              }}
            />
            
            {/* Overlay de Guía Mejorado */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 border-2 border-white/80 border-dashed rounded-xl opacity-70 shadow-2xl"></div>
            </div>

            {/* Indicador de Estado */}
            <div className="absolute top-3 left-3 flex items-center space-x-2 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
              <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-400' : 'bg-green-400'} animate-pulse`}></div>
              <span>{isLoading ? 'Conectando...' : 'Cámara activa'}</span>
            </div>

            {/* Efecto de Captura */}
            {isCapturing && (
              <div className="absolute inset-0 bg-white animate-ping opacity-30 rounded-xl"></div>
            )}
          </div>
        </div>
      ) : (
        <div className="relative bg-gradient-to-br from-[#082543]/5 to-[#258CAB]/5 rounded-2xl p-2 border border-[#082543]/10">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={lastCapture}
              alt="Captura dermatológica"
              className="w-full h-64 object-cover rounded-xl shadow-2xl transition-all duration-500"
            />
            
            {/* Badge de Estado Mejorado */}
            <div className="absolute top-3 right-3 bg-gradient-to-r from-[#258CAB] to-[#082543] text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg backdrop-blur-sm">
              <div className="flex items-center space-x-1">
                <FaCheck className="w-3 h-3" />
                <span>Captura exitosa</span>
              </div>
            </div>

            {/* Overlay de Información */}
            <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs p-3 rounded-lg">
              <p className="font-medium">Imagen lista para análisis</p>
              <p className="text-white/70 mt-1">Resolución: 1280×720 px</p>
            </div>
          </div>
        </div>
      )}

      {/* Botones de Control Mejorados */}
      <div className="flex justify-center space-x-4">
        {!lastCapture ? (
          <button
            onClick={capture}
            disabled={disabled || isLoading}
            className={`
              relative p-5 rounded-2xl shadow-2xl transition-all duration-300 transform
              ${disabled || isLoading
                ? 'bg-[#082543]/20 cursor-not-allowed scale-95' 
                : 'bg-gradient-to-r from-[#F15F79] to-[#4C2D4D] hover:shadow-3xl hover:scale-110 active:scale-105'
              }
            `}
          >
            <div className="relative">
              <FaCircle className={`w-8 h-8 ${disabled || isLoading ? 'text-[#082543]/40' : 'text-white'}`} />
              {isCapturing && (
                <div className="absolute inset-0 bg-white rounded-full animate-ping"></div>
              )}
            </div>
            
            {/* Efecto de brillo en hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </button>
        ) : (
          <div className="flex space-x-3 w-full">
            <button
              onClick={retakePhoto}
              disabled={disabled}
              className={`
                flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-semibold transition-all duration-300
                ${disabled 
                  ? 'bg-[#082543]/20 text-[#082543]/40 cursor-not-allowed' 
                  : 'bg-white text-[#082543] border border-[#082543]/20 hover:bg-[#082543] hover:text-white hover:shadow-lg transform hover:scale-105'
                }
              `}
            >
              <FaRedo className="w-4 h-4" />
              <span>Volver a tomar</span>
            </button>
            <button
              onClick={() => {
                const img = new Image();
                img.src = lastCapture;
                onCapture(img);
              }}
              disabled={disabled}
              className={`
                flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-semibold transition-all duration-300
                ${disabled 
                  ? 'bg-[#082543]/20 text-[#082543]/40 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-[#258CAB] to-[#082543] text-white hover:shadow-lg transform hover:scale-105'
                }
              `}
            >
              <FaCheck className="w-4 h-4" />
              <span>Usar esta foto</span>
            </button>
          </div>
        )}
      </div>

      {/* Panel de Instrucciones Mejorado */}
      <div className="bg-gradient-to-br from-[#258CAB]/10 to-[#082543]/5 rounded-2xl p-5 border border-[#258CAB]/20 backdrop-blur-sm">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#258CAB] to-[#082543] rounded-xl flex items-center justify-center">
            <FaLightbulb className="text-white w-4 h-4" />
          </div>
          <h4 className="text-sm font-semibold text-[#082543]">
            📸 Consejos para Captura Óptima
          </h4>
        </div>
        
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-[#F15F79] rounded-full mt-1.5 flex-shrink-0"></div>
            <span className="text-[#082543]/80">Mantenga la cámara estable y enfocada</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-[#F15F79] rounded-full mt-1.5 flex-shrink-0"></div>
            <span className="text-[#082543]/80">Use buena iluminación natural</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-[#F15F79] rounded-full mt-1.5 flex-shrink-0"></div>
            <span className="text-[#082543]/80">Acérquese para ver detalles claros</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-[#F15F79] rounded-full mt-1.5 flex-shrink-0"></div>
            <span className="text-[#082543]/80">Evite sombras sobre el área</span>
          </div>
        </div>
      </div>

      {/* Advertencia de Permisos */}
      {!isLoading && !webcamRef.current?.stream && (
        <div className="bg-gradient-to-r from-[#F15F79]/10 to-[#4C2D4D]/10 border border-[#F15F79]/30 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <FaExclamationTriangle className="w-5 h-5 text-[#F15F79] flex-shrink-0" />
            <div>
              <p className="text-[#082543] font-medium text-sm">Permisos de cámara requeridos</p>
              <p className="text-[#082543]/70 text-xs mt-1">
                Por favor, permita el acceso a la cámara para usar esta función
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;