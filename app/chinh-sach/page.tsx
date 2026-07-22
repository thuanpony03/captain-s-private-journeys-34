import type { Metadata } from "next";
import { Check, X as XIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

const TITLE = "Chính Sách Tour Riêng Cho Gia Đình";
const DESCRIPTION =
  "Chính sách tour riêng cho gia đình của Passport Lounge — Vinh Around: giá tour minh bạch, điều kiện đăng ký, chính sách visa, đổi/hủy và tiến độ thanh toán.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/chinh-sach" },
  openGraph: {
    type: "website",
    url: absoluteUrl("/chinh-sach"),
    title: `${TITLE} | Vinh Around`,
    description: DESCRIPTION,
  },
};

const EXPERIENCE_STANDARDS = [
  { label: "Lịch trình", value: "Có điểm biểu tượng nhưng không rập khuôn; ưu tiên cảnh quan, làng cổ, trải nghiệm địa phương, cung đường đẹp và nhịp đi phù hợp gia đình." },
  { label: "Lưu trú", value: "Khách sạn/căn hộ theo tiêu chuẩn và cấu hình phòng ghi trong báo giá; ưu tiên vị trí thuận tiện, an toàn, đánh giá tốt." },
  { label: "Di chuyển", value: "Xe riêng/road trip, tàu, chuyến bay nội địa hoặc taxi theo tuyến. Người lái/HDV và phương án vận hành phải phù hợp quy định sở tại." },
  { label: "Hướng dẫn", value: "HDV/trưởng đoàn/điều phối viên theo phạm vi ghi trong báo giá; hỗ trợ gia đình xử lý lịch trình và dịch vụ đã đặt." },
  { label: "Tham quan", value: "Vé trong lịch trình chính thức được bao gồm; hoạt động tùy chọn chỉ tính khi khách xác nhận." },
  { label: "Bảo hiểm", value: "Bảo hiểm du lịch theo quyền lợi, độ tuổi, điểm đến và thời gian ghi trong chứng nhận bảo hiểm." },
  { label: "Ăn uống", value: "Không bao gồm theo chính sách chung. Nếu gia đình yêu cầu gói ăn, khoản này được ghi rõ bằng văn bản." },
];

const INCLUDED = [
  "Vé máy bay theo hành trình, hạng ghế và hành lý ghi trong báo giá",
  "Chênh lệch vé máy bay theo ngày cao điểm, đã cộng vào giá trọn gói trước khi ký",
  "Phí visa và dịch vụ hồ sơ tiêu chuẩn ghi trong báo giá",
  "Lưu trú, phương tiện di chuyển, hướng dẫn viên/điều phối viên theo phụ lục",
  "Vé tham quan trong lịch trình chính thức",
  "Bảo hiểm du lịch theo chứng nhận được cấp",
];

const EXCLUDED = [
  "Các bữa ăn, trừ khi được bổ sung bằng văn bản trong báo giá",
  "Tiền tip cho hướng dẫn viên, lái xe, nhân viên địa phương",
  "Chi phí cá nhân: mua sắm, minibar, điện thoại, giặt ủi, hành lý vượt mức",
  "Hoạt động tùy chọn, nâng hạng hoặc dịch vụ ngoài lịch trình chuẩn",
  "Chi phí phát sinh do khai báo sai, trễ giờ, vi phạm quy định hoặc tự ý tách đoàn",
];

const REGISTER_TIMING = [
  { type: "Mỹ, Canada, Anh, Schengen, Úc và tuyến visa dài", lead: "90-120 ngày", note: "Có thời gian chuẩn bị hồ sơ, lịch hẹn và vé hợp lý." },
  { type: "Nhật Bản/tuyến thủ tục ngắn hơn", lead: "45-60 ngày", note: "Tùy hồ sơ, mùa và quy định tại thời điểm nộp." },
  { type: "Tết, hè, lễ 30/4-1/5, Giáng Sinh - Năm mới, lễ hội", lead: "120-180 ngày", note: "Vé/phòng khan hiếm; tiền cọc có thể cao hơn." },
  { type: "Đăng ký sát ngày", lead: "Theo khả năng thực tế", note: "Có thể yêu cầu thanh toán cao hơn hoặc hạn chế lựa chọn." },
];

const CANCELLATION = [
  { time: "Từ 60 ngày trở lên", rate: "10% giá trị tour của người hủy" },
  { time: "45-59 ngày", rate: "25% giá trị tour của người hủy" },
  { time: "30-44 ngày", rate: "50% giá trị tour của người hủy" },
  { time: "15-29 ngày", rate: "75% giá trị tour của người hủy" },
  { time: "14 ngày trở xuống hoặc không khởi hành", rate: "100% giá trị tour của người hủy" },
];

const PAYMENT_SCHEDULE = [
  { batch: "Đợt 1", time: "Trong 24 giờ sau khi ký", rate: "50%", purpose: "Giữ/đặt vé, mở hồ sơ visa, cọc phòng và dịch vụ trọng yếu." },
  { batch: "Đợt 2", time: "Khi có visa hoặc chậm nhất 45 ngày trước khởi hành — theo mốc đến trước", rate: "30%", purpose: "Khóa phần lớn dịch vụ và thanh toán nhà cung cấp." },
  { batch: "Đợt 3", time: "Chậm nhất 21 ngày trước khởi hành", rate: "20%", purpose: "Hoàn tất giá trị hợp đồng và phát hành bộ xác nhận cuối." },
];

export default function ChinhSachPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Chính sách", item: absoluteUrl("/chinh-sach") },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Navbar />
      <main className="min-h-screen">
        <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-to-b from-primary/5 via-white to-white">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <p className="text-primary/40 text-xs font-semibold uppercase tracking-widest mb-3">
              Tài liệu tư vấn thống nhất — phiên bản 1.0
            </p>
            <h1 className="font-display text-3xl md:text-5xl font-black text-primary mb-4">
              Chính sách tour riêng cho gia đình
            </h1>
            <p className="text-primary/70 text-base md:text-lg">
              Tour riêng cho gia đình — không ghép khách lạ, ngày đi linh hoạt, lịch trình ưu tiên
              trải nghiệm và được chốt bằng hợp đồng cùng phụ lục dịch vụ. Áp dụng chung cho các
              hành trình nước ngoài của Passport Lounge.
            </p>
          </div>
        </section>

        <section className="container mx-auto max-w-3xl px-6 py-12 md:py-16 space-y-16">
          {/* 1. Phạm vi & chuẩn trải nghiệm */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-4">
              Phạm vi &amp; định nghĩa
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Chính sách áp dụng cho mọi chương trình tour riêng nước ngoài do Passport Lounge tư
              vấn, bán hoặc tổ chức cho gia đình Việt. &ldquo;Gia đình&rdquo; bao gồm người thân,
              bạn bè hoặc nhóm quen biết chủ động đăng ký cùng nhau — không tiếp nhận khách lẻ bên
              ngoài ghép vào nhóm.
            </p>
            <ul className="space-y-2 text-foreground/80 text-sm">
              <li>• <strong>Quy mô chuẩn:</strong> tối thiểu 4 khách để áp dụng mức giá tham khảo công bố. Nhóm 1-3 khách vẫn đi được nhưng tính lại giá theo chi phí thực tế.</li>
              <li>• <strong>Ngày khởi hành:</strong> gia đình đề xuất; được xác nhận theo thời gian xử lý visa, tình trạng vé và dịch vụ.</li>
              <li>• <strong>Điểm bắt đầu/kết thúc:</strong> TP.HCM hoặc Hà Nội theo báo giá; điểm đi khác được tính bổ sung.</li>
            </ul>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary/10">
                    <th className="text-left py-2.5 pr-4 font-display text-primary">Hạng mục</th>
                    <th className="text-left py-2.5 font-display text-primary">Chuẩn áp dụng chung</th>
                  </tr>
                </thead>
                <tbody>
                  {EXPERIENCE_STANDARDS.map((row) => (
                    <tr key={row.label} className="border-b border-primary/5">
                      <td className="py-3 pr-4 font-semibold text-primary/80 align-top whitespace-nowrap">{row.label}</td>
                      <td className="py-3 text-foreground/70 align-top">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Giá tour */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-4">
              Giá tour
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-6">
              Đơn vị tính VND/người. Giá tham khảo công bố (poster/list) lấy gia đình tối thiểu 4
              khách vào ngày thường làm chuẩn — đây chưa phải giá giữ chỗ. Khi gia đình chọn ngày
              cụ thể, Vinh kiểm tra vé và dịch vụ thực tế rồi gửi một mức giá trọn gói cuối cùng —
              đã cộng toàn bộ chênh lệch vé cao điểm nếu có — trước khi ký hợp đồng. Sau khi hợp
              đồng có hiệu lực, Passport Lounge không thu thêm phụ phí vé vì lý do &ldquo;ngày cao
              điểm&rdquo; nếu ngày/chuyến bay đã chốt.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="glass-effect p-6 rounded-2xl border border-primary/10">
                <h3 className="font-display text-lg font-bold text-primary mb-4">Đã bao gồm</h3>
                <ul className="space-y-2.5">
                  {INCLUDED.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-effect p-6 rounded-2xl border border-primary/10">
                <h3 className="font-display text-lg font-bold text-primary mb-4">Chưa bao gồm</h3>
                <ul className="space-y-2.5">
                  {EXCLUDED.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <XIcon className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-foreground/60 text-sm leading-relaxed">
              Báo giá có hiệu lực tối đa 48 giờ hoặc thời hạn ngắn hơn ghi trên báo giá/vé — hết
              hạn phải kiểm tra lại. Giữ chỗ chỉ có hiệu lực khi nhà cung cấp xác nhận; hợp đồng có
              hiệu lực theo điều khoản ký kết và khoản thanh toán đợt 1 đã vào tài khoản chỉ định.
            </p>
          </div>

          {/* 3. Điều kiện đăng ký */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-4">
              Điều kiện đăng ký
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-6">
              Thời gian đăng ký khuyến nghị theo điểm đến — đây là mốc vận hành, không phải cam
              kết thời gian xét visa của cơ quan lãnh sự:
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary/10">
                    <th className="text-left py-2.5 pr-4 font-display text-primary">Loại hành trình</th>
                    <th className="text-left py-2.5 pr-4 font-display text-primary whitespace-nowrap">Nên đăng ký trước</th>
                    <th className="text-left py-2.5 font-display text-primary">Lưu ý</th>
                  </tr>
                </thead>
                <tbody>
                  {REGISTER_TIMING.map((row) => (
                    <tr key={row.type} className="border-b border-primary/5">
                      <td className="py-3 pr-4 text-foreground/80 align-top">{row.type}</td>
                      <td className="py-3 pr-4 font-semibold text-secondary align-top whitespace-nowrap">{row.lead}</td>
                      <td className="py-3 text-foreground/60 align-top">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="font-display text-lg font-bold text-primary mb-3">Chính sách visa</h3>
            <p className="text-foreground/80 leading-relaxed mb-6">
              Passport Lounge tư vấn, kiểm tra và hỗ trợ hoàn thiện hồ sơ; cơ quan lãnh sự quyết
              định cấp, thời hạn, số lần nhập cảnh và có thể yêu cầu bổ sung/phỏng vấn. Không nhân
              sự nào được đảm bảo kết quả visa. Nếu visa bị từ chối, Passport Lounge lập đối soát:
              khấu trừ phí visa, vé và dịch vụ thực tế không hoàn lại; hoàn phần còn lại theo tiến
              độ quyết toán.
            </p>

            <h3 className="font-display text-lg font-bold text-primary mb-3">Thay đổi &amp; hủy tour theo yêu cầu của khách</h3>
            <p className="text-foreground/70 text-sm leading-relaxed mb-4">
              Yêu cầu đổi/hủy cần gửi bằng văn bản từ người đại diện gia đình. Mức khấu trừ chuẩn
              theo thời điểm trước ngày khởi hành:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary/10">
                    <th className="text-left py-2.5 pr-4 font-display text-primary">Thời điểm trước ngày khởi hành</th>
                    <th className="text-left py-2.5 font-display text-primary">Mức khấu trừ chuẩn</th>
                  </tr>
                </thead>
                <tbody>
                  {CANCELLATION.map((row) => (
                    <tr key={row.time} className="border-b border-primary/5">
                      <td className="py-3 pr-4 text-foreground/80">{row.time}</td>
                      <td className="py-3 text-foreground/70">{row.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-foreground/50 text-xs italic mt-3">
              Nếu vé/visa/phòng/vé tham quan đã phát hành hoặc dịch vụ có điều kiện chặt hơn, áp
              dụng chi phí thực tế không hoàn lại được chứng minh; tổng khấu trừ không vượt giá trị
              tour theo hợp đồng của người hủy.
            </p>
          </div>

          {/* 4. Thanh toán */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-4">
              Tiến độ thanh toán
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-6">
              Hợp đồng lữ hành được lập bằng văn bản/điện tử hợp lệ, đính kèm lịch trình, bảng dịch
              vụ, giá, điều kiện hủy đổi và tiến độ thanh toán. Tin nhắn tư vấn không thay thế phụ
              lục — mọi thay đổi sau ký cần được người có thẩm quyền của hai bên xác nhận bằng văn
              bản.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary/10">
                    <th className="text-left py-2.5 pr-4 font-display text-primary">Đợt</th>
                    <th className="text-left py-2.5 pr-4 font-display text-primary">Thời điểm</th>
                    <th className="text-left py-2.5 pr-4 font-display text-primary">Tỷ lệ</th>
                    <th className="text-left py-2.5 font-display text-primary">Mục đích</th>
                  </tr>
                </thead>
                <tbody>
                  {PAYMENT_SCHEDULE.map((row) => (
                    <tr key={row.batch} className="border-b border-primary/5">
                      <td className="py-3 pr-4 font-semibold text-primary/80 align-top whitespace-nowrap">{row.batch}</td>
                      <td className="py-3 pr-4 text-foreground/70 align-top">{row.time}</td>
                      <td className="py-3 pr-4 font-semibold text-secondary align-top whitespace-nowrap">{row.rate}</td>
                      <td className="py-3 text-foreground/60 align-top">{row.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-foreground/50 text-xs italic mt-3">
              Đăng ký sát ngày hoặc mùa cao điểm/dịch vụ không hoàn hủy có thể áp dụng tỷ lệ thanh
              toán cao hơn — luôn được công bố trong báo giá trước khi khách ký.
            </p>
          </div>

          {/* 5. Bảo mật hồ sơ */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-4">
              Bảo mật hồ sơ khách
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Hộ chiếu, hồ sơ visa, thông tin sức khỏe và dữ liệu thành viên chỉ được thu thập cho
              mục đích tư vấn, đặt dịch vụ, xin visa, mua bảo hiểm và thực hiện tour — được chia sẻ
              trong phạm vi cần thiết với cơ quan lãnh sự, hãng vận chuyển, bảo hiểm và nhà cung cấp
              liên quan. Passport Lounge không yêu cầu mật khẩu, OTP, mã CVV hoặc thông tin ngoài
              mục đích chuyến đi.
            </p>
          </div>

          {/* Căn cứ pháp lý */}
          <div className="border-t border-primary/10 pt-10">
            <h2 className="font-display text-xl font-bold text-primary mb-4">Căn cứ tham khảo</h2>
            <ul className="space-y-1.5 text-foreground/60 text-sm">
              <li>Luật Du lịch số 09/2017/QH14 — Điều 37 và Điều 39: hợp đồng lữ hành bằng văn bản, dịch vụ, giá, thanh toán, bất khả kháng, hủy đổi và bảo hiểm.</li>
              <li>Luật Bảo vệ quyền lợi người tiêu dùng số 19/2023/QH15 — nguyên tắc cung cấp thông tin rõ ràng, minh bạch giao dịch.</li>
              <li>Nghị định 55/2024/NĐ-CP — quy định chi tiết thi hành Luật Bảo vệ quyền lợi người tiêu dùng.</li>
              <li>Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15 — hiệu lực từ 01/01/2026.</li>
              <li>Nghị định 356/2025/NĐ-CP — quy định chi tiết một số điều &amp; biện pháp thi hành Luật Bảo vệ dữ liệu cá nhân.</li>
            </ul>
            <p className="text-foreground/40 text-xs mt-6">
              Tài liệu này tóm tắt chính sách vận hành và tư vấn công khai — không thay thế hợp
              đồng lữ hành. Nội dung hợp đồng và phụ lục dịch vụ đã ký là văn bản có giá trị ưu tiên
              khi có khác biệt. Có thắc mắc, nhắn Zalo 0933 344 646 hoặc gọi hotline 1900 63 65 63.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
