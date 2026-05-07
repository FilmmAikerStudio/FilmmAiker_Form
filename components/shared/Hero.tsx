"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { copy, t } from "@/lib/copy";
import { BlockHeader } from "@/components/shared/BlockHeader";
import { GlowBlob } from "@/components/shared/GlowBlob";

export function Hero() {
  const { lang } = useLang();

  return (
    <section className="screen-enter relative flex min-h-[100svh] flex-col">
      <GlowBlob top="-200px" right="-150px" size={600} color="var(--green-mid)" />
      <GlowBlob bottom="-300px" left="-200px" size={700} color="var(--green-deep)" />

      <BlockHeader left={t(copy.blocks.landing, lang)} right="00 / 04" />

      <div
        className="relative z-[1] mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-between"
        style={{ padding: "clamp(32px, 6vw, 72px) clamp(24px, 5vw, 80px)" }}
      >
        {/* Eyebrow */}
        <div>
          <div className="label" style={{ color: "var(--green-light)", marginBottom: 8 }}>
            {t(copy.landing.eyebrow, lang)}
          </div>
          <div className="label-sm">{t(copy.landing.blockSub, lang)}</div>
        </div>

        {/* Hero title */}
        <div style={{ margin: "clamp(40px, 10vw, 120px) 0 clamp(32px, 6vw, 64px)" }}>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(56px, 11vw, 168px)",
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            <span className="block">{t(copy.landing.h1Pre, lang)}</span>
            <span
              className="relative block"
              style={{
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.3)",
              }}
            >
              <span
                style={{
                  background:
                    "linear-gradient(90deg, var(--green-light), var(--green-deep))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextStroke: "0",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                {t(copy.landing.h1Word, lang)}
              </span>
              <span
                aria-hidden
                style={{ marginLeft: "0.18em", WebkitTextFillColor: "transparent" }}
              >
                {t(copy.landing.h1Post, lang)}
              </span>
            </span>
          </h1>
          <p
            className="font-sans"
            style={{
              fontSize: "clamp(15px, 1.6vw, 19px)",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 620,
              marginTop: 32,
              fontWeight: 500,
            }}
          >
            {t(copy.landing.sub, lang)}
          </p>
        </div>

        {/* Footer band: CTA */}
        <div>
          <Link
            href="/auditoria/email"
            className="btn-primary"
            style={{ fontSize: 14, padding: "22px 36px" }}
          >
            <span>{t(copy.landing.cta, lang)}</span>
            <svg width={18} height={14} viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M1 7h16m0 0L11 1m6 6l-6 6" />
            </svg>
          </Link>
          <div
            className="mt-4 font-sans font-bold uppercase text-ink-faint"
            style={{ fontSize: 11, letterSpacing: "0.25em" }}
          >
            {t(copy.landing.foot, lang)}
          </div>
        </div>

        {/* Anchor quote */}
        <div
          className="mt-[clamp(32px,6vw,56px)] border-t border-white/[0.06] pt-8 font-display italic text-white/55"
          style={{ fontSize: "clamp(15px, 1.6vw, 20px)", maxWidth: 760, lineHeight: 1.4 }}
        >
          “{t(copy.landing.quote, lang)}”
        </div>
      </div>
    </section>
  );
}
