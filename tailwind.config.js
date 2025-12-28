/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pesca-blue': '#1e3a8a',
        'pesca-cyan': '#0ea5e9',
        'pesca-orange': '#f97316',
      }
    },
  },
}