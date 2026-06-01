"use client";

import { motion } from "framer-motion";
import { X, CheckCircle2, Circle, PlayCircle, Clock, Zap } from "lucide-react";
import { Course } from "@/types/course";
import { getIcon } from "@/lib/icon-map";

const scheme = {
  blue:   { accent: "#4F8EF7", bg: "rgba(79,142,247,0.12)" },
  purple: { accent: "#8B5CF6", bg: "rgba(139,92,246,0.12)" },
  cyan:   { accent: "#22D3EE", bg: "rgba(34,211,238,0.10)" },
  green:  { accent: "#10B981", bg: "rgba(16,185,129,0.10)" },
};

const mockLessons = [
  { id: 1, title: "Introduction & Setup",      duration: "12 min", xp: 30,  done: true  },
  { id: 2, title: "Core Concepts",             duration: "18 min", xp: 45,  done: true  },
  { id: 3, title: "Advanced Patterns",         duration: "24 min", xp: 60,  done: false, active: true },
  { id: 4, title: "Real-World Examples",       duration: "20 min", xp: 50,  done: false },
  { id: 5, title: "Final Project",             duration: "35 min", xp: 120, done: false },
];

interface Props {
  course: Course;
  onClose: () => void;
}

export default function CourseModal({ course, onClose }: Props) {
  const s = scheme[course.color_scheme];
  const Icon = getIcon(course.icon_name);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}
      onClick={onClose}
    >
      <motion.aside
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="h-full w-full max-w-sm overflow-y-auto scrollbar-thin"
        style={{ background: "#141824", boxShadow: "-4px 0 40px rgba(0,0,0,0.5)" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <button onClick={onClose} className="mb-4 p-1 -ml-1 rounded text-text-faint hover:text-text-muted transition-colors">
            <X size={18} />
          </button>

          <div className="flex items-start gap-3 mb-5">
            <div className="w-12 h-12 rounded-inner flex items-center justify-center shrink-0" style={{ background: s.bg }}>
              <Icon size={24} style={{ color: s.accent }} />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-text-primary leading-snug" style={{ letterSpacing: "-0.01em" }}>{course.title}</h2>
              <p className="text-[12px] text-text-muted mt-0.5">5 lessons · ~1.8 hours</p>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[12px] text-text-muted">Progress</span>
              <span className="font-mono text-[12px] font-semibold" style={{ color: s.accent }}>{course.progress}%</span>
            </div>
            <div className="w-full rounded-badge overflow-hidden" style={{ height: 6, background: "rgba(255,255,255,0.07)" }}>
              <div className="h-full rounded-badge transition-all duration-700" style={{ width: `${course.progress}%`, background: s.accent }} />
            </div>
          </div>

          <button
            className="w-full py-3 rounded-inner font-semibold text-[14px] transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
            style={{ background: s.accent, color: "#fff" }}
          >
            <PlayCircle size={16} />
            Continue Learning
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-[11px] font-semibold text-text-faint uppercase tracking-widest mb-4" style={{ letterSpacing: "0.1em" }}>Lessons</h3>
          <div className="flex flex-col gap-2">
            {mockLessons.map(lesson => (
              <div
                key={lesson.id}
                className="flex items-center gap-3 p-3 rounded-inner border transition-colors cursor-pointer"
                style={{
                  background: "active" in lesson && lesson.active ? `${s.bg}` : "rgba(255,255,255,0.02)",
                  borderColor: "active" in lesson && lesson.active ? s.accent + "40" : "rgba(255,255,255,0.06)",
                }}
              >
                {lesson.done
                  ? <CheckCircle2 size={16} style={{ color: s.accent }} />
                  : "active" in lesson && lesson.active
                    ? <PlayCircle size={16} style={{ color: s.accent }} />
                    : <Circle size={16} className="text-text-faint" />}

                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium truncate" style={{ color: lesson.done ? "#94A3B8" : "#E2E8F0", textDecoration: lesson.done ? "line-through" : "none" }}>
                    {lesson.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock size={10} className="text-text-faint" />
                    <span className="text-[10px] text-text-faint">{lesson.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Zap size={10} className="text-warn" />
                  <span className="font-mono text-[10px] text-warn">{lesson.xp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.aside>
    </motion.div>
  );
}
