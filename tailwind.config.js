/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        harbor: {
          50: '#EEF3F2',
          100: '#D6E3E1',
          400: '#2F6E6A',
          600: '#164A47',
          800: '#0E2F2D',
          900: '#0A2422',
        },
        brass: {
          300: '#E4C989',
          400: '#C9A227',
          500: '#A8811B',
        },
        sand: '#FAF7F1',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
