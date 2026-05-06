"use client";

import { useLang } from "@/lib/lang-context";
import { LANGS } from "@/lib/copy";

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label="Idioma">
      {LANGS.map((l, i) => (
        <span key={l} className="contents">
          {i > 0 ? <span className="sep">/</span> : null}
          <button
            type="button"
            onClick={() => setLang(l)}
            className={l === lang ? "active" : ""}
            aria-pressed={l === lang}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
