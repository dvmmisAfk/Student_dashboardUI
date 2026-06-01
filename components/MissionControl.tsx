"use client";

import { useEffect, useState } from "react";
import { Flame, Clock, Brain } from "lucide-react";
import WeeklyRing from "./WeeklyRing";

interface Props {
  greeting: string;
  date: string;
  user: {
    name: string; streak: number; weeklyGoalPercent: number;
    totalXP: number; hoursThisWeek: number;
    lessonsCompleted: number; focusScore: number;
    level: number; levelTitle: string; rank: string;
  };
}

const particles = [
  { size: 3, l: "8%",  t: "30%", color: "#4F8EF7", dur: "6s",   del: "0s"   },
  { size: 2, l: "85%", t: "20%", color: "#8B5CF6", dur: "9.5s", del: "2.1s" },
  { size: 2, l: "46%", t: "72%", color: "#22D3EE", dur: "7.3s", del: "1.0s" },
  { size: 4, l: "68%", t: "44%", color: "#4F8EF7", dur: "11s",  del: "3.7s" },
  { size: 2, l: "28%", t: "58%", color: "#8B5CF6", dur: "8.1s", del: "0.6s" },
  { size: 1, l: "57%", t: "16%", color: "#22D3EE", dur: "5.6s", del: "4.2s" },
  { size: 2, l: "18%", t: "62%", color: "#acc7ff", dur: "7.8s", del: "1.8s" },
  { size: 1, l: "76%", t: "78%", color: "#4F8EF7", dur: "9s",   del: "5.1s" },
];

const chips = [
  { key: "streak"           as const, suffix: "d",  label: "STREAK",  Icon: Flame,  color: "#F59E0B" },
  { key: "totalXP"          as const, suffix: "",   label: "XP",      icon: "⚡",   color: "#8B5CF6" },
  { key: "hoursThisWeek"    as const, suffix: "h",  label: "LEARNED", Icon: Clock,  color: "#4F8EF7" },
  { key: "lessonsCompleted" as const, suffix: "",   label: "MODULES", Icon: Brain,  color: "#22D3EE" },
] as const;

type ChipKey = typeof chips[number]["key"];

export default function MissionControl({ greeting, user, date }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div
      className="relative rounded-tile overflow-hidden grain"
      style={{
        minHeight: 220,
        background: `
          radial-gradient(ellipse 70% 160% at -10% 50%,  rgba(79,142,247,0.22)  0%, transparent 65%),
          radial-gradient(ellipse 55% 100% at 110% -5%,  rgba(139,92,246,0.18)  0%, transparent 60%),
          radial-gradient(ellipse 50% 60%  at 55%  115%, rgba(34,211,238,0.10)  0%, transparent 65%),
          radial-gradient(ellipse 30% 40%  at 80%  70%,  rgba(172,199,255,0.06) 0%, transparent 60%),
          #1a1b21`,
        boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 12px 48px rgba(0,0,0,0.6)",
        padding: "28px",
      }}
    >
      {/* Floating particles */}
      {particles.map((p, i) => (
        <span key={i} aria-hidden className="absolute rounded-full pointer-events-none"
          style={{ width: p.size, height: p.size, left: p.l, top: p.t,
            background: p.color, opacity: 0.4,
            animation: `particle-drift ${p.dur} ease-in-out infinite`,
            animationDelay: p.del }} />
      ))}

      {/* Scan-line shimmer */}
      <div className="absolute inset-0 overflow-hidden rounded-tile pointer-events-none" aria-hidden>
        <div className="absolute left-0 right-0 h-px opacity-20"
          style={{ background: "linear-gradient(to right, transparent, #acc7ff, transparent)", animation: "scan-line 8s linear infinite" }} />
      </div>

      <div className="relative z-10 flex items-start justify-between gap-6 flex-wrap">
        <div className="flex flex-col gap-5 min-w-0 flex-1">
          {/* Date + OS badge */}
          <div className="flex items-center gap-3 flex-wrap">
            <p className="text-[11px] font-semibold text-text-faint font-mono" style={{ letterSpacing: "0.12em" }}>{date}</p>
            <span className="text-white/20">·</span>
            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded"
              style={{ color: "#acc7ff", background: "rgba(172,199,255,0.10)", border: "1px solid rgba(172,199,255,0.20)", letterSpacing: "0.08em" }}>
              OS v2.4 · LIVE
            </span>
          </div>

          {/* Greeting + name */}
          <div>
            <p className="text-[15px] text-text-secondary mb-1">{greeting},</p>
            <h1 className="font-bold text-text-primary leading-none" style={{ fontSize: 38, letterSpacing: "-0.035em" }}>
              {user.name}
            </h1>
            <div className="flex items-center gap-2.5 mt-2.5 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-[7px] h-[7px] rounded-full bg-accent-green" style={{ animation: "pulse-dot 2.2s ease-in-out infinite" }} aria-hidden />
                <span className="text-[12px] text-accent-green font-bold font-mono">NEURAL SYNC ACTIVE</span>
              </div>
              <span className="text-white/15">·</span>
              <span className="text-[12px] text-text-faint font-mono">Lvl {user.level} · {user.levelTitle}</span>
              <span className="text-white/15">·</span>
              <span className="text-[12px] font-bold font-mono px-2 py-0.5 rounded"
                style={{ color: "#F59E0B", background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.22)" }}>
                RANK: {user.rank}
              </span>
            </div>
          </div>

          {/* Stat chips */}
          <div className="flex items-center gap-2 flex-wrap">
            {chips.map((chip) => {
              const val = user[chip.key as ChipKey];
              const hasIcon = "Icon" in chip;
              return (
                <div key={chip.key}
                  className="flex items-center gap-1.5 rounded-badge px-3 py-1.5"
                  style={{ background: `${chip.color}12`, border: `1px solid ${chip.color}28` }}>
                  {hasIcon
                    ? <chip.Icon size={13} style={{ color: chip.color }} aria-hidden />
                    : <span style={{ color: chip.color, fontSize: 13, lineHeight: 1 }}>{(chip as { icon: string }).icon}</span>
                  }
                  <span className="font-mono text-[14px] font-bold text-text-primary">{val}{chip.suffix}</span>
                  <span className="text-[11px] text-text-muted font-mono">{chip.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly ring + focus score */}
        <div className="flex flex-col items-center gap-3 shrink-0">
          {mounted && <WeeklyRing percent={user.weeklyGoalPercent} />}
          <div className="text-center">
            <p className="font-mono font-bold leading-none" style={{ fontSize: 26, color: "#22D3EE" }}>
              {user.focusScore}
            </p>
            <p className="text-[10px] text-text-faint mt-1 font-mono" style={{ letterSpacing: "0.12em" }}>FOCUS SCORE</p>
          </div>
        </div>
      </div>
    </div>
  );
}
