import Link from "next/link";
import Image from "next/image";
import { marked } from "marked";
import { Clock, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareBar from "@/components/blog/ShareBar";
import { Button } from "@/components/ui/button";
import { createPublicClient } from "@/lib/supabase/server";
import { absoluteUrl, SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";
import type { BlogPost, BlogCategory } from "@/lib/blog";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80";

const CATEGORY_LABEL: Record<BlogCategory, string> = {
  "chuyen-di": "Chuyến đi",
  "cam-nang": "Cẩm nang",
};

async function getRelatedTour(tourSlug: string | null) {
  if (!tourSlug) return null;
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("tour_packages")
    .select("slug, title, image_url")
    .eq("slug", tourSlug)
    .eq("is_active", true)
    .maybeSingle();
  return data;
}

export default async function BlogPostPage({
  post,
  category,
}: {
  post: BlogPost;
  category: BlogCategory;
}) {
  const path = `/${category}/${post.slug}`;
  const image = post.featured_image || FALLBACK_IMAGE;
  const relatedTour = await getRelatedTour(post.tour_slug);
  const contentHtml = marked.parse(post.content, { async: false }) as string;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt || post.meta_description || undefined,
      image: post.og_image || image,
      datePublished: post.published_at || undefined,
      author: { "@type": "Person", name: "Vinh Around", url: absoluteUrl("/ve-vinh") },
      publisher: { "@type": "Organization", name: "Vinh Around", logo: `${SITE_URL}/logo.png` },
      mainEntityOfPage: absoluteUrl(path),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: CATEGORY_LABEL[category], item: absoluteUrl(`/${category}`) },
        { "@type": "ListItem", position: 3, name: post.title, item: absoluteUrl(path) },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen">
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <Image src={image} alt={post.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
          <div className="absolute top-6 left-6 z-10">
            <Link href={`/${category}`}>
              <Button variant="outline" className="glass-effect border-white/40 text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {CATEGORY_LABEL[category]}
              </Button>
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto max-w-3xl">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3">
                {post.title}
              </h1>
              {post.reading_time && (
                <p className="flex items-center gap-2 text-white/70 text-sm">
                  <Clock className="w-4 h-4" />
                  {post.reading_time} phút đọc
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-3xl px-6 py-10 md:py-14">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-primary/10">
            <Link href="/ve-vinh" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                V
              </div>
              <div>
                <p className="text-sm font-semibold text-primary group-hover:text-secondary transition-colors">
                  Vinh Around
                </p>
                <p className="text-xs text-primary/50">Tác giả</p>
              </div>
            </Link>
            <ShareBar title={post.title} />
          </div>

          {/* Nội dung do admin (đáng tin cậy) biên soạn qua trình soạn markdown — không nhận input công khai. */}
          <article
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-primary prose-a:text-secondary"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {relatedTour && (
            <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-primary to-primary/90 text-white text-center">
              <p className="text-white/70 text-sm mb-2">Muốn đi chuyến giống vậy?</p>
              <h3 className="font-display text-xl font-bold mb-4">{relatedTour.title}</h3>
              <Link href={`/tour/${relatedTour.slug}`}>
                <Button className="bg-gradient-to-r from-secondary to-accent text-white font-bold">
                  Xem tour này
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
