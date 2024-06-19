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
        'primary-extra-light': "white",
        'primary-light': "white",
        'primary-medium': "#0E0D0F",
        'primary-dark': "#0E0D0F",
        'font-light': "#fbf7f0",
        'font-medium': "#cdc1b6",
        'accent-orange': "#de601e",
        'accent-blue': "#559dbc",
        'accent-turquoise': '#028d81',
        'accent-muted-purple': '#9593D9',
        'accent-saturated-purple': '#6622CC'
      }
    }
  },
  plugins: [],
}

