import Link from "next/link";
import BlogCard from "@/components/blog/BlogCard";
import type { BlogPostSummary } from "@/lib/blog";

export default function LatestStories({ posts }: { posts: BlogPostSummary[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-[#faf9f7]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-primary mb-4">
            Chuyến đi mới nhất
          </h2>
          <p className="text-primary/60 max-w-xl mx-auto">
            Câu chuyện thật từ những gia đình vừa đi cùng Vinh
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} basePath="chuyen-di" />
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/chuyen-di"
            className="text-primary font-semibold text-sm hover:text-secondary transition-colors"
          >
            Xem tất cả chuyến đi →
          </Link>
        </div>
      </div>
    </section>
  );
}
