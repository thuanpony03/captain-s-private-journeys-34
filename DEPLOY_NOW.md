# Deploy — các lệnh cần chạy

Tôi đã merge xong Next.js vào `main` ở máy bạn và build sạch. **Nhưng tôi không deploy hộ được:** sandbox của tôi không có quyền GitHub, không có Cloudflare API token, và bị chặn ra `api.cloudflare.com`. Phần còn lại phải chạy từ terminal của bạn.

Toàn bộ khoảng 15 phút. Mở terminal tại `~/Downloads/captain-private-journeys`.

---

## Bước 0 — Vá bảo mật Supabase (làm trước, đừng bỏ qua)

Chuyện này độc lập với deploy và vẫn đang hở.

**a. Tắt đăng ký công khai**
Supabase Dashboard → Authentication → Providers → Email → tắt *Allow new users to sign up*.

**b. Xem có ai lạ đã chiếm quyền admin chưa** — SQL Editor:

```sql
SELECT u.email, u.created_at, r.role
FROM auth.users u JOIN user_roles r ON r.user_id = u.id
WHERE r.role = 'admin' ORDER BY u.created_at DESC;
```

**c. Chạy 2 migration**

Mở `supabase/migrations/20260721000000_revoke_blanket_admin.sql`, kiểm tra mảng `allowed_admin_emails` đúng email admin thật của bạn. Rồi:

```bash
supabase db push
```

Không dùng Supabase CLI thì dán nội dung 2 file `20260721000000_*.sql` và `20260721000001_*.sql` vào SQL Editor, theo đúng thứ tự đó.

> Bạn nói đã fix `give_all_users_admin` rồi. Lỗ hổng RLS `USING (true)` trên `lead_submissions` là **vấn đề khác** — vẫn cho mọi tài khoản đăng nhập đọc toàn bộ lead khách hàng. File `20260721000001_harden_lead_rls.sql` xử lý cái đó.

---

## Bước 1 — Đẩy code lên GitHub

```bash
cd ~/Downloads/captain-private-journeys
git log --oneline -3      # xem lại trước khi đẩy
git push origin main
```

Đây là lúc **Lovable chính thức mất tác dụng**. Repo sau commit này là Next.js, Lovable sẽ không parse được nữa.

Muốn giữ đường lui thì tạo tag ở bản Vite cuối trước khi push:

```bash
git tag vite-final 81e2f1f
git push origin vite-final
```

---

## Bước 2 — Đăng nhập Cloudflare

```bash
npx wrangler login
```

Mở trình duyệt, cấp quyền. Kiểm tra:

```bash
npx wrangler whoami
```

---

## Bước 3 — Tạo KV namespace cho ISR cache

```bash
npx wrangler kv namespace create NEXT_INC_CACHE_KV
```

Output có dạng:

```
{ "binding": "NEXT_INC_CACHE_KV", "id": "abc123def456..." }
```

Copy `id` đó, mở `wrangler.jsonc`, thay `THAY_BANG_KV_NAMESPACE_ID` bằng nó.

Bỏ qua bước này thì bước 5 sẽ lỗi.

---

## Bước 4 — Điền biến môi trường

```bash
cp .env.example .env.local
```

Mở `.env.local`, điền `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Supabase Dashboard → Project Settings → API).

Rồi khai cho phía server trên Cloudflare:

```bash
npx wrangler secret put NEXT_PUBLIC_SUPABASE_URL
npx wrangler secret put NEXT_PUBLIC_SUPABASE_ANON_KEY
```

> Phải làm cả hai chỗ. `NEXT_PUBLIC_*` được nhúng vào bundle lúc build (cần `.env.local`), đồng thời server cũng đọc lúc chạy (cần wrangler secret).

---

## Bước 5 — Deploy thử

```bash
npm run deploy
```

Xong sẽ ra URL kiểu `vinharound.<tên-account>.workers.dev`.

**Test trên URL này trước, đừng trỏ domain vội.** Checklist:

- [ ] Trang chủ hiện đúng, animation chạy
- [ ] `/tour/<slug>` load được, ảnh hiện
- [ ] Gửi thử form lead → có vào Supabase, có email báo
- [ ] Đăng nhập `/admin` bằng tài khoản admin → vào được
- [ ] `/robots.txt` và `/sitemap.xml` trả đúng, sitemap **có URL tour**
- [ ] Dán link tour vào [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) → hiện đúng title và ảnh **của tour**, không phải trang chủ

Cái cuối là thứ cả cuộc migrate nhắm tới. Nếu nó vẫn sai thì có gì đó chưa đúng, gửi tôi biết.

---

## Bước 6 — Trỏ domain

Chỉ làm khi bước 5 đã xanh hết.

1. Cloudflare Dashboard → Websites → Add a site → `vinharound.com`
2. Đổi nameserver ở nơi mua domain sang nameserver Cloudflare cấp
3. Đợi DNS lan (vài phút đến vài giờ)
4. Mở `wrangler.jsonc`, bỏ comment khối `routes` ở cuối file
5. `npm run deploy`
6. **Gỡ custom domain khỏi Lovable** — không thì hai bên giành nhau

---

## Bước 7 — CI/CD (tuỳ chọn)

`.github/workflows/deploy.yml` đã sẵn. GitHub repo → Settings → Secrets and variables → Actions, thêm:

`NEXT_PUBLIC_SUPABASE_URL` · `NEXT_PUBLIC_SUPABASE_ANON_KEY` · `NEXT_PUBLIC_SITE_URL` · `NEXT_PUBLIC_GA_ID` · `NEXT_PUBLIC_FB_PIXEL_ID` · `CLOUDFLARE_API_TOKEN` · `CLOUDFLARE_ACCOUNT_ID`

API token: Cloudflare → My Profile → API Tokens → template *Edit Cloudflare Workers*.

Từ đó push `main` là tự deploy.

---

## Sau khi domain đã chạy

- Google Search Console → thêm property → submit `https://vinharound.com/sitemap.xml`
- Bing Webmaster Tools tương tự
- Chạy Lighthouse, so với bản cũ
- Kiểm tra GA4 và Meta Pixel còn nhận event (đã chuyển sang `strategy="afterInteractive"`)

---

## Nếu hỏng

Bản Vite cũ vẫn nguyên:

```bash
git checkout vite-final     # nếu đã tag ở bước 1
# hoặc
git checkout 81e2f1f
```

Lovable vẫn chạy được với bản đó — miễn là bạn chưa gỡ kết nối bên Lovable.

---

## Tôi đã kiểm chứng những gì

| | |
|---|---|
| `npm run build` trên máy bạn | ✅ 5 route |
| TypeScript | ✅ sạch |
| `opennextjs-cloudflare build` | ✅ worker.js + 3.6 MB assets |
| SSR trả HTML thật | ✅ 229 KB có nội dung, so với 8.6 KB shell rỗng của bản Vite |
| Meta tag nằm trong HTML server | ✅ title, canonical, og:* |
| `/robots.txt`, `/sitemap.xml` | ✅ |
| Merge vào `main` | ✅ sạch, không xung đột |

**Chưa kiểm chứng được** vì sandbox không ra được Supabase và Cloudflare:

- Trang tour với dữ liệu thật (lúc build ở đây `generateStaticParams` trả mảng rỗng, không có tour nào để render)
- Luồng đăng nhập admin và guard phân quyền
- `wrangler deploy` chạy thật

Ba thứ này bước 5 sẽ lộ ra ngay. Có lỗi thì gửi tôi log đầy đủ.
