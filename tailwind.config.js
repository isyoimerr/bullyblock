/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        azul: { 900: '#12307A', 700: '#1B4F9C', 500: '#2D8CF0', 100: '#EAF1FB' },
        verde: { 700: '#23803A', 500: '#4CAF2A', 100: '#E8F5E9' },
        fondo: '#F6F9FC',
        texto: '#1B2437',
        suave: '#5A6478',
        borde: '#DDE5EF',
        ambar: { 500: '#F5A623', 100: '#FFF6E5', 800: '#9A5B00' },
        rojo: { 600: '#D93B3B', 100: '#FDECEC' },
      },
      fontFamily: {
        titulo: ['"Bungee"', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        cuerpo: ['"Nunito Sans"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
      },
      boxShadow: { card: '0 6px 20px rgba(18,48,122,0.10)' },
    },
  },
  plugins: [],
}
