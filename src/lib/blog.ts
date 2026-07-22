import { createPublicClient } from "@/lib/supabase/server";
export { estimateReadingTime } from "@/lib/reading-time";

export type BlogCategory = "chuyen-di" | "cam-nang";

export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string | null;
  featured_image: string | null;
  category: string;
  destination: string | null;
  reading_time: number | null;
  published_at: string | null;
}

export interface BlogPost extends BlogPostSummary {
  content: string;
  tour_slug: string | null;
  meta_description: string | null;
  og_image: string | null;
}

const SUMMARY_COLUMNS =
  "slug, title, excerpt, featured_image, category, destination, reading_time, published_at";

export async function getPublishedPosts(category?: BlogCategory, limit = 50) {
  const supabase = createPublicClient();
  let query = supabase
    .from("blog_posts")
    .select(SUMMARY_COLUMNS)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (category) query = query.eq("category", category);

  const { data, error } = await query;
  if (error) return [];
  return (data ?? []) as BlogPostSummary[];
}

export async function getPostBySlug(
  slug: string,
  category: BlogCategory
): Promise<BlogPost | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("category", category)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return null;
  return data as unknown as BlogPost;
}
