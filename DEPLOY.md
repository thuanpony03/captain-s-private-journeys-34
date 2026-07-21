# Deploy lên Cloudflare Workers

Next.js 16 + OpenNext adapter. Nhánh `security-seo-fixes`.

---

## Trạng thái

Đã merge vào `main`. Từ commit `9981c25`, **Lovable không còn sửa được project này** — nó làm việc với Vite SPA, không hiểu App Router.

Bản Vite cuối cùng vẫn ở commit `81e2f1f`, quay lại được bất cứ lúc nào.

**Các bước deploy cụ thể xem [DEPLOY_NOW.md](./DEPLOY_NOW.md).** File này là tài liệu tham khảo.

---

## Chạy thử ở máy

```bash
cp .env.example .env.local     # điền NEXT_PUBLIC_SUPABASE_URL và ANON_KEY
npm install
npm run dev                    # http://localhost:3000
```

---

## Deploy lần đầu

### 1. Tạo KV namespace cho ISR cache

```bash
npx wrangler kv namespace create NEXT_INC_CACHE_KV
```

Copy `id` trả về, dán vào `wrangler.jsonc` thay cho `THAY_BANG_KV_NAMESPACE_ID`.

Bỏ qua bước này thì deploy sẽ lỗi. KV là nơi lưu HTML render sẵn của trang tour — không có nó thì mỗi edge location phải tự render lại từ đầu.

### 2. Khai secret

```bash
npx wrangler secret put NEXT_PUBLIC_SUPABASE_URL
npx wrangler secret put NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Lưu ý: biến `NEXT_PUBLIC_*` được **nhúng vào bundle lúc build**, nên chúng cũng phải có mặt trong môi trường build (`.env.local` ở máy, hoặc GitHub Secrets trong CI). Khai secret ở Wrangler là cho phía server.

### 3. Deploy

```bash
npm run deploy
```

Xong sẽ có URL `vinharound.<account>.workers.dev`. **Test kỹ trên URL này trước khi trỏ domain.**

### 4. Trỏ domain

Sau khi bản workers.dev chạy đúng:

1. Thêm `vinharound.com` vào Cloudflare (Websites → Add a site), đổi nameserver ở nhà cung cấp domain.
2. Bỏ comment khối `routes` trong `wrangler.jsonc`, deploy lại.
3. Gỡ custom domain khỏi Lovable để tránh hai bên cùng giành.

### 5. CI/CD

`.github/workflows/deploy.yml` đã sẵn. Thêm GitHub Secrets:

`NEXT_PUBLIC_SUPABASE_URL` · `NEXT_PUBLIC_SUPABASE_ANON_KEY` · `NEXT_PUBLIC_SITE_URL` · `NEXT_PUBLIC_GA_ID` · `NEXT_PUBLIC_FB_PIXEL_ID` · `CLOUDFLARE_API_TOKEN` · `CLOUDFLARE_ACCOUNT_ID`

API token tạo tại Cloudflare → My Profile → API Tokens → template *Edit Cloudflare Workers*.

Push `main` → deploy production. PR → chỉ build để bắt lỗi sớm.

---

## Checklist sau khi deploy

- [ ] Trang chủ hiện đúng, animation chạy
- [ ] `/tour/<slug>` load được, ảnh hiện
- [ ] **Dán link tour vào [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)** — phải hiện đúng title và ảnh của tour, không phải trang chủ. Đây là thứ cả cuộc migrate nhắm tới.
- [ ] Gửi thử form lead → có ghi vào Supabase, có email báo
- [ ] Đăng nhập `/admin` bằng tài khoản admin → vào được
- [ ] Đăng nhập bằng tài khoản thường → bị đá về trang chủ
- [ ] `curl -s https://vinharound.com/robots.txt` và `/sitemap.xml` trả đúng
- [ ] Submit sitemap trong Google Search Console
- [ ] Chạy Lighthouse, so với số cũ

---

## Đã kiểm chứng những gì

| | Kết quả |
|---|---|
| `npm run build` | ✅ 5 route |
| TypeScript | ✅ sạch |
| `opennextjs-cloudflare build` | ✅ worker.js + 3.6 MB assets |
| SSR trả HTML thật | ✅ 229 KB có nội dung, so với 8.6 KB shell rỗng của bản Vite |
| Meta tag trong HTML server | ✅ title, canonical, og:* đều có sẵn |
| `/robots.txt`, `/sitemap.xml` | ✅ |

**Chưa kiểm chứng được** (sandbox không gọi ra Supabase và Cloudflare):

- Trang tour render với dữ liệu thật — `generateStaticParams` trả mảng rỗng lúc build ở đây, nên chưa có trang tour nào được sinh sẵn để xem.
- Luồng đăng nhập admin và guard phân quyền.
- `wrangler deploy` chạy thật.

Ba thứ này cần bạn chạy ở máy có mạng. Nếu lỗi, gửi tôi log.

---

## Khác biệt so với bản Vite

| | Vite (main) | Next.js (nhánh này) |
|---|---|---|
| Render | SPA, HTML rỗng | SSR + ISR, HTML đầy đủ |
| Meta tag trang tour | react-helmet, chỉ chạy sau khi JS load | có sẵn trong HTML server |
| Share Facebook/Zalo | hiện sai — title và ảnh trang chủ | đúng từng tour |
| Routing | react-router-dom | App Router |
| Bảo vệ `/admin` | chỉ ở client | kiểm tra ở server trước khi render |
| Sitemap | script chạy lúc build | `app/sitemap.ts`, tự làm mới mỗi giờ |
| Session Supabase | localStorage | cookie (server đọc được) |
| Deploy | Lovable Publish | Cloudflare Workers |

### Vài quyết định trong lúc làm

**Không có middleware.** Tôi định chặn `/admin` bằng middleware nhưng Next 16 không cho `proxy.ts` chạy Edge runtime, còn OpenNext trên Workers lại chưa hỗ trợ middleware Node runtime — hai bên loại trừ nhau. Chuyển sang kiểm tra ngay trong Server Component (`src/lib/auth-guard.ts`): hiệu quả tương đương, request bị chặn trước khi render.

**Font vẫn nạp qua `<link>`,** chưa dùng `next/font`. Sandbox không tải được Google Fonts lúc build nên tôi không kiểm chứng được. Máy bạn có mạng thì đổi sang `next/font/google` là nâng cấp dễ và đáng làm — bỏ được 2 request cross-origin và hết layout shift.

**Đã gỡ khỏi dependencies:** `@react-three/fiber`, `@react-three/drei` (không chỗ nào import), `recharts` (chỉ nằm trong file shadcn boilerplate không ai dùng), `react-helmet-async`, `react-router-dom`, `vite`, `lovable-tagger`. Cũng xoá 8 file component chết (`*_temp.tsx`, `*.old.tsx`, `HeroSection`, `HorizontalGallery`, `ParallaxShowcase`, `NavLink`, `ui/chart`) — không file nào được import. Riêng việc bỏ drei còn giải quyết luôn xung đột peer dependency khiến `npm install` phải dùng `--legacy-peer-deps`.

`@studio-freight/lenis` đổi sang `lenis` (package cũ đã đổi tên và ngừng hỗ trợ).

---

## Còn lại chưa làm

Nằm ngoài phạm vi lần này, xếp theo mức đáng làm:

1. **Consent banner** trước khi bắn GA4/Pixel — cần nếu có khách EU.
2. **Meta Conversions API** server-side qua Worker — chống mất dữ liệu do iOS/ad blocker, ảnh hưởng trực tiếp chất lượng tối ưu quảng cáo.
3. **Trang landing theo tuyến** (`/tour/my`, `/tour/uc`, `/tour/chau-au`) thay vì gom hết vào anchor trang chủ.
4. **Blog** — bảng `blog_posts` đã có sẵn trong schema nhưng chưa dùng. Đây là kênh SEO từ khoá dài rẻ nhất.
5. **Dọn ~39 lỗi lint** có sẵn từ trước (chủ yếu `no-explicit-any`).
6. **`next/font`** như nói ở trên.
7. **R2 thay Supabase Storage** cho ảnh — egress miễn phí.
8. **Turnstile** chống spam form lead.
