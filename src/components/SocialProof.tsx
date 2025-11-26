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
  const testimonials = [{
    name: "Gia đình chị Mai",
    location: "Đà Nẵng",
    text: "Tour Mỹ của anh Vinh quá tuyệt vời! Bố mẹ về khen nức nở. Không phải lo lắng gì, chỉ việc tận hưởng. Ăn uống rất hợp khẩu vị người Việt.",
    rating: 5,
    tour: "US West Coast",
    avatar: "👩‍👧‍👦",
    highlight: "Quá tuyệt vời",
    emoji: "🥰"
  }, {
    name: "Anh Tuấn & Gia đình",
    location: "TP.HCM",
    text: "Chú Vinh lái xe cực khéo, giới thiệu địa điểm như người thổ địa. Con tôi 8 tuổi cứ hỏi 'bao giờ đi với chú Vinh nữa ba ơi'. Dịch vụ 10/10!",
    rating: 5,
    tour: "Australia Grand Road",
    avatar: "👨‍👩‍👧",
    highlight: "Dịch vụ 10/10",
    emoji: "🤩"
  }, {
    name: "Chị Hương",
    location: "Hà Nội",
    text: "Lần đầu đi Úc mà không lo lắng gì cả. Từ visa, vé máy bay đến khách sạn, anh Vinh lo hết. Mình chỉ việc đóng tiền và lên đường. Quá đáng tiền!",
    rating: 5,
    tour: "Custom Tour",
    avatar: "👩",
    highlight: "Quá đáng tiền",
    emoji: "😍"
  }];
  return <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{
        animationDelay: '2s'
      }}></div>
        <div className="absolute top-1/2 left-1/3 text-9xl opacity-5 animate-float">💬</div>
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
              Những gia đình đã đồng hành
              <br />
              <span className="text-gradient text-4xl md:text-6xl lg:text-7xl italic">cùng Vinh Around</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-light">
              Hơn <span className="font-bold text-secondary">100+ gia đình</span> đã trải nghiệm và tin tưởng
            </p>
          </div>

          

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 animate-slide-up">
            {[{
            number: "100+",
            title: "Gia đình hài lòng",
            desc: "Trải nghiệm tuyệt vời"
          }, {
            number: "10+",
            title: "Năm kinh nghiệm",
            desc: "Chuyên gia du lịch"
          }, {
            number: "100%",
            title: "Cam kết chất lượng",
            desc: "Hoàn tiền nếu không hài lòng"
          }].map((stat, index) => <Card key={index} className="p-8 md:p-10 text-center hover-lift group bg-gradient-to-br from-card to-muted/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent group-hover:from-secondary/10 transition-all"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-secondary/10 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-lg bg-secondary/20"></div>
                  </div>
                  <p className="font-display text-4xl md:text-5xl font-bold text-gradient mb-3">{stat.number}</p>
                  <p className="font-display font-bold text-xl md:text-2xl text-primary mb-2">{stat.title}</p>
                  <p className="text-sm text-muted-foreground">{stat.desc}</p>
                </div>
              </Card>)}
          </div>

          {/* Final CTA */}
          <div className="text-center animate-zoom-in">
            <Card className="inline-block p-10 md:p-14 gradient-sunset shadow-glow hover-lift relative overflow-hidden group border-2 border-white/20">
              <div className="absolute inset-0 animate-shimmer"></div>
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative text-white">
                <p className="font-display text-2xl md:text-4xl font-bold mb-3">
                  100% Khách hàng hài lòng
                </p>
                <p className="text-lg md:text-xl opacity-95 font-light italic">
                  Cam kết hoàn tiền nếu không hài lòng về dịch vụ
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};
export default SocialProof;