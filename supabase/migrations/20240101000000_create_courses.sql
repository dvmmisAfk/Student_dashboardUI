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

create index if not exists courses_created_at_idx
  on public.courses (created_at desc);

alter table public.courses enable row level security;

create policy "Public read access"
  on public.courses for select
  to anon, authenticated
  using (true);

create policy "Authenticated write access"
  on public.courses for all
  to authenticated
  using (true)
  with check (true);

grant usage  on schema public        to anon;
grant select on table public.courses to anon;
