import type { Bilingual } from "./copy";

export type QuizType = "individual" | "business";

// ── B2C questions ────────────────────────────────────────────────────────────
export interface B2COption {
  score: number;
  t: Bilingual;
}
export interface B2CQuestion {
  q: Bilingual;
  opts: B2COption[];
  isGoal?: boolean;
}

export const QB2C: B2CQuestion[] = [
  {
    q: { es: "¿Qué frase describe mejor tu relación con la IA hoy?", en: "Which sentence best describes your relationship with AI today?" },
    opts: [
      { score: 0, t: { es: '"No la uso. Me parece moda, amenaza o juguete."', en: '"I don\'t use it. Hype, threat or toy."' } },
      { score: 1, t: { es: '"Me da curiosidad pero no sé por dónde empezar."', en: '"Curious, but no idea where to start."' } },
      { score: 2, t: { es: '"Ya hice imágenes o videos, pero todo me sale random."', en: '"I made images or videos, but it all comes out random."' } },
      { score: 3, t: { es: '"Hago piezas reales con IA, pero no siempre con el resultado que busco."', en: '"I make real pieces with AI, but not always with the result I want."' } },
      { score: 4, t: { es: '"Tengo un sistema repetible y trabajo con clientes / audiencia."', en: '"I have a repeatable system and work with clients / audience."' } },
    ],
  },
  {
    q: { es: "Cuando le pedís algo a una IA generativa, ¿cómo lo hacés?", en: "When you prompt a generative AI, how do you do it?" },
    opts: [
      { score: 0, t: { es: '"Pongo cosas tipo \'hazlo cinematográfico, épico, ultrarealista\'."', en: '"Stuff like \'make it cinematic, epic, ultrarealistic\'."' } },
      { score: 1, t: { es: '"Describo lo que quiero ver con detalle, pero sin lenguaje técnico."', en: '"I describe what I want in detail, but without technical language."' } },
      { score: 2, t: { es: '"Uso plano, lente, luz, movimiento, mood. Tomo decisiones."', en: '"I use shot, lens, light, motion, mood. I decide."' } },
      { score: 3, t: { es: '"Tengo plantillas propias y versionado de prompts."', en: '"Own templates and prompt versioning."' } },
    ],
  },
  {
    q: { es: "¿Qué tan lejos llega tu pieza típica?", en: "How far does your typical piece go?" },
    opts: [
      { score: 0, t: { es: '"No produzco piezas con IA todavía."', en: '"I don\'t produce pieces with AI yet."' } },
      { score: 1, t: { es: '"Genero imágenes sueltas o clips de prueba."', en: '"I generate single images or test clips."' } },
      { score: 2, t: { es: '"Hago piezas terminadas: idea → keyframe → video → edición."', en: '"I make finished pieces: idea → keyframe → video → edit."' } },
      { score: 3, t: { es: '"Hago piezas con voz, sonido y publicación."', en: '"Pieces with voice, sound and publishing."' } },
      { score: 4, t: { es: '"Hago series, campañas o productos recurrentes."', en: '"Recurring series, campaigns or products."' } },
    ],
  },
  {
    q: { es: "Si te contratan mañana para repetir tu mejor pieza, ¿cómo lo harías?", en: "If hired tomorrow to repeat your best piece, how would you do it?" },
    opts: [
      { score: 0, t: { es: '"Probaría y rezaría. No tengo registro."', en: '"I\'d try and pray. No record."' } },
      { score: 1, t: { es: '"Reviso mis prompts pasados a mano y reconstruyo."', en: '"Manually review past prompts and rebuild."' } },
      { score: 2, t: { es: '"Tengo prompts y referencias guardados, pero sin orden."', en: '"Saved prompts and refs, but unordered."' } },
      { score: 3, t: { es: '"Tengo BBDD versionada, templates y checklist anti-slop."', en: '"Versioned DB, templates and anti-slop checklist."' } },
    ],
  },
  {
    q: { es: "¿Quién paga (o pagaría) por tu trabajo hoy?", en: "Who pays (or would pay) for your work today?" },
    opts: [
      { score: 0, t: { es: '"Nadie. Estoy aprendiendo."', en: '"Nobody. I\'m learning."' } },
      { score: 1, t: { es: '"Algún cliente puntual de mi entorno."', en: '"Occasional client in my circle."' } },
      { score: 2, t: { es: '"Tengo clientes recurrentes o audiencia que me sigue."', en: '"Recurring clients or following audience."' } },
      { score: 3, t: { es: '"Tengo marca personal, oferta clara y comunidad propia."', en: '"Personal brand, clear offer, own community."' } },
    ],
  },
  {
    q: { es: "Si dentro de 90 días te ves en el espejo, ¿qué querés haber logrado?", en: "In 90 days when you look in the mirror, what do you want to have achieved?" },
    isGoal: true,
    opts: [
      { score: 1, t: { es: '"Entender qué hace la IA y qué no, sin miedo."', en: '"Understand what AI does and doesn\'t, without fear."' } },
      { score: 2, t: { es: '"Hacer mi primera pieza terminada con IA."', en: '"Make my first finished AI piece."' } },
      { score: 3, t: { es: '"Sacar piezas reales con narrativa, voz y publicación."', en: '"Ship real pieces with narrative, voice and publishing."' } },
      { score: 4, t: { es: '"Tener un sistema repetible que escale."', en: '"Have a repeatable system that scales."' } },
      { score: 5, t: { es: '"Vivir de esto con marca y comunidad propia."', en: '"Live off this with own brand and community."' } },
    ],
  },
];

// ── B2B questions ────────────────────────────────────────────────────────────
export interface B2BOption {
  value: string;
  score?: number;
  t: Bilingual;
}
export interface B2BQuestion {
  q: Bilingual;
  opts: B2BOption[];
  multi?: boolean;
}

export const QB2B: B2BQuestion[] = [
  {
    q: { es: "¿Cómo describirías mejor a tu organización?", en: "How would you describe your organization?" },
    opts: [
      { value: "productora", t: { es: "Productora audiovisual / casa de producción", en: "Audiovisual production company" } },
      { value: "agencia", t: { es: "Agencia creativa / publicidad", en: "Creative / advertising agency" } },
      { value: "estudio", t: { es: "Estudio de diseño / branding", en: "Design / branding studio" } },
      { value: "inhouse", t: { es: "Marca / equipo de marketing in-house", en: "Brand / in-house marketing team" } },
      { value: "otro", t: { es: "Otra", en: "Other" } },
    ],
  },
  {
    q: { es: "¿Qué tamaño tiene tu equipo y a qué escala facturás?", en: "How large is your team and at what revenue scale?" },
    opts: [
      { value: "solo", t: { es: "Solo / freelance — < 50k €/año", en: "Solo / freelance — < €50k/yr" } },
      { value: "small", t: { es: "Estudio pequeño 2–5 personas — 50k–250k €/año", en: "Small studio 2–5 people — €50k–250k/yr" } },
      { value: "mid", t: { es: "Estudio mediano 6–20 personas — 250k–1M €/año", en: "Mid studio 6–20 people — €250k–1M/yr" } },
      { value: "big", t: { es: "Estructura grande — > 1M €/año", en: "Large structure — > €1M/yr" } },
    ],
  },
  {
    q: { es: "En tu pipeline típico, ¿cuál es la métrica que más mirás?", en: "In your typical pipeline, which metric do you watch most?" },
    opts: [
      { value: "hours", score: 0, t: { es: "Horas trabajadas por persona.", en: "Hours worked per person." } },
      { value: "outputs", score: 1, t: { es: "Cantidad de outputs generados (clips, piezas, posts).", en: "Number of outputs generated." } },
      { value: "ontime", score: 2, t: { es: "Proyectos entregados en plazo.", en: "Projects delivered on time." } },
      { value: "throughput", score: 3, t: { es: "€ cobrados por entrega validada (throughput).", en: "€ billed per validated delivery (throughput)." } },
    ],
  },
  {
    q: { es: "¿Tu equipo deja proyectos a medio terminar o en revisión durante semanas?", en: "Does your team leave projects half-done or in review for weeks?" },
    opts: [
      { value: "always", score: 0, t: { es: "Constantemente. Acumulamos cosas a medio.", en: "Constantly. We accumulate half-done things." } },
      { value: "sometimes", score: 1, t: { es: "A veces, sobre todo cuando entran proyectos nuevos.", en: "Sometimes, especially when new projects come in." } },
      { value: "rarely", score: 2, t: { es: "Pocas veces. Cerramos lo que abrimos.", en: "Rarely. We close what we open." } },
      { value: "never", score: 3, t: { es: "Tenemos WIP-cap explícito. Nunca abrimos sin cerrar.", en: "Explicit WIP-cap. We never open without closing." } },
    ],
  },
  {
    q: { es: "¿Dónde sentís que se traba el flujo de trabajo más seguido?", en: "Where do you feel the workflow gets stuck most often?" },
    opts: [
      { value: "sales", t: { es: "Captación de clientes / ventas", en: "Client acquisition / sales" } },
      { value: "briefing", t: { es: "Briefing y preproducción", en: "Briefing and pre-production" } },
      { value: "production", t: { es: "Producción / generación / rodaje", en: "Production / generation / shoot" } },
      { value: "post", t: { es: "Postproducción / edición", en: "Post-production / editing" } },
      { value: "review", t: { es: "Revisión y aprobación de cliente", en: "Client review and approval" } },
      { value: "admin", t: { es: "Cobro y cierre administrativo", en: "Billing and admin closure" } },
    ],
  },
  {
    q: { es: "¿Cómo usás la IA hoy en tu organización?", en: "How do you use AI in your organization today?" },
    multi: true,
    opts: [
      { value: "none", t: { es: "No usamos IA generativa todavía", en: "We don't use generative AI yet" } },
      { value: "text", t: { es: "Texto: copy, briefs, guiones (LLMs)", en: "Text: copy, briefs, scripts (LLMs)" } },
      { value: "image", t: { es: "Imagen: keyframes, moodboards, concept art", en: "Image: keyframes, moodboards, concept art" } },
      { value: "video", t: { es: "Video: previsualización o entregables", en: "Video: previz or deliverables" } },
      { value: "audio", t: { es: "Voz / sonido / música", en: "Voice / sound / music" } },
      { value: "agent", t: { es: "Agentes / automatizaciones internas", en: "Agents / internal automations" } },
    ],
  },
  {
    q: { es: "¿Cuál es el mayor freno interno para usar más IA?", en: "What is the biggest internal brake to using more AI?" },
    opts: [
      { value: "criterio", t: { es: "Falta de criterio / dirección creativa que la guíe", en: "Lack of judgment / creative direction to steer it" } },
      { value: "pipeline", t: { es: "Falta de pipeline / nadie sabe cómo integrarla", en: "Lack of pipeline / nobody knows how to integrate" } },
      { value: "resistencia", t: { es: "Resistencia del equipo / clientes", en: "Team / client resistance" } },
      { value: "coste", t: { es: "Coste de herramientas y créditos", en: "Tool and credit costs" } },
      { value: "etica", t: { es: "Ética, derechos de autor, riesgo legal", en: "Ethics, IP rights, legal risk" } },
    ],
  },
  {
    q: { es: "Si en 6 meses tu organización es notablemente mejor con IA, ¿qué habría cambiado?", en: "In 6 months if your organization is notably better with AI, what would have changed?" },
    opts: [
      { value: "cost", t: { es: "Reducir costes de producción manteniendo calidad", en: "Reduce production costs maintaining quality" } },
      { value: "throughput", t: { es: "Aumentar throughput sin aumentar plantilla", en: "Increase throughput without growing headcount" } },
      { value: "differentiation", t: { es: "Diferenciarnos creativamente del resto del mercado", en: "Differentiate creatively from the market" } },
      { value: "newlines", t: { es: "Lanzar nuevas líneas de servicio o producto", en: "Launch new service or product lines" } },
      { value: "team", t: { es: "Tener un equipo formado y autónomo en IA", en: "Have a trained autonomous AI team" } },
    ],
  },
];

// ── Level kits ───────────────────────────────────────────────────────────────
export interface Kit {
  name: Bilingual;
  headline: Bilingual;
  stack: { es: string[]; en: string[] };
  workflow: Record<string, Bilingual>;
  exercise: { title: Bilingual; duration: string; output: Bilingual };
  trap: Bilingual;
  upSignal: Bilingual;
}

export const KITS: Record<number, Kit> = {
  0: {
    name: { es: "NEGACIÓN", en: "DENIAL" },
    headline: { es: "Sin presión. Una semana para mirar sin convertirte.", en: "No pressure. A week to look without converting." },
    stack: {
      es: ["ChatGPT (gratis) — solo para conversar", "1 cuaderno físico", "Cero suscripciones", "Cero compromisos"],
      en: ["ChatGPT (free) — just to chat", "1 paper notebook", "Zero subscriptions", "Zero commitments"],
    },
    workflow: {
      lunes: { es: "Anotá las 3 cosas que te incomodan de la IA.", en: "Write the 3 things that bother you about AI." },
      martes: { es: "Pedile a un LLM que te explique una de esas 3 cosas.", en: "Ask an LLM to explain one of those 3 things." },
      miercoles: { es: "Sin tocar IA. Releé tus notas.", en: "No AI. Re-read your notes." },
      jueves: { es: "Pedile a la IA un argumento opuesto al tuyo.", en: "Ask AI for an argument opposing yours." },
      viernes: { es: "Pausa. Tomá café.", en: "Pause. Have coffee." },
      sabado: { es: "Mirá una pieza humana que admirás.", en: "Watch a human-made piece you admire." },
      domingo: { es: "Decidí: ¿curiosidad o cierre? Es válido cualquiera.", en: "Decide: curious or closed? Either is valid." },
    },
    exercise: { title: { es: "La conversación que evitabas", en: "The conversation you were avoiding" }, duration: "60 min", output: { es: "1 página de notas honestas", en: "1 page of honest notes" } },
    trap: { es: "Pelearte con la herramienta sin haberla usado nunca. La opinión sin práctica es la trampa.", en: "Fighting the tool without ever using it. Opinion without practice is the trap." },
    upSignal: { es: "Te descubrís pensando 'a ver qué pasaría si...' sin culpa.", en: "You catch yourself thinking 'what if...' without guilt." },
  },
  1: {
    name: { es: "CURIOSIDAD", en: "CURIOSITY" },
    headline: { es: "Una pieza, una semana.", en: "One piece, one week." },
    stack: {
      es: ["1 LLM (ChatGPT o Claude)", "1 generador de imagen (GPT Image o Midjourney V7)", "1 generador de video opcional (Sora o Runway)", "1 editor (CapCut o iMovie)"],
      en: ["1 LLM (ChatGPT or Claude)", "1 image gen (GPT Image or Midjourney V7)", "1 optional video gen (Sora or Runway)", "1 editor (CapCut or iMovie)"],
    },
    workflow: {
      lunes: { es: "Caso de uso. Elegí UNO.", en: "Use case. Pick ONE." },
      martes: { es: "Premisa en una frase.", en: "Premise in one sentence." },
      miercoles: { es: "5 imágenes con la misma frase.", en: "5 images from the same prompt." },
      jueves: { es: "5 versiones cambiando UNA cosa.", en: "5 versions changing ONE thing." },
      viernes: { es: "Final. Animala 5s si querés.", en: "Final. Animate 5s if you want." },
      sabado: { es: "Edición en CapCut. Música. Exportá.", en: "Edit in CapCut. Music. Export." },
      domingo: { es: "Publicación.", en: "Publish." },
    },
    exercise: { title: { es: "El plano que abre tu propia película", en: "The shot that opens your own film" }, duration: "90 min", output: { es: "1 imagen final + nota de 100 palabras", en: "1 final image + 100-word note" } },
    trap: { es: "Abrir 8 herramientas y no terminar ninguna pieza. La parálisis del menú.", en: "Opening 8 tools and finishing zero pieces. Menu paralysis." },
    upSignal: { es: "Terminás la pieza y pensás: ahora sé qué le pediría distinto.", en: "You finish and think: now I know what I'd ask differently." },
  },
  2: {
    name: { es: "JUGUETEO", en: "PLAY" },
    headline: { es: "Decisiones, no suerte.", en: "Decisions, not luck." },
    stack: {
      es: ["1 LLM con memoria activa", "Midjourney + ControlNet o GPT Image edit", "1 video gen con referencia", "Notion o Obsidian para prompts"],
      en: ["1 LLM with memory enabled", "Midjourney + ControlNet or GPT Image edit", "1 video gen with references", "Notion or Obsidian for prompts"],
    },
    workflow: {
      lunes: { es: "Definí 3 variables: plano, lente, luz.", en: "Define 3 variables: shot, lens, light." },
      martes: { es: "Genera 3x3 (matriz de variables).", en: "Generate 3x3 (variable matrix)." },
      miercoles: { es: "Elegí 3 ganadoras. Por qué ganaron.", en: "Pick 3 winners. Why they won." },
      jueves: { es: "Repetí el winner cambiando solo el sujeto.", en: "Repeat the winner changing only subject." },
      viernes: { es: "Animá la mejor. 3 versiones distintas.", en: "Animate the best. 3 different takes." },
      sabado: { es: "Edición con corte y ritmo, no slideshow.", en: "Edit with cuts and rhythm, not slideshow." },
      domingo: { es: "Publicá + nota técnica de qué probaste.", en: "Publish + tech note of what you tried." },
    },
    exercise: { title: { es: "Una secuencia con 3 planos del mismo mundo", en: "A 3-shot sequence in the same world" }, duration: "90 min", output: { es: "3 frames + 1 clip de 10s", en: "3 frames + 1 ten-second clip" } },
    trap: { es: "Pedirle epico cinematografico y aceptar lo primero que sale. Adjetivos vagos = output vago.", en: "Asking for 'epic cinematic' and accepting the first output. Vague adjectives = vague output." },
    upSignal: { es: "Sabés decir por qué un plano funciona, no solo que te gusta.", en: "You can say why a shot works, not just that you like it." },
  },
  3: {
    name: { es: "PRODUCCIÓN", en: "PRODUCTION" },
    headline: { es: "Pieza con voz, sonido y publicación.", en: "Piece with voice, sound and publishing." },
    stack: {
      es: ["LLM + biblioteca de prompts versionada", "Image gen + 3 referencias estables", "Video gen + ElevenLabs voz", "DaVinci Resolve o Premiere"],
      en: ["LLM + versioned prompt library", "Image gen + 3 stable refs", "Video gen + ElevenLabs voice", "DaVinci Resolve or Premiere"],
    },
    workflow: {
      lunes: { es: "Concepto + tratamiento de 1 página.", en: "Concept + 1-page treatment." },
      martes: { es: "Storyboard 6 planos con keyframes IA.", en: "6-shot storyboard with AI keyframes." },
      miercoles: { es: "Generación video por plano, dos takes c/u.", en: "Video gen per shot, two takes each." },
      jueves: { es: "Voz, foley y música en una sesión.", en: "Voice, foley and music in one session." },
      viernes: { es: "Edición con árbol narrativo claro.", en: "Edit with clear narrative tree." },
      sabado: { es: "Color y mezcla. No saltarse este paso.", en: "Color and mix. Don't skip." },
      domingo: { es: "Publicación + ficha técnica pública.", en: "Publish + public tech sheet." },
    },
    exercise: { title: { es: "Cortometraje de 60 segundos completo", en: "60-second short, complete" }, duration: "90 min", output: { es: "1 corto exportado + ficha técnica", en: "1 exported short + tech sheet" } },
    trap: { es: "Generar 50 clips y ver qué sale. Sin tratamiento, no hay película — hay slop con resolución.", en: "Generating 50 clips to see what happens. No treatment, no film — just slop with resolution." },
    upSignal: { es: "Tenés 3 piezas con la misma firma reconocible. No accidentes. Decisiones.", en: "You have 3 pieces with the same recognizable signature. No accidents. Decisions." },
  },
  4: {
    name: { es: "SISTEMA", en: "SYSTEM" },
    headline: { es: "Repetible. Escalable. Tuyo.", en: "Repeatable. Scalable. Yours." },
    stack: {
      es: ["LLM + agentes con tools propias", "Pipeline ComfyUI o Replicate API", "BBDD prompts versionada (Notion/SQL)", "Cliente o audiencia con expectativa"],
      en: ["LLM + agents with custom tools", "ComfyUI or Replicate API pipeline", "Versioned prompt DB (Notion/SQL)", "Client or audience with expectation"],
    },
    workflow: {
      lunes: { es: "Brief → ticket → asignación de pipeline.", en: "Brief → ticket → pipeline assignment." },
      martes: { es: "Generación masiva con templates.", en: "Bulk gen with templates." },
      miercoles: { es: "Curaduría: filtro humano y QA.", en: "Curation: human filter and QA." },
      jueves: { es: "Postpro y entrega cliente.", en: "Post and client delivery." },
      viernes: { es: "Retro: qué template falló y por qué.", en: "Retro: which template failed and why." },
      sabado: { es: "Mejora 1 template.", en: "Improve 1 template." },
      domingo: { es: "Backup + métricas semanales.", en: "Backup + weekly metrics." },
    },
    exercise: { title: { es: "Un pipeline operable por otra persona", en: "A pipeline another person can operate" }, duration: "90 min", output: { es: "1 SOP escrito + 1 video de loom", en: "1 written SOP + 1 loom video" } },
    trap: { es: "Convertirte en operario de tu propio pipeline. El sistema es palanca, no jaula.", en: "Becoming the operator of your own pipeline. System is leverage, not cage." },
    upSignal: { es: "Otra persona puede entregar usando tu pipeline sin llamarte.", en: "Someone else can deliver via your pipeline without calling you." },
  },
  5: {
    name: { es: "CAPA HUMANA", en: "HUMAN LAYER" },
    headline: { es: "Tu firma vale más que tu stack.", en: "Your signature is worth more than your stack." },
    stack: {
      es: ["Marca personal con criterio claro", "Comunidad propia activa", "Oferta clara con precio claro", "Equipo o agentes que ejecutan"],
      en: ["Personal brand with clear criteria", "Active own community", "Clear offer with clear pricing", "Team or agents that execute"],
    },
    workflow: {
      lunes: { es: "Decidís qué NO vas a hacer esta semana.", en: "Decide what you will NOT do this week." },
      martes: { es: "Reunión con equipo / agentes.", en: "Meeting with team / agents." },
      miercoles: { es: "Trabajo de criterio: revisás, no producís.", en: "Criteria work: review, don't produce." },
      jueves: { es: "Una conversación profunda con un cliente.", en: "One deep conversation with a client." },
      viernes: { es: "Una charla pública o pieza de tesis.", en: "A public talk or thesis piece." },
      sabado: { es: "Off. En serio.", en: "Off. Seriously." },
      domingo: { es: "Lectura larga. Nada de pantalla operativa.", en: "Long reading. No operational screen." },
    },
    exercise: { title: { es: "Tu manifiesto en 200 palabras", en: "Your manifesto in 200 words" }, duration: "90 min", output: { es: "1 manifiesto público + comentarios de 5 lectores", en: "1 public manifesto + 5 reader comments" } },
    trap: { es: "Volver al tablero. La capa humana se construye delegando, no produciendo.", en: "Going back to the board. The human layer is built by delegating, not producing." },
    upSignal: { es: "Tu agenda tiene más conversaciones que entregables.", en: "Your calendar has more conversations than deliverables." },
  },
};

// ── B2C audit templates ──────────────────────────────────────────────────────
export const AUDIT_B2C = {
  diagnostic: {
    0: { es: "Estás en **nivel 0**. Te ubico ahí porque dijiste que la IA te parece moda, amenaza o juguete y nunca generaste una pieza con ella. No es un problema. Es un punto de partida honesto. La mitad de la sala piensa lo mismo y no lo dice.", en: "You're at **level 0**. I place you there because you said AI feels like hype, threat or toy and you've never generated a piece with it. Not a problem. An honest starting point. Half the room thinks the same and doesn't say it." },
    1: { es: "Estás en **nivel 1 · Curiosidad**. Hay interés sin práctica todavía. Te falta la primera pieza terminada — la que rompe el cascarón. La buena noticia: el techo del nivel 1 está a una semana de trabajo, no a un máster de seis meses.", en: "You're at **level 1 · Curiosity**. Interest without practice yet. You're missing the first finished piece — the one that breaks the shell. Good news: level 1's ceiling is one week of work, not a six-month course." },
    2: { es: "Estás en **nivel 2 · Jugueteo**. Ya generaste piezas, pero el resultado depende del azar más que del criterio. Tenés vocabulario visual; te falta vocabulario técnico. La transición al nivel 3 no es más herramientas, es más decisiones.", en: "You're at **level 2 · Play**. You've made things, but outcome depends on luck more than judgment. You have visual vocabulary; you're missing technical vocabulary. The jump to level 3 isn't more tools — it's more decisions." },
    3: { es: "Estás en **nivel 3 · Producción**. Hacés piezas reales con narrativa, voz y publicación. Lo que te falta no es talento ni stack — es repetibilidad. Tu mejor pieza la podés explicar; tu próxima la rezás.", en: "You're at **level 3 · Production**. You make real pieces with narrative, voice and publishing. What's missing isn't talent or stack — it's repeatability. You can explain your best piece; you pray for your next." },
    4: { es: "Estás en **nivel 4 · Sistema**. Tenés método, plantillas y posiblemente equipo. El riesgo de tu nivel no es producir mal — es producir bien y olvidarte de pensar. La capa humana se construye desde acá, no desde antes.", en: "You're at **level 4 · System**. You have method, templates, possibly a team. Your level's risk isn't bad output — it's good output without thinking. The human layer is built from here, not before." },
    5: { es: "Estás en **nivel 5 · Capa humana**. Tu firma vale más que tu stack. La pregunta ya no es cómo producir — es qué decir. Si llegaste hasta acá vos solo, tu siguiente paso es escala con criterio. Hablamos en serio.", en: "You're at **level 5 · Human Layer**. Your signature is worth more than your stack. The question isn't how to produce anymore — it's what to say. If you got here on your own, your next step is scale with judgment. Let's talk seriously." },
  } as Record<number, Bilingual>,
  weakPoints: {
    0: [
      { es: "Confusión con desinterés. Decir 'no me interesa' cuando lo que pasa es 'no entiendo'. El primero cierra puertas. El segundo es un punto de partida sano.", en: "Confusing disinterest with confusion. Saying 'I'm not interested' when really it's 'I don't understand.' The first closes doors. The second is healthy." },
      { es: "Opinar sin haber tocado. Tu evaluación de la IA hoy se basa en lo que viste en redes, no en lo que vos hiciste. Eso es publicidad pasada como dato.", en: "Opining without touching. Your evaluation of AI is based on what you saw on social, not what you did. That's ads disguised as data." },
      { es: "No tener un caso propio. Sin un proyecto real al que aplicarle IA, cualquier herramienta parece igual de inútil.", en: "No own case. Without a real project to test AI against, every tool looks equally useless." },
    ],
    1: [
      { es: "Curiosidad sin pieza terminada. Probar muchas herramientas y nunca exportar. La curiosidad sin output se evapora en un mes.", en: "Curiosity without finished piece. Trying many tools and never exporting. Curiosity without output evaporates in a month." },
      { es: "Vocabulario impreciso. 'Hazlo cinematográfico' no es una instrucción — es un deseo. Por eso el resultado siempre te sorprende negativamente.", en: "'Make it cinematic' isn't an instruction — it's a wish. That's why outputs always disappoint." },
      { es: "Sin caso propio claro. Probás con ejemplos genéricos y por eso el aprendizaje no se fija. Falta el 'para qué' personal.", en: "No clear own case. You test with generic examples so learning doesn't stick. Missing personal 'what for'." },
    ],
    2: [
      { es: "Adjetivos en lugar de decisiones. Pedís 'épico' cuando podrías pedir: lente 35mm, luz lateral cálida, contraluz suave. Lo segundo es replicable. Lo primero, lotería.", en: "Adjectives instead of decisions. Asking for 'epic' when you could ask '35mm lens, warm side light, soft backlight'. The second is replicable. The first is lottery." },
      { es: "Cero versionado. Tus prompts ganadores no están guardados. Cuando aparece el cliente, los reconstruís a mano y rezás.", en: "Zero versioning. Your winning prompts aren't saved. When the client shows up, you rebuild by hand and pray." },
      { es: "Falta un loop de revisión. Hacés mucho output, ningún post-mortem. Sin retro, no hay aprendizaje — solo horas.", en: "No review loop. Lots of output, zero post-mortems. Without retros there's no learning — just hours." },
    ],
    3: [
      { es: "Sin BBDD de prompts. Tu repetibilidad depende de que recordés. Eso no escala y se rompe en cuanto tomás dos proyectos a la vez.", en: "No prompt DB. Your repeatability depends on memory. That doesn't scale and breaks the moment you juggle two projects." },
      { es: "Cliente unidireccional. Un cliente puntual hoy, otro mañana, sin patrón. Riesgo de freelance hamster wheel: trabajás más, ganás lo mismo.", en: "Unidirectional client. One-off today, another tomorrow, no pattern. Hamster wheel risk: more work, same income." },
      { es: "Tu firma todavía no es legible. Las tres últimas piezas las podría haber hecho otro creador con el mismo stack.", en: "Your signature isn't legible yet. Your last three pieces could have been made by another creator with the same stack." },
    ],
    4: [
      { es: "Sistema sin marca clara. El método es bueno pero el cliente compra 'alguien que hace IA', no 'vos'. Reemplazable por definición.", en: "System without clear brand. Method is good but the client buys 'someone who does AI', not 'you'. Replaceable by definition." },
      { es: "Capacidad sin tesis. Producís mucho. ¿Para qué? La pregunta no es ociosa: el nivel 5 vive de tesis, no de output.", en: "Capacity without thesis. You produce a lot. For what? Not idle: level 5 lives on thesis, not output." },
      { es: "Riesgo de comoditización. Si tu único diferencial es eficiencia, en 12 meses cualquier agencia con 3 prompts compite contigo.", en: "Commoditization risk. If your only edge is efficiency, in 12 months any agency with 3 prompts competes." },
    ],
    5: [
      { es: "Único punto de fallo: vos. La capa humana es tu superpoder y tu cuello de botella personal. Lo sabés.", en: "Single point of failure: you. The human layer is your superpower and your personal bottleneck. You know it." },
      { es: "Comunidad sin ritual claro. Tenés audiencia. ¿Tenés rito? La diferencia entre seguidor y miembro es la repetición.", en: "Community without clear ritual. You have audience. Do you have ritual? The difference between follower and member is repetition." },
      { es: "Falta de delegación creativa. Operativa la delegaste. Criterio, no.", en: "No creative delegation. Operational, delegated. Judgment, no." },
    ],
  } as Record<number, Bilingual[]>,
  next: {
    0: { es: "Tu próxima parada realista a 90 días es **nivel 1 · Curiosidad**. Una pieza terminada esta semana. Eso. Nada más.", en: "Your realistic 90-day stop is **level 1 · Curiosity**. One finished piece this week. That's it." },
    1: { es: "Tu próxima parada realista a 90 días es **nivel 2 · Jugueteo**. Decisiones técnicas en lugar de adjetivos. Tres piezas terminadas con vocabulario propio.", en: "Your realistic 90-day stop is **level 2 · Play**. Technical decisions instead of adjectives. Three finished pieces with own vocabulary." },
    2: { es: "Tu próxima parada realista a 90 días es **nivel 3 · Producción**. Una pieza completa con voz, sonido y publicación. Antes de cliente, hace falta firma.", en: "Your realistic 90-day stop is **level 3 · Production**. One complete piece with voice, sound and publishing. Before clients, you need a signature." },
    3: { es: "Tu próxima parada realista a 90 días es **nivel 4 · Sistema**. BBDD de prompts viva, plantillas y un cliente recurrente. Repetibilidad antes de escala.", en: "Your realistic 90-day stop is **level 4 · System**. Living prompt DB, templates, one recurring client. Repeatability before scale." },
    4: { es: "Tu próxima parada realista a 90 días es **nivel 5 · Capa humana**. Una tesis pública, una comunidad con rito, una oferta con precio claro. Acá la palanca cambia de stack a marca.", en: "Your realistic 90-day stop is **level 5 · Human Layer**. A public thesis, a community with ritual, an offer with clear pricing. Here the lever shifts from stack to brand." },
    5: { es: "Tu siguiente parada no es subir — es **profundizar**. Una conversación 1 a 1 con Sebas para diseñar tu próxima curva en serio.", en: "Your next stop isn't up — it's **deepening**. A 1-on-1 with Sebas to seriously design your next curve." },
  } as Record<number, Bilingual>,
  actions: {
    0: [
      { es: "Lunes: abrir ChatGPT y mantener una conversación de 20 minutos sobre algo que sí te interesa (no IA).", en: "Monday: open ChatGPT and have a 20-minute conversation about something you actually care about (not AI)." },
      { es: "Miércoles: pedirle al modelo que te explique el peor argumento contra la IA en arte. Leelo entero. No respondas.", en: "Wednesday: ask the model to explain the worst argument against AI in art. Read it whole. Don't reply." },
      { es: "Domingo: decidí, sin culpa, si querés un nivel 1 o si te quedás afuera. Las dos respuestas son válidas.", en: "Sunday: decide, guilt-free, if you want level 1 or want to stay out. Both answers valid." },
    ],
    1: [
      { es: "Lunes 30 min: elegí UN caso de uso y escribilo en una frase ('hacer el plano que abre mi propia película').", en: "Monday 30 min: pick ONE use case and write it in a sentence." },
      { es: "Miércoles 60 min: 5 imágenes con la misma frase. Mirálas juntas y elegí la mejor.", en: "Wednesday 60 min: 5 images from the same prompt. Look together and pick the best." },
      { es: "Domingo 30 min: publicalo. Sin disculpas, sin contexto largo. La pieza sola.", en: "Sunday 30 min: publish it. No apologies, no long context. The piece alone." },
    ],
    2: [
      { es: "Lunes: separar las 3 variables de tu próxima pieza (plano · luz · lente). Documentalo en una nota.", en: "Monday: separate 3 variables for your next piece (shot · light · lens). Document in a note." },
      { es: "Miércoles: matriz 3x3 con esas variables. 9 outputs. Elegí 3. Justificá cada elección por escrito.", en: "Wednesday: 3x3 matrix with those variables. 9 outputs. Pick 3. Justify each in writing." },
      { es: "Viernes: animá el ganador. Tres takes distintos. El criterio para elegir el final es el mismo de la matriz.", en: "Friday: animate the winner. Three different takes. Same criteria as the matrix." },
    ],
    3: [
      { es: "Lunes: abrir tu BBDD de prompts. Etiquetar las 10 plantillas que más usás con tags estables.", en: "Monday: open your prompt DB. Tag the 10 templates you use most with stable tags." },
      { es: "Miércoles: tomar tu pieza más exitosa y escribir un treatment de 1 página explicando POR QUÉ funcionó.", en: "Wednesday: take your most successful piece and write a 1-page treatment explaining WHY it worked." },
      { es: "Domingo: definí qué te diferencia en una frase. No 'uso IA y soy creativo'. Algo replicable.", en: "Sunday: define your differentiator in a sentence. Not: I use AI and I\'m creative. Something replicable." },
    ],
    4: [
      { es: "Lunes: cronometrar dónde gastás más tiempo esta semana. Donde gastás tiempo sin escala, hay un agente esperando.", en: "Monday: time where you spend most this week. Where you spend without scale, there's an agent waiting." },
      { es: "Miércoles: documentá tu sistema en un Loom de 8 minutos. Si no se entiende, no es sistema.", en: "Wednesday: document your system in an 8-min Loom. If unclear, not a system." },
      { es: "Domingo: escribí 3 borradores de tu tesis pública. Una frase por borrador. Mostrale al equipo.", en: "Sunday: write 3 drafts of your public thesis. One sentence each. Share with the team." },
    ],
    5: [
      { es: "Lunes: revisá tu agenda de la semana pasada. ¿Cuánto tiempo en producción, cuánto en criterio? El ratio es tu salud.", en: "Monday: review last week's calendar. How much in production vs criteria? Ratio is your health." },
      { es: "Miércoles: una conversación 1 a 1 con un miembro de comunidad. No para vender. Para escuchar.", en: "Wednesday: 1-on-1 with a community member. Not to sell. To listen." },
      { es: "Domingo: pedile a Sebas 30 min. Acá las decisiones se toman acompañado.", en: "Sunday: book 30 min with Sebas. Here decisions are made with company." },
    ],
  } as Record<number, Bilingual[]>,
};

// ── B2B quadrants ────────────────────────────────────────────────────────────
export type Quadrant = "INSTINTO" | "TOOL_TRAP" | "DISCIPLINA" | "OPTIMIZADO";

export const QUADRANT_META: Record<Quadrant, { label: Bilingual; headline: Bilingual; cta: Bilingual }> = {
  INSTINTO: {
    label: { es: "INSTINTO", en: "INSTINCT" },
    headline: { es: "Producís por instinto. Eso tiene mérito y techo.", en: "You produce by instinct. That has merit and a ceiling." },
    cta: { es: "Sesión diagnóstico fundacional", en: "Foundational diagnostic session" },
  },
  TOOL_TRAP: {
    label: { es: "TOOL-TRAP", en: "TOOL-TRAP" },
    headline: { es: "Tenés mucha IA. Falta el método que la dirija.", en: "Lots of AI. Missing the method to steer it." },
    cta: { es: "Sesión diagnóstico de pipeline", en: "Pipeline diagnostic session" },
  },
  DISCIPLINA: {
    label: { es: "DISCIPLINA", en: "DISCIPLINE" },
    headline: { es: "Tu método es sólido. Acá la IA puede ser palanca real.", en: "Your method is solid. Here AI can be real leverage." },
    cta: { es: "Sesión de integración IA", en: "AI integration session" },
  },
  OPTIMIZADO: {
    label: { es: "OPTIMIZADO", en: "OPTIMIZED" },
    headline: { es: "Estás en buen sitio. Toca afinar el cuello siguiente.", en: "You're in good shape. Time to tune the next bottleneck." },
    cta: { es: "Sesión de afinamiento avanzado", en: "Advanced tuning session" },
  },
};

export interface B2BAudit {
  snapshot: Bilingual;
  bottleneck: Bilingual;
  tio: Bilingual[];
  aiMoves: Bilingual[];
  aiNoise: Bilingual;
  plan: { d30: Bilingual; d60: Bilingual; d90: Bilingual };
}

export const AUDIT_B2B: Record<Quadrant, B2BAudit> = {
  INSTINTO: {
    snapshot: { es: "Estructura productiva con criterio creativo pero sin método operativo medible. La IA todavía no ha entrado de forma sistemática y la disciplina TOC tampoco. **Buena noticia:** lo que falta no es talento — es instrumentación.", en: "Productive structure with creative judgment but no measurable operational method. AI hasn't entered systematically and TOC discipline hasn't either. **Good news:** what's missing isn't talent — it's instrumentation." },
    bottleneck: { es: "Tu cuello probable está en **{bottleneck}**. Una hora perdida ahí es una hora perdida para todo el sistema. El problema no es no tener IA — es no medir dónde se cae el throughput.", en: "Your likely bottleneck is in **{bottleneck}**. An hour lost there is an hour lost for the whole system. The issue isn't lacking AI — it's not measuring where throughput drops." },
    tio: [
      { es: "Throughput sin medir. Cobrás por proyecto, no por entrega validada. Eso esconde el costo real de cada job.", en: "Throughput unmeasured. You bill per project, not per validated delivery. That hides each job's real cost." },
      { es: "Inventory invisible. Hay WIP en correos, drives y cabezas — no en un tablero. El primer cuello a destapar.", en: "Invisible inventory. WIP lives in inboxes, drives and heads — not on a board. First bottleneck to expose." },
      { es: "OE moderado pero impredecible. Las semanas malas duelen porque no hay buffer.", en: "Moderate but unpredictable OE. Bad weeks hurt because no buffer." },
    ],
    aiMoves: [
      { es: "Empezá midiendo, no automatizando. Una hoja con 3 columnas: brief recibido / entrega validada / días.", en: "Start measuring, not automating. A sheet with 3 columns: brief received / validated delivery / days." },
      { es: "IA en el cuello detectado, no en lo que ya funciona. Si tu cuello es revisión cliente, automatizá presentación de avances — no producción.", en: "AI at the detected bottleneck, not where it already works. If your bottleneck is client review, automate progress presentation — not production." },
      { es: "Una sola herramienta IA bien usada vale más que cinco probadas. El menú gigante es el enemigo.", en: "One AI tool used well beats five tried. The giant menu is the enemy." },
    ],
    aiNoise: { es: "Suscribirte a 4 herramientas IA antes de tener una métrica de throughput es la trampa más cara de tu nivel. Estarías agregando OE sin mover T.", en: "Subscribing to 4 AI tools before having a throughput metric is your level's most expensive trap. You'd be adding OE without moving T." },
    plan: {
      d30: { es: "Instalar tablero WIP. Empezar a medir entregas validadas. Identificar el cuello real con datos.", en: "Install WIP board. Start measuring validated deliveries. Identify real bottleneck with data." },
      d60: { es: "Aplicar IA específica al cuello detectado. Cero IA en otros pasos. Cero excepciones.", en: "Apply specific AI to detected bottleneck. Zero AI on other steps. No exceptions." },
      d90: { es: "Subordinar el resto del pipeline al cuello. Decidir si elevás (más capacidad) o repetís el ciclo.", en: "Subordinate rest of pipeline to bottleneck. Decide whether to elevate (more capacity) or repeat cycle." },
    },
  },
  TOOL_TRAP: {
    snapshot: { es: "Adopción IA alta sin método operativo. Mucho output, throughput plano. **Diagnóstico crudo:** estás gastando OE en herramientas que no mueven T. La salida no es menos IA — es más método.", en: "High AI adoption without operational method. Lots of output, flat throughput. **Blunt diagnosis:** you're spending OE on tools that don't move T. The exit isn't less AI — it's more method." },
    bottleneck: { es: "Tu cuello probable está en **{bottleneck}** — pero la IA que ya tenés está aplicada en cualquier otro lado. Esa es la trampa: optimizás lo que no es cuello, y el sistema no se mueve.", en: "Your likely bottleneck is in **{bottleneck}** — but the AI you have is applied anywhere else. That's the trap: optimizing non-bottlenecks, system doesn't move." },
    tio: [
      { es: "Throughput plano pese al stack. La IA generó capacidad ociosa, no más entregas validadas.", en: "Flat throughput despite stack. AI generated idle capacity, not more validated deliveries." },
      { es: "Inventory en aumento. Capacidad sin disciplina = WIP que crece.", en: "Rising inventory. Capacity without discipline = growing WIP." },
      { es: "OE alto y subestimado. El stack actual cuesta más de lo que reconocés en cuotas mensuales.", en: "High and underestimated OE. Current stack costs more than you admit in monthly fees." },
    ],
    aiMoves: [
      { es: "Stop the bleeding. Auditar el stack: pausar las 3 herramientas con menor uso real las próximas 4 semanas.", en: "Stop the bleeding. Audit stack: pause 3 lowest-actual-use tools for next 4 weeks." },
      { es: "Re-aplicar las 2 que sobrevivan al cuello detectado. Solo ahí. Solo medible.", en: "Re-apply the surviving 2 to the detected bottleneck. There only. Measurable only." },
      { es: "Drum-buffer-rope: el ritmo del cuello marca el ritmo del resto. La IA se subordina, no manda.", en: "Drum-buffer-rope: bottleneck rhythm sets the rest. AI subordinates, doesn't lead." },
    ],
    aiNoise: { es: "Sumar otra herramienta IA esta semana. Si entra una sin que el cuello esté tocado, estás haciendo lo mismo que te trajo acá. Diagnostiquemos antes de comprar.", en: "Adding another AI tool this week. If one enters without touching the bottleneck, you're repeating what got you here. Diagnose before buying." },
    plan: {
      d30: { es: "Auditoría stack: pausar 3 herramientas. Tablero WIP. Métrica de T arrancada.", en: "Stack audit: pause 3 tools. WIP board. T metric started." },
      d60: { es: "Re-aplicar 2 herramientas al cuello con régimen de medición semanal.", en: "Re-apply 2 tools to bottleneck with weekly measurement." },
      d90: { es: "Decidir si las 2 herramientas justifican OE. Las que no, fuera. Volver a empezar el ciclo limpio.", en: "Decide if the 2 tools justify OE. Those that don't, out. Restart cycle clean." },
    },
  },
  DISCIPLINA: {
    snapshot: { es: "Método sólido y operación medida. La IA todavía no entró pero el terreno está fértil. **Tesis:** tu próxima palanca de crecimiento no es contratar — es integrar IA con tu disciplina actual.", en: "Solid method and measured operation. AI hasn't entered but ground is fertile. **Thesis:** your next growth lever isn't hiring — it's integrating AI with current discipline." },
    bottleneck: { es: "Tu cuello probable está en **{bottleneck}**. Tu equipo lo sabe. Lo que no saben es que ahí, específicamente ahí, una integración IA bien hecha multiplica T sin tocar OE estructural.", en: "Your likely bottleneck is in **{bottleneck}**. Your team knows. What they don't know is that there, specifically there, well-done AI integration multiplies T without touching structural OE." },
    tio: [
      { es: "Throughput medido y predecible. Punto de partida raro y valioso.", en: "Measured and predictable throughput. Rare and valuable starting point." },
      { es: "Inventory bajo control. WIP-cap explícito o cultura instalada. Disciplina visible.", en: "Inventory under control. Explicit WIP-cap or installed culture. Visible discipline." },
      { es: "OE eficiente. Cada euro de OE produce throughput identificable. Margen para invertir en IA específica.", en: "Efficient OE. Each euro of OE produces identifiable throughput. Margin to invest in specific AI." },
    ],
    aiMoves: [
      { es: "Pilotar IA en el cuello con un equipo de 1-2 personas. Resto del pipeline sigue intacto.", en: "Pilot AI at bottleneck with 1-2 people team. Rest of pipeline intact." },
      { es: "KPI muy concreto: ¿multiplica T por unidad de tiempo? Si no, fuera. Sin sentimentalismos.", en: "Concrete KPI: does it multiply T per unit time? If not, out. No sentimentality." },
      { es: "Integrar dataset propio (briefs, prompts ganadores, visual references). Acá tu disciplina se vuelve foso.", en: "Integrate own dataset (briefs, winning prompts, visual refs). Here discipline becomes moat." },
    ],
    aiNoise: { es: "Adoptar IA en pasos del pipeline que ya funcionan bien. Si no es cuello, no lo es. La disciplina es proteger lo que funciona, no romperlo por novedad.", en: "Adopting AI on pipeline steps that already work. If not a bottleneck, it isn't. Discipline is protecting what works, not breaking it for novelty." },
    plan: {
      d30: { es: "Piloto IA en cuello con 1-2 personas. KPI claro. Resto del pipeline intacto.", en: "AI pilot at bottleneck with 1-2 people. Clear KPI. Rest intact." },
      d60: { es: "Si el piloto multiplica T, escalar al equipo. Si no, mover el piloto al siguiente candidato.", en: "If pilot multiplies T, scale to team. If not, move pilot to next candidate." },
      d90: { es: "Subordinar pipeline al nuevo throughput. Posiblemente elevar capacidad humana en el siguiente cuello.", en: "Subordinate pipeline to new throughput. Possibly elevate human capacity at next bottleneck." },
    },
  },
  OPTIMIZADO: {
    snapshot: { es: "Método maduro + IA integrada. Estás en la parte alta de la curva de aprendizaje. **Foco realista:** detectar el siguiente cuello, no celebrar el actual. La meta se mueve.", en: "Mature method + integrated AI. High on learning curve. **Realistic focus:** detect next bottleneck, not celebrate current. The goal moves." },
    bottleneck: { es: "Tu cuello actual probablemente sea **{bottleneck}** — pero ya sabés que en cuanto lo movás, otro asume. Esto es el paso 5 de Goldratt: repetir, no descansar.", en: "Your current bottleneck is likely **{bottleneck}** — but you already know that the moment you move it, another takes over. This is Goldratt's step 5: repeat, don't rest." },
    tio: [
      { es: "Throughput alto y sano. Margen para experimentar sin riesgo existencial.", en: "High and healthy throughput. Margin to experiment without existential risk." },
      { es: "Inventory bajo. La cultura ya internalizó WIP-cap.", en: "Low inventory. Culture has internalized WIP-cap." },
      { es: "OE optimizado. Posibilidad de invertir en R&D — agentes propios, datasets propietarios.", en: "Optimized OE. Room to invest in R&D — own agents, proprietary datasets." },
    ],
    aiMoves: [
      { es: "Mover de IA-asistente a IA-agente. Loops autónomos en pasos donde el criterio ya está codificado.", en: "Move from AI-assistant to AI-agent. Autonomous loops where criteria is already codified." },
      { es: "Datasets propietarios como ventaja competitiva. Acá tu data vale más que tu stack.", en: "Proprietary datasets as competitive edge. Here your data beats your stack." },
      { es: "IA aplicada al cuello comercial / estratégico, no productivo. La producción ya está optimizada.", en: "AI applied to commercial / strategic bottleneck, not productive. Production already optimized." },
    ],
    aiNoise: { es: "Re-optimizar lo ya optimizado por moda. Cada ciclo nuevo de optimización en T ya alta tiene retorno marginal decreciente. Buscá el cuello nuevo, no acaricies el viejo.", en: "Re-optimizing what's optimized for fashion. Each new optimization cycle on already-high T has decreasing marginal return. Find the new bottleneck, don't pet the old." },
    plan: {
      d30: { es: "Auditar dónde está el cuello en marketing / ventas / estrategia. Producción no es el problema actual.", en: "Audit where bottleneck is in marketing / sales / strategy. Production isn't current problem." },
      d60: { es: "Lanzar piloto IA-agente en cuello comercial. Métrica: tiempo de ciclo de venta.", en: "Launch AI-agent pilot at commercial bottleneck. Metric: sales cycle time." },
      d90: { es: "R&D dedicada: agentes propios, datasets propietarios, ventaja estructural a 18 meses.", en: "Dedicated R&D: own agents, proprietary datasets, structural edge at 18 months." },
    },
  },
};

// ── Bottleneck labels ────────────────────────────────────────────────────────
export const BOTTLENECK_LABELS: Record<string, Bilingual> = {
  sales: { es: "Ventas / pipeline comercial", en: "Sales / commercial pipeline" },
  briefing: { es: "Briefing y preproducción", en: "Briefing and pre-production" },
  production: { es: "Producción / generación", en: "Production / generation" },
  post: { es: "Postproducción", en: "Post-production" },
  review: { es: "Revisión cliente / aprobaciones", en: "Client review / approvals" },
  admin: { es: "Cobro / administración", en: "Billing / administration" },
};
