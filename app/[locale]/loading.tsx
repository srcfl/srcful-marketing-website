import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Nav skeleton */}
      <div className="h-16 border-b bg-background/95 backdrop-blur" />

      {/* Hero skeleton */}
      <div className="py-24 md:py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-6 w-32 mb-6" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-12 w-1/2 mb-6" />
          <Skeleton className="h-6 w-2/3" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
        <div className="grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
