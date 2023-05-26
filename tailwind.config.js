/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#364FC7",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
