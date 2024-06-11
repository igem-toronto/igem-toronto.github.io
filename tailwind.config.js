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
        'playfair-display': ['Playfair Display', 'serif'],
        'roboto': ['Roboto Mono', 'sans-serif'],
      },
      spacing: {
        '88': '22rem',
      },
      colors: {
        'primary-extra-light': "#d8f0ef",
        'primary-light': "#a0d4f2",
        'primary-medium': "#6dacd1",
        'primary-dark': "#19425A",
        'font-light': "#fbf7f0",
        'font-medium': "#cdc1b6",
        'accent-orange': "#de601e",
        'accent-blue': "#559dbc",
        'accent-turquoise': '#028d81'
      }
    }
  },
  plugins: [],
}

