-- =============================================================================
-- Thêm cột UTM vào lead_submissions — biết lead đến từ campaign nào.
-- =============================================================================

ALTER TABLE public.lead_submissions
  ADD COLUMN IF NOT EXISTS utm_source text,
  ADD COLUMN IF NOT EXISTS utm_medium text,
  ADD COLUMN IF NOT EXISTS utm_campaign text,
  ADD COLUMN IF NOT EXISTS landing_page text;
