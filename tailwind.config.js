/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./app/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        'mta-blue': '#0039a6',
        'mta-orange': '#ff6319',
        'mta-lime': '#6cbe45',
        'mta-gray': '#a7a9ac',
        'mta-brown': '#996633',
        'mta-yellow': '#fccc0a',
        'mta-red': '#ee352e',
        'mta-green': '#00933c',
        'mta-purple': '#b933ad',
        'mta-dark-gray': '#808183'
      },
      minHeight: {
        '1/10': '10%',
        '1/4': '25%',
        '1/3': '33%',
        '1/2': '50%',
      }
    }
  },
  plugins: [],
}
