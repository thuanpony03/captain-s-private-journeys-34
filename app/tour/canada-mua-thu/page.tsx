import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CanadaCampaignButtons from "@/components/CanadaCampaignButtons";
import CanadaCampaignStickyBar from "@/components/CanadaCampaignStickyBar";
import CanadaDepartureCard from "@/components/CanadaDepartureCard";
import { SITE_URL, absoluteUrl, buildFaqJsonLd } from "@/lib/seo";

// Campaign 2 đoàn cuối (10/10 & 03/11) — copy nguyên văn theo brief marketing
// (WEB-CANADA-0311-INSTRUCTIONS.md + patch WEB-CANADA-UPDATE-2DOAN.md), không
// viết lại, không thêm số liệu/chi tiết ngoài 2 file gốc.
const TITLE = "Tour Canada mùa lá phong — 2 đoàn cuối 10/10 & 03/11";
const DESCRIPTION =
  "Đoàn 19/10 đã khóa sổ. Mùa thu này còn đúng 2 đoàn cuối: 10/10 — đúng đỉnh lá phong, và 03/11 — chuyến cuối mùa. Mỗi đoàn 6 khách, Vinh trực tiếp cầm lái. 6.000 USD/khách trọn gói.";
const OG_IMAGE =
  "https://res.cloudinary.com/dvu2csvsg/image/upload/w_1200,q_auto,f_auto/v1784656678/vinharound/chuyen-di/canada-15-ngay-xuyen-ngang/canada-15-ngay-xuyen-ngang-1.jpg";
const PATH = "/tour/canada-mua-thu";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: absoluteUrl(PATH),
    title: `${TITLE} | Vinh Around`,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Vinh Around`,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const GALLERY = [
  {
    url: "https://res.cloudinary.com/dvu2csvsg/image/upload/w_1200,q_auto,f_auto/v1784656678/vinharound/chuyen-di/canada-15-ngay-xuyen-ngang/canada-15-ngay-xuyen-ngang-1.jpg",
    alt: "Mùa lá phong Canada tháng 10",
  },
  {
    url: "https://res.cloudinary.com/dvu2csvsg/image/upload/w_1200,q_auto,f_auto/v1784656681/vinharound/chuyen-di/canada-15-ngay-xuyen-ngang/canada-15-ngay-xuyen-ngang-2.jpg",
    alt: "Lá vàng tháng 10 Canada",
  },
  {
    url: "https://res.cloudinary.com/dvu2csvsg/image/upload/w_1200,q_auto,f_auto/v1784656685/vinharound/chuyen-di/canada-15-ngay-xuyen-ngang/canada-15-ngay-xuyen-ngang-3.jpg",
    alt: "Mùa thu Canada",
  },
  {
    url: "https://res.cloudinary.com/dvu2csvsg/image/upload/w_1200,q_auto,f_auto/v1784656690/vinharound/chuyen-di/canada-15-ngay-xuyen-ngang/canada-15-ngay-xuyen-ngang-4.jpg",
    alt: "Banff và Rockies mùa thu",
  },
  {
    url: "https://res.cloudinary.com/dvu2csvsg/image/upload/w_1200,q_auto,f_auto/v1784656696/vinharound/chuyen-di/canada-15-ngay-xuyen-ngang/canada-15-ngay-xuyen-ngang-6.jpg",
    alt: "Cung đường mùa thu Canada",
  },
  {
    url: "https://res.cloudinary.com/dvu2csvsg/image/upload/w_1200,q_auto,f_auto/v1784656768/vinharound/chuyen-di/banff-5n4d-cung-gia-dinh/banff-5n4d-cung-gia-dinh-1.jpg",
    alt: "Đoàn gia đình đi cùng Vinh tại Banff",
  },
  {
    url: "https://res.cloudinary.com/dvu2csvsg/image/upload/w_1200,q_auto,f_auto/v1784656771/vinharound/chuyen-di/banff-5n4d-cung-gia-dinh/banff-5n4d-cung-gia-dinh-2.jpg",
    alt: "Hồ xanh Rockies",
  },
  {
    url: "https://res.cloudinary.com/dvu2csvsg/image/upload/w_1200,q_auto,f_auto/v1784656774/vinharound/chuyen-di/banff-5n4d-cung-gia-dinh/banff-5n4d-cung-gia-dinh-3.jpg",
    alt: "Lake Louise",
  },
];

const FAQS = [
  {
    question: "Nên chọn đoàn 10/10 hay 03/11?",
    answer:
      "Đoàn 10/10 đi đúng tuần lá phong rực nhất — chuyến 10/2025 của Vinh đi đúng dịp này và lá vàng rực suốt cung miền Đông. Đoàn 03/11 là chuyến cuối mùa, hợp với nhà cần thêm thời gian thu xếp công việc, và tùy năm nhiều vùng như Quebec vẫn giữ mảng vàng đỏ. Đi được sớm thì chọn 10/10; cần thêm thời gian thì 03/11 — cả hai cùng lịch trình, cùng giá, Vinh đều trực tiếp cầm lái.",
  },
  {
    question: "Đầu tháng 11 đi Canada còn lá vàng không?",
    answer:
      "Đầu tháng 11 là cuối mùa lá phong ở Đông Canada. Tùy năm và tùy vùng, nhiều nơi như Quebec hay các cung rừng quanh Montreal vẫn giữ những mảng vàng đỏ, thời tiết se lạnh đúng chất thu. Vinh là người cầm lái nên lịch từng ngày sẽ được chọn theo thực tế lá và thời tiết của từng vùng — đó là lợi thế của đoàn nhỏ đi xe riêng: đẹp đâu, dừng đó.",
  },
  {
    question: "Chưa có visa Canada, kịp đi đoàn 03/11 không?",
    answer:
      "Thường là không kịp, vì thời gian xét visa Canada tính bằng nhiều tuần. Đoàn 03/11 dành cho nhà đã có visa còn hạn hoặc hồ sơ sắp có kết quả. Nếu chưa có visa, Vinh sẽ hướng dẫn chuẩn bị hồ sơ ngay từ bây giờ để chắc suất cho mùa thu 2027.",
  },
  {
    question: "6.000 USD/khách gồm những gì?",
    answer:
      "Mức 6.000 USD/khách là chi phí trọn gói theo lịch trình đoàn. Bảng chi tiết từng khoản gồm và không gồm sẽ được Vinh gửi kèm lịch trình ngày-theo-ngày qua Zalo để nhà mình xem rõ trước khi quyết định. Đăng ký nhóm được giảm trực tiếp: 10 triệu cho nhóm 2, 15 triệu cho nhóm 3, 20 triệu cho nhóm 4.",
  },
  {
    question: "Đoàn 6 khách khác gì tour đoàn 40 người?",
    answer:
      "Khác ở chỗ lịch là của mình. Xe 7 chỗ, cả đoàn ngồi thoải mái; thấy khung cảnh đẹp là dừng lại được thay vì chạy theo giờ của 40 người; ăn uống cả đoàn chung một bàn; và người cầm lái là Vinh — người đã tự đi trọn cung này tháng 10/2025, chứ không phải hướng dẫn viên nhận tour qua điều phối.",
  },
];

export default function CanadaMuaThuPage() {
  const touristTripJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: "Tour Canada mùa lá phong 2026 — 2 đoàn cuối 10/10 & 03/11, đoàn riêng 6 khách",
    description:
      "Đoàn Canada mùa thu 2026, giới hạn 6 khách/đoàn — còn 2 đoàn cuối: 10/10 (đúng đỉnh lá phong) và 03/11 (chuyến cuối mùa). Vinh trực tiếp cầm lái và đồng hành. Cung đường đã được Vinh đi thật tháng 10/2025.",
    touristType: "Gia đình, nhóm bạn",
    provider: {
      "@type": "TravelAgency",
      name: "Đi cùng Vinh Around — Passport Lounge",
      url: "https://vinharound.com",
      telephone: "+84933344646",
      address: {
        "@type": "PostalAddress",
        streetAddress: "192 Trần Quang Khải, Phường Tân Định",
        addressLocality: "TP Hồ Chí Minh",
        addressCountry: "VN",
      },
    },
    offers: [
      {
        "@type": "Offer",
        name: "Đoàn 10/10/2026",
        price: "6000",
        priceCurrency: "USD",
        availability: "https://schema.org/LimitedAvailability",
        validThrough: "2026-10-09",
        url: "https://vinharound.com/tour/canada-mua-thu",
      },
      {
        "@type": "Offer",
        name: "Đoàn 03/11/2026",
        price: "6000",
        priceCurrency: "USD",
        availability: "https://schema.org/LimitedAvailability",
        validThrough: "2026-11-02",
        url: "https://vinharound.com/tour/canada-mua-thu",
      },
    ],
  };

  const faqJsonLd = buildFaqJsonLd(FAQS);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tour", item: absoluteUrl("/tour") },
      { "@type": "ListItem", position: 3, name: "Canada", item: absoluteUrl("/tour/canada") },
      { "@type": "ListItem", position: 4, name: TITLE, item: absoluteUrl(PATH) },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Navbar />

      <main className="min-h-screen pb-14 md:pb-0">
        {/* Section 1 — Hero */}
        <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
          <Image
            src="https://res.cloudinary.com/dvu2csvsg/image/upload/w_1920,q_auto,f_auto/v1784656678/vinharound/chuyen-di/canada-15-ngay-xuyen-ngang/canada-15-ngay-xuyen-ngang-1.jpg"
            alt="Mùa lá phong Canada tháng 10"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/55 to-primary/10" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-12 md:pb-16">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span className="text-white text-xs font-bold uppercase tracking-wide">
                  Đoàn 19/10 đã khóa sổ đủ 6 khách
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-black text-white max-w-3xl leading-tight mb-4">
                Canada mùa lá phong — còn đúng 2 đoàn cuối
              </h1>
              <p className="text-white/85 text-base md:text-lg max-w-2xl mb-8">
                10/10 đi đúng đỉnh lá phong · 03/11 chuyến cuối mùa. Cùng lịch trình, Vinh vẫn là
                người cầm lái và đồng hành.
              </p>
              <CanadaCampaignButtons />
            </div>
          </div>
        </section>

        {/* Section 2 — Chọn đoàn */}
        <section className="py-10 md:py-12 bg-white border-b border-primary/10">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <CanadaDepartureCard
                badge="Đỉnh lá phong"
                title="Đoàn 10/10"
                date="10/10/2026"
                highlight="Đi đúng tuần lá rực nhất"
                spots="Còn 6 chỗ"
                utmContent="doan-1010"
                contentName="zalo_canada_1010"
                buttonLabel="Chọn đoàn 10/10"
              />
              <CanadaDepartureCard
                badge="Cuối mùa"
                title="Đoàn 03/11"
                date="03/11/2026"
                highlight="Cho nhà cần thêm thời gian thu xếp"
                spots="Còn 6 chỗ"
                utmContent="doan-0311"
                contentName="zalo_canada_0311"
                buttonLabel="Chọn đoàn 03/11"
              />
            </div>
            <p className="text-primary/60 text-sm text-center mt-6">
              Mỗi đoàn giới hạn 6 khách · 6.000 USD/khách trọn gói · Giảm 10tr nhóm 2 / 15tr nhóm 3
              / 20tr nhóm 4
            </p>
          </div>
        </section>

        {/* Section 3 — Hành trình này đã được đi thật */}
        <section className="py-14 md:py-20 bg-[#faf9f7]">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="font-display text-2xl md:text-4xl font-black text-primary text-center mb-8">
              Hành trình này đã được đi thật
            </h2>
            <p className="text-primary/80 text-base md:text-lg leading-relaxed text-center max-w-3xl mx-auto mb-10">
              Tháng 10/2025, Vinh vừa đi trọn cung Canada mùa thu này cùng nhóm 5 người: Vancouver,
              Calgary, Banff, Montreal, Quebec, Ottawa, Kingston và Niagara Falls — đúng mùa lá
              vàng rực. Đoàn 03/11 đi lại chính tinh thần chuyến đó: đoàn nhỏ, xe riêng, và được
              lái chậm lại khi phía trước xuất hiện một khung cảnh quá đẹp.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <Link
                href="/chuyen-di/canada-15-ngay-xuyen-ngang"
                className="group block rounded-2xl overflow-hidden border border-primary/10 bg-white shadow-sm hover:shadow-xl hover:border-secondary/30 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dvu2csvsg/image/upload/w_800,q_auto,f_auto/v1784656678/vinharound/chuyen-di/canada-15-ngay-xuyen-ngang/canada-15-ngay-xuyen-ngang-1.jpg"
                    alt="15 ngày xuyên ngang Canada — chuyến 10/2025"
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-primary group-hover:text-secondary transition-colors">
                    15 ngày xuyên ngang Canada — chuyến 10/2025
                  </h3>
                </div>
              </Link>
              <Link
                href="/chuyen-di/banff-5n4d-cung-gia-dinh"
                className="group block rounded-2xl overflow-hidden border border-primary/10 bg-white shadow-sm hover:shadow-xl hover:border-secondary/30 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dvu2csvsg/image/upload/w_800,q_auto,f_auto/v1784656768/vinharound/chuyen-di/banff-5n4d-cung-gia-dinh/banff-5n4d-cung-gia-dinh-1.jpg"
                    alt="Hành trình 5N4Đ khám phá Banff cùng gia đình"
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-primary group-hover:text-secondary transition-colors">
                    Hành trình 5N4Đ khám phá Banff cùng gia đình
                  </h3>
                </div>
              </Link>
            </div>

            <p className="text-primary/60 text-sm text-center mt-6">
              Lịch trình chi tiết ngày-theo-ngày của đoàn 03/11: Vinh gửi qua Zalo trong ngày khi
              bạn nhắn.
            </p>
          </div>
        </section>

        {/* Section 4 — Gallery */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="font-display text-2xl md:text-4xl font-black text-primary text-center mb-10">
              Ảnh thật từ các chuyến Canada của Vinh
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {GALLERY.map((img) => (
                <div key={img.url} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5 — Điều kiện tham gia */}
        <section className="py-14 md:py-20 bg-primary/5">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-display text-2xl md:text-4xl font-black text-primary text-center mb-8">
              Hai đoàn cuối phù hợp với ai?
            </h2>
            <div className="space-y-4 text-primary/80 text-base md:text-lg leading-relaxed">
              <p>
                Vì ngày khởi hành đã gần, cả hai đoàn phù hợp với nhà{" "}
                <strong className="text-primary">đã có visa Canada còn hạn</strong> (hoặc hồ sơ
                đang xét, sắp có kết quả). Đoàn 10/10 cần chốt sớm hơn để kịp vé và chuẩn bị.
              </p>
              <p>
                Chưa có visa? Đừng bỏ qua trang này — nhắn Vinh một câu, Vinh xếp cho nhà mình lộ
                trình chuẩn bị hồ sơ từ bây giờ để kịp các đoàn mùa thu 2027, đi là đẹp ngay từ
                khâu giấy tờ.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 — FAQ */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-4xl font-black text-primary text-center mb-10">
              Câu hỏi thường gặp
            </h2>
            <Accordion type="single" collapsible className="max-w-2xl mx-auto space-y-3">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-xl border border-primary/10 px-5 bg-[#faf9f7]"
                >
                  <AccordionTrigger className="hover:no-underline text-left font-semibold text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-primary/70 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Section 7 — CTA cuối */}
        <section className="py-14 md:py-20 bg-primary text-center">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="font-display text-2xl md:text-4xl font-black text-white mb-4">
              Còn 6 chỗ cho mùa thu năm nay
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-8">
              Nhắn Vinh một câu — nhận lịch trình ngày-theo-ngày và bảng chi phí chi tiết trong
              ngày.
            </p>
            <div className="flex justify-center">
              <CanadaCampaignButtons />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CanadaCampaignStickyBar />
    </>
  );
}
