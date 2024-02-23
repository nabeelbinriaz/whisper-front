/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          inter: ['Inter', 'sans'],
          handlee: ['Handlee', 'cursive'],
          playfair: ['Playfair Display', 'serif'],
          poppins: ['Poppins', 'sans-serif'],
          raleway: ['Raleway', 'sans-serif'], // Add Raleway font
          helvetica: ['Helvetica', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  