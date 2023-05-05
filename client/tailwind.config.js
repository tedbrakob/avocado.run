const colors = require('./src/static/colors.json');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: colors,
      fontFamily: {
        nunito: ['Nunito Sans']
      }
    },
    minWidth: {
      '1/3': '33.33%',
    }
  },
  plugins: [],
}
