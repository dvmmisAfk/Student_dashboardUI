"use client";

import { Flame, BookOpen, Zap, Star, Moon, Calendar, Trophy, Lock, Brain, Target } from "lucide-react";
import { mockAchievements } from "@/lib/mock-data";

const locked = [
  { id: "l1", icon: Calendar, title: "30 Day Neural Sync",  desc: "Maintain 30 consecutive sync days",    progress: 14, goal: 30  },
  { id: "l2", icon: Trophy,   title: "Trajectory Master",   desc: "Complete all 4 learning trajectories", progress: 1,  goal: 4   },
  { id: "l3", icon: Moon,     title: "Deep Work Mode",      desc: "Study after midnight, 3 times",        progress: 0,  goal: 3   },
  { id: "l4", icon: Brain,    title: "Neural Overdrive",    desc: "100 modules processed in a week",      progress: 23, goal: 100 },
  { id: "l5", icon: Target,   title: "Perfect Alignment",   desc: "Hit your goal 7 days in a row",        progress: 5,  goal: 7   },
];

const iconMap: Record<string, typeof Flame> = { Flame, BookOpen, Zap, Star, Trophy, Brain, Target };

const colorMap = {
  warn:   { bg: "rgba(245,158,11,0.10)",  icon: "#F59E0B", border: "rgba(245,158,11,0.24)",  glow: "rgba(245,158,11,0.08)"  },
  blue:   { bg: "rgba(79,142,247,0.10)",  icon: "#4F8EF7", border: "rgba(79,142,247,0.24)",  glow: "rgba(79,142,247,0.08)"  },
  cyan:   { bg: "rgba(34,211,238,0.08)",  icon: "#22D3EE", border: "rgba(34,211,238,0.22)",  glow: "rgba(34,211,238,0.06)"  },
  purple: { bg: "rgba(139,92,246,0.10)",  icon: "#8B5CF6", border: "rgba(139,92,246,0.24)",  glow: "rgba(139,92,246,0.08)"  },
  green:  { bg: "rgba(16,185,129,0.08)",  icon: "#10B981", border: "rgba(16,185,129,0.22)",  glow: "rgba(16,185,129,0.06)"  },
};

export default function AchievementsView() {
  return (
    <div>
      <div className="mb-7">
        <p className="text-[11px] font-bold text-text-faint font-mono mb-1.5" style={{ letterSpacing: "0.14em" }}>LEARNING OS</p>
        <h1 className="text-[28px] font-bold text-text-primary" style={{ letterSpacing: "-0.025em" }}>Achievements Hub</h1>
      </div>

      {/* Earned */}
      <section className="mb-8">
        <div className="flex items-center gap-2.5 mb-4">
          <h2 className="text-[11px] font-bold text-text-faint font-mono" style={{ letterSpacing: "0.14em" }}>UNLOCKED</h2>
          <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded"
            style={{ color: "#10B981", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }}>
            {mockAchievements.length}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {mockAchievements.map(a => {
            const Icon = iconMap[a.iconName] ?? Trophy;
            const c = colorMap[a.color];
            return (
              <div key={a.id}
                className="rounded-tile p-5 border flex items-start gap-4 relative overflow-hidden"
                style={{ background: c.bg, borderColor: c.border }}>
                <div className="absolute inset-0 rounded-tile pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 70% 60% at 0% 0%, ${c.glow}, transparent)` }} aria-hidden />
                <div className="absolute inset-x-0 top-0 h-px rounded-t-tile pointer-events-none"
                  style={{ background: `linear-gradient(to right, transparent, ${c.icon}55, transparent)` }} aria-hidden />
                <div className="w-11 h-11 rounded-inner flex items-center justify-center shrink-0 relative z-10"
                  style={{ background: `${c.icon}20` }}>
                  <Icon size={22} style={{ color: c.icon }} />
                </div>
                <div className="relative z-10 flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-text-primary">{a.title}</p>
                  <p className="text-[12px] text-text-muted mt-1">{a.description}</p>
                  <p className="text-[11px] mt-1.5 font-mono font-bold" style={{ color: c.icon }}>{a.unlockedAt}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Locked */}
      <section>
        <div className="flex items-center gap-2.5 mb-4">
          <h2 className="text-[11px] font-bold text-text-faint font-mono" style={{ letterSpacing: "0.14em" }}>LOCKED</h2>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded"
            style={{ color: "var(--text-faint)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {locked.length}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {locked.map(a => {
            const Icon = a.icon;
            const pct = Math.round((a.progress / a.goal) * 100);
            return (
              <div key={a.id}
                className="rounded-tile p-5 border flex items-start gap-4"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="w-11 h-11 rounded-inner flex items-center justify-center shrink-0 relative"
                  style={{ background: "rgba(255,255,255,0.05)" }}>
                  <Icon size={20} className="text-text-faint" />
                  <Lock size={9} className="absolute bottom-0.5 right-0.5 text-text-faint/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-text-muted">{a.title}</p>
                  <p className="text-[12px] text-text-faint mt-0.5">{a.desc}</p>
                  <div className="mt-2.5">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[11px] text-text-faint font-mono">{a.progress}/{a.goal}</span>
                      <span className="text-[11px] text-text-faint font-mono">{pct}%</span>
                    </div>
                    <div className="w-full rounded-badge overflow-hidden" style={{ height: 4, background: "rgba(255,255,255,0.07)" }}>
                      <div className="h-full rounded-badge transition-all duration-700"
                        style={{ width: `${pct}%`, background: "rgba(172,199,255,0.30)" }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
