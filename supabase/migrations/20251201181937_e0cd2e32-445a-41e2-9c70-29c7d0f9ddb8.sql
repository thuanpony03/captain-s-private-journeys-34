-- Create table for site content (text, URLs, etc)
CREATE TABLE IF NOT EXISTS public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'text', -- text, url, html, json
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id),
  UNIQUE(section, key)
);

-- Create table for media uploads (images, videos)
CREATE TABLE IF NOT EXISTS public.site_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  section TEXT NOT NULL,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL, -- image, video
  alt_text TEXT,
  width INTEGER,
  height INTEGER,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create table for tour packages
CREATE TABLE IF NOT EXISTS public.tour_packages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  tagline TEXT,
  route TEXT,
  description TEXT,
  duration TEXT,
  price TEXT,
  image_url TEXT,
  stops JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_packages ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Public read, admin write
CREATE POLICY "Anyone can read site_content"
  ON public.site_content FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage site_content"
  ON public.site_content FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Anyone can read site_media"
  ON public.site_media FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage site_media"
  ON public.site_media FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Anyone can read tour_packages"
  ON public.tour_packages FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage tour_packages"
  ON public.tour_packages FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Insert default content for hero section
INSERT INTO public.site_content (section, key, value, type) VALUES
  ('hero', 'headline_line1', 'Đừng đi du lịch', 'text'),
  ('hero', 'headline_line2', 'như khách', 'text'),
  ('hero', 'headline_line3', 'Đi như "người nhà" cùng Vinh', 'text'),
  ('hero', 'video_url', 'https://cdn.pixabay.com/video/2023/10/12/184734-873923034_large.mp4', 'url'),
  ('hero', 'cta_text', 'ĐẶT LỊCH CÙNG VINH', 'text'),
  ('hero', 'badge_text', 'Còn 2 slot tháng này', 'text'),
  ('personal_story', 'name', 'Vinh Around', 'text'),
  ('personal_story', 'title', 'Road Captain with 10+ Years Experience', 'text'),
  ('personal_story', 'intro', 'Chào bạn, tôi là Vinh Around.', 'text'),
  ('personal_story', 'experience', '10 năm cầm lái', 'text'),
  ('personal_story', 'quote', 'Người Việt mình đi du lịch KHỔ quá!', 'text')
ON CONFLICT (section, key) DO NOTHING;

-- Insert default tour packages
INSERT INTO public.tour_packages (title, tagline, route, description, duration, price, image_url, stops, order_index) VALUES
  (
    'US West Coast',
    'California Dreaming',
    'LA → San Francisco',
    'Cung đường huyền thoại bờ Tây nước Mỹ',
    '10 ngày',
    '$3,500',
    'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1200&q=80',
    '["Los Angeles", "Santa Barbara", "Big Sur", "San Francisco"]'::jsonb,
    1
  ),
  (
    'Australia Grand',
    'Down Under Adventure',
    'Sydney → Melbourne',
    'Great Ocean Road và bãi biển tuyệt đẹp',
    '14 ngày',
    '$4,200',
    'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&q=80',
    '["Sydney", "Blue Mountains", "Great Ocean Road", "Melbourne"]'::jsonb,
    2
  ),
  (
    'European Classic',
    'Old World Charm',
    'Paris → Rome',
    'Kinh đô văn hóa và nghệ thuật châu Âu',
    '12 ngày',
    '$3,800',
    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80',
    '["Paris", "Geneva", "Florence", "Rome"]'::jsonb,
    3
  )
ON CONFLICT DO NOTHING;

-- Create update trigger for site_content
CREATE OR REPLACE FUNCTION update_site_content_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER site_content_update_timestamp
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION update_site_content_timestamp();

-- Create update trigger for site_media
CREATE TRIGGER site_media_update_timestamp
BEFORE UPDATE ON public.site_media
FOR EACH ROW
EXECUTE FUNCTION update_site_content_timestamp();

-- Create update trigger for tour_packages
CREATE TRIGGER tour_packages_update_timestamp
BEFORE UPDATE ON public.tour_packages
FOR EACH ROW
EXECUTE FUNCTION update_site_content_timestamp();