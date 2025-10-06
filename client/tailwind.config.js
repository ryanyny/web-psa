/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mont: ['Montserrat', 'sans-serif'],
        hk: ['Hanken Grotesk', 'sans-serif'],
      },
      colors: {
        primary: {
          teal: '#14b8a6',
          blue: '#3b82f6',
        }
      }
    },
  },
  plugins: [],
}