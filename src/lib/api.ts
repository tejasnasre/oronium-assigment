import { BlogPost } from "@/types/blog";

const API_BASE_URL = "https://688daee0a459d5566b12e6ed.mockapi.io/api/v1";

export const blogApi = {
  async getAllPosts(): Promise<BlogPost[]> {
    const response = await fetch(`${API_BASE_URL}/blog`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }

    return response.json();
  },

  async getPostById(id: string): Promise<BlogPost> {
    const response = await fetch(`${API_BASE_URL}/blog/${id}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blog post");
    }

    return response.json();
  },

  async getFeaturedPosts(limit: number = 4): Promise<BlogPost[]> {
    const posts = await this.getAllPosts();
    return posts.slice(0, limit);
  },

  async getRecentPosts(limit: number = 6): Promise<BlogPost[]> {
    const posts = await this.getAllPosts();
    return posts
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, limit);
  },

  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    const posts = await this.getAllPosts();
    return posts.filter(
      (post) => post.blog_category.toLowerCase() === category.toLowerCase()
    );
  },
};
