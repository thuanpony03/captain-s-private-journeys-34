"use client";

import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import OpeningChapter from "@/components/home/OpeningChapter";
import AboutChapter from "@/components/home/AboutChapter";
import StoryChapter from "@/components/home/StoryChapter";
import CompanionsChapter from "@/components/home/CompanionsChapter";
import ProcessChapter from "@/components/home/ProcessChapter";
import RoutesChapter from "@/components/home/RoutesChapter";
import ClosingChapter from "@/components/home/ClosingChapter";
import LatestStories from "@/components/LatestStories";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import ContactFormPopup from "@/components/ContactFormPopup";
import RevealOnScroll from "@/components/RevealOnScroll";
import type { BlogPostSummary } from "@/lib/blog";
import type { MarketCardData } from "@/components/MarketCards";

interface HomePageProps {
  latestPosts?: BlogPostSummary[];
  marketCards?: MarketCardData[];
}

/**
 * Brief v2 — "tạp chí hành trình": trang chủ là nhật ký đang mở, dịch vụ là
 * ghi chú bên lề. Form đa bước và mọi CTA "bán" chuyển về /lien-he và
 * /tour/* — trang chủ chỉ có lời mời nhắn Zalo rải rác + nút Zalo nhỏ trên
 * Navbar. ContactFormPopup chỉ bật khi khách đã cuộn qua ~65% trang (không
 * phải ngay khi vào trang) — vừa là CTA nổi bật xuất hiện đúng lúc, vừa giữ
 * kênh lead có gửi email qua Resend cho việc theo dõi nội bộ.
 */
const HomePage = ({ latestPosts = [], marketCards = [] }: HomePageProps) => (
  <SmoothScroll>
    <Navbar />
    <main className="min-h-screen">
      <OpeningChapter />
      <RevealOnScroll><AboutChapter /></RevealOnScroll>
      <RevealOnScroll><StoryChapter /></RevealOnScroll>
      <RevealOnScroll><CompanionsChapter /></RevealOnScroll>
      <RevealOnScroll><ProcessChapter /></RevealOnScroll>
      <RevealOnScroll><RoutesChapter markets={marketCards} /></RevealOnScroll>
      <RevealOnScroll><LatestStories posts={latestPosts} /></RevealOnScroll>
      <ClosingChapter />
      <FaqSection />
      <Footer />
    </main>
    <ContactFormPopup />
  </SmoothScroll>
);

export default HomePage;
