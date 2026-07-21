# Đã áp dụng — Giai đoạn 1 & 2

*Nhánh `security-seo-fixes` · 21/07/2026*

Toàn bộ thay đổi nằm trên nhánh riêng, **chưa merge vào `main`**, chưa deploy.

---

## ⚠️ 4 việc chỉ bạn làm được (tôi không có quyền truy cập)

Migration và code đã sẵn sàng, nhưng chúng vô nghĩa nếu chưa làm 4 bước này:

### 1. Tắt đăng ký công khai — làm ngay

Supabase Dashboard → **Authentication → Providers → Email** → tắt *Allow new users to sign up*.

Đây là lớp chặn thật. Thay đổi trong `Auth.tsx` chỉ ẩn UI, không ngăn ai gọi thẳng API đăng ký.

### 2. Kiểm tra thiệt hại thực tế

Chạy trong Supabase SQL Editor để xem có bao nhiêu tài khoản lạ đã có quyền admin:

```sql
SELECT u.email, u.created_at, r.role
FROM auth.users u
JOIN user_roles r ON r.user_id = u.id
WHERE r.role = 'admin'
ORDER BY u.created_at DESC;
```

Nếu thấy email lạ → dữ liệu khách hàng đã bị truy cập. Cần rà thêm log và cân nhắc nghĩa vụ thông báo theo Nghị định 13/2023.

### 3. Sửa email admin rồi chạy migration

Mở `supabase/migrations/20260721000000_revoke_blanket_admin.sql`, sửa mảng `allowed_admin_emails` (đang để `luongcongthuann@gmail.com`) thành đúng email admin thật của bạn.

Migration có chốt an toàn: nếu không email nào trong danh sách khớp tài khoản có thật, nó sẽ `RAISE EXCEPTION` và không xoá gì — tránh việc bạn tự khoá mình khỏi trang admin.

Sau đó:

```bash
supabase db push
# hoặc dán nội dung 2 file migration vào SQL Editor theo đúng thứ tự
```

### 4. Verify domain gửi mail trên Resend

Edge function đang gửi từ `onboarding@resend.dev` (domain sandbox) → email báo lead mới dễ rơi vào spam. Verify domain riêng rồi sửa dòng `from:` trong `supabase/functions/send-lead-notification/index.ts`.

---

## Bảo mật

| Thay đổi | File |
|---|---|
| Khôi phục `handle_new_user()` — user mới nhận role `'user'`, không phải `'admin'` | `migrations/20260721000000_revoke_blanket_admin.sql` |
| Thu hồi admin của mọi tài khoản ngoài allowlist, có chốt an toàn chống tự khoá | ↑ |
| Gỡ 4 policy `USING (true)` trên `lead_submissions` | `migrations/20260721000001_harden_lead_rls.sql` |
| Tái lập policy admin-only qua `has_role()`; giữ quyền INSERT cho anon (form lead vẫn chạy) | ↑ |
| Siết RLS `user_roles` — user thường chỉ đọc role của chính mình, không tự nâng quyền | ↑ |
| Ẩn tab đăng ký sau cờ `VITE_ALLOW_PUBLIC_SIGNUP` (mặc định tắt) + chặn ở `handleSignUp` | `src/pages/Auth.tsx` |
| Bỏ toast sai sự thật "Bạn có quyền admin đầy đủ" khi đăng nhập | ↑ |
| `.env` vào `.gitignore`, gỡ khỏi git index, thêm `.env.example` | `.gitignore`, `.env.example` |

**Lưu ý về RLS:** trong Postgres, nhiều policy PERMISSIVE được **OR** với nhau. Bộ policy admin-only viết đúng từ 01/12 đã bị vô hiệu hoá hoàn toàn khi migration 02/12 thêm policy `USING (true)` lên trên. Đây là lý do lỗ hổng tồn tại dù code trông có vẻ đã kiểm tra quyền.

---

## SEO

| Thay đổi | Chi tiết |
|---|---|
| `SEOHead` canonical tự lấy path hiện tại | Không còn mặc định về trang chủ — route mới không thể vô tình tự loại mình khỏi index |
| Thêm prop `noIndex` | Đã bật cho `/admin`, `/auth`, `/404` |
| Thêm prop `jsonLd` | JSON-LD giờ nằm trong `<head>` thay vì giữa body |
| Gỡ `aggregateRating` 5.0/100 review | Là dữ liệu bịa **và** vi phạm guideline self-serving review của Google |
| Gỡ `telephone: "+84-xxx-xxx-xxx"` | Placeholder chưa điền — **cần bạn bổ sung số thật** vào `index.html` |
| Thay ảnh OG của Lovable bằng ảnh brand | `public/og-image.jpg` |
| Thêm schema `TouristTrip` + `BreadcrumbList` cho từng tour | `src/pages/TourDetail.tsx` |
| Tập trung hằng số SEO một chỗ | `src/lib/seo.ts` — `SITE_URL` giờ đọc từ env |
| Sitemap sinh động từ Supabase | `scripts/generate-sitemap.mjs`, chạy tự động ở `prebuild` |
| 404 giờ có nội dung tiếng Việt + dùng `<Link>` | `src/pages/NotFound.tsx` |

**Sitemap cũ có 6 URL, 5 trong đó là fragment** (`/#tours`, `/#about`...) mà search engine coi là trùng trang chủ — tức chỉ 1 URL thật sự có tác dụng, và không có trang tour nào. Script mới lấy tour từ Supabase, kèm `lastmod` và ảnh.

Script fail-safe: mất kết nối Supabase thì vẫn sinh sitemap trang tĩnh và thoát code 0, không làm hỏng build. Tôi đã test đúng nhánh này (sandbox không gọi được Supabase).

---

## Asset còn thiếu

Trước đây `index.html` và `manifest.json` trỏ tới 7 file không tồn tại → 404 mỗi lượt tải trang. Đã tạo bằng chữ lồng "VA" trên nền brand `#1a5f5a`:

`favicon.ico` · `favicon-16x16.png` · `favicon-32x32.png` · `apple-touch-icon.png` · `android-chrome-192x192.png` · `android-chrome-512x512.png` · `icon-96.png` · `logo.png` · `og-image.jpg`

> Đây là **ảnh tạm** tôi dựng bằng script. Nếu có logo vector thật, nên thay lại — chữ lồng generic không đại diện cho brand.

---

## Hiệu năng

`vite.config.ts` tách vendor chunk, `App.tsx` lazy-load route.

| | Trước | Sau |
|---|---|---|
| Entry chunk | 864 kB (gzip 261) | 348 kB (gzip 106) |
| Số chunk | 1 | 12 |
| Admin dashboard | trong bundle chính | 72 kB, tải riêng |

**Nói cho công bằng:** trang chủ vẫn tải `index` + `react-vendor` + `supabase` + `animation` ≈ 769 kB thô, so với 864 kB trước — giảm khoảng 11%, không phải 60% như con số entry chunk gợi ý. Lợi ích thật nằm ở hai chỗ khác: khách vãng lai không còn tải code admin, và vendor chunk được cache riêng nên deploy sau chỉ tải lại phần thay đổi.

Muốn giảm sâu hơn thì phải cắt `animation` (GSAP + Lenis, 82 kB) và lazy-load `supabase` (177 kB) — nhưng việc đó sẽ được giải quyết gọn hơn nhiều khi migrate Next.js với Server Component, nên tôi không đụng vào bây giờ.

---

## Kiểm chứng

- `tsc --noEmit` sạch
- `npm run build` thành công
- ESLint: **50 problems (39 errors, 11 warnings)** — đúng bằng baseline trước khi tôi sửa. Toàn bộ là `no-explicit-any` và `react-hooks/exhaustive-deps` có sẵn, tôi không thêm lỗi mới và cũng chưa dọn (nằm ngoài phạm vi giai đoạn này).
- Script sitemap: đã test cả nhánh thành công lẫn nhánh mất kết nối.

**Chưa test:** luồng đăng nhập admin thật và submit form lead sau khi đổi RLS — cần chạy trên Supabase thật. Sau khi `db push`, kiểm tra ngay hai việc: (1) form lead ở trang chủ vẫn gửi được, (2) tài khoản admin của bạn vẫn vào được `/admin`.

---

## Đính chính bản audit đầu

Bản audit đầu tiên tôi nói *"mọi trang tour đều canonical về trang chủ"*. **Sai** — `TourDetail.tsx` vốn đã truyền `url` đúng cho từng tour. Tôi kết luận trước khi đọc hết file. Vấn đề thật chỉ ảnh hưởng `/admin` và `/auth`, nhẹ hơn nhiều so với tôi mô tả. ROADMAP.md mục 2.5 đã sửa lại.

Các phát hiện còn lại tôi đã đọc trực tiếp file migration và code để xác nhận trước khi viết.

---

## Bước tiếp theo

Giai đoạn 3 — migrate Next.js — chưa bắt đầu. Trước khi làm, cần bạn trả lời 5 câu ở cuối `ROADMAP.md`, đặc biệt là **câu 3**: nếu vẫn còn người sửa site qua Lovable thì migrate sang Next.js sẽ cắt đứt luồng làm việc đó.
