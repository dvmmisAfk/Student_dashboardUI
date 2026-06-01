"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Course } from "@/types/course";
import CourseCardV2 from "../CourseCardV2";

interface Props {
  courses: Course[];
  onContinue: (c: Course) => void;
}

type Filter = "all" | "progress" | "done";

export default function CoursesView({ courses, onContinue }: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = courses.filter(c => {
    if (filter === "progress") return c.progress > 0 && c.progress < 100;
    if (filter === "done") return c.progress === 100;
    return true;
  });

  const tabs: { key: Filter; label: string; count: number }[] = [
    { key: "all",      label: "All",         count: courses.length },
    { key: "progress", label: "In Progress",  count: courses.filter(c => c.progress > 0 && c.progress < 100).length },
    { key: "done",     label: "Completed",    count: courses.filter(c => c.progress === 100).length },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-5 gap-4 flex-wrap">
        <div>
          <p className="text-[10px] font-bold text-text-faint font-mono mb-1" style={{ letterSpacing: "0.14em" }}>LEARNING OS</p>
          <h1 className="text-[26px] font-bold text-text-primary" style={{ letterSpacing: "-0.025em" }}>Curriculum</h1>
        </div>
        <button
          className="px-3.5 py-2 rounded-inner text-[12px] font-bold text-white font-mono transition-all"
          style={{ background: "#4F8EF7", boxShadow: "0 0 0 1px rgba(79,142,247,0.4), 0 4px 16px rgba(79,142,247,0.25)" }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1.018)"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
        >
          + NEW TRAJECTORY
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 mb-5 p-1 rounded-inner w-fit"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className="relative px-3 py-1.5 rounded text-[11px] font-bold font-mono transition-colors"
            style={{ color: filter === t.key ? "var(--text-primary)" : "var(--text-muted)", letterSpacing: "0.04em" }}
          >
            {filter === t.key && (
              <motion.span layoutId="filter-pill" className="absolute inset-0 rounded"
                style={{ background: "rgba(79,142,247,0.12)", border: "1px solid rgba(79,142,247,0.22)" }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }} />
            )}
            <span className="relative z-10">{t.label.toUpperCase()}</span>
            <span className="relative z-10 ml-1.5 font-mono text-[10px]"
              style={{ color: filter === t.key ? "var(--accent-blue)" : "var(--text-faint)" }}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-text-faint">
          <p className="text-[14px] font-mono" style={{ letterSpacing: "0.06em" }}>NO TRAJECTORIES FOUND</p>
          <p className="text-[12px] mt-2 text-text-faint/70">Enroll in a course to begin your learning path</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((course, i) => (
            <motion.div key={course.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 28 }}>
              <CourseCardV2 course={course} onContinue={onContinue} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
