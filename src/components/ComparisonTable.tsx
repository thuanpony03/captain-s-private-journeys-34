import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";

const ComparisonTable = () => {
  const comparisons = [
    {
      category: "Di chuyển",
      traditional: "Xe bus 45 chỗ, ồn ào, chờ đợi",
      premium: "Xe riêng (Mercedes/SUV) nhóm 6 người. Êm ái, riêng tư"
    },
    {
      category: "Giờ giấc",
      traditional: "6h sáng dậy, check-in như chạy giặc",
      premium: "Tự do. Ngủ nướng tùy thích, dừng đỗ tùy hứng"
    },
    {
      category: "Logistics",
      traditional: "Tự lo vé máy bay hoặc bay giờ xấu, transit lâu",
      premium: "Vinh lo trọn gói. Săn vé giờ đẹp, Visa, Bảo hiểm A-Z"
    },
    {
      category: "Ăn uống",
      traditional: "Cơm đoàn nguội ngắt, nhà hàng công nghiệp",
      premium: "Tinh tế. Ăn A-la-carte (gọi món), kết hợp món Âu & món Việt nóng sốt"
    },
    {
      category: "Người dẫn",
      traditional: "HDV cầm cờ, nói theo bài vở",
      premium: "Captain Vinh - Thổ địa. Rành ngõ ngách, thạo luật, phục vụ như người nhà"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Sự khác biệt giữa "Đi Hành Xác" và "Đi Hưởng Thụ"
            </h2>
            <p className="text-xl text-muted-foreground">
              Tại sao nên chọn Private Tour cùng Captain Vinh?
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[768px]">
              {/* Header */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center font-semibold text-lg text-foreground">
                  Tiêu chí
                </div>
                <Card className="p-4 bg-muted/50">
                  <div className="flex items-center justify-center gap-2">
                    <X className="w-6 h-6 text-destructive" />
                    <span className="font-bold text-lg">Tour Đoàn Truyền Thống</span>
                  </div>
                </Card>
                <Card className="p-4 bg-secondary/10 border-secondary border-2">
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-6 h-6 text-secondary" />
                    <span className="font-bold text-lg">Private Tour với Vinh</span>
                  </div>
                </Card>
              </div>

              {/* Rows */}
              {comparisons.map((item, index) => (
                <div 
                  key={index} 
                  className="grid grid-cols-3 gap-4 mb-4 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="p-4 flex items-center justify-center bg-primary text-primary-foreground font-semibold">
                    {item.category}
                  </Card>
                  <Card className="p-4 bg-muted/30">
                    <p className="text-sm md:text-base text-muted-foreground">
                      {item.traditional}
                    </p>
                  </Card>
                  <Card className="p-4 bg-secondary/5 border-secondary/20 border">
                    <p className="text-sm md:text-base font-medium text-foreground">
                      {item.premium}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Card className="inline-block p-6 bg-gradient-gold shadow-gold">
              <p className="text-lg md:text-xl font-semibold text-primary">
                💎 Trải nghiệm "Du thuyền trên mặt đất" - Xứng đáng với mọi đồng tiền bạn bỏ ra
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
