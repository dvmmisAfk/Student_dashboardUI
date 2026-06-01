"use client";

import { useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Target, Play, CheckCircle2 } from "lucide-react";

interface Mission {
  title: string;
  subtitle: string;
  progress: number;
  xpReward: number;
  timeEstimate: string;
}

export default function DailyMission({ mission }: { mission: Mission }) {
  const [started, setStarted] = useState(false);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20px 0px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      className="rounded-tile p-5 relative"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 100% 0%, rgba(79,142,247,0.10) 0%, transparent 70%), #1a1b21",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-px rounded-t-tile pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(79,142,247,0.55), transparent)" }} aria-hidden />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target size={14} style={{ color: "var(--accent-blue)" }} aria-hidden />
          <p className="text-[11px] font-bold text-text-faint font-mono" style={{ letterSpacing: "0.14em" }}>DAILY MISSION</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-badge px-2.5 py-1"
          style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" }}>
          <span style={{ color: "#F59E0B", fontSize: 13 }}>⚡</span>
          <span className="font-mono text-[12px] font-bold" style={{ color: "#F59E0B" }}>+{mission.xpReward} XP</span>
        </div>
      </div>

      {/* Title & subtitle */}
      <h3 className="text-[14px] font-semibold text-text-primary leading-snug mb-1.5" style={{ letterSpacing: "-0.01em" }}>
        {mission.title}
      </h3>
      <p className="text-[12px] text-text-muted mb-4 font-mono leading-relaxed">{mission.subtitle}</p>

      {/* Progress bar */}
      <div className="mb-4">
        <div
          className="w-full rounded-badge overflow-hidden"
          style={{ height: 6, background: "rgba(79,142,247,0.14)" }}
          role="progressbar"
          aria-valuenow={mission.progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Daily mission ${mission.progress}% complete`}
        >
          <motion.div
            className="h-full rounded-badge"
            style={{ background: "linear-gradient(to right, #4F8EF7cc, #4F8EF7)" }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${mission.progress}%` } : { width: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          />
        </div>
      </div>

      {/* Progress row */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[13px] font-bold" style={{ color: "var(--accent-blue)" }}>{mission.progress}% complete</span>
        <span className="text-[12px] text-text-faint font-mono">{mission.timeEstimate}</span>
      </div>

      {/* CTA button */}
      <button
        onClick={() => setStarted(s => !s)}
        className="w-full flex items-center justify-center gap-2 h-9 rounded-inner text-[12px] font-bold font-mono transition-all"
        style={started
          ? { background: "rgba(16,185,129,0.12)", color: "#10B981", border: "1px solid rgba(16,185,129,0.28)" }
          : { background: "rgba(79,142,247,0.12)", color: "#4F8EF7", border: "1px solid rgba(79,142,247,0.28)" }
        }
      >
        {started ? (
          <><CheckCircle2 size={14} aria-hidden /> IN PROGRESS</>
        ) : (
          <><Play size={13} aria-hidden /> INITIATE SESSION</>
        )}
      </button>
    </div>
  );
}
