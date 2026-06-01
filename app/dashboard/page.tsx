import { Suspense } from "react";
import DashboardShell from "@/components/DashboardShell";
import { mockUser } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/server";
import { Course, ColorScheme } from "@/types/course";
import Loading from "./loading";

export const dynamic = "force-dynamic";

const iconColors: Record<string, ColorScheme> = {
  Brain: "blue",  BotMessageSquare: "blue",  CircuitBoard: "blue", Binary: "blue", BookOpen: "blue", Code2: "blue",
  Cpu: "purple",  Terminal: "purple",         Shield: "purple",     Boxes: "purple", Layers: "purple",
  Network: "cyan",Globe: "cyan",              Database: "cyan",     BarChart2: "cyan",
  Atom: "green",  FlaskConical: "green",      Rocket: "green",      Star: "green",  Zap: "green",
};

function colorFor(iconName: string, idx: number): ColorScheme {
  const cycle: ColorScheme[] = ["blue", "purple", "cyan", "green"];
  return iconColors[iconName] ?? cycle[idx % 4];
}

async function getCourses(): Promise<Course[]> {
  const { data, error } = await createClient()
    .from("courses")
    .select("id, title, progress, icon_name, color_scheme, created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []).map((row, i) => ({
    id:           row.id,
    title:        row.title,
    progress:     row.progress,
    icon_name:    row.icon_name,
    created_at:   row.created_at,
    color_scheme: (row.color_scheme as ColorScheme) ?? colorFor(row.icon_name, i),
  }));
}

function greeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

async function DashboardContent({ greet, date }: { greet: string; date: string }) {
  const courses = await getCourses();
  return (
    <DashboardShell
      courses={courses}
      greeting={greet}
      user={mockUser}
      date={date}
    />
  );
}

export default function DashboardPage() {
  const now = new Date();
  const greet = greeting(now.getHours());
  const date = new Intl.DateTimeFormat("en-US", {
    weekday: "long", month: "long", day: "numeric",
  }).format(now);

  return (
    <Suspense fallback={<Loading />}>
      <DashboardContent greet={greet} date={date} />
    </Suspense>
  );
}
