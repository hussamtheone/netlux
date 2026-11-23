/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: { ink: '#16121d', panel: '#211b2c', line: '#3a3249', ember: '#ff4a3d', mist: '#b8aecb' },
      fontFamily: { display: ['"Bricolage Grotesque"', 'sans-serif'], body: ['Figtree', 'sans-serif'] }
    }
  },
  plugins: []
}
