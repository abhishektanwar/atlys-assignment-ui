/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        'functionCard': '0 0 6px 0 rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}

