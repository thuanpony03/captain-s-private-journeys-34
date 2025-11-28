import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const scrolled = window.scrollY;
        const parallaxSpeed = 0.5;
        contentRef.current.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24 pb-16 md:pb-32">
      {/* Video Background - Cinematic & Dramatic */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-110 animate-slow-zoom"
        >
          <source src="https://cdn.coverr.co/videos/coverr-beautiful-coastal-road-4519/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-accent/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/40"></div>
      </div>

      {/* Animated Particles & Light Rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Light rays */}
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-secondary/40 via-secondary/10 to-transparent rotate-12 animate-pulse-slow"></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-accent/30 via-accent/10 to-transparent -rotate-12 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating travel icons */}
        <div className="absolute top-20 left-[10%] animate-float-slow">
          <span className="text-5xl md:text-7xl opacity-20 drop-shadow-glow">✈️</span>
        </div>
        <div className="absolute top-1/3 right-[15%] animate-float-slow" style={{ animationDelay: '2s' }}>
          <span className="text-4xl md:text-6xl opacity-25 drop-shadow-glow">🌍</span>
        </div>
        <div className="absolute bottom-1/3 left-[20%] animate-float-slow" style={{ animationDelay: '3s' }}>
          <span className="text-5xl md:text-7xl opacity-20 drop-shadow-glow">🏝️</span>
        </div>
        <div className="absolute top-1/2 right-[25%] animate-float-slow" style={{ animationDelay: '4s' }}>
          <span className="text-4xl md:text-6xl opacity-15 drop-shadow-glow">⛰️</span>
        </div>
      </div>

      {/* Premium Glow Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-5 md:left-10 w-32 md:w-48 h-32 md:h-48 rounded-full bg-secondary/30 blur-[80px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-5 md:right-10 w-40 md:w-64 h-40 md:h-64 rounded-full bg-accent/25 blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-96 h-64 md:h-96 rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 container mx-auto px-4 py-12 md:py-20 text-center parallax">
        <div className="max-w-6xl mx-auto space-y-6 md:space-y-10">
          {/* Badge - Premium Edition */}
          <div className="flex items-center justify-center gap-3 md:gap-4 animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>
            <div className="glass-effect px-6 md:px-8 py-3 md:py-4 rounded-full border-2 border-secondary/50 shadow-glow">
              <p className="text-sm md:text-base uppercase tracking-widest font-bold text-secondary flex items-center gap-2">
                <span className="text-xl md:text-2xl animate-pulse-slow">⭐</span>
                <span>Premium Private Tour Experience</span>
                <span className="text-xl md:text-2xl animate-pulse-slow">⭐</span>
              </p>
            </div>
          </div>

          {/* Main Headline - Bold & Provocative */}
          <div className="space-y-3 md:space-y-5 animate-scale-in opacity-0" style={{ animationDelay: '0.3s' }}>
            <h1 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.95] tracking-tighter px-2 drop-shadow-2xl">
              <span className="inline-block animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
                ĐỪNG ĐI
              </span>
              <br />
              <span className="inline-block animate-slide-up opacity-0 text-3xl sm:text-5xl md:text-7xl lg:text-8xl" style={{ animationDelay: '0.5s' }}>
                MỸ / ÚC / ÂU
              </span>
              <br />
              <span className="relative inline-block animate-slide-up opacity-0" style={{ animationDelay: '0.6s' }}>
                <span className="relative z-10">NHƯ MỘT</span>
                <div className="absolute -inset-6 md:-inset-8 bg-accent/40 blur-3xl animate-pulse-slow"></div>
              </span>
              <br />
              <span className="inline-block bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent animate-slide-up opacity-0 text-5xl sm:text-7xl md:text-9xl lg:text-[12rem] italic" style={{ animationDelay: '0.7s' }}>
                KHÁCH
              </span>
            </h1>
          </div>

          {/* Subheadline - The Solution */}
          <div className="relative animate-slide-up opacity-0" style={{ animationDelay: '0.8s' }}>
            <div className="inline-block glass-effect p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border-3 border-secondary/50 shadow-elegant mx-2 hover:scale-105 transition-transform duration-500">
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black text-white mb-3 md:mb-4">
                HÃY ĐI NHƯ{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent italic">
                    'NGƯỜI NHÀ'
                  </span>
                  <div className="absolute -bottom-2 md:-bottom-3 left-0 right-0 h-1 md:h-2 bg-gradient-to-r from-secondary via-accent to-secondary rounded-full animate-shimmer"></div>
                </span>
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/95 font-medium flex items-center justify-center gap-3 md:gap-4">
                <span className="text-3xl md:text-4xl animate-float">👨‍✈️</span>
                <span>cùng</span>
                <span className="font-black text-secondary">Vinh Around</span>
              </p>
            </div>
          </div>
          
          {/* Value Proposition Card - Enhanced */}
          <div className="glass-effect p-6 md:p-10 lg:p-12 rounded-3xl md:rounded-[2.5rem] max-w-5xl mx-auto animate-slide-up opacity-0 border-3 border-secondary/50 shadow-elegant hover:shadow-glow transition-all duration-500 hover:scale-[1.02]" style={{ animationDelay: '0.9s' }}>
            <div className="space-y-4 md:space-y-6">
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
                <span className="text-3xl md:text-5xl animate-bounce-slow">🚙</span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-black">
                  Dịch vụ Private Tour Trọn Gói
                </h3>
                <span className="text-3xl md:text-5xl animate-bounce-slow" style={{ animationDelay: '0.5s' }}>⭐</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-white/90">
                <div className="glass-effect p-4 md:p-5 rounded-2xl border border-white/20 hover:border-secondary/50 transition-colors">
                  <p className="text-3xl md:text-4xl mb-2">🎯</p>
                  <p className="text-base md:text-lg font-bold">Xe Riêng</p>
                  <p className="text-sm md:text-base opacity-80">100% Thoải mái</p>
                </div>
                <div className="glass-effect p-4 md:p-5 rounded-2xl border border-white/20 hover:border-secondary/50 transition-colors">
                  <p className="text-3xl md:text-4xl mb-2">👥</p>
                  <p className="text-base md:text-lg font-bold">Từ 6 Khách</p>
                  <p className="text-sm md:text-base opacity-80">Nhóm nhỏ thân thiết</p>
                </div>
                <div className="glass-effect p-4 md:p-5 rounded-2xl border border-white/20 hover:border-secondary/50 transition-colors">
                  <p className="text-3xl md:text-4xl mb-2">🌟</p>
                  <p className="text-base md:text-lg font-bold">VIP Service</p>
                  <p className="text-sm md:text-base opacity-80">Như người nhà</p>
                </div>
              </div>

              <div className="pt-4 md:pt-6 border-t-2 border-secondary/40">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black flex flex-wrap items-center justify-center gap-2 md:gap-3">
                  <span className="text-3xl md:text-4xl animate-float">🏆</span>
                  <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
                    Vận hành bởi Passport Lounge
                  </span>
                  <span className="text-3xl md:text-4xl animate-float" style={{ animationDelay: '1s' }}>🏆</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA Button - Ultra Premium */}
          <div className="pt-6 md:pt-10 animate-slide-up opacity-0 space-y-4 md:space-y-6" style={{ animationDelay: '1.1s' }}>
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="gradient-sunset hover:shadow-glow text-white text-xl sm:text-2xl md:text-3xl px-10 sm:px-16 md:px-20 py-8 sm:py-10 md:py-12 hover-lift font-black rounded-full relative overflow-hidden group border-4 border-white/30 shadow-2xl hover:scale-110 transition-all duration-500"
            >
              <span className="relative z-10 flex items-center gap-3 md:gap-5">
                <span className="text-3xl md:text-4xl animate-bounce-slow">🎯</span>
                <span className="font-display tracking-tight">NHẬN TƯ VẤN MIỄN PHÍ NGAY</span>
                <span className="text-3xl md:text-4xl animate-bounce-slow" style={{ animationDelay: '0.5s' }}>✨</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent/40 via-secondary/40 to-accent/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
            </Button>
            
            {/* Urgency Message */}
            <div className="glass-effect inline-block px-6 md:px-8 py-3 md:py-4 rounded-full border-2 border-accent/50 animate-pulse-slow">
              <p className="text-white font-bold text-base sm:text-lg md:text-xl flex items-center justify-center gap-2 md:gap-3">
                <span className="text-2xl md:text-3xl">🔥</span>
                <span>Chỉ còn</span>
                <span className="text-accent text-xl sm:text-2xl md:text-3xl font-black">2 SLOT</span>
                <span>trong tháng này</span>
                <span className="text-2xl md:text-3xl">🔥</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="glass-effect p-4 rounded-full border-2 border-secondary/50 shadow-gold">
          <span className="text-3xl">👇</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
