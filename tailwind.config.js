const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    fontFamily: {
      sans: [
        "Poppins",
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    extend: {
      screens: {
        xxs: "400px",
        xs: "480px",
        xsm: "540px",
        xmd: "700px",
        xlg: "800px",
      },
      colors: {
        primary: colors.emerald[400],
        "primary-50": colors.emerald[50],
        "primary-100": colors.emerald[100],
        "primary-200": colors.emerald[200],
        "primary-300": colors.emerald[300],
        "primary-400": colors.emerald[400],
        "primary-500": colors.emerald[500],
        "primary-600": colors.emerald[600],
        "primary-700": colors.emerald[700],
        "primary-800": colors.emerald[800],
        "primary-900": colors.emerald[900],

        "grey-50": colors.gray[50],
        "grey-100": colors.gray[100],
        "grey-200": colors.gray[200],
        "grey-300": colors.gray[300],
        "grey-400": colors.gray[400],
        "grey-500": colors.gray[500],
        "grey-600": colors.gray[600],
        "grey-700": colors.gray[700],
        "grey-800": colors.gray[800],
        "grey-900": colors.gray[900],
      },
      boxShadow: {
        large: "0 2px 10px 1px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
