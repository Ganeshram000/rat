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
        // Terracotta + Beige Brand Colors
        terracotta: {
          DEFAULT: '#A3452F', // Primary Terracotta
          50: '#FDF7F5',
          100: '#F9ECE8',
          200: '#F2D5CD',
          300: '#E7B3A6',
          400: '#D68A77',
          500: '#BA573F',
          600: '#A3452F', // Core Primary
          700: '#863725',
          800: '#6E2D1E',
          900: '#5A261A',
          hover: '#8C3925',
          light: '#FBF0EC',
        },
        beige: {
          DEFAULT: '#FAF6EE', // Warm Beige Background
          50: '#FDFBF7',
          100: '#FAF6EE', // Page Background
          200: '#F3E7DA', // Light Section Background
          300: '#E8D7C4',
          400: '#DCBEA2',
        },
        sand: {
          DEFAULT: '#D9A373', // Accent Sand
          light: '#E6BD97',
          dark: '#B87E4A',
          50: '#FBF5EF',
          100: '#F6EADA',
        },
        brown: {
          dark: '#5B3A2E', // Dark Brown Headings & Text
          medium: '#8D6E63', // Medium Text
          light: '#BCAAA4',
          deep: '#3D261E',
        },
        card: '#FFFFFF',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-lora)', 'Georgia', 'serif'],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        body: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(91, 58, 46, 0.06)',
        'card': '0 10px 30px -4px rgba(91, 58, 46, 0.08), 0 4px 10px -2px rgba(91, 58, 46, 0.04)',
        'premium': '0 20px 40px -8px rgba(91, 58, 46, 0.12)',
        'terracotta': '0 10px 25px -5px rgba(163, 69, 47, 0.28)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
}
