/** @type {import('tailwindcss').Config} */
const { COLORS } = require("./color.js");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: COLORS.primary,
        background: COLORS.background,
        text: COLORS.text,
        border: COLORS.border,
        textLight: COLORS.textLight,
        card: COLORS.card,
        white: COLORS.white,
      },
    },
  },
  plugins: [],
};
