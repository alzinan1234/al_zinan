/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['var(--font-bebas)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        black: '#000000',
        white: '#ffffff',
        gray: {
          950: '#0a0a0a',
          900: '#111111',
          800: '#1a1a1a',
          700: '#2a2a2a',
          600: '#3a3a3a',
          500: '#555555',
          400: '#888888',
          300: '#aaaaaa',
        }
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
        scrollLine: 'scrollLine 2s ease-in-out infinite',
        glitch1: 'glitch1 8s infinite',
        glitch2: 'glitch2 8s infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        scrollLine: {
          '0%,100%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)' },
        },
        glitch1: {
          '0%,92%,100%': { transform: 'none', opacity: '0' },
          '93%': { transform: 'translateX(-3px)', opacity: '0.8' },
          '95%': { transform: 'translateX(3px)', opacity: '0.8' },
          '97%': { transform: 'none', opacity: '0' },
        },
        glitch2: {
          '0%,94%,100%': { transform: 'none', opacity: '0' },
          '95%': { transform: 'translateX(3px)', opacity: '0.7' },
          '97%': { transform: 'translateX(-3px)', opacity: '0.7' },
          '99%': { transform: 'none', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
