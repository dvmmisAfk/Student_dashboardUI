import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stitch surface hierarchy (namedColors)
        "surface-base":    "#111318",  // deepest canvas
        "surface-dim":     "#0c0e13",  // surface-container-lowest
        "surface-low":     "#1a1b21",  // surface-container-low
        "surface":         "#1e1f25",  // surface-container
        "surface-high":    "#282a2f",  // surface-container-high
        "surface-top":     "#33353a",  // surface-container-highest
        "surface-bright":  "#37393f",  // surface-bright
        // Legacy aliases kept for backward compat
        "bg-base":         "#111318",
        "bg-card":         "#1a1b21",
        "bg-elevated":     "#282a2f",
        "bg-section":      "#1e1f25",
        // Accent triad (unchanged — identical to Stitch overrides)
        "accent-blue":     "#4F8EF7",
        "accent-purple":   "#8B5CF6",
        "accent-cyan":     "#22D3EE",
        "accent-green":    "#10B981",
        // Primary palette highlights (Stitch primary tokens)
        "primary":         "#acc7ff",  // primary highlight / glow tint
        "primary-vivid":   "#508ff8",  // primary-container / button fill
        // Text hierarchy (Stitch on-surface tokens)
        "text-primary":    "#e2e2e9",  // on-surface
        "text-secondary":  "#c2c6d5",  // on-surface-variant
        "text-muted":      "#8c909e",  // outline
        "text-faint":      "#424753",  // outline-variant
        warn:              "#F59E0B",
        success:           "#10B981",
      },
      fontFamily: {
        sans:  ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono:  ["var(--font-geist-mono)", "monospace"],
        label: ["var(--font-geist-mono)", "monospace"], // mono-label style per Stitch
      },
      borderRadius: {
        tile:  "16px",
        inner: "8px",
        badge: "999px",
        sm:    "4px",
      },
      boxShadow: {
        tile:          "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.5)",
        "tile-glow":   "0 0 0 1px rgba(255,255,255,0.10), 0 16px 48px rgba(0,0,0,0.6)",
        "glow-blue":   "0 0 0 1.5px rgba(79,142,247,0.4),  0 0 40px rgba(79,142,247,0.12)",
        "glow-purple": "0 0 0 1.5px rgba(139,92,246,0.4),  0 0 40px rgba(139,92,246,0.12)",
        "glow-cyan":   "0 0 0 1.5px rgba(34,211,238,0.35), 0 0 40px rgba(34,211,238,0.10)",
        "glow-green":  "0 0 0 1.5px rgba(16,185,129,0.35), 0 0 40px rgba(16,185,129,0.10)",
        glass:         "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      screens: {
        "3xl": "1600px",
      },
    },
  },
  plugins: [],
};
export default config;
