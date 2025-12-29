import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { trackFormSubmit, trackEvent } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Phone, MessageCircle, X } from "lucide-react";

const ContactFormPopup = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    destination: "",
    groupSize: "",
    priority: "",
    contact: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-open popup after 2 seconds
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('contactPopupSeen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        trackEvent('view', 'Popup', 'Contact Popup Opened');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
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
      trackEvent('error', 'Form', 'Incomplete Form Submission');
      return;
    }

    setIsSubmitting(true);

    try {
      let success = false;
      let result = null;
      
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

        if (response.ok) {
          result = await response.json();
          success = true;
        }
      } catch (edgeError) {
        console.warn('Edge function error:', edgeError);
      }
      
      if (!success) {
        const { data, error } = await supabase
          .from('lead_submissions')
          .insert({
            destination: formData.destination,
            group_size: formData.groupSize,
            priority: formData.priority,
            contact: formData.contact,
            status: 'new'
          })
          .select()
          .single();
          
        if (error) throw error;
        result = { leadId: data.id };
        success = true;
      }
      
      if (!success) throw new Error('Failed to submit form');

      trackFormSubmit('Contact Form Popup');
      trackEvent('conversion', 'Form', 'Lead Generated', 1);

      toast({
        title: "Đã gửi thành công!",
        description: "Vinh Around sẽ liên hệ với bạn trong 24h qua Zalo/SĐT đã cung cấp."
      });

      setFormData({
        destination: "",
        groupSize: "",
        priority: "",
        contact: ""
      });
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại hoặc liên hệ trực tiếp qua Zalo",
        variant: "destructive"
      });
      trackEvent('error', 'Form', 'Form Submission Failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const destinations = [
    { value: "usa", label: "🇺🇸 Mỹ", desc: "West Coast" },
    { value: "australia", label: "🇦🇺 Úc", desc: "Great Ocean Road" },
    { value: "europe", label: "🇪🇺 Châu Âu", desc: "Paris • Rome" },
    { value: "other", label: "🌍 Khác", desc: "Tư vấn" },
  ];

  const groupSizes = [
    { value: "2-4", label: "2-4", desc: "Gia đình nhỏ" },
    { value: "4-6", label: "4-6", desc: "Phổ biến", hot: true },
    { value: "6+", label: "6+", desc: "Nhóm lớn" },
  ];

  const priorities = [
    { value: "health", label: "Sức khỏe", desc: "Lịch nhẹ nhàng" },
    { value: "experience", label: "Trải nghiệm", desc: "Văn hóa, ẩm thực" },
    { value: "luxury", label: "Sang trọng", desc: "Check-in đẳng cấp" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-lg p-0 gap-0 bg-gradient-to-b from-white to-[#faf9f7] border-0 shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">
        <DialogTitle className="sr-only">Đăng ký tư vấn</DialogTitle>
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 z-50 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
        >
          <X className="w-4 h-4 text-primary/60" />
        </button>

        {/* Header with urgency */}
        <div className="bg-gradient-to-r from-primary via-primary/95 to-primary px-6 py-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-white/80">Chỉ còn 2 slot tháng này</span>
            </div>
            
            <h2 className="font-display text-2xl font-black mb-1">
              Đăng Ký Tư Vấn <span className="text-secondary">Miễn Phí</span>
            </h2>
            <p className="text-white/70 text-sm">
              Chỉ mất 30 giây • Vinh sẽ gọi lại trong 24h
            </p>
          </div>
        </div>

        {/* Direct Contact - HOTLINE */}
        <div className="px-6 py-4 bg-gradient-to-r from-secondary/10 via-accent/10 to-secondary/10 border-b border-primary/5">
          <p className="text-xs font-semibold text-primary/60 mb-3 uppercase tracking-wider">Hoặc liên hệ trực tiếp</p>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Vinh's phone */}
            <a 
              href="tel:0901234567"
              className="flex items-center gap-3 p-3 bg-white rounded-xl border border-primary/10 hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-primary text-sm">Anh Vinh</p>
                <p className="text-primary/60 text-xs">0901 234 567</p>
              </div>
            </a>

            {/* Thuận's phone */}
            <a 
              href="tel:0394180613"
              className="flex items-center gap-3 p-3 bg-white rounded-xl border border-primary/10 hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-primary text-sm">Thuận (Trợ lý)</p>
                <p className="text-primary/60 text-xs">0394 180 613</p>
              </div>
            </a>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Question 1 - Destination */}
          <div>
            <Label className="font-semibold text-sm text-primary flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</span>
              Bạn muốn đi đâu?
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
                    className={`
                      block cursor-pointer p-3 rounded-xl border-2 text-center transition-all
                      ${formData.destination === dest.value 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'border-primary/10 hover:border-primary/30'}
                    `}
                  >
                    <p className="text-lg mb-0.5">{dest.label.split(' ')[0]}</p>
                    <p className="text-[10px] text-primary/50">{dest.desc}</p>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Question 2 - Group Size */}
          <div>
            <Label className="font-semibold text-sm text-primary flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</span>
              Số người đi?
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
                    className={`
                      block cursor-pointer p-3 rounded-xl border-2 text-center transition-all
                      ${formData.groupSize === size.value 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'border-primary/10 hover:border-primary/30'}
                    `}
                  >
                    <p className="font-bold text-primary text-lg">{size.label}</p>
                    <p className="text-[10px] text-primary/50">{size.desc}</p>
                  </Label>
                  {size.hot && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-secondary text-primary text-[10px] font-bold rounded-full whitespace-nowrap">
                      HOT
                    </span>
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Question 3 - Priority */}
          <div>
            <Label className="font-semibold text-sm text-primary flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">3</span>
              Ưu tiên của bạn?
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
                    className={`
                      block cursor-pointer p-3 rounded-xl border-2 text-center transition-all
                      ${formData.priority === pri.value 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'border-primary/10 hover:border-primary/30'}
                    `}
                  >
                    <p className="font-semibold text-primary text-sm">{pri.label}</p>
                    <p className="text-[10px] text-primary/50">{pri.desc}</p>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Question 4 - Contact */}
          <div>
            <Label className="font-semibold text-sm text-primary flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">4</span>
              Số Zalo để Vinh liên hệ
            </Label>
            
            <Input 
              type="tel" 
              placeholder="VD: 0901 234 567" 
              value={formData.contact} 
              onChange={e => setFormData({...formData, contact: e.target.value})}
              className="w-full px-4 py-4 text-base bg-primary/[0.02] border-2 border-primary/10 focus:border-primary rounded-xl text-primary placeholder:text-primary/30" 
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-secondary via-secondary to-accent hover:from-secondary/90 hover:to-accent/90 font-bold text-lg py-6 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-secondary/30 text-white disabled:opacity-50"
          >
            {isSubmitting ? 'ĐANG GỬI...' : '🚀 Nhận Tư Vấn Ngay'}
          </Button>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-4 text-xs text-primary/40">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Bảo mật 100%
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              100+ gia đình tin tưởng
            </span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormPopup;
