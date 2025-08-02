import Link from "next/link";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BlogPostNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="container max-w-2xl">
        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
              <FileQuestion className="w-6 h-6 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Blog Post Not Found
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-muted-foreground">
                The blog post you&apos;re looking for doesn&apos;t exist or has
                been moved.
              </p>
              <p className="text-sm text-muted-foreground">
                Please check the URL or browse our latest blog posts.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="default">
                <Link href="/" className="inline-flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>
              </Button>
              <Button asChild variant="outline">
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
