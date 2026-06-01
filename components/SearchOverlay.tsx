"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, Activity, LayoutDashboard, Trophy, X, ArrowRight } from "lucide-react";
import { Course } from "@/types/course";

type View = "dashboard" | "courses" | "activity" | "achievements";

interface Props {
  courses: Course[];
  onClose: () => void;
  onNavigate: (v: View) => void;
  onCourseSelect: (c: Course) => void;
}

export default function SearchOverlay({ courses, onClose, onNavigate, onCourseSelect }: Props) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCourses = query
    ? courses.filter(c => c.title.toLowerCase().includes(query.toLowerCase()))
    : courses.slice(0, 3);

  const quickActions = [
    { label: "Dashboard", icon: LayoutDashboard, action: () => { onNavigate("dashboard"); onClose(); } },
    { label: "All Courses", icon: BookOpen, action: () => { onNavigate("courses"); onClose(); } },
    { label: "Activity", icon: Activity, action: () => { onNavigate("activity"); onClose(); } },
    { label: "Achievements", icon: Trophy, action: () => { onNavigate("achievements"); onClose(); } },
  ];

  const allResults = [
    ...filteredCourses.map(c => ({ type: "course" as const, label: c.title, sub: `${c.progress}% complete`, action: () => { onCourseSelect(c); onClose(); } })),
    ...(query ? [] : quickActions.map(a => ({ type: "action" as const, label: a.label, sub: "Navigate", action: a.action, Icon: a.icon }))),
  ];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setFocused(0);
  }, [query]);

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setFocused(f => Math.min(f + 1, allResults.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setFocused(f => Math.max(f - 1, 0)); }
    if (e.key === "Enter" && allResults[focused]) { allResults[focused].action(); }
    if (e.key === "Escape") onClose();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-[18vh]"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="w-full max-w-xl mx-4 rounded-tile overflow-hidden"
        style={{ background: "#1A1F2E", boxShadow: "0 0 0 1px rgba(255,255,255,0.10), 0 24px 60px rgba(0,0,0,0.7)" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <Search size={16} className="text-text-muted shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search courses, navigate..."
            className="flex-1 h-14 bg-transparent text-[14px] text-text-primary placeholder:text-text-faint outline-none"
          />
          <button onClick={onClose} className="p-1 rounded hover:bg-white/[0.06] transition-colors">
            <X size={14} className="text-text-faint" />
          </button>
        </div>

        {allResults.length > 0 && (
          <div className="py-2 max-h-72 overflow-y-auto scrollbar-thin">
            {!query && <p className="px-4 pt-1 pb-2 text-[10px] text-text-faint uppercase tracking-widest" style={{ letterSpacing: "0.1em" }}>Suggestions</p>}
            {allResults.map((r, i) => (
              <button
                key={i}
                onClick={r.action}
                onMouseEnter={() => setFocused(i)}
                className="w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left"
                style={{ background: focused === i ? "rgba(79,142,247,0.08)" : "transparent" }}
              >
                <div className="w-7 h-7 rounded-inner flex items-center justify-center shrink-0"
                  style={{ background: focused === i ? "rgba(79,142,247,0.15)" : "rgba(255,255,255,0.05)" }}>
                  {r.type === "action" && "Icon" in r
                    ? <r.Icon size={14} style={{ color: focused === i ? "#4F8EF7" : "#94A3B8" }} />
                    : <BookOpen size={14} style={{ color: focused === i ? "#4F8EF7" : "#94A3B8" }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium truncate" style={{ color: focused === i ? "#E2E8F0" : "#CBD5E1" }}>{r.label}</p>
                  <p className="text-[11px] text-text-faint">{r.sub}</p>
                </div>
                <ArrowRight size={13} className="text-text-faint shrink-0" style={{ opacity: focused === i ? 1 : 0 }} />
              </button>
            ))}
          </div>
        )}

        <div className="px-4 py-2.5 border-t flex items-center gap-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <span className="text-[11px] text-text-faint"><kbd className="font-mono">↑↓</kbd> navigate</span>
          <span className="text-[11px] text-text-faint"><kbd className="font-mono">↵</kbd> select</span>
          <span className="text-[11px] text-text-faint"><kbd className="font-mono">esc</kbd> close</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
