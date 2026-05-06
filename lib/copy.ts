// AltafuIA · Copy strings ES/EN
// Adaptado de Cloud Design (filmmaiker-studio-form/project/copy.js).
// Todo el copy de pantallas vive acá para poder editarlo en un solo lugar.

export type Lang = "es" | "en";

export const LANGS: Lang[] = ["es", "en"];
export const DEFAULT_LANG: Lang = "es";

export type Bilingual = { es: string; en: string };

export const t = (s: Bilingual, lang: Lang) => s[lang];

export const copy = {
  brand: {
    eyebrow: { es: "ALTAFUIA · FILMMAIKER STUDIO", en: "ALTAFUIA · FILMMAIKER STUDIO" },
    tagline: { es: "CINE DE 6 CIFRAS HECHO CON IA", en: "6-FIGURE CINEMA MADE WITH AI" },
    humanLayer: { es: "THE HUMAN LAYER™", en: "THE HUMAN LAYER™" },
  },
  blocks: {
    landing: { es: "00 · LANDING", en: "00 · LANDING" },
    email: { es: "01 · EMAIL GATE", en: "01 · EMAIL GATE" },
    perfil: { es: "02 · BIFURCACIÓN", en: "02 · ROUTE" },
    quizB2C: { es: "03 · DIAGNÓSTICO PERSONA", en: "03 · INDIVIDUAL DIAGNOSTIC" },
    quizB2B: { es: "03 · DIAGNÓSTICO EMPRESA", en: "03 · BUSINESS DIAGNOSTIC" },
    audit: { es: "04 · AUDITORÍA", en: "04 · AUDIT" },
  },
  landing: {
    eyebrow: { es: "AUDITORÍA INTELIGENTE", en: "INTELLIGENT AUDIT" },
    blockSub: { es: "BLOQUE 00 · PROMESA", en: "BLOCK 00 · PROMISE" },
    h1Pre: { es: "Auditá tu posición frente a la", en: "Audit your position against" },
    h1Word: { es: "IA", en: "AI" },
    h1Post: { es: "en tres minutos.", en: "in three minutes." },
    sub: {
      es: "Diagnóstico personalizado por nivel y por cuello de botella. Devuelve un plan para la semana que viene — no para algún día.",
      en: "Personalized diagnostic by level and by bottleneck. Returns a plan for next week — not someday.",
    },
    cta: { es: "Empezar diagnóstico", en: "Start diagnostic" },
    foot: {
      es: "SIN DESCARGAR NADA · SIN NEWSLETTER ETERNA",
      en: "NOTHING TO DOWNLOAD · NO ENDLESS NEWSLETTER",
    },
    qrLabel: { es: "QR DE SALA", en: "ROOM QR" },
    quote: {
      es: "No construimos un formulario. Construimos un espejo que devuelve un siguiente paso.",
      en: "We don't build a form. We build a mirror that returns a next step.",
    },
  },
  email: {
    blockSub: { es: "PASO 01 · IDENTIDAD", en: "STEP 01 · IDENTITY" },
    h1: { es: "Antes del diagnóstico,", en: "Before the diagnostic," },
    h1b: { es: "el email.", en: "the email." },
    sub: {
      es: "Te lo mandamos también ahí. Cero spam. Cero newsletter eterna.",
      en: "We send it there too. Zero spam. No endless newsletter.",
    },
    nameLabel: { es: "TU NOMBRE", en: "YOUR NAME" },
    namePh: { es: "Solo el primero", en: "First name only" },
    emailLabel: { es: "TU EMAIL", en: "YOUR EMAIL" },
    emailPh: { es: "vos@dominio.com", en: "you@domain.com" },
    sourceLabel: { es: "¿CÓMO LLEGASTE?", en: "HOW DID YOU FIND US?" },
    sourceOptions: {
      es: ["AltafuIA", "Instagram", "LinkedIn", "Referido", "Otro"],
      en: ["AltafuIA", "Instagram", "LinkedIn", "Referral", "Other"],
    },
    cta: { es: "Empezar diagnóstico", en: "Start diagnostic" },
    micro: {
      es: "AL CONTINUAR ACEPTÁS LA POLÍTICA DE PRIVACIDAD",
      en: "BY CONTINUING YOU ACCEPT OUR PRIVACY POLICY",
    },
    invalidEmail: { es: "Email inválido", en: "Invalid email" },
    invalidName: { es: "Necesitamos tu nombre", en: "We need your name" },
  },
  perfil: {
    blockSub: { es: "PASO 02 · CAMINO", en: "STEP 02 · ROUTE" },
    headline: {
      es: "¿Para quién es esta auditoría?",
      en: "Who is this audit for?",
    },
    sub: {
      es: "UNA SOLA ELECCIÓN · LA AUDITORÍA SE ADAPTA",
      en: "ONE CHOICE · THE AUDIT ADAPTS",
    },
    individual: {
      tag: { es: "PERSONA · CREADOR", en: "PERSON · CREATOR" },
      title: {
        es: "Soy creador, artista o freelance",
        en: "I'm a creator, artist or freelance",
      },
      body: {
        es: "Filmmaker, fotógrafo, animador, editor, diseñador, creador de contenido. Trabajo solo o con un equipo pequeño.",
        en: "Filmmaker, photographer, animator, editor, designer, content creator. I work solo or with a small team.",
      },
      questions: { es: "6 PREGUNTAS · ~3 MIN", en: "6 QUESTIONS · ~3 MIN" },
    },
    business: {
      tag: { es: "EMPRESA · ORGANIZACIÓN", en: "BUSINESS · ORGANIZATION" },
      title: {
        es: "Represento un estudio, agencia o productora",
        en: "I represent a studio, agency or production house",
      },
      body: {
        es: "Tenemos equipo, clientes, facturación recurrente. Queremos saber dónde la IA mueve aguja y dónde no.",
        en: "We have a team, clients, recurring revenue. We want to know where AI moves the needle and where it doesn't.",
      },
      questions: { es: "8 PREGUNTAS · ~3 MIN", en: "8 QUESTIONS · ~3 MIN" },
    },
  },
} as const;
