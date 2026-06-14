-- Autohaus AKER Database Schema
-- Supabase SQL Editor'da çalıştırın

-- Site ayarları (tek satır)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT DEFAULT '+49 176 32510469',
  whatsapp TEXT DEFAULT '+49 176 32510469',
  email TEXT DEFAULT 'info@autohausaker.de',
  address TEXT DEFAULT 'Grandkaule 7, 53859 Niederkassel',
  company_name TEXT DEFAULT 'Autohaus AKER',
  managing_director TEXT DEFAULT 'Can Aker',
  vat_id TEXT DEFAULT 'DE450759875',
  opening_hours JSONB DEFAULT '{"de":"Mo–Fr: 09:00–18:00, Sa: 10:00–14:00","en":"Mon–Fri: 09:00–18:00, Sat: 10:00–14:00","tr":"Pzt–Cum: 09:00–18:00, Cmt: 10:00–14:00"}'::jsonb,
  social_instagram TEXT,
  social_facebook TEXT,
  import_weeks_min INT DEFAULT 8,
  import_weeks_max INT DEFAULT 12,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO site_settings (id) VALUES ('00000000-0000-0000-0000-000000000001')
ON CONFLICT (id) DO NOTHING;

-- Araç ilanları
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  title TEXT NOT NULL,
  year INT,
  mileage INT,
  transmission TEXT CHECK (transmission IN ('automatic', 'manual')),
  fuel_type TEXT CHECK (fuel_type IN ('petrol', 'diesel', 'electric', 'hybrid', 'plugin_hybrid')),
  price DECIMAL(12,2),
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'in_transit')),
  description_de TEXT,
  description_en TEXT,
  description_tr TEXT,
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vehicles_published ON vehicles(published);
CREATE INDEX IF NOT EXISTS idx_vehicles_featured ON vehicles(featured);
CREATE INDEX IF NOT EXISTS idx_vehicles_brand ON vehicles(brand);
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(status);

-- Aracını sat formları
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

-- Admin profilleri (Supabase Auth ile bağlı)
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('super_admin', 'editor', 'viewer')),
  permissions JSONB DEFAULT '{"vehicles":true,"settings":false,"sell_requests":true,"users":false}'::jsonb,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sell_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Public read for published vehicles
CREATE POLICY "Public can read published vehicles" ON vehicles
  FOR SELECT USING (published = true);

-- Public read settings
CREATE POLICY "Public can read settings" ON site_settings
  FOR SELECT USING (true);

-- Public insert sell requests
CREATE POLICY "Public can insert sell requests" ON sell_requests
  FOR INSERT WITH CHECK (true);

-- Admin policies (authenticated users with admin profile)
CREATE POLICY "Admins can manage vehicles" ON vehicles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid())
  );

CREATE POLICY "Admins can manage settings" ON site_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid() AND role IN ('super_admin', 'editor')
    )
  );

CREATE POLICY "Admins can read sell requests" ON sell_requests
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid())
  );

CREATE POLICY "Admins can update sell requests" ON sell_requests
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid())
  );

CREATE POLICY "Admins can read profiles" ON admin_profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid())
  );

CREATE POLICY "Super admin can manage profiles" ON admin_profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER vehicles_updated_at BEFORE UPDATE ON vehicles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER admin_profiles_updated_at BEFORE UPDATE ON admin_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
