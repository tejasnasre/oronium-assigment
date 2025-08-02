"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Blog post error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="container max-w-2xl">
        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Oops! Something went wrong
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-muted-foreground">
                We encountered an error while loading this blog post.
              </p>
              <p className="text-sm text-muted-foreground">
                {error.message || "The blog post could not be found or loaded."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={reset} variant="default">
                Try Again
              </Button>
              <Button asChild variant="outline">
                <Link href="/" className="inline-flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/" className="inline-flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
