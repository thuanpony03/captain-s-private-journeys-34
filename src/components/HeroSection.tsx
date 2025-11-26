import { Button } from "@/components/ui/button";
import { ChevronDown, Plane, MapPin, Sparkles } from "lucide-react";
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
          className="w-full h-full object-cover"
        >
          <source src="https://cdn.pixabay.com/video/2022/10/21/136205-765099729_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 animate-float opacity-20">
          <Plane className="w-16 h-16 text-secondary rotate-45" />
        </div>
        <div className="absolute top-40 right-20 animate-float opacity-20" style={{ animationDelay: '2s' }}>
          <MapPin className="w-20 h-20 text-secondary" />
        </div>
        <div className="absolute bottom-40 left-20 animate-float opacity-20" style={{ animationDelay: '4s' }}>
          <Sparkles className="w-14 h-14 text-secondary" />
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 container mx-auto px-4 py-20 text-center parallax">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
            <div className="h-[2px] w-20 bg-gradient-to-r from-transparent to-secondary"></div>
            <Sparkles className="w-6 h-6 text-secondary" />
            <div className="h-[2px] w-20 bg-gradient-to-l from-transparent to-secondary"></div>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-8xl font-bold text-primary-foreground leading-tight animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
            ĐỪNG ĐI MỸ/ÚC
            <br />
            <span className="relative inline-block">
              NHƯ MỘT KHÁCH
              <div className="absolute -inset-2 bg-secondary/20 blur-xl"></div>
            </span>
            <br />
            <span className="text-secondary text-5xl md:text-7xl lg:text-9xl italic">
              DU LỊCH
            </span>
          </h1>

          <div className="relative animate-slide-up opacity-0" style={{ animationDelay: '0.6s' }}>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-primary-foreground/95 mb-4">
              HÃY ĐI NHƯ{" "}
              <span className="text-secondary italic">'NGƯỜI NHÀ'</span>
            </h2>
            <p className="text-xl md:text-2xl text-primary-foreground/90 font-light">
              cùng Captain Vinh
            </p>
          </div>
          
          <div className="glass-effect p-6 md:p-8 rounded-2xl max-w-3xl mx-auto animate-slide-up opacity-0 border-secondary/30" style={{ animationDelay: '0.8s' }}>
            <p className="text-lg md:text-2xl text-primary-foreground/95 font-medium mb-2">
              Dịch vụ Private Tour Trọn Gói - Xe Riêng
            </p>
            <p className="text-base md:text-xl text-primary-foreground/85 font-light">
              Khởi hành từ nhóm 6 khách
            </p>
            <div className="mt-4 h-[1px] w-full bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
            <p className="text-sm md:text-lg text-secondary font-semibold mt-4">
              ✨ Được vận hành bởi Passport Lounge ✨
            </p>
          </div>
          
          <div className="pt-6 animate-slide-up opacity-0" style={{ animationDelay: '1s' }}>
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg md:text-xl px-12 md:px-16 py-7 md:py-8 shadow-gold hover-lift font-bold rounded-full relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                NHẬN TƯ VẤN LỊCH TRÌNH RIÊNG
                <Sparkles className="w-5 h-5" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="glass-effect p-3 rounded-full">
          <ChevronDown className="w-8 h-8 text-secondary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
