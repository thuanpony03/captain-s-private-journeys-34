import { useEffect, useRef } from "react";
import heroImage from "@/assets/hero-captain.jpg";

const PersonalStory = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrolled = window.scrollY - sectionRef.current.offsetTop;
        const parallaxSpeed = 0.3;
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          imageRef.current.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-muted relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl opacity-5 animate-rotate-slow">
          🌏
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[3px] w-20 bg-gradient-to-r from-transparent to-secondary rounded-full"></div>
              <span className="text-5xl animate-float">👨‍✈️</span>
              <div className="h-[3px] w-20 bg-gradient-to-l from-transparent to-secondary rounded-full"></div>
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-primary">Gặp gỡ</span>{" "}
              <span className="text-gradient">Road Captain</span>
              <br />
              <span className="text-primary">của bạn</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-light italic flex items-center justify-center gap-3">
              <span className="text-3xl">🤝</span>
              Người đưa bạn đi du lịch như "người nhà"
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Portrait */}
            <div className="order-2 md:order-1">
              <div ref={imageRef} className="relative rounded-3xl overflow-hidden shadow-elegant hover-lift group parallax">
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 z-10"></div>
                <img 
                  src={heroImage} 
                  alt="Captain Vinh - Your trusted road captain" 
                  className="w-full h-[600px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-80"></div>
                
                {/* Floating Badges */}
                <div className="absolute top-6 right-6 space-y-3">
                  <div className="glass-effect px-6 py-3 rounded-full border-2 border-secondary/50 animate-float shadow-gold">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🏆</span>
                      <span className="text-primary-foreground font-bold text-lg">10+ Năm</span>
                    </div>
                  </div>
                  <div className="glass-effect px-6 py-3 rounded-full border-2 border-accent/50 animate-float shadow-gold" style={{ animationDelay: '1s' }}>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">⭐</span>
                      <span className="text-primary-foreground font-bold text-lg">100+ Tours</span>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Info Card */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="glass-effect p-8 rounded-2xl border-2 border-secondary/40 shadow-gold">
                    <h3 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-3 flex items-center gap-3">
                      <span className="text-4xl">👨‍✈️</span>
                      Captain Vinh
                    </h3>
                    <p className="text-xl text-primary-foreground/95 flex items-center gap-3">
                      <span className="text-2xl">❤️</span>
                      <span>Your Road Captain with Passion</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Story Content */}
            <div className="order-1 md:order-2 space-y-6 animate-slide-up">
              <div className="relative">
                <span className="absolute -top-6 -left-6 text-8xl opacity-10">"</span>
                <div className="space-y-6 relative z-10">
                  <p className="text-2xl md:text-3xl leading-relaxed text-foreground">
                    <span className="font-display text-4xl md:text-5xl font-bold text-primary block mb-6">
                      Chào bạn, tôi là Vinh Around.
                    </span>
                  </p>
                  
                  <p className="text-xl md:text-2xl leading-relaxed text-foreground">
                    <span className="font-bold text-secondary text-2xl">10 năm cầm lái</span> trên những cung đường Mỹ, Úc, Âu, tôi nhận ra điều này:
                  </p>
                  
                  <div className="relative overflow-hidden rounded-2xl p-1">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent via-secondary to-accent animate-shimmer"></div>
                    <div className="relative bg-card rounded-2xl p-8">
                      <p className="text-xl md:text-2xl leading-relaxed text-foreground font-bold text-center">
                        Người Việt mình đi du lịch <span className="text-destructive text-3xl">'KHỔ'</span> quá!
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    Khổ vì phải dậy sớm chạy tour, khổ vì ăn uống không hợp, khổ vì lo lắng thủ tục...
                  </p>
                  
                  <div className="bg-gradient-to-br from-secondary/20 via-accent/10 to-primary/10 p-8 md:p-10 rounded-3xl border-2 border-secondary/30 shadow-elegant hover-lift">
                    <p className="text-xl md:text-2xl leading-relaxed text-foreground mb-6">
                      Tôi lập ra <span className="font-display font-bold text-secondary text-3xl">Passport Lounge</span> không phải để bán tour đại trà.
                    </p>
                    <p className="text-xl md:text-2xl leading-relaxed text-foreground font-bold">
                      Tôi muốn trở thành <span className="text-gradient text-3xl italic">'Người bạn đường thổ địa'</span> của gia đình bạn.
                    </p>
                  </div>
                  
                  {/* Value Props */}
                  <div className="space-y-4 pt-6">
                    {[
                      { icon: "🚗", text: "lái xe", desc: "để bạn rảnh tay ngắm cảnh" },
                      { icon: "✈️", text: "lo vé máy bay", desc: "để bạn thảnh thơi ngủ ngon" },
                      { icon: "🍜", text: "chọn quán ăn", desc: "để bạn ấm bụng như ở nhà" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4 group hover-lift transition-all">
                        <span className="text-5xl animate-wave" style={{ animationDelay: `${i * 0.5}s` }}>
                          {item.icon}
                        </span>
                        <div className="flex-1 bg-card/50 backdrop-blur-sm p-5 rounded-2xl border border-secondary/20">
                          <p className="text-lg md:text-xl font-bold text-foreground">
                            Tôi <span className="text-secondary text-2xl">{item.text}</span>
                          </p>
                          <p className="text-muted-foreground mt-2">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-10 pt-8 border-t-2 border-secondary/30">
                    <p className="font-display text-5xl md:text-6xl text-primary italic font-bold mb-3">
                      Captain Vinh
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="h-2 w-32 gradient-sunset rounded-full animate-pulse-slow"></div>
                      <span className="text-3xl animate-float">❤️</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalStory;
