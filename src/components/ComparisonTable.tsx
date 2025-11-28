import { useEffect, useRef, useState } from "react";

const ComparisonTable = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const comparisons = [
    {
      category: "Di chuyển",
      traditional: {
        title: "Bus 45 chỗ ồn ào",
        points: ["Chật chội, mệt mỏi", "Chờ đợi cả đoàn"],
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&q=80"
      },
      premium: {
        title: "Mercedes riêng tư",
        points: ["Rộng rãi, êm ái", "Tự do di chuyển"],
        image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&q=80"
      }
    },
    {
      category: "Ăn uống",
      traditional: {
        title: "Buffet đoàn nguội lạnh",
        points: ["Không vệ sinh", "Vô vị, nhạt nhẽo"],
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80"
      },
      premium: {
        title: "A-la-carte cao cấp",
        points: ["Món nóng hổi", "Ngon như ở nhà"],
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80"
      }
    },
    {
      category: "Lịch trình",
      traditional: {
        title: "6h sáng như chạy giặc",
        points: ["Cố định cứng nhắc", "Mệt lử cả ngày"],
        image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=400&q=80"
      },
      premium: {
        title: "Tự do hoàn toàn",
        points: ["Ngủ nướng thoải mái", "Dừng chân tùy thích"],
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80"
      }
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 bg-muted relative overflow-hidden"
    >
      {/* Animated Background - giống TourPackages */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header - giống TourPackages */}
          <div className="text-center mb-12 md:mb-16 animate-slide-up">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[3px] w-24 bg-gradient-to-r from-transparent via-secondary to-accent rounded-full"></div>
              <div className="w-3 h-3 rounded-full bg-secondary animate-pulse"></div>
              <div className="h-[3px] w-24 bg-gradient-to-l from-transparent via-secondary to-accent rounded-full"></div>
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              So sánh{" "}
              <span className="text-destructive">Hành Xác</span>
              <span className="text-muted-foreground mx-2">vs</span>
              <span className="text-gradient text-4xl md:text-6xl lg:text-7xl italic">Hưởng Thụ</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              Sự khác biệt rõ ràng giữa tour đại trà và Private Tour cao cấp
            </p>
          </div>

          {/* Comparison Cards - Compact & Mobile Optimized */}
          <div className="space-y-8 md:space-y-12">
            {comparisons.map((item, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                {/* Category Badge */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent max-w-32"></div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border-2 border-secondary/20">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    <span className="font-display font-bold text-base md:text-lg text-foreground">{item.category}</span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-transparent max-w-32"></div>
                </div>

                {/* Comparison Grid - Compact with small images */}
                <div className="grid grid-cols-2 gap-3 md:gap-6">
                  {/* Tour Đoàn - Muted */}
                  <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm hover:shadow-md transition-all group">
                    {/* Small Image */}
                    <div className="relative h-32 md:h-40 overflow-hidden">
                      <img 
                        src={item.traditional.image}
                        alt={item.traditional.title}
                        className="w-full h-full object-cover grayscale-[50%] opacity-60 group-hover:opacity-70 transition-all"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
                      
                      {/* Small Badge */}
                      <div className="absolute top-2 right-2 px-2 py-1 bg-destructive/90 backdrop-blur-sm rounded-md">
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Tour Đoàn</span>
                      </div>
                    </div>
                    
                    {/* Compact Content */}
                    <div className="p-3 md:p-4">
                      <h4 className="font-display text-sm md:text-base font-bold text-muted-foreground mb-2 leading-tight">
                        {item.traditional.title}
                      </h4>
                      <div className="space-y-1">
                        {item.traditional.points.map((point, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <div className="w-1 h-1 rounded-full bg-muted-foreground/50 mt-1.5 flex-shrink-0"></div>
                            <span className="text-xs md:text-sm text-muted-foreground/80 leading-snug">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Private Vinh - Premium */}
                  <div className="bg-gradient-to-br from-card via-card to-secondary/5 rounded-2xl border-2 border-secondary/30 overflow-hidden shadow-elegant hover:shadow-glow transition-all group hover:scale-[1.02]">
                    {/* Small Image */}
                    <div className="relative h-32 md:h-40 overflow-hidden">
                      <img 
                        src={item.premium.image}
                        alt={item.premium.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/30 to-transparent"></div>
                      
                      {/* Premium Badge with gradient */}
                      <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-secondary via-accent to-secondary backdrop-blur-sm rounded-md">
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Private Vinh</span>
                      </div>

                      {/* Subtle glow */}
                      <div className="absolute bottom-0 right-0 w-16 h-16 bg-secondary/20 rounded-full blur-2xl"></div>
                    </div>
                    
                    {/* Compact Content */}
                    <div className="p-3 md:p-4">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-secondary/30 to-transparent mb-2"></div>
                      <h4 className="font-display text-sm md:text-base font-bold text-gradient bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent mb-2 leading-tight">
                        {item.premium.title}
                      </h4>
                      <div className="space-y-1">
                        {item.premium.points.map((point, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <div className="w-1 h-1 rounded-full bg-secondary mt-1.5 flex-shrink-0"></div>
                            <span className="text-xs md:text-sm text-foreground font-medium leading-snug">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Statement - giống TourPackages style */}
          <div 
            className={`mt-12 md:mt-16 text-center transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: `${comparisons.length * 100}ms`
            }}
          >
            <div className="inline-block p-8 md:p-10 bg-card shadow-elegant hover-lift rounded-3xl border-2 border-secondary/30 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-accent/5 to-secondary/5 animate-shimmer"></div>
              <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
              
              <div className="relative">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-secondary to-accent"></div>
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent via-accent to-secondary"></div>
                </div>
                
                <p className="font-display text-2xl md:text-4xl font-bold mb-3">
                  <span className="text-gradient bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
                    "Du thuyền trên mặt đất"
                  </span>
                </p>
                <p className="text-base md:text-lg text-muted-foreground font-medium">
                  Xứng đáng từng đồng tiền bạn đầu tư
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
