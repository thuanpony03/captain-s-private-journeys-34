import { useEffect, useRef } from "react";
import heroImage from "@/assets/hero-captain.jpg";
import { Quote, Award, Heart, Star } from "lucide-react";

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
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-secondary"></div>
              <Star className="w-6 h-6 text-secondary fill-secondary" />
              <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-secondary"></div>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
              Gặp gỡ Road Captain của bạn
            </h2>
            <p className="text-xl text-muted-foreground font-light italic">
              Người đưa bạn đi du lịch như "người nhà"
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Portrait */}
            <div className="order-2 md:order-1">
              <div ref={imageRef} className="relative rounded-3xl overflow-hidden shadow-elegant hover-lift group parallax">
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"></div>
                <img 
                  src={heroImage} 
                  alt="Captain Vinh" 
                  className="w-full h-[600px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent opacity-90"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-6 right-6 glass-effect px-6 py-3 rounded-full border-2 border-secondary/50 animate-float">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-secondary" />
                    <span className="text-primary-foreground font-bold">10+ Years</span>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="glass-effect p-6 rounded-2xl border-secondary/30">
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                      Captain Vinh
                    </h3>
                    <p className="text-lg text-primary-foreground/90 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-secondary fill-secondary" />
                      Your Road Captain with Passion
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Story */}
            <div className="order-1 md:order-2 space-y-6 animate-slide-up">
              <div className="relative">
                <Quote className="absolute -top-4 -left-4 w-16 h-16 text-secondary/20" />
                <div className="prose prose-lg max-w-none relative z-10">
                  <p className="text-lg md:text-xl leading-relaxed text-foreground">
                    <span className="font-display text-3xl md:text-4xl font-bold text-primary block mb-6">
                      Chào bạn, tôi là Vinh Around.
                    </span>
                  </p>
                  
                  <p className="text-lg md:text-xl leading-relaxed text-foreground mb-6">
                    <span className="font-semibold text-secondary">10 năm cầm lái</span> trên những cung đường Mỹ, Úc, Âu, tôi nhận ra: 
                    <span className="font-bold text-primary"> Người Việt mình đi du lịch 'khổ' quá.</span>
                  </p>
                  
                  <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                    Khổ vì phải dậy sớm chạy tour, khổ vì ăn uống không hợp, khổ vì lo lắng thủ tục...
                  </p>
                  
                  <div className="relative overflow-hidden rounded-2xl p-1 mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-secondary animate-shimmer"></div>
                    <div className="relative bg-card rounded-2xl p-6">
                      <p className="text-lg md:text-xl leading-relaxed text-foreground">
                        Tôi lập ra <span className="font-display font-bold text-secondary text-2xl">Passport Lounge</span> không phải để bán tour đại trà. 
                        Tôi muốn trở thành <span className="font-bold text-primary italic">'Người bạn đường thổ địa'</span> của gia đình bạn.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-secondary/10 to-primary/10 p-8 rounded-2xl border-2 border-secondary/20 mt-8 hover-lift">
                    <ul className="space-y-4 text-lg">
                      <li className="flex items-start gap-4 group">
                        <span className="text-3xl transform group-hover:scale-125 transition-transform">🚗</span>
                        <span className="flex-1 font-medium">
                          Tôi <span className="text-secondary font-bold">lái xe</span> để bạn rảnh tay ngắm cảnh
                        </span>
                      </li>
                      <li className="flex items-start gap-4 group">
                        <span className="text-3xl transform group-hover:scale-125 transition-transform">✈️</span>
                        <span className="flex-1 font-medium">
                          Tôi <span className="text-secondary font-bold">lo vé máy bay</span> để bạn thảnh thơi ngủ ngon
                        </span>
                      </li>
                      <li className="flex items-start gap-4 group">
                        <span className="text-3xl transform group-hover:scale-125 transition-transform">🍜</span>
                        <span className="flex-1 font-medium">
                          Tôi <span className="text-secondary font-bold">chọn quán ăn</span> để bạn ấm bụng như ở nhà
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t-2 border-secondary/20">
                    <p className="font-display text-4xl md:text-5xl text-primary italic font-bold">
                      Captain Vinh
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-1 w-20 bg-secondary rounded-full"></div>
                      <Heart className="w-4 h-4 text-secondary fill-secondary" />
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
