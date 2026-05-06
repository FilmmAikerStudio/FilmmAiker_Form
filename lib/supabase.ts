import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let serverClient: SupabaseClient | null = null;

// Cliente con service-role: usar SOLO en server (route handlers, server actions).
// Nunca exponer SUPABASE_SERVICE_ROLE_KEY al cliente.
export function getServerSupabase(): SupabaseClient {
  if (serverClient) return serverClient;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en el entorno.",
    );
  }
  serverClient = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return serverClient;
}
