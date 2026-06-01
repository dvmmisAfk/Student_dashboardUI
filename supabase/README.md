# Supabase setup

Run both files in the Supabase SQL editor (Project → SQL Editor):

1. `migrations/20240101000000_create_courses.sql`
2. `seed.sql`

Or via the CLI:

```bash
supabase link --project-ref <your-ref>
supabase db push
supabase db execute --file seed.sql
```

Credentials (Project Settings → API):

```
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

## Schema

```
courses
  id           uuid        PK, gen_random_uuid()
  title        text        max 120 chars
  progress     smallint    0–100
  icon_name    text        Lucide icon name (Brain, Cpu, Network, Atom …)
  color_scheme text        blue | purple | cyan | green
  created_at   timestamptz default now()
```

RLS is enabled. Anonymous users can read all rows; writes require authentication.
