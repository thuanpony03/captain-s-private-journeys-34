import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const HeroVideoMask = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance animation - more dramatic
      const timeline = gsap.timeline();
      
      timeline
        .from(titleRef.current, {
          scale: 0.5,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out"
        })
        .from(".hero-subtitle", {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        }, "-=0.8")
        .from(".hero-props", {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.5)"
        }, "-=0.5");

      // Scroll-triggered zoom out - smoother
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        scale: 1.8,
        opacity: 0,
        y: -150,
        ease: "power1.inOut"
      });

      // Video scale on scroll
      gsap.to(videoRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
        scale: 1.2,
        ease: "none"
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20"
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
          <source src="https://cdn.pixabay.com/video/2022/10/21/136205-765099729_large.mp4" type="video/mp4" />
        </video>
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-background/90"></div>
        
        {/* Animated accent shapes */}
        <div className="absolute top-20 right-10 w-32 h-32 md:w-64 md:h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-32 left-10 w-40 h-40 md:w-80 md:h-80 bg-accent/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Main Headline - Mobile Optimized */}
        <div className="mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 mb-6 glass-effect px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
            <span className="text-sm md:text-base text-white/90 font-medium">Premium Private Tours</span>
          </div>
          
          <h1 
            ref={titleRef}
            className="font-display font-bold mb-4"
          >
            <div className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-2">
              Đừng đi du lịch
            </div>
            <div className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-tight hero-subtitle">
              <span className="text-gradient inline-block animate-shimmer bg-clip-text">
                như khách
              </span>
            </div>
            <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white/95 leading-tight mt-4 font-light hero-subtitle">
              Đi như <span className="text-secondary font-bold animate-pulse-slow">người nhà</span> cùng Vinh Around
            </div>
          </h1>
        </div>

        {/* Value Props - Mobile First with stagger animation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12 max-w-3xl mx-auto">
          <div className="hero-props glass-effect p-4 md:p-5 rounded-2xl border-2 border-primary/30 hover:border-secondary/60 transition-all hover-lift group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/30 group-hover:bg-secondary/30 flex items-center justify-center mb-3 mx-auto transition-colors">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <div className="text-sm md:text-base text-white font-bold">Xe riêng sang trọng</div>
          </div>
          <div className="hero-props glass-effect p-4 md:p-5 rounded-2xl border-2 border-primary/30 hover:border-secondary/60 transition-all hover-lift group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/30 group-hover:bg-secondary/30 flex items-center justify-center mb-3 mx-auto transition-colors">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <div className="text-sm md:text-base text-white font-bold">Khách sạn 5 sao</div>
          </div>
          <div className="hero-props glass-effect p-4 md:p-5 rounded-2xl border-2 border-primary/30 hover:border-secondary/60 transition-all hover-lift group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/30 group-hover:bg-secondary/30 flex items-center justify-center mb-3 mx-auto transition-colors">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <div className="text-sm md:text-base text-white font-bold">Hướng dẫn địa phương</div>
          </div>
        </div>
        
        {/* CTA Button - Mobile Optimized */}
        <Button 
          size="lg"
          onClick={scrollToForm}
          className="bg-gradient-to-r from-primary via-primary/90 to-secondary text-base sm:text-lg md:text-xl px-8 sm:px-12 md:px-16 py-6 md:py-8 rounded-full font-bold shadow-elegant hover:shadow-gold hover-lift border-2 border-white/30 w-full sm:w-auto transition-all"
        >
          <span className="flex items-center justify-center gap-2 md:gap-3 text-white">
            BẮT ĐẦU HÀNH TRÌNH
          </span>
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroVideoMask;
