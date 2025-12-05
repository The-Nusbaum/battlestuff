/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': ['0.625rem', { lineHeight: '0.75rem' }], // Example: 10px font size with 12px line height
      },
      backgroundImage: {
        'fade-red': 'linear-gradient(to right, transparent 0%, red 10%, red 90%, transparent 100%)',
      },
      fontFamily: {
        'distressed': ['Rubik Distressed', 'cursive'],
      },
    },
  },
  plugins: [],
}

