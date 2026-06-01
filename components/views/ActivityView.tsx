"use client";

import ActivityHeatmap from "../ActivityHeatmap";
import WeeklyPerformance from "../WeeklyPerformance";
import { mockActivityData, mockWeeklyPerformance, mockUser } from "@/lib/mock-data";
import { Flame, Clock, Brain, Target } from "lucide-react";

export default function ActivityView() {
  const stats = [
    { label: "Neural Streak",   value: `${mockUser.streak}d`,            icon: Flame,  color: "#F59E0B" },
    { label: "Hours This Week", value: `${mockUser.hoursThisWeek}h`,     icon: Clock,  color: "#4F8EF7" },
    { label: "Modules Done",    value: String(mockUser.lessonsCompleted), icon: Brain,  color: "#8B5CF6" },
    { label: "Focus Score",     value: `${mockUser.focusScore}%`,         icon: Target, color: "#22D3EE" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-[10px] font-bold text-text-faint font-mono mb-1" style={{ letterSpacing: "0.14em" }}>LEARNING OS</p>
        <h1 className="text-[26px] font-bold text-text-primary" style={{ letterSpacing: "-0.025em" }}>Learning Intelligence</h1>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label}
              className="rounded-tile p-4 border relative overflow-hidden"
              style={{ background: "#1a1b21", borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="absolute inset-x-0 top-0 h-px rounded-t-tile pointer-events-none"
                style={{ background: `linear-gradient(to right, transparent, ${s.color}35, transparent)` }} aria-hidden />
              <div className="w-8 h-8 rounded-inner flex items-center justify-center mb-3" style={{ background: `${s.color}14` }}>
                <Icon size={15} style={{ color: s.color }} strokeWidth={1.8} />
              </div>
              <p className="font-mono font-bold text-text-primary" style={{ fontSize: 24, color: s.color, letterSpacing: "-0.02em" }}>{s.value}</p>
              <p className="text-[11px] text-text-muted mt-1">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Contribution history */}
      <div className="rounded-tile p-5 border relative overflow-hidden"
        style={{ background: "#1a1b21", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="absolute inset-x-0 top-0 h-px rounded-t-tile"
          style={{ background: "linear-gradient(to right, transparent, rgba(79,142,247,0.4), transparent)" }} aria-hidden />
        <h2 className="text-[9px] font-bold text-text-faint font-mono mb-4" style={{ letterSpacing: "0.14em" }}>
          CONTRIBUTION MATRIX
        </h2>
        <ActivityHeatmap data={mockActivityData} />
      </div>

      {/* Weekly breakdown */}
      <div className="rounded-tile p-5 border relative overflow-hidden"
        style={{ background: "#1a1b21", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="absolute inset-x-0 top-0 h-px rounded-t-tile"
          style={{ background: "linear-gradient(to right, transparent, rgba(139,92,246,0.4), transparent)" }} aria-hidden />
        <h2 className="text-[9px] font-bold text-text-faint font-mono mb-4" style={{ letterSpacing: "0.14em" }}>
          WEEKLY PERFORMANCE
        </h2>
        <WeeklyPerformance
          days={mockWeeklyPerformance.days}
          minutes={mockWeeklyPerformance.minutes}
          consistencyScore={mockWeeklyPerformance.consistencyScore}
        />
      </div>
    </div>
  );
}
