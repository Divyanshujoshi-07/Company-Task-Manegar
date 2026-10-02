/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // "Pine" — the single brand/interactive accent used across the app.
        primary: {
          50: '#eef4f1',
          100: '#d7e6de',
          200: '#b0cdbe',
          300: '#82ad9b',
          400: '#588f79',
          500: '#3d7461',
          600: '#2f5d50',
          700: '#274b41',
          800: '#213c35',
          900: '#1b312c',
        },
        // "Signal" — reserved for the presence-check prompt and overdue/urgent states only.
        signal: {
          50: '#fdf2ea',
          100: '#fbe1cc',
          400: '#dd8447',
          500: '#c1652b',
          600: '#a35323',
        },
        ink: '#12171a',
        paper: '#f4f6f1',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
};
