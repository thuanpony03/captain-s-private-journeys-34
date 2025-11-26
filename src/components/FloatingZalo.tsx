import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const FloatingZalo = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleZaloClick = () => {
    window.open("https://zalo.me/yourphone", "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div 
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Tooltip */}
        <div 
          className={`absolute -top-16 right-0 glass-effect px-6 py-3 rounded-xl shadow-elegant whitespace-nowrap border border-secondary/30 transition-all duration-300 ${
            showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <p className="font-semibold text-foreground">Chat với Captain Vinh</p>
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-card rotate-45 border-r border-b border-secondary/30"></div>
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
            className="relative bg-[#0068FF] hover:bg-[#0068FF]/90 text-white rounded-full w-16 h-16 md:w-20 md:h-20 shadow-2xl hover-lift flex items-center justify-center group"
            aria-label="Chat qua Zalo"
          >
            <MessageCircle className="w-8 h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform" />
            
            {/* Badge */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-bounce">
              !
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FloatingZalo;
