import React, { useState } from 'react';
import { FaTimes, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaEnvelope, FaKey } from 'react-icons/fa';
import { useAuth } from '../../contexts/useAuth';

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const result = login(email, password);
      
      if (result.success) {
        onClose();
        setEmail('');
        setPassword('');
        setShowForgotPassword(false);
      } else {
        setError(result.error);
      }
      setIsLoading(false);
    }, 800);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setError('');
  };

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-[420px] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl animate-scaleIn my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#A8D32C]/10 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#8ab824]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-all"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        <div className="relative p-5 sm:p-6">
          {/* Logo & Header - Ultra compacto */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white dark:bg-neutral-800 border-2 border-[#C5E86C] rounded-xl mb-2.5 shadow-md relative">
              <img 
                src="/logo.png" 
                alt="DermApp" 
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.classList.remove('hidden');
                  e.target.nextElementSibling.classList.add('block');
                }}
              />
              <svg 
                className="w-7 h-7 text-[#A8D32C] hidden" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                />
              </svg>
            </div>
            
            {!showForgotPassword ? (
              <>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Iniciar Sesión
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-xs">
                  Accede a tu cuenta profesional
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Recuperar Contraseña
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-xs">
                  Te enviaremos un enlace de recuperación
                </p>
              </>
            )}
          </div>
          {!showForgotPassword ? (
            <>
              {/* Social Login Buttons - Ultra compactos */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 px-2.5 py-2 bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                >
                  <FaGoogle className="w-3.5 h-3.5 text-red-500" />
                  Google
                </button>
                
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 px-2.5 py-2 bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                >
                  <FaFacebook className="w-3.5 h-3.5 text-blue-600" />
                  Facebook
                </button>
              </div>

              {/* Divider - Ultra compacto */}
              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200 dark:border-neutral-700"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 font-medium">
                    O con email
                  </span>
                </div>
              </div>

              {/* Login Form - Ultra compacto */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Error Message */}
                {error && (
                  <div className="p-2.5 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg animate-shake">
                    <p className="text-red-700 dark:text-red-400 text-xs font-medium flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {error}
                    </p>
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Correo Electrónico
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                      <FaEnvelope className="w-3.5 h-3.5 text-neutral-400 group-focus-within:text-[#A8D32C] transition-colors" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                      className="w-full pl-9 pr-2.5 py-2 bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg focus:border-[#A8D32C] focus:bg-white dark:focus:bg-neutral-900 focus:outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400 text-sm"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Contraseña
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                      <FaLock className="w-3.5 h-3.5 text-neutral-400 group-focus-within:text-[#A8D32C] transition-colors" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={8}
                      className="w-full pl-9 pr-9 py-2 bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg focus:border-[#A8D32C] focus:bg-white dark:focus:bg-neutral-900 focus:outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400 text-sm"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash className="w-3.5 h-3.5" /> : <FaEye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot Password */}
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-3.5 h-3.5 rounded border-neutral-300 text-[#A8D32C] focus:ring-[#A8D32C] focus:ring-offset-0"
                    />
                    <span className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200">
                      Recordarme
                    </span>
                  </label>
                  
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[#A8D32C] hover:text-[#8ab824] font-semibold transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-gradient-to-r from-[#A8D32C] to-[#8ab824] text-white font-bold rounded-lg hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group text-sm"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2 relative z-10">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verificando...
                    </span>
                  ) : (
                    <span className="relative z-10">Iniciar Sesión</span>
                  )}
                </button>

                {/* Sign Up Link */}
                <p className="text-center text-xs text-neutral-600 dark:text-neutral-400 pt-1">
                  ¿No tienes cuenta?{' '}
                  <button type="button" className="text-[#A8D32C] hover:text-[#8ab824] font-semibold transition-colors">
                    Regístrate
                  </button>
                </p>
              </form>
            </>
          ) : (
            /* Forgot Password Form - Más compacto */
            <form onSubmit={(e) => { e.preventDefault(); setError(''); setTimeout(() => { setShowForgotPassword(false); }, 1500); }} className="space-y-4">
              {error === '' && showForgotPassword && (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-lg">
                  <p className="text-blue-700 dark:text-blue-400 text-sm font-medium flex items-center gap-2">
                    <FaKey className="w-4 h-4" />
                    Revisa tu correo para restablecer
                  </p>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Correo Electrónico
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="w-4 h-4 text-neutral-400 group-focus-within:text-[#A8D32C] transition-colors" />
                  </div>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    required
                    className="w-full pl-10 pr-3 py-2.5 bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg focus:border-[#A8D32C] focus:bg-white dark:focus:bg-neutral-900 focus:outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400 text-sm"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#A8D32C] to-[#8ab824] text-white font-bold rounded-lg hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Enviar Enlace
              </button>

              <button
                type="button"
                onClick={handleBackToLogin}
                className="w-full py-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 font-semibold transition-colors text-sm"
              >
                ← Volver al inicio de sesión
              </button>
            </form>
          )}

          {/* Footer Security Badge - Más compacto */}
          <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <svg className="w-3.5 h-3.5 text-[#A8D32C]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Conexión segura y encriptada</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
          20%, 40%, 60%, 80% { transform: translateX(8px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoginModal;
