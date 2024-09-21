/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'pokemon-pattern': "url('/bg.png')", // Adicione sua imagem de fundo
        'card': "url('/card.png')", // Adicione sua imagem de fundo
      }
    },
  },
  plugins: [],
}