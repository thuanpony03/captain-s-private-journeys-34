"use client";

import { useEffect, useState } from "react";

/**
 * Chương I — một khung cảnh, không phải khẩu hiệu. Video full-bleed, một câu
 * tự giới thiệu mộc, không badge số liệu, không CTA to. Header (Navbar) đã
 * có nút Zalo nhỏ, ở đây không lặp lại.
 */
export default function OpeningChapter() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[480px] md:h-screen flex items-end md:items-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://cdn.pixabay.com/video/2023/10/12/184734-873923034_large.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />

      <div
        className={`relative z-10 w-full px-6 md:px-12 pb-16 md:pb-0 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        <div className="max-w-xl">
          <p className="font-display text-3xl md:text-5xl text-white font-medium leading-tight mb-3">
            Mình là Vinh.
          </p>
          <p className="text-white/85 text-base md:text-xl leading-relaxed">
            Mười năm nay mình lái xe đưa các gia đình Việt đi Mỹ, Úc, Châu Âu.
          </p>
        </div>
      </div>

      <div className="absolute bottom-5 md:bottom-8 right-6 md:right-12 z-10">
        <p className="text-white/60 text-xs md:text-sm">kéo xuống, mình kể bạn nghe ↓</p>
      </div>
    </section>
  );
}
