"use client";

import { Facebook, Link2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackSocialClick, trackButtonClick } from "@/lib/analytics";

export default function ShareBar({ title }: { title: string }) {
  const { toast } = useToast();

  const handleFacebookShare = () => {
    trackSocialClick("Facebook");
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  const handleZaloShare = () => {
    trackSocialClick("Zalo");
    const url = `https://zalo.me/share?u=${encodeURIComponent(window.location.href)}&t=${encodeURIComponent(title)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = async () => {
    trackButtonClick("copy_link", title);
    await navigator.clipboard.writeText(window.location.href);
    toast({ title: "Đã sao chép link" });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleFacebookShare}
        aria-label="Chia sẻ Facebook"
        className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-105 transition-transform"
      >
        <Facebook className="w-4 h-4" />
      </button>
      <button
        onClick={handleZaloShare}
        aria-label="Chia sẻ Zalo"
        className="w-10 h-10 rounded-full bg-[#0068FF] text-white flex items-center justify-center font-bold text-xs hover:scale-105 transition-transform"
      >
        Zalo
      </button>
      <button
        onClick={handleCopyLink}
        aria-label="Copy link"
        className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
      >
        <Link2 className="w-4 h-4" />
      </button>
    </div>
  );
}
