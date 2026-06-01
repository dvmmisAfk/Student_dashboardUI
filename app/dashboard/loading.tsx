export default function Loading() {
  return (
    <div className="flex h-dvh overflow-hidden" style={{ backgroundColor: "#111318" }}>
      {/* Sidebar skeleton */}
      <div
        className="hidden md:flex flex-col w-16 lg:w-[220px] shrink-0 border-r border-white/[0.05] p-2 gap-2"
        style={{ backgroundColor: "#1e1f25" }}
      >
        <div className="h-10 w-full rounded-inner skeleton-shimmer mb-2" style={{ backgroundColor: "#282a2f" }} />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-9 w-full rounded-inner skeleton-shimmer" style={{ backgroundColor: "#282a2f" }} />
        ))}
        <div className="mt-auto flex flex-col gap-2">
          <div className="h-9 w-full rounded-inner skeleton-shimmer" style={{ backgroundColor: "#282a2f" }} />
          <div className="h-11 w-full rounded-inner skeleton-shimmer" style={{ backgroundColor: "#282a2f" }} />
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="flex-1 min-w-0 p-4 lg:p-5 space-y-4 overflow-hidden">
        <div className="rounded-tile skeleton-shimmer" style={{ height: 220, backgroundColor: "#1a1b21" }} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-tile skeleton-shimmer" style={{ height: 128, backgroundColor: "#1a1b21" }} />
          ))}
        </div>

        <div>
          <div className="h-5 w-48 rounded skeleton-shimmer mb-3" style={{ backgroundColor: "#1a1b21" }} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-tile skeleton-shimmer" style={{ height: 160, backgroundColor: "#1a1b21" }} />
            ))}
          </div>
        </div>

        <div className="rounded-tile skeleton-shimmer" style={{ height: 140, backgroundColor: "#1a1b21" }} />
      </div>

      {/* Right rail skeleton */}
      <div
        className="hidden xl:flex flex-col w-[296px] shrink-0 border-l border-white/[0.05] p-3 gap-3"
        style={{ backgroundColor: "rgba(17,19,24,0.75)" }}
      >
        {[130, 120, 160, 100, 230, 130].map((h, i) => (
          <div key={i} className="rounded-tile skeleton-shimmer" style={{ height: h, backgroundColor: "#1a1b21" }} />
        ))}
      </div>
    </div>
  );
}
