import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

// Self-hosted FilmmAiker fonts: hybrid identity con paleta AltafuIA + tipos del estudio.
// Los archivos viven en /public/fonts y los sirve nuestro propio dominio.

export const fontDisplay = localFont({
  src: [
    {
      path: "../public/fonts/soria-font.ttf",
      weight: "400 900",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "block",
  fallback: ["Cormorant Garamond", "Georgia", "serif"],
});

export const fontSans = localFont({
  src: [
    {
      path: "../public/fonts/Vercetti-Regular.woff",
      weight: "400 900",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "block",
  fallback: ["Barlow Condensed", "Inter", "system-ui", "sans-serif"],
});

// Mono se queda con next/font/google (self-hosting en build time).
export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
