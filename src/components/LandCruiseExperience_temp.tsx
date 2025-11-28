import { Card } from "@/components/ui/card";
import vehicleImage from "@/assets/luxury-vehicle.jpg";
import hotelImage from "@/assets/luxury-hotel.jpg";
import foodImage from "@/assets/gourmet-food.jpg";

const LandCruiseExperience = () => {
  const experiences = [
    {
      title: "Đội xe thượng hạng",
      image: vehicleImage,
      description: "Mercedes/SUV cao cấp với ghế da, tủ lạnh, WiFi. Duỗi chân thoải mái suốt hành trình dài.",
      icon: "🚙",
      features: ["Ghế da cao cấp", "WiFi & Tủ lạnh", "Không gian rộng rãi"]
    },
    {
      title: "Giấc ngủ 5 sao",
      image: hotelImage,
      description: "Khách sạn ngay trung tâm với view đẹp, phòng rộng rãi, tiện nghi hiện đại đầy đủ.",
      icon: "🏨",
      features: ["View đẹp trung tâm", "Phòng rộng rãi", "Tiện nghi 5 sao"]
    },
    {
      title: "Ẩm thực nuông chiều",
      image: foodImage,
      description: "A-la-carte cao cấp với món Việt nóng sốt, món Âu tinh tế. Ấm bụng như ở nhà.",
      icon: "🍽️",
      features: ["Món Việt nóng sốt", "Món Âu tinh tế", "Phục vụ tận tâm"]
    }
  ];

  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Tiêu chuẩn{" "}
              <span className="text-secondary italic text-5xl">"Du thuyền trên mặt đất"</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Mỗi chi tiết được chăm chút để mang đến trải nghiệm{" "}
              <span className="font-bold text-secondary">xa hoa nhất</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={exp.image} 
                    alt={exp.title} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 p-3 rounded-lg">
                      <span className="text-3xl">{exp.icon}</span>
                    </div>
                  </div>
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">
                      {exp.title}
                    </h3>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-6 bg-card">
                  <p className="text-foreground leading-relaxed text-base mb-4">
                    {exp.description}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.features.map((feature, i) => (
                      <div key={i} className="bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                        <span className="text-sm font-semibold text-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandCruiseExperience;
