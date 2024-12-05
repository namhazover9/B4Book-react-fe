/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        Green: '#1fdf64',
        Black: '#000',
        DeepNightBlack: '#121212',
        MidNightBlack: '#181818',
        EveningBlack: '#1a1a1a',
        DarkGray: '#282828',
        SlateGray: '#404040',
        LightGray: '#959595',
        SilverGray: '#B3B3B3',
        Snow: '#ffffff',
        ColorTabs: '#86A789',
      },
      fontFamily: {
        cairoRegular: ['cairo-regular', 'sans-serif'],
      },
      borderRadius: {
        'custom-7px': '7px',
      },
      animation: {
        popup: 'popup 0.3s ease-out forwards',
        expand: 'expand 0.5s ease-in-out',
      },
      keyframes: {
        popup: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        expand: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
};
