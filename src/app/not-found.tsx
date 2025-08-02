import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Beyond UI Blog",
  description:
    "The page you are looking for could not be found. Return to our blog homepage to discover more articles.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="text-6xl font-bold text-muted-foreground mb-4">
            404
          </div>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. The
            content may have been moved or deleted.
          </p>
          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/" aria-label="Go back to homepage">
                Back to Homepage
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/posts" aria-label="Browse all blog posts">
                Browse All Posts
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
