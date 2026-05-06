import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase";
import { scoreB2C, scoreB2B } from "@/lib/scoring";
import type { B2CAnswers, B2BAnswers } from "@/lib/scoring";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Body {
  lead_id?: string;
  type: "individual" | "business";
  answers: Record<string, number | string | string[]>;
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido." }, { status: 400 });
  }

  const { lead_id, type, answers } = body;

  if (type === "individual") {
    const b2c: B2CAnswers = {
      q1: (answers.q1 as number) ?? 0,
      q2: (answers.q2 as number) ?? 0,
      q3: (answers.q3 as number) ?? 0,
      q4: (answers.q4 as number) ?? 0,
      q5: (answers.q5 as number) ?? 0,
      q6_goal: (answers.q6_goal as number) ?? 1,
    };
    const result = scoreB2C(b2c);

    if (lead_id) {
      try {
        const supabase = getServerSupabase();
        await supabase.from("quiz_responses_individual").insert({
          lead_id,
          q1: b2c.q1,
          q2: b2c.q2,
          q3: b2c.q3,
          q4: b2c.q4,
          q5: b2c.q5,
          q6_goal: b2c.q6_goal,
          current_level: result.currentLevel,
          goal_level: result.goalLevel,
          realistic_90d: result.realistic90Days,
          flag: result.flag,
        });
        await supabase
          .from("leads")
          .update({ profile_type: "individual", status: "quiz_completed" })
          .eq("id", lead_id);
      } catch (err) {
        // Non-blocking: quiz result is still returned even if Supabase fails
        console.error("[quiz/individual] persist failed", err);
      }
    }

    return NextResponse.json({ type: "individual", b2c: result }, { status: 200 });
  }

  if (type === "business") {
    const b2bRaw = answers;
    // q3 and q4 need score lookup — send pre-scored from client
    const b2b: B2BAnswers = {
      q1: (b2bRaw.q1 as string) ?? "",
      q2: (b2bRaw.q2 as string) ?? "",
      q3: (b2bRaw.q3 as number) ?? 0,
      q4: (b2bRaw.q4 as number) ?? 0,
      q5: (b2bRaw.q5 as string) ?? "",
      q6: (b2bRaw.q6 as string[]) ?? [],
      q7: (b2bRaw.q7 as string) ?? "",
      q8: (b2bRaw.q8 as string) ?? "",
    };
    const result = scoreB2B(b2b);

    if (lead_id) {
      try {
        const supabase = getServerSupabase();
        await supabase.from("quiz_responses_business").insert({
          lead_id,
          org_type: result.orgType,
          org_size: result.orgSize,
          t_focus: b2b.q3,
          wip_control: b2b.q4,
          bottleneck_hint: result.likelyBottleneckKey,
          ai_layers: result.aiLayers,
          ai_adoption_score: result.aiMaturity,
          friction_type: result.frictionType,
          business_goal: result.businessGoal,
          toc_maturity: result.tocMaturity,
          ai_maturity: result.aiMaturity,
          quadrant: result.quadrant,
          likely_bottleneck: result.likelyBottleneckKey,
        });
        await supabase
          .from("leads")
          .update({ profile_type: "business", status: "quiz_completed" })
          .eq("id", lead_id);
      } catch (err) {
        console.error("[quiz/business] persist failed", err);
      }
    }

    return NextResponse.json({ type: "business", b2b: result }, { status: 200 });
  }

  return NextResponse.json({ error: "Tipo inválido." }, { status: 400 });
}
