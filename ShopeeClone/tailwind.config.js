/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        logo: '#EE4D2D',
        customOrange: 'rgb(238, 77, 45)'
      }
    },
  },
  plugins: [],
}

