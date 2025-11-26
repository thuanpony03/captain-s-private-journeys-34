import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingZalo = () => {
  const handleZaloClick = () => {
    // Replace with actual Zalo link
    window.open("https://zalo.me/yourphone", "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <Button
        size="lg"
        onClick={handleZaloClick}
        className="bg-[#0068FF] hover:bg-[#0068FF]/90 text-white rounded-full w-16 h-16 shadow-2xl hover-lift flex items-center justify-center group"
        aria-label="Chat qua Zalo"
      >
        <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-smooth" />
      </Button>
      <div className="absolute -top-12 right-0 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none">
        Chat với Vinh qua Zalo
      </div>
    </div>
  );
};

export default FloatingZalo;
