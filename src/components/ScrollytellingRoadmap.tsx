import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollytellingRoadmap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const milestones = [
    { icon: "🎫", title: "Đặt tour", desc: "Liên hệ Captain Vinh" },
    { icon: "✈️", title: "Vé máy bay", desc: "Săn vé giờ đẹp" },
    { icon: "🏨", title: "Khách sạn", desc: "5 sao trung tâm" },
    { icon: "🚙", title: "Xe riêng", desc: "Mercedes sang trọng" },
    { icon: "🍽️", title: "Ẩm thực", desc: "Món ngon mỗi ngày" },
    { icon: "📸", title: "Trải nghiệm", desc: "Kỷ niệm đẹp" },
    { icon: "✅", title: "Hoàn thành", desc: "Về nhà hạnh phúc" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate car along the path
      gsap.to(carRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
        ease: "none"
      });

      // Animate milestones appearance
      milestones.forEach((_, index) => {
        gsap.from(`.milestone-${index}`, {
          scrollTrigger: {
            trigger: `.milestone-${index}`,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
          scale: 0,
          opacity: 0,
          ease: "back.out(1.7)"
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-6">
            <span className="text-primary">Hành trình của bạn</span>
            <br />
            <span className="text-gradient text-6xl md:text-8xl italic">từ A đến Z</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground">
            <span className="text-3xl">🗺️</span> Cuộn xuống để theo dõi hành trình
          </p>
        </div>

        {/* Road Path with SVG */}
        <div className="relative h-[2000px]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 2000" preserveAspectRatio="none">
            <path
              ref={pathRef}
              d="M 100 100 Q 600 300 200 500 T 600 900 Q 200 1100 400 1400 T 500 1800"
              fill="none"
              stroke="hsl(var(--secondary))"
              strokeWidth="4"
              strokeDasharray="10 10"
              opacity="0.3"
            />
          </svg>

          {/* Animated Car */}
          <div
            ref={carRef}
            className="absolute w-20 h-20 text-6xl"
            style={{ left: '100px', top: '100px' }}
          >
            🚙
          </div>

          {/* Milestones */}
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`milestone-${index} absolute`}
              style={{
                left: `${50 + (index % 2 === 0 ? -20 : 20)}%`,
                top: `${100 + index * 250}px`,
              }}
            >
              <div className="glass-effect p-8 rounded-3xl border-2 border-secondary/30 shadow-elegant hover-lift max-w-xs">
                <div className="text-6xl mb-4 text-center animate-float">
                  {milestone.icon}
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2 text-center">
                  {milestone.title}
                </h3>
                <p className="text-muted-foreground text-center">{milestone.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollytellingRoadmap;
