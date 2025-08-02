import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-6 w-24" />
        </div>

        {/* Header Skeleton */}
        <header className="mb-8 space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-12 w-3/4" />
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </header>

        {/* Featured Image Skeleton */}
        <div className="mb-8">
          <Skeleton className="w-full h-[400px] rounded-xl" />
        </div>

        {/* Content Skeleton */}
        <Card className="mb-8">
          <CardContent className="p-8 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>

        {/* Author Card Skeleton */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Related Posts Skeleton */}
        <section>
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index}>
                <Skeleton className="aspect-video w-full rounded-t-xl" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
