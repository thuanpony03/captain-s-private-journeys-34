import { Card } from "@/components/ui/card";
import vehicleImage from "@/assets/luxury-vehicle.jpg";
import hotelImage from "@/assets/luxury-hotel.jpg";
import foodImage from "@/assets/gourmet-food.jpg";

const LandCruiseExperience = () => {
  const experiences = [
    {
      title: "Đội xe thượng hạng",
      image: vehicleImage,
      description: "Mercedes/SUV cao cấp. Ghế da, tủ lạnh, WiFi. Duỗi chân thoải mái suốt hành trình.",
      icon: "🚗"
    },
    {
      title: "Giấc ngủ 5 sao",
      image: hotelImage,
      description: "Khách sạn ngay trung tâm, view đẹp. Phòng rộng rãi, tiện nghi hiện đại.",
      icon: "🏨"
    },
    {
      title: "Ẩm thực nuông chiều",
      image: foodImage,
      description: "A-la-carte cao cấp. Món Việt nóng sốt, món Âu tinh tế. Ấm bụng như ở nhà.",
      icon: "🍽️"
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Tiêu chuẩn "Du thuyền mặt đất" (Land Cruise)
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Mỗi chi tiết được chăm chút để mang đến trải nghiệm xa hoa và thoải mái nhất
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {experiences.map((exp, index) => (
              <Card 
                key={index} 
                className="overflow-hidden hover-lift group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={exp.image} 
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">{exp.icon}</span>
                      <h3 className="text-2xl font-bold text-primary-foreground">
                        {exp.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-card">
                  <p className="text-card-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-secondary/20 px-8 py-4 rounded-full border-2 border-secondary">
              <span className="text-3xl">✨</span>
              <p className="text-lg font-semibold text-foreground">
                Sang trọng từng chi tiết - Tận hưởng từng khoảnh khắc
              </p>
              <span className="text-3xl">✨</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandCruiseExperience;
