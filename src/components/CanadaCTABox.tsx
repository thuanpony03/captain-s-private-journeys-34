"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Cùng mốc với TopBanner — hết hạn thì cả banner lẫn box này đều tự ẩn,
// chỉ trang đích /tour/canada-mua-thu là giữ nguyên vĩnh viễn.
const HIDE_AFTER = "2026-11-02";

/** CTA box chèn cuối bài cho đúng 4 bài liên quan tới Canada — dẫn về landing page 2 đoàn cuối. */
export default function CanadaCTABox() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    if (today > HIDE_AFTER) setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div className="mt-12 p-6 md:p-8 rounded-2xl bg-primary/5 border border-primary/15">
      <h3 className="font-display text-xl font-bold text-primary mb-2">
        Mùa thu này còn 2 đoàn cuối: 10/10 & 03/11 — mỗi đoàn 6 khách
      </h3>
      <p className="text-primary/70 text-sm md:text-base mb-5">
        Đoàn 19/10 đã khóa sổ. Cung đường trong bài này chính là tinh thần của hai đoàn cuối.
      </p>
      <Link
        href="/tour/canada-mua-thu?utm_source=web&utm_medium=article-cta&utm_campaign=canada-0311"
        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors"
      >
        Xem lịch trình & giữ chỗ <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
