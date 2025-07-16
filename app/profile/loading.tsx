import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex flex-col items-center">
              <Skeleton className="w-32 h-32 rounded-full mb-4" />
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <Skeleton className="h-10 w-64 mb-2" />
              <div className="space-y-2 mb-4">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-36" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Wallet Overview Skeleton */}
            <div className="border rounded-lg p-6">
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-20" />
                </div>
                <Skeleton className="h-10 w-32" />
              </div>
            </div>

            {/* Activity Summary Skeleton */}
            <div className="border rounded-lg p-6">
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="text-center p-4 border rounded-lg">
                    <Skeleton className="w-8 h-8 mx-auto mb-2" />
                    <Skeleton className="h-6 w-8 mx-auto mb-1" />
                    <Skeleton className="h-4 w-16 mx-auto" />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center p-4 border rounded-lg">
                <Skeleton className="w-6 h-6 mr-3" />
                <div className="text-center">
                  <Skeleton className="h-5 w-32 mb-1" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            </div>

            {/* Recent Activity Skeleton */}
            <div className="border rounded-lg p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-3">
                    <Skeleton className="w-12 h-16" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-5 w-40 mb-1" />
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-5 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Links Skeleton */}
            <div className="border rounded-lg p-6">
              <Skeleton className="h-6 w-24 mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            </div>

            {/* Recent Chats Skeleton */}
            <div className="border rounded-lg p-6">
              <Skeleton className="h-6 w-28 mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 p-2">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-20 mb-1" />
                      <Skeleton className="h-3 w-32 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Skeleton */}
            <div className="border rounded-lg p-6">
              <Skeleton className="h-6 w-28 mb-4" />
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="p-3 text-center">
                    <Skeleton className="w-8 h-8 rounded-full mx-auto mb-2" />
                    <Skeleton className="h-4 w-16 mx-auto mb-1" />
                    <Skeleton className="h-3 w-20 mx-auto mb-2" />
                    <Skeleton className="h-4 w-12 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}