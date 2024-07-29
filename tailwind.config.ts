import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1340px",
      "2xl": "1440px",
    },

    extend: {
      backgroundColor: {
        overlay: "rgba(0, 0, 0, 0.3)",
      },

      boxShadow: {
        inputDrop: "0px 0px 0px 3px rgba(131, 56, 236, 0.15)",
        mainDrop: "0 0 15px -5px rgba(55, 55, 55, 0.1)",
      },

      borderColor: {
        navBorder: "rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
