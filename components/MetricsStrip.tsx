"use client";

import { motion } from "framer-motion";
import { Clock, Brain, Target } from "lucide-react";

interface Props {
  user: { hoursThisWeek: number; lessonsCompleted: number; totalXP: number; focusScore: number };
}

const tiles = [
  { key: "hoursThisWeek"    as const, suffix: "h",  label: "Hours Learned",  sublabel: "THIS WEEK",   icon: Clock,  color: "#4F8EF7", trend: "+2.1h this week" },
  { key: "lessonsCompleted" as const, suffix: "",   label: "Modules Sync'd", sublabel: "COMPLETED",   icon: Brain,  color: "#8B5CF6", trend: "+5 today"        },
  { key: "totalXP"          as const, suffix: "",   label: "Total XP",       sublabel: "ACCUMULATED", icon: null,   color: "#F59E0B", trend: "+180 today",  emoji: "⚡" },
  { key: "focusScore"       as const, suffix: "%",  label: "Focus Score",    sublabel: "COGNITIVE",   icon: Target, color: "#22D3EE", trend: "↑ 6 pts"        },
];

export default function MetricsStrip({ user }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {tiles.map(({ key, suffix, label, sublabel, icon: Icon, color, trend, emoji }, i) => (
        <motion.div key={key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, type: "spring", stiffness: 320, damping: 26 }}
          className="group relative rounded-tile p-5 flex flex-col gap-3 overflow-hidden cursor-default"
          style={{ background: "#1a1b21", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 4px 24px rgba(0,0,0,0.35)" }}
        >
          {/* Hover radial glow */}
          <div className="absolute inset-0 rounded-tile opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 60% 60% at 0% 0%, ${color}14, transparent)` }} />

          {/* Top-lit border */}
          <div className="absolute inset-x-0 top-0 h-px rounded-t-tile pointer-events-none"
            style={{ background: `linear-gradient(to right, transparent, ${color}35, transparent)` }} aria-hidden />

          {/* Icon */}
          <div className="w-9 h-9 rounded-inner flex items-center justify-center" style={{ background: `${color}15` }}>
            {Icon
              ? <Icon size={18} style={{ color }} strokeWidth={1.9} />
              : <span style={{ color, fontSize: 18, lineHeight: 1 }}>{emoji}</span>
            }
          </div>

          {/* Value */}
          <div>
            <p className="font-mono font-bold leading-none" style={{ fontSize: 30, letterSpacing: "-0.03em", color }}>
              {user[key]}{suffix}
            </p>
            <p className="text-[13px] text-text-secondary mt-1.5 font-medium">{label}</p>
            <p className="text-[11px] text-text-faint font-mono mt-0.5" style={{ letterSpacing: "0.06em" }}>{sublabel}</p>
          </div>

          {/* Trend badge */}
          <div className="mt-auto">
            <span className="text-[11px] font-semibold font-mono px-2 py-0.5 rounded"
              style={{ color: "#10B981", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.20)" }}>
              {trend}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
