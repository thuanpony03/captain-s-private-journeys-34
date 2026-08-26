"use client";

import { MessageCircle, Send } from "lucide-react";
import { trackCampaignContact } from "@/lib/analytics";

export const ZALO_HREF_0311 =
  "https://zalo.me/0933344646?utm_source=web&utm_medium=landing&utm_campaign=canada-0311";
export const MESSENGER_HREF_0311 = "https://m.me/106369015111911?ref=canada-0311";

/** Cặp nút Zalo/Messenger dùng chung ở hero + CTA cuối trang /tour/canada-mua-thu. */
export default function CanadaCampaignButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <a
        href={ZALO_HREF_0311}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCampaignContact("zalo_canada_0311")}
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-secondary text-primary font-bold text-sm md:text-base hover:opacity-90 transition-opacity"
      >
        <MessageCircle className="w-5 h-5" /> Nhắn Zalo giữ chỗ
      </a>
      <a
        href={MESSENGER_HREF_0311}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCampaignContact("messenger_canada_0311")}
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 border-white text-white font-bold text-sm md:text-base hover:bg-white/10 transition-colors"
      >
        <Send className="w-5 h-5" /> Nhắn Messenger
      </a>
    </div>
  );
}
