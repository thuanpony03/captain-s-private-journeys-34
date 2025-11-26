import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Sparkles } from "lucide-react";

const TourPackages = () => {
  const packages = [
    {
      title: "US West Coast",
      subtitle: "Mùa thu vàng & Rượu vang Napa",
      description: "San Francisco - Napa Valley - Los Angeles - San Diego",
      highlights: [
        "Cầu Golden Gate & Fisherman's Wharf",
        "Thung lũng rượu vang Napa danh tiếng",
        "Hollywood & Santa Monica Beach",
        "Công viên Balboa & San Diego Zoo"
      ],
      duration: "10-12 ngày",
      group: "6-8 người",
      season: "Sep - Nov",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Australia Grand Road",
      subtitle: "Cung đường biển vĩ đại & Kangaroo",
      description: "Sydney - Great Ocean Road - Melbourne - Gold Coast",
      highlights: [
        "Opera House & Harbour Bridge huyền thoại",
        "Great Ocean Road - 12 tảng đá sứ",
        "Gặp gỡ Kangaroo & Koala",
        "Biển vàng Gold Coast tuyệt đẹp"
      ],
      duration: "12-14 ngày",
      group: "6-8 người",
      season: "Quanh năm",
      color: "from-blue-500 to-teal-500"
    },
    {
      title: "Custom Tour",
      subtitle: "Thiết kế riêng theo ý bạn",
      description: "Đi bất cứ đâu bạn muốn - Theo phong cách của riêng bạn",
      highlights: [
        "Lộ trình 100% theo yêu cầu",
        "Linh hoạt thời gian & điểm đến",
        "Phù hợp mọi sở thích gia đình",
        "Vinh tư vấn chi tiết từng địa điểm"
      ],
      duration: "Tùy chỉnh",
      group: "Từ 6 người",
      season: "Theo lịch bạn",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Các hành trình Signature mùa này
            </h2>
            <p className="text-xl text-muted-foreground">
              Trải nghiệm được thiết kế riêng, đảm bảo chất lượng tối đa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card 
                key={index}
                className="overflow-hidden hover-lift group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header with gradient */}
                <div className={`bg-gradient-to-br ${pkg.color} p-6 text-white`}>
                  <div className="flex items-start justify-between mb-3">
                    <Sparkles className="w-8 h-8" />
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                      {pkg.season}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                  <p className="text-white/90 text-sm">{pkg.subtitle}</p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <p className="text-muted-foreground font-medium">
                    {pkg.description}
                  </p>

                  <div className="space-y-2">
                    {pkg.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-secondary mt-1">✓</span>
                        <span className="text-sm text-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-secondary" />
                      <span className="text-muted-foreground">{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-secondary" />
                      <span className="text-muted-foreground">{pkg.group}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => {
                      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Xem lịch trình chi tiết
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="inline-block p-6 bg-card shadow-elegant">
              <div className="flex items-center gap-4">
                <MapPin className="w-8 h-8 text-secondary" />
                <div className="text-left">
                  <p className="font-bold text-lg text-foreground">Chưa thấy điểm đến mình muốn?</p>
                  <p className="text-muted-foreground">Hãy để Vinh thiết kế hành trình riêng cho bạn</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourPackages;
