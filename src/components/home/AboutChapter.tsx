import Image from "next/image";
import { trackZaloClick } from "@/lib/analytics";

/**
 * Chương II — Vinh là ai. Dựng từ chính lời Vinh viết (bài "10 năm làm tour
 * cho gia đình", đã bỏ phần liệt kê checklist/emoji quảng cáo, giữ lại đúng
 * phần suy ngẫm thật). Không bịa kỷ niệm cụ thể chưa xác nhận.
 */
export default function AboutChapter() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Mobile: ảnh trước, chữ sau. Desktop: 2 cột lệch */}
        <div className="md:grid md:grid-cols-[minmax(0,280px)_1fr] md:gap-12 lg:gap-16">
          <div className="relative w-40 h-52 sm:w-48 sm:h-64 md:w-full md:h-80 mx-auto md:mx-0 mb-8 md:mb-0 rounded-sm overflow-hidden">
            <Image
              src="/images/vinh-around-portrait.jpg"
              alt="Vinh"
              fill
              sizes="(max-width: 768px) 200px, 280px"
              className="object-cover grayscale-[15%]"
            />
          </div>

          <div className="max-w-[38rem]">
            <p className="text-primary/90 leading-[1.9] text-[15px] md:text-base mb-6">
              10 năm làm tour cho gia đình, điều mình hiểu rõ nhất là: một chuyến đi đẹp không nằm ở
              việc đi được bao nhiêu điểm, mà là cả nhà có thật sự thoải mái với nhau suốt hành trình
              hay không.
            </p>
            <p className="text-primary/70 leading-[1.9] text-[15px] md:text-base mb-8">
              Có những gia đình đi cùng con nhỏ, có những nhà đi cùng ông bà, có nhà lại muốn kết hợp
              vừa nghỉ dưỡng vừa khám phá. Mỗi gia đình có một nhịp khác nhau, nên càng làm lâu mình
              càng tin rằng tour gia đình không thể làm theo kiểu "đóng khung".
            </p>

            <blockquote className="font-display text-2xl md:text-3xl text-primary leading-snug my-10 md:my-12 border-l-2 border-secondary/40 pl-5 md:pl-6">
              Tôi lái xe để bạn rảnh tay ngắm cảnh.
              <br />
              Tôi chọn quán để bạn ấm bụng như ở nhà.
            </blockquote>

            <p className="text-primary/70 leading-[1.9] text-[15px] md:text-base mb-4">
              Sau 10 năm, mình càng thấy khách gia đình không cần một chuyến đi quá hào nhoáng. Thứ họ
              cần là sự an tâm, riêng tư, và cảm giác được chăm đúng nhu cầu — từ Mỹ, Canada, Úc cho tới
              châu Âu, mỗi cung đường đều điều chỉnh được theo số lượng thành viên, độ tuổi và nhịp của
              từng nhà.
            </p>
            <p className="font-display text-lg text-primary/90 italic mb-6">
              — Vinh
            </p>
            <a
              href="https://zalo.me/0933344646"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackZaloClick()}
              className="inline-block text-secondary text-sm font-medium hover:underline"
            >
              kể mình nghe nhà bạn thế nào →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
