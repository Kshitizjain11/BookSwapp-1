import { Skeleton } from "@/components/ui/skeleton"

export default function MapLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Map Area Skeleton */}
        <div className="flex-1 relative">
          <Skeleton className="absolute inset-0" />

          {/* Map Controls Skeleton */}
          <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>

          {/* Legend Skeleton */}
          <div className="absolute top-4 left-4 z-10 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg">
            <Skeleton className="h-4 w-24 mb-2" />
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Skeleton className="w-3 h-3 rounded-full" />
                <Skeleton className="h-3 w-8" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="w-3 h-3 rounded-full" />
                <Skeleton className="h-3 w-8" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="w-3 h-3 rounded-full" />
                <Skeleton className="h-3 w-8" />
              </div>
            </div>
          </div>

          {/* Pin Skeletons */}
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              className="absolute w-6 h-6 rounded-full"
              style={{
                left: `${30 + ((i * 15) % 60)}%`,
                top: `${30 + ((i * 12) % 40)}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
