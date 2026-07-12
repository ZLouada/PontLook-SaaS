import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}', './content/**/*.mdx'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2451BF',
          50: '#F4F7FF',
          100: '#E4EBFF',
          200: '#C7D7FF',
          300: '#7FB8FF',
          400: '#3D7BFF',
          500: '#2451BF',
          600: '#1E44A3',
          700: '#183787',
          800: '#122A6B',
          900: '#0C1D4F',
        },
        ink: '#0F172A',
        body: '#475569',
        mist: '#F4F7FF',
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 30px -6px rgba(15, 23, 42, 0.08)',
        lifted: '0 20px 60px -12px rgba(36, 81, 191, 0.18)',
        glass: '0 8px 32px rgba(36, 81, 191, 0.12)',
        card: '0 2px 12px rgba(15, 23, 42, 0.05), 0 16px 40px -12px rgba(15, 23, 42, 0.08)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backgroundImage: {
        'sky-gradient': 'linear-gradient(180deg, #F4F7FF 0%, #FFFFFF 100%)',
        'hero-gradient': 'linear-gradient(135deg, #F4F7FF 0%, #FFFFFF 55%, #E4EBFF 100%)',
        'cta-gradient': 'linear-gradient(135deg, #2451BF 0%, #3D7BFF 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
