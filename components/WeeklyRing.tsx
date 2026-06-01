"use client";

import { useEffect, useState } from "react";

interface WeeklyRingProps {
  percent: number;
}

const RADIUS = 38;
const STROKE = 5.5;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SIZE = RADIUS * 2 + STROKE * 2;

export default function WeeklyRing({ percent }: WeeklyRingProps) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setAnimated(percent));
    return () => cancelAnimationFrame(raf);
  }, [percent]);

  const offset = CIRCUMFERENCE - (animated / 100) * CIRCUMFERENCE;

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      aria-label={`${percent}% of weekly goal complete`}
      role="img"
    >
      <defs>
        <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#acc7ff" />
          <stop offset="50%"  stopColor="#4F8EF7" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
        <filter id="ring-glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Track */}
      <circle
        cx={RADIUS + STROKE}
        cy={RADIUS + STROKE}
        r={RADIUS}
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth={STROKE}
      />

      {/* Glow layer */}
      <circle
        cx={RADIUS + STROKE}
        cy={RADIUS + STROKE}
        r={RADIUS}
        fill="none"
        stroke="url(#ring-grad)"
        strokeWidth={STROKE + 2}
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${RADIUS + STROKE} ${RADIUS + STROKE})`}
        opacity={0.3}
        filter="url(#ring-glow)"
        style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1)" }}
      />

      {/* Progress arc */}
      <circle
        cx={RADIUS + STROKE}
        cy={RADIUS + STROKE}
        r={RADIUS}
        fill="none"
        stroke="url(#ring-grad)"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${RADIUS + STROKE} ${RADIUS + STROKE})`}
        style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1)" }}
      />

      {/* Label */}
      <text
        x={RADIUS + STROKE}
        y={RADIUS + STROKE + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#e2e2e9"
        fontSize="15"
        fontWeight="700"
        fontFamily="var(--font-geist-mono), monospace"
        letterSpacing="-1"
      >
        {percent}%
      </text>
      <text
        x={RADIUS + STROKE}
        y={RADIUS + STROKE + 16}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#424753"
        fontSize="8"
        fontWeight="600"
        fontFamily="var(--font-geist-mono), monospace"
        letterSpacing="1"
      >
        WEEKLY
      </text>
    </svg>
  );
}
