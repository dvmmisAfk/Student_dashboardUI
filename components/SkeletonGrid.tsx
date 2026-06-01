export default function SkeletonGrid() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* Hero skeleton */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 h-40 rounded-tile bg-bg-card skeleton-shimmer" />
      {/* 4 course card skeletons */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-48 rounded-tile bg-bg-card skeleton-shimmer"
        />
      ))}
      {/* Activity skeleton */}
      <div className="col-span-1 md:col-span-2 lg:col-span-1 h-80 rounded-tile bg-bg-card skeleton-shimmer" />
    </div>
  );
}
