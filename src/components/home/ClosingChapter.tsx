"use client";

import Image from "next/image";
import { trackZaloClick, trackFacebookClick } from "@/lib/analytics";

/**
 * Chương VI — lời mời, không phải nút. Một CTA đúng nghĩa cho cả trang.
 */
export default function ClosingChapter() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80"
        alt="Hoàng hôn trên đường"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-primary/75" />

      <div className="relative z-10 container mx-auto px-6 max-w-xl text-center">
        <p className="font-display text-2xl md:text-4xl text-white leading-snug mb-8">
          Nếu đọc tới đây mà thấy hợp,
          <br />
          nhắn mình một tiếng.
        </p>

        <div className="flex items-center justify-center gap-3 mb-8">
          <a
            href="https://zalo.me/0933344646"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackZaloClick()}
            className="px-6 py-3 rounded-full bg-white text-primary text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Zalo: 0933 344 646
          </a>
          <a
            href="https://www.facebook.com/DicungVinhAround"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackFacebookClick()}
            className="px-6 py-3 rounded-full border border-white/40 text-white text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Messenger
          </a>
        </div>

        <p className="text-white/70 text-sm leading-relaxed">
          Mình chỉ nhận 2 đoàn mỗi tháng, để đi với đoàn nào là ở với đoàn đó trọn vẹn.
          <br />— Vinh
        </p>
      </div>
    </section>
  );
}
