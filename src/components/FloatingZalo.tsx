import { Button } from "@/components/ui/button";
import { useState } from "react";

const FloatingZalo = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleZaloClick = () => {
    window.open("https://zalo.me/yourphone", "_blank");
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
      <div 
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Tooltip */}
        <div 
          className={`absolute -top-20 md:-top-24 right-0 glass-effect px-6 md:px-8 py-3 md:py-4 rounded-2xl shadow-float whitespace-nowrap border border-white/10 transition-all duration-300 ${
            showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <p className="font-semibold text-foreground text-sm md:text-base">Chat với Vinh Around</p>
          <div className="absolute -bottom-2 right-8 w-4 h-4 glass-effect rotate-45 border-r border-b border-white/10"></div>
        </div>

        {/* Button with Pulse Ring */}
        <div className="relative">
          {/* Animated Rings */}
          <div className="absolute inset-0 animate-ping">
            <div className="w-full h-full rounded-full bg-[#0068FF]/30"></div>
          </div>
          <div className="absolute inset-0 animate-pulse">
            <div className="w-full h-full rounded-full bg-[#0068FF]/20"></div>
          </div>

          <Button
            size="lg"
            onClick={handleZaloClick}
            className="relative bg-[#0068FF] hover:bg-[#0068FF]/90 text-white rounded-full w-16 h-16 md:w-20 md:h-20 shadow-float hover-lift flex items-center justify-center group font-bold text-lg md:text-xl"
            aria-label="Chat qua Zalo"
          >
            Z
            
            {/* Badge */}
            <div className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-red-500 rounded-full animate-pulse shadow-float"></div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FloatingZalo;
