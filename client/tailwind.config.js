/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    fontSize: {
      h1: '48px',
      h2: '32px',
      h3: '24px',
      h4: '20px',
      h5: '16px',
      h6: '14px',
      h7: '12px',
      h8: '10px',
    },
    colors: {
      myblack: '#444',
    },
  },
  plugins: [],
}
