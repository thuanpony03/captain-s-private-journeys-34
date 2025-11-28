import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { trackFormSubmit, trackEvent } from "@/lib/analytics";

const ContactForm = () => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    destination: "",
    groupSize: "",
    priority: "",
    contact: ""
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Track form view
          trackEvent('view', 'Form', 'Contact Form Viewed');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
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
    
    // Track successful form submission
    trackFormSubmit('Contact Form');
    trackEvent('conversion', 'Form', 'Lead Generated', 1);
    
    console.log("Form submitted:", formData);
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
  };

  const destinations = [
    { 
      value: "usa", 
      code: "USA", 
      city: "West Coast Road Trip",
      image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&h=300&fit=crop"
    },
    { 
      value: "australia", 
      code: "AUS", 
      city: "Great Ocean Road",
      image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400&h=300&fit=crop"
    },
    { 
      value: "europe", 
      code: "EUR", 
      city: "Paris • Rome • Zurich",
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop"
    },
    { 
      value: "other", 
      code: "KHÁC", 
      city: "Để Vinh tư vấn",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop"
    },
  ];

  const groupSizes = [
    { value: "2-4", label: "2-4", desc: "Gia đình nhỏ" },
    { value: "4-6", label: "4-6", desc: "Lý tưởng nhất", hot: true },
    { value: "6+", label: "6+", desc: "Nhóm lớn" },
  ];

  const priorities = [
    { value: "health", label: "Sức khỏe", desc: "Lịch nhẹ nhàng, thoải mái" },
    { value: "experience", label: "Trải nghiệm", desc: "Văn hóa, ẩm thực độc đáo" },
    { value: "luxury", label: "Sang trọng", desc: "Check-in đẳng cấp" },
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact-form" 
      className="py-12 md:py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-[#faf9f7] via-white to-[#faf9f7]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-gradient-to-br from-secondary/8 via-primary/5 to-accent/8 rounded-full blur-[120px]" />
        {/* Decorative dots pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #1a5f5a 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with Compelling Copy */}
        <div className={`text-center mb-10 md:mb-14 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary text-white border border-primary/20 shadow-md">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="font-bold text-xs uppercase tracking-wider">Giới hạn 2 đoàn / tháng</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-black text-primary mb-4 drop-shadow-sm">
            Sẵn Sàng Cho Chuyến Đi
            <span className="block text-secondary font-black">
              Đáng Nhớ Nhất?
            </span>
          </h2>
          
          <p className="text-primary/80 text-base md:text-lg max-w-2xl mx-auto mb-6 font-medium">
            Chỉ cần 30 giây để Vinh hiểu nhu cầu và tư vấn lịch trình <span className="font-bold text-primary">hoàn hảo</span> cho gia đình bạn
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-primary/10">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-primary font-semibold">100+ gia đình tin tưởng</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-primary/10">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-primary font-semibold">Tư vấn miễn phí</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-primary/10">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-primary font-semibold">Phản hồi trong 24h</span>
            </div>
          </div>
        </div>

        {/* Main Content: 2 Column Layout */}
        <div className={`max-w-6xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-10">
            
            {/* Left Column - Testimonial & Benefits */}
            <div className="lg:col-span-2 space-y-6">
              {/* Featured Testimonial */}
              <div className="relative bg-white rounded-2xl p-6 shadow-lg shadow-primary/5 border border-primary/5 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-secondary/10 to-transparent rounded-bl-full" />
                
                {/* Quote */}
                <div className="relative">
                  <svg className="w-8 h-8 text-secondary/30 mb-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                  <p className="text-primary/80 text-sm md:text-base leading-relaxed mb-4">
                    "Đi với Vinh như đi với người nhà thật sự. Bố mẹ tôi 70 tuổi mà được chăm sóc chu đáo, không mệt một chút nào. <span className="font-semibold text-primary">Chuyến đi Mỹ tuyệt vời nhất từ trước đến giờ!</span>"
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                      NT
                    </div>
                    <div>
                      <p className="font-semibold text-primary text-sm">Chị Ngọc Trâm</p>
                      <p className="text-primary/50 text-xs">Gia đình 6 người • Tour Mỹ 2024</p>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-4 pt-4 border-t border-primary/5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                  <span className="text-primary/50 text-xs ml-2">5.0 từ 100+ đánh giá</span>
                </div>
              </div>

              {/* Why Choose - Hidden on mobile */}
              <div className="hidden lg:block bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-6 text-white">
                <h3 className="font-display font-bold text-lg mb-4">Tại sao chọn Vinh Around?</h3>
                <ul className="space-y-3">
                  {[
                    "Xe riêng, lịch trình tùy chỉnh 100%",
                    "Đã đưa 100+ gia đình đi an toàn",
                    "Hỗ trợ 24/7 trong suốt chuyến đi",
                    "Giá trọn gói, không phát sinh"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Urgency Banner - Hidden on mobile */}
              <div className="hidden lg:flex items-center gap-4 bg-accent/10 border border-accent/20 rounded-xl p-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-primary text-sm">Đặt sớm - Ưu đãi lớn</p>
                  <p className="text-primary/60 text-xs">Giảm 5% khi đặt trước 3 tháng</p>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-primary/10 shadow-xl shadow-primary/5">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-primary via-primary/95 to-primary px-5 md:px-8 py-5 md:py-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-xs font-mono mb-1">ĐĂNG KÝ TƯ VẤN</p>
                      <p className="text-white font-display font-bold text-lg md:text-xl">Chỉ mất 30 giây</p>
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                      <p className="text-white font-semibold text-xs flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                        Còn 2 slot
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-5 md:p-8 space-y-6">
                  
                  {/* Question 1 - Destination with Images */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</span>
                      <Label className="font-semibold text-sm md:text-base text-primary">
                        Bạn muốn khám phá đâu?
                      </Label>
                    </div>
                    
                    <RadioGroup 
                      value={formData.destination} 
                      onValueChange={value => setFormData({...formData, destination: value})}
                      className="grid grid-cols-2 gap-3"
                    >
                      {destinations.map((dest) => (
                        <div key={dest.value} className="relative">
                          <RadioGroupItem value={dest.value} id={dest.value} className="sr-only peer" />
                          <Label 
                            htmlFor={dest.value}
                            className={`
                              block cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300
                              ${formData.destination === dest.value 
                                ? 'border-primary shadow-lg shadow-primary/20 scale-[1.02]' 
                                : 'border-transparent hover:border-primary/20'
                              }
                            `}
                          >
                            {/* Image */}
                            <div className="relative h-20 md:h-24 overflow-hidden">
                              <img 
                                src={dest.image} 
                                alt={dest.code}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                              <div className="absolute bottom-2 left-2 right-2">
                                <p className="font-bold text-white text-sm md:text-base">{dest.code}</p>
                                <p className="text-white/80 text-[10px] md:text-xs truncate">{dest.city}</p>
                              </div>
                              
                              {/* Selected indicator */}
                              {formData.destination === dest.value && (
                                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Question 2 - Group Size */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</span>
                      <Label className="font-semibold text-sm md:text-base text-primary">
                        Đoàn của bạn có bao nhiêu người?
                      </Label>
                    </div>
                    
                    <RadioGroup 
                      value={formData.groupSize} 
                      onValueChange={value => setFormData({...formData, groupSize: value})}
                      className="grid grid-cols-3 gap-2 md:gap-3"
                    >
                      {groupSizes.map((size) => (
                        <div key={size.value} className="relative">
                          <RadioGroupItem value={size.value} id={`size-${size.value}`} className="sr-only peer" />
                          <Label 
                            htmlFor={`size-${size.value}`}
                            className={`
                              block cursor-pointer p-3 md:p-4 rounded-xl border-2 transition-all duration-200 text-center
                              ${formData.groupSize === size.value 
                                ? 'border-primary bg-primary/5' 
                                : 'border-primary/10 hover:border-primary/30'
                              }
                            `}
                          >
                            <p className="font-bold text-primary text-xl md:text-2xl">{size.label}</p>
                            <p className="text-primary/50 text-[10px] md:text-xs">{size.desc}</p>
                          </Label>
                          {size.hot && (
                            <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-secondary text-primary text-[10px] font-bold rounded-full whitespace-nowrap">
                              PHỔ BIẾN
                            </span>
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Question 3 - Priority */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">3</span>
                      <Label className="font-semibold text-sm md:text-base text-primary">
                        Điều gì quan trọng nhất với bạn?
                      </Label>
                    </div>
                    
                    <RadioGroup 
                      value={formData.priority} 
                      onValueChange={value => setFormData({...formData, priority: value})}
                      className="space-y-2"
                    >
                      {priorities.map((pri) => (
                        <div key={pri.value}>
                          <RadioGroupItem value={pri.value} id={`priority-${pri.value}`} className="sr-only peer" />
                          <Label 
                            htmlFor={`priority-${pri.value}`}
                            className={`
                              flex items-center justify-between cursor-pointer p-3 md:p-4 rounded-xl border-2 transition-all duration-200
                              ${formData.priority === pri.value 
                                ? 'border-primary bg-primary/5' 
                                : 'border-primary/10 hover:border-primary/30'
                              }
                            `}
                          >
                            <div>
                              <p className="font-semibold text-primary text-sm">{pri.label}</p>
                              <p className="text-primary/50 text-xs">{pri.desc}</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              formData.priority === pri.value 
                                ? 'border-primary bg-primary' 
                                : 'border-primary/30'
                            }`}>
                              {formData.priority === pri.value && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Question 4 - Contact */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">4</span>
                      <Label className="font-semibold text-sm md:text-base text-primary">
                        Số Zalo để Vinh liên hệ
                      </Label>
                    </div>
                    
                    <Input 
                      id="contact" 
                      type="tel" 
                      placeholder="VD: 0901 234 567"
                      value={formData.contact}
                      onChange={e => setFormData({...formData, contact: e.target.value})}
                      className="w-full px-4 py-4 text-base bg-primary/[0.02] border-2 border-primary/10 focus:border-primary rounded-xl text-primary placeholder:text-primary/30 transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-secondary via-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-primary font-bold text-base md:text-lg py-5 md:py-6 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-secondary/30"
                  >
                    Nhận Tư Vấn Miễn Phí
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Button>

                  {/* Footer note */}
                  <p className="text-center text-primary/40 text-xs flex items-center justify-center gap-2">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Thông tin được bảo mật • Không spam
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
