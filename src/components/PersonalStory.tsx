import { useEffect, useRef } from "react";

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
    <section ref={sectionRef} className="py-32 md:py-48 bg-muted relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Magazine Layout: Large Photo Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Large Portrait Photo */}
            <div className="order-1 lg:order-1">
              <div ref={imageRef} className="lg:sticky lg:top-32 rounded-2xl md:rounded-3xl overflow-hidden shadow-float parallax">
                <img 
                  alt="Vinh Around - Your trusted road captain"
                  className="w-full h-[400px] md:h-[500px] lg:h-[700px] object-cover" 
                  src="/lovable-uploads/576f0773-8f19-4601-901e-115efd9c4874.jpg"
                />
                
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
                
                {/* Floating Info Badge */}
                <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8">
                  <div className="glass-effect p-4 md:p-6 rounded-xl md:rounded-2xl border border-white/10">
                    <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1">
                      Vinh Around
                    </h3>
                    <p className="text-base text-white/90">
                      Road Captain with 10+ Years Experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Editorial Text Content */}
            <div className="order-2 lg:order-2 space-y-8 animate-slide-up">
              {/* Small Heading */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-16 bg-secondary"></div>
                  <p className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">
                    Meet Your Guide
                  </p>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
                  Chào bạn, tôi là Vinh Around.
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-foreground leading-relaxed">
                  <span className="font-bold text-secondary">10 năm cầm lái</span> trên những cung đường Mỹ, Úc, Âu, tôi nhận ra điều này:
                </p>
                
                {/* Editorial Headline - Large Serif Quote */}
                <div className="relative py-8 my-8">
                  <div className="absolute -left-4 top-0 text-9xl text-secondary/10 font-display leading-none">"</div>
                  <blockquote className="relative z-10">
                    <p className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6">
                      Người Việt mình đi du lịch KHỔ quá!
                    </p>
                  </blockquote>
                  <div className="absolute -right-4 bottom-0 text-9xl text-secondary/10 font-display leading-none">"</div>
                </div>
                
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Khổ vì phải dậy sớm chạy tour, khổ vì ăn uống không hợp, khổ vì lo lắng thủ tục...
                </p>
                
                {/* Mission Statement Box */}
                <div className="bg-gradient-to-br from-secondary/10 via-accent/5 to-background p-8 md:p-10 rounded-3xl border-2 border-secondary/20 shadow-float">
                  <p className="text-lg md:text-xl text-foreground leading-relaxed mb-4">
                    Tôi lập ra <span className="font-display font-bold text-secondary text-xl md:text-2xl">Passport Lounge</span> không phải để bán tour đại trà.
                  </p>
                  <p className="text-base md:text-lg lg:text-xl text-foreground font-bold leading-relaxed">
                    Tôi muốn trở thành <span className="text-gradient text-xl md:text-2xl italic">'Người bạn đường thổ địa'</span> của gia đình bạn.
                  </p>
                </div>
                
                {/* Value Props */}
                <div className="space-y-3 md:space-y-4 pt-3 md:pt-4">
                  {[
                    { text: "lái xe", desc: "để bạn rảnh tay ngắm cảnh" },
                    { text: "lo vé máy bay", desc: "để bạn thảnh thơi ngủ ngon" },
                    { text: "chọn quán ăn", desc: "để bạn ấm bụng như ở nhà" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 md:gap-4 group transition-all">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-sm md:text-base lg:text-lg text-foreground leading-relaxed">
                          Tôi <span className="font-bold text-secondary">{item.text}</span>{" "}
                          <span className="text-muted-foreground">{item.desc}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Handwritten Signature Placeholder */}
                <div className="pt-6 md:pt-8 mt-6 md:mt-8 border-t border-secondary/20">
                  <div className="flex items-end gap-3 md:gap-4">
                    <div className="flex-1">
                      {/* Placeholder for handwritten signature image */}
                      <div className="h-16 md:h-20 flex items-center">
                        <p 
                          className="font-display text-3xl md:text-4xl lg:text-5xl text-primary italic font-bold" 
                          style={{ fontFamily: "'Brush Script MT', cursive" }}
                        >
                          Vinh Around
                        </p>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground mt-2">
                        Founder & Road Captain
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-px w-8 md:w-12 bg-secondary"></div>
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-secondary"></div>
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
