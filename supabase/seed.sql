-- Örnek araç verileri (schema.sql'den sonra çalıştırın)
INSERT INTO vehicles (slug, brand, model, title, year, mileage, transmission, fuel_type, price, status, description_de, description_en, description_tr, images, featured, published) VALUES
('ferrari-488-gtb-2019', 'Ferrari', '488 GTB', 'Ferrari 488 GTB', 2019, 28500, 'automatic', 'petrol', 189900, 'available',
 'Atemberaubender Ferrari 488 GTB in Rosso Corsa. Vollständige Servicehistorie.',
 'Stunning Ferrari 488 GTB in Rosso Corsa. Full service history.',
 'Rosso Corsa renginde muhteşem Ferrari 488 GTB. Tam servis geçmişi.',
 ARRAY['https://images.unsplash.com/photo-1583121270602-767962136fee?w=1200&q=80'], true, true),
('porsche-911-carrera-s-2021', 'Porsche', '911 Carrera S', 'Porsche 911 Carrera S', 2021, 15200, 'automatic', 'petrol', 124900, 'available',
 'Porsche 911 Carrera S mit Sport Chrono Paket.',
 'Porsche 911 Carrera S with Sport Chrono package.',
 'Sport Chrono paketi ile Porsche 911 Carrera S.',
 ARRAY['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80'], true, true),
('bmw-m4-competition-2023', 'BMW', 'M4 Competition', 'BMW M4 Competition xDrive', 2023, 8900, 'automatic', 'petrol', 89900, 'in_transit',
 'BMW M4 Competition — vermittelter Import unterwegs.',
 'BMW M4 Competition — import in transit.',
 'BMW M4 Competition — ithalat sürecinde.',
 ARRAY['https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&q=80'], true, true)
ON CONFLICT (slug) DO NOTHING;

-- İlk admin profili oluşturmak için:
-- 1. Supabase Dashboard > Authentication > Users > Add user (email + password)
-- 2. Aşağıdaki SQL'de USER_UUID ve email'i değiştirin:

-- INSERT INTO admin_profiles (id, email, name, role, permissions)
-- VALUES ('USER_UUID', 'admin@autohausaker.de', 'Can Aker', 'super_admin',
--   '{"vehicles":true,"settings":true,"sell_requests":true,"users":true}'::jsonb);
