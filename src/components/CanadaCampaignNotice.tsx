"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Cùng mốc với TopBanner/CanadaCTABox — đoàn 03/11 khởi hành rồi thì gỡ dòng này khỏi /tour/canada.
const HIDE_AFTER = "2026-11-02";

/** Dòng liên kết nổi bật đầu trang /tour/canada, trỏ về landing page campaign 2 đoàn cuối. */
export default function CanadaCampaignNotice() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    if (today > HIDE_AFTER) setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div className="absolute top-20 md:top-24 left-0 right-0 z-10 flex justify-center px-4">
      <Link
        href="/tour/canada-mua-thu?utm_source=web&utm_medium=internal-link&utm_campaign=canada-0311"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-primary text-xs md:text-sm font-bold shadow-lg hover:opacity-90 transition-opacity"
      >
        🍁 Còn 2 đoàn Canada cuối mùa thu: 10/10 & 03/11 — xem chi tiết
      </Link>
    </div>
  );
}
