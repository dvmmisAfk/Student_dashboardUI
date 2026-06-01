"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Course } from "@/types/course";
import CourseCardV2 from "./CourseCardV2";

const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const card = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 280, damping: 26, mass: 0.9 } },
};

interface Props {
  courses: Course[];
  onContinue: (c: Course) => void;
  onViewAll?: () => void;
}

export default function CourseGrid({ courses, onContinue, onViewAll }: Props) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section aria-labelledby="trajectories-heading">
      <header className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 id="trajectories-heading"
            className="text-[11px] font-bold text-text-muted font-mono"
            style={{ letterSpacing: "0.12em" }}>
            ACTIVE TRAJECTORIES
          </h2>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded font-bold"
            style={{ color: "#4F8EF7", background: "rgba(79,142,247,0.10)", border: "1px solid rgba(79,142,247,0.20)" }}>
            {courses.length}
          </span>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-[11px] font-mono font-semibold transition-opacity"
            style={{ color: "var(--accent-blue)" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            VIEW ALL →
          </button>
        )}
      </header>

      <motion.div
        variants={prefersReducedMotion ? {} : container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {courses.map((course) => (
          <motion.div key={course.id} variants={prefersReducedMotion ? {} : card}>
            <CourseCardV2 course={course} onContinue={onContinue} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
