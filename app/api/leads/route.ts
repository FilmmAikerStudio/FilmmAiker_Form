import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Body {
  email?: string;
  name?: string;
  source?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json(
      { error: "Cuerpo inválido." },
      { status: 400 },
    );
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const name = (body.name ?? "").trim();

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email inválido." }, { status: 400 });
  }
  if (name.length < 2) {
    return NextResponse.json({ error: "Nombre demasiado corto." }, { status: 400 });
  }

  const supabase = getServerSupabase();

  const { data, error } = await supabase
    .from("leads")
    .upsert(
      {
        email,
        name,
        source: body.source ?? null,
        utm_source: body.utm_source ?? null,
        utm_medium: body.utm_medium ?? null,
        utm_campaign: body.utm_campaign ?? null,
        status: "captured",
      },
      { onConflict: "email" },
    )
    .select("id, email, status")
    .single();

  if (error) {
    console.error("[leads] upsert failed", error);
    return NextResponse.json(
      { error: "No pudimos guardarte. Probá de nuevo." },
      { status: 500 },
    );
  }

  return NextResponse.json({ lead: data }, { status: 200 });
}
