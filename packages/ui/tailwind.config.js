/** @type {import('tailwindcss').Config} */
module.exports = {
  presets:[
    require('../../apps/web/tailwind.config')
  ],
  content: ['./**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
};
