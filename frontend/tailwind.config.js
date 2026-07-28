/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pop': 'pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'typing': 'typing 3s steps(30, end) infinite',
        'btn-click': 'btnClick 3s infinite',
        'bounce-slight': 'bounceSlight 2s infinite',
        'status-change': 'statusChange 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pop: {
          '0%': { transform: 'scale(0.90)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        typing: {
          '0%': { width: '0' },
          '50%': { width: '100%' },
          '100%': { width: '100%' }
        },
        btnClick: {
          '0%, 40%': { transform: 'scale(1)', backgroundColor: '#dc2626' },
          '45%': { transform: 'scale(0.95)', backgroundColor: '#dc2626' },
          '50%, 90%': { transform: 'scale(1)', backgroundColor: '#16a34a' },
          '100%': { transform: 'scale(1)', backgroundColor: '#dc2626' }
        },
        bounceSlight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        statusChange: {
          '0%, 40%': { backgroundColor: '#fef3c7', color: '#b45309', opacity: '1' },
          '45%, 55%': { opacity: '0' },
          '60%, 100%': { backgroundColor: '#dcfce7', color: '#15803d', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}
