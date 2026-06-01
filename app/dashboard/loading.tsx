export default function Loading() {
  return (
    <div className="flex h-dvh overflow-hidden" style={{ background: "#111318" }}>
      {/* Sidebar skeleton — visible on md+ */}
      <div className="hidden md:flex flex-col w-16 lg:w-[220px] shrink-0 border-r border-white/[0.05] p-2 gap-2"
        style={{ background: "#1e1f25" }}>
        {/* Logo row */}
        <div className="h-10 w-full rounded-inner skeleton-shimmer mb-2" style={{ background: "#282a2f" }} />
        {/* Nav items */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-9 w-full rounded-inner skeleton-shimmer" style={{ background: "#282a2f" }} />
        ))}
        <div className="mt-auto flex flex-col gap-2">
          <div className="h-9 w-full rounded-inner skeleton-shimmer" style={{ background: "#282a2f" }} />
          <div className="h-11 w-full rounded-inner skeleton-shimmer" style={{ background: "#282a2f" }} />
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="flex-1 min-w-0 p-4 lg:p-5 space-y-4 overflow-hidden">
        {/* Hero tile */}
        <div className="rounded-tile skeleton-shimmer" style={{ height: 220, background: "#1a1b21" }} />

        {/* Metrics strip — 4 tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-tile skeleton-shimmer" style={{ height: 128, background: "#1a1b21" }} />
          ))}
        </div>

        {/* Course grid section */}
        <div>
          <div className="h-5 w-48 rounded skeleton-shimmer mb-3" style={{ background: "#1a1b21" }} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-tile skeleton-shimmer" style={{ height: 160, background: "#1a1b21" }} />
            ))}
          </div>
        </div>

        {/* Activity tile */}
        <div className="rounded-tile skeleton-shimmer" style={{ height: 140, background: "#1a1b21" }} />
      </div>

      {/* Right rail skeleton — visible on xl+ */}
      <div className="hidden xl:flex flex-col w-[296px] shrink-0 border-l border-white/[0.05] p-3 gap-3"
        style={{ background: "rgba(17,19,24,0.75)" }}>
        {[130, 120, 160, 100, 230, 130].map((h, i) => (
          <div key={i} className="rounded-tile skeleton-shimmer" style={{ height: h, background: "#1a1b21" }} />
        ))}
      </div>
    </div>
  );
}
