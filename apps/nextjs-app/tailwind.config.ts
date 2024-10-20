import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const tailwindConfig: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    // '../../node_modules/primereact/**/*.esm.js',
    // '../../node_modules/primereact/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      ...defaultTheme.screens,
    },
    fontFamily: {
      sans: [
        'var(--font-family-text-primary)',
        ...defaultTheme.fontFamily.sans,
      ],
    },
    extend: {
      fontFamily: {
        'family-inter': [
          'var(--font-family-inter)',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      colors: {
        'brand-color': {
          50: 'hsl(150, 27%, 92%)',
          100: 'hsl(150, 27%, 88%)',
          200: 'hsl(150, 27%, 85%)',
          300: 'hsl(150, 27%, 82%)',
          400: 'hsl(150, 27%, 78%)',
          DEFAULT: 'hsl(150, 27%, 78%)',
          500: 'hsl(150, 27%, 74%)',
          600: 'hsl(150, 27%, 71%)',
          700: 'hsl(150, 27%, 67%)',
          800: 'hsl(150, 27%, 62%)',
          900: 'hsl(150, 27%, 45%)',
        },
      },
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
  ],
};

export default tailwindConfig;
