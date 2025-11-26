import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  PhoneCall, 
  Plane, 
  Hotel, 
  Car, 
  UtensilsCrossed, 
  Camera, 
  CheckCircle2 
} from "lucide-react";

const ScrollytellingRoadmap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const milestones = [
    { 
      Icon: PhoneCall, 
      title: "Đặt tour", 
      desc: "Liên hệ Vinh Around",
      color: "text-secondary"
    },
    { 
      Icon: Plane, 
      title: "Vé máy bay", 
      desc: "Săn vé giờ đẹp",
      color: "text-secondary"
    },
    { 
      Icon: Hotel, 
      title: "Khách sạn", 
      desc: "5 sao trung tâm",
      color: "text-secondary"
    },
    { 
      Icon: Car, 
      title: "Xe riêng", 
      desc: "Mercedes sang trọng",
      color: "text-secondary"
    },
    { 
      Icon: UtensilsCrossed, 
      title: "Ẩm thực", 
      desc: "Món ngon mỗi ngày",
      color: "text-secondary"
    },
    { 
      Icon: Camera, 
      title: "Trải nghiệm", 
      desc: "Kỷ niệm đẹp",
      color: "text-secondary"
    },
    { 
      Icon: CheckCircle2, 
      title: "Hoàn thành", 
      desc: "Về nhà hạnh phúc",
      color: "text-accent"
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && lineRef.current) {
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate progress based on scroll position
        const containerTop = rect.top;
        const containerHeight = rect.height;
        
        // Start progress when container enters viewport
        const startProgress = windowHeight - containerTop;
        const maxProgress = containerHeight + windowHeight;
        const progress = Math.max(0, Math.min(100, (startProgress / maxProgress) * 100));
        
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-32 md:py-48 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[3px] w-24 bg-gradient-to-r from-transparent via-secondary to-accent rounded-full"></div>
            <div className="w-3 h-3 rounded-full bg-secondary animate-pulse"></div>
            <div className="h-[3px] w-24 bg-gradient-to-l from-transparent via-secondary to-accent rounded-full"></div>
          </div>
          
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-foreground">Hành trình của bạn</span>
            <br />
            <span className="text-gradient text-5xl md:text-7xl lg:text-8xl italic">từ A đến Z</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-light">
            Vinh Around lo toan mọi chi tiết cho chuyến đi của bạn
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Base Line - Gray */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 md:-ml-0.5 bg-border rounded-full"></div>
            
            {/* Progress Line - Orange (Animated) */}
            <div 
              ref={lineRef}
              className="absolute left-6 md:left-1/2 top-0 w-1 md:-ml-0.5 bg-gradient-to-b from-secondary via-accent to-secondary rounded-full shadow-glow transition-all duration-300 ease-out"
              style={{ 
                height: `${scrollProgress}%`
              }}
            ></div>
            
            {/* Milestones */}
            <div className="space-y-12 md:space-y-16">
              {milestones.map((milestone, index) => {
                const Icon = milestone.Icon;
                const isActive = (index / milestones.length) * 100 < scrollProgress;
                
                return (
                  <div
                    key={index}
                    className={`relative flex items-start gap-6 md:gap-12 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline Node */}
                    <div className={`absolute left-6 md:left-1/2 w-12 h-12 md:-ml-6 rounded-2xl flex items-center justify-center z-10 transition-all duration-500 ${
                      isActive 
                        ? 'bg-gradient-to-br from-secondary to-accent shadow-glow scale-110' 
                        : 'bg-muted border-2 border-border scale-100'
                    }`}>
                      <Icon className={`w-6 h-6 transition-colors duration-500 ${
                        isActive ? 'text-white' : 'text-muted-foreground'
                      }`} />
                    </div>
                    
                    {/* Content Card */}
                    <div className={`ml-20 md:ml-0 flex-1 ${
                      index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:pl-16'
                    }`}>
                      <Card className={`inline-block p-8 md:p-10 transition-all duration-300 group cursor-pointer border-2 ${
                        isActive 
                          ? 'border-secondary/30 shadow-float hover:shadow-glow hover:-translate-y-2 hover:scale-105' 
                          : 'border-border hover:border-secondary/20 hover:-translate-y-1'
                      }`}>
                        <div className="flex items-center gap-4 mb-3">
                          {index % 2 === 0 ? (
                            <>
                              <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-secondary' : 'bg-muted-foreground'} transition-colors`}></div>
                              <h3 className={`font-display text-2xl md:text-3xl font-bold transition-colors ${
                                isActive ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                {milestone.title}
                              </h3>
                            </>
                          ) : (
                            <>
                              <h3 className={`font-display text-2xl md:text-3xl font-bold transition-colors ${
                                isActive ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                {milestone.title}
                              </h3>
                              <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-secondary' : 'bg-muted-foreground'} transition-colors`}></div>
                            </>
                          )}
                        </div>
                        <p className={`text-lg md:text-xl transition-colors ${
                          isActive ? 'text-muted-foreground' : 'text-muted-foreground/60'
                        }`}>
                          {milestone.desc}
                        </p>
                        
                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-secondary/0 via-secondary/10 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      </Card>
                    </div>
                    
                    {/* Spacer for desktop alternating layout */}
                    <div className="hidden md:block flex-1"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <Card className="inline-block gradient-sunset p-8 md:p-12 rounded-3xl shadow-glow border-2 border-white/20 relative overflow-hidden group">
            <div className="absolute inset-0 animate-shimmer"></div>
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative text-white">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                <div className="h-px w-16 bg-white/40"></div>
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              <p className="font-display text-2xl md:text-4xl font-bold mb-3">
                Mọi thứ đã được lo trọn gói
              </p>
              <p className="text-base md:text-xl opacity-95 font-light italic">
                Bạn chỉ cần tận hưởng hành trình
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ScrollytellingRoadmap;
