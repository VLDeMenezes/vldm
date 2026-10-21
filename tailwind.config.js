/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        phoneMockup:
          "0px 10px 20px rgba(0, 0, 0, 0.5), 0px 5px 10px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        // Brand surfaces (kept from the original identity)
        Background: "#D9CCC1",
        Darkground: "#011720",
        SectionLigth: "#BF6415",
        SectionDark: "#012B3C",
        Detail: "#BF6415",
        NavBar: "#D9D9D9",
        // Accessible text/surface tokens
        Ink: "#04121A",
        InkMuted: "#3F4E52",
        InkDark: "#EAF2F5",
        InkDarkMuted: "#B9CBD2",
        AccentInk: "#7A3A08",
        DetailLight: "rgb(var(--detail-light) / <alpha-value>)",
        Surface: "#F3EBE4",
        SurfaceDark: "#022E40",
        Focus: "#FFD166",
        // Legacy icon tokens
        iconLigth: "#D9D9D9",
        iconLigthSelect: "#012B3C",
        iconDark: "#012B3C",
        iconDarkSelect: "#00001A",
      },
      maxWidth: {
        content: "72rem",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
