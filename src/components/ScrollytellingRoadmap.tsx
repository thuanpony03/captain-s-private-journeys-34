import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollytellingRoadmap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const milestones = [
    { icon: "🎫", title: "Đặt tour", desc: "Liên hệ Vinh Around" },
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
    <section ref={containerRef} className="py-16 md:py-24 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-0 w-48 h-48 md:w-96 md:h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-48 h-48 md:w-96 md:h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-secondary"></div>
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
            <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-secondary"></div>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
            <span className="text-foreground">Hành trình của bạn</span>
            <br />
            <span className="text-gradient text-4xl sm:text-5xl md:text-7xl">từ A đến Z</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mt-4">
            Vinh Around lo toan mọi chi tiết cho chuyến đi của bạn
          </p>
        </div>

        {/* Mobile-First Vertical Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-accent to-secondary opacity-30 md:-ml-px"></div>
            
            {/* Milestones */}
            <div className="space-y-8 md:space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`milestone-${index} relative flex items-start gap-4 md:gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 md:w-10 md:h-10 md:-ml-5 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg z-10">
                    <div className="text-xl">{milestone.icon}</div>
                  </div>
                  
                  {/* Content card - Mobile first */}
                  <div className={`ml-16 md:ml-0 flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <div className="inline-block">
                      <div className="bg-card border border-border rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-elegant transition-all hover:-translate-y-1">
                        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground">
                          {milestone.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Spacer for desktop layout */}
                  <div className="hidden md:block flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-16">
          <div className="inline-block bg-gradient-to-r from-secondary/10 via-accent/10 to-secondary/10 p-6 md:p-8 rounded-3xl border border-secondary/20">
            <p className="font-display text-lg md:text-2xl font-bold text-foreground mb-2">
              Mọi thứ đã được lo trọn gói
            </p>
            <p className="text-sm md:text-base text-muted-foreground">
              Bạn chỉ cần tận hưởng hành trình
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollytellingRoadmap;
