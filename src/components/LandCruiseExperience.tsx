import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import vehicleImage from "@/assets/luxury-vehicle.jpg";
import hotelImage from "@/assets/luxury-hotel.jpg";
import foodImage from "@/assets/gourmet-food.jpg";

const LandCruiseExperience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      title: "Xe Riêng Hạng Sang",
      image: vehicleImage,
      description: "Mercedes-Benz / SUV cao cấp với nội thất da, WiFi tốc độ cao, tủ lạnh mini. Không gian rộng rãi cho cả gia đình.",
      icon: "🚙",
      stats: "100% Comfort",
      gradient: "from-secondary/30 via-secondary/10 to-transparent",
      features: ["Ghế da massage", "WiFi & Sạc điện thoại", "Không gian rộng rãi", "Tài xế Việt thân thiện"]
    },
    {
      title: "Khách Sạn 5 Sao",
      image: hotelImage,
      description: "Marriott, Hilton, InterContinental - những thương hiệu uy tín nhất. Phòng view đẹp, vị trí trung tâm, tiện nghi đẳng cấp.",
      icon: "🏨",
      stats: "5-Star Only",
      gradient: "from-accent/30 via-accent/10 to-transparent",
      features: ["View đẹp trung tâm", "Phòng rộng thoáng", "Buffet sáng đa dạng", "Dịch vụ phòng 24/7"]
    },
    {
      title: "Ẩm Thực Tinh Tế",
      image: foodImage,
      description: "Nhà hàng được chọn lọc kỹ lưỡng. Món Việt nóng sốt cho những ai nhớ nhà, món Âu tinh tế cho người muốn trải nghiệm.",
      icon: "🍽️",
      stats: "A-la-carte",
      gradient: "from-primary/30 via-primary/10 to-transparent",
      features: ["Món Việt nóng sốt", "Món Âu tinh tế", "Hải sản tươi sống", "Menu linh hoạt"]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background via-muted/50 to-background relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Glowing orbs */}
        <div className="absolute top-20 left-10 w-40 md:w-72 h-40 md:h-72 bg-secondary/15 rounded-full blur-[80px] md:blur-[120px] animate-pulse" style={{animationDuration: '5s'}}></div>
        <div className="absolute bottom-20 right-10 w-48 md:w-80 h-48 md:h-80 bg-accent/15 rounded-full blur-[80px] md:blur-[120px] animate-pulse" style={{animationDuration: '6s', animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-[100px] md:blur-[150px]"></div>
        
        {/* Premium minimal design */}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header - Premium & Eye-catching */}
          <div className={`text-center mb-12 md:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 mb-4 md:mb-6 glass-premium px-4 md:px-6 py-2 md:py-3 rounded-full border border-secondary/30">
              <span className="text-lg md:text-xl">⚓</span>
              <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-wider">Premium Experience</span>
              <span className="text-lg md:text-xl">⚓</span>
            </div>
            
            <h2 className="font-display text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6">
              <span className="text-primary">Tiêu chuẩn</span>
              <br className="md:hidden" />
              <span className="text-shimmer bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift italic">
                {" "}"Du thuyền trên mặt đất"
              </span>
            </h2>
            <p className="text-sm md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Mỗi chi tiết được <span className="text-gradient font-bold">chăm chút tỉ mỉ</span> để mang đến trải nghiệm xa hoa nhất
            </p>
          </div>

          {/* Experience Cards - Grid Layout */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <Card className={`overflow-hidden group relative h-full cursor-pointer border-2 transition-all duration-500 ${
                  activeCard === index 
                    ? 'border-secondary shadow-glow scale-[1.02]' 
                    : 'border-border/50 hover:border-secondary/50 shadow-elegant'
                }`}>
                  {/* Image Section */}
                  <div className="relative h-56 md:h-64 lg:h-72 overflow-hidden">
                    <img 
                      src={exp.image} 
                      alt={exp.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        activeCard === index ? 'scale-125 rotate-2' : 'scale-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-80"></div>
                    
                    {/* Floating Icon Badge */}
                    <div className={`absolute top-4 right-4 glass-premium p-3 md:p-4 rounded-xl border border-secondary/50 transition-all duration-500 ${
                      activeCard === index ? 'scale-110 shadow-glow' : ''
                    }`}>
                      <span className="text-2xl md:text-3xl">{exp.icon}</span>
                    </div>
                    
                    {/* Stats Badge */}
                    <div className={`absolute top-4 left-4 glass-premium px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-accent/50 transition-all duration-500 ${
                      activeCard === index ? 'scale-110' : ''
                    }`}>
                      <span className="text-xs md:text-sm font-bold text-accent">{exp.stats}</span>
                    </div>
                    
                    {/* Title at bottom of image */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-white">
                        {exp.title}
                      </h3>
                    </div>
                    
                    {/* Light ray effect on hover */}
                    <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${activeCard === index ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-secondary/40 via-secondary/20 to-transparent rotate-12"></div>
                      <div className="absolute top-0 right-1/4 w-0.5 h-full bg-gradient-to-b from-accent/30 via-accent/15 to-transparent -rotate-12"></div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className={`p-5 md:p-6 lg:p-8 bg-gradient-to-br ${exp.gradient} relative overflow-hidden`}>
                    {/* Background glow on hover */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-2xl transition-all duration-500 ${
                      activeCard === index ? 'scale-150 opacity-100' : 'scale-100 opacity-0'
                    }`}></div>
                    
                    <p className="text-foreground text-sm md:text-base leading-relaxed mb-4 md:mb-6 relative z-10">
                      {exp.description}
                    </p>

                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-2 relative z-10">
                      {exp.features.map((feature, i) => (
                        <div 
                          key={i} 
                          className={`bg-background/80 backdrop-blur-sm px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border transition-all duration-300 ${
                            activeCard === index 
                              ? 'border-secondary/50 shadow-sm' 
                              : 'border-border/30'
                          }`}
                        >
                          <span className="text-[10px] md:text-xs font-medium text-foreground/90 flex items-center gap-1.5">
                            <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-secondary"></div>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-secondary via-accent to-secondary transition-all duration-500 ${
                    activeCard === index ? 'w-full' : 'w-0'
                  }`}></div>
                </Card>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className={`mt-12 md:mt-16 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block glass-premium p-5 md:p-8 rounded-2xl md:rounded-3xl border border-secondary/30 hover:border-secondary/50 transition-all duration-500 hover:shadow-glow">
              <div className="flex items-center justify-center gap-2 md:gap-3 mb-3">
                <span className="text-xl md:text-2xl">✨</span>
                <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
                <span className="text-xl md:text-2xl">✨</span>
              </div>
              <p className="font-display text-lg md:text-2xl lg:text-3xl font-bold mb-2">
                <span className="text-gradient">Không phải tour giá rẻ</span>
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                Đây là trải nghiệm <span className="text-secondary font-semibold">đẳng cấp</span> cho gia đình bạn 🛳️
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandCruiseExperience;