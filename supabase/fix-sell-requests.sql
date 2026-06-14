-- Satış talepleri tablosu yoksa oluştur (Supabase SQL Editor → Run)

CREATE TABLE IF NOT EXISTS sell_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INT,
  mileage INT,
  transmission TEXT,
  fuel_type TEXT,
  description TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE sell_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can insert sell requests" ON sell_requests;
CREATE POLICY "Public can insert sell requests" ON sell_requests
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can read sell requests" ON sell_requests;
CREATE POLICY "Admins can read sell requests" ON sell_requests
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid())
  );

DROP POLICY IF EXISTS "Admins can update sell requests" ON sell_requests;
CREATE POLICY "Admins can update sell requests" ON sell_requests
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid())
  );
