import Image from "next/image";
import Link from "next/link";
import { trackZaloClick } from "@/lib/analytics";

interface Companion {
  image: string;
  caption: string;
  href: string;
  size: "sm" | "md" | "lg";
}

/**
 * Chương IV — "Những người đồng hành". Thay hoàn toàn wall testimonial giả.
 * Caption lấy nguyên từ bài "Chuyến đi" thật đã đăng (chị Lan Ka, chị T.,
 * đoàn Morocco) — không phải quote bịa trong khung 5 sao.
 */
const COMPANIONS: Companion[] = [
  {
    image:
      "https://res.cloudinary.com/dvu2csvsg/image/upload/w_800,q_auto,f_auto/v1784657497/vinharound/chuyen-di/gia-dinh-chi-lan-ka-mua-dong-o-my/gia-dinh-chi-lan-ka-mua-dong-o-my-1.jpg",
    caption:
      "Cả nhà chị Lan Ka trước thác Niagara đóng băng. 'Đây là tấm hình gia đình đẹp nhất từ trước tới giờ' — chị nói vậy.",
    href: "/chuyen-di/gia-dinh-chi-lan-ka-mua-dong-o-my",
    size: "lg",
  },
  {
    image:
      "https://res.cloudinary.com/dvu2csvsg/image/upload/w_800,q_auto,f_auto/v1784657519/vinharound/chuyen-di/bac-au-family-trip-chi-t/bac-au-family-trip-chi-t-1.jpg",
    caption: "Gia đình chị T. trước nhà thờ Helsinki, Phần Lan — mùa Giáng Sinh, không chạy lịch, không đông đúc.",
    href: "/chuyen-di/bac-au-family-trip-chi-t",
    size: "md",
  },
  {
    image:
      "https://res.cloudinary.com/dvu2csvsg/image/upload/w_800,q_auto,f_auto/v1784657419/vinharound/chuyen-di/morocco-gia-dinh-6-khach/morocco-gia-dinh-6-khach-1.jpg",
    caption: "Đoàn gia đình 6 khách, Morocco — Casablanca tới những đêm giữa sa mạc.",
    href: "/chuyen-di/morocco-gia-dinh-6-khach",
    size: "sm",
  },
  {
    image:
      "https://res.cloudinary.com/dvu2csvsg/image/upload/w_800,q_auto,f_auto/v1784657517/vinharound/chuyen-di/gia-dinh-chi-lan-ka-mua-dong-o-my/gia-dinh-chi-lan-ka-mua-dong-o-my-8.jpg",
    caption: "'Thác nước đang đóng băng kìa mẹ' — hơi nước bốc lên mờ cả skyline phía xa thác Niagara.",
    href: "/chuyen-di/gia-dinh-chi-lan-ka-mua-dong-o-my",
    size: "sm",
  },
  {
    image:
      "https://res.cloudinary.com/dvu2csvsg/image/upload/w_800,q_auto,f_auto/v1784657538/vinharound/chuyen-di/bac-au-family-trip-chi-t/bac-au-family-trip-chi-t-8.jpg",
    caption: "Stockholm, ga Centralstation — cả nhà tụ đủ trước giờ lên tàu.",
    href: "/chuyen-di/bac-au-family-trip-chi-t",
    size: "md",
  },
  {
    image:
      "https://res.cloudinary.com/dvu2csvsg/image/upload/w_800,q_auto,f_auto/v1784657424/vinharound/chuyen-di/morocco-gia-dinh-6-khach/morocco-gia-dinh-6-khach-2.jpg",
    caption: "Casablanca — điểm đầu tiên gây ấn tượng mạnh với cả đoàn.",
    href: "/chuyen-di/morocco-gia-dinh-6-khach",
    size: "sm",
  },
];

const SIZE_CLASSES: Record<Companion["size"], string> = {
  sm: "aspect-square",
  md: "aspect-[4/5]",
  lg: "aspect-[3/4]",
};

export default function CompanionsChapter() {
  return (
    <section className="bg-[#faf7f0] py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-primary/40 text-xs font-semibold uppercase tracking-widest mb-3">
          Những người đồng hành
        </h2>
        <p className="text-primary/50 text-sm mb-10 md:mb-14 max-w-md">
          Vài gia đình đã đi cùng mình. Ảnh nào cũng trả lời được: chụp ở đâu, chuyến nào.
        </p>

        {/* Mobile: cột đơn xen kẽ kích thước. Desktop: masonry lệch qua columns */}
        <div className="columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {COMPANIONS.map((c, i) => (
            <Link
              key={i}
              href={c.href}
              className={`group block break-inside-avoid relative ${SIZE_CLASSES[c.size]} ${
                i % 3 === 1 ? "md:mt-8" : ""
              }`}
            >
              <div className={`relative w-full ${SIZE_CLASSES[c.size]} overflow-hidden`}>
                <Image
                  src={c.image}
                  alt={c.caption}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <p className="text-primary/60 text-xs italic leading-snug mt-2 pr-1">{c.caption}</p>
            </Link>
          ))}
        </div>

        <p className="text-primary/50 text-sm mt-10 md:mt-14">
          Gia đình bạn sẽ là chuyến tiếp theo?{" "}
          <a
            href="https://zalo.me/0933344646"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackZaloClick()}
            className="text-secondary font-medium hover:underline"
          >
            Nhắn Zalo cho mình →
          </a>
        </p>
      </div>
    </section>
  );
}
