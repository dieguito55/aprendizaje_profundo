import React, { useState, useRef, useEffect } from 'react';
import { FaCamera, FaVideo, FaVideoSlash, FaCheckCircle, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

const WebcamCapture = ({ onCapture, disabled = false }) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState(null);

  const startWebcam = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment'
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      setIsStreaming(true);
    } catch (err) {
      console.error('Error al acceder a la cámara:', err);
      setError('No se pudo acceder a la cámara. Verifique los permisos.');
    }
  };

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsStreaming(false);
    }
  };

  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0);

    const imageData = canvas.toDataURL('image/jpeg', 0.95);
    setCapturedImage(imageData);

    const img = new Image();
    img.onload = () => {
      onCapture(img);
    };
    img.src = imageData;

    stopWebcam();
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    onCapture(null);
    startWebcam();
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="space-y-4">
      {/* Área de video/captura */}
      <div className="relative bg-neutral-900 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow-lg">
        {!capturedImage ? (
          <div className="relative aspect-video">
            {isStreaming ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay guía */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 border-4 border-[#A8D32C]/30 m-12 rounded-lg"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-[#A8D32C]/50 rounded-full"></div>
                </div>

                {/* Indicador de transmisión */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-lg shadow-lg">
                  <div className="w-2 h-2 bg-white dark:bg-neutral-900 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold">EN VIVO</span>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full bg-neutral-800 text-neutral-400 dark:text-neutral-500">
                <div className="text-center p-8">
                  <FaCamera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-semibold">Cámara no iniciada</p>
                  <p className="text-sm mt-2 opacity-75">Haga clic en iniciar cámara</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="relative aspect-video">
            <img
              src={capturedImage}
              alt="Captura"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-[#A8D32C]/100 text-white px-3 py-1.5 rounded-lg shadow-lg">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="w-4 h-4" />
                <span className="text-xs font-bold">CAPTURADA</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <FaExclamationTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Controles */}
      <div className="flex gap-3">
        {!isStreaming && !capturedImage && (
          <button
            onClick={startWebcam}
            disabled={disabled}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-200 hover:shadow-lg dark:hover:shadow-neutral-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#A8D32C' }}
          >
            <FaVideo className="w-4 h-4" />
            Iniciar Cámara
          </button>
        )}

        {isStreaming && !capturedImage && (
          <>
            <button
              onClick={captureImage}
              disabled={disabled}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-200 hover:shadow-lg dark:hover:shadow-neutral-900/50 disabled:opacity-50"
              style={{ backgroundColor: '#A8D32C' }}
            >
              <FaCamera className="w-4 h-4" />
              Capturar Imagen
            </button>
            
            <button
              onClick={stopWebcam}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-all duration-200"
            >
              <FaVideoSlash className="w-4 h-4" />
              Detener
            </button>
          </>
        )}

        {capturedImage && (
          <>
            <button
              onClick={retakePhoto}
              disabled={disabled}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold text-sm transition-all duration-200 disabled:opacity-50"
            >
              <FaCamera className="w-4 h-4" />
              Tomar Otra Foto
            </button>
            
            <button
              onClick={() => {
                setCapturedImage(null);
                onCapture(null);
              }}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-all duration-200"
            >
              <FaTimes className="w-4 h-4" />
              Descartar
            </button>
          </>
        )}
      </div>

      {/* Información */}
      {!capturedImage && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <FaCamera className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                <strong className="font-semibold">Consejos para la captura:</strong> Centre la lesión en el círculo guía. 
                Asegúrese de tener buena iluminación y que la imagen esté enfocada antes de capturar.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
