import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { SITE_URL } from "@/lib/seo";
import { getPublishedPosts } from "@/lib/blog";
import { createPublicClient } from "@/lib/supabase/server";
import type { MarketCardData } from "@/components/MarketCards";
import type { CampaignTour } from "@/components/home/CampaignChapter";

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
    image:
      "https://res.cloudinary.com/dvu2csvsg/image/upload/w_800,q_auto,f_auto/v1784657497/vinharound/chuyen-di/gia-dinh-chi-lan-ka-mua-dong-o-my/gia-dinh-chi-lan-ka-mua-dong-o-my-1.jpg",
  },
  {
    destination: "uc",
    href: "/tour/uc",
    label: "Úc",
    image:
      "https://res.cloudinary.com/dvu2csvsg/image/upload/w_800,q_auto,f_auto/v1784657044/vinharound/chuyen-di/cau-chuyen-visa-uc/cau-chuyen-visa-uc-1.jpg",
  },
  {
    destination: "chau-au",
    href: "/tour/chau-au",
    label: "Châu Âu",
    image:
      "https://res.cloudinary.com/dvu2csvsg/image/upload/w_800,q_auto,f_auto/v1784657626/vinharound/chuyen-di/cinque-terre-y/cinque-terre-y-1.jpg",
  },
  {
    destination: "canada",
    href: "/tour/canada",
    label: "Canada",
    image:
      "https://res.cloudinary.com/dvu2csvsg/image/upload/w_800,q_auto,f_auto/v1784656696/vinharound/chuyen-di/canada-15-ngay-xuyen-ngang/canada-15-ngay-xuyen-ngang-6.jpg",
  },
];

async function getCampaignTours(): Promise<CampaignTour[]> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("tour_packages")
    .select("slug, title, tagline, price, duration, max_group_size, requirements, image_url")
    .eq("is_active", true)
    .eq("destination", "canada")
    .order("order_index", { ascending: true });

  return (data ?? []).map((t) => ({
    slug: t.slug as string,
    title: t.title,
    tagline: t.tagline,
    price: t.price,
    duration: t.duration,
    maxGroupSize: t.max_group_size,
    isSelfDrive: Array.isArray(t.requirements) && t.requirements.length > 0,
    image: t.image_url,
  }));
}

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
  const [latestPosts, marketCards, campaignTours] = await Promise.all([
    getPublishedPosts("chuyen-di", 3),
    getMarketCards(),
    getCampaignTours(),
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
      <HomePage latestPosts={latestPosts} marketCards={marketCards} campaignTours={campaignTours} />
    </>
  );
}
