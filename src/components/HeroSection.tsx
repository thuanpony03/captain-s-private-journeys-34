import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-110"
        >
          <source src="https://cdn.pixabay.com/video/2022/10/21/136205-765099729_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 gradient-hero"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/30"></div>
      </div>

      {/* Animated Travel Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 animate-plane-fly">
          <span className="text-6xl opacity-30">✈️</span>
        </div>
        <div className="absolute top-40 right-20 animate-float opacity-20 text-7xl">
          🌍
        </div>
        <div className="absolute bottom-40 left-10 animate-wave opacity-20 text-6xl">
          🏝️
        </div>
        <div className="absolute top-1/3 left-1/4 animate-pulse-slow opacity-10 text-8xl">
          ⛰️
        </div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-secondary/20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full bg-accent/20 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 container mx-auto px-4 py-20 text-center parallax">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Top Decorative Line */}
          <div className="flex items-center justify-center gap-4 animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
            <div className="h-[3px] w-24 bg-gradient-to-r from-transparent via-secondary to-accent rounded-full"></div>
            <span className="text-4xl animate-float">✨</span>
            <div className="h-[3px] w-24 bg-gradient-to-l from-transparent via-accent to-secondary rounded-full"></div>
          </div>

          {/* Main Headline */}
          <div className="space-y-6 animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-9xl font-bold text-primary-foreground leading-[1.1] tracking-tight">
              ĐỪNG ĐI MỸ/ÚC
              <br />
              <span className="relative inline-block">
                NHƯ MỘT
                <div className="absolute -inset-4 bg-secondary/30 blur-2xl animate-pulse-slow"></div>
              </span>
              <br />
              <span className="text-gradient text-6xl md:text-8xl lg:text-[10rem] italic font-display">
                KHÁCH DU LỊCH
              </span>
            </h1>
          </div>

          <div className="relative animate-slide-up opacity-0" style={{ animationDelay: '0.6s' }}>
            <div className="inline-block glass-effect p-8 rounded-3xl border-2 border-secondary/30 shadow-glow">
              <h2 className="font-display text-3xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-3">
                HÃY ĐI NHƯ{" "}
                <span className="text-secondary italic relative">
                  'NGƯỜI NHÀ'
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-accent rounded-full"></div>
                </span>
              </h2>
              <p className="text-2xl md:text-3xl text-primary-foreground/95 font-light flex items-center justify-center gap-3">
                <span className="text-3xl">👨‍✈️</span>
                cùng Captain Vinh
              </p>
            </div>
          </div>
          
          {/* Info Card */}
          <div className="glass-effect p-8 md:p-10 rounded-3xl max-w-4xl mx-auto animate-slide-up opacity-0 border-2 border-secondary/40 shadow-elegant" style={{ animationDelay: '0.8s' }}>
            <div className="space-y-4">
              <p className="text-xl md:text-3xl text-primary-foreground font-bold mb-3 flex items-center justify-center gap-3">
                <span className="text-3xl">🚙</span>
                Dịch vụ Private Tour Trọn Gói
                <span className="text-3xl">⭐</span>
              </p>
              <p className="text-lg md:text-2xl text-primary-foreground/90 font-medium">
                Xe Riêng • Khởi hành từ nhóm 6 khách
              </p>
              <div className="mt-6 pt-6 border-t-2 border-secondary/30">
                <p className="text-lg md:text-2xl font-bold flex items-center justify-center gap-3">
                  <span className="text-3xl animate-float">🏆</span>
                  <span className="text-gradient">Được vận hành bởi Passport Lounge</span>
                  <span className="text-3xl animate-float" style={{ animationDelay: '1s' }}>🏆</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="pt-8 animate-slide-up opacity-0" style={{ animationDelay: '1s' }}>
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="gradient-sunset hover:shadow-glow text-accent-foreground text-xl md:text-2xl px-16 md:px-20 py-8 md:py-10 hover-lift font-bold rounded-full relative overflow-hidden group border-2 border-white/20"
            >
              <span className="relative z-10 flex items-center gap-4">
                <span className="text-3xl animate-wave">🎯</span>
                <span className="font-display">NHẬN TƯ VẤN LỊCH TRÌNH RIÊNG</span>
                <span className="text-3xl animate-wave" style={{ animationDelay: '0.5s' }}>✨</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
            </Button>
            <p className="mt-6 text-primary-foreground/80 text-base md:text-lg font-medium flex items-center justify-center gap-2">
              <span className="text-2xl">👇</span>
              <span>Chỉ còn 2 slot trong tháng này</span>
              <span className="text-2xl">👇</span>
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="glass-effect p-4 rounded-full border-2 border-secondary/50 shadow-gold">
          <ChevronDown className="w-10 h-10 text-secondary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
