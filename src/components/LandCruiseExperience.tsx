import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
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
      description: "Mercedes/SUV cao cấp. Ghế da, tủ lạnh, WiFi. Duỗi chân thoải mái suốt hành trình.",
      icon: "🚗",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Giấc ngủ 5 sao",
      image: hotelImage,
      description: "Khách sạn ngay trung tâm, view đẹp. Phòng rộng rãi, tiện nghi hiện đại.",
      icon: "🏨",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Ẩm thực nuông chiều",
      image: foodImage,
      description: "A-la-carte cao cấp. Món Việt nóng sốt, món Âu tinh tế. Ấm bụng như ở nhà.",
      icon: "🍽️",
      color: "from-orange-500/20 to-red-500/20"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-muted relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-secondary"></div>
              <Sparkles className="w-6 h-6 text-secondary fill-secondary" />
              <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-secondary"></div>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary">
              Tiêu chuẩn{" "}
              <span className="text-secondary italic">"Du thuyền mặt đất"</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto">
              Mỗi chi tiết được chăm chút để mang đến trải nghiệm{" "}
              <span className="font-semibold text-secondary">xa hoa và thoải mái nhất</span>
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
                  className="overflow-hidden hover-lift group relative"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Image Section */}
                  <div className="relative h-72 md:h-80 overflow-hidden">
                    <img 
                      src={exp.image} 
                      alt={exp.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-80"></div>
                    
                    {/* Floating Icon */}
                    <div className="absolute top-6 right-6">
                      <div className="glass-effect p-4 rounded-2xl border-2 border-secondary/50 animate-float">
                        <span className="text-4xl">{exp.icon}</span>
                      </div>
                    </div>
                    
                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="glass-effect p-4 rounded-xl border-secondary/30">
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
                          {exp.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className={`p-6 md:p-8 bg-gradient-to-br ${exp.color} relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"></div>
                    <p className="text-card-foreground leading-relaxed text-base md:text-lg relative z-10 font-medium">
                      {exp.description}
                    </p>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary/50 rounded-xl transition-all duration-500 pointer-events-none"></div>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center animate-zoom-in">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-secondary blur-xl opacity-50 animate-pulse"></div>
              <div className="relative flex items-center gap-4 bg-card px-10 py-6 rounded-full border-4 border-secondary shadow-gold">
                <span className="text-4xl animate-float">✨</span>
                <p className="font-display text-xl md:text-2xl font-bold text-foreground">
                  Sang trọng từng chi tiết - Tận hưởng từng khoảnh khắc
                </p>
                <span className="text-4xl animate-float" style={{ animationDelay: '2s' }}>✨</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandCruiseExperience;
