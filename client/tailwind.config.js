/** @type {import('tailwindcss').Config} */
export default {
   darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(200deg, rgba(215, 152, 218, 0.737), rgba(142, 114, 198, 0.856))',
      },
    },
  },
  plugins: [],
}

