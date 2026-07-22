"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "Visa có khó xin không?",
    answer:
      "Tùy thị trường — Mỹ khó nhất, Úc và Châu Âu dễ hơn. Vinh hỗ trợ tư vấn hồ sơ và chia sẻ kinh nghiệm phỏng vấn khi bạn đăng ký tour, không đảm bảo đậu 100% nhưng đồng hành từ đầu đến cuối.",
  },
  {
    question: "Giá tour bao gồm những gì?",
    answer:
      "Giá trọn gói gồm vé máy bay theo hành trình, khách sạn, xe riêng suốt hành trình, vé tham quan trong lịch trình chính thức, phí visa và bảo hiểm du lịch. Các bữa ăn, tiền tip và chi phí cá nhân không bao gồm trừ khi được ghi rõ bằng văn bản trong báo giá. Không có phụ phí ẩn, không shopping stop ăn hoa hồng — báo giá sao, đi đúng vậy.",
  },
  {
    question: "Đặt cọc bao nhiêu, khi nào?",
    answer:
      "Thanh toán chia 3 đợt: đợt 1 (50%) trong 24 giờ sau khi ký hợp đồng để giữ vé và mở hồ sơ visa; đợt 2 (30%) khi có visa hoặc chậm nhất 45 ngày trước khởi hành; đợt 3 (20%) chậm nhất 21 ngày trước khởi hành. Sau khi chốt lịch trình, Vinh gửi hợp đồng rõ ràng từng khoản trước khi bạn chuyển bất kỳ đồng nào — chi tiết đầy đủ xem tại trang Chính sách.",
  },
  {
    question: "Đi cùng trẻ nhỏ hoặc người lớn tuổi có ổn không?",
    answer:
      "Đây chính là kiểu đoàn Vinh nhận nhiều nhất. Xe riêng nên muốn dừng nghỉ lúc nào cũng được, lịch mỗi ngày xếp theo sức của người yếu nhất đoàn chứ không theo người khỏe nhất. Nhà có ông bà trên 70 tuổi hay bé dưới 2 tuổi, cứ nói trước để Vinh xếp khách sạn có thang máy, quán ăn có ghế em bé, và chặng lái ngắn lại.",
  },
  {
    question: "Lỡ có việc phải huỷ thì sao?",
    answer:
      "Mức khấu trừ chuẩn tính theo thời điểm trước ngày khởi hành: từ 60 ngày trở lên 10%, 45-59 ngày 25%, 30-44 ngày 50%, 15-29 ngày 75%, dưới 15 ngày hoặc không khởi hành 100% giá trị tour của người hủy. Mọi điều khoản nằm trong hợp đồng ký trước chuyến, Vinh giải thích từng dòng trước khi bạn đặt cọc — xem đầy đủ tại trang Chính sách.",
  },
];

export default function FaqSection() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white scroll-mt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-primary text-center mb-10 md:mb-12">
          Câu hỏi thường gặp
        </h2>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto space-y-3">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border border-primary/10 px-5 bg-[#faf9f7]"
            >
              <AccordionTrigger className="hover:no-underline text-left font-semibold text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-primary/70 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
