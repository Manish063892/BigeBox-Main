/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        heartPop: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
      },
      animation: {
        'heart-pop': 'heartPop 0.3s ease-in-out',
      },
      backgroundColor: {
        'black': '#000000',
      }
    },
    fontFamily: {
      abc: ["Poppins", "sans-serif"],
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        'html, body': {
          backgroundColor: '#000000',
        },
      };
      addUtilities(newUtilities);
    }
  ],
};
