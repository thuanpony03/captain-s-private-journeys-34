# Vinh Around — Audit & Roadmap tái cấu trúc

*Ngày audit: 21/07/2026 · Commit: `81e2f1f` · 123 commits*

---

## 0. Hiện trạng

| Hạng mục | Tình trạng |
|---|---|
| Stack | Vite 5 + React 18 + TypeScript + shadcn/ui + Tailwind 3 |
| Backend | Supabase (auth, Postgres, storage, 1 edge function) |
| Routes | `/`, `/auth`, `/admin`, `/tour/:slug`, `404` |
| Quy mô | ~100 file trong `src`, 13 migration |
| Build | ✅ Sạch, 4.5s, TypeScript không lỗi |
| Bundle | ⚠️ 864 kB một chunk (gzip 261 kB), không code-split |
| Rendering | ⚠️ SPA thuần — HTML rỗng khi bot fetch |

Đã cài xong tại `Downloads/captain-private-journeys`. Lưu ý: `npm install` cần cờ `--legacy-peer-deps` vì `@react-three/drei@10` yêu cầu React 19 nhưng dự án đang React 18.

---

## 1. Lỗi nghiêm trọng — cần xử lý trước mọi thứ khác

### 1.1 Mọi người đăng ký đều thành admin 🔴

`supabase/migrations/20251202_give_all_users_admin.sql` ghi đè trigger `handle_new_user`:

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
...
INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
```

Migration gốc (`20251201180142`) thiết kế đúng: user đầu tiên là `admin`, còn lại là `user`. Migration ngày 02/12 phá bỏ điều đó. Do sắp thứ tự theo tên file, đây là migration chạy **cuối cùng**.

Kết hợp với: `/auth` có tab **đăng ký công khai**, và trigger tự cấp `admin` → **bất kỳ ai vào `vinharound.com/auth`, đăng ký một tài khoản, là có quyền admin**.

### 1.2 RLS cho phép mọi user đăng nhập đọc toàn bộ lead 🔴

`20251202_fix_lead_rls_policies.sql`:

```sql
CREATE POLICY "Allow authenticated read on lead_submissions"
ON lead_submissions FOR SELECT TO authenticated USING (true);
```

`USING (true)` = mọi tài khoản đã đăng nhập đọc/sửa/xoá **tất cả** lead, không kiểm tra role. Hook `useAdminAuth` chỉ chặn ở tầng UI — không có giá trị bảo mật, bypass bằng cách gọi thẳng Supabase REST API.

Cộng 1.1 + 1.2: **toàn bộ dữ liệu khách hàng (tên, số điện thoại, email, nội dung tư vấn) đang công khai với bất kỳ ai chịu khó đăng ký một tài khoản.** Đây là rủi ro pháp lý theo Nghị định 13/2023 về bảo vệ dữ liệu cá nhân, không chỉ là bug kỹ thuật.

> ⚠️ Cần xác minh migration này đã chạy trên Supabase production chưa. Kiểm tra: Supabase Dashboard → Database → Functions → `handle_new_user`, và Authentication → Policies → `lead_submissions`. Tôi chỉ đọc được file migration trong repo, không đọc được DB thật.

**Vá ngay:**

1. Tắt public signup: Supabase Dashboard → Authentication → Providers → Email → tắt *Allow new users to sign up*.
2. Viết migration khôi phục `handle_new_user` về logic `'user'`, và `DELETE FROM user_roles WHERE role='admin' AND user_id NOT IN (...)` giữ lại đúng tài khoản của bạn.
3. Viết lại RLS dùng hàm `has_role(auth.uid(), 'admin')` thay cho `USING (true)`.
4. Gỡ hoặc bảo vệ tab đăng ký trong `Auth.tsx`.

### 1.3 `.env` bị commit vào git 🟠

Commit `969a05c` chứa `VITE_SUPABASE_URL`, `VITE_SUPABASE_PROJECT_ID`, `VITE_SUPABASE_PUBLISHABLE_KEY`. `.gitignore` **không** có dòng `.env`.

Mức độ thật sự: publishable key (anon key) vốn được thiết kế để lộ ra client — bản thân nó không phải thảm hoạ. Vấn đề là nó chỉ an toàn *khi RLS đúng*, mà RLS đang sai (mục 1.2). Cần sửa cả hai.

Việc cần làm: thêm `.env` vào `.gitignore`, tạo `.env.example`, và cân nhắc rotate key sau khi RLS đã siết. Xoá khỏi git history (`git filter-repo`) là tuỳ chọn — repo private thì ưu tiên thấp.

### 1.4 Edge function ✅

`send-lead-notification` đọc secret qua `Deno.env.get()` đúng chuẩn, không hardcode. Chỉ một điểm cần sửa: đang gửi từ `onboarding@resend.dev` — domain sandbox của Resend, tỉ lệ vào spam cao. Cần verify domain riêng.

---

## 2. Vấn đề SEO

### 2.1 Gốc rễ: SPA không có HTML server-side

`index.html` trả về `<div id="root"></div>` rỗng. Meta tag động do `react-helmet-async` chèn — chỉ chạy sau khi JS load.

Hệ quả cụ thể:

- **Googlebot**: render được, nhưng qua hàng đợi render lần hai → index chậm hơn nhiều so với SSR.
- **Facebook / Zalo / Twitter crawler**: **không chạy JS**. Chia sẻ link `/tour/xxx` lên Facebook hay Zalo sẽ hiện title + ảnh của trang chủ, không phải của tour. Với business phụ thuộc share mạng xã hội, đây là mất mát trực tiếp.
- **Bingbot**: hỗ trợ JS hạn chế, kết quả không ổn định.

Đây là lý do chính để migrate sang Next.js.

### 2.2 Structured data có vấn đề

`index.html` khai báo:

```json
"aggregateRating": { "ratingValue": "5.0", "reviewCount": "100" }
```

Hai rủi ro:
- Google cấm self-serving review markup (tổ chức tự đánh giá chính mình) — vi phạm [Review snippet guidelines](https://developers.google.com/search/docs/appearance/structured-data/review-snippet), có thể bị manual action.
- Rating 5.0/100 review không có review thật nào backing → là dữ liệu bịa.

**Nên gỡ `aggregateRating` khỏi Organization schema.** Nếu muốn hiện sao trên SERP, phải thu thập review thật (Google Business Profile) và markup từng review riêng lẻ.

Ngoài ra `"telephone": "+84-xxx-xxx-xxx"` vẫn là placeholder chưa điền.

### 2.3 Sitemap sai chuẩn

`public/sitemap.xml` liệt kê URL dạng fragment: `/#tours`, `/#contact-form`, `/#about`, `/#vlogs`. Search engine coi fragment là **cùng một URL** với trang chủ — 5 trong 6 entry vô nghĩa. Đồng thời **không có URL tour nào** (`/tour/:slug`) trong sitemap, tức là các trang có giá trị SEO cao nhất lại không được submit.

Sitemap cần sinh động từ Supabase, không viết tay.

### 2.4 Asset thiếu

`index.html` trỏ tới các file không tồn tại trong `public/`:

- `favicon-32x32.png` ❌
- `favicon-16x16.png` ❌
- `apple-touch-icon.png` ❌
- `logo.png` ❌ (dùng trong Organization schema)

→ 4 lỗi 404 trên mỗi lượt tải trang.

`og:image` và sitemap còn trỏ về `lovable.dev/opengraph-image-p98pqg.png` — ảnh mặc định của Lovable, không phải brand của bạn.

### 2.5 Canonical cứng

> **Đính chính:** bản audit đầu tiên của tôi nói mọi trang tour đều canonical sai về trang chủ. **Điều đó không đúng** — `TourDetail.tsx` có truyền `url` riêng cho từng tour. Tôi đã kết luận vội trước khi đọc hết file. Xin lỗi vì thông tin sai.

Vấn đề thật, phạm vi hẹp hơn: `SEOHead` mặc định `url = "https://vinharound.com"`, nên `/admin` và `/auth` — hai trang không truyền `url` — canonical về trang chủ. Hai trang này vốn nên `noindex` chứ không phải canonical, và `/404` thì chưa có thẻ meta nào cả.

Rủi ro lớn hơn nằm ở thiết kế: bất kỳ route mới nào quên truyền `url` sẽ âm thầm canonical về trang chủ và tự loại mình khỏi index. Cần đổi mặc định thành "tự lấy path hiện tại".

### 2.6 Điểm đã làm tốt ✅

`robots.txt` viết chỉn chu; `lang="vi"`; preconnect fonts; TravelAgency + Service + Person + BreadcrumbList schema (chỉ cần dọn phần rating); GA4 (`G-BF2K8J3Y2Z`) và Meta Pixel (`676642742084121`) đã gắn và có event tracking CTA.

---

## 3. Vấn đề cấu trúc & hiệu năng

- **Bundle 864 kB một chunk** — `@react-three/fiber` + `drei` + `gsap` + `recharts` nằm chung với code trang chủ. Trang admin (recharts) và hiệu ứng 3D đang được tải cho cả khách vãng lai. Ảnh hưởng trực tiếp LCP → xếp hạng SEO và điểm chất lượng Google Ads.
- **Không code-split theo route** — `App.tsx` import tĩnh cả 5 page.
- **Không có test** — 0 file test, không có CI.
- **Peer dependency lệch** — `@react-three/drei@10` (cần React 19) vs React 18.
- **`components/` phẳng** — nên tách theo domain (`features/tours`, `features/leads`, `features/admin`).
- **Không có consent management** — GA4 + Meta Pixel bắn ngay khi load, không xin phép. Vấn đề nếu có khách EU (site bán tour Châu Âu).
- **README vẫn là template Lovable** — chưa có hướng dẫn setup thật.

---

## 4. Roadmap

Tổng: **4–6 tuần** part-time. Giai đoạn 1 nên làm trong tuần này.

### Giai đoạn 1 — Vá bảo mật (1–2 ngày) 🔴

1. Tắt public signup trên Supabase Dashboard.
2. Migration khôi phục `handle_new_user` → role `'user'`.
3. Dọn `user_roles`, chỉ giữ admin thật.
4. Viết lại RLS `lead_submissions` dùng `has_role()`.
5. `.env` → `.gitignore`; tạo `.env.example`.
6. Verify domain gửi mail trên Resend.
7. Kiểm tra lại bằng cách tạo tài khoản test và xác nhận không đọc được lead.

**Làm ngay cả khi chưa quyết migrate.**

### Giai đoạn 2 — Thắng nhanh về SEO trên nền hiện tại (2–3 ngày)

Làm trước migrate để có kết quả sớm và tạo baseline đo lường:

1. Sửa canonical trong `SEOHead` — truyền `url` thật ở `TourDetail`.
2. Gỡ `aggregateRating` bịa; điền số điện thoại thật.
3. Tạo lại favicon set + `logo.png` + OG image brand riêng.
4. Viết script sinh `sitemap.xml` từ Supabase lúc build; bỏ các URL fragment.
5. Code-split route bằng `React.lazy` + `manualChunks` cho three/gsap/recharts.
6. Chạy Lighthouse, lưu lại số liệu làm mốc so sánh.

### Giai đoạn 3 — Migrate Next.js (2–3 tuần)

Next.js **16.2.10 LTS** (bản stable hiện tại, phát hành 01/07/2026), App Router.

**Bước 3.1 — Dựng khung (2–3 ngày)**
- Khởi tạo Next 16 App Router, TypeScript, Tailwind.
- Port `tailwind.config.ts`, `index.css`, `components.json` (shadcn chạy nguyên trên Next).
- Cấu hình `@opennextjs/cloudflare` + Wrangler ngay từ đầu — deploy sớm, tránh dồn rủi ro về cuối.
- `compatibility_date` ≥ `2024-09-23`, bật cờ `nodejs_compat`.

**Bước 3.2 — Port component (1 tuần)**
- `src/components/ui/*` gần như copy nguyên xi.
- Component có animation (GSAP, Lenis, react-three) cần `"use client"`.
- Component tĩnh giữ làm Server Component — đây là chỗ ăn được hiệu năng lớn nhất.

**Bước 3.3 — Routing & data (1 tuần)**

| Vite hiện tại | Next.js App Router |
|---|---|
| `/` | `app/page.tsx` — Server Component, fetch tour từ Supabase |
| `/tour/:slug` | `app/tour/[slug]/page.tsx` + `generateStaticParams` + ISR |
| `/admin` | `app/admin/page.tsx` — client, bảo vệ bằng middleware |
| `/auth` | `app/auth/page.tsx` |
| `SEOHead` | Metadata API + `generateMetadata()` |
| `react-helmet-async` | **Gỡ bỏ** — Next lo phần này |

- Đổi `@supabase/supabase-js` client-only sang `@supabase/ssr` (cookie-based session, thay `localStorage`).
- Thêm middleware chặn `/admin` ở tầng edge, không chỉ ở client.

**Bước 3.4 — SEO tầng framework (2–3 ngày)**
- `generateMetadata()` mỗi trang tour → **OG tag đúng khi share Facebook/Zalo**.
- `app/sitemap.ts` sinh động từ Supabase.
- `app/robots.ts`.
- JSON-LD `TouristTrip` schema cho từng tour (tốt hơn hẳn schema chung hiện tại).
- ISR `revalidate: 3600` cho trang tour — tour sửa trong CMS tự cập nhật, không cần build lại.
- `next/image` cho toàn bộ ảnh.

### Giai đoạn 4 — Cloudflare (2–3 ngày)

- Deploy qua `npx @opennextjs/cloudflare build` + Wrangler.
- Workers Builds hoặc GitHub Actions cho CI/CD (`main` → production, PR → preview).
- Env vars khai trong "Build Variables and secrets" — cả `NEXT_PUBLIC_*` và secret.
- Trỏ DNS `vinharound.com`, bật Cloudflare proxy.
- Cấu hình cache rules, Brotli, Early Hints.
- Cloudflare Web Analytics (miễn phí, không cookie — bổ sung cho GA4).
- Cân nhắc R2 thay Supabase Storage cho ảnh (egress miễn phí).
- Turnstile chống spam form lead.

### Giai đoạn 5 — SEO nâng cao & Ads (liên tục)

**SEO**
- Google Search Console + Bing Webmaster: submit sitemap, theo dõi index.
- Blog `/blog` (bảng `blog_posts` đã có sẵn trong schema, chưa dùng) — nhắm từ khoá dài: "kinh nghiệm du lịch Mỹ tự túc", "chi phí private tour Úc"...
- Trang landing riêng theo tuyến: `/tour/my`, `/tour/uc`, `/tour/chau-au` thay vì gom hết vào anchor trang chủ.
- Nội dung E-E-A-T: hồ sơ Vinh Around, review thật có tên khách.
- Local SEO: Google Business Profile + LocalBusiness schema.
- Nội bộ liên kết chéo giữa các trang tour.

**Ads**
- Chuyển GA4/Pixel sang Google Tag Manager để quản lý tag không cần deploy.
- Chuẩn hoá conversion event: `form_submit`, `phone_click`, `zalo_click`, `tour_view`.
- Meta Conversions API (server-side) qua Cloudflare Worker — chống mất dữ liệu do iOS/ad blocker, quan trọng để tối ưu quảng cáo.
- Google Ads enhanced conversions.
- Consent banner trước khi bắn tracking.
- Remarketing audience theo trang tour đã xem.

---

## 5. Thứ tự đề xuất

```
Tuần này    → Giai đoạn 1 (bảo mật)              🔴 không hoãn được
Tuần sau    → Giai đoạn 2 (SEO nhanh)            có kết quả đo được
Tuần 3–5    → Giai đoạn 3 (Next.js)              nhánh riêng, không đụng production
Tuần 5      → Giai đoạn 4 (Cloudflare)           cutover
Sau đó      → Giai đoạn 5 (content + ads)        liên tục
```

Giai đoạn 3 nên làm trên nhánh `next-migration`, deploy preview lên Cloudflare, so Lighthouse với bản hiện tại rồi mới cutover DNS. Giữ bản Vite chạy song song tới khi bản Next ổn định.

---

## 6. Câu hỏi cần bạn xác nhận

1. Migration `give_all_users_admin` đã chạy trên Supabase production chưa? (Ảnh hưởng mức độ khẩn của Giai đoạn 1)
2. `vinharound.com` hiện đang deploy ở đâu — Lovable hay nơi khác?
3. Có ai ngoài bạn đang sửa qua Lovable không? (Nếu có, migrate sang Next sẽ cắt đứt luồng đó)
4. Có sẵn logo vector + ảnh brand để làm favicon/OG image không?
5. Có khách EU không? (Quyết định mức độ cần consent banner)

---

## Nguồn

- [Next.js on Cloudflare Workers — Cloudflare docs](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)
- [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare)
- [@opennextjs/cloudflare — npm](https://www.npmjs.com/package/@opennextjs/cloudflare)
- [Next.js EOL / version support](https://endoflife.date/nextjs)
- [Google review snippet guidelines](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
