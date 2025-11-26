import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { X, Check } from "lucide-react";

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
      traditional: "Xe bus 45 chỗ, ồn ào, chờ đợi mệt mỏi",
      premium: "Xe riêng Mercedes/SUV cao cấp, êm ái, riêng tư, thoải mái",
      icon: "🚗"
    },
    {
      category: "Giờ giấc",
      traditional: "6h sáng dậy, check-in như chạy giặc, mệt lử",
      premium: "Tự do hoàn toàn, ngủ nướng tùy thích, dừng chân bất cứ lúc nào",
      icon: "⏰"
    },
    {
      category: "Lo toan",
      traditional: "Tự lo vé bay giờ xấu, transit lâu, thủ tục rối",
      premium: "Vinh lo trọn gói từ A-Z: Vé đẹp, Visa, Bảo hiểm, tất cả!",
      icon: "✈️"
    },
    {
      category: "Ăn uống",
      traditional: "Cơm đoàn nguội ngắt, nhà hàng công nghiệp, vô vị",
      premium: "A-la-carte sang trọng, món Âu + Việt nóng sốt, ngon miệng",
      icon: "🍽️"
    },
    {
      category: "Người dẫn",
      traditional: "HDV cầm cờ, nói theo bài vở, xa lạ",
      premium: "Vinh Around - Người thổ địa, rành đường, thân thiện như người nhà",
      icon: "👨‍✈️"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-32 md:py-48 bg-gradient-to-b from-muted/30 via-background to-muted/20 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-10 w-[600px] h-[600px] bg-destructive/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[3px] w-24 bg-gradient-to-r from-transparent via-secondary to-accent rounded-full"></div>
              <div className="w-3 h-3 rounded-full bg-secondary animate-pulse"></div>
              <div className="h-[3px] w-24 bg-gradient-to-l from-transparent via-secondary to-accent rounded-full"></div>
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-destructive">Đi Hành Xác</span>
              <span className="text-muted-foreground mx-4">vs</span>
              <span className="text-gradient">Đi Hưởng Thụ</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-light">
              Tại sao nên chọn Private Tour cùng Vinh Around?
            </p>
          </div>

          {/* Column Headers - Desktop Only */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 p-6 bg-destructive/5 border-2 border-destructive/20 rounded-3xl">
                <X className="w-7 h-7 text-destructive" />
                <span className="font-display font-bold text-2xl text-destructive">Tour Đoàn</span>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-3 p-6 bg-gradient-to-r from-primary via-primary/90 to-secondary border-2 border-primary/40 rounded-3xl shadow-elegant">
                <Check className="w-7 h-7 text-white" />
                <span className="font-display font-bold text-2xl text-white">Private Vinh</span>
              </div>
            </div>
          </div>

          {/* Comparison Grid */}
          <div className="space-y-12 max-w-5xl mx-auto">
            {comparisons.map((item, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`
                }}
              >
                {/* Category Header */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border"></div>
                  <div className="flex items-center gap-3 px-6 py-3 bg-card rounded-2xl border-2 border-secondary/20 shadow-float">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="font-display font-bold text-xl md:text-2xl text-foreground">
                      {item.category}
                    </h3>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border"></div>
                </div>

                {/* Comparison Cards - 2 Column Grid */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  {/* Tour Đoàn - Faded/Grayed */}
                  <Card 
                    className="p-8 md:p-10 bg-muted/60 border-2 border-muted transition-all opacity-70 hover:opacity-80"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <div className="w-10 h-10 rounded-2xl bg-destructive/10 flex items-center justify-center">
                          <X className="w-6 h-6 text-destructive" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                          {item.traditional}
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Private Vinh - Vibrant & Scaled */}
                  <Card 
                    className="p-8 md:p-10 bg-gradient-to-br from-primary via-primary/90 to-secondary border-2 border-primary/40 shadow-elegant transition-all transform md:scale-105 hover:scale-110 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity animate-shimmer"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10 flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-base md:text-lg text-white font-medium leading-relaxed">
                          {item.premium}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div 
            className={`mt-20 text-center transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              transitionDelay: `${comparisons.length * 150}ms`
            }}
          >
            <Card className="inline-block bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 md:p-12 rounded-3xl shadow-elegant border-2 border-primary/40 relative overflow-hidden group">
              <div className="absolute inset-0 animate-shimmer"></div>
              <div className="absolute top-0 left-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
              <div className="relative text-white">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  <div className="h-px w-16 bg-white/40"></div>
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
                <p className="font-display text-2xl md:text-4xl font-bold mb-3">
                  Du thuyền trên mặt đất
                </p>
                <p className="text-base md:text-xl opacity-95 font-light italic">
                  Xứng đáng với từng đồng tiền bạn đầu tư
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
