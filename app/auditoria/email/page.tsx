import { Suspense } from "react";
import { EmailGateForm } from "./EmailGateForm";
import { Logo } from "@/components/shared/Logo";

export const metadata = {
  title: "Auditoría · Empezamos | AltafuIA",
};

export default function EmailGatePage() {
  return (
    <main className="mx-auto flex min-h-[100svh] w-full max-w-xl flex-col px-6 py-10">
      <header className="mb-12">
        <Logo />
      </header>
      <div className="flex flex-1 flex-col justify-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-green-mid">
          Paso 1 de 3
        </p>
        <h1 className="font-display text-4xl leading-tight md:text-5xl">
          Empezamos por lo más simple.
        </h1>
        <p className="mt-4 text-ink-soft">
          Te devolvemos el diagnóstico en pantalla y también al mail. Cero
          spam. Cero newsletter eterna.
        </p>
        <div className="mt-10">
          <Suspense fallback={<div className="h-64" aria-hidden />}>
            <EmailGateForm />
          </Suspense>
        </div>
      </div>
      <p className="mt-12 text-xs text-ink-mid">
        Al continuar aceptás nuestra{" "}
        <a href="/privacidad" className="underline hover:text-ink-soft">
          política de privacidad
        </a>
        .
      </p>
    </main>
  );
}
