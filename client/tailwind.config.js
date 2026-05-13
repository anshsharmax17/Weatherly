/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
      boxShadow: { glow: '0 24px 80px rgba(14, 165, 233, 0.28)' },
      animation: { float: 'float 7s ease-in-out infinite', pulseSoft: 'pulseSoft 2s ease-in-out infinite' },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-18px)' } },
        pulseSoft: { '0%, 100%': { opacity: 0.72 }, '50%': { opacity: 1 } }
      }
    }
  },
  plugins: []
};
