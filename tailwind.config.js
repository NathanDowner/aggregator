const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
      },
      rotate: {
        '-full': '-360deg',
      },
      animation: {
        'animate-spin-counterclockwise':
          'counterClockwise 500ms linear infinite',
      },
      keyframes: {
        counterClockwise: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  variants: {
    extend: {
      rotate: ['hover'],
    },
  },
  plugins: [],
};
