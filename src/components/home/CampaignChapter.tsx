import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Car, Users, Clock } from "lucide-react";

export interface CampaignTour {
  slug: string;
  title: string;
  tagline: string | null;
  price: string | null;
  duration: string | null;
  maxGroupSize: number | null;
  isSelfDrive: boolean;
  image: string | null;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=900&q=80";

/**
 * Khối quảng bá riêng cho các tour đang chạy campaign quảng cáo (vd Canada
 * mùa thu) — đặt sớm trên trang chủ, tách hẳn khỏi mạch "tạp chí hành trình"
 * bằng nền màu để khách bấm quảng cáo vào biết ngay đang có gì đang mở bán,
 * không phải lướt hết trang mới thấy.
 */
export default function CampaignChapter({ tours }: { tours: CampaignTour[] }) {
  if (tours.length === 0) return null;

  return (
    <section className="relative bg-primary py-16 md:py-24 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />
      <div className="container mx-auto px-6 max-w-5xl relative">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          <span className="text-secondary text-xs font-bold uppercase tracking-widest">
            Đang mở bán
          </span>
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 max-w-2xl leading-tight">
          Canada mùa thu — 2 hành trình đang chạy
        </h2>
        <p className="text-white/70 max-w-xl mb-10 md:mb-14">
          Toronto, Niagara Falls, Quebec City tới Rocky Mountains mùa lá phong — chọn tour trọn
          gói có hướng dẫn viên đồng hành, hoặc tự lái khám phá theo nhịp riêng của nhà bạn.
        </p>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {tours.map((tour) => (
            <Link
              key={tour.slug}
              href={`/tour/${tour.slug}`}
              className="group block rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={tour.image || FALLBACK_IMAGE}
                  alt={tour.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {tour.isSelfDrive && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-primary text-xs font-bold uppercase tracking-wide">
                      <Car className="w-3.5 h-3.5" /> Caravan tự lái
                    </span>
                  )}
                  {!tour.isSelfDrive && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-primary text-xs font-bold uppercase tracking-wide">
                      Trọn gói
                    </span>
                  )}
                  {tour.maxGroupSize !== null && tour.maxGroupSize <= 6 && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-bold uppercase tracking-wide">
                      <Users className="w-3.5 h-3.5" /> Giới hạn {tour.maxGroupSize} khách
                    </span>
                  )}
                </div>

                {tour.duration && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/85 text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5" /> {tour.duration}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-primary mb-1.5 group-hover:text-secondary transition-colors leading-snug">
                  {tour.title}
                </h3>
                {tour.tagline && (
                  <p className="text-primary/60 text-sm mb-4 line-clamp-2">{tour.tagline}</p>
                )}
                <div className="flex items-center justify-between pt-3 border-t border-primary/10">
                  {tour.price ? (
                    <span className="text-secondary font-display font-bold text-lg">{tour.price}</span>
                  ) : (
                    <span className="text-primary/50 text-sm font-medium">Liên hệ báo giá</span>
                  )}
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-bold group-hover:gap-2 transition-all">
                    Xem chi tiết <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-14">
          <Link
            href="/tour/canada"
            className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-secondary transition-colors"
          >
            Xem đầy đủ tour Canada <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
