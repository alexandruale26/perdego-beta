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
        xs: "480px",
        xsm: "540px",
        xmd: "700px",
        xlg: "800px",
      },
      maxWidth: {
        xlg: "800px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
