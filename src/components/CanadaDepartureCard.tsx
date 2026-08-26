"use client";

import { MessageCircle } from "lucide-react";
import { trackCampaignContact } from "@/lib/analytics";

interface Props {
  badge: string;
  title: string;
  date: string;
  highlight: string;
  spots: string;
  utmContent: string;
  contentName: string;
  buttonLabel: string;
}

/** 1 trong 2 thẻ "chọn đoàn" (10/10 hoặc 03/11) — mỗi thẻ có UTM/content_name riêng để tách hiệu suất từng đoàn. */
export default function CanadaDepartureCard({
  badge,
  title,
  date,
  highlight,
  spots,
  utmContent,
  contentName,
  buttonLabel,
}: Props) {
  const href = `https://zalo.me/0933344646?utm_source=web&utm_medium=landing&utm_campaign=canada-0311&utm_content=${utmContent}`;

  return (
    <div className="flex-1 p-6 rounded-2xl bg-white border-2 border-primary/10 hover:border-secondary/40 transition-colors">
      <span className="inline-block mb-3 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold uppercase tracking-wide">
        {badge}
      </span>
      <h3 className="font-display text-xl font-bold text-primary mb-1">{title}</h3>
      <p className="text-primary/60 text-sm mb-2">Khởi hành {date}</p>
      <p className="text-primary/70 text-sm mb-3">{highlight}</p>
      <p className="text-secondary font-bold text-sm mb-5">{spots}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCampaignContact(contentName)}
        className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors"
      >
        <MessageCircle className="w-4 h-4" /> {buttonLabel}
      </a>
    </div>
  );
}
