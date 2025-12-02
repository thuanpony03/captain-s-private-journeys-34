import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, DollarSign, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";

interface Tour {
  id: string;
  title: string;
  tagline: string | null;
  route: string | null;
  description: string | null;
  duration: string | null;
  price: string | null;
  image_url: string | null;
  stops: string[];
}

const TourDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTour = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('tour_packages')
          .select('*')
          .eq('id', id)
          .eq('is_active', true)
          .maybeSingle();

        if (error) throw error;
        
        if (data) {
          setTour({
            ...data,
            stops: Array.isArray(data.stops) ? data.stops.map(s => String(s)) : []
          });
        }
      } catch (error: any) {
        console.error('Error fetching tour:', error);
        toast({
          title: "Lỗi",
          description: "Không thể tải thông tin tour",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id, toast]);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: tour?.title || 'Tour du lịch',
        text: tour?.description || '',
        url: url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Đã sao chép",
        description: "Link tour đã được sao chép vào clipboard",
      });
    }
  };

  const scrollToForm = () => {
    window.location.href = '/#contact-form';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-xl text-primary">Đang tải...</div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-primary mb-4">Không tìm thấy tour</h1>
        <Link to="/">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Về trang chủ
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${tour.title} | Vinh Around Travel`}
        description={tour.description || `Khám phá ${tour.title} cùng Vinh Around - Tour du lịch cao cấp với dịch vụ tận tâm`}
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Image */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img 
            src={tour.image_url || 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1200&q=80'}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent"></div>
          
          {/* Back Button */}
          <div className="absolute top-6 left-6 z-10">
            <Link to="/">
              <Button variant="outline" className="glass-effect border-white/40 text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Về trang chủ
              </Button>
            </Link>
          </div>

          {/* Share Button */}
          <div className="absolute top-6 right-6 z-10">
            <Button 
              onClick={handleShare}
              variant="outline" 
              className="glass-effect border-white/40 text-white hover:bg-white/20"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Chia sẻ
            </Button>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto max-w-4xl">
              {tour.tagline && (
                <p className="text-secondary text-sm md:text-base font-semibold mb-2">{tour.tagline}</p>
              )}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-3">
                {tour.title}
              </h1>
              {tour.route && (
                <p className="text-white/80 text-lg md:text-xl">{tour.route}</p>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-4xl px-6 py-12 md:py-16">
          
          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {tour.duration && (
              <div className="glass-effect p-5 rounded-xl border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Thời gian</p>
                </div>
                <p className="text-xl font-bold text-primary">{tour.duration}</p>
              </div>
            )}
            
            {tour.price && (
              <div className="glass-effect p-5 rounded-xl border border-secondary/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-secondary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Giá từ</p>
                </div>
                <p className="text-xl font-bold text-secondary">{tour.price}</p>
              </div>
            )}

            {tour.stops.length > 0 && (
              <div className="glass-effect p-5 rounded-xl border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Điểm đến</p>
                </div>
                <p className="text-xl font-bold text-primary">{tour.stops.length} địa điểm</p>
              </div>
            )}
          </div>

          {/* Description */}
          {tour.description && (
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-4">
                Về chuyến đi này
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                {tour.description}
              </p>
            </div>
          )}

          {/* Itinerary */}
          {tour.stops.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-6">
                Lịch trình chi tiết
              </h2>
              
              <div className="space-y-4">
                {tour.stops.map((stop, index) => (
                  <div key={index} className="flex gap-4">
                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      {index < tour.stops.length - 1 && (
                        <div className="w-0.5 flex-1 bg-gradient-to-b from-secondary to-accent/30 my-2"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="glass-effect p-5 rounded-xl border border-primary/10 hover:border-secondary/30 transition-all">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="text-lg font-bold text-foreground mb-1">{stop}</h3>
                            <p className="text-sm text-muted-foreground">Điểm dừng chân thứ {index + 1}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="glass-effect p-8 rounded-2xl border border-secondary/20 text-center">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-primary mb-3">
              Sẵn sàng khám phá?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Liên hệ ngay để nhận tư vấn chi tiết và đặt lịch cho chuyến đi của bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={scrollToForm}
                size="lg"
                className="bg-gradient-to-r from-secondary via-accent to-secondary text-white font-bold"
              >
                Đặt lịch ngay
              </Button>
              <Link to="/">
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Xem tour khác
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default TourDetail;
