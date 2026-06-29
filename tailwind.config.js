/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './relo-proposal.html',
    './investors-eventsy.html',
    './src/proposals/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'Helvetica Neue', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.3em',
      },
    },
  },
  plugins: [],
}
