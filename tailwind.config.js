export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        headline: ['Outfit', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        brand: {
          purple: '#7c6fff',
          'purple-light': '#a89fff',
          'purple-dark': '#5646d7',
          green: '#00d97e',
          pink: '#ff6b9d',
          bg: '#080810',
          surface: '#13131b',
          card: '#1f1f28',
        }
      }
    },
  },
  plugins: [],
}
