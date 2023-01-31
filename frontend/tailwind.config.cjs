/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        solid: '0.4rem 0.4rem 0px -3px rgba(0,0,0,1)'
      }
    }
  },
  plugins: []
}
