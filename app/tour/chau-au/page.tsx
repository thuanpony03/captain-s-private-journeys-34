import type { Metadata } from "next";
import MarketLandingPage from "@/components/tour/MarketLandingPage";
import { createPublicClient } from "@/lib/supabase/server";
import { SITE_URL, absoluteUrl } from "@/lib/seo";
import { PILLAR_CHAU_AU } from "@/content/pillars";

const TITLE = "Tour Riêng Châu Âu Cho Gia Đình & Nhóm Bạn — Thiết Kế 100%";
const DESCRIPTION =
  "Tour riêng Châu Âu nhiều nước một chuyến: Pháp, Ý, Thụy Sĩ... Xe riêng 7-9 chỗ, lịch thiết kế theo nhóm, hỗ trợ visa Schengen. Nhóm 6 người giá tối ưu nhất.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tour/chau-au" },
  openGraph: {
    type: "website",
    url: absoluteUrl("/tour/chau-au"),
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

export default async function ChauAuMarketPage() {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("tour_packages")
    .select("slug, title, tagline, route, duration, price, image_url")
    .eq("is_active", true)
    .eq("destination", "chau-au")
    .order("order_index", { ascending: true });

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .eq("status", "published")
    .eq("destination", "europe")
    .limit(6);

  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, featured_image, category, destination, reading_time, published_at")
    .eq("status", "published")
    .eq("category", "cam-nang")
    .eq("destination", "chau-au")
    .limit(3);

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
          heroImage:
            "https://res.cloudinary.com/dvu2csvsg/image/upload/w_1600,q_auto,f_auto/v1784657626/vinharound/chuyen-di/cinque-terre-y/cinque-terre-y-1.jpg",
          heroHeadline: "Đi Châu Âu nhiều nước — không lo lạc đường, đổi tiền, xin visa",
          heroSubtext:
            "Tour riêng Châu Âu cho gia đình và nhóm bạn: **nhiều nước trong một chuyến** (Pháp – Ý – Thụy Sĩ và tùy chỉnh theo yêu cầu), xe riêng 7–9 chỗ, lịch thiết kế 100% theo nhóm của bạn, hỗ trợ visa Schengen.",
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
              question: "Visa Schengen xin một nước đi được bao nhiêu nước?",
              answer:
                "Một visa Schengen đi được cả khối 29 nước. Nộp vào nước ở lâu nhất trong lịch trình. Lệ phí hiện là 90 euro người lớn, 45 euro trẻ 6-11 tuổi, dưới 6 tuổi miễn phí, cộng phí trung tâm tiếp nhận khoảng 16-24 euro. Lịch trình và booking để nộp hồ sơ Vinh lo trọn.",
            },
            {
              question: "Đi nhiều nước một chuyến có mệt không?",
              answer:
                "Mệt hay không nằm ở cách di chuyển. Tour đoàn mệt vì ngày nào cũng 5h sáng lên xe ca. Đi xe riêng, mỗi chặng 2-4 tiếng là có điểm dừng đẹp để nghỉ, khách sạn xếp 2-3 đêm một chỗ thay vì mỗi đêm một thành phố. 12 ngày qua 3-4 nước mà nhịp vẫn thong thả.",
            },
            {
              question: "Trẻ em có cần visa riêng không?",
              answer:
                "Có — mỗi thành viên một bộ hồ sơ, trẻ em cần thêm giấy khai sinh và giấy đồng ý của bố/mẹ nếu không đi cùng đủ cả hai. Phần giấy tờ này nhiều nhà làm sai nhất, Vinh sẽ gửi checklist theo đúng độ tuổi từng bé.",
            },
          ],
          leadDestination: "europe",
          tours: data ?? [],
          testimonials: testimonials ?? [],
          relatedPosts: relatedPosts ?? [],
          pillarContent: PILLAR_CHAU_AU,
        }}
      />
    </>
  );
}
