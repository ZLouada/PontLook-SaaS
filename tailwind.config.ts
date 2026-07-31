import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}', './content/**/*.mdx'],
  theme: {
    extend: {
      colors: {
        background: '#FAFAFA',
        'background-dark': '#0F172A',
        foreground: '#0F172A',
        muted: '#F1F5F9',
        'muted-foreground': '#64748B',
        accent: '#0052FF',
        'accent-secondary': '#4D7CFF',
        'accent-foreground': '#FFFFFF',
        border: '#E2E8F0',
        card: '#FFFFFF',
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
        ink: '#0F172A',
        body: '#64748B',
      },
      fontFamily: {
        serif: ['var(--font-calistoga)', 'Georgia', 'serif'],
        heading: ['var(--font-calistoga)', 'var(--font-heading)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.07)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.07)',
        lifted: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        accent: '0 4px 14px rgba(0, 82, 255, 0.25)',
        'accent-lg': '0 10px 25px -5px rgba(0, 82, 255, 0.35)',
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
