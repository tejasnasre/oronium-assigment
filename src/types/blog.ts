export interface BlogPost {
  id: string;
  createdAt: string;
  blog_title: string;
  blog_content: string;
  blog_image: string;
  blog_by: string;
  blog_by_img: string;
  blog_category: string; // Note: This seems to be a typo in the API (should be blog_category)
}

export interface BlogApiResponse {
  data: BlogPost[];
  total: number;
}
