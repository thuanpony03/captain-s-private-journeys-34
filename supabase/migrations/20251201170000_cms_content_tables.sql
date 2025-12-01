-- CMS Content Tables Migration
-- Create blog_posts table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create galleries table
CREATE TABLE galleries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create gallery_images table
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id UUID REFERENCES galleries(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create testimonials table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_image TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  destination TEXT,
  tour_date DATE,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'hidden')),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create tour_packages table
CREATE TABLE tour_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  destination TEXT NOT NULL,
  duration_days INTEGER NOT NULL,
  max_group_size INTEGER DEFAULT 6,
  price_from DECIMAL(12,2),
  price_to DECIMAL(12,2),
  featured_image TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  inclusions JSONB DEFAULT '[]'::jsonb,
  exclusions JSONB DEFAULT '[]'::jsonb,
  itinerary JSONB DEFAULT '[]'::jsonb,
  highlights JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create website_settings table
CREATE TABLE website_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  type TEXT DEFAULT 'text' CHECK (type IN ('text', 'number', 'boolean', 'json', 'image')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);

CREATE INDEX idx_galleries_status ON galleries(status);
CREATE INDEX idx_gallery_images_gallery_id ON gallery_images(gallery_id);
CREATE INDEX idx_gallery_images_sort_order ON gallery_images(sort_order);

CREATE INDEX idx_testimonials_status ON testimonials(status);
CREATE INDEX idx_testimonials_featured ON testimonials(featured);
CREATE INDEX idx_testimonials_rating ON testimonials(rating);

CREATE INDEX idx_tour_packages_slug ON tour_packages(slug);
CREATE INDEX idx_tour_packages_status ON tour_packages(status);
CREATE INDEX idx_tour_packages_destination ON tour_packages(destination);
CREATE INDEX idx_tour_packages_featured ON tour_packages(featured);

CREATE INDEX idx_website_settings_key ON website_settings(key);

-- Enable RLS on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;

-- Insert default website settings
INSERT INTO website_settings (key, value, type, description) VALUES
  ('site_title', '"Vinh Around Private Tours"', 'text', 'Website title'),
  ('site_description', '"Dịch vụ tour du lịch riêng cao cấp với Vinh Around"', 'text', 'Website description'),
  ('company_name', '"Vinh Around Private Tours"', 'text', 'Company name'),
  ('contact_email', '"admin@passport.cafe"', 'text', 'Contact email'),
  ('contact_phone', '"+84 xxx xxx xxx"', 'text', 'Contact phone'),
  ('contact_address', '"Ho Chi Minh City, Vietnam"', 'text', 'Company address'),
  ('social_facebook', '""', 'text', 'Facebook URL'),
  ('social_instagram', '""', 'text', 'Instagram URL'),
  ('social_youtube', '""', 'text', 'YouTube URL'),
  ('google_analytics_id', '""', 'text', 'Google Analytics tracking ID'),
  ('seo_keywords', '"tour du lịch riêng, vinh around, private tour vietnam"', 'text', 'SEO keywords'),
  ('booking_limit_per_month', '2', 'number', 'Maximum bookings per month');