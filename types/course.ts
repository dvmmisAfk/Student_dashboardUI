export interface RawCourse {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  color_scheme: string | null;
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  color_scheme: "blue" | "purple" | "cyan" | "green";
  created_at: string;
}

export type ColorScheme = Course["color_scheme"];
