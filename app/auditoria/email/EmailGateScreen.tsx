"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLang } from "@/lib/lang-context";
import { copy, t } from "@/lib/copy";
import { BlockHeader } from "@/components/shared/BlockHeader";
import { GlowBlob } from "@/components/shared/GlowBlob";
import { BackArrow } from "@/components/shared/BackArrow";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailGateScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const { lang } = useLang();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState<string>("");
  const [honeypot, setHoneypot] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const emailValid = EMAIL_RE.test(email);
  const nameValid = name.trim().length >= 1;
  const valid = nameValid && emailValid;

  const sourceOptions = copy.email.sourceOptions[lang];

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    setError(null);
    if (honeypot.length > 0) return;
    if (!valid) return;

    startTransition(async () => {
      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            name: name.trim(),
            source: source || null,
            utm_source: params.get("utm_source"),
            utm_medium: params.get("utm_medium"),
            utm_campaign: params.get("utm_campaign"),
          }),
        });
        if (!res.ok) {
          const payload = await res.json().catch(() => ({}));
          setError(
            payload.error ??
              (lang === "es"
                ? "No pudimos guardarte. Probá de nuevo."
                : "We couldn't save you. Try again."),
          );
          return;
        }
        const data = await res.json().catch(() => ({})) as { lead?: { id?: string } };
        if (data?.lead?.id) {
          localStorage.setItem("altafuia_lead_id", data.lead.id);
        }
        router.push("/auditoria/perfil");
      } catch {
        setError(
          lang === "es"
            ? "Falló la red. Probá de nuevo."
            : "Network error. Try again.",
        );
      }
    });
  }

  return (
    <div className="screen-enter relative flex min-h-[100svh] flex-col">
      <GlowBlob top="20%" right="-200px" size={500} />
      <BlockHeader left={t(copy.blocks.email, lang)} right="01 / 04" />

      <div
        className="relative z-[1] mx-auto flex w-full max-w-[720px] flex-1 flex-col"
        style={{ padding: "clamp(28px, 5vw, 56px) clamp(24px, 5vw, 64px)" }}
      >
        <div className="mb-6">
          <BackArrow onClick={() => router.push("/")} label={lang === "es" ? "Atrás" : "Back"} />
        </div>

        <div
          className="label-sm mb-3"
          style={{ color: "var(--green-light)" }}
        >
          {t(copy.email.blockSub, lang)}
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            fontWeight: 400,
            margin: "0 0 12px",
          }}
        >
          {t(copy.email.h1, lang)}{" "}
          <span style={{ color: "var(--green-light)" }}>{t(copy.email.h1b, lang)}</span>
        </h2>

        <p
          className="font-sans"
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: 15,
            lineHeight: 1.6,
            maxWidth: 520,
            marginBottom: 40,
          }}
        >
          {t(copy.email.sub, lang)}
        </p>

        <form onSubmit={submit} className="flex flex-col gap-5" noValidate>
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="label-sm mb-2 block">
              {t(copy.email.nameLabel, lang)}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="given-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t(copy.email.namePh, lang)}
              className="input"
              required
            />
            {touched && !nameValid ? (
              <div
                className="mt-1.5 font-bold uppercase"
                style={{ color: "var(--alert-red)", fontSize: 11, letterSpacing: "0.1em" }}
              >
                {t(copy.email.invalidName, lang)}
              </div>
            ) : null}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="label-sm mb-2 block">
              {t(copy.email.emailLabel, lang)}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t(copy.email.emailPh, lang)}
              className="input"
              style={
                touched && !emailValid
                  ? { borderColor: "var(--alert-red)" }
                  : undefined
              }
              required
            />
            {touched && !emailValid ? (
              <div
                className="mt-1.5 font-bold uppercase"
                style={{ color: "var(--alert-red)", fontSize: 11, letterSpacing: "0.1em" }}
              >
                {t(copy.email.invalidEmail, lang)}
              </div>
            ) : null}
          </div>

          {/* Source pills */}
          <div>
            <span className="label-sm mb-2 block">
              {t(copy.email.sourceLabel, lang)}
            </span>
            <div className="flex flex-wrap gap-2">
              {sourceOptions.map((opt) => {
                const selected = source === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSource(selected ? "" : opt)}
                    aria-pressed={selected}
                    className="font-sans transition-all duration-200"
                    style={{
                      background: selected
                        ? "rgba(76,175,126,0.15)"
                        : "transparent",
                      border:
                        "1px solid " +
                        (selected ? "var(--green-mid)" : "rgba(255,255,255,0.10)"),
                      color: selected
                        ? "var(--green-light)"
                        : "rgba(255,255,255,0.7)",
                      padding: "10px 16px",
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Honeypot */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />

          {error ? (
            <div
              role="alert"
              className="font-bold uppercase"
              style={{
                color: "var(--alert-red)",
                fontSize: 11,
                letterSpacing: "0.1em",
              }}
            >
              {error}
            </div>
          ) : null}

          {/* CTA */}
          <div className="mt-2">
            <button
              type="submit"
              className="btn-primary w-full max-w-[380px]"
              disabled={pending || !valid}
            >
              {pending
                ? lang === "es"
                  ? "Guardando…"
                  : "Saving…"
                : t(copy.email.cta, lang)}
              <svg
                width={16}
                height={12}
                viewBox="0 0 16 12"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
              >
                <path d="M1 6h13m0 0L9 1m5 5l-5 5" />
              </svg>
            </button>
          </div>

          <div
            className="font-sans font-bold uppercase text-ink-faint"
            style={{ fontSize: 10, letterSpacing: "0.2em" }}
          >
            {t(copy.email.micro, lang)}
          </div>
        </form>
      </div>
    </div>
  );
}
