/**
 * Skeleton loader for detail pages (compound/brand details)
 * Matches the structure of detail page layouts
 */
export function DetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            {/* Title */}
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-3" />
            {/* Subtitle */}
            <div className="h-5 bg-gray-200 rounded w-1/2" />
          </div>
          {/* Badge */}
          <div className="w-16 h-8 bg-gray-200 rounded-full" />
        </div>

        {/* Metadata badges */}
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-24 bg-gray-200 rounded-full" />
          <div className="h-6 w-32 bg-gray-200 rounded-full" />
          <div className="h-6 w-28 bg-gray-200 rounded-full" />
        </div>
      </div>

      {/* Content sections skeleton */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-6">
        {/* Section 1 */}
        <div>
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-3" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>

        {/* Section 2 */}
        <div>
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-3" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>

        {/* Section 3 */}
        <div>
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-3" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-4/5" />
          </div>
        </div>
      </div>

      {/* Related items skeleton */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
