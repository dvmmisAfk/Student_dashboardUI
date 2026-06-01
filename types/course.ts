// Exact shape returned by Supabase — matches the courses table columns.
// color_scheme is stored in the DB (see supabase/migrations/) and may be
// null on rows inserted without it; the page layer derives a fallback value.
export interface RawCourse {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  color_scheme: string | null;
  created_at: string;
}

// App-level shape used by all UI components.
// color_scheme is always resolved (never null) by the time data reaches the client.
export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  color_scheme: "blue" | "purple" | "cyan" | "green";
  created_at: string;
}

export type ColorScheme = Course["color_scheme"];
