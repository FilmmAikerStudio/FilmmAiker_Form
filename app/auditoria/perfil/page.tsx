import { Logo } from "@/components/shared/Logo";

export const metadata = {
  title: "Auditoría · Perfil | AltafuIA",
};

// Stub · Sprint 2 reemplaza con la bifurcación persona vs empresa.
export default function PerfilPage() {
  return (
    <main className="mx-auto flex min-h-[100svh] w-full max-w-xl flex-col px-6 py-10">
      <header className="mb-12">
        <Logo />
      </header>
      <div className="flex flex-1 flex-col justify-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-green-mid">
          Paso 2 de 3
        </p>
        <h1 className="font-display text-4xl leading-tight md:text-5xl">
          Te guardamos. Volvé pronto.
        </h1>
        <p className="mt-4 text-ink-soft">
          Estamos terminando de afinar la auditoría. En breve recibís el
          siguiente paso al mail.
        </p>
      </div>
    </main>
  );
}
