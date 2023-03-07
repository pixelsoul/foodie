/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['sans-serif'],
    },
    extend: {
      colors: {
        'foodie-light-brown': '#F0EEE0',
        'foodie-brown': '#BF8B37',
        'foodie-dark-brown': '#221909',
        'foodie-dark-brown-2': '#291e0b',
        'foodie-white': '#FEFEFE',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',

        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '192': '48rem',
        '256': '64rem'
      },
    },
    plugins: [],
  }
}