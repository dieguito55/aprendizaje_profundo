import React, { useRef, useState } from 'react';
import { 
  FaUpload, 
  FaImage, 
  FaCheckCircle, 
  FaLightbulb, 
  FaRuler,
  FaFileImage,
  FaCloudUploadAlt,
  FaTimes
} from 'react-icons/fa';

const ImageUpload = ({ onImageSelect, disabled = false }) => {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileSelect = (file) => {
    if (!file || disabled) return;

    // Validaciones básicas
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
  };

  const handleAreaClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-6">
      {/* Área de Upload Mejorada */}
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-500 cursor-pointer
          backdrop-blur-sm
          ${disabled 
            ? 'border-[#082543]/20 bg-[#082543]/5 cursor-not-allowed opacity-60' 
            : isDragging
              ? 'border-[#F15F79] bg-gradient-to-br from-[#F15F79]/10 to-[#258CAB]/10 shadow-2xl scale-105' 
              : 'border-[#082543]/20 hover:border-[#F15F79] hover:bg-gradient-to-br from-[#082543]/5 to-[#258CAB]/5 hover:shadow-xl'
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleAreaClick}
      >
        {/* Efecto de fondo para dragging */}
        {isDragging && !disabled && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#F15F79]/20 to-[#258CAB]/20 rounded-2xl animate-pulse"></div>
        )}

        <div className="relative z-10 space-y-4">
          {/* Icono Dinámico */}
          <div className={`
            w-20 h-20 rounded-2xl flex items-center justify-center mx-auto transition-all duration-300
            ${disabled 
              ? 'bg-[#082543]/20' 
              : isDragging
                ? 'bg-gradient-to-br from-[#F15F79] to-[#4C2D4D] shadow-2xl scale-110'
                : 'bg-gradient-to-br from-[#082543] to-[#4C2D4D] shadow-lg hover:shadow-xl hover:scale-105'
            }
          `}>
            {isDragging && !disabled ? (
              <FaCloudUploadAlt className="w-8 h-8 text-white animate-bounce" />
            ) : (
              <FaUpload className="w-8 h-8 text-white" />
            )}
          </div>
          
          {/* Texto Dinámico */}
          <div>
            <h3 className={`
              text-lg font-semibold mb-2 transition-colors duration-300
              ${disabled ? 'text-[#082543]/40' : 'text-[#082543]'}
            `}>
              {isDragging && !disabled ? 'Suelta la imagen aquí' : 'Subir Imagen Dermatológica'}
            </h3>
            <p className={`
              text-sm transition-colors duration-300
              ${disabled ? 'text-[#082543]/30' : 'text-[#082543]/60'}
            `}>
              {disabled ? 'Análisis en progreso...' : 'Arrastra una imagen o haz clic para seleccionar'}
            </p>
          </div>

          {/* Especificaciones Técnicas */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className={`p-2 rounded-lg backdrop-blur-sm ${disabled ? 'bg-[#082543]/10' : 'bg-white/50'}`}>
              <FaFileImage className={`w-3 h-3 mx-auto mb-1 ${disabled ? 'text-[#082543]/30' : 'text-[#258CAB]'}`} />
              <p className={disabled ? 'text-[#082543]/30' : 'text-[#082543]/60'}>JPG, PNG, WebP</p>
            </div>
            <div className={`p-2 rounded-lg backdrop-blur-sm ${disabled ? 'bg-[#082543]/10' : 'bg-white/50'}`}>
              <FaRuler className={`w-3 h-3 mx-auto mb-1 ${disabled ? 'text-[#082543]/30' : 'text-[#258CAB]'}`} />
              <p className={disabled ? 'text-[#082543]/30' : 'text-[#082543]/60'}>224×224 px+</p>
            </div>
            <div className={`p-2 rounded-lg backdrop-blur-sm ${disabled ? 'bg-[#082543]/10' : 'bg-white/50'}`}>
              <FaUpload className={`w-3 h-3 mx-auto mb-1 ${disabled ? 'text-[#082543]/30' : 'text-[#258CAB]'}`} />
              <p className={disabled ? 'text-[#082543]/30' : 'text-[#082543]/60'}>10MB máx.</p>
            </div>
          </div>

          {/* Botón de Acción */}
          {!disabled && (
            <button 
              className={`
                bg-gradient-to-r from-[#F15F79] to-[#4C2D4D] text-white px-6 py-3 rounded-xl 
                text-sm font-semibold hover:shadow-lg transition-all duration-300 
                transform hover:scale-105 border border-white/20
                flex items-center justify-center space-x-2 mx-auto
              `}
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              <FaImage className="w-4 h-4" />
              <span>Seleccionar Archivo</span>
            </button>
          )}
        </div>
      </div>

      {/* Preview de Imagen Mejorado */}
      {previewUrl && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 animate-fadeInUp">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-[#082543] flex items-center space-x-2">
              <FaCheckCircle className="w-5 h-5 text-[#258CAB]" />
              <span>Vista Previa</span>
            </h4>
            {!disabled && (
              <button
                onClick={clearImage}
                className="w-8 h-8 bg-[#082543]/10 hover:bg-[#F15F79]/10 rounded-lg flex items-center justify-center transition-colors duration-300 group"
              >
                <FaTimes className="w-3 h-3 text-[#082543] group-hover:text-[#F15F79]" />
              </button>
            )}
          </div>
          
          <div className="relative group">
            <img
              src={previewUrl}
              alt="Preview de análisis dermatológico"
              className="w-full h-64 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
            />
            <div className="absolute top-3 right-3 bg-gradient-to-r from-[#F15F79] to-[#4C2D4D] text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg backdrop-blur-sm">
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                <span>Lista para análisis</span>
              </div>
            </div>
            
            {/* Información del archivo */}
            <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="truncate font-medium">{fileName}</p>
            </div>
          </div>
        </div>
      )}

      {/* Panel de Recomendaciones Mejorado */}
      <div className="bg-gradient-to-br from-[#258CAB]/10 to-[#082543]/5 rounded-2xl p-5 border border-[#258CAB]/20 backdrop-blur-sm">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#258CAB] to-[#082543] rounded-xl flex items-center justify-center">
            <FaLightbulb className="text-white w-4 h-4" />
          </div>
          <h4 className="text-sm font-semibold text-[#082543]">
            📋 Recomendaciones para Imágenes Óptimas
          </h4>
        </div>
        
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-[#F15F79] rounded-full mt-1.5 flex-shrink-0"></div>
            <span className="text-[#082543]/80">Buena iluminación y enfoque nítido</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-[#F15F79] rounded-full mt-1.5 flex-shrink-0"></div>
            <span className="text-[#082543]/80">La lesión debe ocupar 50%+ de la imagen</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-[#F15F79] rounded-full mt-1.5 flex-shrink-0"></div>
            <span className="text-[#082543]/80">Fondo neutro preferiblemente</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-[#F15F79] rounded-full mt-1.5 flex-shrink-0"></div>
            <span className="text-[#082543]/80">Evite filtros o ediciones excesivas</span>
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
    </div>
  );
};

export default ImageUpload;