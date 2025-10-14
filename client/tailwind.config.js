/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Hanken Grotesk', 'sans-serif'],
      },
      colors: {
        primary: {
          teal: '#14b8a6',
          blue: '#3b82f6',
        },
        'brand-navy': '#003049',
        'brand-blue': '#3b82f6',
        'brand-pink': '#ef476f',
        'brand-light-gray': '#f8f9fa',
      }
    },
  },
  plugins: [import("@tailwindcss/typography")],
}