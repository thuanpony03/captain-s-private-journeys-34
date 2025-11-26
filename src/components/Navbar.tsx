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
          ? 'bg-background/95 backdrop-blur-lg shadow-elegant' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full gradient-sunset flex items-center justify-center">
              <span className="text-lg md:text-xl">✈️</span>
            </div>
            <span className="font-display text-lg md:text-xl font-bold text-foreground">
              Vinh Around
            </span>
          </div>

          {/* CTA Button */}
          <Button
            onClick={scrollToForm}
            className="gradient-sunset text-white font-semibold px-4 py-2 md:px-6 md:py-2.5 rounded-full shadow-glow hover-lift text-sm md:text-base"
          >
            <span className="hidden sm:inline">Liên hệ ngay</span>
            <span className="sm:hidden">Đặt tour</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
