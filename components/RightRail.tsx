import StreakModule from "./StreakModule";
import DailyMission from "./DailyMission";
import WeeklyPerformance from "./WeeklyPerformance";
import ActivityHeatmap from "./ActivityHeatmap";
import AICoachCard from "./AICoachCard";
import AchievementShowcase from "./AchievementShowcase";
import { Course } from "@/types/course";
import { mockUser, mockDailyMission, mockWeeklyPerformance, mockActivityData, mockAICoach, mockAchievements } from "@/lib/mock-data";

interface Props {
  courses: Course[];
  onCourseSelect: (c: Course) => void;
}

export default function RightRail({ courses, onCourseSelect }: Props) {
  return (
    <aside
      className="hidden xl:flex flex-col w-[296px] shrink-0 border-l overflow-y-auto scrollbar-thin p-3 gap-3 relative"
      style={{
        borderColor: "rgba(255,255,255,0.05)",
        background: "rgba(17,19,24,0.75)",
        backdropFilter: "blur(20px) saturate(1.4)",
        WebkitBackdropFilter: "blur(20px) saturate(1.4)",
      }}
      aria-label="Intelligence panel"
    >
      {/* Gradient border on left edge */}
      <div className="absolute inset-y-0 left-0 w-px pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 60%, transparent 100%)" }}
        aria-hidden />

      <StreakModule
        streak={mockUser.streak}
        longestStreak={mockUser.longestStreak}
        weekActivity={mockUser.weekActivity}
      />
      <DailyMission mission={mockDailyMission} />
      <AICoachCard
        summary={mockAICoach.summary}
        insight={mockAICoach.insight}
        recommendations={mockAICoach.recommendations}
        courses={courses}
        onCourseSelect={onCourseSelect}
      />
      <WeeklyPerformance
        days={mockWeeklyPerformance.days}
        minutes={mockWeeklyPerformance.minutes}
        consistencyScore={mockWeeklyPerformance.consistencyScore}
      />
      <ActivityHeatmap data={mockActivityData} />
      <AchievementShowcase achievements={mockAchievements} />
    </aside>
  );
}
