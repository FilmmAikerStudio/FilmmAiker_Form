-- AltafuIA · Auditoría inteligente
-- Migración inicial · esquema base del embudo
-- Ver spec: secciones 10.1 a 10.4

-- Extensiones requeridas
create extension if not exists "pgcrypto";

-- ────────────────────────────────────────────────────────────
-- leads
-- ────────────────────────────────────────────────────────────
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  email text not null unique,
  name text not null,
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,

  profile_type text check (profile_type in ('individual','business')),

  status text not null default 'captured' check (status in (
    'captured','quiz_started','quiz_completed','audit_generated',
    'cta_clicked','converted','unsubscribed'
  )),

  consent_marketing boolean not null default false,
  last_email_sent_at timestamptz,
  emails_sent_count integer not null default 0
);

create index if not exists idx_leads_email on public.leads (email);
create index if not exists idx_leads_status on public.leads (status);
create index if not exists idx_leads_profile on public.leads (profile_type);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_leads_updated_at on public.leads;
create trigger trg_leads_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

-- ────────────────────────────────────────────────────────────
-- quiz_responses_individual
-- ────────────────────────────────────────────────────────────
create table if not exists public.quiz_responses_individual (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  created_at timestamptz not null default now(),

  q1 integer not null,
  q2 integer not null,
  q3 integer not null,
  q4 integer not null,
  q5 integer not null,
  q6_goal integer not null,

  current_level integer not null,
  goal_level integer not null,
  realistic_90d integer not null,
  flag text check (flag in ('HEALTHY','OVERAMBITION','UNDERSHOOT')),

  audit_markdown text,
  audit_pdf_url text,
  llm_model text,
  llm_tokens_used integer
);

create index if not exists idx_qri_lead on public.quiz_responses_individual (lead_id);

-- ────────────────────────────────────────────────────────────
-- quiz_responses_business
-- ────────────────────────────────────────────────────────────
create table if not exists public.quiz_responses_business (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  created_at timestamptz not null default now(),

  org_type text,
  org_size text,
  t_focus integer,
  wip_control integer,
  bottleneck_hint text,
  ai_layers text[],
  ai_adoption_score integer,
  friction_type text,
  business_goal text,

  toc_maturity integer,
  ai_maturity integer,
  quadrant text check (quadrant in ('INSTINTO','TOOL_TRAP','DISCIPLINA','OPTIMIZADO')),
  likely_bottleneck text,

  audit_markdown text,
  audit_pdf_url text,
  llm_model text,
  llm_tokens_used integer,

  internal_alert_sent boolean not null default false,
  cal_com_booked boolean not null default false
);

create index if not exists idx_qrb_lead on public.quiz_responses_business (lead_id);
create index if not exists idx_qrb_quadrant on public.quiz_responses_business (quadrant);

-- ────────────────────────────────────────────────────────────
-- email_events
-- ────────────────────────────────────────────────────────────
create table if not exists public.email_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  created_at timestamptz not null default now(),
  sequence_step text,
  event_type text check (event_type in (
    'sent','opened','clicked','replied','bounced','unsubscribed','spam'
  )),
  metadata jsonb
);

create index if not exists idx_email_lead on public.email_events (lead_id);
create index if not exists idx_email_event_type on public.email_events (event_type);

-- ────────────────────────────────────────────────────────────
-- Row Level Security
-- ────────────────────────────────────────────────────────────
alter table public.leads enable row level security;
alter table public.quiz_responses_individual enable row level security;
alter table public.quiz_responses_business enable row level security;
alter table public.email_events enable row level security;

-- Acceso solo desde el backend con la service role.
-- No exponemos políticas para el rol anon: todas las escrituras
-- pasan por route handlers de Next.js que usan SUPABASE_SERVICE_ROLE_KEY.
