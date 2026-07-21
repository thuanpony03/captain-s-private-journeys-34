"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Phone, MessageCircle, Send } from "lucide-react";
import { trackZaloClick, trackPhoneClick, trackButtonClick } from "@/lib/analytics";

const HIDDEN_PREFIXES = ["/admin", "/auth"];

/** Thanh CTA cố định đáy màn hình trên mobile — nơi khách Việt chốt qua Zalo. */
export default function StickyMobileBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (HIDDEN_PREFIXES.some((p) => pathname?.startsWith(p))) return null;

  return (
    <div
      className={`md:hidden fixed bottom-0 inset-x-0 z-50 grid grid-cols-3 border-t border-primary/10 bg-white/95 backdrop-blur-sm shadow-[0_-4px_16px_rgba(0,0,0,0.08)] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ height: 56, paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href="https://zalo.me/0933344646"
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackZaloClick}
        className="flex flex-col items-center justify-center gap-0.5 text-[#0068FF] active:bg-primary/5"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-[11px] font-semibold">Zalo</span>
      </a>
      <a
        href="tel:0933344646"
        onClick={() => trackPhoneClick("Vinh")}
        className="flex flex-col items-center justify-center gap-0.5 text-primary border-x border-primary/10 active:bg-primary/5"
      >
        <Phone className="w-5 h-5" />
        <span className="text-[11px] font-semibold">Gọi</span>
      </a>
      <Link
        href="/lien-he"
        onClick={() => trackButtonClick("Tư vấn", "Sticky Bar")}
        className="flex flex-col items-center justify-center gap-0.5 text-secondary active:bg-primary/5"
      >
        <Send className="w-5 h-5" />
        <span className="text-[11px] font-semibold">Tư vấn</span>
      </Link>
    </div>
  );
}
