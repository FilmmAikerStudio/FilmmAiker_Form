# Deploy — AltafuIA Auditoría

Stack actual del VPS (46.202.171.141):
- Dokploy + Traefik
- Supabase self-hosted: `automation-supabase-c607de-46-202-171-141.traefik.me`
- App Next.js: `altafuia.filmmakerstudio.com` (a configurar)

## 1 · Migración Supabase

Pegar el contenido de `supabase/migrations/0001_init.sql` en:

**Supabase Studio → SQL Editor → New query → Run**

Studio URL: `http://automation-supabase-c607de-46-202-171-141.traefik.me`  
Login: `filmmaiker` / `nsexksoisk5knw7ajag8ubfyljqgceur`

Verificación post-migración:

```sql
select table_name from information_schema.tables
where table_schema = 'public'
order by table_name;
-- Debe devolver: email_events, leads,
-- quiz_responses_business, quiz_responses_individual
```

## 2 · App Next.js en Dokploy

**Crear nuevo servicio:**
- Tipo: Application → Github
- Repo: `filmmaikerstudio/filmmaiker_form`
- Branch: `claude/qr-audit-funnel-q07Ed` (o la que mergeés a main)
- Build: `pnpm install --frozen-lockfile && pnpm build`
- Start: `pnpm start`
- Port: `3000`

**Environment variables (pestaña Environment en Dokploy):**

```
SUPABASE_URL=http://automation-supabase-c607de-46-202-171-141.traefik.me
SUPABASE_SERVICE_ROLE_KEY=<copiar SERVICE_ROLE_KEY del .env de Supabase en Dokploy>
RESEND_API_KEY=<crear en resend.com>
RESEND_FROM_EMAIL=info@filmmakerstudio.com
NEXT_PUBLIC_SITE_URL=https://altafuia.filmmakerstudio.com
NODE_ENV=production
```

**Domain (pestaña Domains):**
- Host: `altafuia.filmmakerstudio.com`
- Port: `3000`
- HTTPS: enabled (Let's Encrypt automático)

**DNS** (Hostinger):
- Tipo `A`, name `altafuia`, apunta a `46.202.171.141`, TTL 14400 ✅ (ya creado)

## 3 · Verificación post-deploy

```bash
curl -I https://altafuia.filmmakerstudio.com/
# 200 OK

curl -s https://altafuia.filmmakerstudio.com/api/leads -X POST \
  -H "content-type: application/json" \
  -d '{"email":"test@test.com","name":"Test"}'
# {"lead":{"id":"...","email":"test@test.com","status":"captured"}}
```

Si las dos pasan, el funnel completo está vivo:
- `/` Landing
- `/auditoria/email`
- `/auditoria/perfil`
- `/auditoria/quiz/individual` ó `/auditoria/quiz/business`
- `/auditoria/resultado`

## 4 · Rotación de credenciales (CRÍTICO)

Las credenciales del VPS y Supabase se compartieron en chat — rotar:

```bash
# En el VPS
passwd  # nuevo root password
# Configurar SSH key + deshabilitar PasswordAuthentication en /etc/ssh/sshd_config
```

API key de Hostinger: regenerar en panel de Hostinger.  
JWT secret de Supabase: si querés rotar también, requiere regenerar ANON_KEY y SERVICE_ROLE_KEY (Dokploy → Supabase env vars), y actualizar la app.

## 5 · Pendientes Sprint 3+

- LLM auditor (Anthropic) → reemplaza templates estáticos por audit personalizado en streaming
- PDF export (`@react-pdf/renderer`)
- Resend sequences (B2C 6 emails / B2B 4 emails + Slack alert)
- QR real apuntando a `https://altafuia.filmmakerstudio.com?utm_source=qr&utm_medium=event&utm_campaign=altafuia2026`
