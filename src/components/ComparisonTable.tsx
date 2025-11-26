import { Check, X, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const ComparisonTable = () => {
  const comparisons = [
    {
      category: "Di chuyển",
      icon: "🚌",
      traditional: "Xe bus 45 chỗ, ồn ào, chờ đợi",
      premium: "Xe riêng (Mercedes/SUV) nhóm 6 người. Êm ái, riêng tư",
      iconPremium: "🚙"
    },
    {
      category: "Giờ giấc",
      icon: "⏰",
      traditional: "6h sáng dậy, check-in như chạy giặc",
      premium: "Tự do. Ngủ nướng tùy thích, dừng đỗ tùy hứng",
      iconPremium: "☕"
    },
    {
      category: "Logistics",
      icon: "📋",
      traditional: "Tự lo vé máy bay hoặc bay giờ xấu, transit lâu",
      premium: "Vinh lo trọn gói. Săn vé giờ đẹp, Visa, Bảo hiểm A-Z",
      iconPremium: "✨"
    },
    {
      category: "Ăn uống",
      icon: "🍱",
      traditional: "Cơm đoàn nguội ngắt, nhà hàng công nghiệp",
      premium: "Tinh tế. Ăn A-la-carte (gọi món), kết hợp món Âu & món Việt nóng sốt",
      iconPremium: "🍽️"
    },
    {
      category: "Người dẫn",
      icon: "🚩",
      traditional: "HDV cầm cờ, nói theo bài vở",
      premium: "Captain Vinh - Thổ địa. Rành ngõ ngách, thạo luật, phục vụ như người nhà",
      iconPremium: "👨‍✈️"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-secondary" />
              <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
              <Sparkles className="w-6 h-6 text-secondary" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary">
              Sự khác biệt giữa
              <br />
              <span className="text-destructive">"Đi Hành Xác"</span>
              {" "}&{" "}
              <span className="text-secondary italic">"Đi Hưởng Thụ"</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-light">
              Tại sao nên chọn Private Tour cùng Captain Vinh?
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[768px]">
              {/* Header */}
              <div className="grid grid-cols-3 gap-4 md:gap-6 mb-6">
                <div className="text-center font-display font-bold text-xl md:text-2xl text-foreground">
                  Tiêu chí
                </div>
                <Card className="p-6 bg-muted/50 hover-lift relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    <div className="p-2 bg-destructive/10 rounded-full">
                      <X className="w-6 h-6 text-destructive" />
                    </div>
                    <span className="font-display font-bold text-lg md:text-xl">Tour Đoàn Truyền Thống</span>
                  </div>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-secondary/20 to-primary/10 border-secondary border-2 hover-lift relative overflow-hidden group shadow-gold">
                  <div className="absolute inset-0 animate-shimmer"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    <div className="p-2 bg-secondary/20 rounded-full">
                      <Check className="w-6 h-6 text-secondary" />
                    </div>
                    <span className="font-display font-bold text-lg md:text-xl">Private Tour với Vinh</span>
                  </div>
                </Card>
              </div>

              {/* Rows */}
              {comparisons.map((item, index) => (
                <div 
                  key={index} 
                  className="grid grid-cols-3 gap-4 md:gap-6 mb-6 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="p-6 flex flex-col items-center justify-center bg-gradient-primary text-primary-foreground font-semibold hover-lift group">
                    <span className="text-4xl mb-3 transform group-hover:scale-125 transition-transform">{item.icon}</span>
                    <span className="font-display text-lg md:text-xl">{item.category}</span>
                  </Card>
                  
                  <Card className="p-6 bg-muted/30 hover:bg-muted/50 transition-all hover-lift relative group overflow-hidden">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-5 h-5 text-destructive" />
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{item.icon}</span>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {item.traditional}
                    </p>
                  </Card>
                  
                  <Card className="p-6 bg-gradient-to-br from-secondary/10 to-primary/5 border-secondary/30 border-2 hover-lift relative group overflow-hidden shadow-elegant">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Check className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{item.iconPremium}</span>
                    </div>
                    <p className="text-sm md:text-base font-medium text-foreground leading-relaxed">
                      {item.premium}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center animate-zoom-in">
            <Card className="inline-block p-8 md:p-10 bg-gradient-to-br from-secondary via-secondary/80 to-primary shadow-gold hover-lift relative overflow-hidden group">
              <div className="absolute inset-0 animate-shimmer"></div>
              <div className="relative flex flex-col md:flex-row items-center gap-4">
                <div className="text-5xl md:text-6xl animate-float">💎</div>
                <div className="text-primary-foreground">
                  <p className="font-display text-2xl md:text-3xl font-bold mb-2">
                    Trải nghiệm "Du thuyền trên mặt đất"
                  </p>
                  <p className="text-lg md:text-xl opacity-90 font-light italic">
                    Xứng đáng với mọi đồng tiền bạn bỏ ra
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
