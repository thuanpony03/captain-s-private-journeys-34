import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-captain.jpg";

const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Captain Vinh with luxury vehicle" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
            ĐỪNG ĐI MỸ/ÚC NHƯ MỘT KHÁCH DU LỊCH.
            <br />
            <span className="text-secondary">HÃY ĐI NHƯ 'NGƯỜI NHÀ'</span>
            <br />
            CÙNG CAPTAIN VINH.
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
            Dịch vụ Private Tour Trọn Gói - Xe Riêng - Khởi hành từ nhóm 6 khách.
            <br />
            <span className="text-secondary font-semibold">Được vận hành bởi Passport Lounge.</span>
          </p>
          
          <div className="pt-4">
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-12 py-6 shadow-gold hover-lift font-semibold"
            >
              NHẬN TƯ VẤN LỊCH TRÌNH RIÊNG
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-primary-foreground/70" />
      </div>
    </section>
  );
};

export default HeroSection;
