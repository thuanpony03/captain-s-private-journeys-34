import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

const TITLE = "Liên hệ - Tư vấn Private Tour miễn phí";
const DESCRIPTION =
  "Liên hệ Vinh Around qua Zalo, hotline hoặc để lại thông tin — tư vấn private tour Mỹ, Úc, Châu Âu miễn phí trong 24h.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/lien-he" },
  openGraph: {
    type: "website",
    url: absoluteUrl("/lien-he"),
    title: `${TITLE} | Vinh Around`,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Vinh Around`,
    description: DESCRIPTION,
  },
};

export default function LienHePage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Liên hệ", item: absoluteUrl("/lien-he") },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Navbar />
      <main className="min-h-screen">
        <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-to-b from-primary/5 via-white to-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-4">
              Nói chuyện với Vinh
            </h1>
            <p className="text-primary/70 text-base md:text-lg max-w-2xl mx-auto mb-10">
              Zalo trả lời trong giờ hành chính, thường dưới 30 phút. Hoặc để lại
              thông tin — Vinh gọi lại trong 2h làm việc.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
              <a
                href="tel:1900636563"
                className="flex items-center gap-3 bg-white p-4 rounded-xl border border-primary/10 shadow-sm hover:border-secondary/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-primary/50 text-xs">Hotline</p>
                  <p className="text-primary font-semibold text-sm">1900 63 65 63</p>
                </div>
              </a>
              <a
                href="https://zalo.me/0933344646"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white p-4 rounded-xl border border-primary/10 shadow-sm hover:border-secondary/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-primary/50 text-xs">Zalo</p>
                  <p className="text-primary font-semibold text-sm">0933 344 646</p>
                </div>
              </a>
              <a
                href="mailto:admin@passport.cafe"
                className="flex items-center gap-3 bg-white p-4 rounded-xl border border-primary/10 shadow-sm hover:border-secondary/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-primary/50 text-xs">Email</p>
                  <p className="text-primary font-semibold text-sm">admin@passport.cafe</p>
                </div>
              </a>
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-primary/10 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-primary/50 text-xs">Văn phòng</p>
                  <p className="text-primary font-semibold text-sm">TP.HCM &amp; Hà Nội</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
