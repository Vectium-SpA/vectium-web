/**
 * Skeleton loader for Family/Laboratory card components
 * Matches the structure and dimensions of list item cards
 */
export function FamilyCardSkeleton() {
  return (
    <div className="w-full bg-white p-4 rounded-lg border border-gray-200 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {/* Title skeleton */}
          <div className="h-5 bg-gray-200 rounded w-2/3 mb-2" />

          {/* Subtitle skeleton */}
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>

        {/* Arrow icon skeleton */}
        <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0" />
      </div>
    </div>
  );
}

/**
 * Renders multiple skeleton cards for family/laboratory lists
 */
export function FamilyCardSkeletonList({ count = 8 }: { count?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <FamilyCardSkeleton key={index} />
      ))}
    </div>
  );
}
