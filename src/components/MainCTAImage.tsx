"use client";
import { useFeaturedPosts } from "@/hooks/useBlog";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";

function MainCTAImage() {
  const { data: featuredPosts, isLoading, error } = useFeaturedPosts(1);

  if (isLoading) {
    return (
      <div className="relative h-[400px] lg:h-[500px] w-full overflow-hidden rounded-lg">
        <Skeleton className="h-full w-full" />
        <div className="absolute bottom-6 left-6 max-w-md space-y-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-16 w-full" />
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !featuredPosts?.length) {
    return (
      <div className="relative h-[400px] lg:h-[500px] w-full overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Failed to load featured post</p>
      </div>
    );
  }

  const post = featuredPosts[0];

  return (
    <Link
      href={`/blog/${post.id}`}
      className="block"
      aria-label={`Read featured post: ${post.blog_title}`}
    >
      <article className="relative h-[400px] lg:h-[500px] w-full overflow-hidden rounded-lg group cursor-pointer">
        {/* Background Image using Next.js Image component */}
        <Image
          src={post.blog_image}
          alt={`Featured image for ${post.blog_title} - ${post.blog_category} article by ${post.blog_by}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 66vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <Badge
            variant="secondary"
            className="mb-3 bg-white/90 text-black hover:bg-white text-xs font-medium"
          >
            {post.blog_category}
          </Badge>
          <h1 className="text-2xl lg:text-3xl font-bold leading-tight mb-4 text-white">
            {post.blog_title}
          </h1>
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 border-2 border-white/20">
              <AvatarImage
                src={post.blog_by_img || "/placeholder.svg"}
                alt={`Profile picture of ${post.blog_by}, author of this article`}
              />
              <AvatarFallback className="bg-white/20 text-white">
                {post.blog_by
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">{post.blog_by}</p>
              <p className="text-white/80">
                <time dateTime={post.createdAt}>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default MainCTAImage;
