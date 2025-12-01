-- Setup Supabase Storage for image uploads
-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for images bucket
-- Allow public read access
CREATE POLICY "Public Access for Images" ON storage.objects 
FOR SELECT 
USING (bucket_id = 'images');

-- Allow authenticated admin users to upload
CREATE POLICY "Admin Upload Images" ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
  AND EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Allow authenticated admin users to update
CREATE POLICY "Admin Update Images" ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
  AND EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Allow authenticated admin users to delete
CREATE POLICY "Admin Delete Images" ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
  AND EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);