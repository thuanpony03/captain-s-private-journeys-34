import { Facebook, Youtube, MapPin, Mail, Phone, Heart, Award } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-16 md:py-20 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16 mb-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Award className="w-10 h-10 text-secondary" />
                <h3 className="font-display text-3xl md:text-4xl font-bold text-secondary">
                  Passport Lounge
                </h3>
              </div>
              <p className="text-primary-foreground/90 leading-relaxed text-base">
                Dịch vụ <span className="font-bold text-secondary">Private Tour cao cấp</span> do Captain Vinh điều hành. 
                Mang đến trải nghiệm du lịch{" "}
                <span className="italic font-semibold">"Du thuyền trên mặt đất"</span> cho gia đình Việt.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Heart className="w-5 h-5 text-secondary fill-secondary animate-float" />
                <span className="text-primary-foreground/80 italic">Travel with Passion, Serve with Heart</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="font-display text-2xl font-bold text-secondary flex items-center gap-2">
                <Phone className="w-6 h-6" />
                Thông tin liên hệ
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-4 group hover-lift transition-all p-3 rounded-lg hover:bg-white/5">
                  <MapPin className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-primary-foreground mb-1">Văn phòng</p>
                    <span className="text-primary-foreground/80 text-sm">
                      TP. Hồ Chí Minh, Việt Nam
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-4 group hover-lift transition-all p-3 rounded-lg hover:bg-white/5">
                  <Phone className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-primary-foreground mb-1">Hotline 24/7</p>
                    <span className="text-primary-foreground/80 text-sm">
                      (+84) 123 456 789
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-4 group hover-lift transition-all p-3 rounded-lg hover:bg-white/5">
                  <Mail className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-primary-foreground mb-1">Email</p>
                    <span className="text-primary-foreground/80 text-sm">
                      captain@passport.cafe
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social & Legal */}
            <div className="space-y-6">
              <h4 className="font-display text-2xl font-bold text-secondary">
                Kết nối với chúng tôi
              </h4>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="w-14 h-14 bg-secondary/20 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-all hover-lift group"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="#" 
                  className="w-14 h-14 bg-secondary/20 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-all hover-lift group"
                  aria-label="Youtube"
                >
                  <Youtube className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
              </div>
              
              <div className="pt-6 space-y-3">
                <div className="p-4 bg-white/5 rounded-lg border border-secondary/20">
                  <p className="text-primary-foreground/80 text-sm mb-2">
                    <span className="font-bold text-secondary">MST:</span> 0123456789
                  </p>
                  <p className="text-primary-foreground/80 text-sm">
                    <span className="font-bold text-secondary">GP:</span> Giấy phép kinh doanh lữ hành quốc tế
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-secondary" />
                  <p className="text-primary-foreground/70 text-sm italic">
                    Đăng ký kinh doanh hợp pháp
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-primary-foreground/70 text-sm text-center md:text-left">
                © 2024 Passport Lounge. All rights reserved.
              </p>
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-secondary fill-secondary animate-float" />
                <p className="text-secondary font-bold text-sm italic">
                  Operated by Vinh Around & Team with Passion
                </p>
                <Heart className="w-5 h-5 text-secondary fill-secondary animate-float" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
