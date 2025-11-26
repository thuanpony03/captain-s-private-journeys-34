import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import vehicleImage from "@/assets/luxury-vehicle.jpg";
import hotelImage from "@/assets/luxury-hotel.jpg";
import foodImage from "@/assets/gourmet-food.jpg";

const LandCruiseExperience = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const rect = card.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.1 * (index + 1);
            card.style.transform = `translateY(${scrolled * parallaxSpeed * 0.05}px)`;
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const experiences = [
    {
      title: "Đội xe thượng hạng",
      image: vehicleImage,
      description: "Mercedes/SUV cao cấp với ghế da, tủ lạnh, WiFi. Duỗi chân thoải mái suốt hành trình dài.",
      icon: "🚙",
      emoji: "😌",
      gradient: "from-blue-500/30 via-cyan-500/20 to-teal-500/30",
      features: ["Ghế da cao cấp", "WiFi & Tủ lạnh", "Không gian rộng rãi"]
    },
    {
      title: "Giấc ngủ 5 sao",
      image: hotelImage,
      description: "Khách sạn ngay trung tâm với view đẹp, phòng rộng rãi, tiện nghi hiện đại đầy đủ.",
      icon: "🏨",
      emoji: "😴",
      gradient: "from-purple-500/30 via-pink-500/20 to-rose-500/30",
      features: ["View đẹp trung tâm", "Phòng rộng rãi", "Tiện nghi 5 sao"]
    },
    {
      title: "Ẩm thực nuông chiều",
      image: foodImage,
      description: "A-la-carte cao cấp với món Việt nóng sốt, món Âu tinh tế. Ấm bụng như ở nhà.",
      icon: "🍽️",
      emoji: "🤤",
      gradient: "from-orange-500/30 via-red-500/20 to-amber-500/30",
      features: ["Món Việt nóng sốt", "Món Âu tinh tế", "Phục vụ tận tâm"]
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-muted relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-40 right-20 text-9xl opacity-5 animate-float">🚢</div>
        <div className="absolute bottom-40 left-20 text-8xl opacity-5 animate-wave">🌊</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[3px] w-24 bg-gradient-to-r from-transparent via-secondary to-accent rounded-full"></div>
              <div className="w-3 h-3 rounded-full bg-secondary animate-pulse"></div>
              <div className="h-[3px] w-24 bg-gradient-to-l from-transparent via-secondary to-accent rounded-full"></div>
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Tiêu chuẩn{" "}
              <br className="md:hidden" />
              <span className="text-gradient text-5xl md:text-7xl lg:text-8xl italic">
                "Du thuyền trên mặt đất"
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto">
              Mỗi chi tiết được chăm chút để mang đến trải nghiệm{" "}
              <span className="font-bold text-secondary">xa hoa nhất</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="parallax"
              >
                <Card 
                  className="overflow-hidden hover-lift group relative h-full"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Image Section */}
                  <div className="relative h-80 md:h-96 overflow-hidden">
                    <img 
                      src={exp.image} 
                      alt={exp.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-70"></div>
                    
                    {/* Icon Badge */}
                    <div className="absolute top-6 right-6">
                      <div className="glass-effect p-4 md:p-5 rounded-2xl border-2 border-secondary/60 shadow-glow">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-secondary/40"></div>
                      </div>
                    </div>
                    
                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <div className="glass-effect p-5 md:p-6 rounded-2xl border-2 border-secondary/40 shadow-gold">
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
                          {exp.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className={`p-8 md:p-10 bg-gradient-to-br ${exp.gradient} relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                    
                    <p className="text-foreground leading-relaxed text-base md:text-lg mb-6 relative z-10 font-medium">
                      {exp.description}
                    </p>

                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-2 relative z-10">
                      {exp.features.map((feature, i) => (
                        <div 
                          key={i} 
                          className="bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border border-secondary/20 hover:border-secondary/50 transition-all hover-lift"
                        >
                          <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary/50 rounded-xl transition-all duration-500 pointer-events-none"></div>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center animate-zoom-in">
            <div className="inline-block relative">
              <div className="absolute inset-0 gradient-sunset blur-2xl opacity-40 animate-pulse-slow"></div>
              <Card className="relative p-10 md:p-12 bg-card border-2 border-secondary shadow-glow hover-lift">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-lg bg-secondary/20"></div>
                  </div>
                  <p className="font-display text-2xl md:text-3xl font-bold text-foreground text-center">
                    Sang trọng từng chi tiết
                    <br />
                    <span className="text-gradient text-3xl md:text-4xl italic">
                      Tận hưởng từng khoảnh khắc
                    </span>
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandCruiseExperience;
