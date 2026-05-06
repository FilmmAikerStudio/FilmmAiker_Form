import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          light: "#B7E985",
          mid: "#4CAF7E",
          deep: "#1F8B4C",
          dark: "#0F4A2A",
        },
        bg: {
          black: "#000000",
          deep: "#0A0A0A",
        },
        ink: {
          white: "#FFFFFF",
          soft: "#C7C7C7",
          mid: "#6B6B6B",
        },
        accent: {
          rose: "#E8BFB8",
          mint: "#C7E8DD",
        },
        alert: {
          red: "#C44D4D",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
      },
      backgroundImage: {
        "gradient-altafuia":
          "linear-gradient(90deg, #B7E985 0%, #1F8B4C 100%)",
      },
      transitionDuration: {
        250: "250ms",
      },
    },
  },
  plugins: [],
};

export default config;
