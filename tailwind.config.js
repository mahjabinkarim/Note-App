/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      'lato':["Lato", 'serif'],
      'open sans':["Open Sans", 'serif'],
      'brandname': [ "Playwrite VN", "serif"],
      'abeezee':["ABeeZee", "serif"]
    }
  },
  plugins: [],
}
