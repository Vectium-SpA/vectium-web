/**
 * Skeleton loader for CompoundCard component
 * Matches the structure and dimensions of the real CompoundCard
 */
export function CompoundCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 animate-pulse">
      <div className="flex items-start gap-3">
        {/* Icon skeleton */}
        <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0" />

        {/* Content skeleton */}
        <div className="flex-1 min-w-0">
          {/* Title skeleton */}
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />

          {/* Subtitle skeleton */}
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />

          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
          </div>
        </div>

        {/* Badge skeleton */}
        <div className="w-12 h-6 bg-gray-200 rounded-full flex-shrink-0" />
      </div>
    </div>
  );
}

/**
 * Renders multiple skeleton cards
 */
export function CompoundCardSkeletonList({ count = 10 }: { count?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <CompoundCardSkeleton key={index} />
      ))}
    </div>
  );
}
