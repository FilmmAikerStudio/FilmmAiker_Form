import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";

// next/font/google self-hostea las fuentes en build time:
// los archivos .woff2 se sirven desde nuestro propio dominio,
// no hay request a fonts.googleapis.com en runtime.

export const fontDisplay = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const fontSans = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
