import React, { useRef, useState } from 'react';
import { 
  FaUpload, 
  FaImage, 
  FaCheckCircle, 
  FaLightbulb, 
  FaRuler,
  FaFileImage,
  FaCloudUploadAlt,
  FaTimes,
  FaCamera,
  FaShieldAlt,
  FaExclamationTriangle
} from 'react-icons/fa';

const ImageUpload = ({ onImageSelect, disabled = false }) => {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');

  const handleFileSelect = (file) => {
    if (!file || disabled) return;

    // Validaciones mejoradas
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      alert('Por favor, selecciona una imagen en formato JPG, PNG o WebP.');
      return;
    }

    if (file.size > maxSize) {
      alert('La imagen es demasiado grande. Tamaño máximo: 10MB.');
      return;
    }

    setFileName(file.name);
    setFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');

    const reader = new FileReader();
    reader.onloadstart = () => {
      // Podrías agregar un estado de carga aquí si lo deseas
    };
    
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      setPreviewUrl(imageUrl);
      
      // Crear elemento imagen para procesamiento
      const img = new Image();
      img.onload = () => {
        onImageSelect(img);
      };
      img.onerror = () => {
        alert('Error al cargar la imagen. Por favor, intenta con otra.');
        setPreviewUrl(null);
        setFileName('');
        setFileSize('');
      };
      img.src = imageUrl;
    };
    
    reader.onerror = () => {
      alert('Error al leer el archivo. Por favor, intenta nuevamente.');
    };
    
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && !disabled) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const clearImage = () => {
    setPreviewUrl(null);
    setFileName('');
    setFileSize('');
  };

  const handleAreaClick = () => {
    if (!disabled && !previewUrl) {
      fileInputRef.current?.click();
    }
  };

  const formatFileInfo = (name) => {
    if (name.length > 25) {
      return name.substring(0, 12) + '...' + name.substring(name.length - 10);
    }
    return name;
  };

  return (
    <div className="space-y-6">
      {/* Área de Upload Premium */}
      <div
        className={`
          relative border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-500 cursor-pointer
          backdrop-blur-xl
          overflow-hidden
          group
          ${disabled 
            ? 'border-[#342B7C]/20 bg-[#342B7C]/5 cursor-not-allowed opacity-60' 
            : isDragging
              ? 'border-[#8C7FE9] bg-gradient-to-br from-[#8C7FE9]/20 to-[#C19CFF]/20 shadow-2xl scale-105' 
              : previewUrl
                ? 'border-[#34C759]/50 bg-gradient-to-br from-[#34C759]/10 to-[#8C7FE9]/10'
                : 'border-[#342B7C]/30 hover:border-[#8C7FE9] hover:bg-gradient-to-br from-[#FDEEFD] to-[#D8DFF9] hover:shadow-2xl'
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleAreaClick}
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8C7FE9]/0 to-[#C19CFF]/0 group-hover:from-[#8C7FE9]/5 group-hover:to-[#C19CFF]/5 transition-all duration-500"></div>
        
        {/* Partículas flotantes */}
        {!disabled && !previewUrl && (
          <>
            <div className="absolute top-4 left-4 w-2 h-2 bg-[#8C7FE9] rounded-full opacity-0 group-hover:opacity-100 animate-float" style={{animationDelay: '0s'}}></div>
            <div className="absolute top-8 right-6 w-1.5 h-1.5 bg-[#C19CFF] rounded-full opacity-0 group-hover:opacity-100 animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-6 left-10 w-1 h-1 bg-[#8C7FE9] rounded-full opacity-0 group-hover:opacity-100 animate-float" style={{animationDelay: '2s'}}></div>
          </>
        )}

        <div className="relative z-10 space-y-6">
          {/* Icono Dinámico Premium */}
          <div className={`
            w-24 h-24 rounded-3xl flex items-center justify-center mx-auto transition-all duration-500
            relative
            ${disabled 
              ? 'bg-[#342B7C]/20' 
              : isDragging
                ? 'bg-gradient-to-br from-[#8C7FE9] to-[#C19CFF] shadow-2xl scale-110 rotate-12'
                : previewUrl
                  ? 'bg-gradient-to-br from-[#34C759] to-[#8C7FE9] shadow-2xl'
                  : 'bg-gradient-to-br from-[#342B7C] to-[#8C7FE9] shadow-2xl group-hover:shadow-3xl group-hover:scale-105 group-hover:rotate-3'
            }
          `}>
            {previewUrl ? (
              <FaCheckCircle className="w-10 h-10 text-white animate-pulse-scale" />
            ) : isDragging && !disabled ? (
              <FaCloudUploadAlt className="w-10 h-10 text-white animate-bounce" />
            ) : (
              <FaUpload className="w-10 h-10 text-white transform group-hover:scale-110 transition-transform duration-300" />
            )}
            
            {/* Efecto de glow */}
            <div className={`absolute -inset-2 rounded-3xl ${
              previewUrl ? 'bg-[#34C759]/20' : 'bg-[#8C7FE9]/20'
            } blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
          </div>
          
          {/* Texto Dinámico Premium */}
          <div className="space-y-3">
            <h3 className={`
              text-xl font-bold transition-colors duration-300 font-sans
              ${disabled ? 'text-[#342B7C]/40' : previewUrl ? 'text-[#34C759]' : 'text-[#342B7C]'}
            `}>
              {previewUrl 
                ? '✅ Imagen Lista' 
                : isDragging && !disabled 
                  ? '🎉 Suelta para Analizar' 
                  : 'Subir Imagen Dermatológica'
              }
            </h3>
            <p className={`
              text-[#342B7C]/70 transition-colors duration-300 font-light
              ${disabled ? 'text-[#342B7C]/30' : 'text-[#342B7C]/60'}
            `}>
              {disabled 
                ? 'Análisis en progreso...' 
                : previewUrl 
                  ? 'La imagen está lista para el análisis IA'
                  : 'Arrastra una imagen o haz clic para seleccionar'
              }
            </p>
          </div>

          {/* Especificaciones Técnicas Premium */}
          {!previewUrl && (
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
              {[
                { icon: FaFileImage, text: 'JPG, PNG, WebP', color: 'from-[#8C7FE9] to-[#342B7C]' },
                { icon: FaRuler, text: '224×224 px+', color: 'from-[#C19CFF] to-[#8C7FE9]' },
                { icon: FaShieldAlt, text: '10MB máx.', color: 'from-[#342B7C] to-[#8C7FE9]' }
              ].map((spec, index) => (
                <div 
                  key={index}
                  className={`
                    p-3 rounded-2xl backdrop-blur-sm transition-all duration-300 group/item
                    ${disabled ? 'bg-[#342B7C]/10' : 'bg-white/60 hover:bg-white/80 hover:scale-105'}
                  `}
                >
                  <div className={`w-8 h-8 bg-gradient-to-r ${spec.color} rounded-xl flex items-center justify-center mx-auto mb-2 group-hover/item:scale-110 transition-transform duration-300`}>
                    <spec.icon className="text-white w-3 h-3" />
                  </div>
                  <p className={`text-xs font-medium ${disabled ? 'text-[#342B7C]/30' : 'text-[#342B7C]/70'}`}>
                    {spec.text}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Botón de Acción Premium */}
          {!disabled && !previewUrl && (
            <button 
              className={`
                group/btn relative
                bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] text-white px-8 py-4 
                rounded-2xl 
                font-semibold 
                shadow-2xl hover:shadow-3xl 
                transition-all duration-500 
                transform hover:scale-105 
                border border-white/20
                flex items-center justify-center space-x-3 mx-auto
                overflow-hidden
              `}
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
              <FaImage className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Seleccionar Imagen</span>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/30 group-hover/btn:animate-shine transition-all duration-1000"></div>
            </button>
          )}
        </div>
      </div>

      {/* Preview de Imagen Premium */}
      {previewUrl && (
        <div className="
          bg-white/90 backdrop-blur-xl 
          rounded-3xl p-6 
          shadow-2xl 
          border border-white/40
          animate-fadeInUp
          relative
          overflow-hidden
        ">
          {/* Efectos de fondo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#34C759]/10 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[#34C759] to-[#8C7FE9] rounded-2xl flex items-center justify-center shadow-lg">
                  <FaCheckCircle className="text-white w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#342B7C] font-sans">Imagen Cargada</h4>
                  <p className="text-sm text-[#342B7C]/60 font-light">Lista para análisis IA</p>
                </div>
              </div>
              
              {!disabled && (
                <button
                  onClick={clearImage}
                  className="
                    group/clear
                    w-10 h-10 
                    bg-white/80 hover:bg-[#F15F79]/10 
                    rounded-xl 
                    flex items-center justify-center 
                    transition-all duration-300 
                    border border-white/40
                    hover:scale-110 hover:shadow-lg
                  "
                >
                  <FaTimes className="w-4 h-4 text-[#342B7C] group-hover/clear:text-[#F15F79] transition-colors duration-300" />
                </button>
              )}
            </div>
            
            {/* Contenedor de imagen premium */}
            <div className="relative group/image">
              <img
                src={previewUrl}
                alt="Preview de análisis dermatológico"
                className="w-full h-72 object-cover rounded-2xl shadow-lg group-hover/image:shadow-2xl transition-all duration-500"
              />
              
              {/* Badge de estado */}
              <div className="absolute top-4 right-4">
                <div className="
                  bg-gradient-to-r from-[#34C759] to-[#8C7FE9] 
                  text-white text-sm 
                  px-4 py-2 
                  rounded-full 
                  font-semibold 
                  shadow-lg 
                  backdrop-blur-sm
                  border border-white/20
                  flex items-center space-x-2
                  animate-pulse-slow
                ">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                  <span>Lista para Análisis</span>
                </div>
              </div>
              
              {/* Información del archivo mejorada */}
              <div className="
                absolute bottom-4 left-4 right-4 
                bg-black/80 backdrop-blur-lg 
                text-white 
                p-4 
                rounded-xl 
                opacity-0 group-hover/image:opacity-100 
                transition-all duration-500
                transform translate-y-2 group-hover/image:translate-y-0
              ">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{fileName}</p>
                    <p className="text-xs text-white/70 mt-1">{fileSize}</p>
                  </div>
                  <FaCamera className="w-4 h-4 text-white/60 flex-shrink-0 ml-3" />
                </div>
              </div>

              {/* Overlay de hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/image:opacity-100 rounded-2xl transition-opacity duration-300"></div>
            </div>

            {/* Información adicional */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-[#FDEEFD] rounded-xl p-3 text-center">
                <p className="text-xs text-[#342B7C]/60 font-medium">Archivo</p>
                <p className="text-sm font-semibold text-[#342B7C] truncate" title={fileName}>
                  {formatFileInfo(fileName)}
                </p>
              </div>
              <div className="bg-[#D8DFF9] rounded-xl p-3 text-center">
                <p className="text-xs text-[#342B7C]/60 font-medium">Tamaño</p>
                <p className="text-sm font-semibold text-[#342B7C]">{fileSize}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Panel de Recomendaciones Premium */}
      <div className="
        bg-gradient-to-br from-[#FDEEFD] to-[#D8DFF9]
        rounded-3xl p-6 
        border border-[#8C7FE9]/20 
        backdrop-blur-xl
        shadow-lg
        relative
        overflow-hidden
      ">
        {/* Efectos decorativos */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-[#8C7FE9]/10 rounded-full blur-2xl -translate-x-10 -translate-y-10"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] rounded-2xl flex items-center justify-center shadow-lg">
              <FaLightbulb className="text-white w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#342B7C] font-sans">
                Recomendaciones para Mejor Análisis
              </h4>
              <p className="text-sm text-[#342B7C]/60 font-light">
                Siga estas pautas para resultados óptimos
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Buena iluminación y enfoque nítido",
              "La lesión debe ocupar 50%+ de la imagen", 
              "Fondo neutro preferiblemente",
              "Evite filtros o ediciones excesivas",
              "Múltiples ángulos si es posible",
              "Imagen en alta resolución (mín. 224px)"
            ].map((tip, index) => (
              <div 
                key={index}
                className="flex items-start space-x-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm group/tip hover:bg-white/70 transition-all duration-300"
              >
                <div className="w-6 h-6 bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/tip:scale-110 transition-transform duration-300">
                  <FaExclamationTriangle className="text-white w-2 h-2" />
                </div>
                <span className="text-sm text-[#342B7C]/80 font-light leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input File Oculto */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/jpeg, image/jpg, image/png, image/webp"
        onChange={(e) => handleFileSelect(e.target.files[0])}
        disabled={disabled}
      />

      {/* Estilos de animación personalizados */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-scale {
          animation: pulse-scale 2s ease-in-out infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shine {
          animation: shine 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default ImageUpload;