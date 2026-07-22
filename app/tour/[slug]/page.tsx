import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Clock, Users, CalendarClock, Check, X as XIcon, MessageCircle } from "lucide-react";
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
import TestimonialGallery, { type TestimonialData } from "@/components/testimonials/TestimonialGallery";
import BlogCard from "@/components/blog/BlogCard";
import { createPublicClient } from "@/lib/supabase/server";
import { ORGANIZATION, absoluteUrl } from "@/lib/seo";
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
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  gallery_urls: string[];
  faqs: Faq[];
  price_from: number | null;
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
    gallery_urls: Array.isArray(data.gallery_urls) ? data.gallery_urls : [],
    faqs: Array.isArray(data.faqs) ? (data.faqs as unknown as Faq[]) : [],
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
  const title = tour.title;
  const ogTitle = `${tour.title} | Vinh Around Travel`;
  const description =
    tour.description?.slice(0, 160) ||
    `Khám phá ${tour.title} cùng Vinh Around - Private tour cao cấp với xe riêng và lịch trình tùy chỉnh.`;
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

          <div className="absolute top-20 md:top-24 right-6 z-10">
            <ShareButton title={tour.title} description={tour.description ?? undefined} />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto max-w-6xl">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span className="text-white text-xs font-bold uppercase tracking-wide">
                  Private 100% · Không shopping stop
                </span>
              </div>
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

        {/* Content + sidebar */}
        <div className="container mx-auto max-w-6xl px-6 py-12 md:py-16">
          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12 xl:gap-16 lg:items-start">
            {/* Cột nội dung chính */}
            <div className="max-w-4xl">
              {/* Quick facts — chỉ hiện trên mobile, desktop đã có sidebar sticky */}
              <div className="grid grid-cols-2 gap-3 mb-8 lg:hidden">
                {tour.duration && (
                  <div className="glass-effect p-4 rounded-xl border border-primary/20">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Clock className="w-4 h-4 text-primary" />
                      <p className="text-xs text-muted-foreground">Thời gian</p>
                    </div>
                    <p className="text-base font-bold text-primary">{tour.duration}</p>
                  </div>
                )}
                {tour.price && (
                  <div className="glass-effect p-4 rounded-xl border border-secondary/20">
                    <div className="flex items-center gap-2 mb-1.5">
                      <p className="text-xs text-muted-foreground">Giá từ</p>
                    </div>
                    <p className="text-base font-bold text-secondary">{tour.price}</p>
                  </div>
                )}
                {tour.max_group_size && (
                  <div className="glass-effect p-4 rounded-xl border border-primary/20">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Users className="w-4 h-4 text-primary" />
                      <p className="text-xs text-muted-foreground">Cỡ nhóm tối đa</p>
                    </div>
                    <p className="text-base font-bold text-primary">{tour.max_group_size} khách</p>
                  </div>
                )}
                {tour.departure_note && (
                  <div className="glass-effect p-4 rounded-xl border border-secondary/20">
                    <div className="flex items-center gap-2 mb-1.5">
                      <CalendarClock className="w-4 h-4 text-secondary" />
                      <p className="text-xs text-muted-foreground">Khởi hành</p>
                    </div>
                    <p className="text-sm font-bold text-secondary">{tour.departure_note}</p>
                  </div>
                )}
              </div>

              {tour.price && (
                <p className="text-muted-foreground text-xs mb-8 lg:hidden -mt-4">
                  Giá tham khảo cho tối thiểu 4 khách, ngày thường — Vinh gửi báo giá chính xác sau khi kiểm tra vé và dịch vụ thực tế.
                </p>
              )}

              {/* Điểm nổi bật — lấy từ chính danh sách "bao gồm", giúp lướt nhanh */}
              {highlights.length > 0 && (
                <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10 pb-8 border-b border-primary/10">
                  {highlights.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-primary/80">
                      <div className="w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-secondary" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              )}

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

              {/* Lịch trình ngày-theo-ngày — dữ liệu mới, ưu tiên khi có */}
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

                  <div className="relative">
                    <div className="absolute left-5 top-2 bottom-2 w-px bg-primary/10" aria-hidden />
                    <Accordion type="single" collapsible defaultValue="day-1" className="space-y-3">
                      {tour.itinerary.map((day) => (
                        <AccordionItem
                          key={day.day}
                          value={`day-${day.day}`}
                          className="relative glass-effect rounded-2xl border border-primary/10 pl-4 pr-5 md:pl-5 md:pr-6"
                        >
                          <AccordionTrigger className="hover:no-underline py-5">
                            <div className="flex items-center gap-4 text-left">
                              <div className="relative z-10 w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white font-bold ring-4 ring-background">
                                {day.day}
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground font-medium">Ngày {day.day}</p>
                                <h3 className="text-base md:text-lg font-bold text-foreground">{day.title}</h3>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pb-6 pl-14">
                            {day.image_url && (
                              <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden mb-4">
                                <Image
                                  src={day.image_url}
                                  alt={day.title}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 800px"
                                  className="object-cover"
                                />
                              </div>
                            )}
                            {day.description && (
                              <p className="text-foreground/80 leading-relaxed whitespace-pre-line mb-4">
                                {day.description}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              {day.meals && <span>🍽 {day.meals}</span>}
                              {day.hotel && <span>🏨 {day.hotel}</span>}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
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
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {tour.gallery_urls.map((url, i) => (
                      <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                        <Image
                          src={url}
                          alt={`${tour.title} - ảnh ${i + 1}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bao gồm / Không bao gồm */}
              {(tour.inclusions.length > 0 || tour.exclusions.length > 0) && (
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {tour.inclusions.length > 0 && (
                    <div className="glass-effect p-6 rounded-2xl border border-primary/10">
                      <h3 className="font-display text-lg font-bold text-primary mb-4">Bao gồm</h3>
                      <ul className="space-y-2.5">
                        {tour.inclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                            <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tour.exclusions.length > 0 && (
                    <div className="glass-effect p-6 rounded-2xl border border-primary/10">
                      <h3 className="font-display text-lg font-bold text-primary mb-4">Không bao gồm</h3>
                      <ul className="space-y-2.5">
                        {tour.exclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                            <XIcon className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
                  <div className="relative aspect-video rounded-2xl overflow-hidden max-w-3xl mx-auto glass-effect border border-primary/10">
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
                        className="glass-effect rounded-xl border border-primary/10 px-5"
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

              <div className="glass-effect p-8 rounded-2xl border border-secondary/20 text-center">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-3">
                  Sẵn sàng khám phá?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Liên hệ ngay để nhận tư vấn chi tiết và đặt lịch cho chuyến đi của bạn
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <BookingCta tourTitle={tour.title} destination={tour.destination} />
                  <Link href="/tour">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Xem tour khác
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar sticky — chỉ desktop, luôn hiện giá + nút liên hệ khi cuộn */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 glass-effect rounded-2xl border border-primary/10 p-6 shadow-lg shadow-primary/5">
                {tour.price && (
                  <>
                    <p className="text-sm text-muted-foreground mb-1">Giá từ</p>
                    <p className="text-3xl font-bold text-secondary mb-1.5">{tour.price}</p>
                    <p className="text-xs text-muted-foreground mb-5">
                      Tham khảo cho tối thiểu 4 khách, ngày thường
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
                  className="w-full bg-gradient-to-r from-secondary via-accent to-secondary text-white font-bold"
                />

                <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mt-3">
                  <MessageCircle className="w-3.5 h-3.5" />
                  Vinh trả lời Zalo trong ngày
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
