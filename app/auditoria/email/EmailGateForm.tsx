"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormState {
  email: string;
  name: string;
  source: string;
  honeypot: string;
}

const sources = [
  "AltafuIA",
  "Instagram",
  "LinkedIn",
  "Referido",
  "Otro",
] as const;

export function EmailGateForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<FormState>({
    email: "",
    name: "",
    source: "",
    honeypot: "",
  });

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setState((s) => ({ ...s, [key]: e.target.value }));

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (state.honeypot.length > 0) return; // bot
    if (state.name.trim().length < 2) {
      setError("Decinos tu nombre, aunque sea el primero.");
      return;
    }
    if (!EMAIL_RE.test(state.email)) {
      setError("Ese mail no parece válido.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: state.email.trim().toLowerCase(),
            name: state.name.trim(),
            source: state.source || null,
            utm_source: params.get("utm_source"),
            utm_medium: params.get("utm_medium"),
            utm_campaign: params.get("utm_campaign"),
          }),
        });
        if (!res.ok) {
          const payload = await res.json().catch(() => ({}));
          setError(payload.error ?? "No pudimos guardarte. Probá de nuevo.");
          return;
        }
        router.push("/auditoria/perfil");
      } catch {
        setError("Falló la red. Probá de nuevo.");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <Input
        name="name"
        label="Nombre"
        autoComplete="given-name"
        value={state.name}
        onChange={update("name")}
        placeholder="Cómo te llamamos"
        required
      />
      <Input
        name="email"
        type="email"
        inputMode="email"
        label="Email"
        autoComplete="email"
        value={state.email}
        onChange={update("email")}
        placeholder="vos@dominio.com"
        required
      />
      <div className="flex flex-col gap-2">
        <label
          htmlFor="source"
          className="text-xs uppercase tracking-[0.18em] text-ink-soft"
        >
          ¿Cómo llegaste? (opcional)
        </label>
        <select
          id="source"
          name="source"
          value={state.source}
          onChange={update("source")}
          className="h-14 rounded-btn border border-ink-white/10 bg-bg-deep px-4 text-base text-ink-white focus:border-green-mid focus:outline-none focus:ring-2 focus:ring-green-mid"
        >
          <option value="">Elegí una opción</option>
          {sources.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* honeypot: invisible para humanos */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        value={state.honeypot}
        onChange={update("honeypot")}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      {error ? (
        <p role="alert" className="text-sm text-alert-red">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} className="mt-2">
        {pending ? "Guardando…" : "Empezar diagnóstico →"}
      </Button>
      <p className="text-xs text-ink-mid">
        Te enviamos también el resultado al mail. Sin spam. Sin newsletter
        eterna.
      </p>
    </form>
  );
}
