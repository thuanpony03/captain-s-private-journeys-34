# BRIEF NÂNG CẤP VINHAROUND.COM

*Brief cho Claude Code · 21/07/2026 · dựa trên audit codebase thật (nhánh `main`, Next.js 16)*

Mục tiêu kinh doanh: **bán private tour cho gia đình Việt khá giả đi Mỹ / Úc / Châu Âu.** Mọi quyết định trong brief này quy về một câu hỏi: *nó có làm một người mẹ/người bố 35–55 tuổi tin và nhắn Zalo không?*

---

# PHẦN 0 — HIỆN TRẠNG (đọc trước khi code)

## Đã có và đang chạy

- Next.js 16 App Router, deploy Cloudflare Workers, SSR + ISR. Meta tag server-side đã đúng.
- Route: `/`, `/tour/[slug]`, `/admin`, `/auth`. Sitemap + robots động.
- Supabase: bảng `tour_packages`, `lead_submissions`, `blog_posts` (CHƯA DÙNG), `testimonials` (CHƯA DÙNG), `galleries`, `website_settings`.
- Form lead đa bước tốt sẵn: chọn điểm đến → cỡ nhóm (2-4/4-6/6+) → ưu tiên (sức khỏe/trải nghiệm/sang trọng) → SĐT. Đây là nền tảng quý, giữ và tối ưu chứ đừng đập.
- GA4 + Meta Pixel + hàm track event đầy đủ trong `src/lib/analytics.ts`.
- **Tài sản quý nhất:** ~35 ảnh gia đình khách thật trên Cloudinary (trong `SocialProof.tsx`). Đây là thứ đối thủ không copy được.

## Vấn đề phải sửa (phát hiện từ code)

| # | Vấn đề | File | Mức |
|---|---|---|---|
| 1 | Video vlog thứ 4 là **placeholder Rick Astley** (`dQw4w9WgXcQ`) | `VinhVlogs.tsx:60` | 🔴 xấu hổ nếu khách bấm |
| 2 | Số điện thoại vẫn chưa có ở đâu — schema đã gỡ placeholder nhưng chưa điền số thật | toàn site | 🔴 mất lead trực tiếp |
| 3 | Ảnh gia đình chỉ có tên chung chung ("Gia đình Mai"), **không có quote, không câu chuyện** — social proof mới đạt 30% sức mạnh | `SocialProof.tsx` | 🟠 |
| 4 | Tour chỉ có `title, route, duration, price, stops[]` — trang tour quá mỏng để SEO và để chốt khách vé $5–10k | schema `tour_packages` | 🟠 |
| 5 | Bảng `blog_posts` và `testimonials` có schema sẵn nhưng **không có UI nào dùng** | — | 🟠 cơ hội bỏ phí |
| 6 | Toàn bộ nội dung dồn vào 1 trang chủ dài — không có trang đích riêng cho từng thị trường để chạy ads | — | 🟠 |
| 7 | Ảnh dùng `<img>` thường, chưa qua `next/image` (trừ trang tour) | nhiều component | 🟡 |

---

# PHẦN 1 — ĐỊNH VỊ & KHÁCH HÀNG

## Chân dung khách

**Người quyết định:** phụ nữ 35–55, chủ gia đình hoặc vợ chủ doanh nghiệp, HCM/HN, ngân sách 150–500 triệu/chuyến cho 4–8 người. Nghiên cứu trên Facebook/TikTok/YouTube, **chốt qua Zalo**, không đặt online — cần nói chuyện với người thật trước khi chuyển tiền lớn.

**Nỗi lo thật sự** (thứ tự quan trọng): ① visa có đậu không, ② đi với người già + trẻ nhỏ có mệt không, ③ có bị nhồi shopping stop như tour đoàn không, ④ tiền lớn thế giao cho ai — có uy tín không.

Điểm ③ có số liệu backing: ~60% khách Việt hiện đại nói rõ họ muốn tour nhỏ, cá nhân hoá, **không shopping stop** ([nguồn](https://vietnam.travel/things-to-do/five-key-trends-defining-global-tourism-2026)). Đây phải là thông điệp trung tâm.

## Định vị đề xuất

> **"Đi Mỹ – Úc – Châu Âu như người nhà. Vinh lo từ visa đến từng bữa ăn."**

Ba trụ: (1) **Một người thật chịu trách nhiệm** — Vinh, có mặt, có YouTube, không phải công ty vô danh; (2) **Riêng tư tuyệt đối** — xe riêng, lịch của bạn, không shopping stop; (3) **Chuyên gia đình đa thế hệ** — ông bà + bố mẹ + con nhỏ cùng đi được.

Tông giọng: người anh/người bạn từng trải kể chuyện, KHÔNG phải giọng brochure du lịch. Xưng "Vinh" ngôi thứ nhất ở mọi nội dung.

---

# PHẦN 2 — KIẾN TRÚC SITE MỚI

```
/                              Trang chủ (rút gọn, điều hướng)
/tour/                         [MỚI] Trang danh sách tất cả tour
/tour/my                       [MỚI] Landing thị trường Mỹ
/tour/uc                       [MỚI] Landing thị trường Úc
/tour/chau-au                  [MỚI] Landing thị trường Châu Âu
/tour/[slug]                   Trang tour (nâng cấp lớn — xem P4)
/chuyen-di/                    [MỚI] Blog câu chuyện chuyến đi
/chuyen-di/[slug]              [MỚI] Bài viết
/cam-nang/                     [MỚI] Blog cẩm nang (visa, kinh nghiệm)
/cam-nang/[slug]               [MỚI] Bài viết
/khach-hang                    [MỚI] Trang review + thư viện ảnh gia đình
/ve-vinh                       [MỚI] Trang giới thiệu Vinh (E-E-A-T)
/lien-he                       [MỚI] Form + Zalo + số ĐT (đích cho ads)
/admin, /auth                  giữ nguyên
```

**Tách blog làm 2 chuyên mục có chủ đích:** `/chuyen-di/` là kể chuyện — content dễ share, xây uy tín, chạy remarketing. `/cam-nang/` là SEO từ khoá dài — kéo organic traffic ("xin visa Mỹ có khó không", "chi phí đi Úc gia đình 4 người"). Hai mục đích khác nhau, đừng trộn.

URL tiếng Việt không dấu — khách và Google Việt Nam đều đọc được.

---

# PHẦN 3 — TRANG CHỦ: TÁI CẤU TRÚC

Trang chủ hiện là landing dài duy nhất. Chuyển vai trò thành **cửa ngõ điều hướng + xây niềm tin nhanh**, đẩy chi tiết về các trang chuyên biệt.

Thứ tự section mới (mobile-first, khách xem 80% bằng điện thoại):

1. **Hero** — giữ video mask nhưng thêm: headline định vị mới, **3 nút chọn thị trường** (Mỹ / Úc / Châu Âu → 3 landing page), badge "100+ gia đình đã đi". Dưới fold đầu tiên PHẢI thấy được một CTA.
2. **Trust bar** — 1 dòng: `100+ gia đình · Tỷ lệ đậu visa X% · 10+ năm dẫn đoàn · YouTube XXk subs` (số thật, hỏi anh Vinh).
3. **"Vì sao đi với Vinh"** — gộp `PersonalStory` + `ComparisonTable` hiện tại, cắt còn 50%. So sánh 3 cột: Tự túc / Tour đoàn / Private tour Vinh — nhấn "không shopping stop".
4. **3 thẻ thị trường** — mỗi thẻ: ảnh thật chuyến đi, 2-3 tour tiêu biểu + giá từ, link landing page.
5. **Social proof** — giữ galaxy ảnh gia đình (đẹp, độc đáo) nhưng mỗi ảnh bấm vào phải mở **câu chuyện + quote thật** (cần data mới, xem P7).
6. **Video** — cắt còn 3 video THẬT (xoá Rick Astley!), thêm subscribe CTA.
7. **Bài viết mới nhất** — 3 bài từ `/chuyen-di/` — trang chủ luôn tươi, Google thích.
8. **Form lead** — giữ form đa bước hiện có.
9. **FAQ ngắn** — 5 câu (visa, giá, đặt cọc, trẻ em/người già, huỷ) với `FAQPage` schema.

**Xoá/cắt:** `ScrollytellingRoadmap` và `LandCruiseExperience` gộp làm một (đang trùng ý "hành trình sang trọng"), cân nhắc bỏ `CustomCursor` (rối trên desktop, vô dụng trên mobile, tốn JS).

---

# PHẦN 4 — TRANG TOUR: NÂNG CẤP LỚN NHẤT

Trang tour là nơi quyết định mua. Hiện tại quá mỏng (hero + 3 thẻ info + list stops + CTA). Khách sắp chi 300 triệu cần nhiều hơn.

## Mở rộng schema `tour_packages` (migration mới)

```sql
ALTER TABLE tour_packages ADD COLUMN IF NOT EXISTS
  itinerary JSONB,          -- [{day, title, description, image_url, meals, hotel}]
  inclusions TEXT[],        -- bao gồm
  exclusions TEXT[],        -- không bao gồm
  gallery_urls TEXT[],      -- 8-15 ảnh THẬT từ chuyến đi
  faqs JSONB,               -- [{question, answer}]
  price_from NUMERIC,       -- giá số để lọc/sort (price TEXT giữ để hiển thị)
  departure_note TEXT,      -- "Khởi hành theo lịch gia đình bạn"
  max_group_size INT,
  destination TEXT,         -- 'my' | 'uc' | 'chau-au' (cho landing page filter)
  video_url TEXT,           -- vlog chuyến đi thật cùng tuyến
  related_story_slugs TEXT[]; -- link bài viết chuyến đi thật cùng tuyến
```

## Layout trang tour mới

1. Hero + badge "Private 100% · Không shopping stop"
2. Thanh info: thời gian · giá từ · cỡ nhóm · **nút Zalo sticky** (mobile: fixed bottom bar — xem P6)
3. **Lịch trình ngày-theo-ngày** — accordion, mỗi ngày có ảnh thật, bữa ăn, khách sạn. Đây là phần khách đọc kỹ nhất và là content SEO chính của trang.
4. Gallery ảnh thật từ chuyến đã đi (không stock!)
5. Bao gồm / Không bao gồm — minh bạch = niềm tin
6. **Video vlog cùng tuyến** nhúng — độc quyền của Vinh, đối thủ không có
7. **Review của gia đình đã đi ĐÚNG tuyến này** (query bảng `testimonials` theo `destination`)
8. Bài viết chuyến đi thật cùng tuyến (từ `related_story_slugs`)
9. FAQ riêng của tour (`FAQPage` schema)
10. CTA cuối: form rút gọn (chỉ SĐT + tháng dự định) + nút Zalo + nút gọi

JSON-LD: giữ `TouristTrip`, thêm `FAQPage`; itinerary map vào `itinerary` của TouristTrip đầy đủ hơn hiện tại.

---

# PHẦN 5 — LANDING PAGE THỊ TRƯỜNG (`/tour/my`, `/tour/uc`, `/tour/chau-au`)

Vai trò kép: **đích cho Google Ads/Facebook Ads theo thị trường** + **trang trụ SEO** cho "private tour mỹ", "tour gia đình đi úc"...

Cấu trúc mỗi trang (ISR, Server Component):

1. Hero ảnh thật tuyến đó + headline: *"Đưa cả nhà đi Mỹ — như có người thân ở bên đó"*
2. Đề xuất giá trị riêng thị trường (Mỹ: visa khó → nhấn tỷ lệ đậu + hỗ trợ phỏng vấn; Úc: gần, dễ, hợp người già + trẻ nhỏ; Châu Âu: đa quốc gia, Vinh lo hết logistics)
3. Grid tour thuộc thị trường (filter `destination`)
4. **Khối visa** — "Vinh hỗ trợ visa thế nào" (đây là nỗi lo số 1, và bạn có sẵn năng lực làm visa — bán chéo dịch vụ)
5. Review + ảnh gia đình đã đi đúng thị trường đó
6. Cẩm nang liên quan (3-5 bài từ `/cam-nang/` cùng tag)
7. FAQ thị trường (visa bao lâu, mùa nào đẹp, chi phí tổng...) + schema
8. Form lead với `destination` điền sẵn

Copy phải viết riêng từng trang — không dùng chung template chữ. Đây là 3 trang quan trọng nhất site về SEO thương mại.

---

# PHẦN 6 — CHUYỂN ĐỔI (CRO)

Benchmark ngành: 1–3% visitor→inquiry; dưới 1% là UX có vấn đề ([nguồn](https://resources.rework.com/libraries/travel-tour-growth/booking-conversion-metrics)). Mobile đang chiếm phần rủi ro doanh thu lớn nhất — conversion mobile toàn ngành giảm 4.1% YoY ([Contentsquare 2026](https://obvlo.com/resources/travel-website-conversion-optimisation/)) — nên mọi quyết định CRO ưu tiên mobile trước.

## Việc cụ thể

1. **Sticky bottom bar trên mobile** (mọi trang trừ admin): `[Zalo] [Gọi] [Nhận tư vấn]` — 3 nút, cao ~56px, xuất hiện sau khi cuộn qua hero. Khách Việt chốt qua Zalo — đây gần như chắc chắn là thay đổi ăn tiền nhất toàn brief.
2. **Điền số điện thoại thật** vào: sticky bar, footer, trang liên hệ, JSON-LD `telephone`, nút `tel:` link. (Cần anh Vinh cung cấp.)
3. **Form:** giữ đa bước nhưng thêm ① progress indicator, ② bước cuối hỏi "Dự định đi tháng mấy?" (phân loại lead nóng/nguội cho sales), ③ sau submit → trang cảm ơn riêng `/cam-on` (để track conversion chính xác trong ads — quan trọng!) với nội dung "Vinh sẽ gọi trong 2h làm việc" + nút Zalo.
4. **CTA ngữ cảnh theo trang:** trang Mỹ → "Nhận đánh giá hồ sơ visa miễn phí"; trang tour → "Hỏi Vinh về tour này"; bài viết → "Muốn đi chuyến giống vậy?". CTA cá nhân hoá convert tốt hơn ~200% CTA chung chung ([nguồn](https://cufinder.io/blog/benchmarks/tourism/)).
5. **Lead magnet:** PDF "Cẩm nang xin visa Mỹ cho gia đình 2026" đổi lấy SĐT/Zalo — bắt được khách chưa sẵn sàng mua (90% traffic).
6. **Exit intent popup** (desktop) + popup hiện có (mobile): đổi offer thành lead magnet thay vì "liên hệ ngay" chung chung.
7. **Phản hồi nhanh hiển thị:** "Vinh trả lời Zalo trong giờ hành chính, thường < 30 phút" — đặt cạnh mọi nút Zalo.

---

# PHẦN 7 — SOCIAL PROOF & UY TÍN (E-E-A-T)

## Kích hoạt bảng `testimonials` (đang bỏ không)

Thu thập từ khách cũ (việc của anh Vinh, làm form Google thu): quote 2-3 câu cụ thể, tên + thành phố, tuyến đi, tháng đi, ảnh, **video 30s nếu xin được** (video review là vàng). Mở rộng schema:

```sql
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS
  video_url TEXT,
  tour_slug TEXT,          -- gắn review vào tour cụ thể
  destination TEXT,        -- 'my' | 'uc' | 'chau-au'
  family_size INT,
  highlight TEXT;          -- 1 câu đắt nhất để pull-quote
```

UI: trang `/khach-hang` (tất cả review + galaxy ảnh chuyển từ trang chủ sang, bấm ảnh mở modal câu chuyện); khối review lọc theo tuyến nhúng vào trang tour + landing page; admin CRUD trong `/admin`.

**Đường tới sao trên Google:** lập Google Business Profile, xin khách cũ review lên đó, nhúng link GBP vào `/khach-hang`. KHÔNG tự khai `aggregateRating` trong schema (đã gỡ vì vi phạm guideline — đừng thêm lại).

## Trang `/ve-vinh`

Ảnh thật đời dẫn đoàn, câu chuyện vì sao làm private tour (ngôi thứ nhất), số liệu kiểm chứng được (năm, số gia đình, số bang/nước đã dẫn), link YouTube/TikTok/Facebook, giấy phép kinh doanh nếu có. `Person` schema đầy đủ + `sameAs`. Mọi bài blog có author box link về đây — Google dùng tín hiệu này đánh giá E-E-A-T, và khách dùng nó để quyết định có chuyển 300 triệu không.

---

# PHẦN 8 — HỆ THỐNG BLOG (bảng `blog_posts` đang bỏ không)

## Mở rộng schema

```sql
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS
  category TEXT DEFAULT 'cam-nang' CHECK (category IN ('chuyen-di','cam-nang')),
  destination TEXT,             -- tag thị trường để cross-link
  tour_slug TEXT,               -- bài chuyến đi link tới tour tương ứng
  reading_time INT,
  meta_description TEXT,
  og_image TEXT;
```

## Chuẩn SEO mỗi bài (Claude Code implement trong template)

`generateMetadata` riêng; `Article`/`BlogPosting` schema + author là Vinh (`Person`); heading đúng cấp; ảnh qua `next/image` kèm alt; **cross-link tự động**: bài chuyến đi ↔ tour cùng tuyến ↔ landing thị trường (đây là internal linking engine của cả site); nút share Facebook/Zalo + nút "Copy link"; khối CTA giữa bài và cuối bài theo ngữ cảnh tuyến.

## Kế hoạch content 3 tháng đầu (anh Vinh viết/kể, có thể dùng AI hỗ trợ nháp)

**`/chuyen-di/`** (2 bài/tháng): mỗi chuyến đi thật = 1 bài kể chuyện, ảnh thật, tên gia đình (xin phép), khoảnh khắc cụ thể — "Đưa ông bà 70 tuổi ngắm Grand Canyon", "3 thế hệ nhà chị Mai ở Great Ocean Road". Format: 60% ảnh, 40% chữ.

**`/cam-nang/`** (4 bài/tháng, nhắm từ khoá dài):
- Visa Mỹ: "Phỏng vấn visa Mỹ 2026 hỏi gì", "Trượt visa Mỹ có xin lại được không"
- Chi phí: "Chi phí đi Mỹ gia đình 4 người 2026", "Đi Úc 10 ngày hết bao nhiêu tiền"
- Kinh nghiệm: "Đi Mỹ với trẻ nhỏ cần chuẩn bị gì", "Người lớn tuổi bay đường dài — 10 mẹo"
- So sánh: "Private tour vs tour đoàn: đắt hơn bao nhiêu, đáng không" ← bài này bán hàng mạnh nhất

Từ khoá visa + chi phí là nơi khách hàng bắt đầu hành trình — chiếm được đó là chiếm được đầu funnel.

---

# PHẦN 9 — HÌNH ẢNH & THIẾT KẾ

**Nguyên tắc một câu: ảnh thật > ảnh đẹp.** Khách mua sự yên tâm, không mua ảnh stock. Unsplash chỉ được làm nền trang trí, TUYỆT ĐỐI không đại diện cho chuyến đi/khách sạn/xe.

Việc cụ thể:

1. **Kho ảnh:** anh Vinh gom ảnh mọi chuyến theo cấu trúc `tuyến/chuyến/`, chọn 15-20 tấm tốt nhất mỗi chuyến. Upload Cloudinary (đang dùng sẵn) — thêm `res.cloudinary.com` vào `remotePatterns` trong `next.config.ts`.
2. **`next/image` toàn site** — thay hết `<img>` trong các component landing (SocialProof, PersonalStory, VinhVlogs, LandCruise...). Đặt `sizes` đúng, `priority` cho ảnh hero.
3. **OG image động cho tour và bài viết** — dùng `next/og` (ImageResponse): ảnh tour + tên + giá từ + logo. Mỗi lần share Zalo/Facebook trông chuyên nghiệp, khác biệt ngay trong feed.
4. **Logo thật** — logo hiện tại là chữ lồng "VA" tôi dựng tạm bằng script. Thuê designer làm tử tế (~1-2 triệu), thay `public/logo.png`, favicon set, og-image.
5. **Giữ chất animation hiện có** (GSAP, Lenis smooth scroll) — đang là điểm cộng sang trọng — nhưng: tôn trọng `prefers-reduced-motion`, và animation không được chặn LCP (ảnh hero phải hiện trước khi GSAP init).
6. **Màu & font giữ nguyên** (teal #1a5f5a + gold, Playfair + Inter) — đã đúng chất premium, đừng redesign toàn bộ. Đổi sang `next/font/google` để hết layout shift.

---

# PHẦN 10 — SEO KỸ THUẬT & NỘI DUNG

## Keyword map (trang nào nhắm từ nào — tránh tự ăn thịt nhau)

| Trang | Từ khoá chính | Phụ |
|---|---|---|
| `/` | vinh around, passport lounge | private tour |
| `/tour/my` | private tour mỹ, tour mỹ gia đình | du lịch mỹ tự túc có người dẫn |
| `/tour/uc` | private tour úc, tour úc gia đình | du lịch úc gia đình |
| `/tour/chau-au` | private tour châu âu | tour châu âu gia đình |
| `/tour/[slug]` | tên tour + tuyến cụ thể ("tour bờ tây mỹ") | — |
| `/cam-nang/*` | từ khoá dài informational | — |
| `/khach-hang` | review vinh around | đánh giá passport lounge |

## Việc kỹ thuật

- Breadcrumb UI + schema mọi trang con (đã có schema ở tour, thêm UI hiển thị).
- `app/sitemap.ts` mở rộng: thêm blog, landing pages, `/khach-hang`, `/ve-vinh`.
- Heading hierarchy chuẩn mọi trang (1 H1 duy nhất — kiểm tra lại các section component đang lạm dụng H2/H3).
- Alt text tiếng Việt có nghĩa cho mọi ảnh.
- Core Web Vitals: mục tiêu LCP < 2.5s mobile — video hero cần poster image + lazy, GSAP init sau LCP.
- **AEO (mới, đáng làm sớm):** phần lớn khách giờ hỏi AI trước khi vào web ([xu hướng 2026](https://obvlo.com/resources/travel-website-conversion-optimisation/)). FAQ schema dày + nội dung trả lời trực tiếp câu hỏi + số liệu cụ thể trong bài = được AI trích dẫn. Đây là lợi thế người đi sớm ở thị trường Việt.
- Google Search Console + Bing Webmaster ngay sau deploy; theo dõi query nào lên để viết thêm bài cùng cụm.

---

# PHẦN 11 — ADS READINESS

1. **Google Tag Manager** thay cho gtag hardcode trong layout — đổi tag không cần deploy. Giữ `NEXT_PUBLIC_GTM_ID` trong env.
2. **Chuẩn hoá conversion events** (đặt tên thống nhất, gửi cả GA4 + Pixel):
   - `generate_lead` (submit form — conversion chính, đo tại trang `/cam-on`)
   - `contact_zalo`, `contact_phone` (bấm nút — conversion phụ)
   - `view_tour` (kèm `destination`, `tour_slug` — nuôi remarketing audience)
   - `download_leadmagnet`
3. **Meta Conversions API** qua Cloudflare Worker (server-side, dedup bằng `event_id` với Pixel) — iOS và ad blocker đang nuốt 20-40% tín hiệu pixel; CAPI cứu lại phần đó, trực tiếp cải thiện tối ưu ads.
4. **UTM convention** ghi vào README: `utm_source=facebook|google|tiktok`, `utm_campaign=<thitruong>-<mua>`, lưu UTM vào `lead_submissions` (thêm cột `utm_source, utm_campaign, utm_medium, landing_page`) — biết lead đến từ campaign nào = biết tiền ads chỗ nào hiệu quả.
5. **Cấu trúc campaign gợi ý:** Search Google nhắm "private tour mỹ/úc" → landing thị trường; Facebook/TikTok video vlog Vinh → bài chuyến đi (ấm) → remarketing người xem tour → form. Landing riêng từng thị trường là điều kiện để Quality Score tốt.
6. **Turnstile** trên form — chạy ads là spam bot đến ngay.

---

# PHẦN 12 — LỘ TRÌNH CHO CLAUDE CODE

## Sprint 1 — Nền chuyển đổi (tuần 1) ← làm trước, ăn ngay

1. Xoá video Rick Astley; điền SĐT thật (hỏi anh Vinh trước khi bắt đầu)
2. Sticky bottom bar mobile (Zalo/Gọi/Tư vấn) + track event
3. Trang `/cam-on` + redirect sau submit + conversion event
4. Trang `/lien-he`
5. Thêm cột UTM vào `lead_submissions`, lưu từ URL vào form submit
6. GTM thay gtag hardcode
7. `res.cloudinary.com` vào `remotePatterns`

## Sprint 2 — Trang tour sâu + landing thị trường (tuần 2-3)

1. Migration mở rộng `tour_packages` (P4) — kèm cập nhật types Supabase
2. Trang tour layout mới (P4) — dữ liệu cũ thiếu field mới phải render đẹp (conditional)
3. 3 landing page thị trường (P5) + `/tour/` danh sách
4. Admin: form sửa tour mở rộng theo schema mới (itinerary editor dạng repeater)
5. Cập nhật sitemap + keyword map vào metadata từng trang

## Sprint 3 — Blog + social proof (tuần 3-4)

1. Migration `blog_posts` + `testimonials` (P7, P8)
2. `/chuyen-di/`, `/cam-nang/` + template bài viết chuẩn SEO + share buttons
3. Admin: trình soạn bài (markdown editor là đủ, đừng over-engineer), CRUD testimonials
4. `/khach-hang` (chuyển galaxy ảnh sang + modal câu chuyện), `/ve-vinh`
5. Khối cross-link: bài ↔ tour ↔ landing; khối "bài mới" trên trang chủ

## Sprint 4 — Trang chủ mới + polish (tuần 4-5)

1. Tái cấu trúc trang chủ theo P3
2. `next/image` toàn site + `next/font`
3. OG image động (`next/og`)
4. Meta CAPI worker; Turnstile; exit-intent + lead magnet
5. Lighthouse audit — mục tiêu mobile ≥ 85 performance, 100 SEO

## Việc KHÔNG phải code (của anh Vinh, làm song song — code xong mà thiếu cái này là site rỗng)

- [ ] Cung cấp SĐT chính thức + link Zalo OA/cá nhân
- [ ] Gom ảnh thật theo chuyến (15-20 tấm/chuyến)
- [ ] Xin 10 khách cũ: quote + ảnh + cho phép dùng tên (form Google)
- [ ] Quay 3-5 video review khách 30s
- [ ] Kể 4 câu chuyện chuyến đi đầu tiên (voice note cũng được, AI nháp lại)
- [ ] Lập Google Business Profile
- [ ] Thuê designer làm logo thật
- [ ] Số liệu thật cho trust bar: tổng gia đình, tỷ lệ visa đậu, năm kinh nghiệm

---

# PHẦN 13 — ĐO LƯỜNG

| Chỉ số | Baseline | Mục tiêu 3 tháng |
|---|---|---|
| Visitor → lead (form + Zalo click) | đo tuần đầu sau deploy | ≥ 2% (top 20% ngành) |
| Organic clicks/tháng (GSC) | ~0 (site mới index) | tăng trưởng dương liên tục, kỳ vọng 500+ |
| Trang index | 5 | 40+ (tour + blog + landing) |
| Lighthouse mobile perf | đo sau deploy | ≥ 85 |
| Lead có UTM (đo được nguồn) | 0% | 100% |
| Thời gian phản hồi lead | — | < 2h làm việc (cam kết hiển thị trên site) |

Xem lại số mỗi tháng, viết thêm bài theo query đang lên trong GSC, A/B copy CTA — A/B testing có kỷ luật từng giúp travel agency tăng 33% booking ([case Djoser](https://vwo.com/blog/increase-travel-website-bookings/)).

---

# GHI CHÚ CHO CLAUDE CODE

- Codebase: Next.js 16.2.10 App Router, TS (strict OFF — giữ nguyên, đừng bật giữa chừng), Tailwind + shadcn/ui, Supabase qua `@supabase/ssr` (client tại `src/lib/supabase/`, singleton cũ tại `src/integrations/supabase/client.ts` cho client components).
- SEO helpers tập trung ở `src/lib/seo.ts` — mọi URL tuyệt đối phải qua `absoluteUrl()`, đừng hardcode domain.
- Guard admin ở `src/lib/auth-guard.ts` (Server Component, KHÔNG dùng middleware — Next 16 + OpenNext trên Workers không hỗ trợ, đã thử).
- Analytics helpers ở `src/lib/analytics.ts` — thêm event mới vào đây, đừng gọi gtag/fbq trực tiếp trong component.
- Deploy: `npm run deploy` (OpenNext → Cloudflare Workers). ISR cache qua KV binding `NEXT_INC_CACHE_KV`.
- Component nào có hook/animation → `"use client"`; nội dung SEO quan trọng để Server Component render.
- Migration mới đặt tên `2026MMDDHHMMSS_ten_mo_ta.sql` trong `supabase/migrations/`.
- Sau MỖI sprint: `npm run build` phải sạch + kiểm tra HTML server-render có đủ meta (curl trang, grep og:).

---

## Nguồn nghiên cứu

- [Five Key Trends Defining Global Tourism 2026 — Vietnam Tourism](https://vietnam.travel/things-to-do/five-key-trends-defining-global-tourism-2026) (60% khách Việt muốn tour nhỏ không shopping stop)
- [Vietnam luxury/tailor-made demand 2026 — TTW](https://www.travelandtourworld.com/news/article/vietnams-domestic-tourism-boom-accelerates-with-rising-demand-for-exclusive-tours-premium-services-and-tailor-made-experiences-ahead-of-2026-holidays/)
- [Booking Conversion Metrics 2026 — Rework](https://resources.rework.com/libraries/travel-tour-growth/booking-conversion-metrics) (benchmark 1–3%)
- [Travel website conversion optimisation — Obvlo](https://obvlo.com/resources/travel-website-conversion-optimisation/) (mobile -4.1% YoY, AI-era visibility)
- [Tourism Marketing Benchmarks 2026 — Cufinder](https://cufinder.io/blog/benchmarks/tourism/) (CTA cá nhân hoá +202%)
- [8 Steps to Increase Travel Website Bookings — VWO](https://vwo.com/blog/increase-travel-website-bookings/) (case A/B +33%)
