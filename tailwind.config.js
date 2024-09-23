/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        Background: "#D9CCC1",
        Darkground: "#011720",
        SectionLigth: "#BF6415",
        SectionDark: "#012B3C",
        Detail: "#BF6415",
        NavBar: "#D9D9D9",
        iconLigth: "#D9D9D9",
        iconLigthSelect: "#012B3C",
        iconDark: "#012B3C",
        iconDarkSelect: "#00001A",
      },
    },
  },
  plugins: [],
};
