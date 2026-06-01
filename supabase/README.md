# Supabase Setup

## Option A — Supabase Dashboard (quickest)

1. Go to your project → **SQL Editor**
2. Paste and run `migrations/20240101000000_create_courses.sql`
3. Paste and run `seed.sql`

## Option B — Supabase CLI

```bash
# Install CLI (if not already)
npm install -g supabase

# Link to your project
supabase link --project-ref <your-project-ref>

# Push the migration
supabase db push

# Seed
supabase db execute --file seed.sql
```

## Environment Variables

Add these to your `.env.local` (dev) or Vercel dashboard (prod):

```
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

Both values are in your Supabase project under **Settings → API**.

## Schema

```
courses
├── id           uuid        PK, default gen_random_uuid()
├── title        text        NOT NULL, max 120 chars
├── progress     smallint    0–100
├── icon_name    text        Lucide icon name (Brain, Cpu, Network, Atom, …)
├── color_scheme text        'blue' | 'purple' | 'cyan' | 'green'
└── created_at   timestamptz default now()
```

## RLS

Row Level Security is enabled. Anonymous users can **read** all rows.
Only authenticated users can write. This is safe for a public demo.
