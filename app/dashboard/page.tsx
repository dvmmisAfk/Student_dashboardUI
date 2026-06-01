import DashboardShell from "@/components/DashboardShell";
import { mockCourses, mockUser } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/server";
import { Course } from "@/types/course";

// Always server-render: greeting/date must be fresh, and Supabase reads cookies
export const dynamic = "force-dynamic";

async function getCourses(): Promise<Course[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return mockCourses;
  }

  const { data, error } = await createClient()
    .from("courses")
    .select("id, title, progress, icon_name, color_scheme, created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data?.length ? data : mockCourses) as Course[];
}

function getGreeting(h: number) {
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default async function DashboardPage() {
  const courses  = await getCourses();
  const greeting = getGreeting(new Date().getHours());
  const date     = new Intl.DateTimeFormat("en-US", {
    weekday: "long", month: "long", day: "numeric",
  }).format(new Date());

  return (
    <DashboardShell
      courses={courses}
      greeting={greeting}
      user={mockUser}
      date={date}
    />
  );
}
