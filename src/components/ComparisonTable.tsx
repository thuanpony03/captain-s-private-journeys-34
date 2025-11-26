import { Card } from "@/components/ui/card";

const ComparisonTable = () => {
  const comparisons = [
    {
      category: "Di chuyển",
      icon: "🚌",
      traditional: "Xe bus 45 chỗ, ồn ào, chờ đợi mệt mỏi",
      premium: "Xe riêng Mercedes/SUV cao cấp, êm ái, riêng tư, thoải mái",
      iconPremium: "🚙",
      emojiReaction: "😫",
      emojiPremium: "😌"
    },
    {
      category: "Giờ giấc",
      icon: "⏰",
      traditional: "6h sáng dậy, check-in như chạy giặc, mệt lử",
      premium: "Tự do hoàn toàn, ngủ nướng tùy thích, dừng chân bất cứ lúc nào",
      iconPremium: "☕",
      emojiReaction: "😴",
      emojiPremium: "😎"
    },
    {
      category: "Lo toan",
      icon: "📋",
      traditional: "Tự lo vé bay giờ xấu, transit lâu, thủ tục rối",
      premium: "Vinh lo trọn gói từ A-Z: Vé đẹp, Visa, Bảo hiểm, tất cả!",
      iconPremium: "✨",
      emojiReaction: "😰",
      emojiPremium: "🤗"
    },
    {
      category: "Ăn uống",
      icon: "🍱",
      traditional: "Cơm đoàn nguội ngắt, nhà hàng công nghiệp, vô vị",
      premium: "A-la-carte sang trọng, món Âu + Việt nóng sốt, ngon miệng",
      iconPremium: "🍽️",
      emojiReaction: "😒",
      emojiPremium: "🤤"
    },
    {
      category: "Người dẫn",
      icon: "🚩",
      traditional: "HDV cầm cờ, nói theo bài vở, xa lạ",
      premium: "Vinh Around - Người thổ địa, rành đường, thân thiện như người nhà",
      iconPremium: "👨‍✈️",
      emojiReaction: "😐",
      emojiPremium: "🥰"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-20 text-9xl opacity-5 animate-float">⚖️</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-5xl animate-float">⚡</span>
              <div className="h-[3px] w-24 bg-gradient-to-r from-transparent via-secondary to-accent rounded-full"></div>
              <span className="text-5xl animate-float" style={{ animationDelay: '1s' }}>⚡</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-destructive">Đi Hành Xác</span>
              {" "}vs{" "}
              <span className="text-gradient">Đi Hưởng Thụ</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-light flex items-center justify-center gap-3">
              <span className="text-3xl">🤔</span>
              Tại sao nên chọn Private Tour cùng Vinh Around?
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[768px]">
              {/* Header */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center font-display font-bold text-2xl md:text-3xl text-foreground flex items-center justify-center">
                  <span className="text-4xl mr-3">📋</span>
                  Tiêu chí
                </div>
                <Card className="p-6 md:p-8 bg-gradient-to-br from-muted to-muted/50 hover-lift relative overflow-hidden group">
                  <div className="absolute inset-0 bg-destructive/5"></div>
                  <div className="relative flex flex-col items-center justify-center gap-3">
                    <span className="text-5xl">😫</span>
                    <span className="font-display font-bold text-xl md:text-2xl text-destructive">Tour Đoàn</span>
                  </div>
                </Card>
                <Card className="p-6 md:p-8 gradient-sunset border-2 border-secondary hover-lift relative overflow-hidden group shadow-glow">
                  <div className="absolute inset-0 animate-shimmer"></div>
                  <div className="relative flex flex-col items-center justify-center gap-3">
                    <span className="text-5xl">😎</span>
                    <span className="font-display font-bold text-xl md:text-2xl text-white">Private với Vinh</span>
                  </div>
                </Card>
              </div>

              {/* Comparison Rows */}
              {comparisons.map((item, index) => (
                <div 
                  key={index} 
                  className="grid grid-cols-3 gap-6 mb-6 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="p-6 md:p-8 flex flex-col items-center justify-center gradient-primary text-primary-foreground font-semibold hover-lift group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-secondary/10 group-hover:to-secondary/20 transition-all"></div>
                    <span className="text-6xl mb-4 transform group-hover:scale-125 transition-transform animate-float">{item.icon}</span>
                    <span className="font-display text-xl md:text-2xl relative z-10">{item.category}</span>
                  </Card>
                  
                  <Card className="p-6 md:p-8 bg-muted/50 hover:bg-muted transition-all hover-lift relative group overflow-hidden">
                    <div className="absolute top-3 right-3">
                      <span className="text-4xl">{item.emojiReaction}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-5xl">{item.icon}</span>
                    </div>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {item.traditional}
                    </p>
                  </Card>
                  
                  <Card className="p-6 md:p-8 bg-gradient-to-br from-secondary/20 via-accent/10 to-primary/10 border-2 border-secondary/40 hover-lift relative group overflow-hidden shadow-elegant">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-secondary/10 group-hover:to-secondary/20 transition-all"></div>
                    <div className="absolute top-3 right-3">
                      <span className="text-4xl animate-wave">{item.emojiPremium}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-5xl">{item.iconPremium}</span>
                    </div>
                    <p className="text-base md:text-lg font-semibold text-foreground leading-relaxed relative z-10">
                      {item.premium}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center animate-zoom-in">
            <Card className="inline-block p-10 md:p-12 gradient-sunset shadow-glow hover-lift relative overflow-hidden group border-2 border-white/20">
              <div className="absolute inset-0 animate-shimmer"></div>
              <div className="relative flex flex-col md:flex-row items-center gap-6">
                <div className="text-7xl md:text-8xl animate-float">💎</div>
                <div className="text-white">
                  <p className="font-display text-3xl md:text-4xl font-bold mb-3 flex items-center justify-center md:justify-start gap-3">
                    <span className="text-5xl">🚢</span>
                    Du thuyền trên mặt đất
                  </p>
                  <p className="text-xl md:text-2xl opacity-95 font-light italic">
                    Xứng đáng với từng đồng tiền bạn đầu tư
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
