import { MetadataRoute } from "next";
import { blogApi } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://oronium-assigment.vercel.app/";

  try {
    // Get all blog posts
    const posts = await blogApi.getAllPosts();

    // Create sitemap entries for blog posts
    const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.id}`,
      lastModified: new Date(post.createdAt),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${baseUrl}/posts`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
    ];

    return [...staticPages, ...blogEntries];
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // Return minimal sitemap if blog API fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
    ];
  }
}
