/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        snow: {
          50: '#FAF0EA',
        },
        rose: {
          200: '#E9CECE',
        },
        mauve: {
          400: '#A69AAD',
        },
        ice: {
          200: '#C3D5E4',
        },
        slate: {
          600: '#7380A1',
        },
        fjord: {
          700: '#2D608F',
        },
        ink: {
          900: '#0f172a',
          700: '#1f2937',
        }
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(17,24,39,.06)',
        'md': '0 10px 20px rgba(45,96,143,.12), 0 4px 10px rgba(17,24,39,.06)',
        'lg': '0 22px 40px rgba(45,96,143,.18), 0 10px 20px rgba(17,24,39,.08)',
      },
      backgroundImage: {
        'grad-brand': 'linear-gradient(135deg, #C3D5E4, #2D608F)',
        'grad-rose': 'linear-gradient(135deg, #E9CECE, #A69AAD)',
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'pulse-glow': 'pulse-glow 2s infinite',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}