"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, BookOpen, BarChart2, Trophy, Settings, ChevronLeft, ChevronRight, Search, Timer, StickyNote } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import LogoMark from "./LogoMark";
import { View } from "./DashboardShell";
import { mockUser } from "@/lib/mock-data";

interface Props {
  view: View;
  onNavigate: (v: View) => void;
  onSearch: () => void;
  onTimer: () => void;
}

const navItems = [
  { id: "dashboard"    as View, label: "Dashboard",    icon: LayoutDashboard },
  { id: "courses"      as View, label: "Curriculum",   icon: BookOpen        },
  { id: "activity"     as View, label: "Analytics",    icon: BarChart2       },
  { id: "achievements" as View, label: "Achievements", icon: Trophy          },
];

function NavBtn({ label, icon: Icon, active, collapsed, onClick }: {
  label: string; icon: typeof LayoutDashboard;
  active: boolean; collapsed: boolean; onClick: () => void;
}) {
  const btn = (
    <button
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`relative flex items-center gap-2.5 w-full h-10 px-2.5 rounded-inner text-[13px] font-medium
        transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/60
        ${collapsed ? "justify-center" : ""}
        ${active ? "text-text-primary" : "text-text-muted hover:text-text-secondary"}`}
    >
      {active && (
        <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-inner"
          style={{ background: "rgba(79,142,247,0.08)", boxShadow: "inset 0 0 0 1px rgba(79,142,247,0.18)" }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }} />
      )}
      <motion.span className="relative z-10 flex items-center justify-center shrink-0"
        whileHover={{ x: collapsed ? 0 : 1.5, transition: { type: "spring", stiffness: 500, damping: 22 } }}>
        <Icon size={17} strokeWidth={active ? 2.2 : 1.7}
          style={{ color: active ? "var(--accent-blue)" : undefined }} />
      </motion.span>
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.span key="l" initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }} transition={{ duration: 0.14 }}
            className="relative z-10 whitespace-nowrap overflow-hidden">
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );

  if (!collapsed) return btn;

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{btn}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content side="right" sideOffset={10}
          className="z-50 bg-surface-high text-text-primary text-[12px] font-medium px-2.5 py-1.5 rounded-inner border border-white/[0.09] shadow-tile">
          {label}
          <Tooltip.Arrow className="fill-surface-high" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

export default function LeftRail({ view, onNavigate, onSearch, onTimer }: Props) {
  // Auto-collapse on tablet (< 1024px), expand on desktop
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023px)");
    // Set initial state
    if (mql.matches) setCollapsed(true);
    // Respond to resize
    const handler = (e: MediaQueryListEvent) => {
      setCollapsed(e.matches);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const quickActions = [
    { label: "Search",      icon: Search,    hint: "⌘K", action: onSearch },
    { label: "Focus Timer", icon: Timer,     hint: "",   action: onTimer  },
    { label: "Notes",       icon: StickyNote,hint: "",   action: () => {} },
  ];

  return (
    <Tooltip.Provider delayDuration={400}>
      <nav
        aria-label="Primary navigation"
        className={`hidden md:flex flex-col shrink-0 glass-rail border-r border-white/[0.05]
          transition-[width] duration-300 ease-in-out overflow-hidden relative
          ${collapsed ? "w-16" : "w-[220px]"}`}
      >
        {/* Top-lit gradient border */}
        <div className="absolute inset-y-0 right-0 w-px pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 60%, transparent 100%)" }}
          aria-hidden />

        {/* Brand header */}
        <div className={`flex items-center h-14 px-3 border-b border-white/[0.05] shrink-0 ${collapsed ? "justify-center" : "gap-2.5"}`}>
          <LogoMark />
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.17 }} className="overflow-hidden min-w-0">
                <p className="text-[14px] font-bold text-text-primary tracking-tight whitespace-nowrap leading-none">LearnFlow</p>
                <p className="text-[9px] text-text-faint mt-0.5 whitespace-nowrap font-mono" style={{ letterSpacing: "0.12em" }}>AI OS · NEXUS CORE</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav items */}
        <div className="flex flex-col flex-1 p-2 gap-0.5 overflow-y-auto scrollbar-none">
          {!collapsed && (
            <p className="text-[9px] text-text-faint font-semibold px-2.5 pt-2 pb-1.5 font-mono" style={{ letterSpacing: "0.14em" }}>NAVIGATION</p>
          )}
          {navItems.map(item => (
            <NavBtn key={item.id} {...item} active={view === item.id} collapsed={collapsed} onClick={() => onNavigate(item.id)} />
          ))}

          <div className="my-2 border-t border-white/[0.05]" />

          {!collapsed && (
            <p className="text-[9px] text-text-faint font-semibold px-2.5 pb-1.5 font-mono" style={{ letterSpacing: "0.14em" }}>QUICK ACCESS</p>
          )}
          {quickActions.map(qa => {
            const Icon = qa.icon;
            const btn = (
              <button key={qa.label} onClick={qa.action}
                className={`flex items-center gap-2.5 w-full h-9 px-2.5 rounded-inner text-[12px] font-medium
                  text-text-faint hover:text-text-muted transition-colors
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/50
                  ${collapsed ? "justify-center" : ""}`}>
                <Icon size={15} strokeWidth={1.6} className="shrink-0" />
                <AnimatePresence initial={false}>
                  {!collapsed && (
                    <motion.span key="ql" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.12 }}
                      className="flex-1 flex items-center justify-between whitespace-nowrap overflow-hidden">
                      {qa.label}
                      {qa.hint && (
                        <span className="font-mono text-[10px] text-text-faint/60 bg-white/[0.04] border border-white/[0.06] rounded px-1">{qa.hint}</span>
                      )}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );

            if (!collapsed) return btn;
            return (
              <Tooltip.Root key={qa.label}>
                <Tooltip.Trigger asChild>{btn}</Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content side="right" sideOffset={10}
                    className="z-50 bg-surface-high text-text-primary text-[12px] font-medium px-2.5 py-1.5 rounded-inner border border-white/[0.09] shadow-tile">
                    {qa.label}
                    <Tooltip.Arrow className="fill-surface-high" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            );
          })}
        </div>

        {/* Footer */}
        <div className="shrink-0 p-2 border-t border-white/[0.05] flex flex-col gap-0.5">
          <button className={`flex items-center gap-2.5 w-full h-9 px-2.5 rounded-inner text-text-faint
            hover:text-text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/50
            ${collapsed ? "justify-center" : ""}`}>
            <Settings size={15} strokeWidth={1.6} className="shrink-0" />
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}
                  className="text-[12px] whitespace-nowrap overflow-hidden">Preferences</motion.span>
              )}
            </AnimatePresence>
          </button>

          <div className={`flex items-center gap-2.5 h-11 px-2.5 rounded-inner ${collapsed ? "justify-center" : ""}`}
            style={{ background: "rgba(172,199,255,0.04)", border: "1px solid rgba(172,199,255,0.08)" }}>
            <div className="w-7 h-7 rounded-badge bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-[10px] font-bold text-white shrink-0">
              {mockUser.avatarInitials}
            </div>
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }} className="overflow-hidden min-w-0">
                  <p className="text-[12px] font-semibold text-text-primary whitespace-nowrap leading-none">Alex Johnson</p>
                  <p className="text-[10px] text-text-faint mt-0.5 whitespace-nowrap font-mono">Lvl {mockUser.level} · {mockUser.rank}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Only show expand/collapse button on desktop */}
          <button
            onClick={() => setCollapsed(c => !c)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`hidden lg:flex items-center gap-2.5 w-full h-8 px-2.5 rounded-inner text-text-faint
              hover:text-text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/50
              ${collapsed ? "justify-center" : ""}`}
          >
            {collapsed ? <ChevronRight size={14} strokeWidth={1.8} /> : <ChevronLeft size={14} strokeWidth={1.8} />}
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}
                  className="text-[11px] whitespace-nowrap overflow-hidden">Collapse</motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>
    </Tooltip.Provider>
  );
}
