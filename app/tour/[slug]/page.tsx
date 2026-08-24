import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { marked } from "marked";
import {
  MapPin,
  Clock,
  Users,
  CalendarClock,
  Check,
  X as XIcon,
  MessageCircle,
  Car,
  ShieldCheck,
  Utensils,
  BedDouble,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShareButton, BookingCta } from "@/components/tour/TourActions";
import TourViewTracker from "@/components/tour/TourViewTracker";
import TourJourneyRoute from "@/components/tour/TourJourneyRoute";
import TestimonialGallery, { type TestimonialData } from "@/components/testimonials/TestimonialGallery";
import BlogCard from "@/components/blog/BlogCard";
import { createPublicClient } from "@/lib/supabase/server";
import { ORGANIZATION, absoluteUrl, truncateAtWord } from "@/lib/seo";
import type { BlogPostSummary } from "@/lib/blog";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1200&q=80";

interface ItineraryDay {
  day: number;
  title: string;
  description?: string;
  image_url?: string;
  meals?: string;
  hotel?: string;
}

interface Faq {
  question: string;
  answer: string;
}

interface CancellationPolicy {
  deposit: string;
  tiers: { time: string; rate: string }[];
}

interface Tour {
  id: string;
  title: string;
  meta_title: string | null;
  meta_description: string | null;
  tagline: string | null;
  route: string | null;
  description: string | null;
  updated_at: string | null;
  duration: string | null;
  price: string | null;
  image_url: string | null;
  slug: string | null;
  stops: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  requirements: string[];
  gallery_urls: string[];
  faqs: Faq[];
  price_from: number | null;
  price_currency: string | null;
  cancellation_policy: CancellationPolicy | null;
  departure_note: string | null;
  max_group_size: number | null;
  video_url: string | null;
  destination: string | null;
  related_story_slugs: string[];
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
    itinerary: Array.isArray(data.itinerary) ? (data.itinerary as unknown as ItineraryDay[]) : [],
    inclusions: Array.isArray(data.inclusions) ? data.inclusions : [],
    exclusions: Array.isArray(data.exclusions) ? data.exclusions : [],
    requirements: Array.isArray(data.requirements) ? data.requirements : [],
    gallery_urls: Array.isArray(data.gallery_urls) ? data.gallery_urls : [],
    faqs: Array.isArray(data.faqs) ? (data.faqs as unknown as Faq[]) : [],
    cancellation_policy: (data.cancellation_policy as unknown as CancellationPolicy) ?? null,
    related_story_slugs: Array.isArray(data.related_story_slugs) ? data.related_story_slugs : [],
  };
}

async function getTourTestimonials(tourSlug: string, destination: string | null): Promise<TestimonialData[]> {
  const supabase = createPublicClient();
  let query = supabase.from("testimonials").select("*").eq("status", "published").limit(6);

  query = destination
    ? query.or(`tour_slug.eq.${tourSlug},destination.eq.${destination}`)
    : query.eq("tour_slug", tourSlug);

  const { data } = await query;
  return (data ?? []) as TestimonialData[];
}

async function getRelatedStories(slugs: string[]): Promise<BlogPostSummary[]> {
  if (slugs.length === 0) return [];
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, featured_image, category, destination, reading_time, published_at")
    .in("slug", slugs)
    .eq("status", "published");
  return (data ?? []) as BlogPostSummary[];
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

  // title đi qua template "%s | Vinh Around" của root layout — không tự thêm brand ở đây
  // kẻo bị lặp "Vinh Around" 2 lần. OG/Twitter không dùng template nên cần bản đầy đủ riêng.
  // meta_title/meta_description (khi có) cho phép tối ưu thẻ <title>/description theo từ khoá
  // mà không phải đổi luôn H1/mô tả hiển thị trên trang (tour.title/tour.description).
  const title = tour.meta_title || tour.title;
  const ogTitle = `${title} | Vinh Around Travel`;
  const description =
    tour.meta_description ||
    (tour.description ? truncateAtWord(tour.description, 160) : null) ||
    `Khám phá ${tour.title} cùng Vinh Around - Private tour cao cấp với xe riêng và lịch trình tùy chỉnh.`;
  const path = `/tour/${tour.slug ?? slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    // Ảnh trỏ về app/og/tour/[slug]/route.tsx — ImageResponse có tên tour + giá,
    // thiết kế riêng thay vì ảnh gốc. (File convention opengraph-image.tsx + edge
    // runtime bị lỗi 500 trên OpenNext Cloudflare nên dùng Route Handler thường.)
    openGraph: {
      type: "article",
      url: absoluteUrl(path),
      title: ogTitle,
      description,
      images: [{ url: absoluteUrl(`/og/tour/${tour.slug ?? slug}`), width: 1200, height: 630, alt: tour.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [absoluteUrl(`/og/tour/${tour.slug ?? slug}`)],
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
  const [testimonials, relatedStories] = await Promise.all([
    getTourTestimonials(tour.slug ?? slug, tour.destination),
    getRelatedStories(tour.related_story_slugs),
  ]);

  const highlights = tour.inclusions.slice(0, 4);
  const isSelfDrive = tour.requirements.length > 0;
  const updatedLabel = tour.updated_at
    ? new Date(tour.updated_at).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : null;

  // Offer.price theo schema.org phải là số thuần — bỏ hẳn khối offers khi chưa có giá thật
  // (vd tour "Liên hệ") thay vì nhét chuỗi "Liên hệ" vào field số, dễ bị Rich Results từ chối.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: tour.title,
      description: tour.description || `Khám phá ${tour.title} cùng Vinh Around`,
      image,
      url: absoluteUrl(path),
      duration: tour.duration,
      dateModified: tour.updated_at || undefined,
      ...(tour.price_from
        ? {
            offers: {
              "@type": "Offer",
              price: tour.price_from,
              priceCurrency: tour.price_currency || "VND",
              availability: "https://schema.org/LimitedAvailability",
            },
          }
        : {}),
      itinerary:
        tour.itinerary.length > 0
          ? tour.itinerary.map((day) => ({
              "@type": "Place",
              name: day.title,
              description: day.description || undefined,
              position: day.day,
            }))
          : tour.stops.map((stop, i) => ({
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
        { "@type": "ListItem", position: 2, name: "Tour", item: absoluteUrl("/tour") },
        { "@type": "ListItem", position: 3, name: tour.title, item: absoluteUrl(path) },
      ],
    },
    ...(tour.faqs.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: tour.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]
      : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TourViewTracker tourName={tour.title} />
      <Navbar />

      <div className="min-h-screen bg-background">
        {/* Hero — cinematic, ken-burns zoom, badges + tiêu đề */}
        <div className="relative h-[64vh] md:h-[78vh] overflow-hidden">
          <Image
            src={image}
            alt={tour.title}
            fill
            priority
            sizes="100vw"
            className="object-cover animate-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/55 to-primary/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

          <div className="absolute top-20 md:top-24 right-6 z-10">
            <ShareButton title={tour.title} description={tour.description ?? undefined} />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 pb-20 md:pb-28">
            <div className="container mx-auto max-w-6xl">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span className="text-white text-xs font-bold uppercase tracking-wide">
                    Private 100% · Không shopping stop
                  </span>
                </div>
                {isSelfDrive && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/90 backdrop-blur-sm">
                    <Car className="w-3.5 h-3.5 text-primary" />
                    <span className="text-primary text-xs font-bold uppercase tracking-wide">Caravan tự lái</span>
                  </div>
                )}
                {tour.max_group_size !== null && tour.max_group_size <= 6 && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
                    <Users className="w-3.5 h-3.5 text-white" />
                    <span className="text-white text-xs font-bold uppercase tracking-wide">
                      Giới hạn {tour.max_group_size} khách/đoàn
                    </span>
                  </div>
                )}
              </div>
              {tour.tagline && (
                <p className="text-secondary text-sm md:text-base font-semibold mb-2">
                  {tour.tagline}
                </p>
              )}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-3 leading-[1.05]">
                {tour.title}
              </h1>
              {tour.route && (
                <p className="text-white/80 text-lg md:text-xl">{tour.route}</p>
              )}
              {updatedLabel && (
                <p className="text-white/50 text-xs mt-2">Cập nhật: {updatedLabel}</p>
              )}
            </div>
          </div>
        </div>

        {/* Thẻ nổi — thay cho ô "quick facts" cũ, hiện xuyên suốt mọi kích thước màn hình */}
        <div className="relative z-20 -mt-14 md:-mt-16 px-4 md:px-6 mb-10 md:mb-14">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl shadow-primary/10 border border-primary/5 px-5 py-5 md:px-10 md:py-6">
              <div className="grid grid-cols-2 md:flex md:items-center md:justify-between gap-5 md:gap-6">
                {tour.duration && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground">Thời gian</p>
                      <p className="text-sm font-bold text-primary">{tour.duration}</p>
                    </div>
                  </div>
                )}
                <div className="hidden md:block w-px h-9 bg-primary/10" aria-hidden />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground">Hành trình</p>
                    <p className="text-sm font-bold text-primary">{tour.stops.length || tour.itinerary.length} chặng</p>
                  </div>
                </div>
                <div className="hidden md:block w-px h-9 bg-primary/10" aria-hidden />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground">Quy mô</p>
                    <p className="text-sm font-bold text-primary">
                      {tour.max_group_size ? `Tối đa ${tour.max_group_size} khách` : "Riêng theo đoàn"}
                    </p>
                  </div>
                </div>
                {tour.price && (
                  <>
                    <div className="hidden md:block w-px h-9 bg-primary/10" aria-hidden />
                    <div className="col-span-2 md:col-span-1 flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-primary/10">
                      <p className="text-[11px] text-muted-foreground md:hidden">Giá từ</p>
                      <p className="text-xl md:text-2xl font-display font-bold text-secondary whitespace-nowrap">
                        {tour.price}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dải hành trình trực quan theo từng chặng */}
        <TourJourneyRoute stops={tour.stops} />

        {/* Content + sidebar */}
        <div className="container mx-auto max-w-6xl px-6 pt-12 md:pt-16 pb-12 md:pb-16">
          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12 xl:gap-16 lg:items-start">
            {/* Cột nội dung chính */}
            <div className="max-w-4xl">
              {/* Điểm nổi bật — lấy từ chính danh sách "bao gồm", giúp lướt nhanh */}
              {highlights.length > 0 && (
                <div className="flex flex-wrap gap-2.5 mb-10">
                  {highlights.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 pl-2 pr-4 py-2 rounded-full bg-secondary/10 border border-secondary/20"
                    >
                      <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm font-semibold text-primary">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {tour.description && (
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-4">
                    Về chuyến đi này
                  </h2>
                  <p
                    className="text-lg text-foreground/80 leading-relaxed whitespace-pre-line [&_strong]:text-primary [&_strong]:font-semibold"
                    dangerouslySetInnerHTML={{
                      __html: marked.parseInline(tour.description, { async: false }) as string,
                    }}
                  />
                </div>
              )}

              {/* Lịch trình ngày-theo-ngày — hiện đủ ngay, không cần bấm mở từng ngày */}
              {tour.itinerary.length > 0 && (
                <div className="mb-12">
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-3">
                      Lịch trình chi tiết
                    </h2>
                    <p className="text-muted-foreground">
                      {tour.itinerary.length} ngày — Vinh điều chỉnh lại theo đúng nhu cầu gia đình bạn
                    </p>
                  </div>

                  <div className="space-y-5 md:space-y-7">
                    {tour.itinerary.map((day, idx) => {
                      const flip = idx % 2 === 1;
                      return (
                        <div
                          key={day.day}
                          className="bg-white rounded-2xl md:rounded-3xl border border-primary/10 shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
                        >
                          <div className="md:grid md:grid-cols-2">
                            <div
                              className={`relative aspect-[16/10] md:aspect-auto md:min-h-[280px] ${
                                flip ? "md:order-2" : "md:order-1"
                              }`}
                            >
                              {day.image_url ? (
                                <Image
                                  src={day.image_url}
                                  alt={day.title}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 45vw"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                                  <span className="font-display font-bold text-white/15 text-8xl">{day.day}</span>
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent md:bg-gradient-to-t md:from-black/35 md:via-transparent" />
                              <div className="absolute top-4 left-4 w-11 h-11 rounded-full bg-secondary text-primary font-display font-bold flex items-center justify-center shadow-lg text-lg">
                                {day.day}
                              </div>
                              <p className="absolute bottom-3 left-4 text-white text-xs font-bold uppercase tracking-widest md:hidden">
                                Ngày {day.day}
                              </p>
                            </div>
                            <div
                              className={`p-6 md:p-8 flex flex-col justify-center ${flip ? "md:order-1" : "md:order-2"}`}
                            >
                              <p className="hidden md:block text-xs uppercase tracking-widest text-secondary font-bold mb-2">
                                Ngày {day.day}
                              </p>
                              <h3 className="text-xl md:text-2xl font-display font-bold text-primary mb-3">
                                {day.title}
                              </h3>
                              {day.description && (
                                <p className="text-foreground/75 leading-relaxed whitespace-pre-line mb-4">
                                  {day.description}
                                </p>
                              )}
                              <div className="flex flex-wrap gap-2">
                                {day.meals && (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/5 text-primary/70 text-xs font-medium">
                                    <Utensils className="w-3 h-3" /> {day.meals}
                                  </span>
                                )}
                                {day.hotel && (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/5 text-primary/70 text-xs font-medium">
                                    <BedDouble className="w-3 h-3" /> {day.hotel}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Fallback: tour chưa có itinerary chi tiết, hiện danh sách điểm dừng cũ */}
              {tour.itinerary.length === 0 && tour.stops.length > 0 && (
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
                          <div className="group bg-white p-6 md:p-7 rounded-2xl border border-primary/10 shadow-sm hover:border-secondary/40 transition-all duration-300 hover:shadow-xl hover:shadow-secondary/10 hover:-translate-y-1">
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
                </div>
              )}

              {/* CTA giữa trang — sau khi khách đã đọc mô tả + lịch trình */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 p-5 rounded-2xl bg-secondary/10 border border-secondary/20">
                <p className="text-primary/80 text-sm md:text-base font-medium text-center sm:text-left">
                  Ưng lịch trình này? Nhắn Vinh để được tư vấn theo đúng số người và ngày của gia đình bạn.
                </p>
                <BookingCta
                  tourTitle={tour.title}
                  destination={tour.destination}
                  label="Hỏi Vinh về tour này"
                  className="bg-primary text-white font-bold whitespace-nowrap"
                />
              </div>

              {/* Gallery ảnh thật từ các chuyến Vinh đã dẫn — không phải minh hoạ đúng 1:1 từng điểm dừng trên */}
              {tour.gallery_urls.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-3 text-center">
                    Khoảnh khắc thật từ các chuyến Vinh đã dẫn
                  </h2>
                  <p className="text-muted-foreground text-sm text-center max-w-xl mx-auto mb-6">
                    Ảnh chụp từ những gia đình và cung đường Vinh từng trực tiếp cầm lái — lịch trình của bạn sẽ được thiết kế riêng, không rập khuôn.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4 md:h-[420px]">
                    {tour.gallery_urls.map((url, i) => (
                      <div
                        key={i}
                        className={`group relative rounded-xl overflow-hidden ${
                          i === 0
                            ? "col-span-2 row-span-2 aspect-square md:aspect-auto"
                            : "aspect-[4/3] md:aspect-auto md:h-full"
                        }`}
                      >
                        <Image
                          src={url}
                          alt={`${tour.title} - ảnh ${i + 1}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bao gồm / Không bao gồm */}
              {(tour.inclusions.length > 0 || tour.exclusions.length > 0) && (
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {tour.inclusions.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                      <h3 className="font-display text-lg font-bold text-primary mb-4">Bao gồm</h3>
                      <ul className="space-y-3">
                        {tour.inclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                            <div className="w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-secondary" />
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tour.exclusions.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                      <h3 className="font-display text-lg font-bold text-primary mb-4">Không bao gồm</h3>
                      <ul className="space-y-3">
                        {tour.exclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                            <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                              <XIcon className="w-3 h-3 text-muted-foreground" />
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Yêu cầu tham gia — chỉ hiện với tour có yêu cầu riêng (vd tự lái) */}
              {tour.requirements.length > 0 && (
                <div className="bg-secondary/5 p-6 rounded-2xl border border-secondary/20 mb-12">
                  <div className="flex items-center gap-2.5 mb-4">
                    <Car className="w-5 h-5 text-secondary" />
                    <h3 className="font-display text-lg font-bold text-primary">Yêu cầu tham gia</h3>
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {tour.requirements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted-foreground text-xs mt-4">
                    Đây là hành trình caravan tự lái trải nghiệm — nhiều xe cùng đoàn, có xe Leader dẫn đường — không phải tour truyền thống có tài xế phục vụ xuyên suốt.
                  </p>
                </div>
              )}

              {/* Chính sách cọc & hoàn hủy riêng của tour — chỉ hiện khi khác chính sách chung */}
              {tour.cancellation_policy && (
                <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm mb-12">
                  <div className="flex items-center gap-2.5 mb-3">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <h3 className="font-display text-lg font-bold text-primary">Đặt cọc &amp; chính sách hoàn hủy</h3>
                  </div>
                  <p className="text-sm text-foreground/70 mb-4">{tour.cancellation_policy.deposit}</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b-2 border-primary/10">
                          <th className="text-left py-2 pr-4 font-display text-primary">Thời điểm hủy</th>
                          <th className="text-left py-2 font-display text-primary">Mức áp dụng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tour.cancellation_policy.tiers.map((row) => (
                          <tr key={row.time} className="border-b border-primary/5">
                            <td className="py-2.5 pr-4 text-foreground/80">{row.time}</td>
                            <td className="py-2.5 text-foreground/70">{row.rate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-muted-foreground text-xs mt-3">
                    Điều khoản riêng cho tour này — xem chính sách chung tại{" "}
                    <Link href="/chinh-sach" className="text-secondary underline">
                      trang Chính sách
                    </Link>
                    .
                  </p>
                </div>
              )}

              {/* CTA giữa trang — sau khi khách đã rõ giá và điều kiện */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 p-5 rounded-2xl bg-secondary/10 border border-secondary/20">
                <p className="text-primary/80 text-sm md:text-base font-medium text-center sm:text-left">
                  Còn thắc mắc về chi phí hay lịch trình? Nhắn Zalo, Vinh trả lời trong ngày.
                </p>
                <BookingCta
                  tourTitle={tour.title}
                  destination={tour.destination}
                  label="Nhắn Zalo cho Vinh"
                  className="bg-primary text-white font-bold whitespace-nowrap"
                />
              </div>

              {/* Video vlog cùng tuyến */}
              {tour.video_url && (
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-6 text-center">
                    Video chuyến đi thật
                  </h2>
                  <div className="relative aspect-video rounded-2xl overflow-hidden max-w-3xl mx-auto bg-white border border-primary/10 shadow-sm">
                    <iframe
                      src={tour.video_url}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Review của gia đình đã đi đúng tuyến này */}
              {testimonials.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-6 text-center">
                    Gia đình đã đi tuyến này nói gì
                  </h2>
                  <TestimonialGallery testimonials={testimonials} />
                </div>
              )}

              {/* Bài viết chuyến đi thật cùng tuyến */}
              {relatedStories.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-6 text-center">
                    Câu chuyện chuyến đi cùng tuyến
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {relatedStories.map((story) => (
                      <BlogCard key={story.slug} post={story} basePath="chuyen-di" />
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ riêng của tour */}
              {tour.faqs.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-6 text-center">
                    Câu hỏi thường gặp
                  </h2>
                  <Accordion type="single" collapsible className="max-w-2xl mx-auto space-y-3">
                    {tour.faqs.map((faq, i) => (
                      <AccordionItem
                        key={i}
                        value={`faq-${i}`}
                        className="bg-white rounded-xl border border-primary/10 shadow-sm px-5"
                      >
                        <AccordionTrigger className="hover:no-underline text-left font-semibold text-foreground">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-foreground/70 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}

              <div className="bg-gradient-to-br from-primary to-primary/90 p-8 rounded-2xl text-center">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                  Sẵn sàng khám phá?
                </h2>
                <p className="text-white/70 mb-6 max-w-md mx-auto">
                  Liên hệ ngay để nhận tư vấn chi tiết và đặt lịch cho chuyến đi của bạn
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <BookingCta
                    tourTitle={tour.title}
                    destination={tour.destination}
                    className="bg-gradient-to-r from-secondary via-accent to-secondary text-white font-bold"
                  />
                  <Link href="/tour">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white"
                    >
                      Xem tour khác
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar sticky — chỉ desktop, luôn hiện giá + nút liên hệ khi cuộn */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 bg-white rounded-2xl border border-primary/10 shadow-xl shadow-primary/5 overflow-hidden">
                <div className="p-6">
                  {tour.price && (
                    <>
                      <p className="text-sm text-muted-foreground mb-1">Giá từ</p>
                      <p className="text-3xl font-display font-bold text-secondary mb-1.5">{tour.price}</p>
                      <p className="text-xs text-muted-foreground mb-5">
                        {tour.cancellation_policy
                          ? "Đặt cọc 50% khi ký hợp đồng — xem đầy đủ tiến độ thanh toán bên dưới"
                          : "Tham khảo cho tối thiểu 4 khách, ngày thường"}
                      </p>
                    </>
                  )}

                  <div className="space-y-3 mb-6 text-sm border-t border-primary/10 pt-5">
                    {tour.duration && (
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-primary/60 flex-shrink-0" />
                        <span className="text-foreground/80">{tour.duration}</span>
                      </div>
                    )}
                    {tour.max_group_size && (
                      <div className="flex items-center gap-2.5">
                        <Users className="w-4 h-4 text-primary/60 flex-shrink-0" />
                        <span className="text-foreground/80">Tối đa {tour.max_group_size} khách/đoàn</span>
                      </div>
                    )}
                    {tour.departure_note && (
                      <div className="flex items-start gap-2.5">
                        <CalendarClock className="w-4 h-4 text-primary/60 flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{tour.departure_note}</span>
                      </div>
                    )}
                  </div>

                  <BookingCta
                    tourTitle={tour.title}
                    destination={tour.destination}
                    label="Đặt lịch ngay"
                    className="w-full bg-gradient-to-r from-secondary via-accent to-secondary text-white font-bold shadow-lg shadow-secondary/30 animate-glow-pulse"
                  />

                  <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mt-3">
                    <MessageCircle className="w-3.5 h-3.5" />
                    Vinh trả lời Zalo trong ngày
                  </p>
                </div>
                <div className="bg-primary/[0.03] px-6 py-4 border-t border-primary/10">
                  <div className="flex items-center gap-2 text-xs text-primary/70">
                    <ShieldCheck className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span>Bảo hiểm du lịch quốc tế đi kèm</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
