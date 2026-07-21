import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestimonialGallery from "@/components/testimonials/TestimonialGallery";
import { createPublicClient } from "@/lib/supabase/server";
import { absoluteUrl } from "@/lib/seo";

const TITLE = "Khách hàng nói gì - Review Vinh Around";
const DESCRIPTION =
  "Đánh giá thật từ các gia đình đã đi private tour cùng Vinh Around — Mỹ, Úc, Châu Âu.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["review vinh around", "đánh giá passport lounge"],
  alternates: { canonical: "/khach-hang" },
  openGraph: {
    type: "website",
    url: absoluteUrl("/khach-hang"),
    title: `${TITLE} | Vinh Around`,
    description: DESCRIPTION,
  },
};

export const revalidate = 3600;

export default async function KhachHangPage() {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("status", "published")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  const testimonials = data ?? [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="pt-32 pb-10 md:pt-40 md:pb-14 bg-gradient-to-b from-primary/5 via-white to-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-4">
              Khách hàng nói gì
            </h1>
            <p className="text-primary/70 text-base md:text-lg max-w-2xl mx-auto">
              Đánh giá thật từ những gia đình đã đi cùng Vinh
            </p>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 max-w-6xl">
            {testimonials.length > 0 ? (
              <TestimonialGallery testimonials={testimonials} />
            ) : (
              <p className="text-center text-primary/50 py-12">
                Đang cập nhật đánh giá — quay lại sau nhé!
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
