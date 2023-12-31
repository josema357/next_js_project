const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      ...colors,
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
