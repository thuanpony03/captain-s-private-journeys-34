import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroTravel from "@/assets/hero-travel.jpg";

gsap.registerPlugin(ScrollTrigger);

const ParallaxShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background layer - moves slowest
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Middle layer - medium speed
      gsap.to(midRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Foreground layer - moves fastest
      gsap.to(fgRef.current, {
        yPercent: -50,
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
      className="relative h-screen overflow-hidden bg-muted"
    >
      {/* Background Layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[120%]"
        style={{ top: '-10%' }}
      >
        <img
          src={heroTravel}
          alt="Travel background"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Middle Layer - Mountains/Clouds */}
      <div
        ref={midRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center space-y-8">
          <div className="text-9xl animate-float">⛰️</div>
          <div className="glass-effect p-10 rounded-3xl border-2 border-secondary/30 max-w-2xl mx-auto">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
              Trải nghiệm <span className="text-gradient italic">đa chiều</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Mỗi hành trình là một câu chuyện độc đáo
            </p>
          </div>
        </div>
      </div>

      {/* Foreground Layer - Car */}
      <div
        ref={fgRef}
        className="absolute bottom-20 left-1/2 -translate-x-1/2"
      >
        <div className="text-9xl animate-wave">
          🚙
        </div>
      </div>
    </section>
  );
};

export default ParallaxShowcase;
