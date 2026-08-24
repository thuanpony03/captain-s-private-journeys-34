-- =============================================================================
-- Gói SEO/AEO 24/08/2026 (vinharound-seo-handoff):
--
-- tour_packages.meta_title / meta_description — tiêu đề/mô tả SEO tách riêng
--   khỏi title/description hiển thị. Trước đây generateMetadata() dùng thẳng
--   tour.title làm thẻ <title> và tour.description cắt 160 ký tự làm meta
--   description — nghĩa là muốn tối ưu title tag theo từ khoá thì phải đổi
--   luôn H1 hiển thị (không được phép, theo yêu cầu giữ nguyên design/H1).
--   Có cột riêng thì generateMetadata ưu tiên meta_title/meta_description khi
--   có, fallback về title/description khi NULL — không phá trang nào đang chạy.
--
-- blog_posts.faq — mảng [{q,a}] SSR ngay trong bài (không phải câu hỏi rời
--   client-side), dùng để vừa render UI vừa generate FAQPage JSON-LD từ CÙNG
--   một nguồn dữ liệu thay vì hardcode 2 chỗ dễ lệch nhau.
-- =============================================================================

ALTER TABLE public.tour_packages
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT;

ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS faq JSONB;
