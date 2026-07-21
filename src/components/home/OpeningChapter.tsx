"use client";

import { useEffect, useState } from "react";

/**
 * Chương I — một khung cảnh, không phải khẩu hiệu. Video full-bleed, một câu
 * tự giới thiệu mộc, không badge số liệu, không CTA to. Header (Navbar) đã
 * có nút Zalo nhỏ, ở đây không lặp lại.
 */
export default function OpeningChapter() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 400);
    const t2 = setTimeout(() => setStage(2), 1100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section className="relative h-[92vh] min-h-[520px] md:h-screen flex items-end md:items-center overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[3500ms] ease-out ${
          stage >= 1 ? "scale-100" : "scale-110"
        }`}
      >
        <source src="https://cdn.pixabay.com/video/2023/10/12/184734-873923034_large.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      <div className="relative z-10 w-full px-6 md:px-12 pb-16 md:pb-0">
        <div className="max-w-2xl">
          <p
            className={`font-display text-5xl sm:text-6xl md:text-8xl text-white font-medium leading-[0.95] mb-4 md:mb-6 tracking-tight transition-all duration-1000 ${
              stage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Mình là Vinh.
          </p>
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
