/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#1E90FF",
        secondary: "#FF4500",
        accent: "#FFD700",
        error: "#FF0000",
        info: "#00BFFF",
        success: "#00FF00",
        warning: "#FFA500",

        "bg-body": "#F0EEE0",

        "bg-dark": "#1E1E1E",
      },
    },
    plugins: [],
  }
}