"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center h-dvh bg-bg-base">
      <div className="bg-bg-card rounded-tile p-8 shadow-tile flex flex-col items-center gap-4 max-w-sm w-full mx-4">
        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
          <AlertCircle className="text-red-400" size={24} />
        </div>
        <div className="text-center">
          <h2 className="text-[15px] font-semibold text-text-primary mb-1">
            Something went wrong
          </h2>
          <p className="text-[13px] text-text-muted">
            {error.message || "Failed to load dashboard data"}
          </p>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 rounded-inner bg-accent-blue/10 text-accent-blue text-[13px] font-medium hover:bg-accent-blue/20 transition-colors"
        >
          <RefreshCw size={14} />
          Try again
        </button>
      </div>
    </div>
  );
}
