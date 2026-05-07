"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/lang-context";
import { t, type Lang } from "@/lib/copy";
import { BlockHeader } from "@/components/shared/BlockHeader";
import { GlowBlob } from "@/components/shared/GlowBlob";
import {
  KITS,
  AUDIT_B2C,
  AUDIT_B2B,
  QUADRANT_META,
  type Quadrant,
} from "@/lib/quiz-data";
import type { B2CResult, B2BResult } from "@/lib/scoring";

interface Payload {
  type: "individual" | "business";
  b2c?: B2CResult;
  b2b?: B2BResult;
  lang: string;
}

// Renders **bold** markdown in a plain span
function MD({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} style={{ color: "var(--green-light)", fontWeight: 700 }}>
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="card"
      style={{ padding: "clamp(24px, 4vw, 36px)", marginBottom: 16 }}
    >
      <div
        className="label-sm mb-4"
        style={{ color: "var(--green-light)", letterSpacing: "0.2em" }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3" style={{ marginBottom: 12 }}>
      <div
        style={{
          flexShrink: 0,
          marginTop: 6,
          width: 6,
          height: 6,
          borderRadius: 999,
          background: "var(--green-mid)",
        }}
      />
      <p className="font-sans" style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.6 }}>
        <MD text={text} />
      </p>
    </div>
  );
}

function B2CResult({ result, lang }: { result: B2CResult; lang: Lang }) {
  const level = result.currentLevel;
  const kit = KITS[level];
  const audit = AUDIT_B2C;
  const days = lang === "es"
    ? ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]
    : ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
  const dayLabels = lang === "es"
    ? ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"]
    : ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <>
      {/* Level badge */}
      <div
        className="card mb-4"
        style={{
          padding: "clamp(28px, 4vw, 40px)",
          background: "linear-gradient(135deg, rgba(76,175,126,0.12) 0%, rgba(31,139,76,0.06) 100%)",
          borderColor: "rgba(76,175,126,0.2)",
        }}
      >
        <div className="label-sm mb-3" style={{ color: "var(--green-light)" }}>
          {lang === "es" ? "TU NIVEL ACTUAL" : "YOUR CURRENT LEVEL"}
        </div>
        <div
          className="font-display mb-2"
          style={{ fontSize: "clamp(48px, 8vw, 80px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.03em" }}
        >
          {level}
        </div>
        <div
          className="font-sans font-bold uppercase"
          style={{ color: "var(--green-light)", fontSize: 13, letterSpacing: "0.25em", marginBottom: 20 }}
        >
          {t(kit.name, lang)}
        </div>
        <p className="font-sans" style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.6 }}>
          <MD text={t(audit.diagnostic[level], lang)} />
        </p>
      </div>

      {/* Ambition flag */}
      {result.flag === "OVERAMBITION" && (
        <div
          className="card mb-4"
          style={{ padding: "20px 24px", borderColor: "rgba(255,180,0,0.3)", background: "rgba(255,180,0,0.05)" }}
        >
          <span className="label-sm" style={{ color: "rgba(255,180,0,0.9)" }}>
            {lang === "es" ? "NOTA: GAP DE AMBICIÓN ALTO" : "NOTE: HIGH AMBITION GAP"}
          </span>
          <p className="font-sans mt-2" style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.5 }}>
            {lang === "es"
              ? `Tu meta está en el nivel ${result.goalLevel}, pero tu situación actual es nivel ${level}. El plan realista a 90 días es nivel ${result.realistic90Days} — y eso ya es ambicioso.`
              : `Your goal is level ${result.goalLevel}, but your current position is level ${level}. The realistic 90-day plan is level ${result.realistic90Days} — and that's already ambitious.`}
          </p>
        </div>
      )}

      {/* Three weak points */}
      <Section label={lang === "es" ? "TRES PUNTOS FLACOS" : "THREE WEAK POINTS"}>
        {audit.weakPoints[level].map((wp, i) => (
          <Bullet key={i} text={t(wp, lang)} />
        ))}
      </Section>

      {/* Next level */}
      <Section label={lang === "es" ? "TU SIGUIENTE NIVEL REALISTA" : "YOUR REALISTIC NEXT LEVEL"}>
        <p className="font-sans" style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.6 }}>
          <MD text={t(audit.next[level], lang)} />
        </p>
      </Section>

      {/* Kit — stack */}
      <Section label={lang === "es" ? "TU KIT DE LA SEMANA · STACK MÍNIMO" : "YOUR WEEKLY KIT · MINIMUM STACK"}>
        <p
          className="font-display mb-4"
          style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em" }}
        >
          {t(kit.headline, lang)}
        </p>
        <div className="flex flex-col gap-2">
          {kit.stack[lang].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span style={{ color: "var(--green-mid)", fontSize: 12 }}>→</span>
              <span className="font-sans" style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Workflow */}
      <Section label={lang === "es" ? "WORKFLOW LUNES A DOMINGO" : "MONDAY-TO-SUNDAY WORKFLOW"}>
        <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
          {days.map((day, i) => (
            <div
              key={day}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                padding: "12px 14px",
              }}
            >
              <div
                className="font-sans font-bold"
                style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--green-light)", marginBottom: 6 }}
              >
                {dayLabels[i]}
              </div>
              <p className="font-sans" style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, lineHeight: 1.5 }}>
                {t(kit.workflow[day], lang)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Exercise */}
      <Section label={lang === "es" ? `EJERCICIO ${kit.exercise.duration}` : `${kit.exercise.duration} EXERCISE`}>
        <p
          className="font-display mb-3"
          style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em" }}
        >
          {t(kit.exercise.title, lang)}
        </p>
        <div className="flex items-center gap-2">
          <span className="label-sm" style={{ color: "rgba(255,255,255,0.4)" }}>OUTPUT →</span>
          <span className="font-sans" style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
            {t(kit.exercise.output, lang)}
          </span>
        </div>
      </Section>

      {/* Trap + up signal */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        <Section label={lang === "es" ? "TRAMPA TÍPICA" : "TYPICAL TRAP"}>
          <p className="font-sans" style={{ color: "rgba(255,180,0,0.85)", fontSize: 14, lineHeight: 1.55 }}>
            {t(kit.trap, lang)}
          </p>
        </Section>
        <Section label={lang === "es" ? "SEÑAL PARA SUBIR" : "SIGNAL TO LEVEL UP"}>
          <p className="font-sans" style={{ color: "rgba(183,233,133,0.85)", fontSize: 14, lineHeight: 1.55 }}>
            {t(kit.upSignal, lang)}
          </p>
        </Section>
      </div>

      {/* Three actions */}
      <Section label={lang === "es" ? "TRES ACCIONES ESTA SEMANA" : "THREE ACTIONS THIS WEEK"}>
        {audit.actions[level].map((action, i) => (
          <div key={i} className="flex items-start gap-4 mb-4">
            <div
              style={{
                flexShrink: 0,
                width: 28,
                height: 28,
                borderRadius: 999,
                border: "1.5px solid var(--green-mid)",
                display: "grid",
                placeItems: "center",
                color: "var(--green-light)",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {i + 1}
            </div>
            <p className="font-sans" style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.6, paddingTop: 4 }}>
              {t(action, lang)}
            </p>
          </div>
        ))}
      </Section>
    </>
  );
}

function B2BResultView({ result, lang }: { result: B2BResult; lang: Lang }) {
  const q = result.quadrant as Quadrant;
  const meta = QUADRANT_META[q];
  const audit = AUDIT_B2B[q];
  const bottleneck = t(result.likelyBottleneck, lang);
  const bottleneckText = (s: string) => s.replace("{bottleneck}", bottleneck);

  return (
    <>
      {/* Quadrant badge */}
      <div
        className="card mb-4"
        style={{
          padding: "clamp(28px, 4vw, 40px)",
          background: "linear-gradient(135deg, rgba(76,175,126,0.12) 0%, rgba(31,139,76,0.06) 100%)",
          borderColor: "rgba(76,175,126,0.2)",
        }}
      >
        <div className="label-sm mb-3" style={{ color: "var(--green-light)" }}>
          {lang === "es" ? "TU CUADRANTE" : "YOUR QUADRANT"}
        </div>
        <div
          className="font-display mb-2"
          style={{ fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.03em" }}
        >
          {t(meta.label, lang)}
        </div>
        <p className="font-sans mt-4" style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.6 }}>
          <MD text={t(audit.snapshot, lang)} />
        </p>
      </div>

      {/* Bottleneck */}
      <Section label={lang === "es" ? "TU CUELLO DE BOTELLA PROBABLE" : "YOUR LIKELY BOTTLENECK"}>
        <p className="font-sans" style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.6 }}>
          <MD text={bottleneckText(t(audit.bottleneck, lang))} />
        </p>
      </Section>

      {/* TOC diagnosis */}
      <Section label={lang === "es" ? "DIAGNÓSTICO T / I / OE" : "T / I / OE DIAGNOSIS"}>
        {audit.tio.map((item, i) => (
          <Bullet key={i} text={t(item, lang)} />
        ))}
      </Section>

      {/* AI moves + noise */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        <Section label={lang === "es" ? "DÓNDE LA IA MUEVE AGUJA" : "WHERE AI MOVES THE NEEDLE"}>
          {audit.aiMoves.map((item, i) => (
            <Bullet key={i} text={t(item, lang)} />
          ))}
        </Section>
        <Section label={lang === "es" ? "DÓNDE LA IA SOLO AÑADE RUIDO" : "WHERE AI JUST ADDS NOISE"}>
          <p className="font-sans" style={{ color: "rgba(255,180,0,0.85)", fontSize: 14, lineHeight: 1.55 }}>
            {t(audit.aiNoise, lang)}
          </p>
        </Section>
      </div>

      {/* 30/60/90 plan */}
      <Section label={lang === "es" ? "PLAN 30 / 60 / 90 DÍAS" : "30 / 60 / 90 DAY PLAN"}>
        {(["d30", "d60", "d90"] as const).map((key, i) => (
          <div key={key} className="flex items-start gap-4 mb-5">
            <div
              style={{
                flexShrink: 0,
                padding: "4px 10px",
                border: "1.5px solid var(--green-mid)",
                borderRadius: 999,
                color: "var(--green-light)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                whiteSpace: "nowrap",
              }}
            >
              {key === "d30" ? "30D" : key === "d60" ? "60D" : "90D"}
            </div>
            <p className="font-sans" style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.6, paddingTop: 2 }}>
              {t(audit.plan[key], lang)}
            </p>
          </div>
        ))}
      </Section>
    </>
  );
}

export function ResultadoScreen() {
  const router = useRouter();
  const { lang } = useLang();
  const [payload, setPayload] = useState<Payload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("altafuia_result");
    if (!raw) {
      router.replace("/");
      return;
    }
    try {
      setPayload(JSON.parse(raw) as Payload);
    } catch {
      router.replace("/");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-[100svh] items-center justify-center">
        <div className="caret" style={{ width: 2, height: 28, background: "var(--green-light)" }} />
      </div>
    );
  }

  if (!payload) return null;

  const isB2C = payload.type === "individual";
  const blockLabel = lang === "es" ? "05 · AUDITORÍA" : "05 · AUDIT";

  return (
    <div className="screen-enter relative flex min-h-[100svh] flex-col">
      <GlowBlob top="0" right="-200px" size={600} color="var(--green-deep)" />
      <GlowBlob bottom="-200px" left="-200px" size={500} color="var(--green-light)" />

      <BlockHeader left={blockLabel} right="05 / 05" />

      <div
        className="relative z-[1] mx-auto w-full max-w-[860px]"
        style={{ padding: "clamp(24px, 5vw, 48px) clamp(24px, 5vw, 64px) 80px" }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="label-sm mb-3" style={{ color: "var(--green-light)" }}>
            {lang === "es" ? "TU AUDITORÍA PERSONALIZADA" : "YOUR PERSONALIZED AUDIT"}
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: 12,
            }}
          >
            {isB2C
              ? lang === "es" ? "Creador individual" : "Individual creator"
              : lang === "es" ? "Studio / empresa" : "Studio / business"}
          </h1>
          <p className="font-sans" style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, letterSpacing: "0.05em" }}>
            {new Date().toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </p>
        </div>

        {/* Audit content */}
        {isB2C && payload.b2c && <B2CResult result={payload.b2c} lang={lang} />}
        {!isB2C && payload.b2b && <B2BResultView result={payload.b2b} lang={lang} />}

        {/* Closing CTA */}
        <div
          className="card mt-6"
          style={{
            padding: "clamp(28px, 4vw, 40px)",
            background: "linear-gradient(135deg, rgba(76,175,126,0.08) 0%, transparent 100%)",
            borderColor: "rgba(76,175,126,0.15)",
            textAlign: "center",
          }}
        >
          <blockquote
            className="font-display mb-6"
            style={{
              fontSize: "clamp(18px, 2.5vw, 24px)",
              fontWeight: 400,
              lineHeight: 1.3,
              letterSpacing: "-0.015em",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.85)",
              maxWidth: 560,
              margin: "0 auto 24px",
            }}
          >
            {isB2C
              ? lang === "es"
                ? "El nivel no se sube leyendo. Se sube ejecutando una semana entera del peldaño en el que estás."
                : "You don't level up by reading. You level up by executing one full week of the rung you're on."
              : lang === "es"
              ? "La meta no es usar más IA. La meta es ganar más por entrega validada."
              : "The goal isn't using more AI. It's earning more per validated delivery."}
          </blockquote>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://filmmaikerstudio.notion.site/altaiff"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {lang === "es" ? "Descargá el recurso" : "Get the resource"}
              <svg width={14} height={12} viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M1 6h11m0 0L8 1m4 5l-4 5" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/filmmaiking/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              {lang === "es" ? "Conectá con Sebas en LinkedIn" : "Connect with Sebas on LinkedIn"}
            </a>
          </div>
        </div>

        {/* Restart */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("altafuia_result");
              router.push("/");
            }}
            className="font-sans font-bold uppercase"
            style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: "0.2em" }}
          >
            {lang === "es" ? "← Empezar de nuevo" : "← Start over"}
          </button>
        </div>
      </div>
    </div>
  );
}
