"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/copy";
import { BlockHeader } from "@/components/shared/BlockHeader";
import { GlowBlob } from "@/components/shared/GlowBlob";
import { BackArrow } from "@/components/shared/BackArrow";
import {
  QB2C,
  QB2B,
  type B2COption,
  type B2BOption,
  type QuizType,
} from "@/lib/quiz-data";
import {
  scoreB2C,
  scoreB2B,
  type B2CAnswers,
  type B2BAnswers,
} from "@/lib/scoring";

interface Props {
  type: QuizType;
}

const DAYS_ES = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"];
const DAYS_EN = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export function QuizScreen({ type }: Props) {
  const router = useRouter();
  const { lang } = useLang();

  const questions = type === "individual" ? QB2C : QB2B;
  const total = questions.length;

  const [step, setStep] = useState(0);
  // single-select answers (score index or value string)
  const [answers, setAnswers] = useState<Record<number, number | string | string[]>>({});
  const [error, setError] = useState(false);

  const current = questions[step];
  const isMulti = "multi" in current && current.multi === true;
  const progress = ((step) / total) * 100;

  function selectSingle(val: number | string) {
    setAnswers((prev) => ({ ...prev, [step]: val }));
    setError(false);
  }

  function toggleMulti(val: string) {
    setAnswers((prev) => {
      const existing = (prev[step] as string[] | undefined) ?? [];
      if (val === "none") return { ...prev, [step]: ["none"] };
      const without = existing.filter((v) => v !== "none");
      if (without.includes(val)) return { ...prev, [step]: without.filter((v) => v !== val) };
      return { ...prev, [step]: [...without, val] };
    });
    setError(false);
  }

  function isSelected(opt: B2COption | B2BOption): boolean {
    const ans = answers[step];
    if (isMulti) {
      return Array.isArray(ans) && ans.includes((opt as B2BOption).value ?? "");
    }
    if ("score" in opt) return ans === opt.score;
    return ans === (opt as B2BOption).value;
  }

  function next() {
    if (answers[step] === undefined || (Array.isArray(answers[step]) && (answers[step] as string[]).length === 0)) {
      setError(true);
      return;
    }
    if (step < total - 1) {
      setStep((s) => s + 1);
    } else {
      finish();
    }
  }

  function back() {
    if (step === 0) {
      router.push("/auditoria/perfil");
    } else {
      setStep((s) => s - 1);
    }
  }

  function finish() {
    let payload: object;

    if (type === "individual") {
      const b2cAnswers: B2CAnswers = {
        q1: (answers[0] as number) ?? 0,
        q2: (answers[1] as number) ?? 0,
        q3: (answers[2] as number) ?? 0,
        q4: (answers[3] as number) ?? 0,
        q5: (answers[4] as number) ?? 0,
        q6_goal: (answers[5] as number) ?? 1,
      };
      payload = { type: "individual", b2c: scoreB2C(b2cAnswers), lang };
    } else {
      // Map scored questions (q3=index2, q4=index3)
      const q3opts = QB2B[2].opts;
      const q4opts = QB2B[3].opts;
      const q3val = answers[2] as string;
      const q4val = answers[3] as string;
      const q3score = q3opts.find((o) => o.value === q3val)?.score ?? 0;
      const q4score = q4opts.find((o) => o.value === q4val)?.score ?? 0;

      const b2bAnswers: B2BAnswers = {
        q1: (answers[0] as string) ?? "",
        q2: (answers[1] as string) ?? "",
        q3: q3score,
        q4: q4score,
        q5: (answers[4] as string) ?? "",
        q6: (answers[5] as string[]) ?? [],
        q7: (answers[6] as string) ?? "",
        q8: (answers[7] as string) ?? "",
      };
      payload = { type: "business", b2b: scoreB2B(b2bAnswers), lang };
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("altafuia_result", JSON.stringify(payload));
    }
    router.push("/auditoria/resultado");
  }

  const days = lang === "es" ? DAYS_ES : DAYS_EN;
  const progressLabel = lang === "es"
    ? `PREGUNTA ${step + 1} DE ${total}`
    : `QUESTION ${step + 1} OF ${total}`;

  return (
    <div className="screen-enter relative flex min-h-[100svh] flex-col">
      <GlowBlob top="5%" right="-200px" size={500} color="var(--green-deep)" />
      <GlowBlob bottom="-100px" left="-150px" size={400} color="var(--green-light)" />

      <BlockHeader
        left={lang === "es" ? "04 · DIAGNÓSTICO" : "04 · DIAGNOSTIC"}
        right={`${String(step + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
      />

      {/* Progress bar */}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${progress}%`, transition: "width 0.4s ease" }}
        />
      </div>

      <div
        className="relative z-[1] mx-auto flex w-full max-w-[760px] flex-1 flex-col"
        style={{ padding: "clamp(24px, 5vw, 48px) clamp(24px, 5vw, 64px)" }}
      >
        <div className="mb-6">
          <BackArrow onClick={back} />
        </div>

        {/* Step label */}
        <div className="label-sm mb-4" style={{ color: "var(--green-light)" }}>
          {progressLabel}
        </div>

        {/* Question */}
        <h2
          className="font-display mb-8"
          style={{
            fontSize: "clamp(26px, 4vw, 44px)",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            fontWeight: 400,
          }}
        >
          {t(current.q, lang)}
        </h2>

        {isMulti && (
          <p className="label-sm mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
            {lang === "es" ? "Podés elegir varias." : "You can pick several."}
          </p>
        )}

        {/* Options */}
        <div className="flex flex-col gap-3">
          {current.opts.map((opt, idx) => {
            const selected = isSelected(opt);
            const label = t(opt.t, lang);
            const val = "score" in opt ? opt.score : (opt as B2BOption).value;

            return (
              <button
                key={idx}
                type="button"
                onClick={() =>
                  isMulti
                    ? toggleMulti((opt as B2BOption).value)
                    : "score" in opt
                    ? selectSingle(opt.score ?? 0)
                    : selectSingle((opt as B2BOption).value)
                }
                aria-pressed={selected}
                className="card-interactive text-left"
                style={{
                  padding: "clamp(16px, 2.5vw, 22px) clamp(20px, 3vw, 28px)",
                  minHeight: 0,
                  background: selected
                    ? "rgba(76,175,126,0.10)"
                    : "var(--bg-card)",
                  borderColor: selected ? "var(--green-mid)" : "rgba(255,255,255,0.06)",
                  transition: "all 0.18s ease",
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Indicator */}
                  <div
                    style={{
                      flexShrink: 0,
                      marginTop: 2,
                      width: isMulti ? 18 : 18,
                      height: isMulti ? 18 : 18,
                      borderRadius: isMulti ? 4 : 999,
                      border: `2px solid ${selected ? "var(--green-mid)" : "rgba(255,255,255,0.2)"}`,
                      background: selected ? "var(--green-mid)" : "transparent",
                      display: "grid",
                      placeItems: "center",
                      transition: "all 0.18s ease",
                    }}
                  >
                    {selected && (
                      <svg width={10} height={8} viewBox="0 0 10 8" fill="none" stroke="white" strokeWidth={2}>
                        <path d="M1 4l2.5 2.5L9 1" />
                      </svg>
                    )}
                  </div>
                  <span
                    className="font-sans"
                    style={{
                      fontSize: "clamp(13px, 1.8vw, 15px)",
                      lineHeight: 1.5,
                      color: selected ? "white" : "rgba(255,255,255,0.75)",
                    }}
                  >
                    {label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {error && (
          <div
            className="mt-4 font-bold uppercase"
            style={{ color: "var(--alert-red)", fontSize: 11, letterSpacing: "0.1em" }}
          >
            {lang === "es" ? "Elegí una opción." : "Pick one option."}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center gap-4">
          <button
            type="button"
            onClick={next}
            className="btn-primary"
            style={{ minWidth: 160 }}
          >
            {step === total - 1
              ? lang === "es" ? "Terminar" : "Finish"
              : lang === "es" ? "Siguiente" : "Next"}
            <svg width={14} height={12} viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M1 6h11m0 0L8 1m4 5l-4 5" />
            </svg>
          </button>
        </div>

        {/* Step dots */}
        <div className="mt-8 flex gap-1.5">
          {questions.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === step ? 20 : 6,
                height: 6,
                borderRadius: 999,
                background:
                  i < step
                    ? "var(--green-mid)"
                    : i === step
                    ? "var(--green-light)"
                    : "rgba(255,255,255,0.15)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
