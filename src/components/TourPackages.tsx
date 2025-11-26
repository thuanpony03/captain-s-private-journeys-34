import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Sparkles, Plane, Check } from "lucide-react";

const TourPackages = () => {
  const packages = [
    {
      title: "US West Coast",
      subtitle: "Mùa thu vàng & Rượu vang Napa",
      description: "San Francisco - Napa Valley - Los Angeles - San Diego",
      highlights: [
        "Cầu Golden Gate & Fisherman's Wharf",
        "Thung lũng rượu vang Napa danh tiếng",
        "Hollywood & Santa Monica Beach",
        "Công viên Balboa & San Diego Zoo"
      ],
      duration: "10-12 ngày",
      group: "6-8 người",
      season: "Sep - Nov",
      color: "from-orange-500 to-red-500",
      icon: "🇺🇸",
      badge: "Hot"
    },
    {
      title: "Australia Grand Road",
      subtitle: "Cung đường biển vĩ đại & Kangaroo",
      description: "Sydney - Great Ocean Road - Melbourne - Gold Coast",
      highlights: [
        "Opera House & Harbour Bridge huyền thoại",
        "Great Ocean Road - 12 tảng đá sứ",
        "Gặp gỡ Kangaroo & Koala",
        "Biển vàng Gold Coast tuyệt đẹp"
      ],
      duration: "12-14 ngày",
      group: "6-8 người",
      season: "Quanh năm",
      color: "from-blue-500 to-teal-500",
      icon: "🇦🇺",
      badge: "Best Seller"
    },
    {
      title: "Custom Tour",
      subtitle: "Thiết kế riêng theo ý bạn",
      description: "Đi bất cứ đâu bạn muốn - Theo phong cách của riêng bạn",
      highlights: [
        "Lộ trình 100% theo yêu cầu",
        "Linh hoạt thời gian & điểm đến",
        "Phù hợp mọi sở thích gia đình",
        "Vinh tư vấn chi tiết từng địa điểm"
      ],
      duration: "Tùy chỉnh",
      group: "Từ 6 người",
      season: "Theo lịch bạn",
      color: "from-purple-500 to-pink-500",
      icon: "✈️",
      badge: "Flexible"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-muted relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <Plane className="absolute top-20 left-20 w-12 h-12 text-secondary/5 rotate-45 animate-float" />
          <Plane className="absolute bottom-20 right-20 w-16 h-16 text-primary/5 -rotate-45 animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-secondary fill-secondary" />
              <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
              <Sparkles className="w-6 h-6 text-secondary fill-secondary" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary">
              Các hành trình{" "}
              <span className="text-secondary italic">Signature</span>
              <br className="hidden md:block" />
              mùa này
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto">
              Trải nghiệm được thiết kế riêng, đảm bảo chất lượng tối đa
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 md:gap-10">
            {packages.map((pkg, index) => (
              <Card 
                key={index}
                className="overflow-hidden hover-lift group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header with gradient & badge */}
                <div className={`relative bg-gradient-to-br ${pkg.color} p-8 text-white overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-5xl animate-float">{pkg.icon}</div>
                        <Sparkles className="w-8 h-8 opacity-80" />
                      </div>
                      <div className="glass-effect px-4 py-2 rounded-full border border-white/30">
                        <span className="text-sm font-bold">{pkg.badge}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-display text-3xl md:text-4xl font-bold mb-3">{pkg.title}</h3>
                    <p className="text-white/90 text-base md:text-lg font-light mb-4">{pkg.subtitle}</p>
                    
                    <div className="flex items-center gap-2 text-sm bg-white/20 px-4 py-2 rounded-full inline-block">
                      <Calendar className="w-4 h-4" />
                      <span className="font-semibold">{pkg.season}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6 bg-card">
                  <p className="text-muted-foreground font-medium text-base">
                    {pkg.description}
                  </p>

                  <div className="space-y-3">
                    {pkg.highlights.map((highlight, i) => (
                      <div 
                        key={i} 
                        className="flex items-start gap-3 group/item hover:translate-x-2 transition-transform"
                      >
                        <div className="mt-1 flex-shrink-0">
                          <Check className="w-5 h-5 text-secondary" />
                        </div>
                        <span className="text-sm md:text-base text-foreground leading-relaxed">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-secondary" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4 text-secondary" />
                        <span>{pkg.group}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground font-bold text-base py-6 rounded-xl shadow-elegant group/btn relative overflow-hidden"
                    onClick={() => {
                      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Xem lịch trình chi tiết
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                  </Button>
                </div>

                {/* Decorative Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary/30 rounded-xl transition-all duration-500 pointer-events-none"></div>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center animate-zoom-in">
            <Card className="inline-block p-8 bg-card shadow-elegant hover-lift relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-primary/5 to-secondary/5"></div>
              <div className="relative flex flex-col md:flex-row items-center gap-6">
                <div className="flex gap-2">
                  <MapPin className="w-12 h-12 text-secondary animate-float" />
                  <Sparkles className="w-8 h-8 text-secondary animate-float" style={{ animationDelay: '1s' }} />
                </div>
                <div className="text-center md:text-left">
                  <p className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
                    Chưa thấy điểm đến mình muốn?
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Hãy để <span className="font-bold text-secondary">Vinh thiết kế hành trình riêng</span> cho bạn
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
