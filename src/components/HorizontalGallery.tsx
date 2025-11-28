import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import vehicleImage from "@/assets/luxury-vehicle.jpg";
import hotelImage from "@/assets/luxury-hotel.jpg";
import foodImage from "@/assets/gourmet-food.jpg";

gsap.registerPlugin(ScrollTrigger);

const HorizontalGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const gallery = [
    { img: vehicleImage, title: "Mercedes Cao Cấp", desc: "Nội thất sang trọng, êm ái" },
    { img: hotelImage, title: "Khách Sạn 5 Sao", desc: "View đẹp, trung tâm thành phố" },
    { img: foodImage, title: "Ẩm Thực Tinh Tế", desc: "Món ngon mỗi bữa" },
    { img: vehicleImage, title: "Không Gian Rộng Rãi", desc: "Duỗi chân thoải mái" },
    { img: hotelImage, title: "Phòng Suite Hạng Sang", desc: "Nghỉ ngơi tuyệt vời" },
    { img: foodImage, title: "Buffet Đa Dạng", desc: "Món Âu và Việt" },
  ];

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      // Only enable horizontal scroll on desktop
      const ctx = gsap.context(() => {
        const sections = scrollRef.current?.children;
        if (!sections) return;

        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => `+=${scrollRef.current?.offsetWidth}`,
          },
        });
      });

      return () => ctx.revert();
    }
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-muted">
      {/* Desktop: Horizontal Scroll */}
      <div className="hidden lg:block h-screen">
        <div className="h-full flex items-center">
          <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-center">
              <span className="text-primary">Bộ sưu tập</span>{" "}
              <span className="text-gradient italic">Premium</span>
            </h2>
            <p className="text-center text-muted-foreground mt-4 text-lg">
              <span className="text-2xl">👉</span> Cuộn để xem thêm
            </p>
          </div>

          <div ref={scrollRef} className="flex gap-8 px-8">
            {gallery.map((item, index) => (
              <div
                key={index}
                className="min-w-[60vw] h-[70vh] flex-shrink-0"
              >
                <div className="relative h-full rounded-3xl overflow-hidden group perspective-card shadow-elegant hover:shadow-glow transition-all duration-700">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-125 group-hover:rotate-2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500"></div>
                  
                  {/* Animated light ray effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-secondary/40 via-secondary/20 to-transparent rotate-12 animate-pulse-slow"></div>
                    <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-accent/30 via-accent/15 to-transparent -rotate-12 animate-pulse-slow" style={{animationDelay: '0.5s'}}></div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-10 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                    <div className="glass-premium p-8 rounded-2xl border-2 border-secondary/40 hover-glow animate-glow-pulse">
                      <h3 className="font-display text-5xl font-bold text-primary-foreground mb-3 transition-all duration-300 group-hover:text-shimmer">
                        {item.title}
                      </h3>
                      <p className="text-xl text-primary-foreground/90 transform transition-all duration-300 group-hover:translate-x-2">{item.desc}</p>
                      
                      {/* Decorative shimmer line */}
                      <div className="mt-4 h-1 bg-gradient-to-r from-secondary via-accent to-secondary rounded-full w-0 group-hover:w-full transition-all duration-700"></div>
                    </div>
                  </div>

                  {/* Index number with magnetic effect */}
                  <div className="absolute top-10 right-10 glass-premium w-20 h-20 rounded-full flex items-center justify-center border-2 border-secondary animate-magnetic-hover animate-glow-pulse">
                    <span className="font-display text-3xl font-bold text-secondary animate-bounce-smooth">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  {/* Premium corner accent */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/20 blur-3xl animate-morph"></div>
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent/20 blur-3xl animate-morph" style={{animationDelay: '3s'}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile & Tablet: Horizontal Scroll */}
      <div className="lg:hidden py-16 md:py-24">
        <div className="mb-12">
          <div className="text-center px-4">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              <span className="text-primary">Bộ sưu tập</span>{" "}
              <span className="text-gradient italic">Premium</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Chất lượng dịch vụ hàng đầu
            </p>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="overflow-x-auto pb-8 -mx-4 px-4 snap-x snap-mandatory scroll-smooth hide-scrollbar">
          <div className="flex gap-4 md:gap-6 min-w-max">
            {gallery.map((item, index) => (
              <div
                key={index}
                className="relative h-[400px] md:h-[500px] w-[85vw] md:w-[70vw] flex-shrink-0 snap-center rounded-2xl overflow-hidden group shadow-elegant hover:shadow-glow transition-all duration-700"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-115 group-active:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent group-hover:from-primary/80 transition-all duration-500"></div>
                
                {/* Subtle particle effects */}
                <div className="absolute top-10 left-10 w-4 h-4 bg-secondary/30 rounded-full blur-sm animate-particle-float opacity-0 group-hover:opacity-100"></div>
                <div className="absolute top-20 right-20 w-3 h-3 bg-accent/30 rounded-full blur-sm animate-particle-float opacity-0 group-hover:opacity-100" style={{animationDelay: '1s'}}></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 group-hover:translate-y-[-5px]">
                  <div className="glass-premium p-5 rounded-xl border-2 border-secondary/40 animate-stagger-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-2 transition-colors duration-300 group-hover:text-shimmer">
                      {item.title}
                    </h3>
                    <p className="text-base md:text-lg text-primary-foreground/90 transition-transform duration-300 group-hover:translate-x-1">{item.desc}</p>
                    
                    {/* Decorative line */}
                    <div className="mt-3 h-0.5 bg-gradient-to-r from-secondary via-accent to-transparent rounded-full w-0 group-hover:w-full transition-all duration-500"></div>
                  </div>
                </div>

                {/* Index number with enhanced animation */}
                <div className="absolute top-4 right-4 glass-premium w-14 h-14 rounded-full flex items-center justify-center border-2 border-secondary animate-glow-pulse transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <span className="font-display text-xl font-bold text-secondary animate-bounce-smooth">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-secondary/10 blur-2xl animate-morph opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex items-center justify-center gap-2 mt-6 px-4">
          <div className="text-xs md:text-sm text-muted-foreground font-medium flex items-center gap-2">
            <span>Vuốt để xem thêm</span>
            <span className="text-base md:text-lg animate-pulse">👉</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalGallery;
