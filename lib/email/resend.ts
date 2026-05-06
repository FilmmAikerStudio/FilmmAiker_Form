import { Resend } from "resend";

let client: Resend | null = null;

export function getResend(): Resend {
  if (client) return client;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Falta RESEND_API_KEY en el entorno.");
  }
  client = new Resend(apiKey);
  return client;
}

export const FROM_DEFAULT =
  process.env.RESEND_FROM ?? "AltafuIA <auditoria@filmmaikerstudio.com>";
