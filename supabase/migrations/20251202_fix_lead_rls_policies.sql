-- Create RLS policies for lead_submissions table

-- Allow public to insert leads (for form submission)
CREATE POLICY "Allow public insert on lead_submissions"
ON lead_submissions FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow authenticated users to read all leads (for admin)
CREATE POLICY "Allow authenticated read on lead_submissions"
ON lead_submissions FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to update leads (for admin)
CREATE POLICY "Allow authenticated update on lead_submissions"
ON lead_submissions FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete leads (for admin)
CREATE POLICY "Allow authenticated delete on lead_submissions"
ON lead_submissions FOR DELETE
TO authenticated
USING (true);