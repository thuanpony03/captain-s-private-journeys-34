import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { SITE_URL } from "@/lib/seo";
import { getPublishedPosts } from "@/lib/blog";
import { createPublicClient } from "@/lib/supabase/server";
import type { MarketCardData } from "@/components/MarketCards";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Trang chủ nội dung tĩnh -> render sẵn lúc build, phục vụ từ cache Cloudflare.
export const revalidate = 3600;

const MARKET_META: { destination: string; href: string; label: string; image: string }[] = [
  {
    destination: "my",
    href: "/tour/my",
    label: "Mỹ",
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80",
  },
  {
    destination: "uc",
    href: "/tour/uc",
    label: "Úc",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80",
  },
  {
    destination: "chau-au",
    href: "/tour/chau-au",
    label: "Châu Âu",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
  },
];

async function getMarketCards(): Promise<MarketCardData[]> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("tour_packages")
    .select("slug, title, price, destination")
    .eq("is_active", true)
    .not("destination", "is", null)
    .order("order_index", { ascending: true });

  return MARKET_META.map((meta) => ({
    href: meta.href,
    label: meta.label,
    image: meta.image,
    tours: (data ?? [])
      .filter((t) => t.destination === meta.destination)
      .slice(0, 3)
      .map((t) => ({ slug: t.slug as string, title: t.title, price: t.price })),
  }));
}

export default async function Page() {
  const [latestPosts, marketCards] = await Promise.all([
    getPublishedPosts("chuyen-di", 3),
    getMarketCards(),
  ]);
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <HomePage latestPosts={latestPosts} marketCards={marketCards} />
    </>
  );
}
