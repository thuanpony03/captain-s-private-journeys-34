-- =============================================================================
-- Blog (blog_posts) + Social proof (testimonials) — BRIEF_NANG_CAP.md Phần 7, 8.
--
-- Viết idempotent (CREATE TABLE IF NOT EXISTS + ADD COLUMN IF NOT EXISTS):
-- lịch sử migration của repo có một bản tour_packages/blog_posts cũ
-- (20251201170000_cms_content_tables.sql) không rõ đã chạy trên DB thật hay
-- chưa — script này an toàn dù chạy trên DB đã có sẵn table hay chưa.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'cam-nang' CHECK (category IN ('chuyen-di', 'cam-nang')),
  ADD COLUMN IF NOT EXISTS destination TEXT,
  ADD COLUMN IF NOT EXISTS tour_slug TEXT,
  ADD COLUMN IF NOT EXISTS reading_time INT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS og_image TEXT;

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);

CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_image TEXT,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  destination TEXT,
  tour_date DATE,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'hidden')),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.testimonials
  ADD COLUMN IF NOT EXISTS video_url TEXT,
  ADD COLUMN IF NOT EXISTS tour_slug TEXT,
  ADD COLUMN IF NOT EXISTS family_size INT,
  ADD COLUMN IF NOT EXISTS highlight TEXT;

CREATE INDEX IF NOT EXISTS idx_testimonials_status ON public.testimonials(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_destination ON public.testimonials(destination);
CREATE INDEX IF NOT EXISTS idx_testimonials_tour_slug ON public.testimonials(tour_slug);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read published blog_posts" ON public.blog_posts;
CREATE POLICY "Anyone can read published blog_posts"
  ON public.blog_posts FOR SELECT
  TO public
  USING (status = 'published');

DROP POLICY IF EXISTS "Admins can manage blog_posts" ON public.blog_posts;
CREATE POLICY "Admins can manage blog_posts"
  ON public.blog_posts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Anyone can read published testimonials" ON public.testimonials;
CREATE POLICY "Anyone can read published testimonials"
  ON public.testimonials FOR SELECT
  TO public
  USING (status = 'published');

DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;
CREATE POLICY "Admins can manage testimonials"
  ON public.testimonials FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'
    )
  );
