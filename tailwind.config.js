/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./wiki/**/*.html"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '400px'
      },
      fontFamily: {
        'jost': ['Jost', 'sans-serif'],
        'kaisei-decol': ['Kaisei Decol', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'archivo': ['Archivo', 'sans-serif'],
      },
      spacing: {
        '88': '22rem',
      },
      colors: {
        'primary-light': "#99bf8f",
        'primary-medium': "#285a06",
        'primary-dark': "#0b2b16",
        'font-light': "#fbf7f0",
        'font-medium': "#cdc1b6",
        'accent-orange': "#de601e",
        'accent-blue': "#559dbc",
        'accent-turquoise': '#028d81',
      }
    }
  },
  plugins: [],
}

