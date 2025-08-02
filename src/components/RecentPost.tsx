"use client";
import { useRecentPosts } from "@/hooks/useBlog";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

function RecentPost() {
  const { data: recentPosts, isLoading, error } = useRecentPosts(6);

  if (isLoading) {
    return (
      <div className="py-16 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-6 space-y-3">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex items-center space-x-2">
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
      </div>
    );
  }

  if (error || !recentPosts?.length) {
    return (
      <div className="py-16 px-6 max-w-7xl mx-auto">
        <p className="text-gray-500">Failed to load recent posts</p>
      </div>
    );
  }

  return (
    <section
      className="py-16 px-6 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-800/50"
      aria-labelledby="recent-posts-heading"
    >
      <div className="flex items-center justify-between mb-8">
        <h2
          id="recent-posts-heading"
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          Recent Posts
        </h2>
        <Link
          href="/posts"
          className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors hover:underline"
          aria-label="View all blog posts"
        >
          All Posts
        </Link>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
      >
        {recentPosts.map((post) => (
          <article key={post.id} role="listitem">
            <Link
              href={`/blog/${post.id}`}
              aria-label={`Read post: ${post.blog_title} by ${post.blog_by}`}
            >
              <Card className="overflow-hidden transition-all duration-200 cursor-pointer group bg-white dark:bg-gray-800 border-2 shadow-sm hover:shadow-xl hover:-translate-y-1 h-full py-0">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.blog_image || "/placeholder.svg"}
                    alt={`Cover image for ${post.blog_title} - ${post.blog_category} article`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Badge variant="secondary" className="text-xs font-medium">
                      {post.blog_category}
                    </Badge>
                    <h3 className="text-lg font-semibold leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.blog_title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 leading-relaxed">
                      {post.blog_content.slice(0, 100)}...
                    </p>
                    <div className="flex items-center space-x-3 pt-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={post.blog_by_img || "/placeholder.svg"}
                          alt={`Profile picture of ${post.blog_by}, author`}
                        />
                        <AvatarFallback className="text-xs">
                          {post.blog_by
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {post.blog_by}
                        </p>
                        <p className="text-gray-500">
                          <time dateTime={post.createdAt}>
                            {new Date(post.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </time>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RecentPost;
