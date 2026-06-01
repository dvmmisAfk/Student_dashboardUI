# Student Dashboard

Frontend Intern Challenge submission. Next.js 14 App Router, Supabase, Tailwind CSS, Framer Motion.

## Setup

```bash
cp .env.example .env.local
# add your Supabase credentials to .env.local
npm install
npm run dev
```

## Supabase

Create a project at [supabase.com](https://supabase.com), then run both SQL files in the dashboard's SQL editor (Project → SQL Editor):

1. `supabase/migrations/20240101000000_create_courses.sql` — creates the table, index, RLS policies
2. `supabase/seed.sql` — inserts the 4 sample courses

Your credentials are under Project Settings → API:

```
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

## How it works

`app/dashboard/page.tsx` is a sync server component that renders a `<Suspense>` boundary immediately. Inside it, `DashboardContent` is an async server component that runs the Supabase query. The skeleton from `loading.tsx` shows during the fetch; `error.tsx` catches anything thrown.

```
page.tsx (sync RSC)
  └─ <Suspense fallback={<Loading />}>
       └─ DashboardContent (async RSC) ← Supabase query runs here
            └─ DashboardShell ("use client") ← view state, modals
                 ├─ LeftRail            collapsible sidebar
                 ├─ BottomNav           mobile bottom nav
                 ├─ RightRail           xl-only panel
                 ├─ MissionControl      hero tile
                 ├─ MetricsStrip        4 stat tiles
                 ├─ CourseGrid          course cards
                 └─ BentoActivityTile   heatmap
```

Supabase only runs server-side. Courses arrive as typed props; nothing from `@supabase/ssr` is bundled on the client.

## Animations

Everything uses `transform` and `opacity` — no layout-triggering properties, so no CLS.

- Bento sections stagger in on load (`staggerChildren: 0.1s`, spring physics)
- Card hover scales to `1.018` with a border glow, spring `stiffness: 400 damping: 30`  
- Progress bars animate from 0 on viewport entry (`useInView`)
- Sidebar active indicator uses `layoutId` shared-layout animation
- Cursor glow writes directly to a DOM ref — no React re-renders on `mousemove`

## Responsive

| Breakpoint | Sidebar | Grid | Bottom nav |
|---|---|---|---|
| > 1024px | 220px, collapsible | 2-col | hidden |
| 768–1024px | 64px icons with tooltips | 2-col | hidden |
| < 768px | hidden | 1-col | fixed bottom |

## Deploy to Vercel

1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the Vercel environment variables panel
4. Deploy
