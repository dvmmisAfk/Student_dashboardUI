import { Course } from "@/types/course";

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Advanced Neural Architectures",
    progress: 72,
    icon_name: "Brain",
    color_scheme: "blue",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "Rust Systems Programming",
    progress: 45,
    icon_name: "Cpu",
    color_scheme: "purple",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    title: "Distributed Systems Engineering",
    progress: 88,
    icon_name: "Network",
    color_scheme: "cyan",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    title: "Quantum Computing Foundations",
    progress: 31,
    icon_name: "Atom",
    color_scheme: "green",
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockUser = {
  name: "Alex",
  streak: 14,
  weeklyGoalPercent: 68,
  xpThisWeek: 840,
  totalXP: 2450,
  hoursThisWeek: 12.4,
  lessonsCompleted: 23,
  focusScore: 94,
  level: 24,
  levelTitle: "Neural Architect",
  rank: "APEX",
  avatarInitials: "AJ",
  longestStreak: 21,
  weekActivity: [true, true, true, true, true, false, false] as boolean[],
};

export const mockAchievements = [
  {
    id: "a1",
    iconName: "Flame",
    title: "14 Day Streak",
    description: "14 consecutive neural sync days",
    color: "warn" as const,
    unlockedAt: "2 days ago",
  },
  {
    id: "a2",
    iconName: "BookOpen",
    title: "50 Modules Complete",
    description: "Processed 50 learning modules",
    color: "blue" as const,
    unlockedAt: "1 week ago",
  },
  {
    id: "a3",
    iconName: "Zap",
    title: "Distributed Systems",
    description: "88% trajectory achieved",
    color: "cyan" as const,
    unlockedAt: "3 days ago",
  },
];

export const mockAICoach = {
  summary: "You're 3 modules from completing Neural Architectures. Momentum is strong.",
  insight: "Transformer topology is your growth edge — Attention Mechanisms chapter is recommended before the final assessment.",
  recommendations: [
    {
      type: "continue" as const,
      label: "Neural Architectures",
      reason: "High velocity detected",
    },
    {
      type: "review" as const,
      label: "Rust Systems",
      reason: "5 days since last session",
    },
  ],
};

export const mockDailyMission = {
  title: "Complete Transformer Topology Module",
  subtitle: "Lesson 4 of 5 · Advanced Neural Architectures",
  progress: 75,
  xpReward: 180,
  timeEstimate: "~22 min",
};

export const mockWeeklyPerformance = {
  days: ["M", "T", "W", "T", "F", "S", "S"],
  minutes: [45, 30, 60, 20, 75, 40, 55],
  consistencyScore: 87,
};

export const mockActivityData = generateActivityData();

function generateActivityData(): number[][] {
  const seed = [
    [0, 1, 2, 3, 4, 2, 1],
    [2, 3, 4, 4, 3, 1, 0],
    [1, 2, 3, 2, 4, 3, 2],
    [0, 0, 1, 2, 1, 0, 0],
    [3, 4, 4, 3, 2, 1, 0],
    [2, 3, 3, 4, 4, 2, 1],
    [1, 1, 2, 3, 2, 1, 0],
    [0, 2, 3, 3, 4, 3, 2],
    [2, 3, 4, 4, 3, 2, 1],
    [1, 2, 2, 3, 4, 2, 0],
    [0, 1, 2, 2, 3, 1, 0],
    [3, 3, 4, 4, 4, 3, 2],
    [2, 3, 3, 4, 3, 2, 1],
    [1, 2, 3, 3, 4, 2, 1],
    [3, 4, 4, 3, 3, 1, 0],
    [4, 3, 2, 1, 0, 0, 0],
  ];
  return seed;
}
