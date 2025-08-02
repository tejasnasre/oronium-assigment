import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowLeft } from "lucide-react";

import { blogApi } from "@/lib/api";
import { BlogPost } from "@/types/blog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    // Await params before accessing its properties
    const { id } = await params;
    const post = await blogApi.getPostById(id);

    const excerpt = post.blog_content.substring(0, 160).replace(/\n/g, " ");

    return {
      title: post.blog_title,
      description: excerpt + (post.blog_content.length > 160 ? "..." : ""),
      keywords: [post.blog_category, "blog", "article", post.blog_by],
      authors: [{ name: post.blog_by }],
      creator: post.blog_by,
      publisher: "Beyond UI Blog",
      alternates: {
        canonical: `https://oronium-assigment.vercel.app/blog/${id}`,
      },
      openGraph: {
        title: post.blog_title,
        description: excerpt + (post.blog_content.length > 160 ? "..." : ""),
        type: "article",
        publishedTime: post.createdAt,
        authors: [post.blog_by],
        tags: [post.blog_category],
        images: [
          {
            url: post.blog_image,
            width: 1200,
            height: 630,
            alt: `Featured image for ${post.blog_title}`,
          },
        ],
        url: `https://oronium-assigment.vercel.app/blog/${id}`,
        siteName: "Beyond UI Blog",
      },
      twitter: {
        card: "summary_large_image",
        title: post.blog_title,
        description: excerpt + (post.blog_content.length > 160 ? "..." : ""),
        images: [post.blog_image],
        creator: "@beyondui",
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

// Generate static params for static generation (optional)
export async function generateStaticParams() {
  try {
    const posts = await blogApi.getAllPosts();
    return posts.map((post) => ({
      id: post.id,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

// Structured Data Component
function BlogStructuredData({ post }: { post: BlogPost }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.blog_title,
    description: post.blog_content.substring(0, 160).replace(/\n/g, " "),
    image: {
      "@type": "ImageObject",
      url: post.blog_image,
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Person",
      name: post.blog_by,
      image: post.blog_by_img,
    },
    publisher: {
      "@type": "Organization",
      name: "Beyond UI Blog",
      logo: {
        "@type": "ImageObject",
        url: "https://oronium-assigment.vercel.app/logo.png",
      },
    },
    datePublished: post.createdAt,
    dateModified: post.createdAt,
    articleSection: post.blog_category,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://oronium-assigment.vercel.app/blog/${post.id}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    // Await params before accessing its properties
    const { id } = await params;
    const post = await blogApi.getPostById(id);

    return (
      <div className="min-h-screen bg-background">
        <BlogStructuredData post={post} />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors group"
            aria-label="Go back to blog home page"
          >
            <ArrowLeft
              className="h-4 w-4 group-hover:-translate-x-1 transition-transform"
              aria-hidden="true"
            />
            Back to Blog
          </Link>

          {/* Blog Post Header */}
          <header className="mb-8 space-y-6">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                {post.blog_category || "General"}
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {post.blog_title}
              </h1>

              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={post.blog_by_img}
                      alt={`Profile picture of ${post.blog_by}`}
                    />
                    <AvatarFallback>{getInitials(post.blog_by)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground">
                    {post.blog_by}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <time dateTime={post.createdAt}>
                    {formatDate(post.createdAt)}
                  </time>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.blog_image && (
            <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={post.blog_image}
                alt={`Featured image for blog post: ${post.blog_title}`}
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          )}

          {/* Blog Content */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <article className="prose prose-lg max-w-none dark:prose-invert">
                {post.blog_content.split("\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-4 leading-relaxed text-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </article>
            </CardContent>
          </Card>

          {/* Author Card */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={post.blog_by_img} alt={post.blog_by} />
                  <AvatarFallback className="text-lg">
                    {getInitials(post.blog_by)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{post.blog_by}</h3>
                  <p className="text-muted-foreground">Author</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Related Posts Section */}
          <RelatedPosts currentPostId={post.id} category={post.blog_category} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    notFound();
  }
}

// Related Posts Component
async function RelatedPosts({
  currentPostId,
  category,
}: {
  currentPostId: string;
  category?: string;
}) {
  try {
    const allPosts = await blogApi.getAllPosts();

    // Filter out current post and get posts from same category if available
    let relatedPosts = allPosts.filter((post) => post.id !== currentPostId);

    if (category) {
      const sameCategoryPosts = relatedPosts.filter(
        (post) => post.blog_category === category
      );

      if (sameCategoryPosts.length > 0) {
        relatedPosts = sameCategoryPosts;
      }
    }

    // Get up to 3 related posts
    relatedPosts = relatedPosts.slice(0, 3);

    if (relatedPosts.length === 0) {
      return null;
    }

    return (
      <section aria-labelledby="related-posts-heading">
        <h2 id="related-posts-heading" className="text-2xl font-bold mb-6">
          Related Posts
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {relatedPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              aria-label={`Read related post: ${post.blog_title}`}
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer py-0">
                <div className="aspect-video relative overflow-hidden rounded-t-xl">
                  <Image
                    src={post.blog_image}
                    alt={`Cover image for ${post.blog_title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">
                    {post.blog_category || "General"}
                  </Badge>
                  <h3 className="font-semibold line-clamp-2 mb-2">
                    {post.blog_title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.blog_content.substring(0, 100)}...
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={post.blog_by_img}
                        alt={`Profile picture of ${post.blog_by}`}
                      />
                      <AvatarFallback>
                        {getInitials(post.blog_by)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">
                      {post.blog_by}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return null;
  }
}
