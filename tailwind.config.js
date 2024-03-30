/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "primary-button-color": "var(--primary-button-color)"
      }
    },
  },
  plugins: [],
}