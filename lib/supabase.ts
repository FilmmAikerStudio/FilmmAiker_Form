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
  const customFetch = (requestUrl: RequestInfo | URL, options?: RequestInit) => {
    const urlStr = requestUrl.toString();
    try {
      const parsedUrl = new URL(urlStr);
      if (parsedUrl.hostname.includes("traefik.me")) {
        const originalHostname = parsedUrl.hostname;
        parsedUrl.hostname = "dokploy-traefik";
        
        options = options || {};
        options.headers = {
          ...options.headers,
          "Host": originalHostname,
        };
        return fetch(parsedUrl.toString(), options);
      }
    } catch (e) {
      // Ignorar errores de parseo
    }
    return fetch(requestUrl, options);
  };

  serverClient = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: customFetch },
  });
  return serverClient;
}
