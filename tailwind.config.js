/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
     colors: {
      'custom-black': "#000000",
      'custom-white': "#ffffff",
      'custom-error': "#FF0000",
      'custom-lightgrey':"#e9e9e9",
      'custom-gray':"#4D4D4D" ,
      'blue':"#315E7F"
    },
  }
  },
  plugins: [],
}