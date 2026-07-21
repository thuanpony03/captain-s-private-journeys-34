# Vinh Around — Private Tour Mỹ Úc Châu Âu

Website [vinharound.com](https://vinharound.com). Next.js 16 (App Router) + Supabase, deploy trên Cloudflare Workers.

## Bắt đầu

```bash
cp .env.example .env.local     # điền NEXT_PUBLIC_SUPABASE_URL và ANON_KEY
npm install
npm run dev                    # http://localhost:3000
```

## Scripts

| Lệnh | Việc |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Build production |
| `npm run lint` | ESLint |
| `npm run preview` | Build OpenNext rồi chạy thử trên runtime Workers |
| `npm run deploy` | Build và deploy lên Cloudflare |

## Cấu trúc

```
app/                      Route (App Router)
  layout.tsx              Layout gốc, metadata mặc định, GA4 + Meta Pixel
  page.tsx                Trang chủ (ISR 1h)
  tour/[slug]/page.tsx    Trang tour — generateMetadata + ISR
  admin/, auth/           Có guard phía server
  sitemap.ts, robots.ts   Sinh động từ Supabase
src/
  components/             UI (shadcn trong ui/)
  lib/seo.ts              Hằng số SEO dùng chung
  lib/auth-guard.ts       Kiểm tra quyền admin phía server
  lib/supabase/           Client cho browser và server
supabase/migrations/      Schema và RLS policy
```

## Tài liệu

- **[DEPLOY.md](./DEPLOY.md)** — deploy Cloudflare, checklist, những gì đã/chưa kiểm chứng
- **[FIXES_APPLIED.md](./FIXES_APPLIED.md)** — các lỗi bảo mật và SEO đã vá
- **[ROADMAP.md](./ROADMAP.md)** — audit đầy đủ và kế hoạch dài hạn

## Lưu ý

Project này từng do Lovable sinh ra. Sau khi chuyển sang Next.js, **Lovable không còn sửa được** — mọi thay đổi làm trực tiếp trong repo. Bản Vite cũ vẫn còn ở nhánh `main`.
