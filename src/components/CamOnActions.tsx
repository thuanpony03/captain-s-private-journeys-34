"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { trackEvent, trackZaloClick, trackPhoneClick } from "@/lib/analytics";

export default function CamOnActions() {
  useEffect(() => {
    // Đây là điểm đo conversion chính cho ads — trang chỉ vào được sau khi submit form.
    trackEvent("generate_lead", "Form", "Cam On Page View", 1);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Button
        size="lg"
        onClick={() => {
          trackZaloClick();
          window.open("https://zalo.me/0933344646", "_blank");
        }}
        className="w-full sm:w-auto bg-gradient-to-r from-secondary to-accent font-bold text-white px-8 py-6 rounded-xl shadow-lg shadow-secondary/30 hover:scale-105 transition-all"
      >
        Nhắn Zalo cho Vinh ngay
      </Button>
      <a
        href="tel:0933344646"
        onClick={() => trackPhoneClick("Vinh")}
        className="w-full sm:w-auto"
      >
        <Button
          size="lg"
          variant="outline"
          className="w-full border-2 border-primary/20 text-primary font-bold px-8 py-6 rounded-xl hover:bg-primary/5"
        >
          <Phone className="w-5 h-5 mr-2" />
          0933 344 646
        </Button>
      </a>
    </div>
  );
}
