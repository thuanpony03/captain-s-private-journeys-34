import type { Metadata } from "next";
import MarketLandingPage from "@/components/tour/MarketLandingPage";
import { createPublicClient } from "@/lib/supabase/server";
import { SITE_URL, absoluteUrl } from "@/lib/seo";
import { PILLAR_MY } from "@/content/pillars";

const TITLE = "Private Tour Mỹ Gia Đình - Xe Riêng, Hỗ Trợ Visa";
const DESCRIPTION =
  "Private tour Mỹ cho gia đình Việt. Vinh lo visa, xe riêng, lịch trình tùy chỉnh — không shopping stop, hợp cả ông bà lẫn trẻ nhỏ.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tour/my" },
  openGraph: {
    type: "website",
    url: absoluteUrl("/tour/my"),
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

export default async function MyMarketPage() {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("tour_packages")
    .select("slug, title, tagline, route, duration, price, image_url")
    .eq("is_active", true)
    .eq("destination", "my")
    .order("order_index", { ascending: true });

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .eq("status", "published")
    .eq("destination", "usa")
    .limit(6);

  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, featured_image, category, destination, reading_time, published_at")
    .eq("status", "published")
    .eq("category", "cam-nang")
    .eq("destination", "my")
    .limit(3);

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
          faqs: [
            {
              question: "Visa Mỹ khó vậy có nên đi tour tự túc không?",
              answer:
                "Visa Mỹ là phần khó nhất của chuyến đi Mỹ — phỏng vấn trực tiếp, xét cả hồ sơ lẫn cách trả lời. Đi cùng Vinh, bạn vẫn phải tự phỏng vấn (không ai làm thay được), nhưng hồ sơ được rà kỹ và bạn được chuẩn bị trước những câu lãnh sự hay hỏi. Lệ phí hiện là 185 USD/người, cộng phí Visa Integrity Fee 250 USD dự kiến áp dụng trong năm 2026 — nên ngân sách visa cứ chuẩn bị khoảng 435 USD/người cho chắc.",
            },
            {
              question: "Chi phí tour Mỹ cho gia đình 4-6 người khoảng bao nhiêu?",
              answer:
                "Tour trọn gói từ 85 triệu/khách cho hành trình 12 ngày Đông – Tây (chưa gồm vé máy bay quốc tế). Con số chính xác Vinh chỉ báo sau khi biết nhà bạn mấy người, đi bao nhiêu ngày, thích ở kiểu gì — nhắn Zalo, Vinh tính miễn phí.",
            },
            {
              question: "Có phù hợp với người lớn tuổi không?",
              answer:
                "Chặng Mỹ dài và nhiều di chuyển, nhưng xe riêng giải quyết gần hết vấn đề: ông bà mệt thì nghỉ, lịch mỗi ngày chỉ 1-2 điểm chính thay vì chạy 5-6 điểm như tour đoàn. Nhiều đoàn có thành viên trên 75 tuổi vẫn đi trọn 12 ngày thoải mái.",
            },
            {
              question: "Đặt cọc bao nhiêu, khi nào?",
              answer:
                "Đợt 1 (50%) trong 24 giờ sau khi ký hợp đồng để giữ vé và mở hồ sơ visa; đợt 2 (30%) khi có visa hoặc chậm nhất 45 ngày trước khởi hành; đợt 3 (20%) chậm nhất 21 ngày trước khởi hành. Chi tiết đầy đủ và chính sách hủy/đổi xem tại trang Chính sách.",
            },
          ],
          leadDestination: "usa",
          tours: data ?? [],
          testimonials: testimonials ?? [],
          relatedPosts: relatedPosts ?? [],
          pillarContent: PILLAR_MY,
        }}
      />
    </>
  );
}
