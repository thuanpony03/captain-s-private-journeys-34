-- Fix function search path security warning
DROP FUNCTION IF EXISTS update_site_content_timestamp() CASCADE;

CREATE OR REPLACE FUNCTION update_site_content_timestamp()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate triggers
CREATE TRIGGER site_content_update_timestamp
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION update_site_content_timestamp();

CREATE TRIGGER site_media_update_timestamp
BEFORE UPDATE ON public.site_media
FOR EACH ROW
EXECUTE FUNCTION update_site_content_timestamp();

CREATE TRIGGER tour_packages_update_timestamp
BEFORE UPDATE ON public.tour_packages
FOR EACH ROW
EXECUTE FUNCTION update_site_content_timestamp();