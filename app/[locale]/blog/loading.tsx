import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Nav skeleton */}
      <div className="h-16 border-b bg-background/95 backdrop-blur" />

      {/* Hero skeleton */}
      <div className="border-b py-24 md:py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-6 w-24 mb-6" />
          <Skeleton className="h-12 w-2/3 mb-4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </div>

      {/* Category filters skeleton */}
      <div className="max-w-7xl mx-auto pt-8 px-4 md:px-8">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-md" />
          ))}
        </div>
      </div>

      {/* Featured post skeleton */}
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
        <Skeleton className="h-4 w-32 mb-6" />
        <div className="rounded-lg border overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <Skeleton className="aspect-[16/10] md:aspect-auto md:h-80" />
            <div className="p-6 md:p-8 space-y-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
        <Skeleton className="h-4 w-40 mb-6" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-lg border overflow-hidden">
              <Skeleton className="aspect-[16/9]" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
