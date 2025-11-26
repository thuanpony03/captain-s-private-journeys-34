import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

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
      highlight: "Quá tuyệt vời",
      emoji: "🥰"
    },
    {
      name: "Anh Tuấn & Gia đình",
      location: "TP.HCM",
      text: "Chú Vinh lái xe cực khéo, giới thiệu địa điểm như người thổ địa. Con tôi 8 tuổi cứ hỏi 'bao giờ đi với chú Vinh nữa ba ơi'. Dịch vụ 10/10!",
      rating: 5,
      tour: "Australia Grand Road",
      avatar: "👨‍👩‍👧",
      highlight: "Dịch vụ 10/10",
      emoji: "🤩"
    },
    {
      name: "Chị Hương",
      location: "Hà Nội",
      text: "Lần đầu đi Úc mà không lo lắng gì cả. Từ visa, vé máy bay đến khách sạn, anh Vinh lo hết. Mình chỉ việc đóng tiền và lên đường. Quá đáng tiền!",
      rating: 5,
      tour: "Custom Tour",
      avatar: "👩",
      highlight: "Quá đáng tiền",
      emoji: "😍"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 text-9xl opacity-5 animate-float">💬</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-5xl animate-float">❤️</span>
              <div className="h-[3px] w-24 bg-gradient-to-r from-transparent via-secondary to-accent rounded-full"></div>
              <span className="text-5xl animate-float" style={{ animationDelay: '1s' }}>❤️</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Những gia đình đã đồng hành
              <br />
              <span className="text-gradient text-5xl md:text-7xl lg:text-8xl italic">cùng Captain Vinh</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-light flex items-center justify-center gap-3">
              <span className="text-3xl">🏆</span>
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
                  className="p-8 md:p-10 hover-lift relative overflow-hidden group h-full bg-gradient-to-br from-card to-muted/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Background Decoration */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                  
                  {/* Quote Icon */}
                  <span className="absolute top-6 right-6 text-7xl opacity-10 group-hover:opacity-20 transition-opacity">"</span>
                  
                  {/* Avatar & Name */}
                  <div className="mb-6 flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary/30 to-accent/30 flex items-center justify-center text-5xl animate-float border-2 border-secondary/20">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-display font-bold text-2xl text-primary">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="text-lg">📍</span>
                        {testimonial.location}
                      </p>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span 
                        key={i} 
                        className="text-3xl animate-wave" 
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-foreground leading-relaxed mb-6 relative z-10 text-base md:text-lg">
                    "{testimonial.text}"
                  </p>

                  {/* Highlight Quote */}
                  <div className="mb-6 p-5 bg-gradient-to-r from-secondary/20 to-accent/10 rounded-2xl border-l-4 border-secondary shadow-md">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl animate-wave">{testimonial.emoji}</span>
                      <p className="font-bold text-secondary italic text-xl">"{testimonial.highlight}"</p>
                    </div>
                  </div>

                  {/* Tour Badge */}
                  <div className="border-t-2 border-secondary/20 pt-6">
                    <div className="inline-flex items-center gap-3 gradient-sunset px-6 py-3 rounded-full text-white shadow-gold">
                      <span className="text-2xl">🎫</span>
                      <p className="text-base font-bold">{testimonial.tour}</p>
                    </div>
                  </div>

                  {/* Hover Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary/40 rounded-xl transition-all duration-500 pointer-events-none"></div>
                </Card>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 animate-slide-up">
            {[
              { icon: "💯", number: "100+", title: "Gia đình hài lòng", desc: "Trải nghiệm tuyệt vời" },
              { icon: "🏆", number: "10+", title: "Năm kinh nghiệm", desc: "Chuyên gia du lịch" },
              { icon: "✅", number: "100%", title: "Cam kết chất lượng", desc: "Hoàn tiền nếu không hài lòng" }
            ].map((stat, index) => (
              <Card 
                key={index}
                className="p-8 md:p-10 text-center hover-lift group bg-gradient-to-br from-card to-muted/20 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent group-hover:from-secondary/10 transition-all"></div>
                <div className="relative z-10">
                  <div className="text-7xl mb-4 animate-float" style={{ animationDelay: `${index}s` }}>
                    {stat.icon}
                  </div>
                  <p className="font-display text-5xl md:text-6xl font-bold text-gradient mb-3">{stat.number}</p>
                  <p className="font-display font-bold text-xl md:text-2xl text-primary mb-2">{stat.title}</p>
                  <p className="text-sm text-muted-foreground">{stat.desc}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Final CTA */}
          <div className="text-center animate-zoom-in">
            <Card className="inline-block p-10 md:p-14 gradient-sunset shadow-glow hover-lift relative overflow-hidden group border-2 border-white/20">
              <div className="absolute inset-0 animate-shimmer"></div>
              <div className="relative flex flex-col md:flex-row items-center gap-6">
                <div className="flex gap-3">
                  <span className="text-7xl md:text-8xl animate-float">🤝</span>
                  <span className="text-7xl md:text-8xl animate-float" style={{ animationDelay: '1s' }}>💯</span>
                </div>
                <div className="text-white">
                  <p className="font-display text-3xl md:text-5xl font-bold mb-3">
                    100% Khách hàng hài lòng
                  </p>
                  <p className="text-xl md:text-2xl opacity-95 font-light italic">
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
