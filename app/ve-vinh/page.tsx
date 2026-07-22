import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_URL, absoluteUrl, ORGANIZATION } from "@/lib/seo";

const TITLE = "Về Vinh - Người sáng lập Vinh Around, Passport Lounge";
const DESCRIPTION =
  "Vinh Around — người đồng hành tận tâm cùng gia đình bạn trên mọi nẻo đường Âu, Úc, Mỹ, Canada. Founder Passport Lounge.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ve-vinh" },
  openGraph: {
    type: "profile",
    url: absoluteUrl("/ve-vinh"),
    title: `${TITLE} | Vinh Around`,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Vinh Around`,
    description: DESCRIPTION,
  },
};

export default function VeVinhPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vinh Around",
    jobTitle: "Founder, Passport Lounge",
    description: DESCRIPTION,
    url: absoluteUrl("/ve-vinh"),
    image: `${SITE_URL}/images/vinh-around-portrait.jpg`,
    worksFor: { "@type": "TravelAgency", name: ORGANIZATION.name, url: SITE_URL },
    sameAs: ORGANIZATION.sameAs,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Về Vinh", item: absoluteUrl("/ve-vinh") },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([personJsonLd, breadcrumb]) }}
      />
      <Navbar />
      <main className="min-h-screen">
        <section className="relative h-[45vh] md:h-[55vh] overflow-hidden">
          <Image
            src="/images/vinh-around-portrait.jpg"
            alt="Vinh Around"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">Vinh</h1>
              <p className="text-white/80 text-lg">Founder Passport Lounge · Vinh Around</p>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-3xl px-6 py-12 md:py-16">
          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-primary prose-a:text-secondary">
            <p>
              Chào bạn, mình là Vinh — người dẫn đường cho những gia đình Việt trên các
              chuyến đi Âu, Úc, Mỹ, Canada suốt nhiều năm qua.
            </p>
            <p>
              Không chỉ là dẫn đường, mình muốn là người đồng hành tận tâm cùng gia đình
              bạn trên mọi nẻo đường — từ chuẩn bị hồ sơ visa, chọn lịch trình phù hợp với
              sức khỏe của ông bà, đến từng bữa ăn dọc đường. Đó là lý do mình lập ra
              Passport Lounge: để mỗi chuyến đi lớn của một gia đình không còn là nỗi lo,
              mà là kỷ niệm đáng nhớ.
            </p>
            <h2>Vì sao làm private tour, không phải tour đoàn?</h2>
            <p>
              Mình từng thấy nhiều gia đình Việt đi tour đoàn về mệt hơn cả trước khi đi —
              chạy đua điểm đến, bị nhồi shopping stop, ông bà không theo kịp lịch. Private
              tour giải quyết đúng vấn đề đó: xe riêng, lịch trình theo nhịp của gia đình
              bạn, không ai phải thỏa hiệp.
            </p>
            <h2>Theo dõi Vinh</h2>
            <p>
              Mình chia sẻ chuyện đi đường thật (không kịch bản) trên YouTube, TikTok và
              Facebook — ghé xem để hiểu thêm về cách mình làm việc trước khi quyết định
              đồng hành cùng gia đình bạn.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="https://facebook.com/DicungVinhAround"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#1877F2] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Facebook
            </a>
            <a
              href="https://tiktok.com/@dicung.vinharound"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              TikTok
            </a>
            <a
              href="https://youtube.com/@vinharound"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-red-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              YouTube
            </a>
            <a
              href="https://zalo.me/0933344646"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#0068FF] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Chat Zalo
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
