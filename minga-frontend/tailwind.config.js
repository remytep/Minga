/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      primary: "Poppins",
    },
    container: {
      padding: {
        default: "30px",
        lg: "0",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primary: "#242824",
        secondary: "#F5E6E0",
      },
      backgroundImage: {
        hero: "url('./assets/homePages/hero/hero.jpg')",
      },
      width: {
        half: "50vw",
      },
      maxHeight: { half: "50vh" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
