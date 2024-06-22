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
      'custom-grey': "rgb(211, 211, 211)",
      'custom-black-op': "#4C4C4C",
      'whitish-gray' :'#F3F3F5',
      'custom-error': "#FF0000",
      'custom-lightgrey':"#e9e9e9",
      'custom-gray':"#4D4D4D" ,
    },
  }
  },
  plugins: [],
}