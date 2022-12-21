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
      // padding: {
      //   DEFAULT: '1rem',
      //   sm: '2rem',
      //   lg: '4rem',
      //   xl: '5rem',
      //   '2xl': '6rem',
      // },
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
