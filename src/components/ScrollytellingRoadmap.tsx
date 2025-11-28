import { useEffect, useRef, useState } from "react";

const ScrollytellingRoadmap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Steps với ảnh thật từ Unsplash
  const milestones = [
    { 
      step: "01",
      title: "Tư vấn & Lên kế hoạch", 
      desc: "Liên hệ Vinh để thiết kế hành trình riêng",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80",
    },
    { 
      step: "02",
      title: "Đặt vé & Khách sạn", 
      desc: "Vé bay giờ đẹp, khách sạn 5★ trung tâm",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
    },
    { 
      step: "03",
      title: "Chuẩn bị xe riêng", 
      desc: "Mercedes sang trọng, tài xế người Việt",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80",
    },
    { 
      step: "04",
      title: "Khám phá & Trải nghiệm", 
      desc: "Địa điểm đẹp, ẩm thực ngon, kỷ niệm đáng nhớ",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
    },
    { 
      step: "05",
      title: "Về nhà an toàn", 
      desc: "Hành lý đầy quà, tim đầy kỷ niệm",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const containerTop = rect.top;
        const containerHeight = rect.height;
        const scrollIntoContainer = windowHeight - containerTop;
        const progress = scrollIntoContainer / (containerHeight + windowHeight * 0.3);
        
        const step = Math.min(
          milestones.length - 1,
          Math.max(0, Math.floor(progress * milestones.length * 1.1))
        );
        
        setActiveStep(step);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [milestones.length]);

  return (
    <section 
      ref={containerRef} 
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-primary"
    >
      {/* Background - Dark teal with accents */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary/95"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.08)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(232,93,47,0.06)_0%,transparent_50%)]"></div>
      </div>

      {/* Floating Orbs - subtle */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-48 h-48 bg-secondary/10 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-accent/8 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-10 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 mb-4 md:mb-6">
            <div className="h-px w-6 md:w-12 bg-gradient-to-r from-transparent to-secondary"></div>
            <div className="px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-secondary/50 bg-secondary/10">
              <span className="text-[10px] md:text-sm font-bold text-secondary uppercase tracking-wider">Quy trình trọn gói</span>
            </div>
            <div className="h-px w-6 md:w-12 bg-gradient-to-l from-transparent to-secondary"></div>
          </div>
          
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Hành trình từ{" "}
            <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
              A đến Z
            </span>
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-md mx-auto">
            Vinh lo trọn gói, bạn chỉ cần tận hưởng
          </p>
        </div>

        {/* ===== MOBILE: Vertical Cards with Full Images ===== */}
        <div className="md:hidden space-y-4">
          {milestones.map((milestone, index) => {
            const isActive = index <= activeStep;
            const isCurrent = index === activeStep;
            
            return (
              <div 
                key={index}
                className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Full Image Background */}
                <div className="relative h-48">
                  <img 
                    src={milestone.image}
                    alt={milestone.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
                  
                  {/* Step Badge - Top Left */}
                  <div className={`absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                    isCurrent 
                      ? 'bg-gradient-to-br from-secondary to-accent text-white shadow-lg' 
                      : isActive
                        ? 'bg-secondary/80 text-white'
                        : 'bg-black/50 text-white/70 border border-white/20'
                  }`}>
                    {milestone.step}
                  </div>
                  
                  {/* Active indicator */}
                  {isCurrent && (
                    <div className="absolute top-3 right-3">
                      <div className="w-3 h-3 rounded-full bg-secondary animate-pulse shadow-glow"></div>
                    </div>
                  )}
                  
                  {/* Content at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className={`font-display text-lg font-bold mb-1 ${
                      isCurrent ? 'text-secondary' : 'text-white'
                    }`}>
                      {milestone.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {milestone.desc}
                    </p>
                    
                    {/* Progress bar for current */}
                    {isCurrent && (
                      <div className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-secondary to-accent rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Active border glow */}
                {isCurrent && (
                  <div className="absolute inset-0 rounded-2xl border-2 border-secondary/60 pointer-events-none"></div>
                )}
              </div>
            );
          })}
          
          {/* Mobile Progress Indicator */}
          <div className="flex justify-center gap-2 pt-4">
            {milestones.map((_, index) => (
              <div 
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeStep 
                    ? 'w-8 bg-secondary' 
                    : index < activeStep 
                      ? 'w-3 bg-secondary/50' 
                      : 'w-3 bg-white/20'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* ===== TABLET: 2-Column Grid ===== */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-5 max-w-3xl mx-auto">
          {milestones.map((milestone, index) => {
            const isActive = index <= activeStep;
            const isCurrent = index === activeStep;
            
            return (
              <div 
                key={index}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${
                  isCurrent ? 'ring-2 ring-secondary shadow-glow' : ''
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={milestone.image}
                    alt={milestone.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  
                  {/* Step Badge */}
                  <div className={`absolute top-3 left-3 w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm ${
                    isCurrent 
                      ? 'bg-gradient-to-br from-secondary to-accent text-white shadow-lg' 
                      : isActive
                        ? 'bg-secondary/80 text-white'
                        : 'bg-black/60 text-white/70 border border-white/20'
                  }`}>
                    {milestone.step}
                  </div>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className={`font-display text-lg font-bold mb-1 ${
                    isCurrent ? 'text-secondary' : 'text-white'
                  }`}>
                    {milestone.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {milestone.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===== DESKTOP: Timeline Layout ===== */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          <div className="relative">
            {/* Center Timeline */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-white/10">
              <div 
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-secondary via-accent to-secondary transition-all duration-700"
                style={{ height: `${((activeStep + 1) / milestones.length) * 100}%` }}
              >
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-secondary rounded-full shadow-glow animate-pulse">
                  <div className="absolute inset-1 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => {
                const isActive = index <= activeStep;
                const isCurrent = index === activeStep;
                const isLeft = index % 2 === 0;
                
                return (
                  <div
                    key={index}
                    className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    {/* Image Card */}
                    <div 
                      className={`w-[calc(50%-40px)] transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'} ${isLeft ? 'pr-8' : 'pl-8'}`}
                      style={{ 
                        transitionDelay: `${index * 150}ms`, 
                        transform: isVisible ? 'translateX(0)' : (isLeft ? 'translateX(-30px)' : 'translateX(30px)') 
                      }}
                    >
                      <div className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${
                        isCurrent 
                          ? 'ring-2 ring-secondary shadow-glow scale-[1.02]' 
                          : isActive 
                            ? 'shadow-xl' 
                            : 'opacity-60'
                      }`}>
                        {/* Image */}
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img 
                            src={milestone.image}
                            alt={milestone.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                          
                          {/* Step Number Badge */}
                          <div className={`absolute top-4 ${isLeft ? 'right-4' : 'left-4'} w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-500 ${
                            isCurrent 
                              ? 'bg-gradient-to-br from-secondary to-accent text-white shadow-lg' 
                              : 'bg-black/60 text-white border border-white/20'
                          }`}>
                            {milestone.step}
                          </div>
                        </div>
                        
                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <h3 className={`font-display text-xl font-bold mb-1 ${
                            isCurrent ? 'text-secondary' : 'text-white'
                          }`}>
                            {milestone.title}
                          </h3>
                          <p className="text-white/80 text-sm">
                            {milestone.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Center Node */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-10">
                      <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                        isCurrent 
                          ? 'bg-secondary scale-150 shadow-glow' 
                          : isActive 
                            ? 'bg-secondary' 
                            : 'bg-white/30'
                      }`}></div>
                    </div>
                    
                    {/* Empty Space */}
                    <div className="w-[calc(50%-40px)]"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-10 md:mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 md:gap-4 bg-white/5 backdrop-blur-sm px-5 py-3 md:px-8 md:py-5 rounded-2xl border border-white/10">
            {/* Mini Images */}
            <div className="flex -space-x-2">
              {milestones.slice(0, 3).map((m, i) => (
                <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-primary overflow-hidden shadow-md">
                  <img src={m.image} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="font-display text-xs md:text-sm font-bold text-white">
                Mọi thứ đã sẵn sàng
              </p>
              <p className="text-[10px] md:text-xs text-white/60">
                Bạn chỉ cần <span className="text-secondary font-semibold">xách vali</span> & <span className="text-accent font-semibold">bay</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollytellingRoadmap;
