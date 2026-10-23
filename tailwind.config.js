/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Royal Navy Brand Palette
        navy: {
          DEFAULT: '#142B4A', // Core Brand Navy
          50: '#F0F4F9',
          100: '#DCE5F1',
          200: '#BACCE1',
          300: '#8FAECD',
          400: '#5F8DBA',
          500: '#2A5D94',
          600: '#1C3E6A',
          700: '#142B4A', // Primary Navy
          800: '#0E1F35',
          900: '#091424',
          950: '#050B14',
          dark: '#0D1C30',
          deep: '#081220',
        },
        // Gold Accent Palette
        gold: {
          DEFAULT: '#C9A45C', // Core Brand Gold
          light: '#DFC07C',
          lighter: '#F3E5C3',
          dark: '#B08B42',
          hover: '#B89047',
          50: '#FDFBF7',
          100: '#F9F3E5',
          200: '#F2E4C4',
          300: '#E7CE97',
          400: '#D8B76E',
          500: '#C9A45C',
          600: '#B89047',
          700: '#947032',
          800: '#715324',
          900: '#523B17',
        },
        // Off-White Section Backgrounds
        offwhite: {
          DEFAULT: '#F8F6F1', // Core Section Background
          50: '#FCFBF9',
          100: '#F8F6F1',
          200: '#EFEBE1',
          300: '#E4DDD0',
        },
        card: '#FFFFFF',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-playfair)', 'var(--font-lora)', 'Georgia', 'serif'],
        serif: ['var(--font-playfair)', 'var(--font-lora)', 'Georgia', 'serif'],
        body: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(20, 43, 74, 0.06)',
        'card': '0 10px 30px -4px rgba(20, 43, 74, 0.08), 0 4px 10px -2px rgba(20, 43, 74, 0.04)',
        'card-hover': '0 20px 40px -8px rgba(20, 43, 74, 0.14), 0 8px 16px -4px rgba(20, 43, 74, 0.06)',
        'premium': '0 25px 50px -12px rgba(20, 43, 74, 0.20)',
        'gold': '0 10px 25px -5px rgba(201, 164, 92, 0.35)',
        'gold-glow': '0 0 30px rgba(201, 164, 92, 0.25)',
      },
      transitionDuration: {
        DEFAULT: '250ms',
      },
    },
  },
  plugins: [],
}
