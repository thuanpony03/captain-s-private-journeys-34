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
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 via-background to-muted/20 relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-64 h-64 md:w-96 md:h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 md:w-96 md:h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-secondary"></div>
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
              <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-secondary"></div>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-destructive block md:inline">Đi Hành Xác</span>
              <span className="text-muted-foreground mx-2 hidden md:inline">vs</span>
              <span className="text-gradient block md:inline mt-2 md:mt-0">Đi Hưởng Thụ</span>
            </h2>
            <p className="text-base md:text-xl text-muted-foreground font-light mt-4">
              Tại sao nên chọn Private Tour cùng Vinh Around?
            </p>
          </div>

          {/* Mobile: Toggle Headers */}
          <div className="grid grid-cols-2 gap-3 mb-8 md:hidden">
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-2xl">
              <div className="flex items-center justify-center gap-2">
                <X className="w-5 h-5 text-destructive" />
                <span className="font-display font-bold text-sm text-destructive">Tour Đoàn</span>
              </div>
            </div>
            <div className="p-4 gradient-sunset border border-white/20 rounded-2xl">
              <div className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5 text-white" />
                <span className="font-display font-bold text-sm text-white">Private Vinh</span>
              </div>
            </div>
          </div>

          {/* Comparison Items */}
          <div className="space-y-6 md:space-y-8">
            {comparisons.map((item, index) => (
              <div key={index}>
                {/* Category Label */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-secondary to-accent rounded-full"></div>
                  <h3 className="font-display font-bold text-lg md:text-2xl text-foreground">
                    {item.category}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
                </div>

                {/* Comparison Cards - Mobile Optimized Stack */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                  {/* Traditional Tour */}
                  <Card className="p-4 md:p-6 bg-muted/40 border-muted hover:border-destructive/20 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0">
                        <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center">
                          <X className="w-4 h-4 text-destructive" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {item.traditional}
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Premium Tour */}
                  <Card className="p-4 md:p-6 bg-gradient-to-br from-secondary/5 via-accent/5 to-background border-secondary/20 hover:border-secondary/40 transition-all shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0">
                        <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                          <Check className="w-4 h-4 text-secondary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm md:text-base font-medium text-foreground leading-relaxed">
                          {item.premium}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 md:mt-16 text-center">
            <div className="inline-block gradient-sunset p-6 md:p-8 rounded-3xl shadow-lg border border-white/20">
              <div className="flex flex-col items-center gap-3 text-white max-w-md mx-auto">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  <div className="h-px w-12 bg-white/40"></div>
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
                <div>
                  <p className="font-display text-xl md:text-3xl font-bold mb-2">
                    Du thuyền trên mặt đất
                  </p>
                  <p className="text-sm md:text-lg opacity-90 font-light">
                    Xứng đáng với từng đồng tiền bạn đầu tư
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
