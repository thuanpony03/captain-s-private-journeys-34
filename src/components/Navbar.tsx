import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass-effect shadow-elegant border-b border-secondary/20 backdrop-blur-xl' 
          : 'bg-gradient-to-b from-black/30 to-transparent backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Brand - Mobile Optimized */}
          <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-glow transition-transform group-hover:scale-110 ${
              isScrolled ? 'shadow-secondary/50' : 'shadow-secondary/30'
            }`}>
              <span className="text-lg sm:text-xl md:text-2xl">👨‍✈️</span>
            </div>
            <div>
              <span className={`font-display text-base sm:text-xl md:text-2xl font-black bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent`}>
                VINH AROUND
              </span>
              <p className="text-[9px] sm:text-[10px] md:text-xs text-white/70 font-medium tracking-wider hidden xs:block">PRIVATE TOURS</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Admin Link - Only in development */}
            {import.meta.env.DEV && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = '/admin'}
                className="text-white/70 hover:text-white hover:bg-white/10 text-xs hidden md:flex"
              >
                Admin
              </Button>
            )}
            
            {/* CTA Button - Mobile Optimized */}
            <Button
              onClick={scrollToForm}
              className="bg-gradient-to-r from-secondary via-accent to-secondary text-white font-bold px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full shadow-elegant hover:shadow-glow hover-lift text-xs sm:text-sm md:text-base border-2 border-white/30 transition-all hover:scale-105"
            >
              <span className="flex items-center gap-1.5 sm:gap-2">
                <span className="hidden sm:inline">ĐẶT LỊCH NGAY</span>
                <span className="sm:hidden">Liên hệ ngay</span>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
