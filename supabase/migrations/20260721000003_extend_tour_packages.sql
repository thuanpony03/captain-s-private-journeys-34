-- =============================================================================
-- Mở rộng tour_packages cho trang tour nâng cấp (BRIEF_NANG_CAP.md — Phần 4).
-- =============================================================================

ALTER TABLE public.tour_packages
  ADD COLUMN IF NOT EXISTS itinerary JSONB,             -- [{day,title,description,image_url,meals,hotel}]
  ADD COLUMN IF NOT EXISTS inclusions TEXT[],
  ADD COLUMN IF NOT EXISTS exclusions TEXT[],
  ADD COLUMN IF NOT EXISTS gallery_urls TEXT[],
  ADD COLUMN IF NOT EXISTS faqs JSONB,                  -- [{question,answer}]
  ADD COLUMN IF NOT EXISTS price_from NUMERIC,
  ADD COLUMN IF NOT EXISTS departure_note TEXT,
  ADD COLUMN IF NOT EXISTS max_group_size INT,
  ADD COLUMN IF NOT EXISTS destination TEXT,            -- 'my' | 'uc' | 'chau-au' | 'canada'
  ADD COLUMN IF NOT EXISTS video_url TEXT,
  ADD COLUMN IF NOT EXISTS related_story_slugs TEXT[];

CREATE INDEX IF NOT EXISTS idx_tour_packages_destination ON public.tour_packages(destination);

-- Gắn destination cho 3 tour có sẵn để landing page thị trường có dữ liệu ngay.
UPDATE public.tour_packages SET destination = 'my' WHERE slug = 'us-west-coast' AND destination IS NULL;
UPDATE public.tour_packages SET destination = 'uc' WHERE slug = 'australia-grand' AND destination IS NULL;
UPDATE public.tour_packages SET destination = 'chau-au' WHERE slug = 'european-classic' AND destination IS NULL;
