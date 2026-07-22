"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { trackFormSubmit, trackEvent } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";
import { getStoredUtm } from "@/lib/utm";
import { X } from "lucide-react";

const SEEN_KEY = "contactPopupSeen";

/**
 * Popup tư vấn nhanh — kích hoạt khi khách đã cuộn qua phần lớn trang (không
 * phải bật ngay sau 2 giây như bản cũ, gây khó chịu). Dùng chung backend với
 * ContactForm (lead_submissions + edge function send-lead-notification, có
 * gửi email qua Resend). Chỉ hiện một lần mỗi phiên.
 */
const ContactFormPopup = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const triggeredRef = useRef(false);
  const [formData, setFormData] = useState({
    destination: "",
    groupSize: "",
    priorities: [] as string[],
    contact: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) return;

    const maybeTrigger = () => {
      if (triggeredRef.current) return;
      const scrolled = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (documentHeight > 0 && scrolled / documentHeight > 0.65) {
        triggeredRef.current = true;
        setIsMounted(true);
        setTimeout(() => {
          setIsOpen(true);
          trackEvent("view", "Popup", "Contact Popup Opened");
        }, 100);
        window.removeEventListener("scroll", maybeTrigger);
      }
    };

    window.addEventListener("scroll", maybeTrigger, { passive: true });
    return () => window.removeEventListener("scroll", maybeTrigger);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    trackEvent("popup_close", "Popup", "Contact Popup Closed");
    sessionStorage.setItem(SEEN_KEY, "true");
    setTimeout(() => setIsMounted(false), 300);
  };

  const togglePriority = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      priorities: prev.priorities.includes(value)
        ? prev.priorities.filter((p) => p !== value)
        : [...prev.priorities, value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.destination || !formData.groupSize || formData.priorities.length === 0 || !formData.contact) {
      toast({
        title: "Vui lòng điền đầy đủ thông tin",
        description: "Điểm đến, số người, ưu tiên và số Zalo đều cần được điền",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let success = false;
      const priorityString = formData.priorities.join(", ");
      const utm = getStoredUtm();

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-lead-notification`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            },
            body: JSON.stringify({
              destination: formData.destination,
              group_size: formData.groupSize,
              priority: priorityString,
              contact: formData.contact,
              notes: formData.notes,
              ...utm,
            }),
          }
        );
        if (response.ok) success = true;
      } catch (edgeError) {
        console.warn("Edge function error:", edgeError);
      }

      if (!success) {
        const { error } = await supabase.from("lead_submissions").insert({
          destination: formData.destination,
          group_size: formData.groupSize,
          priority: priorityString,
          contact: formData.contact,
          notes: formData.notes,
          status: "new",
          ...utm,
        });
        if (error) throw error;
        success = true;
      }

      if (!success) throw new Error("Failed to submit form");

      trackFormSubmit("Contact Form Popup");
      trackEvent("conversion", "Form", "Lead Generated - Popup", 1);

      setFormData({ destination: "", groupSize: "", priorities: [], contact: "", notes: "" });
      handleClose();
      router.push("/cam-on");
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại hoặc liên hệ trực tiếp qua Zalo",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const destinations = [
    { value: "usa", name: "Mỹ" },
    { value: "australia", name: "Úc" },
    { value: "europe", name: "Châu Âu" },
    { value: "other", name: "Khác" },
  ];

  const groupSizes = [
    { value: "2-4", label: "2-4" },
    { value: "4-6", label: "4-6" },
    { value: "6+", label: "6+" },
  ];

  const priorities = [
    { value: "health", label: "Sức khỏe" },
    { value: "experience", label: "Trải nghiệm" },
    { value: "luxury", label: "Sang trọng" },
  ];

  if (!isMounted) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={handleClose}
      />

      <div
        className={`fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-md transition-all duration-500 ease-out ${
          isOpen ? "opacity-100 scale-100 translate-y-[-50%]" : "opacity-0 scale-95 translate-y-[-45%] pointer-events-none"
        }`}
      >
        <div className="bg-gradient-to-b from-white to-[#faf9f7] rounded-2xl shadow-2xl overflow-hidden">
          <button
            onClick={handleClose}
            className="absolute right-2 top-2 z-50 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
            aria-label="Đóng"
          >
            <X className="w-4 h-4 text-primary/60" />
          </button>

          <div className="bg-gradient-to-r from-primary via-primary/95 to-primary px-4 py-3 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white/80">
                    Mỗi tháng Vinh chỉ nhận 2 đoàn
                  </span>
                </div>
                <h2 className="font-display text-lg font-black leading-tight">
                  Tư Vấn <span className="text-secondary">Miễn Phí</span>
                </h2>
              </div>
              <a href="tel:1900636563" className="text-[10px] text-white/80 hover:text-white text-right">
                Hotline<br />1900 63 65 63
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-3 space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="font-semibold text-[10px] text-primary mb-1.5 block">Điểm đến?</Label>
                <RadioGroup
                  value={formData.destination}
                  onValueChange={(value) => setFormData({ ...formData, destination: value })}
                  className="grid grid-cols-4 gap-1"
                >
                  {destinations.map((dest) => (
                    <div key={dest.value}>
                      <RadioGroupItem value={dest.value} id={`popup-${dest.value}`} className="sr-only peer" />
                      <Label
                        htmlFor={`popup-${dest.value}`}
                        className={`block cursor-pointer p-1.5 rounded-lg border text-center transition-all ${
                          formData.destination === dest.value ? "border-primary bg-primary/5" : "border-primary/10 hover:border-primary/30"
                        }`}
                      >
                        <p className="text-[10px] font-semibold text-primary leading-none">{dest.name}</p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label className="font-semibold text-[10px] text-primary mb-1.5 block">Số người?</Label>
                <RadioGroup
                  value={formData.groupSize}
                  onValueChange={(value) => setFormData({ ...formData, groupSize: value })}
                  className="grid grid-cols-3 gap-1"
                >
                  {groupSizes.map((size) => (
                    <div key={size.value}>
                      <RadioGroupItem value={size.value} id={`popup-size-${size.value}`} className="sr-only peer" />
                      <Label
                        htmlFor={`popup-size-${size.value}`}
                        className={`block cursor-pointer py-1.5 rounded-lg border text-center transition-all ${
                          formData.groupSize === size.value ? "border-primary bg-primary/5" : "border-primary/10 hover:border-primary/30"
                        }`}
                      >
                        <p className="font-bold text-primary text-xs">{size.label}</p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>

            <div>
              <Label className="font-semibold text-[10px] text-primary mb-1.5 block">
                Ưu tiên? <span className="text-primary/50">(chọn nhiều)</span>
              </Label>
              <div className="flex gap-1.5">
                {priorities.map((pri) => {
                  const isChecked = formData.priorities.includes(pri.value);
                  return (
                    <label
                      key={pri.value}
                      className={`flex-1 cursor-pointer py-1.5 rounded-lg border text-center transition-all ${
                        isChecked ? "border-primary bg-primary/5" : "border-primary/10 hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => togglePriority(pri.value)}
                          className="w-3 h-3 border-primary/30 data-[state=checked]:bg-primary"
                        />
                        <span className="font-medium text-primary text-[11px]">{pri.label}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="font-semibold text-[10px] text-primary mb-1 block">Số Zalo *</Label>
                <Input
                  type="tel"
                  placeholder="0901 234 567"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-2.5 py-2 text-xs bg-primary/[0.02] border border-primary/10 focus:border-primary rounded-lg"
                />
              </div>
              <div>
                <Label className="font-semibold text-[10px] text-primary mb-1 block">Ghi chú</Label>
                <Input
                  placeholder="Yêu cầu khác..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-2.5 py-2 text-xs bg-primary/[0.02] border border-primary/10 focus:border-primary rounded-lg"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-secondary via-secondary to-accent hover:from-secondary/90 hover:to-accent/90 font-bold text-sm py-4 rounded-xl transition-all shadow-lg shadow-secondary/30 text-white disabled:opacity-50"
            >
              {isSubmitting ? "Đang gửi..." : "Nhận Tư Vấn Ngay →"}
            </Button>

            <p className="text-center text-primary/40 text-[9px]">
              Thông tin được bảo mật, không spam
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactFormPopup;
