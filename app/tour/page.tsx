import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TourCard from "@/components/tour/TourCard";
import { createPublicClient } from "@/lib/supabase/server";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

const TITLE = "Tất cả Tour - Private Tour Mỹ, Úc, Châu Âu";
const DESCRIPTION =
  "Danh sách private tour Mỹ, Úc, Châu Âu cho gia đình Việt — xe riêng, lịch trình tùy chỉnh 100%, không shopping stop.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tour" },
  openGraph: {
    type: "website",
    url: absoluteUrl("/tour"),
    title: `${TITLE} | Vinh Around`,
    description: DESCRIPTION,
  },
};

export const revalidate = 3600;

const MARKETS = [
  { href: "/tour/my", label: "Mỹ" },
  { href: "/tour/uc", label: "Úc" },
  { href: "/tour/chau-au", label: "Châu Âu" },
];

export default async function TourListPage() {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("tour_packages")
    .select("slug, title, tagline, route, duration, price, image_url")
    .eq("is_active", true)
    .order("order_index", { ascending: true });

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tour", item: absoluteUrl("/tour") },
    ],
  };

  const tours = data ?? [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Navbar />
      <main className="min-h-screen">
        <section className="pt-32 pb-10 md:pt-40 md:pb-14 bg-gradient-to-b from-primary/5 via-white to-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-4">
              Tất cả Tour
            </h1>
            <p className="text-primary/70 text-base md:text-lg max-w-2xl mx-auto mb-8">
              Private tour cho gia đình Việt — xe riêng, không shopping stop
            </p>
            <div className="flex items-center justify-center gap-3">
              {MARKETS.map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  className="px-5 py-2.5 rounded-full border-2 border-primary/15 text-primary font-semibold text-sm hover:border-secondary hover:text-secondary transition-colors"
                >
                  {m.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            {tours.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {tours.map((tour) => (
                  <TourCard key={tour.slug} tour={tour} />
                ))}
              </div>
            ) : (
              <p className="text-center text-primary/50 py-12">Chưa có tour nào đang hoạt động.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
