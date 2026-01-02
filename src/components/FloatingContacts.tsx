import { Phone, MessageCircle, Facebook } from "lucide-react";
import { trackPhoneClick, trackFacebookClick } from "@/lib/analytics";

const FloatingContacts = () => {
  const handleVinhPhoneClick = () => {
    trackPhoneClick('Vinh');
  };

  const handleThuanPhoneClick = () => {
    trackPhoneClick('Thuận');
  };

  const handleFacebookClick = () => {
    trackFacebookClick();
  };

  return (
    <div className="fixed left-4 bottom-24 z-40 flex flex-col gap-3">
      {/* Vinh's Phone bubble */}
      <a 
        href="tel:0933344646"
        onClick={handleVinhPhoneClick}
        className="group flex items-center gap-2 animate-fade-in"
        style={{ animationDelay: '0.3s' }}
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform">
          <Phone className="w-5 h-5 text-white" />
        </div>
        <div className="hidden group-hover:block bg-white px-3 py-1.5 rounded-lg shadow-lg text-xs">
          <p className="font-bold text-primary">Anh Vinh</p>
          <p className="text-primary/60">0933 344 646</p>
        </div>
      </a>

      {/* Thuận's bubble */}
      <a 
        href="tel:0394180613"
        onClick={handleThuanPhoneClick}
        className="group flex items-center gap-2 animate-fade-in"
        style={{ animationDelay: '0.5s' }}
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg shadow-secondary/30 hover:scale-110 transition-transform">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <div className="hidden group-hover:block bg-white px-3 py-1.5 rounded-lg shadow-lg text-xs">
          <p className="font-bold text-primary">Thuận (Trợ lý)</p>
          <p className="text-primary/60">0394 180 613</p>
        </div>
      </a>

      {/* Facebook bubble */}
      <a 
        href="https://www.facebook.com/vinh.around.2025"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleFacebookClick}
        className="group flex items-center gap-2 animate-fade-in"
        style={{ animationDelay: '0.7s' }}
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1877F2] to-[#0866FF] flex items-center justify-center shadow-lg shadow-[#1877F2]/30 hover:scale-110 transition-transform">
          <Facebook className="w-5 h-5 text-white" />
        </div>
        <div className="hidden group-hover:block bg-white px-3 py-1.5 rounded-lg shadow-lg text-xs">
          <p className="font-bold text-primary">Facebook</p>
          <p className="text-primary/60">Vinh Around</p>
        </div>
      </a>
    </div>
  );
};

export default FloatingContacts;
