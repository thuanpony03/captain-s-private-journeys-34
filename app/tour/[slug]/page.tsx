import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareButton, BookingCta } from "@/components/tour/TourActions";
import { createPublicClient } from "@/lib/supabase/server";
import { ORGANIZATION, absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1200&q=80";

interface Tour {
  id: string;
  title: string;
  tagline: string | null;
  route: string | null;
  description: string | null;
  duration: string | null;
  price: string | null;
  image_url: string | null;
  slug: string | null;
  stops: string[];
}

async function getTour(slug: string): Promise<Tour | null> {
  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("tour_packages")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error || !data) return null;

  return {
    ...(data as unknown as Tour),
    stops: Array.isArray(data.stops) ? data.stops.map((s) => String(s)) : [],
  };
}

/**
 * Sinh sẵn trang cho mọi tour đang hoạt động lúc build.
 * Tour thêm mới sau đó vẫn render được nhờ ISR (revalidate bên dưới).
 */
export async function generateStaticParams() {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("tour_packages")
      .select("slug")
      .eq("is_active", true)
      .not("slug", "is", null);

    return (data ?? []).map((t) => ({ slug: t.slug as string }));
  } catch {
    // Không có mạng lúc build thì để ISR lo — không làm hỏng build.
    return [];
  }
}

export const revalidate = 3600;
export const dynamicParams = true;

/**
 * ĐÂY LÀ ĐIỂM MẤU CHỐT CỦA CẢ CUỘC MIGRATE.
 *
 * Bản Vite cũ set meta tag bằng react-helmet ở phía client. Crawler của
 * Facebook và Zalo không chạy JS, nên mọi link tour share lên mạng xã hội đều
 * hiện title và ảnh của trang chủ. Giờ meta tag nằm sẵn trong HTML server trả về.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTour(slug);

  if (!tour) {
    return {
      title: "Không tìm thấy tour",
      robots: { index: false, follow: false },
    };
  }

  const title = `${tour.title} | Vinh Around Travel`;
  const description =
    tour.description?.slice(0, 160) ||
    `Khám phá ${tour.title} cùng Vinh Around - Private tour cao cấp với xe riêng và lịch trình tùy chỉnh.`;
  const image = tour.image_url || DEFAULT_OG_IMAGE;
  const path = `/tour/${tour.slug ?? slug}`;

  return {
    title,
    description,
    keywords: [
      tour.title,
      "private tour",
      "vinh around",
      "du lịch cao cấp",
      tour.route ?? "",
    ].filter(Boolean),
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: absoluteUrl(path),
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: tour.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = await getTour(slug);

  if (!tour) notFound();

  const path = `/tour/${tour.slug ?? slug}`;
  const image = tour.image_url || FALLBACK_IMAGE;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: tour.title,
      description: tour.description || `Khám phá ${tour.title} cùng Vinh Around`,
      image,
      url: absoluteUrl(path),
      duration: tour.duration,
      offers: {
        "@type": "Offer",
        price: tour.price || "Liên hệ",
        priceCurrency: "VND",
      },
      itinerary: tour.stops.map((stop, i) => ({
        "@type": "Place",
        name: stop,
        position: i + 1,
      })),
      provider: ORGANIZATION,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Trang chủ", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Tour", item: absoluteUrl("/#tours") },
        { "@type": "ListItem", position: 3, name: tour.title, item: absoluteUrl(path) },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Image */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <Image
            src={image}
            alt={tour.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />

          <div className="absolute top-6 left-6 z-10">
            <Link href="/">
              <Button
                variant="outline"
                className="glass-effect border-white/40 text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Về trang chủ
              </Button>
            </Link>
          </div>

          <div className="absolute top-6 right-6 z-10">
            <ShareButton title={tour.title} description={tour.description ?? undefined} />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto max-w-4xl">
              {tour.tagline && (
                <p className="text-secondary text-sm md:text-base font-semibold mb-2">
                  {tour.tagline}
                </p>
              )}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-3">
                {tour.title}
              </h1>
              {tour.route && (
                <p className="text-white/80 text-lg md:text-xl">{tour.route}</p>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-4xl px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {tour.duration && (
              <div className="glass-effect p-5 rounded-xl border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Thời gian</p>
                </div>
                <p className="text-xl font-bold text-primary">{tour.duration}</p>
              </div>
            )}

            {tour.price && (
              <div className="glass-effect p-5 rounded-xl border border-secondary/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-secondary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Giá từ</p>
                </div>
                <p className="text-xl font-bold text-secondary">{tour.price}</p>
              </div>
            )}

            {tour.stops.length > 0 && (
              <div className="glass-effect p-5 rounded-xl border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Điểm đến</p>
                </div>
                <p className="text-xl font-bold text-primary">
                  {tour.stops.length} địa điểm
                </p>
              </div>
            )}
          </div>

          {tour.description && (
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-4">
                Về chuyến đi này
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                {tour.description}
              </p>
            </div>
          )}

          {tour.stops.length > 0 && (
            <div className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-3">
                  Lịch trình chi tiết
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Hành trình được thiết kế tỉ mỉ với {tour.stops.length} điểm đến đặc biệt
                </p>
              </div>

              <div className="space-y-6">
                {tour.stops.map((stop, index) => (
                  <div key={index} className="flex gap-4 md:gap-6">
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-secondary via-accent to-secondary flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg">
                          {index + 1}
                        </div>
                        <div className="absolute inset-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-secondary to-accent opacity-20 blur-md" />
                      </div>
                      {index < tour.stops.length - 1 && (
                        <div className="w-1 flex-1 bg-gradient-to-b from-secondary via-accent/50 to-accent/30 my-3 rounded-full" />
                      )}
                    </div>

                    <div className="flex-1 pb-2">
                      <div className="group glass-effect p-6 md:p-7 rounded-2xl border border-primary/10 hover:border-secondary/40 transition-all duration-300 hover:shadow-xl hover:shadow-secondary/10 hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <MapPin className="w-6 h-6 text-secondary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                              {stop}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="w-2 h-2 rounded-full bg-secondary" />
                              <span>Điểm dừng thứ {index + 1} trong hành trình</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 glass-effect p-6 rounded-2xl border border-primary/10 bg-gradient-to-br from-background to-primary/5">
                <div className="flex items-center justify-center gap-3 text-primary">
                  <div className="w-px h-12 bg-gradient-to-b from-transparent via-primary to-transparent" />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Tổng điểm đến</p>
                    <p className="text-3xl font-bold">{tour.stops.length}</p>
                  </div>
                  <div className="w-px h-12 bg-gradient-to-b from-transparent via-primary to-transparent" />
                </div>
              </div>
            </div>
          )}

          <div className="glass-effect p-8 rounded-2xl border border-secondary/20 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-3">
              Sẵn sàng khám phá?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Liên hệ ngay để nhận tư vấn chi tiết và đặt lịch cho chuyến đi của bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <BookingCta tourTitle={tour.title} />
              <Link href="/">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Xem tour khác
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
