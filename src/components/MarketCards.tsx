import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export interface MarketCardTour {
  slug: string;
  title: string;
  price: string | null;
}

export interface MarketCardData {
  href: string;
  label: string;
  image: string;
  tours: MarketCardTour[];
}

export default function MarketCards({ markets }: { markets: MarketCardData[] }) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-primary mb-4">
            Chọn thị trường bạn muốn đi
          </h2>
          <p className="text-primary/60 max-w-xl mx-auto">
            Mỗi thị trường một trải nghiệm riêng — Vinh lo hết từ visa đến từng bữa ăn
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {markets.map((market) => (
            <Link
              key={market.href}
              href={market.href}
              className="group block rounded-2xl overflow-hidden border border-primary/10 bg-white shadow-sm hover:shadow-2xl hover:border-secondary/30 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={market.image}
                  alt={market.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-2xl font-black text-white">{market.label}</h3>
                </div>
              </div>
              <div className="p-5">
                {market.tours.length > 0 ? (
                  <ul className="space-y-1.5 mb-4">
                    {market.tours.map((t) => (
                      <li key={t.slug} className="flex items-center justify-between text-sm">
                        <span className="text-primary/80 truncate">{t.title}</span>
                        {t.price && <span className="text-secondary font-semibold flex-shrink-0 ml-2">{t.price}</span>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-primary/50 text-sm mb-4">Đang cập nhật tour</p>
                )}
                <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:text-secondary transition-colors">
                  Xem tour {market.label}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
