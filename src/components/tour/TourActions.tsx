"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackButtonClick } from "@/lib/analytics";

export function ShareButton({ title, description }: { title: string; description?: string }) {
  const { toast } = useToast();

  const handleShare = async () => {
    const url = window.location.href;
    trackButtonClick("share_tour", title);

    if (navigator.share) {
      try {
        await navigator.share({ title, text: description || "", url });
      } catch {
        /* người dùng huỷ chia sẻ */
      }
      return;
    }

    await navigator.clipboard.writeText(url);
    toast({
      title: "Đã sao chép",
      description: "Link tour đã được sao chép vào clipboard",
    });
  };

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      className="glass-effect border-white/40 text-white hover:bg-white/20"
    >
      <Share2 className="w-4 h-4 mr-2" />
      Chia sẻ
    </Button>
  );
}

export function BookingCta({
  tourTitle,
  destination,
  label = "Đặt lịch ngay",
  className,
}: {
  tourTitle: string;
  destination?: string | null;
  label?: string;
  className?: string;
}) {
  return (
    <Button
      onClick={() => {
        trackButtonClick("book_now", tourTitle);
        const params = new URLSearchParams({ tour: tourTitle });
        if (destination) params.set("dest", destination);
        window.location.href = `/lien-he?${params.toString()}#contact-form`;
      }}
      size="lg"
      className={className ?? "bg-gradient-to-r from-secondary via-accent to-secondary text-white font-bold"}
    >
      {label}
    </Button>
  );
}
