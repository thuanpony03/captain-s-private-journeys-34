import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const SocialProof = () => {
  const testimonials = [
    {
      name: "Gia đình chị Mai",
      location: "Đà Nẵng",
      text: "Tour Mỹ của anh Vinh quá tuyệt vời! Bố mẹ về khen nức nở. Không phải lo lắng gì, chỉ việc tận hưởng. Ăn uống rất hợp khẩu vị người Việt.",
      rating: 5,
      tour: "US West Coast"
    },
    {
      name: "Anh Tuấn & Gia đình",
      location: "TP.HCM",
      text: "Chú Vinh lái xe cực khéo, giới thiệu địa điểm như người thổ địa. Con tôi 8 tuổi cứ hỏi 'bao giờ đi với chú Vinh nữa ba ơi'. Dịch vụ 10/10!",
      rating: 5,
      tour: "Australia Grand Road"
    },
    {
      name: "Chị Hương",
      location: "Hà Nội",
      text: "Lần đầu đi Úc mà không lo lắng gì cả. Từ visa, vé máy bay đến khách sạn, anh Vinh lo hết. Mình chỉ việc đóng tiền và lên đường. Quá đáng tiền!",
      rating: 5,
      tour: "Custom Tour"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Những gia đình đã đồng hành cùng Vinh
            </h2>
            <p className="text-xl text-muted-foreground">
              Hơn 100+ gia đình đã trải nghiệm và tin tưởng
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="p-6 hover-lift relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Quote className="absolute top-4 right-4 w-12 h-12 text-secondary/20" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>

                <p className="text-foreground leading-relaxed mb-6 relative z-10">
                  "{testimonial.text}"
                </p>

                <div className="border-t pt-4">
                  <p className="font-bold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  <div className="mt-2 inline-block bg-secondary/20 px-3 py-1 rounded-full">
                    <p className="text-xs font-semibold text-secondary">{testimonial.tour}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Card className="inline-block p-8 bg-gradient-primary shadow-elegant">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="text-6xl">🤝</div>
                <div className="text-primary-foreground">
                  <p className="text-2xl font-bold mb-2">100% Khách hàng hài lòng</p>
                  <p className="text-lg opacity-90">Cam kết hoàn tiền nếu không hài lòng về dịch vụ</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
