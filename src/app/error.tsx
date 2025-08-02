"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl text-destructive">
            Something went wrong!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            We encountered an unexpected error. Please try again or return to
            the homepage.
          </p>
          <div className="space-y-2">
            <Button onClick={reset} className="w-full" aria-label="Try again">
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className="w-full"
              aria-label="Go back to homepage"
            >
              Back to Homepage
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
