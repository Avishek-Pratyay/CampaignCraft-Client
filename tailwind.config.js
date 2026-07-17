/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0b0f19', // Deep space dark
          card: '#161f30', // Deep blue slate
          primary: '#8b5cf6', // Electric Violet
          secondary: '#14b8a6', // Turquoise Teal
          accent: '#f43f5e', // Coral Rose
          muted: '#94a3b8', // Cool Grey
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
