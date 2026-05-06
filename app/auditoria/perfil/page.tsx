"use client";

import { useRouter } from "next/navigation";
import { useLang } from "@/lib/lang-context";
import { copy, t } from "@/lib/copy";
import { BlockHeader } from "@/components/shared/BlockHeader";
import { GlowBlob } from "@/components/shared/GlowBlob";
import { BackArrow } from "@/components/shared/BackArrow";

// Stub Sprint 2 — bifurcación persona vs empresa.
// Deja la estética coherente con landing y email gate hasta que llegue el flow completo.
export default function PerfilPage() {
  const router = useRouter();
  const { lang } = useLang();

  return (
    <div className="screen-enter relative flex min-h-[100svh] flex-col">
      <GlowBlob top="10%" left="-150px" size={500} color="var(--green-light)" />
      <GlowBlob bottom="-150px" right="-150px" size={500} color="var(--green-deep)" />

      <BlockHeader left={t(copy.blocks.perfil, lang)} right="02 / 04" />

      <div
        className="relative z-[1] mx-auto flex w-full max-w-[1080px] flex-1 flex-col"
        style={{ padding: "clamp(28px, 5vw, 56px) clamp(24px, 5vw, 64px)" }}
      >
        <div className="mb-6">
          <BackArrow onClick={() => router.push("/auditoria/email")} />
        </div>

        <div
          className="label-sm mb-3"
          style={{ color: "var(--green-light)" }}
        >
          {t(copy.perfil.blockSub, lang)}
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: "clamp(34px, 5vw, 56px)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            fontWeight: 400,
            margin: "0 0 12px",
          }}
        >
          {t(copy.perfil.headline, lang)}
        </h2>

        <p
          className="font-sans font-semibold uppercase"
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 12,
            letterSpacing: "0.2em",
            marginBottom: 40,
          }}
        >
          {t(copy.perfil.sub, lang)}
        </p>

        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {(["individual", "business"] as const).map((kind) => {
            const c = copy.perfil[kind];
            return (
              <button
                key={kind}
                type="button"
                onClick={() => alert("Sprint 2 · cuestionario en construcción.")}
                className="card-interactive flex min-h-[320px] flex-col justify-between"
                style={{ padding: "clamp(28px, 4vw, 40px)" }}
              >
                <div>
                  <div
                    className="label-sm"
                    style={{ marginBottom: 16 }}
                  >
                    {t(c.tag, lang)}
                  </div>
                  <div
                    className="font-display"
                    style={{
                      fontSize: "clamp(28px, 3.5vw, 40px)",
                      fontWeight: 400,
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                      marginBottom: 16,
                    }}
                  >
                    {t(c.title, lang)}
                  </div>
                  <p
                    className="font-sans"
                    style={{
                      color: "rgba(255,255,255,0.6)",
                      fontSize: 14,
                      lineHeight: 1.55,
                      marginBottom: 24,
                    }}
                  >
                    {t(c.body, lang)}
                  </p>
                </div>
                <div
                  className="flex items-center justify-between border-t border-white/[0.06] pt-5"
                >
                  <span
                    className="font-bold uppercase text-white/50"
                    style={{ fontSize: 10, letterSpacing: "0.2em" }}
                  >
                    {t(c.questions, lang)}
                  </span>
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white"
                  >
                    <svg width={14} height={12} viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M1 6h11m0 0L8 1m4 5l-4 5" />
                    </svg>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
