"use client";

import { BotMessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { Course } from "@/types/course";

interface Recommendation {
  type: "continue" | "review";
  label: string;
  reason: string;
}

interface Props {
  summary: string;
  insight: string;
  recommendations: Recommendation[];
  courses: Course[];
  onCourseSelect: (c: Course) => void;
}

export default function AICoachCard({ summary, insight, recommendations, courses, onCourseSelect }: Props) {
  function handleRec(rec: Recommendation) {
    const match = courses.find(c =>
      c.title.toLowerCase().includes(rec.label.toLowerCase()) ||
      rec.label.toLowerCase().includes(c.title.toLowerCase().split(" ")[0].toLowerCase())
    );
    if (match) onCourseSelect(match);
  }

  return (
    <div
      className="rounded-tile p-5 relative"
      style={{
        background: "radial-gradient(ellipse 100% 70% at 50% -10%, rgba(139,92,246,0.14) 0%, transparent 65%), #1a1b21",
        boxShadow: "0 0 0 1px rgba(139,92,246,0.20), 0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-px rounded-t-tile pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(139,92,246,0.65), rgba(34,211,238,0.45), transparent)" }} aria-hidden />

      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-inner flex items-center justify-center shrink-0"
          style={{ background: "rgba(139,92,246,0.20)", border: "1px solid rgba(139,92,246,0.30)" }}>
          <BotMessageSquare size={16} style={{ color: "#8B5CF6" }} aria-hidden />
        </div>
        <div className="flex flex-col leading-none">
          <p className="text-[13px] font-bold text-text-primary">Nexus AI Coach</p>
          <p className="text-[10px] text-text-faint font-mono mt-0.5" style={{ letterSpacing: "0.08em" }}>INTELLIGENCE ENGINE</p>
        </div>
        <span
          className="ml-auto w-2 h-2 rounded-full bg-accent-cyan shrink-0"
          style={{ animation: "pulse-cyan 2.4s ease-in-out infinite" }}
          aria-label="Live analysis"
        />
      </div>

      {/* Summary */}
      <p className="text-[13px] text-text-secondary leading-relaxed mb-4">{summary}</p>

      {/* Insight box */}
      <div className="rounded-inner p-3 mb-4"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles size={12} style={{ color: "#8B5CF6" }} aria-hidden />
          <p className="text-[10px] text-text-faint font-bold font-mono" style={{ letterSpacing: "0.12em" }}>PATTERN DETECTED</p>
        </div>
        <p className="text-[12px] text-text-muted leading-relaxed">{insight}</p>
      </div>

      {/* Recommendations */}
      <div>
        <p className="text-[10px] text-text-faint font-bold font-mono mb-3" style={{ letterSpacing: "0.12em" }}>
          SUGGESTED TRAJECTORY
        </p>
        <div className="flex flex-col gap-2">
          {recommendations.map((rec, i) => (
            <button
              key={i}
              onClick={() => handleRec(rec)}
              className="w-full flex items-center justify-between gap-2 rounded-inner px-3 py-2.5 transition-all text-left"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(139,92,246,0.10)";
                e.currentTarget.style.borderColor = "rgba(139,92,246,0.30)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-text-primary truncate">{rec.label}</p>
                <p className="text-[11px] text-text-faint mt-0.5 font-mono">{rec.reason}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded"
                  style={{
                    color:       rec.type === "continue" ? "#22D3EE" : "#8B5CF6",
                    background:  rec.type === "continue" ? "rgba(34,211,238,0.12)" : "rgba(139,92,246,0.12)",
                    border: `1px solid ${rec.type === "continue" ? "rgba(34,211,238,0.25)" : "rgba(139,92,246,0.25)"}`,
                  }}>
                  {rec.type === "continue" ? "CONTINUE" : "REVIEW"}
                </span>
                <ArrowRight size={13} className="text-text-faint" aria-hidden />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
