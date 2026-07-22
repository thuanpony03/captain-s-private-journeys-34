import type { Metadata } from "next";
import MarketLandingPage from "@/components/tour/MarketLandingPage";
import { createPublicClient } from "@/lib/supabase/server";
import { SITE_URL, absoluteUrl } from "@/lib/seo";
import { PILLAR_CANADA } from "@/content/pillars";

const TITLE = "Private Tour Canada Gia Đình - Rocky Mountains, Xe Riêng";
const DESCRIPTION =
  "Private tour Canada cho gia đình Việt — Banff, Rocky Mountains, hồ Peyto. Xe riêng, lịch trình tùy chỉnh cùng Vinh Around, không shopping stop.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tour/canada" },
  openGraph: {
    type: "website",
    url: absoluteUrl("/tour/canada"),
    title: `${TITLE} | Vinh Around`,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Vinh Around`,
    description: DESCRIPTION,
  },
};

export const revalidate = 3600;

export default async function CanadaMarketPage() {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("tour_packages")
    .select("slug, title, tagline, route, duration, price, image_url")
    .eq("is_active", true)
    .eq("destination", "canada")
    .order("order_index", { ascending: true });

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .eq("status", "published")
    .eq("destination", "canada")
    .limit(6);

  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, featured_image, category, destination, reading_time, published_at")
    .eq("status", "published")
    .eq("category", "cam-nang")
    .eq("destination", "canada")
    .limit(3);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tour", item: absoluteUrl("/tour") },
      { "@type": "ListItem", position: 3, name: "Canada", item: absoluteUrl("/tour/canada") },
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
          heroImage: "https://images.unsplash.com/photo-1609825488888-3a766db05542?w=1600&q=80",
          heroHeadline: "Đi Canada cùng cả nhà — Rocky Mountains, hồ Peyto tận mắt",
          heroSubtext:
            "Banff, Rocky Mountains và những hồ nước xanh ngọc — Vinh đã tự mình đi qua, giờ dẫn cả gia đình bạn đi.",
          valueProps: [
            {
              title: "Cảnh thiên nhiên hiếm có",
              desc: "Rocky Mountains, hồ Peyto, Banff — những khung cảnh mà ảnh chụp không lột tả hết, cần tận mắt chứng kiến.",
            },
            {
              title: "Không shopping stop",
              desc: "Xe riêng, lịch trình theo nhịp gia đình bạn — tập trung trải nghiệm thiên nhiên, không ép vào cửa hàng.",
            },
            {
              title: "Hợp gia đình đa thế hệ",
              desc: "Lịch trình cân bằng giữa ngắm cảnh và nghỉ ngơi — ông bà, bố mẹ, con nhỏ cùng đi vẫn khỏe.",
            },
          ],
          faqs: [
            {
              question: "Visa Canada có khó hơn visa Mỹ không?",
              answer:
                "Khác kiểu: Canada không phỏng vấn, xét hồ sơ online kèm sinh trắc học. Thời gian xét thường lâu hơn nên cần nộp sớm trước chuyến đi vài tháng. Ai đã có visa Mỹ còn hạn thì hồ sơ Canada thường thuận hơn đáng kể.",
            },
            {
              question: "Canada mùa nào đẹp nhất?",
              answer:
                "Mùa thu (cuối tháng 9 – giữa tháng 10) lá vàng lá đỏ khắp Rocky Mountains — mùa đẹp nhất nhưng phải đặt trước 4-6 tháng. Mùa hè (6-8) hồ xanh ngọc, thời tiết dễ nhất cho ông bà. Mùa đông có thác Niagara đóng băng.",
            },
            {
              question: "Có kết hợp Mỹ và Canada một chuyến được không?",
              answer:
                "Được và rất đáng — New York lên Niagara rồi qua Toronto chỉ vài tiếng lái. Cần cả visa Mỹ lẫn Canada, Vinh xếp lịch xin hai visa song song để không lỡ chuyến.",
            },
          ],
          // ContactForm chỉ hỗ trợ 4 giá trị destination có sẵn (usa/australia/europe/other) —
          // Canada dùng "other" cho tới khi form được mở rộng thêm lựa chọn riêng.
          leadDestination: "other",
          tours: data ?? [],
          testimonials: testimonials ?? [],
          relatedPosts: relatedPosts ?? [],
          pillarContent: PILLAR_CANADA,
        }}
      />
    </>
  );
}
