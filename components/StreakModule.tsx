"use client";

import { Flame } from "lucide-react";

interface Props {
  streak: number;
  longestStreak: number;
  weekActivity: boolean[];
}

const days = ["M", "T", "W", "T", "F", "S", "S"];

export default function StreakModule({ streak, longestStreak, weekActivity }: Props) {
  return (
    <div
      className="rounded-tile p-5 relative"
      style={{
        background: "radial-gradient(ellipse 90% 70% at 50% -5%, rgba(245,158,11,0.12) 0%, transparent 70%), #1a1b21",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-px rounded-t-tile pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(245,158,11,0.55), transparent)" }} aria-hidden />

      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-bold text-text-faint font-mono" style={{ letterSpacing: "0.14em" }}>NEURAL STREAK</p>
        <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded"
          style={{ color: "#F59E0B", background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" }}>
          BEST: {longestStreak}d
        </span>
      </div>

      {/* Big streak number */}
      <div className="flex items-center gap-3 mb-5">
        <Flame size={32} style={{ color: "#F59E0B", fill: "rgba(245,158,11,0.30)" }} aria-hidden />
        <div className="flex items-baseline gap-2">
          <span
            className="font-mono font-bold leading-none"
            style={{ fontSize: 44, letterSpacing: "-0.04em", color: "#F59E0B" }}
            aria-label={`${streak} day streak`}
          >
            {streak}
          </span>
          <span className="text-[15px] font-bold text-text-muted font-mono">DAYS</span>
        </div>
      </div>

      {/* Day dots */}
      <div className="flex items-center gap-2 mb-4" role="list" aria-label="This week's activity">
        {days.map((d, i) => (
          <div key={i} role="listitem" className="flex-1 flex flex-col items-center">
            <div
              className="w-full aspect-square rounded-inner flex items-center justify-center min-w-[28px] max-w-[36px]"
              style={{
                background: weekActivity[i] ? "rgba(245,158,11,0.20)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${weekActivity[i] ? "rgba(245,158,11,0.40)" : "rgba(255,255,255,0.08)"}`,
              }}
              aria-label={`${d}: ${weekActivity[i] ? "active" : "inactive"}`}
            >
              {weekActivity[i] ? (
                <Flame size={13} style={{ color: "#F59E0B" }} />
              ) : (
                <span className="text-[11px] font-bold font-mono" style={{ color: "var(--text-faint)" }}>{d}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <span className="w-[6px] h-[6px] rounded-full bg-accent-green flex-shrink-0" style={{ animation: "pulse-dot 2.2s ease-in-out infinite" }} aria-hidden />
        <p className="text-[12px] text-text-muted font-mono">Sync active · {streak - 1} days consecutive</p>
      </div>
    </div>
  );
}
