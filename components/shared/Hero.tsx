import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-gradient-altafuia opacity-[0.18]"
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(76,175,126,0.18),transparent_60%)]"
        aria-hidden
      />

      <header className="flex items-center justify-between px-6 pt-8 md:px-12 md:pt-10">
        <Logo />
        <span className="text-[0.7rem] uppercase tracking-[0.25em] text-ink-soft">
          AltafuIA · The Human Layer™
        </span>
      </header>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16 md:px-12">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-green-mid">
          Auditoría inteligente
        </p>
        <h1 className="text-balance font-display text-5xl leading-[1.05] md:text-7xl">
          Auditá tu posición
          <br />
          frente a la <span className="text-green-mid">IA</span>.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink-soft md:text-xl">
          3 minutos. Diagnóstico personalizado. Plan de la semana que viene.
          No es un test bonito. Es un siguiente paso real.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/auditoria/email"
            className="inline-flex h-14 items-center justify-center rounded-btn bg-green-mid px-8 font-semibold text-bg-black transition-colors duration-250 hover:bg-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-mid focus-visible:ring-offset-2 focus-visible:ring-offset-bg-black"
          >
            Empezar diagnóstico →
          </Link>
          <p className="text-sm text-ink-mid">
            Sin spam. Sin newsletter eterna.
          </p>
        </div>
      </div>

      <footer className="px-6 pb-8 text-xs text-ink-mid md:px-12 md:pb-10">
        <span>© FilmmAiker Studio · {new Date().getFullYear()}</span>
      </footer>
    </section>
  );
}
