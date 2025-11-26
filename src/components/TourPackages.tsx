import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TourPackages = () => {
  const packages = [
    {
      title: "US West Coast",
      subtitle: "Mùa thu vàng & Rượu vang Napa",
      description: "San Francisco → Napa Valley → Los Angeles → San Diego",
      highlights: [
        "Cầu Golden Gate & Fisherman's Wharf huyền thoại",
        "Thung lũng rượu vang Napa danh tiếng thế giới",
        "Hollywood Walk of Fame & Santa Monica Beach",
        "Công viên Balboa & San Diego Zoo nổi tiếng"
      ],
      duration: "10-12 ngày",
      group: "6-8 người",
      season: "Sep - Nov",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      icon: "🇺🇸",
      emoji: "🌉",
      badge: "🔥 Hot",
      price: "Từ $3,500"
    },
    {
      title: "Australia Grand Road",
      subtitle: "Cung đường biển vĩ đại & Kangaroo",
      description: "Sydney → Great Ocean Road → Melbourne → Gold Coast",
      highlights: [
        "Opera House & Harbour Bridge biểu tượng",
        "Great Ocean Road - 12 Apostles kỳ vĩ",
        "Gặp gỡ Kangaroo & Koala đáng yêu",
        "Biển vàng Gold Coast tuyệt đẹp"
      ],
      duration: "12-14 ngày",
      group: "6-8 người",
      season: "Quanh năm",
      gradient: "from-blue-500 via-teal-500 to-emerald-500",
      icon: "🇦🇺",
      emoji: "🦘",
      badge: "⭐ Best Seller",
      price: "Từ $4,200"
    },
    {
      title: "Custom Tour",
      subtitle: "Thiết kế riêng theo ý bạn",
      description: "Đi bất cứ đâu bạn muốn - Theo phong cách riêng của bạn",
      highlights: [
        "Lộ trình 100% theo yêu cầu của bạn",
        "Linh hoạt thời gian & điểm đến hoàn toàn",
        "Phù hợp mọi sở thích gia đình",
        "Vinh tư vấn chi tiết từng địa điểm"
      ],
      duration: "Tùy chỉnh",
      group: "Từ 6 người",
      season: "Theo lịch bạn",
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      icon: "✈️",
      emoji: "🎯",
      badge: "✨ Flexible",
      price: "Liên hệ"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-muted relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-20 right-20 text-8xl opacity-5 animate-plane-fly">✈️</div>
        <div className="absolute bottom-20 left-20 text-9xl opacity-5 animate-rotate-slow">🌏</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[3px] w-24 bg-gradient-to-r from-transparent via-secondary to-accent rounded-full"></div>
              <div className="w-3 h-3 rounded-full bg-secondary animate-pulse"></div>
              <div className="h-[3px] w-24 bg-gradient-to-l from-transparent via-secondary to-accent rounded-full"></div>
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Các hành trình{" "}
              <span className="text-gradient text-5xl md:text-7xl lg:text-8xl italic">Signature</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto">
              Trải nghiệm được thiết kế riêng, chất lượng tối đa
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 md:gap-10">
            {packages.map((pkg, index) => (
              <Card 
                key={index}
                className="overflow-hidden hover-lift group relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Header with Gradient */}
                <div className={`relative bg-gradient-to-br ${pkg.gradient} p-8 md:p-10 text-white overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10">
                    {/* Badge */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-8 h-8 rounded-lg bg-white/40"></div>
                      </div>
                      <div className="glass-effect px-4 py-2 rounded-full border-2 border-white/40">
                        <span className="text-sm font-bold">{pkg.badge}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-display text-3xl md:text-4xl font-bold mb-3">{pkg.title}</h3>
                    <p className="text-white/95 text-lg md:text-xl font-light mb-6">{pkg.subtitle}</p>
                    
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        <span className="font-semibold">{pkg.season}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        <span className="font-semibold">{pkg.group}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 space-y-6 bg-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    <p className="text-muted-foreground font-medium text-base">{pkg.description}</p>
                  </div>

                  <div className="space-y-3">
                    {pkg.highlights.map((highlight, i) => (
                      <div 
                        key={i} 
                        className="flex items-start gap-3 group/item hover:translate-x-1 transition-all p-3 rounded-xl hover:bg-secondary/5"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                        <span className="text-base md:text-lg text-foreground leading-relaxed">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t-2 border-secondary/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                        <span className="text-muted-foreground font-semibold text-sm">{pkg.duration}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl md:text-3xl font-bold text-secondary">{pkg.price}</p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full gradient-sunset hover:shadow-glow text-white font-bold text-base md:text-lg py-6 md:py-7 rounded-xl group/btn relative overflow-hidden"
                    onClick={() => {
                      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="relative z-10 font-display">Xem lịch trình chi tiết</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/30 to-secondary/30 opacity-0 group-hover/btn:opacity-100 transition-opacity animate-shimmer"></div>
                  </Button>
                </div>

                {/* Decorative Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary/40 rounded-xl transition-all duration-500 pointer-events-none"></div>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center animate-zoom-in">
            <Card className="inline-block p-10 md:p-12 bg-card shadow-elegant hover-lift relative overflow-hidden group border-2 border-secondary/30">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-accent/5 to-secondary/5 animate-shimmer"></div>
              <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
              <div className="relative flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-lg bg-secondary/20"></div>
                </div>
                <div className="text-center md:text-left">
                  <p className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
                    Chưa thấy điểm đến mình muốn?
                  </p>
                  <p className="text-lg md:text-xl text-muted-foreground">
                    Hãy để <span className="font-bold text-secondary">Vinh thiết kế hành trình riêng</span> cho bạn! 
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourPackages;
