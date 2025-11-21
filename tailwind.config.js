/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta corporativa dermatológica - Colores sólidos sin degradados
        primary: {
          DEFAULT: '#2F8F4E', // Verde principal corporativo
          50: '#F0F9F4',
          100: '#DCF2E4',
          200: '#B9E5C9',
          300: '#8DD4A8',
          400: '#5FBC83',
          500: '#2F8F4E', // Main
          600: '#267A40',
          700: '#1E6334',
          800: '#174F2A',
          900: '#124023',
        },
        accent: {
          DEFAULT: '#AEE6B6', // Verde claro para botones secundarios
          50: '#F5FDF7',
          100: '#E8F9EC',
          200: '#D4F3DA',
          300: '#AEE6B6', // Main
          400: '#8ED99E',
          500: '#6ECC86',
          600: '#51A667',
          700: '#3D8050',
          800: '#2E5F3C',
          900: '#234A2E',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E6E9EE', // Bordes / separación
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563', // Texto secundario
          700: '#374151',
          800: '#1F2937',
          900: '#0F172A', // Texto principal
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
        body: ['Inter', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(15, 23, 42, 0.05)',
        'md': '0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -1px rgba(15, 23, 42, 0.06)',
        'lg': '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.05)',
        'xl': '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 10px 10px -5px rgba(15, 23, 42, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}