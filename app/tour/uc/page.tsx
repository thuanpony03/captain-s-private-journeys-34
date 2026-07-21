import type { Metadata } from "next";
import MarketLandingPage from "@/components/tour/MarketLandingPage";
import { createPublicClient } from "@/lib/supabase/server";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

const TITLE = "Private Tour Úc Gia Đình - Great Ocean Road, Xe Riêng";
const DESCRIPTION =
  "Private tour Úc cho gia đình Việt — gần, dễ xin visa, hợp cả ông bà lẫn trẻ nhỏ. Xe riêng, lịch trình tùy chỉnh cùng Vinh Around.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["private tour úc", "tour úc gia đình", "du lịch úc gia đình"],
  alternates: { canonical: "/tour/uc" },
  openGraph: {
    type: "website",
    url: absoluteUrl("/tour/uc"),
    title: `${TITLE} | Vinh Around`,
    description: DESCRIPTION,
  },
};

export const revalidate = 3600;

export default async function UcMarketPage() {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("tour_packages")
    .select("slug, title, tagline, route, duration, price, image_url")
    .eq("is_active", true)
    .eq("destination", "uc")
    .order("order_index", { ascending: true });

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .eq("status", "published")
    .eq("destination", "australia")
    .limit(6);

  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, featured_image, category, destination, reading_time, published_at")
    .eq("status", "published")
    .eq("category", "cam-nang")
    .eq("destination", "uc")
    .limit(3);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tour", item: absoluteUrl("/tour") },
      { "@type": "ListItem", position: 3, name: "Úc", item: absoluteUrl("/tour/uc") },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <MarketLandingPage
        config={{
          heroImage: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1600&q=80",
          heroHeadline: "Đi Úc cùng cả nhà — gần, dễ, không mệt",
          heroSubtext:
            "Great Ocean Road, Sydney, Melbourne — lịch trình nhẹ nhàng, hợp cả ông bà lẫn các bé.",
          valueProps: [
            {
              title: "Visa dễ hơn Mỹ, Châu Âu",
              desc: "Thủ tục visa Úc thường thuận lợi hơn — thời gian chuẩn bị ngắn, phù hợp gia đình muốn đi trong vài tháng tới.",
            },
            {
              title: "Bay gần, ít lệch múi giờ",
              desc: "Thời gian bay ngắn hơn Mỹ/Châu Âu, phù hợp người lớn tuổi và trẻ nhỏ — đỡ mệt hơn hẳn.",
            },
            {
              title: "Không shopping stop",
              desc: "Xe riêng, lịch trình theo nhịp gia đình bạn — tập trung trải nghiệm, không ép vào cửa hàng.",
            },
          ],
          faqs: [
            {
              question: "Visa Úc có khó không?",
              answer:
                "Nhìn chung thuận lợi hơn Mỹ và Châu Âu với hồ sơ đầy đủ. Vinh hỗ trợ tư vấn chuẩn bị hồ sơ khi bạn đăng ký tour.",
            },
            {
              question: "Mùa nào đẹp để đi Úc?",
              answer:
                "Tháng 9-11 (mùa xuân) và tháng 3-5 (mùa thu) thời tiết dễ chịu nhất, tránh nắng gắt mùa hè Úc (tháng 12-2).",
            },
            {
              question: "Chi phí tour Úc gia đình 4 người khoảng bao nhiêu?",
              answer:
                "Tùy số ngày và lịch trình, dao động 120-350 triệu cho cả đoàn. Nhắn Zalo để Vinh báo giá theo nhu cầu cụ thể.",
            },
          ],
          leadDestination: "australia",
          tours: data ?? [],
          testimonials: testimonials ?? [],
          relatedPosts: relatedPosts ?? [],
        }}
      />
    </>
  );
}
