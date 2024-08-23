/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gradient-1': '#57ddff',
        'gradient-2': '#c058f3',
        'cblue': {
          100: '#3a7bfd',
        },
        'gblue': {
          50: '#fafafa',
          100: '#e4e5f1',
          200: '#d2d3db',
          300: '#9394a5',
          400: '#484b6a',
        },
        'dblue': {
          100: '#e4e5f1',
          300: '#cacde8',
          400: '#777a92',
          500: '#4d5066',
          550: '#393a4c',
          600: '#25273c',
          700: '#161722',
        }
      }
    },
  },
  plugins: [],
}

