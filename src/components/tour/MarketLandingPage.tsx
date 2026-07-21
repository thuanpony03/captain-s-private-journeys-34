import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import TourCard, { type TourCardData } from "@/components/tour/TourCard";
import BlogCard from "@/components/blog/BlogCard";
import TestimonialGallery, { type TestimonialData } from "@/components/testimonials/TestimonialGallery";
import { ShieldCheck } from "lucide-react";
import type { BlogPostSummary } from "@/lib/blog";

export interface MarketFaq {
  question: string;
  answer: string;
}

export interface MarketLandingConfig {
  heroImage: string;
  heroHeadline: string;
  heroSubtext: string;
  valueProps: { title: string; desc: string }[];
  visaBlock?: { title: string; body: string };
  faqs: MarketFaq[];
  leadDestination: "usa" | "australia" | "europe" | "other";
  tours: TourCardData[];
  testimonials?: TestimonialData[];
  relatedPosts?: BlogPostSummary[];
}

export default function MarketLandingPage({ config }: { config: MarketLandingConfig }) {
  const {
    heroImage,
    heroHeadline,
    heroSubtext,
    valueProps,
    visaBlock,
    faqs,
    leadDestination,
    tours,
    testimonials = [],
    relatedPosts = [],
  } = config;

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative h-[55vh] md:h-[65vh] overflow-hidden">
          <Image src={heroImage} alt={heroHeadline} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/20" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-12 md:pb-16">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span className="text-white text-xs font-bold uppercase tracking-wide">
                  Private 100% · Không shopping stop
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-black text-white max-w-3xl leading-tight mb-4">
                {heroHeadline}
              </h1>
              <p className="text-white/85 text-base md:text-lg max-w-2xl">{heroSubtext}</p>
            </div>
          </div>
        </section>

        {/* Value props */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {valueProps.map((vp, i) => (
                <div key={i} className="p-6 rounded-2xl border border-primary/10 bg-[#faf9f7]">
                  <h3 className="font-display text-lg font-bold text-primary mb-2">{vp.title}</h3>
                  <p className="text-primary/70 text-sm leading-relaxed">{vp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tour grid */}
        {tours.length > 0 && (
          <section className="py-14 md:py-20 bg-[#faf9f7]">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-2xl md:text-4xl font-black text-primary text-center mb-10">
                Các tour đang có
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {tours.map((tour) => (
                  <TourCard key={tour.slug} tour={tour} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Visa block */}
        {visaBlock && (
          <section className="py-14 md:py-20 bg-primary">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-secondary/20 flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7 text-secondary" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-black text-white mb-4">
                  {visaBlock.title}
                </h2>
                <p className="text-white/80 leading-relaxed">{visaBlock.body}</p>
              </div>
            </div>
          </section>
        )}

        {/* Review + ảnh gia đình đã đi đúng thị trường */}
        {testimonials.length > 0 && (
          <section className="py-14 md:py-20 bg-[#faf9f7]">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="font-display text-2xl md:text-4xl font-black text-primary text-center mb-10">
                Gia đình đã đi nói gì
              </h2>
              <TestimonialGallery testimonials={testimonials} />
            </div>
          </section>
        )}

        {/* Cẩm nang liên quan */}
        {relatedPosts.length > 0 && (
          <section className="py-14 md:py-20 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-2xl md:text-4xl font-black text-primary text-center mb-10">
                Cẩm nang liên quan
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {relatedPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} basePath="cam-nang" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="py-14 md:py-20 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-2xl md:text-4xl font-black text-primary text-center mb-10">
                Câu hỏi thường gặp
              </h2>
              <Accordion type="single" collapsible className="max-w-2xl mx-auto space-y-3">
                {faqs.map((faq, i) => (
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
        )}

        <ContactForm defaultDestination={leadDestination} />
      </main>
      <Footer />
    </>
  );
}
