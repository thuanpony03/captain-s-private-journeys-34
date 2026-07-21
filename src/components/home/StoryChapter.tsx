import Link from "next/link";
import Image from "next/image";

const MADRID_IMG =
  "https://res.cloudinary.com/dvu2csvsg/image/upload/v1784657683/vinharound/chuyen-di/madrid-muon-quay-lai-ngay/madrid-muon-quay-lai-ngay-1.jpg";
const CINQUE_TERRE_IMG =
  "https://res.cloudinary.com/dvu2csvsg/image/upload/v1784657626/vinharound/chuyen-di/cinque-terre-y/cinque-terre-y-1.jpg";
const DOHA_IMG_1 =
  "https://res.cloudinary.com/dvu2csvsg/image/upload/v1784657599/vinharound/chuyen-di/mot-ngay-o-doha-qatar/mot-ngay-o-doha-qatar-1.jpg";
const DOHA_IMG_2 =
  "https://res.cloudinary.com/dvu2csvsg/image/upload/v1784657602/vinharound/chuyen-di/mot-ngay-o-doha-qatar/mot-ngay-o-doha-qatar-2.jpg";

/**
 * Ba mẩu chuyện thật, cố ý ba layout khác nhau — không lặp bố cục giữa các
 * mẩu (brief v2, nguyên tắc 5). Trích từ bài "Chuyến đi" đã đăng, không viết
 * lại/bịa thêm — dẫn link "đọc tiếp" về bài gốc.
 */
export default function StoryChapter() {
  return (
    <section className="bg-[#faf7f0] py-20 md:py-28">
      {/* Mẩu 1 — Madrid: ảnh full-bleed, caption nghiêng, chữ bên dưới */}
      <div className="mb-24 md:mb-32">
        <div className="relative w-full h-[55vh] md:h-[70vh]">
          <Image
            src={MADRID_IMG}
            alt="Madrid, chuyến Tây Ban Nha"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <p className="text-center text-primary/50 text-xs md:text-sm italic mt-3 mb-10 px-4">
          Puerta del Sol, Km 0 — chuyến Tây Ban Nha
        </p>
        <div className="max-w-[38rem] mx-auto px-6">
          <p className="font-display text-xl md:text-2xl text-primary leading-relaxed mb-2">
            Có những thành phố khiến mình muốn quay lại ngay khi vừa rời đi, và Madrid là một nơi như vậy.
          </p>
          <p className="text-primary/70 leading-relaxed">
            Chuyến đi này bắt đầu khá nhẹ nhàng, kiểu không quá kỳ vọng gì nhiều. Nhưng ngay từ lúc đặt
            chân đến Puerta del Sol, đứng ngay cột mốc Km 0 — nơi được xem là "trái tim" của Tây Ban Nha,
            mình đã có cảm giác rất lạ… giống như đang đứng ở điểm bắt đầu của mọi hành trình.
          </p>
          <Link
            href="/chuyen-di/madrid-muon-quay-lai-ngay"
            className="inline-block mt-4 text-secondary text-sm font-medium hover:underline"
          >
            đọc tiếp →
          </Link>
          <p className="text-primary/40 text-xs mt-6">
            — cung đường này nằm trong hành trình Châu Âu của mình →{" "}
            <Link href="/tour/chau-au" className="underline hover:text-primary/70">
              xem tour
            </Link>
          </p>
        </div>
      </div>

      {/* Mẩu 2 — Cinque Terre: chữ trái, ảnh tràn phải (đảo nhịp so với mẩu 1) */}
      <div className="mb-24 md:mb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-8 md:gap-0">
          <div className="px-6 md:pl-6 md:pr-12 order-2 md:order-1">
            <p className="font-display text-xl md:text-2xl text-primary leading-relaxed mb-2">
              Cinque Terre là kiểu nơi mà chỉ cần đi ngang qua ảnh thôi cũng đủ muốn xách vali lên đường.
            </p>
            <p className="text-primary/70 leading-relaxed">
              Thực tế thì đẹp hơn trong tưởng tượng. Khu này gồm 5 làng ven biển, di chuyển qua lại rất
              tiện bằng Cinque Terre Express — chỉ cần chọn một điểm làm base rồi đi từng làng trong ngày
              là ổn.
            </p>
            <Link
              href="/chuyen-di/cinque-terre-y"
              className="inline-block mt-4 text-secondary text-sm font-medium hover:underline"
            >
              đọc tiếp →
            </Link>
            <p className="text-primary/40 text-xs mt-6">
              — nằm trong hành trình Ý của mình →{" "}
              <Link href="/tour/chau-au" className="underline hover:text-primary/70">
                xem tour
              </Link>
            </p>
          </div>
          <div className="relative h-[45vh] md:h-[60vh] order-1 md:order-2 md:justify-self-end md:w-[110%]">
            <Image
              src={CINQUE_TERRE_IMG}
              alt="Cinque Terre, Ý"
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Mẩu 3 — Doha: khối ghi chú nhỏ, lệch nhẹ, như trang nhật ký kẹp giữa */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 -rotate-1 border border-primary/5">
          <p className="text-primary/40 text-xs italic mb-3">Doha, Qatar — 2017</p>
          <p className="text-primary/80 leading-relaxed mb-4">
            Mấy hôm nay lướt tin tức thấy Trung Đông căng thẳng, tự nhiên mình nhớ lại mấy tấm hình chụp
            ở Doha năm 2017… Mình lần đầu transit qua Doha và thật sự bất ngờ vì một thành phố sa mạc lại
            hiện đại, dễ đi và rất "thân thiện" với khách du lịch như vậy.
          </p>
          <div className="flex gap-3 mb-4">
            <div className="relative w-24 h-24 md:w-28 md:h-28 rotate-2 shadow-sm flex-shrink-0">
              <Image src={DOHA_IMG_1} alt="Doha" fill sizes="112px" className="object-cover" />
            </div>
            <div className="relative w-24 h-24 md:w-28 md:h-28 -rotate-3 shadow-sm flex-shrink-0 mt-3">
              <Image src={DOHA_IMG_2} alt="Doha" fill sizes="112px" className="object-cover" />
            </div>
          </div>
          <Link
            href="/chuyen-di/mot-ngay-o-doha-qatar"
            className="text-secondary text-sm font-medium hover:underline"
          >
            đọc tiếp →
          </Link>
        </div>
      </div>
    </section>
  );
}
