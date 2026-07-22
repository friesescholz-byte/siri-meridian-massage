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
          50: '#FCF9F2',
          100: '#F7F0E1',
          200: '#EEDFB8',
          300: '#E2C787',
          400: '#D9A24A', // Warm Gold
          500: '#C28B38',
          600: '#A16E28',
          700: '#7F521E',
          800: '#5F3C18',
          900: '#422812',
        },
        dark: {
          900: '#0B0D12', // Obsidian Deep
          800: '#121621', // Charcoal Slate
          700: '#1B2130',
          600: '#2A3347',
        },
        emerald: {
          900: '#0D211A',
          800: '#15362B',
          700: '#214F40',
          500: '#397B65',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
