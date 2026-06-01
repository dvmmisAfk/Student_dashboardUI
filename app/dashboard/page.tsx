import { Suspense } from "react";
import DashboardShell from "@/components/DashboardShell";
import { mockUser } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/server";
import { Course, ColorScheme, RawCourse } from "@/types/course";
import Loading from "./loading";

// Always server-render — reading cookies (Supabase) opts out of static generation.
export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// Color derivation — color_scheme is stored in the DB (see migration).
// This map is used as a typed guard so icon_name values from the DB always
// resolve to a valid ColorScheme even if a future row has an unexpected name.
// ---------------------------------------------------------------------------
const ICON_COLOR_MAP: Record<string, ColorScheme> = {
  Brain: "blue",  BotMessageSquare: "blue",  CircuitBoard: "blue",
  Binary: "blue", BookOpen: "blue",           Code2: "blue",
  Cpu: "purple",  Terminal: "purple",         Shield: "purple",
  Boxes: "purple",Layers: "purple",
  Network: "cyan",Globe: "cyan",              Database: "cyan",
  BarChart2: "cyan",
  Atom: "green",  FlaskConical: "green",      Rocket: "green",
  Star: "green",  Zap: "green",
};
const COLOR_CYCLE: ColorScheme[] = ["blue", "purple", "cyan", "green"];

function toColorScheme(iconName: string, idx: number): ColorScheme {
  return ICON_COLOR_MAP[iconName] ?? COLOR_CYCLE[idx % 4];
}

// ---------------------------------------------------------------------------
// Server-side Supabase fetch — strict, no mock fallback.
// Throws on error so Next.js error.tsx catches it with a retry option.
// ---------------------------------------------------------------------------
async function fetchCourses(): Promise<Course[]> {
  const { data, error } = await createClient()
    .from("courses")
    .select("id, title, progress, icon_name, color_scheme, created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []).map((row: RawCourse, i: number) => ({
    id:           row.id,
    title:        row.title,
    progress:     row.progress,
    icon_name:    row.icon_name,
    created_at:   row.created_at,
    // Prefer DB-stored color_scheme; fall back to icon-name derivation if null
    color_scheme: (row.color_scheme as ColorScheme | null)
      ?? toColorScheme(row.icon_name, i),
  }));
}

function getGreeting(h: number) {
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

// ---------------------------------------------------------------------------
// Inner async Server Component — this is the boundary that suspends.
// It fetches courses from Supabase on every request and hands typed props
// down to the client-only DashboardShell; zero Supabase code runs on client.
// ---------------------------------------------------------------------------
async function DashboardContent({
  greeting,
  date,
}: {
  greeting: string;
  date: string;
}) {
  const courses = await fetchCourses();

  return (
    <DashboardShell
      courses={courses}
      greeting={greeting}
      user={mockUser}
      date={date}
    />
  );
}

// ---------------------------------------------------------------------------
// Outer page — synchronous, renders immediately.
// The <Suspense> boundary shows the full-layout skeleton (Loading) while
// DashboardContent awaits the Supabase response. error.tsx catches throws.
// ---------------------------------------------------------------------------
export default function DashboardPage() {
  const greeting = getGreeting(new Date().getHours());
  const date = new Intl.DateTimeFormat("en-US", {
    weekday: "long", month: "long", day: "numeric",
  }).format(new Date());

  return (
    <Suspense fallback={<Loading />}>
      <DashboardContent greeting={greeting} date={date} />
    </Suspense>
  );
}
