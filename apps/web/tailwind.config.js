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
      padding: '2rem',
    },
    extend: {},
  },
  plugins: [],
};
