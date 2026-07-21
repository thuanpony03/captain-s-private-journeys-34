import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import type { BlogPostSummary, BlogCategory } from "@/lib/blog";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80";

export default function BlogCard({
  post,
  basePath,
}: {
  post: BlogPostSummary;
  basePath: BlogCategory;
}) {
  return (
    <Link
      href={`/${basePath}/${post.slug}`}
      className="group block rounded-2xl overflow-hidden border border-primary/10 bg-white shadow-sm hover:shadow-xl hover:border-secondary/30 transition-all duration-300"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.featured_image || FALLBACK_IMAGE}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-primary mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-primary/60 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
        )}
        {post.reading_time && (
          <span className="flex items-center gap-1 text-xs text-primary/50">
            <Clock className="w-3.5 h-3.5" />
            {post.reading_time} phút đọc
          </span>
        )}
      </div>
    </Link>
  );
}
