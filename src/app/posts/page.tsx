"use client";

import { useState, useMemo } from "react";
import { useBlogPosts } from "@/hooks/useBlog";
import { useDebounce } from "@/hooks/useDebounce";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/blog";

const POSTS_PER_PAGE = 6;

export default function AllPostsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data: allPosts, isLoading, error } = useBlogPosts();

  // Filter posts based on search term
  const filteredPosts = useMemo(() => {
    if (!allPosts) return [];
    if (!debouncedSearchTerm) return allPosts;

    return allPosts.filter(
      (post: BlogPost) =>
        post.blog_title
          ?.toLowerCase()
          ?.includes(debouncedSearchTerm.toLowerCase()) ||
        post.blog_content
          ?.toLowerCase()
          ?.includes(debouncedSearchTerm.toLowerCase()) ||
        post.blog_category
          ?.toLowerCase()
          ?.includes(debouncedSearchTerm.toLowerCase()) ||
        post.blog_by?.toLowerCase()?.includes(debouncedSearchTerm.toLowerCase())
    );
  }, [allPosts, debouncedSearchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Reset to first page when search changes
  useMemo(() => {
    setCurrentPage(1);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Error</h1>
          <p className="text-muted-foreground">Failed to load blog posts</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            All Blog Posts
          </h1>
          <p className="text-muted-foreground">
            Discover all {allPosts?.length || 0} blog posts
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {debouncedSearchTerm ? (
              <>
                Showing {filteredPosts.length} result
                {filteredPosts.length !== 1 ? "s" : ""} for &quot;
                {debouncedSearchTerm}&quot;
              </>
            ) : (
              <>
                Showing {startIndex + 1}-
                {Math.min(endIndex, filteredPosts.length)} of{" "}
                {filteredPosts.length} posts
              </>
            )}
          </p>
        </div>

        {/* Posts Grid */}
        {currentPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No posts found</h3>
              <p>Try adjusting your search terms or browse all posts.</p>
            </div>
            {debouncedSearchTerm && (
              <Button
                variant="outline"
                onClick={() => setSearchTerm("")}
                className="mt-4"
              >
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentPosts.map((post: BlogPost) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <Card className="overflow-hidden transition-all duration-200 cursor-pointer group bg-card border hover:shadow-xl hover:-translate-y-1 h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.blog_image || "/placeholder.svg"}
                        alt={`Cover image for ${post.blog_title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <Badge
                          variant="secondary"
                          className="text-xs font-medium"
                        >
                          {post.blog_category}
                        </Badge>
                        <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {post.blog_title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                          {post.blog_content.slice(0, 100)}...
                        </p>
                        <div className="flex items-center space-x-3 pt-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={post.blog_by_img || "/placeholder.svg"}
                              alt={post.blog_by}
                            />
                            <AvatarFallback className="text-xs">
                              {post.blog_by
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-sm">
                            <p className="font-medium text-foreground">
                              {post.blog_by}
                            </p>
                            <p className="text-muted-foreground">
                              {new Date(post.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => {
                      // Show first 3, last 3, and 3 around current page
                      const showPage =
                        page <= 3 ||
                        page > totalPages - 3 ||
                        (page >= currentPage - 1 && page <= currentPage + 1);

                      if (!showPage) {
                        // Show ellipsis
                        if (
                          (page === 4 && currentPage > 6) ||
                          (page === totalPages - 3 &&
                            currentPage < totalPages - 5)
                        ) {
                          return (
                            <span key={page} className="px-2 py-1 text-sm">
                              ...
                            </span>
                          );
                        }
                        return null;
                      }

                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className="h-8 w-8 p-0"
                        >
                          {page}
                        </Button>
                      );
                    }
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>

        {/* Search Bar Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-10 w-80" />
        </div>

        {/* Results Info Skeleton */}
        <div className="mb-6">
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Posts Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-6 space-y-3">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex items-center space-x-3 pt-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
