"use client";
import { useFeaturedPosts } from "@/hooks/useBlog";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

function FeaturedPost() {
  const { data: featuredPosts, isLoading, error } = useFeaturedPosts(6);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 h-fit">
        <Skeleton className="h-6 w-48 mb-6" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start space-x-3">
              <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !featuredPosts?.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 h-fit">
        <p className="text-gray-500">Failed to load featured posts</p>
      </div>
    );
  }

  // Skip the first post as it's shown in MainCTAImage
  const otherFeaturedPosts = featuredPosts.slice(1);

  if (otherFeaturedPosts.length === 0) {
    return null;
  }

  return (
    <aside
      className="bg-white dark:bg-gray-800 rounded-lg p-6 h-fit shadow-sm border border-gray-100 dark:border-gray-700"
      role="complementary"
      aria-labelledby="featured-posts-heading"
    >
      <h2
        id="featured-posts-heading"
        className="text-lg font-semibold mb-6 text-gray-900 dark:text-white"
      >
        Other featured posts
      </h2>
      <nav aria-label="Featured blog posts">
        <ul className="space-y-4">
          {otherFeaturedPosts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.id}`}
                className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
                aria-label={`Read featured post: ${post.blog_title} by ${post.blog_by}`}
              >
                <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={post.blog_image}
                    alt={`Featured image for ${post.blog_title}`}
                    fill
                    sizes="48px"
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight mb-1">
                    {post.blog_title}
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Avatar className="h-4 w-4">
                      <AvatarImage
                        src={post.blog_by_img || "/placeholder.svg"}
                        alt={`Profile picture of ${post.blog_by}`}
                      />
                      <AvatarFallback className="text-xs">
                        {post.blog_by
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="truncate">{post.blog_by}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default FeaturedPost;
