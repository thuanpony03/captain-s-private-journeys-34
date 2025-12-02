-- Add slug column to tour_packages for SEO-friendly URLs
ALTER TABLE tour_packages 
ADD COLUMN slug text;

-- Create unique index on slug
CREATE UNIQUE INDEX tour_packages_slug_key ON tour_packages(slug) WHERE slug IS NOT NULL;

-- Generate slugs from existing titles (convert to lowercase, replace spaces with hyphens, remove special chars)
UPDATE tour_packages 
SET slug = lower(
  regexp_replace(
    regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
    '\s+', '-', 'g'
  )
)
WHERE slug IS NULL;