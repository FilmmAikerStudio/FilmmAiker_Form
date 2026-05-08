import { NextResponse } from "next/server";
import { pushLeadToNotion, type NotionLeadPayload } from "@/lib/notion";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// SIEMPRE devuelve 200 (excepto JSON malformado). El cliente no debe
// nunca depender del resultado para navegar.
export async function POST(request: Request) {
  let body: NotionLeadPayload;
  try {
    body = (await request.json()) as NotionLeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  if (!body.email || !body.name || !body.stage) {
    return NextResponse.json({ ok: true, persisted: false, error: "missing fields" });
  }

  try {
    await pushLeadToNotion(body);
    return NextResponse.json({ ok: true, persisted: true });
  } catch (err) {
    console.error("[notion-lead] failed", err);
    return NextResponse.json({ ok: true, persisted: false });
  }
}
