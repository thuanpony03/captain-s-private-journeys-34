"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { trackZaloClick } from "@/lib/analytics";

/**
 * Chương I — bố cục split thay vì ảnh full-bleed. Ảnh chân dung thật của
 * Vinh (vinh-around-portrait.jpg, 687×1024 — chụp chuyên nghiệp, đứng cạnh
 * chiếc Land Cruiser) chỉ 687px ngang nên full-bleed trên màn hình rộng sẽ
 * bị vỡ nét; đặt trong khung dọc tự nhiên vừa giữ ảnh nét, vừa tạo bố cục
 * khối màu táo bạo — khác hẳn kiểu "ảnh nền tối + chữ trắng" phổ biến.
 */
export default function OpeningChapter() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 300);
    const t2 = setTimeout(() => setStage(2), 800);
    const t3 = setTimeout(() => setStage(3), 1200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] lg:h-screen flex flex-col lg:flex-row overflow-hidden bg-primary">
      {/* Khối chữ */}
      <div className="relative z-10 flex-1 flex items-center order-2 lg:order-1 px-6 sm:px-10 lg:px-16 py-14 lg:py-0">
        <div
          className="absolute -left-24 -top-24 w-72 h-72 rounded-full bg-secondary/10 blur-3xl pointer-events-none"
          aria-hidden
        />
        <div className="max-w-xl relative">
          <p
            className={`text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-5 transition-all duration-700 ${
              stage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Passport Lounge · Vinh Around
          </p>
          <h1
            className={`font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white font-medium leading-[0.95] mb-6 tracking-tight transition-all duration-1000 ${
              stage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Mình là <span className="text-secondary">Vinh.</span>
          </h1>
          <p
            className={`text-white/85 text-lg md:text-2xl leading-relaxed max-w-md mb-10 transition-all duration-1000 ${
              stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Mười năm nay mình lái xe đưa các gia đình Việt đi Mỹ, Úc, Châu Âu.
          </p>
          <div
            className={`flex flex-wrap items-center gap-4 transition-all duration-1000 ${
              stage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <a
              href="https://zalo.me/0933344646"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackZaloClick()}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-secondary text-primary text-sm md:text-base font-bold shadow-lg shadow-secondary/20 hover:bg-white hover:scale-[1.03] transition-all duration-300"
            >
              Nhắn Zalo cho Vinh
            </a>
            <p className="text-white/50 text-xs md:text-sm">kéo xuống, mình kể bạn nghe ↓</p>
          </div>
        </div>
      </div>

      {/* Ảnh chân dung */}
      <div className="relative w-full h-[46vh] sm:h-[52vh] lg:h-auto lg:w-[42%] xl:w-[38%] order-1 lg:order-2 overflow-hidden">
        <Image
          src="/images/vinh-around-portrait.jpg"
          alt="Vinh bên chiếc Land Cruiser"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 42vw"
          className={`object-cover object-top transition-transform duration-[2500ms] ease-out ${
            stage >= 1 ? "scale-100" : "scale-110"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-primary/10" />
        <div className="absolute inset-y-0 left-0 w-px bg-secondary/30 hidden lg:block" />
      </div>
    </section>
  );
}
