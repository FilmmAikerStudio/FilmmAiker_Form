import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

export function Footer() {
  return (
    <footer className="border-t border-ink-white/[0.06] px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="text-xs uppercase tracking-[0.25em] text-ink-mid">
            The Human Layer™
          </p>
        </div>
        <nav className="flex flex-wrap gap-6 text-sm text-ink-soft">
          <Link href="/privacidad" className="hover:text-ink-white">
            Privacidad
          </Link>
          <Link href="/condiciones" className="hover:text-ink-white">
            Condiciones
          </Link>
          <a
            href="mailto:hola@filmmaikerstudio.com"
            className="hover:text-ink-white"
          >
            Contacto
          </a>
        </nav>
      </div>
    </footer>
  );
}
