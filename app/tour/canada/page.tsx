import type { Metadata } from "next";
import MarketLandingPage from "@/components/tour/MarketLandingPage";
import { createPublicClient } from "@/lib/supabase/server";
import { SITE_URL, absoluteUrl } from "@/lib/seo";
import { PILLAR_CANADA } from "@/content/pillars";

const TITLE = "Tour Canada Mùa Thu - Trọn Gói & Tự Lái | Toronto, Banff, Lake Louise";
const DESCRIPTION =
  "Tour Canada mùa thu cùng Vinh Around: Toronto, Niagara Falls, Quebec City, Banff, Lake Louise. Chọn trọn gói có HDV đồng hành hoặc tự lái SUV theo phong cách road trip.";

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
          heroImage:
            "https://res.cloudinary.com/dvu2csvsg/image/upload/w_1600,q_auto,f_auto/v1784656696/vinharound/chuyen-di/canada-15-ngay-xuyen-ngang/canada-15-ngay-xuyen-ngang-7.jpg",
          heroHeadline: "Canada mùa thu — Toronto tới Rocky Mountains, chọn kiểu đi của riêng bạn",
          heroSubtext:
            "Niagara Falls, Quebec City cổ kính, Banff, Lake Louise mùa lá phong — trọn gói có hướng dẫn viên đồng hành, hoặc tự lái SUV road trip. Vinh đã tự mình đi cung này.",
          valueProps: [
            {
              title: "2 kiểu hành trình, 1 cung đường đẹp nhất mùa thu",
              desc: "Trọn gói có HDV đồng hành xuyên suốt, hoặc tự lái SUV theo lộ trình dựng sẵn — chọn theo đúng gu và ngân sách nhà bạn.",
            },
            {
              title: "Không shopping stop",
              desc: "Lịch trình tập trung cảnh thiên nhiên và phố cổ thật — không ép vào cửa hàng, không hoa hồng mua sắm.",
            },
            {
              title: "Đúng mùa lá phong đẹp nhất",
              desc: "Cuối tháng 9 – giữa tháng 10: Mont-Tremblant, Quebec, Rocky Mountains rực rỡ nhất năm.",
            },
          ],
          faqs: [
            {
              question: "Tour trọn gói và tour tự lái khác nhau chỗ nào?",
              answer:
                "Cùng một cung đường Toronto – Niagara – Ottawa – Montreal – Quebec City – Mont-Tremblant – Banff, nhưng tour trọn gói có hướng dẫn viên đồng hành xuyên suốt, đã gồm vé máy bay quốc tế và các bữa ăn, khởi hành giới hạn 6 khách. Tour tự lái là road trip thực thụ: Leader bàn giao xe SUV và hướng dẫn luật giao thông ngày đầu, sau đó bạn tự cầm lái, ở Airbnb riêng, chủ động lịch trình hơn nhưng cần có bằng lái quốc tế và kỹ năng lái tốt.",
            },
            {
              question: "Visa Canada có khó hơn visa Mỹ không?",
              answer:
                "Khác kiểu: Canada không phỏng vấn, xét hồ sơ online kèm sinh trắc học. Thời gian xét thường lâu hơn nên cần nộp sớm trước chuyến đi vài tháng. Ai đã có visa Mỹ còn hạn thì hồ sơ Canada thường thuận hơn đáng kể.",
            },
            {
              question: "Canada mùa nào đẹp nhất?",
              answer:
                "Mùa thu (cuối tháng 9 – giữa tháng 10) lá vàng lá đỏ khắp Rocky Mountains và Quebec — mùa đẹp nhất nhưng phải đặt trước 4-6 tháng vì khách sạn Banff, Mont-Tremblant cháy phòng. Mùa hè (6-8) hồ xanh ngọc, thời tiết dễ nhất cho ông bà.",
            },
          ],
          leadDestination: "canada",
          tours: data ?? [],
          testimonials: testimonials ?? [],
          relatedPosts: relatedPosts ?? [],
          pillarContent: PILLAR_CANADA,
        }}
      />
    </>
  );
}
