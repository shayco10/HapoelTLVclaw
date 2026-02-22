/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hapoel-red': '#E70013',
        'hapoel-dark': '#1a1a1a',
        'hapoel-white': '#ffffff',
      },
      fontFamily: {
        'hebrew': ['Heebo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
