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
import type { BlogPostSummary } from "@/lib/blog";
import type { MarketCardData } from "@/components/MarketCards";

interface HomePageProps {
  latestPosts?: BlogPostSummary[];
  marketCards?: MarketCardData[];
}

/**
 * Brief v2 — "tạp chí hành trình": trang chủ là nhật ký đang mở, dịch vụ là
 * ghi chú bên lề. Form đa bước và mọi CTA "bán" chuyển về /lien-he và
 * /tour/* — trang chủ chỉ có một lời mời nhắn Zalo (Chương VI) + nút Zalo
 * nhỏ trên Navbar. Không popup, không nút nổi lặp lại.
 */
const HomePage = ({ latestPosts = [], marketCards = [] }: HomePageProps) => (
  <SmoothScroll>
    <Navbar />
    <main className="min-h-screen">
      <OpeningChapter />
      <AboutChapter />
      <StoryChapter />
      <CompanionsChapter />
      <ProcessChapter />
      <RoutesChapter markets={marketCards} />
      <LatestStories posts={latestPosts} />
      <ClosingChapter />
      <FaqSection />
      <Footer />
    </main>
  </SmoothScroll>
);

export default HomePage;
