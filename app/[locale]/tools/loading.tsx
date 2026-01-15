import { Skeleton } from "@/components/ui/skeleton";

export default function ToolsLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Nav skeleton */}
      <div className="h-16 border-b bg-background/95 backdrop-blur" />

      {/* Hero skeleton */}
      <div className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Skeleton className="h-6 w-32 mx-auto mb-6" />
          <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>
      </div>

      {/* Calculator skeleton */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-24">
        <div className="rounded-lg border p-6 md:p-8 space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}
