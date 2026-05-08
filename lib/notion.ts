// Cliente Notion — usamos fetch directo sin SDK para no agregar dependencias.
// Token y database id van por env vars; si faltan, las funciones lanzan
// y el caller decide qué hacer (en general: log + seguir).

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

function headers(): HeadersInit {
  const token = process.env.NOTION_API_KEY ?? process.env.NOTION_TOKEN;
  if (!token) throw new Error("NOTION_API_KEY missing");
  return {
    Authorization: `Bearer ${token}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  };
}

function rt(value: string | null | undefined) {
  if (!value) return { rich_text: [] };
  return { rich_text: [{ text: { content: value.slice(0, 2000) } }] };
}

export interface NotionLeadPayload {
  email: string;
  name: string;
  stage: "captured" | "completed";
  source?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  // solo para stage=completed:
  type?: "individual" | "business" | null;
  level?: string | null;
  summary?: string | null;
}

export async function pushLeadToNotion(payload: NotionLeadPayload): Promise<void> {
  const dbId = process.env.NOTION_DATABASE_ID ?? process.env.NOTION_LEADS_DATABASE_ID;
  if (!dbId) throw new Error("NOTION_DATABASE_ID missing");

  const utmCombined =
    [payload.utm_source, payload.utm_medium, payload.utm_campaign]
      .filter(Boolean)
      .join(" · ") || null;

  const properties: Record<string, unknown> = {
    Name: {
      title: [{ text: { content: payload.name.slice(0, 200) || payload.email } }],
    },
    Email: { email: payload.email },
    Status: {
      select: {
        name: payload.stage === "completed" ? "Completed" : "Captured",
      },
    },
    Source: rt(payload.source ?? null),
    UTM: rt(utmCombined),
  };

  if (payload.stage === "completed") {
    if (payload.type) {
      properties.Type = {
        select: { name: payload.type === "individual" ? "Individual" : "Empresa" },
      };
    }
    if (payload.level) properties.Level = rt(payload.level);
    if (payload.summary) properties.Summary = rt(payload.summary);
  }

  const res = await fetch(`${NOTION_API}/pages`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ parent: { database_id: dbId }, properties }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Notion ${res.status}: ${detail.slice(0, 300)}`);
  }
}
