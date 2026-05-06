import type { Quadrant } from "./quiz-data";
import { BOTTLENECK_LABELS } from "./quiz-data";
import type { Bilingual } from "./copy";

export interface B2CAnswers {
  q1: number; // 0–4
  q2: number; // 0–3
  q3: number; // 0–4
  q4: number; // 0–3
  q5: number; // 0–3
  q6_goal: number; // 1–5
}

export interface B2CResult {
  currentLevel: number;
  goalLevel: number;
  ambitionGap: number;
  realistic90Days: number;
  flag: "OVERAMBITION" | "UNDERSHOOT" | "HEALTHY";
}

export function scoreB2C(answers: B2CAnswers): B2CResult {
  const scores = [answers.q1, answers.q2, answers.q3, answers.q4, answers.q5];
  const weights = [0.25, 0.2, 0.2, 0.2, 0.15];
  const weighted = scores.reduce((acc, s, i) => acc + s * weights[i], 0);
  const currentLevel = Math.min(5, Math.max(0, Math.round(weighted)));
  const goalLevel = answers.q6_goal;
  const ambitionGap = goalLevel - currentLevel;
  return {
    currentLevel,
    goalLevel,
    ambitionGap,
    realistic90Days: ambitionGap <= 1 ? goalLevel : Math.min(5, currentLevel + 1),
    flag: ambitionGap > 2 ? "OVERAMBITION" : ambitionGap < 0 ? "UNDERSHOOT" : "HEALTHY",
  };
}

export interface B2BAnswers {
  q1: string; // orgType
  q2: string; // orgSize
  q3: number; // tFocus 0–3
  q4: number; // wipControl 0–3
  q5: string; // bottleneckKey
  q6: string[]; // aiLayers (multi)
  q7: string; // frictionType
  q8: string; // businessGoal
}

export interface B2BResult {
  orgType: string;
  orgSize: string;
  tocMaturity: number;
  aiMaturity: number;
  quadrant: Quadrant;
  likelyBottleneckKey: string;
  likelyBottleneck: Bilingual;
  aiLayers: string[];
  frictionType: string;
  businessGoal: string;
}

export function scoreB2B(answers: B2BAnswers): B2BResult {
  const tocMaturity = answers.q3 + answers.q4;
  const aiLayers = answers.q6.filter((x) => x !== "none");
  const aiMaturity = aiLayers.length;

  let quadrant: Quadrant;
  if (tocMaturity <= 2 && aiMaturity <= 2) quadrant = "INSTINTO";
  else if (tocMaturity <= 2 && aiMaturity >= 3) quadrant = "TOOL_TRAP";
  else if (tocMaturity >= 3 && aiMaturity <= 2) quadrant = "DISCIPLINA";
  else quadrant = "OPTIMIZADO";

  return {
    orgType: answers.q1,
    orgSize: answers.q2,
    tocMaturity,
    aiMaturity,
    quadrant,
    likelyBottleneckKey: answers.q5,
    likelyBottleneck: BOTTLENECK_LABELS[answers.q5] ?? { es: "Por identificar", en: "To be identified" },
    aiLayers,
    frictionType: answers.q7,
    businessGoal: answers.q8,
  };
}

// Serialisable payload stored in localStorage after quiz
export interface QuizPayload {
  type: "individual" | "business";
  b2c?: B2CResult;
  b2b?: B2BResult;
  name?: string;
  lang: string;
}
