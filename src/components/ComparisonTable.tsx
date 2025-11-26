import { Card } from "@/components/ui/card";
import { X, Check } from "lucide-react";

const ComparisonTable = () => {
  const comparisons = [
    {
      category: "Di chuyển",
      traditional: "Xe bus 45 chỗ, ồn ào, chờ đợi mệt mỏi",
      premium: "Xe riêng Mercedes/SUV cao cấp, êm ái, riêng tư, thoải mái"
    },
    {
      category: "Giờ giấc",
      traditional: "6h sáng dậy, check-in như chạy giặc, mệt lử",
      premium: "Tự do hoàn toàn, ngủ nướng tùy thích, dừng chân bất cứ lúc nào"
    },
    {
      category: "Lo toan",
      traditional: "Tự lo vé bay giờ xấu, transit lâu, thủ tục rối",
      premium: "Vinh lo trọn gói từ A-Z: Vé đẹp, Visa, Bảo hiểm, tất cả!"
    },
    {
      category: "Ăn uống",
      traditional: "Cơm đoàn nguội ngắt, nhà hàng công nghiệp, vô vị",
      premium: "A-la-carte sang trọng, món Âu + Việt nóng sốt, ngon miệng"
    },
    {
      category: "Người dẫn",
      traditional: "HDV cầm cờ, nói theo bài vở, xa lạ",
      premium: "Vinh Around - Người thổ địa, rành đường, thân thiện như người nhà"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-secondary"></div>
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-secondary"></div>
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-destructive">Đi Hành Xác</span>
              {" "}vs{" "}
              <span className="text-gradient">Đi Hưởng Thụ</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light">
              Tại sao nên chọn Private Tour cùng Vinh Around?
            </p>
          </div>

          {/* Comparison Grid */}
          <div className="space-y-6">
            {/* Column Headers - Hidden on Mobile */}
            <div className="hidden md:grid md:grid-cols-2 gap-6 mb-4">
              <Card className="p-6 bg-destructive/5 border-destructive/20">
                <div className="flex items-center justify-center gap-3">
                  <X className="w-6 h-6 text-destructive" />
                  <span className="font-display font-bold text-xl text-destructive">Tour Đoàn</span>
                </div>
              </Card>
              <Card className="p-6 gradient-sunset border-secondary/40">
                <div className="flex items-center justify-center gap-3">
                  <Check className="w-6 h-6 text-white" />
                  <span className="font-display font-bold text-xl text-white">Private với Vinh</span>
                </div>
              </Card>
            </div>

            {/* Comparison Items */}
            {comparisons.map((item, index) => (
              <div key={index} className="space-y-3 md:space-y-0">
                {/* Category Label */}
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-secondary to-accent rounded-full"></div>
                  <h3 className="font-display font-bold text-xl md:text-2xl text-foreground">
                    {item.category}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
                </div>

                {/* Comparison Cards */}
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  {/* Traditional Tour */}
                  <Card className="p-5 md:p-6 bg-muted/30 hover:bg-muted/50 transition-colors border-muted">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        <X className="w-5 h-5 text-destructive/70" />
                      </div>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {item.traditional}
                      </p>
                    </div>
                    <div className="md:hidden mt-2 text-xs font-semibold text-destructive/70 uppercase tracking-wide">
                      Tour Đoàn
                    </div>
                  </Card>

                  {/* Premium Tour */}
                  <Card className="p-5 md:p-6 bg-gradient-to-br from-secondary/10 via-accent/5 to-primary/5 hover:from-secondary/15 hover:via-accent/10 hover:to-primary/10 transition-all border-secondary/30 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        <Check className="w-5 h-5 text-secondary" />
                      </div>
                      <p className="text-sm md:text-base font-medium text-foreground leading-relaxed">
                        {item.premium}
                      </p>
                    </div>
                    <div className="md:hidden mt-2 text-xs font-semibold text-secondary uppercase tracking-wide">
                      Private với Vinh
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 md:mt-16 text-center">
            <Card className="inline-block p-8 md:p-10 gradient-sunset shadow-lg hover:shadow-xl transition-shadow border border-white/20">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-white">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  <div className="w-1 h-1 rounded-full bg-white/70"></div>
                </div>
                <div>
                  <p className="font-display text-2xl md:text-3xl font-bold mb-1">
                    Du thuyền trên mặt đất
                  </p>
                  <p className="text-base md:text-lg opacity-90 font-light italic">
                    Xứng đáng với từng đồng tiền bạn đầu tư
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-white/70"></div>
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '1s' }}></div>
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
