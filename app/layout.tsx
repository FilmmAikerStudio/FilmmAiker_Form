import type { Metadata, Viewport } from "next";
import { fontDisplay, fontMono, fontSans } from "@/lib/fonts";
import { LangProvider } from "@/lib/lang-context";
import { LangToggle } from "@/components/shared/LangToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "AltafuIA · Auditoría inteligente",
  description:
    "Auditá tu posición frente a la IA en 3 minutos. Diagnóstico personalizado y plan para la semana que viene.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://filmmaikerstudio.com",
  ),
  openGraph: {
    title: "AltafuIA · Auditoría inteligente",
    description:
      "Diagnóstico personalizado de tu posición frente a la IA. 3 minutos.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`}
    >
      <body className="bg-bg-black text-ink-white antialiased">
        <LangProvider>
          <LangToggle />
          {children}
          <div className="grain-overlay" aria-hidden />
        </LangProvider>
      </body>
    </html>
  );
}
