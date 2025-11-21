import React, { useState, useRef } from 'react';
import { 
  FaUpload, 
  FaImage, 
  FaCheckCircle, 
  FaTimes,
  FaFileImage,
  FaCloudUploadAlt,
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
    
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      setPreviewUrl(imageUrl);
      
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageSelect(null);
  };

  const handleAreaClick = () => {
    if (!disabled && !previewUrl) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-4">
      {/* Input oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
        className="hidden"
        disabled={disabled}
      />

      {/* Área de Drop/Upload */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer
          ${disabled 
            ? 'border-neutral-300 bg-neutral-100 dark:bg-neutral-800 cursor-not-allowed opacity-60' 
            : isDragging
              ? 'border-[#A8D32C] bg-[#A8D32C]/10 shadow-lg scale-[1.02]' 
              : previewUrl
                ? 'border-[#A8D32C]/40 bg-[#A8D32C]/10'
                : 'border-neutral-300 hover:border-primary-400 hover:bg-neutral-50 dark:bg-neutral-900'
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleAreaClick}
      >
        {!previewUrl ? (
          <div className="space-y-4">
            {/* Icono Principal */}
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110" style={{ backgroundColor: '#A8D32C' }}>
                <FaCloudUploadAlt className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Texto */}
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {isDragging ? 'Suelta la imagen aquí' : 'Arrastra y suelta tu imagen'}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 dark:text-neutral-500 mb-4">
                o haz clic para seleccionar desde tu dispositivo
              </p>
              
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                disabled={disabled}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-200 hover:shadow-lg dark:hover:shadow-neutral-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#A8D32C' }}
              >
                <FaUpload className="w-4 h-4" />
                Seleccionar Imagen
              </button>
            </div>

            {/* Formatos aceptados */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <p className="text-xs text-neutral-500 dark:text-neutral-400 dark:text-neutral-500">
                <strong>Formatos aceptados:</strong> JPG, PNG, WebP
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 mt-1">
                <strong>Tamaño máximo:</strong> 10 MB
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Preview de la imagen */}
            <div className="relative inline-block">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-64 rounded-lg shadow-lg"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearImage();
                }}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-200 shadow-lg"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>

            {/* Info del archivo */}
            <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#C5E86C]/20 flex items-center justify-center">
                  <FaCheckCircle className="w-5 h-5 text-[#A8D32C]" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-bold text-neutral-900 dark:text-white truncate overflow-hidden max-w-full">{fileName}</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 dark:text-neutral-500">{fileSize}</p>
                </div>
              </div>
            </div>

            {/* Botón cambiar imagen */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearImage();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold text-sm transition-all duration-200"
            >
              <FaUpload className="w-4 h-4" />
              Cambiar Imagen
            </button>
          </div>
        )}
      </div>

      {/* Advertencias */}
      {!disabled && !previewUrl && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                <strong className="font-semibold">Importante:</strong> Asegúrese de que la imagen sea clara, 
                bien iluminada y que la lesión esté enfocada en el centro para obtener mejores resultados.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
