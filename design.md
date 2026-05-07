# AltafuIA · Auditoría — Frontend Design Specification
**For Google Stitch / design handoff**  
Product: AltafuIA — AI maturity audit funnel  
Studio: FilmmAiker Studio  
Version: Sprint 2 (May 2026)

---

## 1 · Brand Identity

### Product name & tagline
- **AltafuIA** (display name) — pronounced *"Alta-fu-IA"*, "IA" = *Inteligencia Artificial* in Spanish
- Studio: **FilmmAiker Studio**
- Tagline ES: *"Auditoría inteligente de tu madurez IA"*
- Tagline EN: *"AI maturity audit — find where you actually stand"*

### Personality
Dark, editorial, cinematic. Feels like a prestige creative studio, not a SaaS tool. High contrast. Spare typography. Deliberate whitespace. The black is near-absolute (`#050505`). The green palette is the only real color — sharp acid lime at highlight, deep forest at shadow.

---

## 2 · Color Tokens

```css
/* Greens — primary accent system */
--green-light: #B7E985;   /* Lime-yellow highlight. Text on dark, active states, icons */
--green-mid:   #4CAF7E;   /* Mid forest. Borders on selected, progress fills */
--green-deep:  #1F8B4C;   /* Deep forest. Gradient terminus, button bg end */
--green-dark:  #0F4A2A;   /* Near-black forest. Deepest bg tints */

/* Supporting accents (use sparingly) */
--accent-rose: #E8BFB8;   /* Warm nude — result screens only */
--accent-mint: #C7E8DD;   /* Pale mint — result screens only */
--alert-red:   #C44D4D;   /* Validation errors only */

/* Backgrounds — near-black stack */
--bg-black: #050505;      /* Page background */
--bg-deep:  #0A0A0A;      /* Overlay backgrounds */
--bg-card:  #0C0C0C;      /* Card, input backgrounds */
--bg-elev:  #141414;      /* Elevated surfaces: hover states, dividers */

/* Ink (text) */
--ink-white: #FFFFFF;
--ink-soft:  #C7C7C7;     /* Secondary text */
--ink-mid:   #6B6B6B;     /* Placeholder, disabled labels */
--ink-faint: rgba(255,255,255,0.30);  /* Micro-labels, decorative text */

/* Borders */
--border:        rgba(255,255,255,0.08);   /* Default card/input borders */
--border-strong: rgba(255,255,255,0.18);   /* Hover / emphasis borders */
```

---

## 3 · Typography

### Typefaces
| Role | Family | File | Usage |
|------|--------|------|-------|
| Display / Headline | **Soria** | `public/fonts/soria-font.ttf` | All H1, H2, large numerals, the hero "IA" gradient word, quiz questions |
| Sans / UI | **Vercetti** | `public/fonts/Vercetti-Regular.woff` | Body, labels, buttons, inputs, all UI copy |
| Mono (future sprint) | **JetBrains Mono** | Google Fonts | Code snippets, technical output |

### Type Scale

```
Display XL   Soria, 168px max / clamp(56px, 11vw, 168px), weight 400, tracking -0.04em, line-height 0.92
Display L    Soria, 80px max / clamp(48px, 8vw, 80px), weight 400, tracking -0.03em, line-height 1
H2           Soria, 56px max / clamp(36px, 5vw, 56px), weight 400, tracking -0.03em, line-height 1.05
H3 Quiz      Soria, 44px max / clamp(26px, 4vw, 44px), weight 400, tracking -0.025em, line-height 1.1
Body         Vercetti, 15–19px, weight 400–500, line-height 1.6, color ink-soft/70%
Body Sm      Vercetti, 14px, line-height 1.6
Label        Vercetti, 10px, weight 900, tracking 0.4em, ALL CAPS
Label SM     Vercetti, 9px, weight 900, tracking 0.5em, ALL CAPS, color ink-faint
Micro        Vercetti, 10–11px, weight 700, tracking 0.2–0.3em, ALL CAPS
```

### Text effects
- **Gradient fill on key word** (hero): `background: linear-gradient(90deg, #B7E985, #1F8B4C)` + `-webkit-background-clip: text` + `color: transparent`. Used on the word "**IA**" in the hero H1.
- **Stroke outline**: Ghost sibling of gradient text with `WebkitTextStroke: "1px rgba(255,255,255,0.3)"` + `WebkitTextFillColor: transparent`.
- **Bold highlight in body copy**: Inline `<strong>` nodes rendered with `color: var(--green-light)`.
- **Italic display quote**: `font-style: italic`, Soria, `color: rgba(255,255,255,0.55)`.

---

## 4 · Layout System

### Base grid
- Single-column, centered `max-w-[720–1280px]` depending on screen
- Horizontal padding: `clamp(24px, 5vw, 80px)`
- Vertical padding: `clamp(28px, 5vw, 56px)` on inner containers

### Screen container pattern
Every screen is a full-viewport flex column:
```
┌─────────────────────────────────────────┐
│ BlockHeader (sticky, 48px tall)          │  ← always present
│ ProgressBar (2px) ← quiz only           │
├─────────────────────────────────────────┤
│                                         │
│  Content area (flex-1, scroll)          │
│    max-w-[720–760px] centered           │
│    GlowBlob decorations (absolute)      │
│                                         │
└─────────────────────────────────────────┘
```

### Responsive breakpoints
| Name | Min width | Behavior |
|------|-----------|----------|
| Mobile | 0 | Single column, clamp() fluid type |
| Tablet | 640px | Max-width container kicks in |
| Desktop | 1024px | Max clamp values reached, side-by-side panels appear (resultado) |

---

## 5 · Component Library

### 5.1 BlockHeader
Sticky header bar at top of every screen. Height: 48px.

```
[ ALTAFUIA · AUDITORÍA        01 / 04 ]
  ← left label: step name         right: counter NN/04
```
- Background: `rgba(5,5,5,0.92)` + `backdrop-filter: blur(8px)`
- Bottom border: `1px solid var(--border)`
- Left text: 9px Vercetti, tracking 0.45em, ALL CAPS, ink-faint
- Right counter: same size, `font-feature-settings: "tnum"` (tabular nums)
- A thin `•` glyph separates block number from name on left side

---

### 5.2 GlowBlob
Decorative ambient light. CSS-only radial gradient circle, `position: absolute`, `pointer-events: none`, `z-index: 0`, heavily blurred.

```css
background: radial-gradient(circle at 50% 50%, [color], transparent 70%);
filter: blur(100px);
opacity: 0.5;
```
Typical placements:
- Top-right: `top: -200px; right: -150px; size: 600px; color: var(--green-mid)`
- Bottom-left: `bottom: -300px; left: -200px; size: 700px; color: var(--green-deep)`
- Quiz top: `top: 5%; right: -200px; size: 500px; color: var(--green-deep)`
- Quiz bottom: `bottom: -100px; left: -150px; size: 400px; color: var(--green-light)` (lighter)

---

### 5.3 Buttons

**btn-primary** (filled, CTA)
- Background: `linear-gradient(90deg, #B7E985, #1F8B4C)`
- Text color: `#000000`
- Padding: `18px 28px` (large: `22px 36px`)
- Border-radius: `10px`
- Font: Vercetti, 13px, weight 900, tracking 0.25em, ALL CAPS
- Icon: 16×12px right arrow SVG (white stroke, weight 2.2)
- Hover: `translateY(-1px)` + `filter: brightness(1.05)`, spring easing
- Active: `scale(0.98)`
- Disabled: `opacity: 0.35; cursor: not-allowed; filter: grayscale(0.6)`

**btn-secondary** (outlined)
- Background: transparent
- Border: `1px solid var(--border-strong)`
- Text: white
- Same sizing as primary
- Hover: `background: rgba(255,255,255,0.04); border-color: var(--green-mid); color: var(--green-light)`

**btn-ghost** (text only)
- No border, no background
- Color: ink-soft
- 11px, tracking 0.3em, ALL CAPS
- Hover: color `var(--green-light)`

---

### 5.4 Input
```
┌─────────────────────────────────────┐
│  Placeholder text                   │
└─────────────────────────────────────┘
  background: var(--bg-card)
  border: 1px solid var(--border)
  border-radius: 8px
  padding: 18px 20px
  font: Vercetti 16px
  focus border: var(--green-mid)
  error border: var(--alert-red)
```
Labels: 9px Vercetti, tracking 0.5em, ALL CAPS, ink-faint. Placed above input with 8px gap.
Error messages: 11px Vercetti bold, `var(--alert-red)`, tracking 0.1em, ALL CAPS, appear below input.

---

### 5.5 Card (static)
```
background: var(--bg-card)
border: 1px solid var(--border)
border-radius: 12px
padding: 22–36px
```

---

### 5.6 Card Interactive (quiz answer option)
Same as card, but:
- Full-width `<button>`
- `cursor: pointer`
- Hover: `border-color: rgba(76,175,126,0.5); background: rgba(76,175,126,0.04)`
- Selected: `border-color: var(--green-mid); background: rgba(76,175,126,0.10)`
- Transition: `all 0.18s ease`
- Contains a radio/checkbox indicator (see §6.4)

---

### 5.7 Progress Bar (quiz only)
2px high, full width, directly below BlockHeader.
```
track: background rgba(255,255,255,0.06)
fill:  linear-gradient(90deg, #B7E985, #1F8B4C)
       width = (currentStep / totalSteps) × 100%
       transition: width 400ms cubic-bezier(0.16,1,0.3,1)
```

---

### 5.8 Step Dots (quiz only)
Row of dots at bottom of quiz content area.
- Inactive: `6×6px, border-radius 999, background rgba(255,255,255,0.15)`
- Current: `20×6px, border-radius 999, background var(--green-light)` (pill shape)
- Completed: `6×6px, background var(--green-mid)`
- Transition: width `0.3s ease`

---

### 5.9 BackArrow
`←` button in top-left of content area, below BlockHeader.
- Ghost style, `←` SVG + optional label ("Atrás" / "Back")
- Navigates back one step or to previous screen

---

### 5.10 Language Toggle
Floating pill, `position: fixed; top: 18px; right: 18px; z-index: 8000`.
```
[ ES · EN ]
```
- Background: `rgba(10,10,10,0.7)` + `backdrop-filter: blur(10px)`
- Border: `1px solid var(--border)` → hover: `var(--green-mid)`
- Active language: `color: var(--green-light)`
- Separator `·`: color ink-mid
- Font: 10px Vercetti, tracking 0.3em, ALL CAPS

---

### 5.11 Source Pill (email gate)
Pill-shaped `<button type="button">` for "how did you find us?" options.
- Default: `border: 1px solid rgba(255,255,255,0.10); color: rgba(255,255,255,0.7); background: transparent`
- Selected: `border: 1px solid var(--green-mid); background: rgba(76,175,126,0.15); color: var(--green-light)`
- Padding: `10px 16px; border-radius: 999px`
- Font: 11px Vercetti, weight 700, tracking 0.15em, ALL CAPS

---

### 5.12 Divider
Labeled horizontal rule for result sections.
```
— ·  SECTION TITLE  · —
```
9px Vercetti, ALL CAPS, tracking 0.5em, ink-faint. Lines `flex:1; height:1px; background: var(--border)`.

---

### 5.13 Logo / FakeQR
- Logo: Text "AltafuIA" / "FilmmAiker" in Soria italic
- FakeQR: SVG placeholder QR grid, size 56px, used in landing footer

---

### 5.14 Grain Overlay
Full-viewport `position: fixed` SVG noise texture, `z-index: 9000; pointer-events: none`.
```
opacity: 0.04
mix-blend-mode: overlay
```
Gives the interface a slight cinematic grain. Always present.

---

## 6 · Screens

### Screen 0 — Landing `/`
**Block label**: `00 · AUDITORÍA` | Counter: `00 / 04`

**Layout**: Full viewport, max-w-1280, flex column, `justify-between` (space from top to bottom).

```
┌──────────────────────────────────────────────────────────────┐
│  BLOCK HEADER: ALTAFUIA · AUDITORÍA          00 / 04         │
├──────────────────────────────────────────────────────────────┤
│  [GlowBlob top-right, green-mid, 600px]                      │
│  [GlowBlob bottom-left, green-deep, 700px]                   │
│                                                              │
│  EYEBROW LABEL (green-light, 10px tracking)                  │
│  SUB LABEL (ink-faint)                                       │
│                                                              │
│  ┌ H1 DISPLAY XL ──────────────────────────────────┐        │
│  │  "Descubrí"                        (white)       │        │
│  │  "tu nivel"                        (white)       │        │
│  │  "IA"                              (gradient)    │        │
│  │  "real."                           (outline)     │        │
│  └─────────────────────────────────────────────────┘        │
│                                                              │
│  Body text (max-w-620, 15–19px, white/70%)                   │
│                                                              │
│  ┌ CTA ROW ─────────────────────────────────────────────┐   │
│  │  [btn-primary]  "Empezar la auditoría →"             │   │
│  │  Micro text: "Sin registro · 4 min · gratis"         │   │
│  └────────────────────────────────────┬──────────────────┘  │
│                                       │  [QR code, 56px]    │
│                                       │  QR label (9px)     │
│                                                              │
│  ──────────────────────────────────────────────────────      │
│  Italic serif quote (Soria italic, 15–20px, white/55%)       │
└──────────────────────────────────────────────────────────────┘
```

**Key design notes**:
- The hero H1 breaks across 3 lines. Line 1 + 2 are solid white. Line 3 has "IA" (gradient fill) + "real." (stroke-only ghost).
- CTA button has a right-arrow `→` SVG icon inline.
- QR placeholder aligns bottom-right, opposite the CTA button.
- The italic quote anchors the bottom, separated by a hairline rule.

---

### Screen 1 — Email Gate `/auditoria/email`
**Block label**: `01 · EMAIL` | Counter: `01 / 04`

```
┌──────────────────────────────────────┐
│  BLOCK HEADER                        │
├──────────────────────────────────────┤
│  [GlowBlob top-right, green-light]   │
│                                      │
│  ← Atrás                             │
│                                      │
│  LABEL SM (green-light)              │
│  "PASO 1 — IDENTIFICACIÓN"           │
│                                      │
│  H2 (Soria 36–56px)                  │
│  "Antes de empezar,"                 │
│  "decinos quién sos."     (green)    │
│                                      │
│  Body text (15px, white/55%, max 520)│
│                                      │
│  Form ──────────────────────────────│
│  │ Label: NOMBRE                     │
│  │ [Input field ────────────────]    │
│  │                                   │
│  │ Label: EMAIL                      │
│  │ [Input field ────────────────]    │
│  │                                   │
│  │ Label: ¿CÓMO NOS ENCONTRASTE?     │
│  │ [pill] [pill] [pill] [pill]       │
│  │        (source pills)             │
│  │                                   │
│  │ [error message if any]            │
│  │                                   │
│  │ [btn-primary w-full max-380px]    │
│  │  "Continuar →"                    │
│  │                                   │
│  │ Micro: "SIN SPAM · PODÉS DARTE    │
│  │         DE BAJA CUANDO QUIERAS"   │
│  └───────────────────────────────────│
└──────────────────────────────────────┘
```

**Key design notes**:
- Name input goes first, then email. No password field.
- Source pill row wraps on mobile; options: "INSTAGRAM", "EVENTO", "REFERIDO", "WEB" (+ others).
- Submit button disabled until name ≥ 1 char AND valid email.
- Error states: red border on email input, red 11px ALL-CAPS message below.
- Honeypot field (bot trap) present but `display: none` / off-screen — do NOT render visually.

---

### Screen 2 — Perfil Selector `/auditoria/perfil`
**Block label**: `02 · PERFIL` | Counter: `02 / 04`

```
┌──────────────────────────────────────┐
│  BLOCK HEADER                        │
├──────────────────────────────────────┤
│  [GlowBlob top-right]                │
│                                      │
│  ← Atrás                             │
│                                      │
│  LABEL SM (green-light)              │
│  "PASO 2 — TU PERFIL"                │
│                                      │
│  H2 "¿Venís como creador             │
│       o como empresa?"               │
│                                      │
│  Body (white/55%)                    │
│  "La auditoría se adapta a tu caso." │
│                                      │
│  ┌ Two cards side-by-side ─────────┐ │
│  │  [Card A: INDIVIDUAL]           │ │
│  │    Icon: person silhouette      │ │
│  │    Label: CREADOR / INDIVIDUAL  │ │
│  │    Sub: 6 preguntas             │ │
│  │                                 │ │
│  │  [Card B: EMPRESA]              │ │
│  │    Icon: building               │ │
│  │    Label: EMPRESA / EQUIPO      │ │
│  │    Sub: 8 preguntas             │ │
│  └─────────────────────────────────┘ │
│                                      │
│  (Clicking a card routes to quiz)    │
└──────────────────────────────────────┘
```

**Key design notes**:
- Two `card-interactive` side-by-side on tablet/desktop; stacked vertically on mobile.
- Cards have a large emoji or simple SVG icon at top.
- Selected card gets `border-color: var(--green-mid); background: rgba(76,175,126,0.10)`.
- Clicking either card immediately navigates — no separate submit button.

---

### Screen 3 — Quiz `/auditoria/quiz/individual` or `/quiz/business`
**Block label**: `04 · DIAGNÓSTICO` | Counter: `NN / 06` or `NN / 08`

```
┌──────────────────────────────────────┐
│  BLOCK HEADER: 04 · DIAGNÓSTICO      │  02 / 06
│  ─────────────────────────────────── │  ← progress bar (2px)
├──────────────────────────────────────┤
│  [GlowBlob top-right, green-deep]    │
│  [GlowBlob bottom-left, green-light] │
│                                      │
│  ← Atrás                             │
│                                      │
│  LABEL SM (green-light)              │
│  "PREGUNTA 2 DE 6"                   │
│                                      │
│  H3 Soria (clamp 26–44px)            │
│  "Cuando le pedís algo a una IA,     │
│   ¿cómo lo hacés?"                   │
│                                      │
│  [if multi-select: hint text]        │
│                                      │
│  ┌ Answer options ──────────────────┐│
│  │  [○] Option A text               ││
│  │  [○] Option B text               ││
│  │  [○] Option C text               ││
│  │  [○] Option D text               ││
│  └──────────────────────────────────┘│
│                                      │
│  [error: "Elegí una opción." ← red]  │
│                                      │
│  [btn-primary]  "Siguiente →"        │
│  (last question: "Terminar →")       │
│                                      │
│  Step dots  ● ● ● ◦ ◦ ◦             │
└──────────────────────────────────────┘
```

**Answer option card anatomy**:
```
┌──────────────────────────────────────────────┐
│  ○  Option text runs here across the card.   │
│     It can wrap to two lines naturally.      │
└──────────────────────────────────────────────┘
  ↑ indicator: 18×18px circle (radio) or rounded-square (checkbox for multi)
  - Default: 2px border rgba(255,255,255,0.2), transparent fill
  - Selected: border + fill var(--green-mid), white ✓ SVG inside
```

**Key design notes**:
- One question visible at a time. No scroll needed within the card.
- Progress bar fills proportionally per step (step 0 = 0%, step 1 = 1/6 = 16.6%, etc.)
- Step dots at bottom: completed = green pill, current = wide lime pill, future = grey dot.
- Multi-select (B2B Q6) shows checkbox indicators (border-radius 4px). Single-select = circles.
- "Siguiente" button only active after user taps an option. If tapped before selecting → red error text.

---

### Screen 4 — Resultado `/auditoria/resultado`
**Block label**: `05 · AUDITORÍA` | Counter: `04 / 04`

The result screen has two variants: **B2C** (individual) and **B2B** (business).

---

#### Screen 4A — B2C Result

```
┌──────────────────────────────────────┐
│  BLOCK HEADER: 05 · AUDITORÍA        │  04 / 04
├──────────────────────────────────────┤
│  [GlowBlob top-right]                │
│                                      │
│  ┌ Level Badge Card ────────────────┐│  ← gradient tint bg
│  │  LABEL SM: "TU NIVEL ACTUAL"     ││
│  │  LARGE NUMBER: "3"               ││  ← Soria 48–80px
│  │  LEVEL NAME: "PRODUCCIÓN"        ││  ← green-light, 13px ALL CAPS
│  │  Diagnostic paragraph (15px)     ││  ← **bold** rendered as green
│  └──────────────────────────────────┘│
│                                      │
│  [if gap > 2: orange/amber warning]  │
│  "Tu meta es ambiciosa."             │
│                                      │
│  ─── PUNTOS DÉBILES ───              │
│  ┌ Card ──────────────────────────┐  │
│  │  • Weak point 1                │  │
│  │  • Weak point 2                │  │
│  │  • Weak point 3                │  │
│  └────────────────────────────────┘  │
│                                      │
│  ─── PRÓXIMO NIVEL ───               │
│  ┌ Card ──────────────────────────┐  │
│  │  Body text about next level    │  │
│  └────────────────────────────────┘  │
│                                      │
│  ─── TU KIT NIVEL N ───              │
│  ┌ Card ──────────────────────────┐  │
│  │  Kit headline text             │  │
│  │                                │  │
│  │  STACK LABEL                   │  │
│  │  [pill] [pill] [pill] [pill]   │  │  ← tool names as chips
│  │                                │  │
│  │  RUTINA 7 DÍAS LABEL           │  │
│  │  ┌ 7-day grid ───────────────┐ │  │
│  │  │ LUN │ MAR │ MIÉ │...     │ │  │
│  │  │ text│ text│ text │       │ │  │
│  │  └────────────────────────── ┘ │  │
│  │                                │  │
│  │  EJERCICIO LABEL               │  │
│  │  Exercise text                 │  │
│  │                                │  │
│  │  ┌ Trap ─────┐  ┌ Signal ───┐ │  │
│  │  │ ⚠ trap    │  │ ↑ signal  │ │  │
│  │  └───────────┘  └───────────┘ │  │
│  └────────────────────────────────┘  │
│                                      │
│  ─── ACCIONES SEMANALES ───          │
│  ┌ Card ──────────────────────────┐  │
│  │  01  Action one text           │  │
│  │  02  Action two text           │  │
│  │  03  Action three text         │  │
│  └────────────────────────────────┘  │
│                                      │
│  ─── SIGUIENTE PASO ───              │
│  [btn-primary]  "Unirme a la comunidad"│
│  [btn-secondary] "Sesión 1-a-1"      │
│  [btn-ghost]    "← Empezar de nuevo" │
└──────────────────────────────────────┘
```

**Level Badge Card** styling:
- `background: linear-gradient(135deg, rgba(76,175,126,0.12) 0%, rgba(31,139,76,0.06) 100%)`
- `border-color: rgba(76,175,126,0.2)`
- Level number: Soria, 48–80px, green fill
- Level name below number: 13px Vercetti bold, ALL CAPS, `color: var(--green-light)`

**7-day grid**: 7-column flex row. Each cell has day label (7px ALL CAPS, ink-faint) and activity text (12px, white/70%).

**Weekly actions**: numbered 01/02/03 with large left-side numerals in green.

---

#### Screen 4B — B2B Result

```
┌──────────────────────────────────────┐
│  BLOCK HEADER: 05 · AUDITORÍA        │  04 / 04
├──────────────────────────────────────┤
│                                      │
│  ┌ Quadrant Badge Card ─────────────┐│
│  │  LABEL SM: "TU CUADRANTE"        ││
│  │  QUADRANT NAME: "DISCIPLINA"     ││  ← Soria 48–80px
│  │  Quadrant tagline                ││  ← green-light small
│  │  Snapshot paragraph              ││
│  └──────────────────────────────────┘│
│                                      │
│  ─── CUELLO DE BOTELLA ───           │
│  ┌ Card ──────────────────────────┐  │
│  │  Bottleneck text (interpolated)│  │
│  └────────────────────────────────┘  │
│                                      │
│  ─── ANÁLISIS TOC ───                │
│  ┌ Card ──────────────────────────┐  │
│  │  T: throughput text            │  │
│  │  I: inventory text             │  │
│  │  OE: opex text                 │  │
│  └────────────────────────────────┘  │
│                                      │
│  ─── MOVIMIENTOS IA ───              │
│  ┌─────────────────┐  ┌───────────┐  │
│  │ AI MOVES        │  │ AI NOISE  │  │
│  │ (bullets, ✓)    │  │ (bullets, │  │
│  │                 │  │ warnings) │  │
│  └─────────────────┘  └───────────┘  │
│                                      │
│  ─── PLAN 30/60/90 ───               │
│  ┌ Card ──────────────────────────┐  │
│  │  30 DÍAS  text                 │  │
│  │  ─────────                     │  │
│  │  60 DÍAS  text                 │  │
│  │  ─────────                     │  │
│  │  90 DÍAS  text                 │  │
│  └────────────────────────────────┘  │
│                                      │
│  [btn-primary]  "Explorar soluciones"│
│  [btn-secondary] "Sesión estratégica"│
│  [btn-ghost]    "← Empezar de nuevo" │
└──────────────────────────────────────┘
```

**Quadrant names**: `INSTINTO`, `TOOL_TRAP`, `DISCIPLINA`, `OPTIMIZADO`  
Each has a distinct tagline and a gradient-tinted badge card.

**AI Moves vs AI Noise** — two-column grid:
- Left: green-tinted items (positive actions)
- Right: red/neutral-tinted items (things to avoid)

---

## 7 · Motion & Interaction

### Screen transitions
```css
.screen-enter {
  animation: screenEnter 500ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes screenEnter {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
```
Every new route (including quiz step-to-step) fades + lifts in.

### Button spring
```css
transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), filter 200ms;
/* Hover: translateY(-1px) */
/* Active: scale(0.98) */
```

### Progress bar
`transition: width 400ms cubic-bezier(0.16, 1, 0.3, 1)` — smooth but snappy.

### Card selection
`transition: all 0.18s ease` — quick, not bouncy.

### LLM streaming caret (Sprint 3 — placeholder for now)
```css
.caret {
  display: inline-block; width: 8px; height: 1em;
  background: var(--green-light);
  animation: caret 0.9s steps(2) infinite;
}
```

---

## 8 · Bilingual System

All copy exists in two languages (ES/EN). Language is stored in `localStorage("altafuia_lang")`.  
Default: **ES** (Spanish). Toggle: floating `[ES · EN]` pill in top-right corner.

The language toggle is always visible and toggles live without page reload.

---

## 9 · Full User Flow

```
/ (Landing)
   ↓ "Empezar la auditoría"
/auditoria/email
   ↓ name + email + source → /api/leads → lead_id stored
/auditoria/perfil
   ↓ tap card "INDIVIDUAL" or "EMPRESA"
/auditoria/quiz/individual  (6 questions)
      OR
/auditoria/quiz/business    (8 questions)
   ↓ answers scored locally → /api/quiz (fire-and-forget)
   ↓ result stored in localStorage
/auditoria/resultado
   ↓ show B2C or B2B result
   ↓ CTA buttons → community / 1-on-1 booking
```

Progress counter in BlockHeader:
- `/` → `00 / 04`
- `/auditoria/email` → `01 / 04`
- `/auditoria/perfil` → `02 / 04`
- `/auditoria/quiz/*` → `03 / 04` + internal `NN/06` or `NN/08`
- `/auditoria/resultado` → `04 / 04`

---

## 10 · Design Anti-patterns (do NOT do these)

- **No white/light backgrounds** anywhere. Even cards stay near-black.
- **No rounded corners above 14px** on major cards. This isn't bubbly SaaS.
- **No drop shadows** — depth comes from border + background contrast only.
- **No color other than the green palette + white** except for `--alert-red` on errors.
- **No centered body text** except the level number and quote.
- **No chunky padding** — the brand is editorial, spare, not generous.
- **No emoji** in UI (the grain overlay + glowblobs supply the visual texture).

---

## 11 · Assets & Files Reference

| Asset | Path |
|-------|------|
| Display font (Soria) | `public/fonts/soria-font.ttf` |
| Sans font (Vercetti) | `public/fonts/Vercetti-Regular.woff` |
| CSS tokens + base styles | `app/globals.css` |
| Tailwind config | `tailwind.config.ts` |
| All quiz copy + audit content | `lib/quiz-data.ts` |
| Scoring logic | `lib/scoring.ts` |
| UI copy (bilingual strings) | `lib/copy.ts` |
| Landing page | `app/page.tsx` + `components/shared/Hero.tsx` |
| Email gate | `app/auditoria/email/EmailGateScreen.tsx` |
| Profile selector | `app/auditoria/perfil/page.tsx` |
| Quiz | `app/auditoria/quiz/QuizScreen.tsx` |
| Result | `app/auditoria/resultado/ResultadoScreen.tsx` |
