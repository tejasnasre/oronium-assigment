import { useQuery } from "@tanstack/react-query";
import { blogApi } from "@/lib/api";

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ["blog-posts"],
    queryFn: () => blogApi.getAllPosts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFeaturedPosts = (limit: number = 4) => {
  return useQuery({
    queryKey: ["featured-posts", limit],
    queryFn: () => blogApi.getFeaturedPosts(limit),
    staleTime: 5 * 60 * 1000,
  });
};

export const useRecentPosts = (limit: number = 6) => {
  return useQuery({
    queryKey: ["recent-posts", limit],
    queryFn: () => blogApi.getRecentPosts(limit),
    staleTime: 5 * 60 * 1000,
  });
};

export const useBlogPost = (id: string) => {
  return useQuery({
    queryKey: ["blog-post", id],
    queryFn: () => blogApi.getPostById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePostsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["posts-by-category", category],
    queryFn: () => blogApi.getPostsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};
