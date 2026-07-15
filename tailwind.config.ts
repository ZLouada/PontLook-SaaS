import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}', './content/**/*.mdx'],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        'background-dark': '#0F172A',
        foreground: '#0F172A',
        'foreground-muted': '#475569',
        primary: {
          DEFAULT: '#2451BF',
          50: '#F0F5FE',
          100: '#E1EBFE',
          200: '#C3D7FC',
          300: '#A4C2FA',
          400: '#6798F8',
          500: '#2451BF',
          600: '#1D4099',
          700: '#163073',
          800: '#0E204C',
          900: '#071026',
        },
        secondary: {
          DEFAULT: '#3D7BFF',
          50: '#F5F8FF',
          100: '#EAF1FF',
          200: '#CADBFF',
          300: '#AAC5FF',
          400: '#6B98FF',
          500: '#3D7BFF',
          600: '#3162CC',
          700: '#254A99',
          800: '#183166',
          900: '#0C1833',
        },
        border: '#E2E8F0',
        gradient: {
          violet: '#8B5CF6',
          magenta: '#E84FA0',
          blue: '#3B82F6',
          cyan: '#22D3EE',
        },
        // Fallbacks for existing component class names
        ink: '#0F172A',
        body: '#475569',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        card: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        lifted: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};

export default config;
