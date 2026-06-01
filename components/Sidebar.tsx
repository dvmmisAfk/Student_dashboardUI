"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Activity,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import LogoMark from "./LogoMark";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "profile", label: "Profile", icon: User },
];

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Tooltip.Provider delayDuration={300}>
      <nav
        aria-label="Primary navigation"
        className={`hidden lg:flex flex-col bg-bg-section border-r border-white/[0.06] transition-[width] duration-300 ease-in-out shrink-0 ${
          collapsed ? "w-16" : "w-60"
        }`}
      >
        {/* Logo */}
        <div
          className={`flex items-center h-12 px-4 border-b border-white/[0.06] ${
            collapsed ? "justify-center" : "gap-3"
          }`}
        >
          <LogoMark />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[15px] font-semibold text-text-primary tracking-tight overflow-hidden whitespace-nowrap"
              >
                LearnFlow
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav items */}
        <div className="flex flex-col gap-1 p-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;

            const button = (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex items-center gap-3 w-full h-11 px-3 rounded-inner text-[14px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-section ${
                  isActive
                    ? "text-text-primary"
                    : "text-text-muted hover:text-text-primary"
                } ${collapsed ? "justify-center" : ""}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-inner bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={20} className="relative z-10 shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="relative z-10 overflow-hidden whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );

            if (collapsed) {
              return (
                <Tooltip.Root key={item.id}>
                  <Tooltip.Trigger asChild>{button}</Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="right"
                      className="bg-bg-card text-text-primary text-[12px] px-2 py-1 rounded-inner shadow-tile border border-white/[0.06] z-50"
                      sideOffset={8}
                    >
                      {item.label}
                      <Tooltip.Arrow className="fill-bg-card" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              );
            }

            return button;
          })}
        </div>

        {/* Bottom: user + collapse toggle */}
        <div className="p-2 border-t border-white/[0.06] flex flex-col gap-1">
          <button
            className={`flex items-center gap-3 h-10 px-3 rounded-inner text-text-muted hover:text-text-primary transition-colors ${
              collapsed ? "justify-center" : ""
            }`}
            aria-label="Settings"
          >
            <Settings size={18} className="shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-[13px] overflow-hidden whitespace-nowrap"
                >
                  Settings
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <div
            className={`flex items-center gap-3 h-10 px-3 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-[11px] font-bold text-white shrink-0">
              AJ
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-[13px] text-text-primary font-medium overflow-hidden whitespace-nowrap"
                >
                  Alex Johnson
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") setCollapsed(!collapsed);
            }}
            className={`flex items-center gap-3 h-10 px-3 rounded-inner text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-section ${
              collapsed ? "justify-center" : ""
            }`}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-[13px] overflow-hidden whitespace-nowrap"
                >
                  Collapse
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>
    </Tooltip.Provider>
  );
}
