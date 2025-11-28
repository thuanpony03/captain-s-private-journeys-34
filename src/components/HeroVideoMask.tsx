import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const HeroVideoMask = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const captainImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple fade in animation
    const elements = document.querySelectorAll('.hero-animate');
    elements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('opacity-100', 'translate-y-0');
        el.classList.remove('opacity-0', 'translate-y-8');
      }, i * 200);
    });
  }, []);

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20 pb-20 md:pb-24"
    >
      {/* Dynamic Background Layers */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105"
        >
          <source src="https://cdn.pixabay.com/video/2023/10/12/184734-873923034_large.mp4" type="video/mp4" />
        </video>
        {/* Light gradient overlay - video visible */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-primary/50 to-primary/55"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Captain Vinh - The Star */}
          <div 
            ref={captainImageRef}
            className="relative order-1 flex justify-center lg:justify-start mb-8 lg:mb-0"
          >
            <div className="relative">
              {/* Main image with clean frame */}
              <div className="relative w-64 sm:w-80 md:w-96 lg:w-[420px] h-80 sm:h-96 md:h-[460px] lg:h-[520px]">
                <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-secondary/60 shadow-2xl">
                  <img 
                    src="/lovable-uploads/576f0773-8f19-4601-901e-115efd9c4874.jpg"
                    alt="Vinh Around - Your Road Captain"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
                </div>
              </div>
              
              {/* Clean Name Badge */}
              <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 glass-effect px-6 md:px-8 py-4 md:py-6 rounded-2xl border border-secondary/40 shadow-xl hero-animate opacity-0 translate-y-8 transition-all duration-1000 delay-300">
                <div className="text-center">
                  <p className="text-white font-bold text-lg md:text-xl">VINH AROUND</p>
                  <p className="text-secondary text-sm md:text-base font-semibold">Your Road Captain</p>
                  <div className="flex justify-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Experience Badge */}
              <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 glass-effect px-4 md:px-6 py-3 md:py-4 rounded-xl border border-accent/40 shadow-xl hero-animate opacity-0 translate-y-8 transition-all duration-1000 delay-200">
                <div className="text-center">
                  <p className="text-white font-bold text-lg md:text-xl">10+</p>
                  <p className="text-accent text-xs md:text-sm font-semibold">Years Exp</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-2 lg:order-2 text-center lg:text-left">
            {/* Main Headline - Mobile Optimized */}
            <div className="mb-6 md:mb-8">
              <div className="inline-flex items-center gap-3 mb-6 md:mb-8 glass-effect px-6 py-3 rounded-2xl border border-white/20 hero-animate opacity-0 translate-y-8 transition-all duration-1000 delay-100">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span className="text-sm md:text-base text-white/90 font-semibold uppercase tracking-wider">Premium Private Tours</span>
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
              </div>
              
              <h1 
                ref={titleRef}
                className="font-display font-bold mb-6 md:mb-8 hero-animate opacity-0 translate-y-8 transition-all duration-1000"
              >
                <div className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-white leading-tight mb-2 md:mb-4">
                  Đừng đi du lịch
                </div>
                <div className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl leading-tight">
                  <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent font-black italic">
                    như khách
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-white/95 leading-tight mt-4 md:mt-6 font-light">
                  Đi như <span className="text-secondary font-bold">“người nhà”</span> cùng Vinh
                </div>
              </h1>
            </div>

            {/* CTA Button - Premium & Clean */}
            <div className="hero-animate opacity-0 translate-y-8 transition-all duration-1000 delay-500 space-y-6 pb-4 md:pb-0">
              <Button 
                size="lg"
                onClick={scrollToForm}
                className="bg-gradient-to-r from-secondary to-accent text-lg md:text-xl px-12 md:px-20 py-6 md:py-8 rounded-2xl font-bold shadow-2xl hover:shadow-glow hover-lift border border-white/30 w-full sm:w-auto transition-all hover:scale-105 duration-300"
              >
                <span className="text-white font-display tracking-wide">
                  ĐẶT LỊCH CÙNG VINH
                </span>
              </Button>
              
              {/* Clean Badge */}
              <div className="inline-flex items-center gap-3 glass-effect px-6 py-3 rounded-2xl border border-white/20">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span className="text-white/90 font-medium text-sm md:text-base">
                  Còn 2 slot tháng này
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on Mobile */}
      <div className="hidden md:block absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroVideoMask;
