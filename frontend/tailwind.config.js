export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: '#0b0b0b',
        surface: '#121212',
        accent: '#4f46e5',
        accentSoft: '#6366f1',
        textMuted: '#9ca3af',
        brand: '#22d3ee', 
      },
    },
  },
  plugins: [],
};
