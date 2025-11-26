import { Facebook, Youtube, MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-secondary">Passport Lounge</h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                Dịch vụ Private Tour cao cấp do Captain Vinh điều hành. 
                Mang đến trải nghiệm du lịch "Du thuyền trên mặt đất" cho gia đình Việt.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-secondary">Thông tin liên hệ</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-primary-foreground/80 text-sm">
                    Văn phòng: TP. Hồ Chí Minh, Việt Nam
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-primary-foreground/80 text-sm">
                    Hotline: (+84) 123 456 789
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-primary-foreground/80 text-sm">
                    captain@passport.cafe
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-secondary">Kết nối với chúng tôi</h4>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-smooth"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-smooth"
                  aria-label="Youtube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
              <div className="pt-4">
                <p className="text-primary-foreground/60 text-sm">
                  <span className="font-semibold">MST:</span> 0123456789
                </p>
                <p className="text-primary-foreground/60 text-sm">
                  Giấy phép kinh doanh lữ hành quốc tế
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8 text-center">
            <p className="text-primary-foreground/70 text-sm">
              © 2024 Passport Lounge. All rights reserved.
            </p>
            <p className="text-secondary/80 text-sm mt-2 italic">
              Operated by Vinh Around & Team with Passion ❤️
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
