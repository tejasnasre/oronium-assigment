import FeaturedPost from "@/components/FeaturedPost";
import MainCTAImage from "@/components/MainCTAImage";
import RecentPost from "@/components/RecentPost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Latest Blog Posts and Articles",
  description:
    "Explore our latest blog posts covering web development, design trends, and technology insights. Stay updated with the newest articles and featured content.",
  openGraph: {
    title: "Beyond UI Blog - Latest Posts and Articles",
    description:
      "Explore our latest blog posts covering web development, design trends, and technology insights.",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section with Sidebar */}
      <section
        className="max-w-7xl mx-auto px-6 py-8"
        aria-labelledby="hero-section"
      >
        <h1 className="sr-only" id="hero-section">
          Beyond UI Blog - Featured and Recent Posts
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Hero - Takes 2/3 of the width */}
          <div className="lg:col-span-2">
            <MainCTAImage />
          </div>
          {/* Featured Posts Sidebar - Takes 1/3 of the width */}
          <div className="lg:col-span-1">
            <FeaturedPost />
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <RecentPost />
    </div>
  );
}
