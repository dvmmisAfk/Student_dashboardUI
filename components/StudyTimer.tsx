"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, X, Coffee } from "lucide-react";

interface Props {
  onClose: () => void;
}

export default function StudyTimer({ onClose }: Props) {
  const [running, setRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [seconds, setSeconds] = useState(25 * 60);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          setRunning(false);
          if (!isBreak) setSessions(n => n + 1);
          setIsBreak(b => !b);
          return isBreak ? 25 * 60 : 5 * 60;
        }
        return s - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, isBreak]);

  function reset() {
    setRunning(false);
    setIsBreak(false);
    setSeconds(25 * 60);
  }

  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  const total = isBreak ? 5 * 60 : 25 * 60;
  const progress = (seconds / total) * 100;
  const circumference = 2 * Math.PI * 36;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="fixed bottom-5 right-5 z-50 rounded-tile overflow-hidden"
      style={{
        width: 220,
        background: "#1A1F2E",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.10), 0 20px 48px rgba(0,0,0,0.6)",
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="flex items-center gap-2">
          {isBreak ? <Coffee size={14} className="text-warn" /> : <div className="w-2 h-2 rounded-full bg-accent-green" style={{ animation: running ? "pulse-dot 2s infinite" : "none" }} />}
          <span className="text-[12px] font-semibold text-text-primary">{isBreak ? "Break" : "Focus"}</span>
        </div>
        <button onClick={onClose} className="text-text-faint hover:text-text-muted transition-colors p-0.5">
          <X size={13} />
        </button>
      </div>

      <div className="flex flex-col items-center py-5 gap-4">
        <div className="relative" style={{ width: 88, height: 88 }}>
          <svg width="88" height="88" viewBox="0 0 88 88" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="44" cy="44" r="36" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
            <circle
              cx="44" cy="44" r="36" fill="none"
              stroke={isBreak ? "#F59E0B" : "#4F8EF7"}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (progress / 100) * circumference}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono font-bold text-text-primary" style={{ fontSize: 20, letterSpacing: "-0.02em" }}>{mins}:{secs}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setRunning(r => !r)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-inner text-[12px] font-semibold transition-colors"
            style={{ background: running ? "rgba(79,142,247,0.15)" : "#4F8EF7", color: running ? "#4F8EF7" : "#fff" }}
          >
            {running ? <Pause size={13} /> : <Play size={13} />}
            {running ? "Pause" : "Start"}
          </button>
          <button onClick={reset} className="p-1.5 rounded-inner text-text-faint hover:text-text-muted hover:bg-white/[0.06] transition-colors">
            <RotateCcw size={13} />
          </button>
        </div>

        {sessions > 0 && (
          <p className="text-[11px] text-text-faint">{sessions} session{sessions !== 1 ? "s" : ""} today</p>
        )}
      </div>
    </motion.div>
  );
}
