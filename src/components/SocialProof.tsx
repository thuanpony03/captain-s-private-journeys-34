"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

const SocialProof = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFamily, setActiveFamily] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Real family photos data - premium gallery style
  const families = [
    // MỸ - 8 gia đình
    {
      name: "Gia đình Mai",
      location: "🇺🇸 California",
      image:
        "https://res.cloudinary.com/duuntcik9/image/upload/v1764584144/z6947063792147_aa0be3563131d94f1c4f78725e2231d3_jpjean.jpg",
      x: 8,
      y: 15,
      size: "lg",
      orbit: 1,
    },
    {
      name: "Nhà Hùng",
      location: "🇺🇸 New York",
      image: "https://res.cloudinary.com/duuntcik9/image/upload/v1764584323/IMG_0645_si3owv.jpg",
      x: 22,
      y: 8,
      size: "md",
      orbit: 2,
    },
    {
      name: "Gia đình Linh",
      location: "🇺🇸 Texas",
      image: "https://res.cloudinary.com/duuntcik9/image/upload/v1764584778/IMG_3673_tw8jbo.jpg",
      x: 35,
      y: 20,
      size: "sm",
      orbit: 1,
    },
    {
      name: "Nhà Nam",
      location: "🇺🇸 Florida",
      image: "https://res.cloudinary.com/duuntcik9/image/upload/v1764584777/IMG_6572_vdrvfy.jpg",
      x: 5,
      y: 35,
      size: "sm",
      orbit: 3,
    },
    {
      name: "Gia đình Hoa",
      location: "🇺🇸 Seattle",
      image: "https://res.cloudinary.com/duuntcik9/image/upload/v1764584778/IMG_1470_nxfxxg.jpg",
      x: 18,
      y: 42,
      size: "md",
      orbit: 2,
    },
    {
      name: "Nhà Tú",
      location: "🇺🇸 LA",
      image: "https://res.cloudinary.com/duuntcik9/image/upload/v1764584778/IMG_1272_g0ldzs.jpg",
      x: 12,
      y: 58,
      size: "sm",
      orbit: 1,
    },
    {
      name: "Gia đình Yến",
      location: "🇺🇸 Chicago",
      image: "https://res.cloudinary.com/duuntcik9/image/upload/v1764584779/IMG_3751_toxim6.jpg",
      x: 25,
      y: 68,
      size: "lg",
      orbit: 2,
    },
    {
      name: "Nhà Đạt",
      location: "🇺🇸 Boston",
      image: "https://res.cloudinary.com/duuntcik9/image/upload/v1764584777/IMG_6449_miwyxp.jpg",
      x: 8,
      y: 78,
      size: "sm",
      orbit: 3,
    },

    // ÚC - 6 gia đình
    {
      name: "Gia đình Tuấn",
      location: "🇦🇺 Sydney",
      image: "https://res.cloudinary.com/duuntcik9/image/upload/v1764584778/IMG_3673_tw8jbo.jpg",
      x: 85,
      y: 12,
      size: "lg",
      orbit: 1,
    },
    {
      name: "Nhà Hương",
      location: "🇦🇺 Melbourne",
      image: "https://res.cloudinary.com/duuntcik9/image/upload/v1764584323/IMG_0645_si3owv.jpg",
      x: 92,
      y: 28,
      size: "md",
      orbit: 2,
    },
    {
      name: "Gia đình Bình",
      location: "🇦🇺 Brisbane",
      image: "https://res.cloudinary.com/duuntcik9/image/upload/v1764584778/IMG_1470_nxfxxg.jpg",
      x: 78,
      y: 22,
      size: "sm",
      orbit: 1,
    },
    {
      name: "Nhà Thu",
      location: "🇦🇺 Perth",
      image: "https://res.cloudinary.com/duuntcik9/image/upload/v1764585582/IMG_3551_xqii7g.jpg",
      x: 88,
      y: 45,
      size: "sm",
      orbit: 3,
    },
    {
      name: "Gia đình Long",
      location: "🇦🇺 Adelaide",
      image:
        "https://res.cloudinary.com/duuntcik9/image/upload/v1764585582/z7281115055835_fe8da4945e165345b8fbec41d12e1763_tj1jlg.jpg",
      x: 95,
      y: 62,
      size: "md",
      orbit: 2,
    },
    {
      name: "Nhà Ngọc",
      location: "🇦🇺 Gold Coast",
      image:
        "https://res.cloudinary.com/duuntcik9/image/upload/v1764584323/Gemini_Generated_Image_i3f45ri3f45ri3f4_jmeemp.png",
      x: 82,
      y: 75,
      size: "lg",
      orbit: 1,
    },

    // CANADA - 5 gia đình
    {
      name: "Gia đình Minh",
      location: "🇨🇦 Toronto",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=200&q=80",
      x: 38,
      y: 5,
      size: "lg",
      orbit: 2,
    },
    {
      name: "Nhà Lan",
      location: "🇨🇦 Vancouver",
      image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=200&q=80",
      x: 55,
      y: 10,
      size: "md",
      orbit: 1,
    },
    {
      name: "Gia đình Khoa",
      location: "🇨🇦 Montreal",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&q=80",
      x: 68,
      y: 8,
      size: "sm",
      orbit: 3,
    },
    {
      name: "Nhà Trang",
      location: "🇨🇦 Calgary",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=200&q=80",
      x: 45,
      y: 18,
      size: "sm",
      orbit: 2,
    },
    {
      name: "Gia đình Phong",
      location: "🇨🇦 Ottawa",
      image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=200&q=80",
      x: 62,
      y: 22,
      size: "md",
      orbit: 1,
    },

    // CHÂU ÂU - 16 gia đình
    {
      name: "Gia đình Phương",
      location: "🇫🇷 Paris",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=200&q=80",
      x: 30,
      y: 35,
      size: "md",
      orbit: 1,
    },
    {
      name: "Nhà Hoàng",
      location: "🇬🇧 London",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&q=80",
      x: 15,
      y: 28,
      size: "sm",
      orbit: 2,
    },
    {
      name: "Gia đình Nga",
      location: "🇩🇪 Berlin",
      image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=200&q=80",
      x: 72,
      y: 35,
      size: "lg",
      orbit: 1,
    },
    {
      name: "Nhà Tâm",
      location: "🇮🇹 Rome",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=200&q=80",
      x: 58,
      y: 42,
      size: "sm",
      orbit: 3,
    },
    {
      name: "Gia đình Vy",
      location: "🇪🇸 Madrid",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&q=80",
      x: 42,
      y: 48,
      size: "md",
      orbit: 2,
    },
    {
      name: "Nhà Đức",
      location: "🇨🇭 Zurich",
      image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=200&q=80",
      x: 75,
      y: 55,
      size: "sm",
      orbit: 1,
    },
    {
      name: "Gia đình Thảo",
      location: "🇳🇱 Amsterdam",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=200&q=80",
      x: 28,
      y: 55,
      size: "lg",
      orbit: 2,
    },
    {
      name: "Nhà Việt",
      location: "🇦🇹 Vienna",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&q=80",
      x: 65,
      y: 65,
      size: "md",
      orbit: 3,
    },
    {
      name: "Gia đình Hiền",
      location: "🇧🇪 Brussels",
      image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=200&q=80",
      x: 35,
      y: 72,
      size: "sm",
      orbit: 1,
    },
    {
      name: "Nhà Kiên",
      location: "🇵🇹 Lisbon",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=200&q=80",
      x: 55,
      y: 78,
      size: "md",
      orbit: 2,
    },
    {
      name: "Gia đình Nhung",
      location: "🇬🇷 Athens",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&q=80",
      x: 78,
      y: 85,
      size: "sm",
      orbit: 1,
    },
    {
      name: "Nhà Cường",
      location: "🇺🇸 Hawaii",
      image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=200&q=80",
      x: 5,
      y: 92,
      size: "md",
      orbit: 2,
    },
    {
      name: "Gia đình Hạnh",
      location: "🇦🇺 Tasmania",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=200&q=80",
      x: 92,
      y: 88,
      size: "sm",
      orbit: 1,
    },
    {
      name: "Nhà Trung",
      location: "🇨🇦 Quebec",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&q=80",
      x: 48,
      y: 92,
      size: "lg",
      orbit: 3,
    },
    {
      name: "Gia đình Diệu",
      location: "🇫🇷 Nice",
      image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=200&q=80",
      x: 22,
      y: 88,
      size: "sm",
      orbit: 1,
    },
    {
      name: "Nhà Sơn",
      location: "🇬🇧 Manchester",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=200&q=80",
      x: 68,
      y: 92,
      size: "md",
      orbit: 2,
    },
  ];

  // Mouse parallax effect
  useEffect(() => {
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        });
      }
    };

    const section = sectionRef.current;
    section?.addEventListener("mousemove", handleMouseMove);
    return () => section?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "lg":
        return "w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24";
      case "md":
        return "w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20";
      case "sm":
        return "w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16";
      default:
        return "w-12 h-12 md:w-16 md:h-16";
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-white via-[#faf9f7] to-white"
    >
      {/* Light Premium Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Soft gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] animate-morph"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] animate-morph"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[160px] animate-morph"
          style={{ animationDelay: "6s" }}
        ></div>

        {/* Decorative dots */}
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-secondary/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Connection Lines SVG - subtle on light bg */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]">
        <defs>
          <linearGradient id="lineGradientLight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        {families.slice(0, 20).map((family, i) => (
          <line
            key={i}
            x1="50%"
            y1="50%"
            x2={`${family.x}%`}
            y2={`${family.y}%`}
            stroke="url(#lineGradientLight)"
            strokeWidth="1.5"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.15}s`, animationDuration: "4s" }}
          />
        ))}
      </svg>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20 px-4">
          <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-white shadow-lg border border-secondary/10">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
            <span className="text-primary font-bold text-sm uppercase tracking-wider">100+ Gia Đình Hạnh Phúc</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-black mb-6 text-primary">
            Hành trình của
            <span className="block bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent mt-2">
              những gia đình Việt
            </span>
          </h2>

          <p className="text-lg md:text-xl text-primary/70 max-w-2xl mx-auto font-medium">
            Mỗi hình ảnh là một câu chuyện - Mỗi nụ cười là minh chứng cho dịch vụ của chúng tôi
          </p>
        </div>

        {/* Interactive Family Gallery Map */}
        <div className="relative h-[500px] md:h-[650px] lg:h-[750px] max-w-7xl mx-auto px-4">
          {/* Center Hub - Vinh Around */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              {/* Pulsing rings */}
              <div
                className="absolute inset-0 -m-6 rounded-full border-2 border-secondary/30 animate-ping"
                style={{ animationDuration: "3s" }}
              ></div>
              <div
                className="absolute inset-0 -m-12 rounded-full border border-secondary/20 animate-ping"
                style={{ animationDuration: "4s" }}
              ></div>
              <div
                className="absolute inset-0 -m-20 rounded-full border border-secondary/10 animate-ping"
                style={{ animationDuration: "5s" }}
              ></div>

              {/* Main hub */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-secondary shadow-2xl shadow-secondary/20 group cursor-pointer hover:scale-110 transition-transform duration-300 bg-white">
                <img
                  src="/lovable-uploads/576f0773-8f19-4601-901e-115efd9c4874.jpg"
                  alt="Vinh Around"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
                <div className="absolute bottom-2 left-0 right-0 text-center">
                  <p className="text-white font-bold text-xs md:text-sm drop-shadow-lg">VINH AROUND</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Family Photos - 35+ families */}
          {families.map((family, index) => (
            <div
              key={index}
              className="absolute transition-all duration-500 ease-out"
              style={{
                left: `${family.x}%`,
                top: `${family.y}%`,
                transform: `translate(-50%, -50%) translate(${mousePosition.x * (family.orbit * 3)}px, ${mousePosition.y * (family.orbit * 3)}px)`,
                zIndex: activeFamily === index ? 30 : 10,
              }}
              onMouseEnter={() => setActiveFamily(index)}
              onMouseLeave={() => setActiveFamily(null)}
              onClick={() => setActiveFamily(activeFamily === index ? null : index)}
            >
              {/* Photo Container */}
              <div
                className={`relative ${getSizeClasses(family.size)} group cursor-pointer`}
                style={{
                  animation: `float ${3 + family.orbit}s ease-in-out infinite`,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Glow effect on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-secondary/30 blur-xl transition-all duration-300 ${activeFamily === index ? "scale-150 opacity-100" : "scale-100 opacity-0"}`}
                ></div>

                {/* Photo frame */}
                <div
                  className={`relative w-full h-full rounded-2xl overflow-hidden border-3 bg-white transition-all duration-300 ${activeFamily === index ? "border-secondary shadow-2xl shadow-secondary/30 scale-110" : "border-white/60 shadow-lg"}`}
                >
                  <img src={family.image} alt={family.name} className="w-full h-full object-cover" />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Flag badge */}
                <div
                  className={`absolute -bottom-1 -right-1 w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full bg-white flex items-center justify-center text-xs md:text-sm lg:text-base border-2 border-secondary/30 shadow-md transition-all duration-300 ${activeFamily === index ? "scale-125" : "scale-100"}`}
                >
                  {family.location.split(" ")[0]}
                </div>

                {/* Tooltip on hover */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none z-40 whitespace-nowrap ${activeFamily === index ? "opacity-100 -bottom-16 md:-bottom-20" : "opacity-0 -bottom-10"}`}
                >
                  <div className="bg-white px-4 py-3 rounded-xl shadow-2xl border-2 border-secondary/20">
                    <p className="font-bold text-sm md:text-base text-primary">{family.name}</p>
                    <p className="text-xs md:text-sm text-primary/60">{family.location}</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-amber-400 text-xs">
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Orbital paths - very subtle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-dashed border-secondary/10 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-dashed border-secondary/5 pointer-events-none"></div>
        </div>

        {/* Region Stats Badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-12 md:mt-16 px-4">
          {[
            { flag: "🇺🇸", name: "Mỹ", count: "25+" },
            { flag: "🇦🇺", name: "Úc", count: "18+" },
            { flag: "🇨🇦", name: "Canada", count: "15+" },
            { flag: "🇪🇺", name: "Châu Âu", count: "42+" },
          ].map((region, i) => (
            <div
              key={i}
              className="bg-white px-5 py-3 rounded-2xl border-2 border-secondary/10 shadow-lg flex items-center gap-3 hover:scale-105 hover:border-secondary/30 transition-all duration-300 cursor-pointer"
            >
              <span className="text-2xl md:text-3xl">{region.flag}</span>
              <div>
                <span className="text-sm md:text-base font-bold text-primary block">{region.name}</span>
                <span className="text-xs md:text-sm text-secondary font-black">{region.count} gia đình</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-16 md:mt-20 max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { number: "100+", label: "Gia đình", icon: "👨‍👩‍👧‍👦" },
              { number: "4", label: "Châu lục", icon: "🌍" },
              { number: "10+", label: "Năm KN", icon: "⭐" },
              { number: "100%", label: "Hài lòng", icon: "💯" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="p-6 md:p-8 text-center bg-white hover:shadow-2xl hover:shadow-secondary/10 transition-all duration-300 hover:scale-105 border-2 border-secondary/10 group cursor-pointer"
              >
                <div className="text-4xl md:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <p className="font-display text-3xl md:text-4xl font-black bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  {stat.number}
                </p>
                <p className="text-xs md:text-sm text-primary/60 font-medium mt-1">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 md:mt-20 text-center px-4">
          <div className="inline-block bg-white p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-secondary/10 hover:border-secondary/30 transition-all duration-500 hover:scale-105">
            <p className="text-2xl md:text-3xl lg:text-4xl font-display font-black mb-2">
              <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
                Gia đình bạn
              </span>
              <span className="text-primary"> sẽ là hành trình tiếp theo? </span>
              <span className="inline-block animate-bounce">✨</span>
            </p>
            <p className="text-primary/60 text-sm md:text-base font-medium">
              Hãy để Vinh đồng hành cùng bạn tạo nên những kỷ niệm đáng nhớ
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
