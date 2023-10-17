const base = require("@calcom/config/tailwind-preset");
/** @type {import('tailwindcss').Config} */
module.exports = {
  ...base,
  content: [...base.content, "../../node_modules/@tremor/**/*.{js,ts,jsx,tsx}", "./ui/*.js", "./ui/**/*.js"],
  // theme: {
  //   fontSize: {
  //     "landing-2xs": "0.5625rem",
  //     "landing-xs": "0.75rem",
  //     "landing-sm": "1rem",
  //     "landing-base": "1.125rem",
  //     "landing-lg": "1.5rem",
  //     "landing-xl": "2rem",
  //     "landing-2xl": "2.25rem",
  //     "landing-3xl": "3rem",
  //     "landing-4xl": "4rem",
  //     "landing-5xl": "4.5rem",
  //     "landing-6xl": "6rem",
  //     "landing-7xl": "8rem",
  //     "landing-8xl": "9rem",
  //   },
  // },
  plugins: [...base.plugins, require("tailwindcss-animate")],
};
