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
      // Title animation
      gsap.from(titleRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
      });

      // Scroll-triggered zoom out
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        scale: 1.5,
        opacity: 0,
        y: -200,
        ease: "none"
      });

      // Video reveal on scroll
      gsap.to(videoRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        scale: 1.1,
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
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-100"
        >
          <source src="https://cdn.pixabay.com/video/2022/10/21/136205-765099729_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/70"></div>
      </div>

      {/* Text with Video Mask */}
      <div className="relative z-10 text-center">
        <h1 
          ref={titleRef}
          className="font-display font-bold text-white relative"
          style={{
            fontSize: 'clamp(3rem, 15vw, 12rem)',
            lineHeight: '1',
            WebkitTextFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            backgroundImage: 'url(https://cdn.pixabay.com/video/2022/10/21/136205-765099729_large.mp4)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          PASSPORT
          <br />
          <span className="text-gradient" style={{
            WebkitTextFillColor: 'transparent',
            backgroundImage: 'linear-gradient(135deg, hsl(38 92% 50%), hsl(14 88% 58%))',
          }}>
            LOUNGE
          </span>
        </h1>

        <div className="mt-12 space-y-6 animate-slide-up opacity-0" style={{ animationDelay: '1s' }}>
          <p className="text-2xl md:text-4xl text-primary-foreground font-light">
            <span className="text-4xl">✈️</span> Du lịch như <span className="font-bold text-secondary">người nhà</span> cùng Vinh Around
          </p>
          
          <Button 
            size="lg"
            onClick={scrollToForm}
            className="magnetic gradient-sunset text-xl md:text-2xl px-16 py-8 rounded-full font-bold shadow-glow hover-lift border-2 border-white/20"
          >
            <span className="flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              BẮT ĐẦU HÀNH TRÌNH
              <span className="text-3xl">✨</span>
            </span>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="glass-effect p-4 rounded-full border-2 border-secondary/50">
          <span className="text-4xl">👇</span>
        </div>
      </div>
    </section>
  );
};

export default HeroVideoMask;
