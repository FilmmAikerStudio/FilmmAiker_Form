# AltafuIA · Auditoría inteligente

Embudo adaptativo del QR de la masterclass AltafuIA (FilmmAiker Studio).
Captura email, bifurca persona / empresa, devuelve **auditoría personalizada
generada por LLM** con plan de acción concreto.

> No construimos un formulario. Construimos un espejo que devuelve un siguiente
> paso. La diferencia es todo.

---

## Stack

- **Next.js 14** (App Router · React Server Components · streaming)
- **TypeScript** estricto
- **Tailwind CSS** + tokens propios (paleta y tipografías del deck AltafuIA)
- **Supabase** (Postgres + RLS) — leads, respuestas, eventos de email
- **Anthropic Claude Sonnet 4.5** — auditor LLM (con fallback OpenAI)
- **Resend** — emails transaccionales (auditoría inmediata + PDF adjunto)
- **Loops** — secuencias de nurturing B2C / B2B
- **Cal.com** — agenda de la sesión diagnóstico B2B

Decisión de fuentes: usamos `next/font/google` con `Cormorant Garamond` +
`Inter` + `JetBrains Mono`. Next.js descarga las fuentes en build time y las
sirve desde nuestro propio dominio — **no hay request a Google en runtime**,
satisface el requisito de "self-hosted" sin tener que mantener `.woff2` en
`public/` a mano.

---

## Quickstart

Requiere Node 20+ y `pnpm`.

```bash
pnpm install
cp .env.local.example .env.local   # rellenar keys (Supabase + Resend mínimo)

# Aplicar la migración en tu instancia Supabase
# Opción A · CLI:  supabase db push
# Opción B · Dashboard:  pegá el contenido de supabase/migrations/0001_init.sql

pnpm dev
```

App en [http://localhost:3000](http://localhost:3000).

### Variables mínimas para que el flujo arranque

| Variable | Para qué sirve |
| --- | --- |
| `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | Persistir leads y respuestas |
| `RESEND_API_KEY` | Emails transaccionales |
| `ANTHROPIC_API_KEY` | Generar auditoría (Sprint 5) |
| `CAL_COM_LINK` | CTA B2B (Sprint 5) |

Lista completa en `.env.local.example`.

---

## Arquitectura

```
app/
├── layout.tsx                       # Root layout, fuentes, theme
├── page.tsx                         # Pantalla 0 · Landing
├── auditoria/
│   ├── email/                       # Pantalla 1 · captura email
│   ├── perfil/                      # Pantalla 2 · bifurcación (Sprint 2)
│   ├── persona/[step]/              # Pantalla 3A · quiz B2C (Sprint 3)
│   ├── empresa/[step]/              # Pantalla 3B · quiz B2B (Sprint 4)
│   └── resultado/[id]/              # Pantalla 4 · auditoría LLM (Sprint 5)
└── api/
    └── leads/route.ts               # POST captura email

components/
├── ui/                              # Button, Input, Card
└── shared/                          # Logo, Hero, Footer

lib/
├── cn.ts                            # join de classes
├── fonts.ts                         # next/font/google self-hosted
├── supabase.ts                      # cliente server (service role)
└── email/
    ├── resend.ts                    # cliente Resend
    └── templates/AuditBaseEmail.tsx # plantilla base de mail

supabase/
└── migrations/
    └── 0001_init.sql                # leads, quiz_responses_*, email_events
```

---

## Despliegue

Vercel. Conectá el repo, pegá las env vars del `.env.local` en el dashboard,
push a `main` y deploya automáticamente.

> Nunca pongas `SUPABASE_SERVICE_ROLE_KEY` en variables `NEXT_PUBLIC_*`.
> Es server-only.

---

## Estado

**Sprint 1 — Foundation** ✅

- Scaffold Next.js 14 + TS + Tailwind + tokens AltafuIA
- Tipografías self-hosted (Cormorant + Inter + JetBrains Mono)
- Componentes base (Button · Input · Card · Hero · Logo · Footer)
- Landing pantalla 0 + pantalla 1 (email gate) funcionales
- `POST /api/leads` con upsert + validación + honeypot
- Supabase migración inicial (4 tablas + RLS + triggers)
- Resend client + plantilla React de email base

**Próximo · Sprint 2** → bifurcación perfil + cuestionarios A y B.

---

## Reglas operativas (no negociables)

- **Email primero, valor después.** Sin email, no hay auditoría.
- **Una pantalla, una pregunta.** Mobile-first.
- **Antislop** en copy y en LLM (ver spec sección 0.4 y prompts en sección 8).
- **Goldratt** para empresas: identificar el cuello antes de recomendar IA.
- Cada commit: una sola cosa. Mensajes con `feat:` / `fix:` / `chore:` /
  `refactor:` / `docs:`.

Spec completa de producto: ver la página Notion *"QR · Auditoría inteligente
AltafuIA — Embudo personalizado para creadores y empresas"*.
