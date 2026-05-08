# Deploy — AltafuIA Auditoría

App Next.js 14, **sin base de datos propia**. Persistencia de leads en
**Notion** vía API. Audit personalizado se computa client-side.

## Arquitectura

```
[Browser]
  → /auditoria/email (form)
  → POST /api/lead { stage:"captured" } → Notion (fire-and-forget)
  → /auditoria/perfil → /auditoria/quiz/{individual|business}
  → POST /api/lead { stage:"completed", level, summary } → Notion
  → /auditoria/resultado (audit personalizado, render local)
```

Si las env vars de Notion faltan o el endpoint falla, el funnel sigue
funcionando perfecto — solo no se persiste el lead.

## 1 · Setup de Notion (una sola vez)

### 1.1 Crear la database

1. En Notion, creá una página nueva: **"AltafuIA · Leads"**
2. Dentro, agregá un database **full-page** (`/database` → "Database — Full page")
3. Configurá estas propiedades **con estos nombres exactos** (case-sensitive):

| Property | Tipo |
|----------|------|
| `Name` | Title (viene por defecto) |
| `Email` | Email |
| `Status` | Select — opciones: `Captured`, `Completed` |
| `Type` | Select — opciones: `Individual`, `Empresa` |
| `Level` | Text |
| `Source` | Text |
| `UTM` | Text |
| `Summary` | Text |

### 1.2 Crear la integración

1. Andá a https://www.notion.so/my-integrations
2. Click **"+ New integration"**
3. Name: `AltafuIA Funnel` · Type: **Internal** · Workspace: el tuyo
4. **Copiá el "Internal Integration Secret"** (empieza con `secret_` o `ntn_`) — ese es tu `NOTION_TOKEN`

### 1.3 Conectar la integración a la database

1. Abrí la database "AltafuIA · Leads" que creaste
2. Top-right, click **`⋯`** menu → **"+ Add connections"** (o "Connections")
3. Buscá `AltafuIA Funnel` y aprobalo

### 1.4 Sacar el database ID

1. En la database abierta, copiá la URL del browser
2. La URL se ve así: `https://www.notion.so/<workspace>/<DATABASE_ID>?v=<view_id>...`
3. **El DATABASE_ID es la cadena de 32 caracteres hex** entre el workspace y `?v=`
4. Ese es tu `NOTION_LEADS_DATABASE_ID`

## 2 · Variables de entorno en Antigravity / Dokploy

```
NOTION_API_KEY=ntn_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://tu-dominio-publico.com
NODE_ENV=production
```

## 3 · Deploy

- Repo: `filmmaikerstudio/filmmaiker_form`
- Branch: `claude/qr-audit-funnel-q07Ed`
- Build: `pnpm install --frozen-lockfile && pnpm build`
- Start: `pnpm start`
- Port: `3000`

## 4 · Verificación post-deploy

1. Abrí la URL pública del deploy
2. Andá a `/auditoria/email`, llená nombre + email + apretá CTA
3. Verificá que **navegás inmediatamente** a `/auditoria/perfil`
4. Completá un quiz hasta `/auditoria/resultado`
5. Abrí Notion → tu database "AltafuIA · Leads" → debería haber 2 filas:
   - Una con `Status: Captured` (al dar email)
   - Una con `Status: Completed`, `Type`, `Level`, `Summary` (al terminar quiz)

Si faltan filas pero el funnel anduvo igual, revisá los logs del deploy
para ver el error de Notion (probablemente: token mal copiado, integración
sin conexión a la DB, o property name mal escrito).

## 5 · Pendientes

- Sprint 3: LLM auditor (Anthropic) → audit personalizado en streaming
- PDF export del resultado
- QR real apuntando al deploy con UTMs
