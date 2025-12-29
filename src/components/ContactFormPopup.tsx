import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { trackFormSubmit, trackEvent } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";
import { X, Phone, MessageCircle } from "lucide-react";

const ContactFormPopup = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    destination: "",
    groupSize: "",
    priorities: [] as string[],
    contact: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-open popup after 2 seconds with smooth animation (always show)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIsOpen(true);
        trackEvent('view', 'Popup', 'Contact Popup Opened');
      }, 100);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setIsAnimating(false), 300);
    sessionStorage.setItem('contactPopupSeen', 'true');
  };

  const togglePriority = (value: string) => {
    setFormData(prev => ({
      ...prev,
      priorities: prev.priorities.includes(value)
        ? prev.priorities.filter(p => p !== value)
        : [...prev.priorities, value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.destination || !formData.groupSize || formData.priorities.length === 0 || !formData.contact) {
      toast({
        title: "Vui lòng điền đầy đủ thông tin",
        description: "Điểm đến, số người, ưu tiên và số Zalo đều cần được điền",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let success = false;
      const priorityString = formData.priorities.join(', ');
      
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
              priority: priorityString,
              contact: formData.contact,
              notes: formData.notes,
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
            priority: priorityString,
            contact: formData.contact,
            notes: formData.notes,
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

      setFormData({ destination: "", groupSize: "", priorities: [], contact: "", notes: "" });
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
        <div className="bg-gradient-to-b from-white to-[#faf9f7] rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-2 top-2 z-50 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
          >
            <X className="w-4 h-4 text-primary/60" />
          </button>

          {/* Compact Header */}
          <div className="bg-gradient-to-r from-primary via-primary/95 to-primary px-4 py-3 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white/80">Còn 2 slot</span>
                </div>
                <h2 className="font-display text-lg font-black leading-tight">
                  Tư Vấn <span className="text-secondary">Miễn Phí</span>
                </h2>
              </div>
              <div className="text-right text-[10px] text-white/80">
                <a href="tel:0933344646" className="block hover:text-white">Vinh: 0933 344 646</a>
                <a href="tel:0394180613" className="block hover:text-white">Thuận: 0394 180 613</a>
              </div>
            </div>
          </div>

          {/* Compact Form */}
          <form onSubmit={handleSubmit} className="p-3 space-y-2.5">
            
            {/* Row 1: Destination + Group Size */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="font-semibold text-[10px] text-primary mb-1.5 block">Điểm đến?</Label>
                <RadioGroup 
                  value={formData.destination} 
                  onValueChange={value => setFormData({...formData, destination: value})} 
                  className="grid grid-cols-4 gap-1"
                >
                  {destinations.map(dest => (
                    <div key={dest.value}>
                      <RadioGroupItem value={dest.value} id={`popup-${dest.value}`} className="sr-only peer" />
                      <Label 
                        htmlFor={`popup-${dest.value}`} 
                        className={`block cursor-pointer p-1.5 rounded-lg border text-center transition-all ${
                          formData.destination === dest.value 
                            ? 'border-primary bg-primary/5' 
                            : 'border-primary/10 hover:border-primary/30'
                        }`}
                      >
                        <p className="text-base leading-none">{dest.label}</p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label className="font-semibold text-[10px] text-primary mb-1.5 block">Số người?</Label>
                <RadioGroup 
                  value={formData.groupSize} 
                  onValueChange={value => setFormData({...formData, groupSize: value})} 
                  className="grid grid-cols-3 gap-1"
                >
                  {groupSizes.map(size => (
                    <div key={size.value}>
                      <RadioGroupItem value={size.value} id={`popup-size-${size.value}`} className="sr-only peer" />
                      <Label 
                        htmlFor={`popup-size-${size.value}`} 
                        className={`block cursor-pointer py-1.5 rounded-lg border text-center transition-all ${
                          formData.groupSize === size.value 
                            ? 'border-primary bg-primary/5' 
                            : 'border-primary/10 hover:border-primary/30'
                        }`}
                      >
                        <p className="font-bold text-primary text-xs">{size.label}</p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>

            {/* Row 2: Priorities */}
            <div>
              <Label className="font-semibold text-[10px] text-primary mb-1.5 block">
                Ưu tiên? <span className="text-primary/50">(chọn nhiều)</span>
              </Label>
              <div className="flex gap-1.5">
                {priorities.map(pri => {
                  const isChecked = formData.priorities.includes(pri.value);
                  return (
                    <label 
                      key={pri.value}
                      className={`flex-1 cursor-pointer py-1.5 rounded-lg border text-center transition-all ${
                        isChecked 
                          ? 'border-primary bg-primary/5' 
                          : 'border-primary/10 hover:border-primary/30'
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

            {/* Row 3: Contact + Notes inline */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="font-semibold text-[10px] text-primary mb-1 block">Số Zalo *</Label>
                <Input 
                  type="tel" 
                  placeholder="0901 234 567" 
                  value={formData.contact} 
                  onChange={e => setFormData({...formData, contact: e.target.value})}
                  className="w-full px-2.5 py-2 text-xs bg-primary/[0.02] border border-primary/10 focus:border-primary rounded-lg" 
                />
              </div>
              <div>
                <Label className="font-semibold text-[10px] text-primary mb-1 block">Ghi chú</Label>
                <Input 
                  placeholder="Yêu cầu khác..." 
                  value={formData.notes} 
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                  className="w-full px-2.5 py-2 text-xs bg-primary/[0.02] border border-primary/10 focus:border-primary rounded-lg" 
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-secondary via-secondary to-accent hover:from-secondary/90 hover:to-accent/90 font-bold text-sm py-4 rounded-xl transition-all shadow-lg shadow-secondary/30 text-white disabled:opacity-50"
            >
              {isSubmitting ? 'Đang gửi...' : 'Nhận Tư Vấn Ngay →'}
            </Button>

            <p className="text-center text-primary/40 text-[9px]">🔒 Bảo mật • ✓ 100+ gia đình tin tưởng</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactFormPopup;
