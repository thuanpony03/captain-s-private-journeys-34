import { Card } from "@/components/ui/card";

const SocialProof = () => {
  const testimonials = [
    {
      name: "Gia đình chị Mai",
      location: "Đà Nẵng",
      text: "Tour Mỹ của anh Vinh quá tuyệt vời! Bố mẹ về khen nức nở. Không phải lo lắng gì, chỉ việc tận hưởng. Ăn uống rất hợp khẩu vị người Việt.",
      rating: 5,
      tour: "US West Coast",
      avatar: "👩‍👧‍👦",
      highlight: "Quá tuyệt vời"
    },
    {
      name: "Anh Tuấn & Gia đình",
      location: "TP.HCM",
      text: "Chú Vinh lái xe cực khéo, giới thiệu địa điểm như người thổ địa. Con tôi 8 tuổi cứ hỏi 'bao giờ đi với chú Vinh nữa ba ơi'. Dịch vụ 10/10!",
      rating: 5,
      tour: "Australia Grand Road",
      avatar: "👨‍👩‍👧",
      highlight: "Dịch vụ 10/10"
    },
    {
      name: "Chị Hương",
      location: "Hà Nội",
      text: "Lần đầu đi Úc mà không lo lắng gì cả. Từ visa, vé máy bay đến khách sạn, anh Vinh lo hết. Mình chỉ việc đóng tiền và lên đường. Quá đáng tiền!",
      rating: 5,
      tour: "Custom Tour",
      avatar: "👩",
      highlight: "Quá đáng tiền"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Những gia đình đã đồng hành
              <br />
              <span className="text-secondary italic">cùng Vinh Around</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Hơn <span className="font-bold text-secondary">100+ gia đình</span> đã trải nghiệm và tin tưởng
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl">{testimonial.avatar}</span>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    <p className="text-xs text-secondary font-semibold mt-1">{testimonial.tour}</p>
                  </div>
                </div>
                <p className="text-foreground leading-relaxed mb-4">
                  {testimonial.text}
                </p>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-secondary">⭐</span>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { number: "100+", title: "Gia đình hài lòng", desc: "Trải nghiệm tuyệt vời", icon: "😊" },
              { number: "10+", title: "Năm kinh nghiệm", desc: "Chuyên gia du lịch", icon: "🎖️" },
              { number: "100%", title: "Cam kết chất lượng", desc: "Hoàn tiền nếu không hài lòng", icon: "💯" }
            ].map((stat, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{stat.icon}</div>
                <p className="text-4xl font-bold text-secondary mb-2">{stat.number}</p>
                <p className="font-bold text-xl text-primary mb-1">{stat.title}</p>
                <p className="text-sm text-muted-foreground">{stat.desc}</p>
              </Card>
            ))}
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <Card className="inline-block p-8 bg-secondary/10 border-2 border-secondary">
              <p className="text-2xl md:text-3xl font-bold mb-2 text-primary">
                💯 100% Khách hàng hài lòng
              </p>
              <p className="text-lg text-muted-foreground">
                Cam kết hoàn tiền nếu không hài lòng về dịch vụ
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
