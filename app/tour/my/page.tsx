import type { Metadata } from "next";
import MarketLandingPage from "@/components/tour/MarketLandingPage";
import { createPublicClient } from "@/lib/supabase/server";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

const TITLE = "Private Tour Mỹ Gia Đình - Xe Riêng, Hỗ Trợ Visa";
const DESCRIPTION =
  "Private tour Mỹ cho gia đình Việt. Vinh lo visa, xe riêng, lịch trình tùy chỉnh — không shopping stop, hợp cả ông bà lẫn trẻ nhỏ.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["private tour mỹ", "tour mỹ gia đình", "du lịch mỹ tự túc có người dẫn"],
  alternates: { canonical: "/tour/my" },
  openGraph: {
    type: "website",
    url: absoluteUrl("/tour/my"),
    title: `${TITLE} | Vinh Around`,
    description: DESCRIPTION,
  },
};

export const revalidate = 3600;

export default async function MyMarketPage() {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("tour_packages")
    .select("slug, title, tagline, route, duration, price, image_url")
    .eq("is_active", true)
    .eq("destination", "my")
    .order("order_index", { ascending: true });

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tour", item: absoluteUrl("/tour") },
      { "@type": "ListItem", position: 3, name: "Mỹ", item: absoluteUrl("/tour/my") },
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
          heroImage: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1600&q=80",
          heroHeadline: "Đưa cả nhà đi Mỹ — như có người thân ở bên đó",
          heroSubtext:
            "Visa, xe riêng, khách sạn, từng bữa ăn — Vinh lo hết. Bạn chỉ cần xách vali lên đường.",
          valueProps: [
            {
              title: "Hỗ trợ hồ sơ visa Mỹ",
              desc: "Visa Mỹ là nỗi lo lớn nhất khi đi tự túc. Vinh tư vấn hồ sơ, chuẩn bị phỏng vấn — không đảm bảo đậu 100% nhưng đồng hành từ đầu đến cuối.",
            },
            {
              title: "Không shopping stop",
              desc: "Xe riêng, lịch trình theo nhịp của gia đình bạn — không ép vào cửa hàng, không tour đoàn chen chúc.",
            },
            {
              title: "Hợp ông bà + trẻ nhỏ",
              desc: "Lịch nghỉ ngơi hợp lý, xe riêng thoải mái cho hành trình dài ở Mỹ — ba thế hệ cùng đi vẫn khỏe.",
            },
          ],
          visaBlock: {
            title: "Vinh hỗ trợ visa Mỹ thế nào?",
            body:
              "Trước chuyến đi, Vinh cùng bạn rà lại hồ sơ, tư vấn cách chuẩn bị phỏng vấn lãnh sự quán, và chia sẻ kinh nghiệm thực tế từ hàng chục gia đình đã đi cùng Vinh. Đây là bước tư vấn miễn phí khi bạn đăng ký tour.",
          },
          faqs: [
            {
              question: "Visa Mỹ khó vậy có nên đi tự túc không?",
              answer:
                "Nếu chưa từng làm visa Mỹ, đi cùng người có kinh nghiệm giúp bạn tránh những lỗi hồ sơ phổ biến. Vinh hỗ trợ tư vấn hồ sơ và chia sẻ kinh nghiệm phỏng vấn thực tế.",
            },
            {
              question: "Chi phí tour Mỹ cho gia đình 4-6 người khoảng bao nhiêu?",
              answer:
                "Tùy lịch trình và số ngày, chi phí dao động 150-500 triệu cho cả đoàn. Nhắn Zalo để Vinh báo giá cụ thể theo nhu cầu của bạn.",
            },
            {
              question: "Có phù hợp với người lớn tuổi không?",
              answer:
                "Có. Lịch trình được thiết kế nhẹ nhàng, xe riêng nghỉ dừng linh hoạt, không chạy đua điểm đến như tour đoàn.",
            },
          ],
          leadDestination: "usa",
          tours: data ?? [],
        }}
      />
    </>
  );
}
