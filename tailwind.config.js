/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "xmd": "885px",
        'lg': '1115px',
        "mdl": "1265px"
      },
    },
  },
  plugins: [],
}

