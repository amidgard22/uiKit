import type { Config } from 'tailwindcss';
import { colors } from './src/tokens/colors';

const preset: Partial<Config> = {
  theme: {
    extend: {
      colors,
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },
};

export default preset;
