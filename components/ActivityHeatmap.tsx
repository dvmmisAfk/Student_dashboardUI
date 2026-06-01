"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props { data: number[][] }

const cell   = 12;
const gap    = 3;
const step   = cell + gap;
const dayLw  = 16;
const topH   = 20;
const pad    = 8;

const intensities     = ["var(--heat-0)", "var(--heat-1)", "var(--heat-2)", "var(--heat-3)", "var(--heat-4)"];
const intensityLabels = ["No activity", "Light", "Moderate", "Active", "Peak"];
const daysShort       = ["", "M", "", "W", "", "F", ""];

interface HoveredCell { weekIdx: number; dayIdx: number; x: number; y: number }

function getCellDate(weekIdx: number, dayIdx: number, totalWeeks: number): string {
  const now     = new Date();
  const today   = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const currDay = (today.getDay() + 6) % 7;
  const weeksAgo = totalWeeks - 1 - weekIdx;
  const daysAgo  = weeksAgo * 7 + (currDay - dayIdx);
  const date = new Date(today);
  date.setDate(today.getDate() - daysAgo);
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function getMonthLabel(weekIdx: number, totalWeeks: number): string {
  const now     = new Date();
  const today   = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const currDay = (today.getDay() + 6) % 7;
  const weeksAgo = totalWeeks - 1 - weekIdx;
  const date = new Date(today);
  date.setDate(today.getDate() - weeksAgo * 7 - currDay);
  if (date.getDate() <= 7 || weekIdx === 0)
    return date.toLocaleString("en-US", { month: "short" });
  return "";
}

export default function ActivityHeatmap({ data }: Props) {
  const [hovered, setHovered] = useState<HoveredCell | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const weeks = data.length;

  const svgW = dayLw + pad + weeks * step - gap;
  const svgH = topH + 7 * step - gap;

  return (
    <div
      className="rounded-tile p-5"
      style={{
        background: "#1a1b21",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      <p className="text-[11px] font-bold text-text-faint font-mono mb-4" style={{ letterSpacing: "0.14em" }}>
        CONTRIBUTION MATRIX
      </p>

      <div ref={containerRef} className="relative select-none overflow-x-auto scrollbar-none">
        <svg
          width={svgW}
          height={svgH}
          viewBox={`0 0 ${svgW} ${svgH}`}
          role="img"
          aria-label="Learning activity contribution heatmap"
          className="block"
          style={{ minWidth: svgW }}
        >
          {/* Month labels */}
          {data.map((_, wi) => {
            const label = getMonthLabel(wi, weeks);
            if (!label) return null;
            return (
              <text
                key={`m${wi}`}
                x={dayLw + pad + wi * step + cell / 2}
                y={13}
                textAnchor="middle"
                fill="var(--text-faint)"
                fontSize="10"
                fontFamily="var(--font-geist-mono), monospace"
              >{label}</text>
            );
          })}

          {/* Day labels */}
          {daysShort.map((d, di) =>
            d ? (
              <text
                key={`d${di}`}
                x={dayLw - 2}
                y={topH + di * step + cell / 2 + 3}
                textAnchor="end"
                fill="var(--text-faint)"
                fontSize="10"
                fontFamily="var(--font-geist-mono), monospace"
              >{d}</text>
            ) : null
          )}

          {/* Cells */}
          {data.map((week, wi) =>
            week.map((intensity, di) => (
              <rect
                key={`${wi}-${di}`}
                x={dayLw + pad + wi * step}
                y={topH + di * step}
                width={cell}
                height={cell}
                rx={2.5}
                fill={intensities[intensity] ?? intensities[0]}
                className="cursor-pointer"
                style={{
                  animation: `reveal-cell 0.35s ease forwards`,
                  animationDelay: `${wi * 0.018}s`,
                  opacity: 0,
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as SVGRectElement).style.opacity = "0.75";
                  const rect = (e.currentTarget as SVGRectElement).getBoundingClientRect();
                  const cont = containerRef.current?.getBoundingClientRect();
                  if (!cont) return;
                  setHovered({
                    weekIdx: wi, dayIdx: di,
                    x: rect.left - cont.left + cell / 2,
                    y: rect.top  - cont.top  - 8,
                  });
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as SVGRectElement).style.opacity = "1";
                  setHovered(null);
                }}
                aria-label={`${getCellDate(wi, di, weeks)}: ${intensityLabels[intensity]}`}
              />
            ))
          )}
        </svg>

        <AnimatePresence>
          {hovered && (
            <motion.div
              key="tooltip"
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.12 }}
              className="absolute z-20 pointer-events-none"
              style={{ left: hovered.x, top: hovered.y, transform: "translate(-50%, -100%)" }}
            >
              <div className="border rounded-inner px-2.5 py-1.5 shadow-tile whitespace-nowrap"
                style={{ background: "#282a2f", borderColor: "rgba(255,255,255,0.12)" }}>
                <p className="text-[12px] font-semibold text-text-primary">
                  {getCellDate(hovered.weekIdx, hovered.dayIdx, weeks)}
                </p>
                <p className="text-[11px] text-text-muted mt-0.5"
                  style={{ color: data[hovered.weekIdx][hovered.dayIdx] === 0 ? "var(--text-faint)" : "var(--accent-blue)" }}>
                  {intensityLabels[data[hovered.weekIdx][hovered.dayIdx]]}
                </p>
              </div>
              <div className="w-2 h-2 border-b border-r border-white/[0.12] rotate-45 mx-auto -mt-[5px]"
                style={{ background: "#282a2f" }} aria-hidden />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4" aria-hidden>
        <span className="text-[11px] text-text-faint font-mono">Less</span>
        {intensities.map((c, i) => (
          <div key={i} style={{ width: cell, height: cell, borderRadius: 2.5, background: c, flexShrink: 0 }} />
        ))}
        <span className="text-[11px] text-text-faint font-mono">More</span>
      </div>
    </div>
  );
}
