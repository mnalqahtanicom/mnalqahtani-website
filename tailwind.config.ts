import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0B1F3A',
        slate: '#33415C',
        gold: {
          DEFAULT: '#C8A24B',
          soft: '#D8BD7E',
        },
        ivory: '#F7F5F0',
        ink: '#11161D',
        muted: '#6B7280',
        teal: '#1F6F6B',
      },
      fontFamily: {
        // Latin
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        // Arabic
        'serif-ar': ['var(--font-serif-ar)', 'sans-serif'],
        'sans-ar': ['var(--font-sans-ar)', 'sans-serif'],
      },
      maxWidth: {
        content: '1180px',
      },
      boxShadow: {
        card: '0 20px 40px -24px rgba(11,31,58,0.4)',
        portrait: '0 30px 60px -20px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
};

export default config;
