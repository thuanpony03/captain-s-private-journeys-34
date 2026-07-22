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
  alternates: { canonical: "/tour/uc" },
  openGraph: {
    type: "website",
    url: absoluteUrl("/tour/uc"),
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
              question: "Visa Úc có cần phỏng vấn không?",
              answer:
                "Không. Visa du lịch Úc (subclass 600) xét hoàn toàn trên hồ sơ nộp online qua ImmiAccount, thỉnh thoảng lãnh sự gọi điện xác minh. Từ 1/7/2026 lệ phí là 250 AUD/người, cộng phí trung tâm VFS khoảng 270 nghìn đồng. Hồ sơ mạnh nằm ở chứng minh tài chính và ràng buộc ở Việt Nam — Vinh hướng dẫn bạn chuẩn bị từng mục.",
            },
            {
              question: "Úc có hợp với nhà có trẻ nhỏ không?",
              answer:
                "Rất hợp — bay đêm 8-9 tiếng là tới, không lệch múi giờ nhiều như đi Mỹ, khí hậu dễ chịu, đường sá lái êm. Great Ocean Road là cung Vinh chạy thuộc lòng: cảnh đẹp mà chặng lái ngắn, dừng nghỉ liên tục được.",
            },
            {
              question: "Đi Úc mùa nào đẹp?",
              answer:
                "Úc ngược mùa với Việt Nam: tháng 12-2 là hè bên đó, hợp tắm biển Sydney; tháng 3-5 và 9-11 mát mẻ, hợp ông bà. Tháng 6-8 là đông, lạnh nhưng ít khách, giá tốt.",
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
