"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Course, ColorScheme } from "@/types/course";
import { getIcon } from "@/lib/icon-map";

const scheme: Record<ColorScheme, { accent: string; glow: string; iconBg: string; barBg: string; border: string }> = {
  blue:   { accent: "#4F8EF7", glow: "rgba(79,142,247,0.14)",  iconBg: "rgba(79,142,247,0.12)",  barBg: "rgba(79,142,247,0.18)",  border: "rgba(79,142,247,0.32)"  },
  purple: { accent: "#8B5CF6", glow: "rgba(139,92,246,0.14)",  iconBg: "rgba(139,92,246,0.12)",  barBg: "rgba(139,92,246,0.18)",  border: "rgba(139,92,246,0.32)"  },
  cyan:   { accent: "#22D3EE", glow: "rgba(34,211,238,0.12)",  iconBg: "rgba(34,211,238,0.10)",  barBg: "rgba(34,211,238,0.16)",  border: "rgba(34,211,238,0.28)"  },
  green:  { accent: "#10B981", glow: "rgba(16,185,129,0.12)",  iconBg: "rgba(16,185,129,0.10)",  barBg: "rgba(16,185,129,0.16)",  border: "rgba(16,185,129,0.28)"  },
};

const moduleLabels: Record<ColorScheme, string> = {
  blue:   "DEEP LEARNING",
  purple: "SYSTEMS",
  cyan:   "DISTRIBUTED",
  green:  "QUANTUM",
};

function getMomentum(id: string, progress: number): number[] {
  const h = id.split("").reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0);
  return [
    (Math.abs(h % 60) + 25) / 100,
    (Math.abs((h >> 4) % 65) + 30) / 100,
    (Math.abs((h >> 8) % 70) + 30) / 100,
    progress > 60 ? 0.85 : 0.46,
  ];
}

interface Props {
  course: Course;
  onContinue: (c: Course) => void;
}

export default function CourseCardV2({ course, onContinue }: Props) {
  const cardRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "0px 0px -40px 0px" });
  const prefersReducedMotion = useReducedMotion();

  const s    = scheme[course.color_scheme];
  const Icon = getIcon(course.icon_name);
  const bars = getMomentum(course.id, course.progress);
  const moduleLabel = moduleLabels[course.color_scheme];

  const estHoursLeft = Math.ceil(((100 - course.progress) / 100) * 10);
  const lastUpdated  = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" })
    .format(new Date(course.created_at));

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (prefersReducedMotion || !glowRef.current || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    glowRef.current.style.background =
      `radial-gradient(circle 240px at ${e.clientX - r.left}px ${e.clientY - r.top}px, ${s.glow}, transparent 70%)`;
  }

  function onMouseLeave() {
    if (!glowRef.current) return;
    glowRef.current.style.background = "";
  }

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={() => onContinue(course)}
      whileHover={prefersReducedMotion ? {} : {
        scale: 1.018, y: -2,
        boxShadow: `0 0 0 1.5px ${s.border}, 0 24px 48px rgba(0,0,0,0.55), 0 0 80px ${s.glow}`,
        transition: { type: "spring", stiffness: 400, damping: 30 },
      }}
      className="group relative rounded-tile flex flex-col overflow-hidden cursor-pointer"
      style={{
        willChange: "transform",
        background: "#1a1b21",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 4px 24px rgba(0,0,0,0.4)",
        padding: "22px",
      }}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onContinue(course)}
      aria-label={`${course.title}, ${course.progress}% complete`}
    >
      {/* Cursor glow */}
      <div ref={glowRef} className="absolute inset-0 rounded-tile pointer-events-none transition-opacity duration-300" aria-hidden />

      {/* Accent left-edge stripe */}
      <div className="absolute left-0 inset-y-4 w-[2px] rounded-r-sm pointer-events-none"
        style={{ background: `linear-gradient(to bottom, ${s.accent}, ${s.accent}00)` }} aria-hidden />

      {/* Top-lit border */}
      <div className="absolute inset-x-0 top-0 h-px rounded-t-tile pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${s.accent}45, transparent)` }} aria-hidden />

      {/* Noise grain */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.018]" aria-hidden>
        <filter id={`grain-${course.id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${course.id})`} />
      </svg>

      {/* Module label row */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold font-mono" style={{ color: `${s.accent}99`, letterSpacing: "0.14em" }}>
          MODULE · {moduleLabel}
        </span>
        <span className="text-[11px] font-mono text-text-faint">{lastUpdated}</span>
      </div>

      {/* Icon + title */}
      <div className="relative z-10 flex items-start gap-3.5 mb-5">
        <div className="w-11 h-11 rounded-inner flex items-center justify-center shrink-0" style={{ background: s.iconBg }} aria-hidden>
          <Icon size={22} style={{ color: s.accent }} strokeWidth={1.8} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-[15px] font-semibold text-text-primary leading-snug line-clamp-2" style={{ letterSpacing: "-0.01em" }}>
            {course.title}
          </h2>
          <p className="text-[12px] text-text-faint mt-1 font-mono">~{estHoursLeft}h remaining</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 mb-5">
        <div className="w-full rounded-badge overflow-hidden"
          style={{ height: 6, background: s.barBg }}
          role="progressbar" aria-valuenow={course.progress} aria-valuemin={0} aria-valuemax={100}
          aria-label={`${course.progress}% complete`}
        >
          <motion.div className="h-full rounded-badge"
            style={{ background: `linear-gradient(to right, ${s.accent}bb, ${s.accent})` }}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${course.progress}%` } : { width: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-end justify-between mt-auto">
        <div>
          <p className="font-mono font-bold leading-none" style={{ fontSize: 18, color: s.accent }}>
            {course.progress}%
          </p>
          <p className="text-[11px] text-text-faint mt-0.5 font-mono">TRAJECTORY</p>
        </div>

        {/* Momentum bars */}
        <div className="flex items-end gap-[3px]" aria-hidden>
          {bars.map((h, i) => (
            <div key={i} className="w-[6px] rounded-sm transition-all duration-300"
              style={{ height: Math.round(h * 26), background: i === bars.length - 1 ? s.accent : `${s.accent}50` }} />
          ))}
        </div>

        {/* Resume CTA */}
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: s.accent }} aria-hidden>
          <span className="text-[13px] font-semibold">Resume</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </motion.article>
  );
}
