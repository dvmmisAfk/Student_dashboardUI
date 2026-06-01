"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, BarChart2, Trophy } from "lucide-react";
import { View } from "@/types/view";

const items = [
  { id: "dashboard"    as View, label: "Home",       icon: LayoutDashboard },
  { id: "courses"      as View, label: "Curriculum", icon: BookOpen        },
  { id: "activity"     as View, label: "Analytics",  icon: BarChart2       },
  { id: "achievements" as View, label: "Wins",       icon: Trophy          },
];

interface Props {
  view: View;
  onNavigate: (v: View) => void;
}

export default function BottomNav({ view, onNavigate }: Props) {
  return (
    <nav
      aria-label="Primary navigation"
      className="md:hidden shrink-0 flex items-center border-t"
      style={{
        height: 56,
        background: "rgba(17,19,24,0.92)",
        borderColor: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {items.map(({ id, label, icon: Icon }) => {
        const active = view === id;
        return (
          <button key={id} onClick={() => onNavigate(id)} aria-current={active ? "page" : undefined}
            className="relative flex-1 flex flex-col items-center justify-center gap-1 min-h-[44px] min-w-[44px]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/60 rounded-inner">
            {active && (
              <motion.span layoutId="bottom-pill" className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-badge"
                style={{ width: 24, height: 2, background: "var(--accent-blue)" }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }} />
            )}
            <Icon size={19} strokeWidth={active ? 2.2 : 1.6}
              style={{ color: active ? "var(--accent-blue)" : "var(--text-muted)" }} />
            <span className="text-[10px] font-semibold font-mono"
              style={{ color: active ? "var(--accent-blue)" : "var(--text-muted)", letterSpacing: "0.05em" }}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
