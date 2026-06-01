-- ============================================================
-- LearnFlow AI OS — courses table
-- ============================================================
-- Run this migration in your Supabase project:
--   Dashboard → SQL Editor → paste → Run
-- Or via the Supabase CLI:
--   supabase db push
-- ============================================================

-- 1. Create the courses table
-- ---------------------------------------------------------------
create table if not exists public.courses (
  id           uuid        primary key default gen_random_uuid(),
  title        text        not null,
  progress     smallint    not null default 0,
  icon_name    text        not null default 'Brain',
  color_scheme text        not null default 'blue',
  created_at   timestamptz not null default now(),

  constraint title_length   check (char_length(title) between 1 and 120),
  constraint progress_range check (progress between 0 and 100),
  constraint valid_scheme   check (color_scheme in ('blue', 'purple', 'cyan', 'green'))
);

-- 2. Performance index — used by ORDER BY created_at DESC
-- ---------------------------------------------------------------
create index if not exists courses_created_at_idx
  on public.courses (created_at desc);

-- 3. Row Level Security
-- ---------------------------------------------------------------
-- Enable RLS so unauthenticated requests are evaluated against policies.
alter table public.courses enable row level security;

-- Allow anyone (including anonymous / unauthenticated) to SELECT rows.
-- This is safe for a public demo — no PII is stored.
create policy "Public read access"
  on public.courses
  for select
  to anon, authenticated
  using (true);

-- Optional: restrict INSERT/UPDATE/DELETE to authenticated users only.
-- Remove or adjust these if you want unauthenticated writes (not recommended).
create policy "Authenticated write access"
  on public.courses
  for all
  to authenticated
  using (true)
  with check (true);

-- 4. Grant usage to the anon role (required for Supabase public API)
-- ---------------------------------------------------------------
grant usage  on schema public          to anon;
grant select on table public.courses   to anon;
