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
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-muted">
      <div className="h-screen flex items-center">
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
              className="min-w-[80vw] md:min-w-[60vw] h-[70vh] flex-shrink-0"
            >
              <div className="relative h-full rounded-3xl overflow-hidden group hover-lift shadow-elegant">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-80"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <div className="glass-effect p-8 rounded-2xl border-2 border-secondary/40">
                    <h3 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-xl text-primary-foreground/90">{item.desc}</p>
                  </div>
                </div>

                {/* Index number */}
                <div className="absolute top-10 right-10 glass-effect w-20 h-20 rounded-full flex items-center justify-center border-2 border-secondary">
                  <span className="font-display text-3xl font-bold text-secondary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalGallery;
