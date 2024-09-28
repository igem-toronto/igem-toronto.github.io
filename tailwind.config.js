/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ["./wiki/**/*.html"],
    extract: {
      html: (content) => {
        let matches = content.match(/[^<>"'`\s]*/g);
        matches = matches.map(match => {
          if (match.startsWith("scroll:") || match.startsWith("-scroll:")) {
            return match.substring(match.indexOf(":") + 1);
          } else {
            return match;
          }
        });

        return matches;
      },
    }
  },
  theme: {
    extend: {
      screens: {
        'xs': '400px'
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'playfair-display': ['Playfair Display', 'serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'roboto-mono': ['Roboto Mono', 'sans-serif'],
      },
      spacing: {
        '88': '22rem',
        '216': '54rem',
        '288': '72rem',
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
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
        'accent-light-purple': '#e0dffc',
        'accent-muted-purple': '#9593D9',
        'accent-saturated-purple': '#6622CC'
      }
    }
  },
  plugins: [],
}
