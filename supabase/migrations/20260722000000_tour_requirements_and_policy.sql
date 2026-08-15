-- =============================================================================
-- Thêm field cho trang tour chi tiết chuyên nghiệp hơn khi chạy quảng cáo:
-- requirements  — checklist "Yêu cầu tham gia" (dùng cho tour tự lái/đặc thù)
-- cancellation_policy — { deposit: text, tiers: [{time,rate}] } RIÊNG của tour,
--   khác chính sách chung ở /chinh-sach (vd tour Canada có mức phạt hủy khác
--   tour trọn gói thường vì vé máy bay/Airbnb khó hoàn). NULL thì trang tour
--   vẫn dùng chính sách chung, không có gì đổi.
-- price_currency — mặc định VND; set 'USD' cho tour niêm yết giá USD (đúng
--   như tài liệu campaign gốc) để JSON-LD Offer không khai sai loại tiền.
-- =============================================================================

ALTER TABLE public.tour_packages
  ADD COLUMN IF NOT EXISTS requirements TEXT[],
  ADD COLUMN IF NOT EXISTS cancellation_policy JSONB,
  ADD COLUMN IF NOT EXISTS price_currency TEXT NOT NULL DEFAULT 'VND';
