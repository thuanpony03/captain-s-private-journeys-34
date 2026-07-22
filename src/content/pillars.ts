/**
 * Nội dung dài (pillar content) cho 3 trang thị trường /tour/my, /tour/chau-au, /tour/canada.
 * Render qua PillarContent (marked -> HTML) trong MarketLandingPage.
 * H1 không lặp lại tiêu đề hero — nội dung bắt đầu từ H2.
 */

export const PILLAR_MY = `
## Vì sao đi Mỹ nên đi tour riêng?

Nước Mỹ rộng gấp 30 lần Việt Nam. Đi tour ghép đoàn, bạn sẽ quen cảnh 5h sáng ra xe, mỗi điểm dừng 45 phút chụp ảnh rồi chạy, chiều ghé outlet cho đủ chỉ tiêu. Đi tự túc thì tự lo visa, tự lái xe cao tốc nhiều làn, tự xoay xở khi ông bà mệt giữa đường.

Tour riêng nằm giữa hai thứ đó: tự do như tự túc, an tâm như có người nhà bản địa. Vinh lái, Vinh đặt phòng, Vinh biết quán ăn nào ở Las Vegas mở tới khuya — việc của cả nhà là ngồi ghế sau ngắm cảnh.

## Lịch trình mẫu 12 ngày Đông — Tây

Đây là khung chạy nhiều nhất, tùy chỉnh được từ 7 tới 16 ngày:

| Ngày | Chặng | Điểm nhấn |
|---|---|---|
| 1-3 | New York | Times Square, tượng Nữ thần Tự do, Central Park |
| 4-5 | Washington D.C. | Nhà Trắng, Điện Capitol, bảo tàng Smithsonian (miễn phí, hợp trẻ em) |
| 6-8 | Las Vegas & Grand Canyon | Bay nội địa sang Vegas, một ngày trọn Grand Canyon bằng xe riêng |
| 9-12 | California | Los Angeles, Hollywood, Santa Monica, San Diego hoặc Universal tùy nhà có trẻ nhỏ |

Nhà muốn thêm San Francisco, thăm người thân ở Texas, hay bớt Vegas vì có ông bà — đều xếp lại được theo đúng nhịp gia đình bạn.

## Giá tour Mỹ gia đình

Giá phụ thuộc số ngày, số khách và mùa đi — xem bảng tour cụ thể ngay bên dưới hoặc nhắn Zalo để Vinh báo giá trọn gói chính xác cho nhà bạn. Không phụ phí ẩn, không shopping stop — báo giá sao đi đúng vậy.

## Visa Mỹ — phần Vinh hỗ trợ kỹ nhất

Visa Mỹ phải phỏng vấn trực tiếp, và không ai "bao đậu" được — ai hứa vậy bạn nên cẩn thận. Vinh làm phần việc thực chất hơn:

- Rà hồ sơ từng người: tài chính, công việc, ràng buộc tại Việt Nam — chỗ nào yếu, bổ sung trước khi nộp.
- Luyện phỏng vấn theo bộ câu hỏi lãnh sự hay hỏi thật, rút từ hàng chục gia đình đã đi cùng Vinh.
- Cập nhật quy định mới: lệ phí hiện 185 USD/người; luật mới của Mỹ thu thêm phí Visa Integrity Fee 250 USD trong năm 2026 — nên chuẩn bị ngân sách visa ~435 USD/người cho chắc.

Chi tiết xem bài: [Kinh nghiệm phỏng vấn visa Mỹ 2026](/cam-nang/kinh-nghiem-phong-van-visa-my-2026).

## Nhà có ông bà, có bé nhỏ — đọc phần này

Đoàn ba thế hệ là "đặc sản" của Vinh. Vài thứ Vinh luôn làm mà tour đoàn không làm được:

- Lịch mỗi ngày xếp theo sức người yếu nhất đoàn: 1-2 điểm chính, không nhồi.
- Chặng lái dài nhất không quá 4 tiếng, cứ 1,5-2 tiếng dừng nghỉ một lần.
- Khách sạn có thang máy, phòng gần nhau; quán ăn có món nóng cho ông bà.
- Ghế em bé chuẩn Mỹ gắn sẵn trên xe nếu nhà có bé dưới 4 tuổi.

Đọc thêm: [Đưa ông bà đi Mỹ, Châu Âu — 9 điều phải chuẩn bị](/cam-nang/di-my-chau-au-voi-ong-ba).

## Đi Mỹ kết hợp thăm thân

Nhiều đoàn của Vinh có lý do riêng: thăm con du học, dự lễ tốt nghiệp, thăm anh chị em định cư. Lịch trình xếp quanh việc chính của nhà bạn — ghé nhà người thân vài hôm rồi đi chơi tiếp, hoặc đón cả người thân bên đó nhập đoàn đi cùng.

## Câu chuyện thật

Vài chuyến Mỹ gần đây Vinh đã dẫn: [chuyến đi mùa đông của gia đình chị Lan Ka](/chuyen-di/gia-dinh-chi-lan-ka-mua-dong-o-my), [chuyến đi bờ Tây của một gia đình](/chuyen-di/my-bo-tay-chuyen-di-gia-dinh), [New York — Philadelphia — Washington D.C.](/chuyen-di/ny-philadelphia-washington-dc).
`.trim();

export const PILLAR_CHAU_AU = `
## Vì sao xe riêng thắng tuyệt đối ở Châu Âu

Châu Âu là nơi "nhiều nước một chuyến" khiến tour đoàn nổi tiếng mệt — mỗi đêm một khách sạn, 5h sáng kéo vali. Tour riêng giữ cái hay và bỏ cái mệt đó:

- Làng đẹp nhất Châu Âu thường không có ga tàu: Cinque Terre, các làng vùng Provence — xe riêng ghé được hết.
- Vali và trẻ con: đổi 4-5 khách sạn bằng tàu với nhiều vali và xe đẩy em bé là cực hình; xe riêng thì vali cứ nằm yên trên xe.
- Nhịp của ông bà: mệt là dừng, đói là ghé quán địa phương — không phụ thuộc giờ tàu nào cả.

## Hành trình mẫu 12 ngày: Paris → Thụy Sĩ → Ý

| Ngày | Chặng | Điểm nhấn |
|---|---|---|
| 1-3 | Paris, Pháp | Eiffel, Louvre, du thuyền sông Seine, Versailles hoặc Disneyland nếu có trẻ nhỏ |
| 4-5 | Thụy Sĩ | Lucerne, núi tuyết Titlis hoặc Interlaken — chặng cả nhà nào cũng ấn tượng nhất |
| 6-7 | Milan – Venice, Ý | Duomo Milan, kênh đào Venice |
| 8-9 | Florence – Cinque Terre | Làng biển Cinque Terre |
| 10-12 | Rome – Vatican | Đấu trường La Mã, Vatican, ném xu đài phun nước Trevi |

Khung này co giãn được: thêm Hà Lan – Bỉ (xem [kinh nghiệm lái xe Amsterdam – Brussels](/cam-nang/kinh-nghiem-lai-xe-amsterdam-brussels)), thêm Tây Ban Nha (xem [Madrid — muốn quay lại ngay khi vừa rời đi](/chuyen-di/madrid-muon-quay-lai-ngay)), hoặc rút còn 9-10 ngày.

## Giá tour

Giá phụ thuộc số nước, số ngày và mùa đi — xem bảng tour bên dưới hoặc nhắn Zalo để Vinh báo giá trọn gói theo đúng lịch trình nhà bạn chọn. Trọn gói gồm khách sạn, xe riêng suốt hành trình, các bữa theo lịch, vé tham quan chính, hỗ trợ hồ sơ visa Schengen — không shopping stop, không phụ phí ẩn.

## Visa Schengen — một visa, 29 nước

- Nộp vào nước ở lâu nhất trong lịch trình; visa có hiệu lực cả khối Schengen.
- Lệ phí: 90 euro người lớn, 45 euro trẻ 6-11 tuổi, dưới 6 tuổi miễn — cộng phí trung tâm tiếp nhận (VFS/TLS) khoảng 16-24 euro.
- Hồ sơ cần booking vé, khách sạn, lịch trình chi tiết và bảo hiểm du lịch — toàn bộ phần này Vinh chuẩn bị cho cả nhà.
- Trẻ em cần giấy khai sinh, và giấy đồng ý cha mẹ nếu thiếu một trong hai người đi cùng.

## Đi mùa nào đẹp?

- **Tháng 4-6 & 9-10:** đẹp nhất — mát, ít khách hơn hè, hoa nở hoặc lá vàng. Hợp ông bà.
- **Tháng 7-8:** hè sôi động, mọi thứ mở cửa, nhưng đông và nóng — hợp nhà có trẻ em nghỉ hè.
- **Tháng 12:** chợ Giáng sinh — xem [hành trình Bắc Âu của gia đình chị T.](/chuyen-di/bac-au-family-trip-chi-t).

## Câu chuyện thật

Vài chuyến Châu Âu Vinh đã dẫn hoặc trực tiếp trải nghiệm: [Cinque Terre — đi rồi mới hiểu vì sao ai cũng mê](/chuyen-di/cinque-terre-y), [6 ngày road trip miền Nam nước Pháp](/chuyen-di/phap-road-trip-mien-nam), [Một ngày rất đẹp ở Marseille](/chuyen-di/marseille-mot-ngay-dep).
`.trim();

export const PILLAR_CANADA = `
## Hai hành trình hay chạy nhất

### 1. Rocky Mountains 8-9 ngày (Vancouver – Calgary – Banff)

Canada cũng là điểm Vinh hay rủ các nhà "đi kèm" khi làm chuyến Mỹ — từ New York lái vài tiếng là chạm Niagara phía Canada, nơi nhìn thác đẹp hơn hẳn bờ Mỹ. Nhưng Canada cũng đáng một chuyến riêng: Rocky Mountains là cung đường Vinh từng tự lái cho gia đình mình và vẫn nhớ mãi.

| Ngày | Chặng | Điểm nhấn |
|---|---|---|
| 1-2 | Vancouver | Stanley Park, Gastown, chợ Granville Island |
| 3 | Calgary → Banff | Cung đường Calgary–Banff: núi tuyết, rừng thông, mây thấp ngang lưng núi |
| 4-6 | Banff & Lake Louise | Hồ Louise xanh ngọc, Bow River, cáp treo Banff Gondola lên Sulphur Mountain |
| 7-8 | Calgary | Quay lại Calgary, bay về |

### 2. Mỹ + Canada một chuyến 12-14 ngày

New York → Niagara (ngủ đêm phía Canada, ngắm thác lên đèn) → Toronto → bay về hoặc nối tiếp bờ Tây Mỹ. Cần cả visa Mỹ và Canada — Vinh xếp lịch xin hai visa song song.

## Giá tour

Giá phụ thuộc số ngày và mùa đi — nhắn Zalo để Vinh báo giá trọn gói theo đúng nhu cầu nhà bạn.

## Visa Canada

- Không phỏng vấn — nộp hồ sơ online kèm sinh trắc học tại VFS.
- Thời gian xét thường lâu hơn visa Mỹ, nên cần bắt đầu sớm trước chuyến đi vài tháng.
- Đã có visa Mỹ còn hạn? Hồ sơ Canada thường thuận lợi hơn đáng kể — và ngược lại.
- Visa thường cấp theo hạn hộ chiếu (tối đa 10 năm) — xin một lần, đi lại nhiều lần.

## Mùa nào đi Canada đẹp nhất?

- **Cuối tháng 9 – giữa tháng 10:** mùa lá vàng — đẹp nhất năm, đặt trước 4-6 tháng vì khách sạn Banff cháy phòng.
- **Tháng 6-8:** hồ tan băng xanh ngọc đúng màu bưu thiếp, thời tiết dễ nhất cho ông bà và trẻ nhỏ.
- **Tháng 12-2:** tuyết trắng, thác Niagara đóng băng — lạnh sâu, hợp nhà thích trải nghiệm khác biệt.

## Câu chuyện thật

Đây là cung đường Vinh đã tự đi và tiếp tục dẫn khách: [Hành trình 5N4Đ khám phá Banff cùng gia đình](/chuyen-di/banff-5n4d-cung-gia-dinh), [15 ngày xuyên ngang Canada](/chuyen-di/canada-15-ngay-xuyen-ngang), [Canada tháng 08/2024 — chuyến đi rất khác](/chuyen-di/canada-thang-8-2024).
`.trim();
