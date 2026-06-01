"use client";

import { motion } from "framer-motion";
import { mockActivityData, mockUser } from "@/lib/mock-data";

const intensities = [
  "var(--heat-0)",
  "var(--heat-1)",
  "var(--heat-2)",
  "var(--heat-3)",
  "var(--heat-4)",
];

const CELL = 10;
const GAP  = 2;
const STEP = CELL + GAP;

const statChips = [
  { label: "Current Streak",  value: `${mockUser.streak}d`,            color: "#F59E0B" },
  { label: "Longest Streak",  value: `${mockUser.longestStreak}d`,      color: "#4F8EF7" },
  { label: "Active Weeks",    value: "14",                              color: "#8B5CF6" },
  { label: "Peak Day",        value: "75 min",                          color: "#22D3EE" },
];

export default function BentoActivityTile() {
  const weeks = mockActivityData.length;

  return (
    <section
      className="relative rounded-tile overflow-hidden"
      aria-label="Learning activity heatmap"
      style={{
        background: "#1a1b21",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 4px 24px rgba(0,0,0,0.4)",
        padding: "22px",
      }}
    >
      {/* Top-lit border */}
      <div className="absolute inset-x-0 top-0 h-px rounded-t-tile pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(79,142,247,0.45), rgba(34,211,238,0.35), transparent)" }}
        aria-hidden />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[11px] font-bold text-text-faint font-mono" style={{ letterSpacing: "0.14em" }}>
            NEURAL ACTIVITY
          </p>
          <p className="text-[13px] font-semibold text-text-secondary mt-0.5">Learning contribution history</p>
        </div>
        <div className="text-right">
          <p className="font-mono font-bold text-text-primary" style={{ fontSize: 22, color: "#4F8EF7" }}>
            {mockUser.streak}
          </p>
          <p className="text-[10px] text-text-faint font-mono" style={{ letterSpacing: "0.1em" }}>DAY STREAK</p>
        </div>
      </div>

      {/* Heatmap grid */}
      <div className="overflow-x-auto scrollbar-none mb-4">
        <div
          className="flex gap-[2px]"
          style={{ minWidth: weeks * STEP - GAP }}
          aria-label="Activity grid — 16 weeks"
        >
          {mockActivityData.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[2px]">
              {week.map((intensity, di) => (
                <motion.div
                  key={di}
                  className="rounded-sm"
                  style={{
                    width: CELL, height: CELL,
                    background: intensities[intensity] ?? intensities[0],
                    animation: `reveal-cell 0.35s ease forwards`,
                    animationDelay: `${wi * 0.02}s`,
                    opacity: 0,
                  }}
                  whileHover={{ scale: 1.3 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  aria-label={`Week ${wi + 1}, day ${di + 1}: intensity ${intensity}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend + Stats row */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Scale legend */}
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="text-[11px] text-text-faint font-mono">Less</span>
          {intensities.map((c, i) => (
            <div key={i} className="rounded-sm" style={{ width: CELL, height: CELL, background: c, flexShrink: 0 }} />
          ))}
          <span className="text-[11px] text-text-faint font-mono">More</span>
        </div>

        {/* Quick stat chips */}
        <div className="flex items-center gap-2 flex-wrap">
          {statChips.map(chip => (
            <div key={chip.label}
              className="flex items-center gap-1.5 rounded-badge px-2.5 py-1"
              style={{ background: `${chip.color}10`, border: `1px solid ${chip.color}25` }}>
              <span className="font-mono text-[12px] font-bold" style={{ color: chip.color }}>{chip.value}</span>
              <span className="text-[11px] text-text-faint">{chip.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
