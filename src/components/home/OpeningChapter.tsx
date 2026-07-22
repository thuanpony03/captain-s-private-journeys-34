"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { trackZaloClick } from "@/lib/analytics";

const HERO_IMAGE =
  "https://res.cloudinary.com/dvu2csvsg/image/upload/w_1440,c_limit,q_auto,f_auto/v1784657051/vinharound/chuyen-di/cau-chuyen-visa-uc/cau-chuyen-visa-uc-4.jpg";

/**
 * Chương I — một khung cảnh thật, không phải khẩu hiệu. Ảnh thật của Vinh
 * (Wave Rock, Tây Úc) thay cho video stock chung chung trước đó — thấy rõ
 * mặt Vinh, tư thế vui, màu sắc rực. Overlay nhẹ tay hơn bản trước (bản cũ
 * chồng 3 lớp tối làm ảnh nhìn "mờ" theo phản hồi).
 */
export default function OpeningChapter() {
  const [stage, setStage] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 400);
    const t2 = setTimeout(() => setStage(2), 1100);
    const t3 = setTimeout(() => setStage(3), 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Parallax nhẹ: ảnh trôi chậm hơn nội dung khi cuộn, tạo chiều sâu cinematic
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const section = sectionRef.current;
        const wrap = imageWrapRef.current;
        if (!section || !wrap) return;
        const rect = section.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        wrap.style.transform = `translate3d(0, ${rect.top * -0.15}px, 0)`;
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
      <div
        ref={imageWrapRef}
        className={`absolute -inset-y-[8%] inset-x-0 transition-transform duration-[3500ms] ease-out will-change-transform ${
          stage >= 1 ? "scale-100" : "scale-110"
        }`}
      >
        <Image
          src={HERO_IMAGE}
          alt="Vinh tại Wave Rock, Tây Úc"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

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
            className={`text-white/90 text-lg md:text-2xl leading-relaxed max-w-lg mb-8 transition-all duration-1000 ${
              stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Mười năm nay mình lái xe đưa các gia đình Việt đi Mỹ, Úc, Châu Âu.
          </p>
          <a
            href="https://zalo.me/0933344646"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackZaloClick()}
            className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-primary text-sm md:text-base font-bold shadow-lg shadow-black/20 hover:bg-white/90 hover:scale-[1.03] transition-all duration-1000 ${
              stage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Nhắn Zalo cho Vinh
          </a>
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
