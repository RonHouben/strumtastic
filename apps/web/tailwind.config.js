/** @type {import('tailwindcss').Config} */
module.exports = {
  ...require('ui/tailwind.config'),
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/page/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          50: '#edf8ff',
          100: '#d6efff',
          200: '#b5e4ff',
          300: '#83d5ff',
          400: '#48bcff',
          500: '#1e9aff',
          600: '#067aff',
          700: '#0066ff',
          800: '#084ec5',
          900: '#0d469b',
        },
        secondary: {
          50: '#f2f2ff',
          100: '#e9e8ff',
          200: '#d6d3ff',
          300: '#b7b0ff',
          400: '#9484ff',
          500: '#7252ff',
          600: '#602ef9',
          700: '#5b28e6',
          800: '#4417c0',
          900: '#39159d',
        },
        accent: {
          50: '#fdf2fb',
          100: '#fbe8f8',
          200: '#fad0f2',
          300: '#f7aae7',
          400: '#f076d4',
          500: '#e74dbf',
          600: '#d839a7',
          700: '#b91d85',
          800: '#991b6d',
          900: '#801b5d',
        },
        error: {
          50: '#fff0f1',
          100: '#ffdddf',
          200: '#ffc0c4',
          300: '#ff949c',
          400: '#ff5763',
          500: '#ff2333',
          600: '#ff0012',
          700: '#d7000f',
          800: '#b1030f',
          900: '#920a14',
        },
        warning: {
          50: '#fff9eb',
          100: '#ffeec6',
          200: '#ffda88',
          300: '#ffbe42',
          400: '#ffa920',
          500: '#f98407',
          600: '#dd5f02',
          700: '#b74006',
          800: '#94300c',
          900: '#7a290d',
        },
      },

      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
