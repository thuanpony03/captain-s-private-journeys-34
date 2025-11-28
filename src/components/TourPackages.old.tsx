import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TourPackages = () => {
  const [activePackage, setActivePackage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const packages = [
    {
      title: "US West Coast",
      subtitle: "California Dreaming",
      tagline: "Mùa thu vàng & Rượu vang Napa",
      route: "San Francisco → Napa → LA → San Diego",
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
      mapEmoji: "🗺️",
      highlights: [
        { icon: "🌉", text: "Golden Gate Bridge huyền thoại" },
        { icon: "🍷", text: "Thung lũng Napa nổi tiếng" },
        { icon: "🎬", text: "Hollywood & Santa Monica" },
        { icon: "🦭", text: "San Diego Zoo & Balboa" }
      ],
      duration: "10-12 ngày",
      groupSize: "6-8 người",
      bestTime: "Sep - Nov",
      gradient: "from-amber-500 via-orange-500 to-rose-500",
      bgGradient: "from-amber-500/20 via-orange-500/10 to-transparent",
      flag: "🇺🇸",
      badge: "🔥 HOT",
      price: "$3,500",
      cities: ["San Francisco", "Napa Valley", "Los Angeles", "San Diego"]
    },
    {
      title: "Australia Grand",
      subtitle: "The Great Ocean Road",
      tagline: "Cung đường biển vĩ đại & Wildlife",
      route: "Sydney → Great Ocean Road → Melbourne → Gold Coast",
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80",
      mapEmoji: "🦘",
      highlights: [
        { icon: "🎭", text: "Opera House biểu tượng" },
        { icon: "🪨", text: "12 Apostles kỳ vĩ" },
        { icon: "🐨", text: "Koala & Kangaroo" },
        { icon: "🏖️", text: "Gold Coast tuyệt đẹp" }
      ],
      duration: "12-14 ngày",
      groupSize: "6-8 người",
      bestTime: "Quanh năm",
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
      bgGradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
      flag: "🇦🇺",
      badge: "⭐ BEST SELLER",
      price: "$4,200",
      cities: ["Sydney", "Melbourne", "Great Ocean Road", "Gold Coast"]
    },
    {
      title: "Europe Classic",
      subtitle: "Old World Charm",
      tagline: "Châu Âu cổ điển & Lãng mạn",
      route: "Paris → Swiss Alps → Italy → Barcelona",
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
      mapEmoji: "🏰",
      highlights: [
        { icon: "🗼", text: "Paris thành phố tình yêu" },
        { icon: "🏔️", text: "Dãy Alps hùng vĩ" },
        { icon: "🍝", text: "Ẩm thực Ý đích thực" },
        { icon: "⛪", text: "Barcelona sôi động" }
      ],
      duration: "14-18 ngày",
      groupSize: "6-8 người",
      bestTime: "Apr - Oct",
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      bgGradient: "from-violet-500/20 via-purple-500/10 to-transparent",
      flag: "🇪🇺",
      badge: "✨ PREMIUM",
      price: "$5,500",
      cities: ["Paris", "Switzerland", "Italy", "Spain"]
    },
    {
      title: "Canada Rockies",
      subtitle: "Nature's Masterpiece",
      tagline: "Thiên nhiên hoang dã & Hùng vĩ",
      route: "Vancouver → Banff → Jasper → Calgary",
      image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80",
      mapEmoji: "🏔️",
      highlights: [
        { icon: "🌲", text: "Vancouver xanh mướt" },
        { icon: "💎", text: "Hồ Louise màu ngọc" },
        { icon: "🦌", text: "Wildlife hoang dã" },
        { icon: "🚞", text: "Rocky Mountaineer" }
      ],
      duration: "10-12 ngày",
      groupSize: "6-8 người",
      bestTime: "Jun - Sep",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      bgGradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      flag: "🇨🇦",
      badge: "🌿 NATURE",
      price: "$4,000",
      cities: ["Vancouver", "Banff", "Jasper", "Lake Louise"]
    }
  ];

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 md:w-72 h-40 md:h-72 bg-secondary/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-20 right-10 w-48 md:w-80 h-48 md:h-80 bg-accent/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse" style={{animationDuration: '8s', animationDelay: '3s'}}></div>
        
        {/* Clean minimal background */}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-4 mb-8 md:mb-12">
              <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
              <div className="glass-effect px-8 py-4 rounded-2xl border border-secondary/30">
                <span className="text-sm md:text-base font-bold text-secondary uppercase tracking-wider">Private Tours</span>
              </div>
              <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
            </div>
            
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
              <span className="text-foreground">Các hành trình</span>
              <br />
              <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent italic">
                đặc biệt
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              Những cung đường được chọn lọc kỹ càng,<br className="hidden md:block" />
              mang đến trải nghiệm <span className="text-secondary font-semibold">độc nhất vô nhị</span>
            </p>
          </div>

          {/* Main Content - Interactive Cards */}
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
            
            {/* Left: Package Selector - Vertical Tabs */}
            <div className={`lg:col-span-4 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="flex lg:flex-col gap-3 md:gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar">
                {packages.map((pkg, index) => (
                  <button
                    key={index}
                    onClick={() => setActivePackage(index)}
                    className={`flex-shrink-0 lg:w-full text-left p-4 md:p-5 rounded-xl md:rounded-2xl border-2 transition-all duration-500 group ${
                      activePackage === index 
                        ? 'border-secondary bg-gradient-to-r ' + pkg.bgGradient + ' shadow-glow scale-[1.02]' 
                        : 'border-border/50 bg-background/50 hover:border-secondary/50 hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      {/* Flag */}
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-2xl md:text-3xl transition-all duration-300 ${
                        activePackage === index ? 'bg-white/20 scale-110' : 'bg-muted'
                      }`}>
                        {pkg.flag}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-display font-bold text-base md:text-lg truncate transition-colors ${
                            activePackage === index ? 'text-primary' : 'text-foreground'
                          }`}>
                            {pkg.title}
                          </h3>
                          {activePackage === index && (
                            <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded-full font-bold hidden md:inline">
                              {pkg.badge}
                            </span>
                          )}
                        </div>
                        <p className={`text-xs md:text-sm truncate transition-colors ${
                          activePackage === index ? 'text-foreground/80' : 'text-muted-foreground'
                        }`}>
                          {pkg.tagline}
                        </p>
                      </div>
                      
                      {/* Arrow indicator - desktop only */}
                      <div className={`hidden lg:block w-6 h-6 rounded-full transition-all duration-300 ${
                        activePackage === index 
                          ? 'bg-secondary text-white rotate-0' 
                          : 'bg-muted text-muted-foreground -rotate-90'
                      }`}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Active Package Detail */}
            <div className={`lg:col-span-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <Card className="overflow-hidden border-2 border-secondary/30 shadow-elegant">
                {/* Hero Image with Overlay */}
                <div className="relative h-48 md:h-64 lg:h-80 overflow-hidden">
                  <img 
                    src={packages[activePackage].image}
                    alt={packages[activePackage].title}
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${packages[activePackage].gradient} opacity-60`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 glass-premium px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/30">
                    <span className="text-white font-bold text-xs md:text-sm">{packages[activePackage].badge}</span>
                  </div>
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 glass-premium px-4 py-2 md:px-5 md:py-3 rounded-xl border border-secondary/50">
                    <p className="text-white text-xs md:text-sm">Từ</p>
                    <p className="text-secondary font-bold text-xl md:text-2xl">{packages[activePackage].price}</p>
                  </div>
                  
                  {/* Title on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-white/80 text-sm md:text-base mb-1">{packages[activePackage].subtitle}</p>
                        <h3 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-white">
                          {packages[activePackage].title}
                        </h3>
                      </div>
                      <div className="text-4xl md:text-6xl">{packages[activePackage].flag}</div>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4 md:p-6 lg:p-8">
                  {/* Route */}
                  <div className="mb-6 p-3 md:p-4 bg-muted/50 rounded-xl border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">🗺️</span>
                      <span className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider">Lộ trình</span>
                    </div>
                    <p className="text-sm md:text-base lg:text-lg font-medium text-foreground">{packages[activePackage].route}</p>
                    
                    {/* City badges */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {packages[activePackage].cities.map((city, i) => (
                        <span key={i} className="px-2 py-1 md:px-3 md:py-1.5 bg-background rounded-full text-[10px] md:text-xs font-medium text-foreground border border-border/50 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-sm md:text-base font-bold text-primary mb-3 flex items-center gap-2">
                      <span>✨</span> Điểm nhấn hành trình
                    </h4>
                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                      {packages[activePackage].highlights.map((highlight, i) => (
                        <div 
                          key={i}
                          className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg bg-muted/30 hover:bg-secondary/10 transition-colors border border-transparent hover:border-secondary/30"
                        >
                          <span className="text-lg md:text-xl">{highlight.icon}</span>
                          <span className="text-xs md:text-sm text-foreground">{highlight.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Info Row */}
                  <div className="flex flex-wrap gap-3 md:gap-4 mb-6 p-3 md:p-4 bg-gradient-to-r from-secondary/10 via-accent/5 to-secondary/10 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-base md:text-lg">📅</span>
                      <div>
                        <p className="text-[10px] md:text-xs text-muted-foreground">Thời gian</p>
                        <p className="text-xs md:text-sm font-bold text-foreground">{packages[activePackage].duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-base md:text-lg">👥</span>
                      <div>
                        <p className="text-[10px] md:text-xs text-muted-foreground">Nhóm</p>
                        <p className="text-xs md:text-sm font-bold text-foreground">{packages[activePackage].groupSize}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-base md:text-lg">🌤️</span>
                      <div>
                        <p className="text-[10px] md:text-xs text-muted-foreground">Mùa đẹp</p>
                        <p className="text-xs md:text-sm font-bold text-foreground">{packages[activePackage].bestTime}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={scrollToForm}
                      className={`flex-1 bg-gradient-to-r ${packages[activePackage].gradient} hover:shadow-glow text-white font-bold text-sm md:text-base py-5 md:py-6 rounded-xl transition-all duration-300 hover:scale-[1.02]`}
                    >
                      <span className="mr-2">📞</span>
                      Đặt tư vấn ngay
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={scrollToForm}
                      className="flex-1 sm:flex-none border-2 border-secondary/50 hover:bg-secondary/10 font-bold text-sm md:text-base py-5 md:py-6 rounded-xl"
                    >
                      <span className="mr-2">📋</span>
                      Xem lịch trình chi tiết
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className={`mt-12 md:mt-16 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block glass-premium p-5 md:p-8 rounded-2xl md:rounded-3xl border border-secondary/30 hover:border-secondary/50 transition-all duration-500 hover:shadow-glow">
              <div className="flex items-center justify-center gap-2 md:gap-3 mb-3">
                <span className="text-xl md:text-2xl">🎯</span>
                <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
                <span className="text-xl md:text-2xl">🎯</span>
              </div>
              <p className="font-display text-lg md:text-2xl lg:text-3xl font-bold mb-2">
                <span className="text-gradient">Chưa thấy điểm đến mong muốn?</span>
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                Vinh sẽ <span className="text-secondary font-semibold">thiết kế hành trình riêng</span> cho gia đình bạn 🌟
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourPackages;
