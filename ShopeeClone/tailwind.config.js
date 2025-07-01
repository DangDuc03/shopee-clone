import { kMaxLength } from 'buffer'

const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        logo: '#EE4D2D',
        customOrange: 'rgb(238, 77, 45)'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        // Custom class: custom-container
        '.custom-container': {
          maxWidth: '80rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '2rem',
          paddingRight: '2rem'
        }
      })
    })
  ]
}
