/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        majorelle: {
          50: '#E8F0F8',
          100: '#D1E1F1',
          200: '#A3C3E3',
          300: '#75A5D5',
          400: '#4787C7',
          500: '#1B4D89',
          600: '#163D6E',
          700: '#112E52',
          800: '#0B1F37',
          900: '#060F1B',
        },
        terre: {
          50: '#FDF2EE',
          100: '#FAE5DD',
          200: '#F5CCBB',
          300: '#F0B299',
          400: '#EB9977',
          500: '#C75B39',
          600: '#9F492E',
          700: '#773722',
          800: '#4F2517',
          900: '#27120B',
        },
        safran: {
          50: '#FCF8ED',
          100: '#F9F1DB',
          200: '#F3E3B7',
          300: '#EDD593',
          400: '#E7C76F',
          500: '#D4A843',
          600: '#AA8636',
          700: '#7F6529',
          800: '#55431C',
          900: '#2A220E',
        },
        cream: {
          50: '#FDFCFA',
          100: '#FBF9F5',
          200: '#F7F3EB',
          300: '#F5F0E8',
          400: '#F0E9DD',
          500: '#EBE2D3',
          600: '#D4C9B8',
          700: '#BDB09D',
          800: '#A69782',
          900: '#8F7E67',
        },
      },
      fontFamily: {
        'amiri': ['Amiri', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'moroccan': '2rem 0.5rem 2rem 0.5rem',
        'moroccan-reverse': '0.5rem 2rem 0.5rem 2rem',
        'arch': '50% 50% 0 0 / 30% 30% 0 0',
      },
      backgroundImage: {
        'zellige-pattern': "url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23D4A843\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
