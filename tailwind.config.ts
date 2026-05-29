import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17211b",
        leaf: "#1f7a4f",
        moss: "#74945f",
        clay: "#b6603c",
        oat: "#f5efe4"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(23, 33, 27, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
