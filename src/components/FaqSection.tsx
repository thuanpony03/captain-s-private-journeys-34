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
      "Xe riêng, khách sạn, hầu hết bữa ăn theo lịch trình, và Vinh dẫn đoàn xuyên suốt. Vé máy bay quốc tế và một số bữa tự do thường không bao gồm — chi tiết cụ thể theo từng tour.",
  },
  {
    question: "Đặt cọc bao nhiêu, khi nào?",
    answer:
      "Thường đặt cọc một phần để giữ lịch, phần còn lại thanh toán trước ngày khởi hành. Vinh sẽ trao đổi cụ thể khi tư vấn theo tour bạn chọn.",
  },
  {
    question: "Đi cùng trẻ nhỏ hoặc người lớn tuổi có ổn không?",
    answer:
      "Rất ổn — đây là thế mạnh của private tour. Lịch trình linh hoạt theo sức khỏe cả đoàn, xe riêng nghỉ dừng khi cần, không chạy đua điểm đến như tour đoàn.",
  },
  {
    question: "Lỡ có việc phải huỷ thì sao?",
    answer:
      "Chính sách huỷ/đổi lịch cụ thể tùy thời điểm và tour — nhắn Zalo cho Vinh để được tư vấn trước khi đặt, tránh phát sinh không mong muốn.",
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
    <section className="py-16 md:py-24 bg-white">
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
