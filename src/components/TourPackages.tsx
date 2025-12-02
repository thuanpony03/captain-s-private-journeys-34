import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTourPackages } from "@/hooks/useSiteContent";

const TourPackages = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeRoute, setActiveRoute] = useState(0);
  const { tours, loading } = useTourPackages();
  const navigate = useNavigate();

  // Transform tours data for compatibility
  const journeys = tours.map(tour => ({
    id: tour.id,
    title: tour.title,
    tagline: tour.tagline || '',
    route: tour.route || '',
    description: tour.description || '',
    duration: tour.duration || '',
    price: tour.price || '',
    video: tour.image_url || 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1200&q=80',
    stops: Array.isArray(tour.stops) ? tour.stops : []
  }));

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const viewTourDetail = (tourId: string) => {
    navigate(`/tour/${tourId}`);
  };

  useEffect(() => {
    // Set visible immediately if tours are loaded
    if (tours.length > 0) {
      setIsVisible(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 } // Reduced threshold for faster trigger
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [tours.length]);

  // Auto rotate journeys - longer on mobile
  useEffect(() => {
    if (!journeys.length) {
      setActiveRoute(0);
      return;
    }

    const interval = setInterval(() => {
      setActiveRoute((prev) => (prev + 1) % journeys.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [journeys.length]);

  if (loading) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-primary flex items-center justify-center">
        <div className="text-white text-xl">Loading tours...</div>
      </section>
    );
  }

  if (journeys.length === 0) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-primary flex items-center justify-center">
        <div className="text-white text-xl">No tours available</div>
      </section>
    );
  }

  // Safe to access now - we know journeys has items
  const activeJourney = journeys[activeRoute];
  if (!activeJourney) {
    return null;
  }


  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-primary"
    >
      {/* Full Screen Background Image */}
      <div className="absolute inset-0">
        {journeys.map((journey, index) => (
          <div
            key={journey.id}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === activeRoute ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img 
              src={journey.video}
              alt={journey.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Brand Color Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/75 to-primary/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            
            {/* Header - Mobile Optimized */}
            <div className={`text-center mb-8 md:mb-12 lg:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-secondary"></div>
                <div className="glass-effect px-4 py-2 md:px-6 md:py-3 rounded-full border border-secondary/40">
                  <span className="text-xs md:text-sm font-bold text-secondary uppercase tracking-wider">Signature Journeys</span>
                </div>
                <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-secondary"></div>
              </div>
              
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white">
                Các hành trình{" "}
                <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent italic">
                  đặc biệt
                </span>
              </h2>
            </div>

            {/* Mobile: Swipeable Cards */}
            <div className="lg:hidden">
              {/* Active Journey Display */}
              <div className={`mb-6 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="glass-effect rounded-2xl p-5 border border-white/20">
                  {/* Journey Number & Title */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-display font-bold text-secondary">0{activeRoute + 1}</span>
                        <span className="text-white/60 text-sm">{activeJourney.tagline}</span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-white">
                        {activeJourney.title}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-secondary font-bold text-xl">{activeJourney.price}</p>
                      <p className="text-white/60 text-sm">{activeJourney.duration}</p>
                    </div>
                  </div>

                  {/* Route */}
                  <p className="text-white/70 mb-4">{activeJourney.route}</p>
                  <p className="text-white/80 text-sm leading-relaxed mb-5">{activeJourney.description}</p>

                  {/* Route Stops - Compact */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-3 hide-scrollbar mb-5">
                    {activeJourney.stops.map((stop, i) => (
                      <div key={i} className="flex items-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        <span className="text-white/70 text-xs mx-2 whitespace-nowrap">{stop}</span>
                        {i < activeJourney.stops.length - 1 && (
                          <div className="w-4 h-px bg-secondary/50"></div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => viewTourDetail(activeJourney.id)}
                      variant="outline"
                      className="flex-1 border-secondary text-secondary hover:bg-secondary hover:text-white font-bold py-4 rounded-xl"
                    >
                      Xem chi tiết
                    </Button>
                    <Button 
                      onClick={scrollToForm}
                      className="flex-1 bg-gradient-to-r from-secondary via-accent to-secondary text-white font-bold py-4 rounded-xl"
                    >
                      Đặt lịch
                    </Button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    key={activeRoute}
                    className="h-full bg-gradient-to-r from-secondary to-accent rounded-full animate-progress"
                  ></div>
                </div>
              </div>

              {/* Journey Selector - Horizontal Scroll */}
              <div className="overflow-x-auto pb-4 -mx-4 px-4 hide-scrollbar">
                <div className="flex gap-3 min-w-max">
                  {journeys.map((journey, index) => (
                    <button
                      key={journey.id}
                      onClick={() => setActiveRoute(index)}
                      className={`relative w-32 flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 ${
                        index === activeRoute 
                          ? 'ring-2 ring-secondary scale-105' 
                          : 'opacity-70'
                      }`}
                    >
                      <div className="aspect-[4/3]">
                        <img 
                          src={journey.video}
                          alt={journey.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white font-bold text-sm truncate">{journey.title}</p>
                          <p className="text-white/70 text-xs">{journey.price}</p>
                        </div>
                        {index === activeRoute && (
                          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Tour - Compact */}
              <div 
                className="mt-4 p-4 rounded-xl border border-dashed border-white/30 text-center"
                onClick={scrollToForm}
              >
                <p className="text-white/70 text-sm">Muốn hành trình riêng?</p>
                <p className="text-secondary font-semibold text-sm">Liên hệ Vinh ngay →</p>
              </div>
            </div>

            {/* Desktop: Two Column Layout */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Left: Journey Info */}
              <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl glass-effect border border-secondary/40 flex items-center justify-center">
                    <span className="text-2xl font-display font-bold text-secondary">0{activeRoute + 1}</span>
                  </div>
                  <div>
                    <p className="text-secondary font-semibold">{activeJourney.tagline}</p>
                    <p className="text-white/60 text-sm">{activeJourney.route}</p>
                  </div>
                </div>

                <h3 className="font-display text-5xl xl:text-6xl font-bold text-white leading-tight">
                  {activeJourney.title}
                </h3>

                <p className="text-xl text-white/80 leading-relaxed max-w-lg">
                  {activeJourney.description}
                </p>

                {/* Route Stops */}
                <div className="py-4">
                  <div className="flex items-center gap-2">
                    {activeJourney.stops.map((stop, i) => (
                      <div key={i} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
                          <p className="text-white/70 text-xs mt-1.5 whitespace-nowrap">{stop}</p>
                        </div>
                        {i < activeJourney.stops.length - 1 && (
                          <div className="w-10 h-px bg-secondary/60 mx-1"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Duration */}
                <div className="flex items-center gap-4">
                  <div className="glass-effect px-5 py-3 rounded-xl border border-white/20">
                    <p className="text-white/50 text-xs mb-0.5">Thời gian</p>
                    <p className="text-white font-bold text-lg">{activeJourney.duration}</p>
                  </div>
                  <div className="glass-effect px-5 py-3 rounded-xl border border-secondary/40">
                    <p className="text-secondary text-xs mb-0.5">Giá từ</p>
                    <p className="text-white font-bold text-xl">{activeJourney.price}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={() => viewTourDetail(activeJourney.id)}
                    size="lg"
                    variant="outline"
                    className="border-secondary text-secondary hover:bg-secondary hover:text-white font-bold text-base px-8 py-5 rounded-xl transition-all duration-300"
                  >
                    Xem chi tiết lịch trình
                  </Button>
                  <Button 
                    onClick={scrollToForm}
                    size="lg"
                    className="bg-gradient-to-r from-secondary via-accent to-secondary text-white font-bold text-base px-8 py-5 rounded-xl hover:shadow-glow transition-all duration-300 hover:scale-105"
                  >
                    Đặt lịch ngay
                  </Button>
                </div>
              </div>

              {/* Right: Journey Selector */}
              <div className={`space-y-3 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                {journeys.map((journey, index) => (
                  <button
                    key={journey.id}
                    onClick={() => setActiveRoute(index)}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-500 group ${
                      index === activeRoute 
                        ? 'glass-effect border-secondary shadow-glow' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Thumbnail */}
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={journey.video}
                          alt={journey.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${index === activeRoute ? 'from-secondary/50' : 'from-primary/60'} to-transparent`}></div>
                        <div className="absolute bottom-1.5 left-1.5 text-white font-bold">0{index + 1}</div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-display text-xl font-bold mb-0.5 transition-colors ${
                          index === activeRoute ? 'text-secondary' : 'text-white'
                        }`}>
                          {journey.title}
                        </h4>
                        <p className="text-white/60 text-sm">{journey.route}</p>
                        <p className="text-white/50 text-sm mt-0.5">{journey.duration} • {journey.price}</p>
                      </div>

                      {/* Indicator */}
                      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all ${
                        index === activeRoute ? 'bg-secondary' : 'bg-white/30'
                      }`}></div>
                    </div>

                    {/* Progress Bar */}
                    {index === activeRoute && (
                      <div className="mt-3 h-0.5 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-secondary to-accent rounded-full animate-progress"></div>
                      </div>
                    )}
                  </button>
                ))}

                {/* Custom Tour */}
                <div 
                  className="p-5 rounded-xl border-2 border-dashed border-white/30 text-center hover:border-secondary/50 transition-colors cursor-pointer"
                  onClick={scrollToForm}
                >
                  <p className="text-white/70">Không thấy điểm đến mong muốn?</p>
                  <p className="text-secondary font-semibold mt-1">Để Vinh thiết kế riêng cho bạn →</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 8s linear;
        }
      `}</style>
    </section>
  );
};

export default TourPackages;