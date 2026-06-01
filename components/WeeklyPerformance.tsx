"use client";

import { TrendingUp } from "lucide-react";

interface Props {
  days: string[];
  minutes: number[];
  consistencyScore: number;
}

const barW   = 20;
const barGap = 6;
const maxH   = 64;

export default function WeeklyPerformance({ days, minutes, consistencyScore }: Props) {
  const peak = Math.max(...minutes);
  const svgW = days.length * (barW + barGap) - barGap;
  const svgH = maxH + 24;

  return (
    <div
      className="rounded-tile p-5"
      style={{
        background: "#1a1b21",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-accent-green" aria-hidden />
          <p className="text-[11px] font-bold text-text-faint font-mono" style={{ letterSpacing: "0.14em" }}>
            WEEKLY PERFORMANCE
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[15px] font-bold text-accent-green">{consistencyScore}%</span>
          <span className="text-[12px] text-text-faint">consistency</span>
        </div>
      </div>

      {/* Bar chart */}
      <svg
        width="100%"
        height={svgH}
        viewBox={`0 0 ${svgW} ${svgH}`}
        role="img"
        aria-label="Weekly learning activity bar chart"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#10B981" stopOpacity="1"   />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="bar-dim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#424753" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#424753" stopOpacity="0.3" />
          </linearGradient>
          <filter id="bar-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {minutes.map((m, i) => {
          const h     = Math.max((m / peak) * maxH, 5);
          const x     = i * (barW + barGap);
          const isMax = m === peak;

          return (
            <g key={i}>
              {/* Glow beneath peak bar */}
              {isMax && (
                <rect x={x} y={maxH - h} width={barW} height={h} rx={4}
                  fill="#10B981" opacity={0.15} filter="url(#bar-glow)" />
              )}
              <rect
                x={x} y={maxH - h} width={barW} height={h} rx={4}
                fill={isMax ? "url(#bar-grad)" : "url(#bar-dim)"}
                style={{
                  animation: `reveal-cell 0.4s ease forwards`,
                  animationDelay: `${i * 0.06}s`,
                  opacity: 0,
                }}
              />
              <text
                x={x + barW / 2} y={svgH - 4}
                textAnchor="middle"
                fill={isMax ? "#8c909e" : "#424753"}
                fontSize="11"
                fontWeight={isMax ? "700" : "500"}
                fontFamily="var(--font-geist-mono), monospace"
              >
                {days[i]}
              </text>
              {/* Minute label on peak bar */}
              {isMax && (
                <text
                  x={x + barW / 2} y={maxH - h - 5}
                  textAnchor="middle"
                  fill="#10B981"
                  fontSize="10"
                  fontWeight="700"
                  fontFamily="var(--font-geist-mono), monospace"
                >
                  {m}m
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <p className="text-[12px] text-text-faint mt-3 font-mono">
        Peak: <span className="text-text-muted font-semibold">{peak} min</span>
        <span className="text-text-faint/60 mx-2">·</span>
        <span className="text-text-faint">Avg: <span className="text-text-muted font-semibold">{Math.round(minutes.reduce((a, b) => a + b, 0) / minutes.length)} min</span></span>
      </p>
    </div>
  );
}
