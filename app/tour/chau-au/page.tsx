import type { Metadata } from "next";
import MarketLandingPage from "@/components/tour/MarketLandingPage";
import { createPublicClient } from "@/lib/supabase/server";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

const TITLE = "Private Tour Châu Âu Gia Đình - Đa Quốc Gia, Xe Riêng";
const DESCRIPTION =
  "Private tour Châu Âu cho gia đình Việt — Vinh lo hết logistics qua nhiều nước, xe riêng, lịch trình tùy chỉnh, không shopping stop.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["private tour châu âu", "tour châu âu gia đình"],
  alternates: { canonical: "/tour/chau-au" },
  openGraph: {
    type: "website",
    url: absoluteUrl("/tour/chau-au"),
    title: `${TITLE} | Vinh Around`,
    description: DESCRIPTION,
  },
};

export const revalidate = 3600;

export default async function ChauAuMarketPage() {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("tour_packages")
    .select("slug, title, tagline, route, duration, price, image_url")
    .eq("is_active", true)
    .eq("destination", "chau-au")
    .order("order_index", { ascending: true });

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tour", item: absoluteUrl("/tour") },
      { "@type": "ListItem", position: 3, name: "Châu Âu", item: absoluteUrl("/tour/chau-au") },
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
          heroImage: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1600&q=80",
          heroHeadline: "Đi Châu Âu nhiều nước — không lo lạc đường, đổi tiền, xin visa",
          heroSubtext:
            "Paris, Rome, Zurich và hơn thế — Vinh lo hết logistics qua biên giới, bạn chỉ cần tận hưởng.",
          valueProps: [
            {
              title: "Đa quốc gia, một hành trình",
              desc: "Di chuyển qua nhiều nước Châu Âu phức tạp hơn bạn nghĩ — biên giới, đổi tiền, phương tiện khác nhau. Vinh lo hết để bạn không phải tính toán.",
            },
            {
              title: "Không shopping stop",
              desc: "Xe riêng, lịch trình theo nhịp gia đình bạn — tập trung trải nghiệm văn hoá, ẩm thực thật.",
            },
            {
              title: "Hợp gia đình đa thế hệ",
              desc: "Lịch trình cân bằng giữa tham quan và nghỉ ngơi — ông bà, bố mẹ, con nhỏ đều theo kịp.",
            },
          ],
          faqs: [
            {
              question: "Visa Châu Âu (Schengen) có khó không?",
              answer:
                "Visa Schengen cho phép đi nhiều nước cùng lúc nhưng hồ sơ cần chuẩn bị kỹ. Vinh hỗ trợ tư vấn khi bạn đăng ký tour.",
            },
            {
              question: "Đi qua nhiều nước có mệt không?",
              answer:
                "Lịch trình được thiết kế để không phải di chuyển liên tục — mỗi điểm dừng đủ thời gian nghỉ ngơi trước khi qua nước tiếp theo.",
            },
            {
              question: "Chi phí tour Châu Âu gia đình 4-6 người khoảng bao nhiêu?",
              answer:
                "Tùy số nước và số ngày, dao động 180-500 triệu cho cả đoàn. Nhắn Zalo để Vinh báo giá theo lịch trình cụ thể.",
            },
          ],
          leadDestination: "europe",
          tours: data ?? [],
        }}
      />
    </>
  );
}
