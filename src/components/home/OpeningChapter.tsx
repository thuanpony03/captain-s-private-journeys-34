"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Chương I — một khung cảnh, không phải khẩu hiệu. Video full-bleed, một câu
 * tự giới thiệu mộc, không badge số liệu, không CTA to. Header (Navbar) đã
 * có nút Zalo nhỏ, ở đây không lặp lại.
 */
export default function OpeningChapter() {
  const [stage, setStage] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 400);
    const t2 = setTimeout(() => setStage(2), 1100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Parallax nhẹ: video trôi chậm hơn nội dung khi cuộn, tạo chiều sâu cinematic
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const section = sectionRef.current;
        const video = videoRef.current;
        if (!section || !video) return;
        const rect = section.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        video.style.transform = `translate3d(0, ${rect.top * -0.15}px, 0) scale(1.08)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[92vh] min-h-[520px] md:h-screen flex items-end md:items-center overflow-hidden bg-black"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[3500ms] ease-out will-change-transform ${
          stage >= 1 ? "scale-100" : "scale-110"
        }`}
      >
        <source src="https://cdn.pixabay.com/video/2023/10/12/184734-873923034_large.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      <div className="absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(0,0,0,0.5)]" />

      <div className="relative z-10 w-full px-6 md:px-12 pb-16 md:pb-0">
        <div className="max-w-2xl">
          <h1
            className={`font-display text-5xl sm:text-6xl md:text-8xl text-white font-medium leading-[0.95] mb-4 md:mb-6 tracking-tight transition-all duration-1000 ${
              stage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Mình là Vinh.
          </h1>
          <p
            className={`text-white/90 text-lg md:text-2xl leading-relaxed max-w-lg transition-all duration-1000 ${
              stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Mười năm nay mình lái xe đưa các gia đình Việt đi Mỹ, Úc, Châu Âu.
          </p>
        </div>
      </div>

      <div
        className={`absolute bottom-5 md:bottom-8 right-6 md:right-12 z-10 transition-opacity duration-1000 delay-500 ${
          stage >= 2 ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-white/60 text-xs md:text-sm animate-bounce">kéo xuống, mình kể bạn nghe ↓</p>
      </div>
    </section>
  );
}
