const base = require("@calcom/config/tailwind-preset");
/** @type {import('tailwindcss').Config} */
module.exports = {
  ...base,
  content: [...base.content, "../../node_modules/@tremor/**/*.{js,ts,jsx,tsx}", "./ui/*.js", "./ui/**/*.js"],
  plugins: [...base.plugins, require("tailwindcss-animate")],
};
