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
          black: "#050505",
          deep: "#0A0A0A",
          card: "#0C0C0C",
          elev: "#141414",
        },
        ink: {
          white: "#FFFFFF",
          soft: "#C7C7C7",
          mid: "#6B6B6B",
          faint: "rgba(255,255,255,0.30)",
        },
        accent: {
          rose: "#E8BFB8",
          mint: "#C7E8DD",
        },
        alert: {
          red: "#C44D4D",
        },
        line: {
          DEFAULT: "rgba(255,255,255,0.08)",
          strong: "rgba(255,255,255,0.18)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Barlow Condensed", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "12px",
        btn: "10px",
      },
      backgroundImage: {
        "gradient-altafuia":
          "linear-gradient(90deg, #B7E985 0%, #1F8B4C 100%)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
