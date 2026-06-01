"use client";

import { Flame, BookOpen, Zap, Star, Trophy, type LucideProps } from "lucide-react";
import { ComponentType } from "react";

type AchievementColor = "warn" | "blue" | "cyan" | "purple" | "green";

interface Achievement {
  id: string;
  iconName: string;
  title: string;
  description: string;
  color: AchievementColor;
  unlockedAt: string;
}

const iconMap: Record<string, ComponentType<LucideProps>> = {
  Flame, BookOpen, Zap, Star, Trophy,
};

const colorMap: Record<AchievementColor, { bg: string; icon: string; border: string }> = {
  warn:   { bg: "rgba(245,158,11,0.10)",  icon: "#F59E0B", border: "rgba(245,158,11,0.25)"  },
  blue:   { bg: "rgba(79,142,247,0.10)",  icon: "#4F8EF7", border: "rgba(79,142,247,0.25)"  },
  cyan:   { bg: "rgba(34,211,238,0.08)",  icon: "#22D3EE", border: "rgba(34,211,238,0.22)"  },
  purple: { bg: "rgba(139,92,246,0.10)",  icon: "#8B5CF6", border: "rgba(139,92,246,0.25)"  },
  green:  { bg: "rgba(16,185,129,0.08)",  icon: "#10B981", border: "rgba(16,185,129,0.22)"  },
};

export default function AchievementShowcase({ achievements }: { achievements: Achievement[] }) {
  return (
    <div
      className="rounded-tile p-5 relative"
      style={{
        background: "#1a1b21",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-px rounded-t-tile pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(245,158,11,0.45), rgba(139,92,246,0.45), transparent)" }} aria-hidden />

      <p className="text-[11px] font-bold text-text-faint font-mono mb-4" style={{ letterSpacing: "0.14em" }}>
        RECENT UNLOCKS
      </p>

      <ul className="flex flex-col gap-3" aria-label="Recent achievements">
        {achievements.map((a) => {
          const Icon = iconMap[a.iconName] ?? Trophy;
          const c    = colorMap[a.color];

          return (
            <li
              key={a.id}
              className="flex items-center gap-3 p-3 rounded-inner border"
              style={{ background: c.bg, borderColor: c.border }}
            >
              <div className="w-10 h-10 rounded-inner flex items-center justify-center shrink-0"
                style={{ background: `${c.icon}20` }}>
                <Icon size={18} style={{ color: c.icon }} aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-text-primary leading-none truncate">{a.title}</p>
                <p className="text-[11px] text-text-muted mt-1 truncate">{a.description}</p>
                <p className="text-[11px] mt-1 truncate font-mono font-semibold" style={{ color: c.icon }}>{a.unlockedAt}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
