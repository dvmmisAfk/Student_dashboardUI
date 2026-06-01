# LearnFlow AI OS — Student Dashboard

A production-quality, fully animated **AI-themed student learning dashboard** built for the Frontend Intern Challenge. Dark mode only. Built with Next.js 14 App Router, Supabase, Tailwind CSS, and Framer Motion.

> **Live demo:** Deploy via Vercel (see below)

---

## Quick Start

```bash
cp .env.example .env.local
# Fill in your Supabase URL and anon key
npm install
npm run dev
```

The app works **without** a Supabase project — it falls back to realistic AI-themed mock data automatically when `NEXT_PUBLIC_SUPABASE_URL` is unset. With real credentials and the seeded table, live data loads instead.

---

## Supabase Setup

### 1. Create the table

```sql
create table courses (
  id           uuid        primary key default gen_random_uuid(),
  title        text        not null check (char_length(title) <= 120),
  progress     int2        not null check (progress between 0 and 100),
  icon_name    text        not null,
  color_scheme text        not null default 'blue'
               check (color_scheme in ('blue', 'purple', 'cyan', 'green')),
  created_at   timestamptz not null default now()
);
```

### 2. Seed data

```sql
insert into courses (title, progress, icon_name, color_scheme) values
  ('Advanced Neural Architectures',  72, 'Brain',   'blue'),
  ('Rust Systems Programming',       45, 'Cpu',     'purple'),
  ('Distributed Systems Engineering',88, 'Network', 'cyan'),
  ('Quantum Computing Foundations',  31, 'Atom',    'green');
```

### 3. Environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Architecture

### Server / Client Component Split

Data fetching lives entirely in `app/dashboard/page.tsx` — a **React Server Component**. It queries Supabase on the server, computes the time-of-day greeting from `new Date().getHours()` (prevents hydration mismatch), and passes typed props to the client shell.

```
app/dashboard/page.tsx         ← RSC: Supabase fetch, greeting, date
  └─ DashboardShell.tsx        ← "use client": view state, keyboard shortcuts, modals
       ├─ LeftRail.tsx          ← collapsible sidebar (auto-collapses on tablet)
       ├─ BottomNav.tsx         ← mobile-only bottom navigation (< 768px)
       ├─ RightRail.tsx         ← intelligence panel (streak, AI coach, heatmap)
       ├─ MissionControl.tsx    ← hero tile: greeting, aurora background, stat chips
       ├─ MetricsStrip.tsx      ← 4 animated stat tiles (XP, hours, modules, focus)
       ├─ CourseGrid.tsx        ← stagger container for course cards
       │    └─ CourseCardV2.tsx ← cursor glow + spring hover + animated progress bar
       ├─ BentoActivityTile.tsx ← inline activity heatmap in main bento grid
       ├─ SearchOverlay.tsx     ← Cmd+K command palette
       ├─ StudyTimer.tsx        ← Pomodoro timer (floating modal)
       └─ CourseModal.tsx       ← right slide-over with lesson detail
```

`lib/supabase/server.ts` uses `@supabase/ssr`'s `createServerClient` with the public anon key. The Supabase client is **never** imported inside any `"use client"` file — all data arrives via props from the RSC.

### Loading & Error States

- `app/dashboard/loading.tsx` — full-layout skeleton with CSS shimmer animation that exactly mirrors the real UI shape (sidebar + hero + metrics + courses + activity + right rail). No JS required before hydration.
- `app/dashboard/error.tsx` — catches any thrown Supabase errors and renders a recovery UI with a `reset()` retry button.

---

## Animation Strategy

All animations use **`transform` and `opacity` exclusively** — `width`, `height`, and positional properties are never animated. This eliminates layout shifts and ensures 60fps on GPU-composited layers.

| Interaction | Implementation |
|---|---|
| Page entrance | `staggerChildren: 0.08s`, spring `stiffness: 260, damping: 26` |
| Card hover | `scale: 1.018` + `translateY(-2px)` + box-shadow glow, spring `stiffness: 400, damping: 30` |
| Cursor glow | Direct `glowRef.current.style.background` on `mousemove` — **zero React re-renders** |
| Progress bar | `useInView` defers until visible, then animates `width: 0 → value` over 0.9s with custom ease |
| Nav highlight | `layoutId="nav-pill"` shared-layout spring for both sidebar and bottom nav |
| View transitions | `AnimatePresence mode="wait"` with Y-axis slide |
| Heatmap cells | CSS `animation-delay` staggered `reveal-cell` keyframe per column — no JS |
| Scan-line | CSS `scan-line` keyframe on hero tile — compositor-only |

### Cursor Glow — Zero Re-render Pattern

```tsx
function onMouseMove(e: React.MouseEvent<HTMLElement>) {
  if (!glowRef.current || !cardRef.current) return;
  const r = cardRef.current.getBoundingClientRect();
  glowRef.current.style.background =
    `radial-gradient(circle 240px at ${e.clientX - r.left}px ${e.clientY - r.top}px,
     ${scheme.glow}, transparent 70%)`;
}
```

Updating `style` directly on a DOM ref bypasses React's reconciler entirely — the glow follows at 60fps with zero state updates or re-renders.

---

## Responsive Layout

| Breakpoint | Sidebar | Main Grid | Bottom Nav |
|---|---|---|---|
| **> 1024px** (desktop) | Expanded 220px — manual collapse toggle | 2-column course grid + full right rail (296px) | Hidden |
| **768–1024px** (tablet) | Auto-collapsed to 64px icon-only with Radix tooltips | 2-column grid, no right rail | Hidden |
| **< 768px** (mobile) | Hidden | Single column | Fixed bottom (56px) |

The sidebar uses a `matchMedia("(max-width: 1023px)")` listener to auto-collapse on tablet and auto-expand on desktop — no manual interaction required.

---

## Bento Grid Tiles (Main Dashboard)

1. **Hero Tile** (`MissionControl`) — greeting, user name, aurora gradient background with floating particles + scan-line, RANK badge, weekly goal ring, stat chips
2. **Metrics Strip** (`MetricsStrip`) — 4 tiles: Hours Learned, Modules Sync'd, Total XP, Focus Score — each with animated entrance and trend badge
3. **Course Grid** (`CourseGrid` + `CourseCardV2`) — AI-themed courses fetched from Supabase with staggered card entrance, cursor-following glow, animated progress bars, and momentum mini-bars
4. **Activity Tile** (`BentoActivityTile`) — inline 16-week contribution heatmap with streak stats and intensity legend

---

## Design System

The design is based on the **"Synthetic Intelligence Interface"** system (Google Stitch project `12254588491219642692`) — a dark-mode OS aesthetic with:

- **Surface hierarchy**: `#111318` → `#1a1b21` → `#1e1f25` → `#282a2f` → `#33353a`
- **Accent triad**: Blue `#4F8EF7` (actions) · Purple `#8B5CF6` (AI/magic) · Cyan `#22D3EE` (data/progress)
- **Typography**: Geist Sans (body) + Geist Mono (labels, numbers, badges)
- **Glassmorphism**: Sidebar rails use `backdrop-filter: blur(20px)` glass treatment
- **Grain texture**: SVG `<feTurbulence>` at 1.8% opacity on hero cards — depth without raster assets

---

## Code Quality Notes

- **TypeScript throughout** — `Course` interface matches Supabase schema exactly; all props are typed
- **Semantic HTML** — `<nav>`, `<main>`, `<aside>`, `<section>`, `<article>` used correctly
- **`will-change: transform`** on every animated card — compositor layer promotion
- **Deterministic momentum bars** — derived from a hash of `course.id`, not `Math.random()`, preventing hydration mismatches
- **No layout shifts** — all Framer Motion animations use `transform`/`opacity` only

---

## Deployment

1. Push to a public GitHub repo
2. Connect to [Vercel](https://vercel.com) — it auto-detects Next.js
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy — the app works even without Supabase credentials (mock data fallback)
# Student_dashboardUI
