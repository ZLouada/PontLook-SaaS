import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}', './content/**/*.mdx'],
  theme: {
    extend: {
      screens: {
        xs: '400px',
      },
      colors: {
        background: '#08090A',
        'background-dark': '#08090A',
        'canvas-dark': '#08090A',
        'card-base': '#0F1013',
        'card-inner': '#16171B',
        'card-border': '#26282D',
        foreground: '#FFFFFF',
        muted: '#16171B',
        'muted-foreground': '#A1A1AA',
        accent: '#0052FF',
        'accent-secondary': '#4D7CFF',
        'accent-foreground': '#FFFFFF',
        border: '#26282D',
        card: '#0F1013',
        ring: '#0052FF',
        primary: {
          DEFAULT: '#0052FF',
          50: '#EFF4FF',
          100: '#DBE5FF',
          200: '#BFCEFF',
          300: '#93ADFF',
          400: '#4D7CFF',
          500: '#0052FF',
          600: '#003EE0',
          700: '#0030B8',
          800: '#002894',
          900: '#071026',
        },
        secondary: {
          DEFAULT: '#4D7CFF',
          50: '#F5F8FF',
          100: '#EAF1FF',
          200: '#CADBFF',
          300: '#AAC5FF',
          400: '#6B98FF',
          500: '#4D7CFF',
          600: '#3162CC',
          700: '#254A99',
          800: '#183166',
          900: '#0C1833',
        },
        // Fallbacks for existing component class names
        ink: '#1E293B',
        body: '#475569',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['var(--font-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif'],
        body: ['var(--font-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        // Elevation ramp for the dark canvas. Each step adds spread and depth
        // rather than opacity, so cards stay separable against #08090A.
        e1: '0 1px 2px 0 rgba(0, 0, 0, 0.55)',
        e2: '0 4px 12px -2px rgba(0, 0, 0, 0.6), 0 2px 4px -2px rgba(0, 0, 0, 0.45)',
        e3: '0 12px 28px -6px rgba(0, 0, 0, 0.7), 0 4px 10px -4px rgba(0, 0, 0, 0.5)',
        e4: '0 28px 64px -12px rgba(0, 0, 0, 0.8), 0 10px 24px -8px rgba(0, 0, 0, 0.6)',
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(0, 0, 0, 0.35)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.35)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.55), 0 4px 6px -2px rgba(0, 0, 0, 0.4)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
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
