import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Star, Quote, Heart, Award, TrendingUp } from "lucide-react";

const SocialProof = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const rect = card.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.05 * (index + 1);
            card.style.transform = `translateY(${-scrolled * parallaxSpeed}px)`;
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const testimonials = [
    {
      name: "Gia đình chị Mai",
      location: "Đà Nẵng",
      text: "Tour Mỹ của anh Vinh quá tuyệt vời! Bố mẹ về khen nức nở. Không phải lo lắng gì, chỉ việc tận hưởng. Ăn uống rất hợp khẩu vị người Việt.",
      rating: 5,
      tour: "US West Coast",
      avatar: "👩‍👧‍👦",
      highlight: "Tour tuyệt vời"
    },
    {
      name: "Anh Tuấn & Gia đình",
      location: "TP.HCM",
      text: "Chú Vinh lái xe cực khéo, giới thiệu địa điểm như người thổ địa. Con tôi 8 tuổi cứ hỏi 'bao giờ đi với chú Vinh nữa ba ơi'. Dịch vụ 10/10!",
      rating: 5,
      tour: "Australia Grand Road",
      avatar: "👨‍👩‍👧",
      highlight: "Dịch vụ 10/10"
    },
    {
      name: "Chị Hương",
      location: "Hà Nội",
      text: "Lần đầu đi Úc mà không lo lắng gì cả. Từ visa, vé máy bay đến khách sạn, anh Vinh lo hết. Mình chỉ việc đóng tiền và lên đường. Quá đáng tiền!",
      rating: 5,
      tour: "Custom Tour",
      avatar: "👩",
      highlight: "Quá đáng tiền"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-secondary fill-secondary" />
              <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
              <Heart className="w-6 h-6 text-secondary fill-secondary" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary">
              Những gia đình đã đồng hành
              <br />
              <span className="text-secondary italic">cùng Vinh</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-light">
              Hơn <span className="font-bold text-secondary">100+ gia đình</span> đã trải nghiệm và tin tưởng
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10 mb-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="parallax"
              >
                <Card 
                  className="p-8 hover-lift relative overflow-hidden group h-full"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Background Decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-all duration-500"></div>
                  
                  {/* Quote Icon */}
                  <Quote className="absolute top-6 right-6 w-16 h-16 text-secondary/10 group-hover:text-secondary/20 transition-colors" />
                  
                  {/* Avatar */}
                  <div className="mb-6 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center text-3xl animate-float">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-display font-bold text-xl text-primary">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        📍 {testimonial.location}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-6 h-6 fill-secondary text-secondary transform group-hover:scale-110 transition-transform" 
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-foreground leading-relaxed mb-6 relative z-10 text-base md:text-lg">
                    "{testimonial.text}"
                  </p>

                  {/* Highlight Quote */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-secondary/10 to-transparent rounded-lg border-l-4 border-secondary">
                    <p className="font-bold text-secondary italic">"{testimonial.highlight}"</p>
                  </div>

                  {/* Tour Badge */}
                  <div className="border-t pt-6">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary/20 to-primary/20 px-4 py-2 rounded-full">
                      <Award className="w-4 h-4 text-secondary" />
                      <p className="text-sm font-bold text-foreground">{testimonial.tour}</p>
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary/30 rounded-xl transition-all duration-500 pointer-events-none"></div>
                </Card>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-6 mb-16 animate-slide-up">
            <Card className="p-6 text-center hover-lift group bg-gradient-to-br from-secondary/5 to-transparent">
              <div className="text-5xl mb-3 animate-float">100+</div>
              <p className="font-display font-bold text-xl text-primary mb-2">Gia đình hài lòng</p>
              <p className="text-sm text-muted-foreground">Trải nghiệm tuyệt vời</p>
            </Card>
            <Card className="p-6 text-center hover-lift group bg-gradient-to-br from-primary/5 to-transparent">
              <div className="text-5xl mb-3 animate-float" style={{ animationDelay: '1s' }}>10+</div>
              <p className="font-display font-bold text-xl text-primary mb-2">Năm kinh nghiệm</p>
              <p className="text-sm text-muted-foreground">Chuyên gia du lịch</p>
            </Card>
            <Card className="p-6 text-center hover-lift group bg-gradient-to-br from-secondary/5 to-transparent">
              <div className="text-5xl mb-3 animate-float" style={{ animationDelay: '2s' }}>100%</div>
              <p className="font-display font-bold text-xl text-primary mb-2">Cam kết chất lượng</p>
              <p className="text-sm text-muted-foreground">Hoàn tiền nếu không hài lòng</p>
            </Card>
          </div>

          {/* Final CTA */}
          <div className="text-center animate-zoom-in">
            <Card className="inline-block p-10 bg-gradient-to-br from-secondary via-primary to-secondary shadow-gold hover-lift relative overflow-hidden group">
              <div className="absolute inset-0 animate-shimmer"></div>
              <div className="relative flex flex-col md:flex-row items-center gap-6">
                <div className="flex gap-2">
                  <div className="text-5xl md:text-6xl animate-float">🤝</div>
                  <div className="text-5xl md:text-6xl animate-float" style={{ animationDelay: '1s' }}>💯</div>
                </div>
                <div className="text-primary-foreground">
                  <p className="font-display text-2xl md:text-3xl font-bold mb-2">
                    100% Khách hàng hài lòng
                  </p>
                  <p className="text-lg md:text-xl opacity-90 font-light">
                    Cam kết hoàn tiền nếu không hài lòng về dịch vụ
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

export default SocialProof;
