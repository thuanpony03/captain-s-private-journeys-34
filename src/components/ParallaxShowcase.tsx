import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ParallaxShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgMountainRef = useRef<HTMLDivElement>(null);
  const midMountainRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background mountains - slowest
      gsap.to(bgMountainRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Mid mountains - medium
      gsap.to(midMountainRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Road - medium fast
      gsap.to(roadRef.current, {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Car - fastest
      gsap.to(carRef.current, {
        yPercent: -45,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Text - slow parallax only (no opacity fade)
      gsap.to(textRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background"
    >
      {/* Layer 1: Background Mountains (Far) */}
      <div
        ref={bgMountainRef}
        className="absolute inset-0 w-full h-[120%]"
        style={{ top: '-10%' }}
      >
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
          alt="Distant mountains"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/70"></div>
      </div>

      {/* Layer 2: Mid Mountains (Closer) */}
      <div
        ref={midMountainRef}
        className="absolute inset-0 w-full h-[110%]"
        style={{ top: '-5%' }}
      >
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80"
          alt="Mountain range"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/80"></div>
      </div>

      {/* Layer 3: Road/Landscape */}
      <div
        ref={roadRef}
        className="absolute inset-0 flex items-end justify-center"
      >
        <div className="relative w-full h-2/3">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
            alt="Scenic road"
            className="w-full h-full object-cover object-top opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
        </div>
      </div>

      {/* Layer 4: Car (Foreground) */}
      <div
        ref={carRef}
        className="absolute bottom-0 left-0 right-0"
      >
        <div className="relative h-56 md:h-80 max-w-6xl mx-auto px-4 flex items-end justify-center">
          <img
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80"
            alt="Luxury car"
            className="w-full max-w-3xl h-auto object-contain drop-shadow-2xl opacity-90"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none"></div>
      </div>

      {/* Text Overlay - Top Center with Strong Background */}
      <div
        ref={textRef}
        className="absolute top-16 md:top-24 left-0 right-0 z-30 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-secondary"></div>
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-lg shadow-secondary/50"></div>
            <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-secondary"></div>
          </div>
          
          {/* Main heading with strong glass background */}
          <div className="inline-block glass-effect bg-background/80 backdrop-blur-xl p-6 md:p-10 lg:p-12 rounded-3xl border-2 border-secondary/60 shadow-2xl">
            <h2 className="font-display text-3xl md:text-5xl lg:text-7xl font-bold mb-3 md:mb-4">
              <span className="text-foreground">Trải nghiệm </span>
              <span className="text-gradient italic">đa chiều</span>
            </h2>
            <p className="text-base md:text-xl lg:text-2xl text-foreground/80 font-light">
              Mỗi hành trình là một câu chuyện độc đáo
            </p>
            
            {/* Feature badges */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-8">
              <div className="glass-effect bg-background/70 p-3 md:p-4 rounded-xl border border-secondary/50 hover:border-secondary/80 transition-colors">
                <p className="text-2xl md:text-3xl mb-1">🏔️</p>
                <p className="text-xs md:text-sm font-bold text-foreground">Thiên nhiên hùng vĩ</p>
              </div>
              <div className="glass-effect bg-background/70 p-3 md:p-4 rounded-xl border border-accent/50 hover:border-accent/80 transition-colors">
                <p className="text-2xl md:text-3xl mb-1">🚗</p>
                <p className="text-xs md:text-sm font-bold text-foreground">Xe sang thoải mái</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 md:w-[500px] h-80 md:h-[500px] bg-accent/8 rounded-full blur-[140px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  );
};

export default ParallaxShowcase;
