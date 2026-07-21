import Link from "next/link";

/**
 * Chương V — một chuyến đi với Vinh diễn ra thế nào. Kể như đang nhắn tin
 * giải thích cho khách, không phải quy trình 5 bước có icon.
 */
export default function ProcessChapter() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-2xl">
        <h2 className="text-primary/40 text-xs font-semibold uppercase tracking-widest mb-3">
          Đi cùng Vinh như thế nào
        </h2>
        <p className="text-primary/80 leading-[1.9] text-[15px] md:text-lg">
          Thường thì bắt đầu bằng một cuộc gọi Zalo, bạn kể nhà mình có ai, thích gì, ngại gì. Mình phác
          lịch trình, sửa tới khi ưng. Visa, vé, khách sạn mình lo. Tới ngày bay, việc của bạn chỉ là
          xách vali. Còn lại — có mình ở ghế lái.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-10">
          <Link href="/tour" className="text-primary text-sm font-medium hover:text-secondary transition-colors">
            xem một lịch trình mẫu →
          </Link>
          <Link href="/tour" className="text-primary text-sm font-medium hover:text-secondary transition-colors">
            các hành trình mình hay chạy →
          </Link>
        </div>
      </div>
    </section>
  );
}
