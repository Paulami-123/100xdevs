/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cedar: ['"Cedarville Cursive"', 'sans-serif'],
        dance: ['"Dancing Script"', 'sans-serif']
      }
    },
  },
  plugins: [],
}