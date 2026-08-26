"use client";

import { MessageCircle, Send } from "lucide-react";
import { trackCampaignContact } from "@/lib/analytics";
import { ZALO_HREF_0311, MESSENGER_HREF_0311 } from "@/components/CanadaCampaignButtons";

/** Thanh CTA cố định đáy màn hình trên mobile, riêng cho trang /tour/canada-mua-thu. */
export default function CanadaCampaignStickyBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-50 grid grid-cols-2 border-t border-primary/10 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={ZALO_HREF_0311}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCampaignContact("zalo_canada_0311")}
        className="flex items-center justify-center gap-2 py-3.5 text-primary font-bold text-sm bg-secondary active:opacity-80"
      >
        <MessageCircle className="w-4 h-4" /> Nhắn Zalo
      </a>
      <a
        href={MESSENGER_HREF_0311}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCampaignContact("messenger_canada_0311")}
        className="flex items-center justify-center gap-2 py-3.5 text-primary font-bold text-sm border-l border-primary/10 active:bg-primary/5"
      >
        <Send className="w-4 h-4" /> Messenger
      </a>
    </div>
  );
}
