/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#050505',
        neonPurple: '#8B5CF6',
        sage: '#A3B18A',
        glass: 'rgba(255, 255, 255, 0.03)',
      },
      fontFamily: {
        display: ['Clash Display', 'sans-serif'],
      },
    },
  },
  plugins: [],
}