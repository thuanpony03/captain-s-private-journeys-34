import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { MarketCardData } from "@/components/MarketCards";

const HOOKS: Record<string, string> = {
  my: "Visa, xe riêng, lịch trình tuỳ chỉnh — tour gia đình đi Mỹ trọn gói",
  uc: "Gần, dễ, không mệt — tour gia đình đi Úc cùng Great Ocean Road",
  "chau-au": "Nhiều nước trong một chuyến — tour gia đình Châu Âu riêng tư",
};

/**
 * Chương mới (V.5) — "Những cung đường". Thay thế MarketCards kiểu card-grid
 * cũ (đã tháo khỏi HomePage khi viết lại theo brief v2) bằng một danh sách
 * kiểu mục lục tạp chí: số thứ tự, tên điểm đến, ảnh chỉ lộ ra khi hover.
 * Đây là nơi trang chủ trả lời rõ "bán tour gì" cho SEO + điều hướng, mà
 * không quay lại kiểu lưới thẻ khiên bị chê là template.
 */
export default function RoutesChapter({ markets }: { markets: MarketCardData[] }) {
  if (markets.length === 0) return null;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-4xl">
        <p className="text-primary/40 text-xs font-semibold uppercase tracking-widest mb-3">
          Những cung đường
        </p>
        <h2 className="font-display text-2xl md:text-3xl text-primary font-medium mb-10 md:mb-14 max-w-lg">
          Ba thị trường Vinh chạy nhiều nhất — mỗi nơi một kiểu tuỳ chỉnh riêng
        </h2>

        <div className="border-t border-primary/10">
          {markets.map((market, i) => {
            const cheapest = market.tours.find((t) => t.price);
            return (
              <Link
                key={market.href}
                href={market.href}
                className="group relative flex items-center justify-between gap-4 md:gap-8 py-6 md:py-8 border-b border-primary/10 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -mx-6 md:-mx-10">
                  <Image
                    src={market.image}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/75" />
                </div>

                <div className="relative z-10 flex items-center gap-4 md:gap-8 min-w-0">
                  <span className="hidden sm:block font-display text-sm text-primary/25 group-hover:text-white/50 transition-colors flex-shrink-0">
                    0{i + 1}
                  </span>
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 sm:hidden">
                    <Image src={market.image} alt="" fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl md:text-4xl font-bold text-primary group-hover:text-white transition-colors">
                      {market.label}
                    </h3>
                    <p className="text-primary/50 group-hover:text-white/75 text-xs md:text-sm mt-1 transition-colors truncate">
                      {HOOKS[market.href.split("/").pop() ?? ""] ?? ""}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-3 flex-shrink-0">
                  {cheapest?.price && (
                    <span className="text-primary/60 group-hover:text-white/90 text-sm font-medium hidden sm:block transition-colors">
                      {cheapest.price}
                    </span>
                  )}
                  <ArrowRight className="w-5 h-5 text-primary/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
