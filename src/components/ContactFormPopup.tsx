import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { trackFormSubmit, trackEvent } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";
import { Phone, MessageCircle, X } from "lucide-react";

const ContactFormPopup = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    destination: "",
    groupSize: "",
    priority: "",
    contact: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-open popup after 3 seconds with smooth animation
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('contactPopupSeen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setIsOpen(true);
          trackEvent('view', 'Popup', 'Contact Popup Opened');
        }, 100);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setIsAnimating(false), 300);
    sessionStorage.setItem('contactPopupSeen', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.destination || !formData.groupSize || !formData.priority || !formData.contact) {
      toast({
        title: "Vui lòng điền đầy đủ thông tin",
        description: "Tất cả các câu hỏi đều cần được trả lời",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let success = false;
      
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-lead-notification`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            },
            body: JSON.stringify({
              destination: formData.destination,
              group_size: formData.groupSize,
              priority: formData.priority,
              contact: formData.contact,
            }),
          }
        );
        if (response.ok) success = true;
      } catch (edgeError) {
        console.warn('Edge function error:', edgeError);
      }
      
      if (!success) {
        const { error } = await supabase
          .from('lead_submissions')
          .insert({
            destination: formData.destination,
            group_size: formData.groupSize,
            priority: formData.priority,
            contact: formData.contact,
            status: 'new'
          });
        if (error) throw error;
        success = true;
      }
      
      if (!success) throw new Error('Failed to submit form');

      trackFormSubmit('Contact Form Popup');
      toast({
        title: "Đã gửi thành công!",
        description: "Vinh Around sẽ liên hệ với bạn trong 24h"
      });

      setFormData({ destination: "", groupSize: "", priority: "", contact: "" });
      handleClose();
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại hoặc liên hệ trực tiếp qua Zalo",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const destinations = [
    { value: "usa", label: "🇺🇸", name: "Mỹ" },
    { value: "australia", label: "🇦🇺", name: "Úc" },
    { value: "europe", label: "🇪🇺", name: "Châu Âu" },
    { value: "other", label: "🌍", name: "Khác" },
  ];

  const groupSizes = [
    { value: "2-4", label: "2-4" },
    { value: "4-6", label: "4-6", hot: true },
    { value: "6+", label: "6+" },
  ];

  const priorities = [
    { value: "health", label: "Sức khỏe" },
    { value: "experience", label: "Trải nghiệm" },
    { value: "luxury", label: "Sang trọng" },
  ];

  if (!isAnimating) return null;

  return (
    <>
      {/* Floating Contact Bubbles - Always visible */}
      <div className="fixed left-4 bottom-24 z-40 flex flex-col gap-3">
        {/* Vinh's bubble */}
        <a 
          href="tel:0901234567"
          className="group flex items-center gap-2 animate-fade-in"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div className="hidden group-hover:block bg-white px-3 py-1.5 rounded-lg shadow-lg text-xs">
            <p className="font-bold text-primary">Anh Vinh</p>
            <p className="text-primary/60">0901 234 567</p>
          </div>
        </a>

        {/* Thuận's bubble */}
        <a 
          href="tel:0394180613"
          className="group flex items-center gap-2 animate-fade-in"
          style={{ animationDelay: '0.7s' }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg shadow-secondary/30 hover:scale-110 transition-transform">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div className="hidden group-hover:block bg-white px-3 py-1.5 rounded-lg shadow-lg text-xs">
            <p className="font-bold text-primary">Thuận (Trợ lý)</p>
            <p className="text-primary/60">0394 180 613</p>
          </div>
        </a>
      </div>

      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
      />

      {/* Popup Dialog */}
      <div 
        className={`fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-md transition-all duration-500 ease-out ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-[-50%]' 
            : 'opacity-0 scale-95 translate-y-[-45%] pointer-events-none'
        }`}
      >
        <div className="bg-gradient-to-b from-white to-[#faf9f7] rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto">
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-3 top-3 z-50 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
          >
            <X className="w-4 h-4 text-primary/60" />
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-primary via-primary/95 to-primary px-5 py-4 text-white relative">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">Còn 2 slot tháng này</span>
            </div>
            <h2 className="font-display text-xl font-black">
              Tư Vấn <span className="text-secondary">Miễn Phí</span>
            </h2>
            <p className="text-white/70 text-xs mt-0.5">30 giây • Vinh gọi lại trong 24h</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            
            {/* Question 1 - Destination */}
            <div>
              <Label className="font-semibold text-xs text-primary flex items-center gap-1.5 mb-2">
                <span className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">1</span>
                Điểm đến?
              </Label>
              <RadioGroup 
                value={formData.destination} 
                onValueChange={value => setFormData({...formData, destination: value})} 
                className="grid grid-cols-4 gap-2"
              >
                {destinations.map(dest => (
                  <div key={dest.value}>
                    <RadioGroupItem value={dest.value} id={`popup-${dest.value}`} className="sr-only peer" />
                    <Label 
                      htmlFor={`popup-${dest.value}`} 
                      className={`block cursor-pointer p-2 rounded-xl border-2 text-center transition-all ${
                        formData.destination === dest.value 
                          ? 'border-primary bg-primary/5 shadow-sm' 
                          : 'border-primary/10 hover:border-primary/30'
                      }`}
                    >
                      <p className="text-xl leading-none mb-0.5">{dest.label}</p>
                      <p className="text-[9px] text-primary/60 font-medium">{dest.name}</p>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Question 2 - Group Size */}
            <div>
              <Label className="font-semibold text-xs text-primary flex items-center gap-1.5 mb-2">
                <span className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">2</span>
                Số người?
              </Label>
              <RadioGroup 
                value={formData.groupSize} 
                onValueChange={value => setFormData({...formData, groupSize: value})} 
                className="grid grid-cols-3 gap-2"
              >
                {groupSizes.map(size => (
                  <div key={size.value} className="relative">
                    <RadioGroupItem value={size.value} id={`popup-size-${size.value}`} className="sr-only peer" />
                    <Label 
                      htmlFor={`popup-size-${size.value}`} 
                      className={`block cursor-pointer py-2.5 px-3 rounded-xl border-2 text-center transition-all ${
                        formData.groupSize === size.value 
                          ? 'border-primary bg-primary/5 shadow-sm' 
                          : 'border-primary/10 hover:border-primary/30'
                      }`}
                    >
                      <p className="font-bold text-primary text-base">{size.label}</p>
                    </Label>
                    {size.hot && (
                      <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-secondary text-primary text-[8px] font-bold rounded-full">
                        HOT
                      </span>
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Question 3 - Priority */}
            <div>
              <Label className="font-semibold text-xs text-primary flex items-center gap-1.5 mb-2">
                <span className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">3</span>
                Ưu tiên?
              </Label>
              <RadioGroup 
                value={formData.priority} 
                onValueChange={value => setFormData({...formData, priority: value})} 
                className="grid grid-cols-3 gap-2"
              >
                {priorities.map(pri => (
                  <div key={pri.value}>
                    <RadioGroupItem value={pri.value} id={`popup-priority-${pri.value}`} className="sr-only peer" />
                    <Label 
                      htmlFor={`popup-priority-${pri.value}`} 
                      className={`block cursor-pointer py-2.5 px-2 rounded-xl border-2 text-center transition-all ${
                        formData.priority === pri.value 
                          ? 'border-primary bg-primary/5 shadow-sm' 
                          : 'border-primary/10 hover:border-primary/30'
                      }`}
                    >
                      <p className="font-semibold text-primary text-xs">{pri.label}</p>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Question 4 - Contact */}
            <div>
              <Label className="font-semibold text-xs text-primary flex items-center gap-1.5 mb-2">
                <span className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">4</span>
                Số Zalo
              </Label>
              <Input 
                type="tel" 
                placeholder="VD: 0901 234 567" 
                value={formData.contact} 
                onChange={e => setFormData({...formData, contact: e.target.value})}
                className="w-full px-3 py-3 text-sm bg-primary/[0.02] border-2 border-primary/10 focus:border-primary rounded-xl text-primary placeholder:text-primary/30" 
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-secondary via-secondary to-accent hover:from-secondary/90 hover:to-accent/90 font-bold text-sm py-5 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-secondary/30 text-white disabled:opacity-50"
            >
              {isSubmitting ? 'Đang gửi...' : 'Nhận Tư Vấn Ngay →'}
            </Button>

            {/* Trust */}
            <p className="text-center text-primary/40 text-[10px] flex items-center justify-center gap-3">
              <span>🔒 Bảo mật</span>
              <span>✓ 100+ gia đình</span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactFormPopup;
