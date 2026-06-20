-- ============================================
-- Harithagiri Viharaya - Supabase Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. Committee Members (දායක සභාව)
-- ============================================
CREATE TABLE public.committee_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  name_si TEXT,
  role TEXT NOT NULL,
  role_si TEXT,
  phone TEXT,
  email TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 2. Donors (දායකයින්)
-- ============================================
CREATE TABLE public.donors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  name_si TEXT,
  contribution TEXT,
  amount DECIMAL(12,2),
  year TEXT,
  phone TEXT,
  address TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 3. Temple Places (විහාරස්ථානයේ ස්ථාන)
-- ============================================
CREATE TABLE public.temple_places (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  title_si TEXT,
  short_description TEXT,
  short_description_si TEXT,
  description TEXT,
  description_si TEXT,
  sub_heading TEXT,
  sub_heading_si TEXT,
  cover_image TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 4. Place Images (ස්ථාන ඡායාරූප)
-- ============================================
CREATE TABLE public.place_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  place_id UUID REFERENCES public.temple_places(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 5. Gallery Categories (ගැලරි කාණ්ඩ)
-- ============================================
CREATE TABLE public.gallery_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_si TEXT,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 6. Gallery Images (ගැලරි ඡායාරූප)
-- ============================================
CREATE TABLE public.gallery_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category_id UUID REFERENCES public.gallery_categories(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  title TEXT,
  title_si TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 7. Events / Uthsawa (උත්සව)
-- ============================================
CREATE TABLE public.events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  name_si TEXT,
  date TEXT,
  description TEXT,
  description_si TEXT,
  cover_image TEXT,
  youtube_id TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 8. Event Photos (උත්සව ඡායාරූප)
-- ============================================
CREATE TABLE public.event_photos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 9. Temple Officials (විහාර අධිකාරී)
-- ============================================
CREATE TABLE public.temple_officials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  name_si TEXT,
  title TEXT NOT NULL,
  title_si TEXT,
  image_url TEXT,
  bio TEXT,
  bio_si TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 10. Site Settings (අඩවි සැකසුම්)
-- ============================================
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 11. Latest Updates / News (නවතම යාවත්කාලීන)
-- ============================================
CREATE TABLE public.news_updates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  title_si TEXT,
  content TEXT,
  content_si TEXT,
  image_url TEXT,
  link TEXT,
  is_published BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Row Level Security (RLS)
-- ============================================
ALTER TABLE public.committee_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.temple_places ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.place_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.temple_officials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_updates ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables (website is public)
CREATE POLICY "Public read" ON public.committee_members FOR SELECT USING (true);
CREATE POLICY "Public read" ON public.donors FOR SELECT USING (true);
CREATE POLICY "Public read" ON public.temple_places FOR SELECT USING (true);
CREATE POLICY "Public read" ON public.place_images FOR SELECT USING (true);
CREATE POLICY "Public read" ON public.gallery_categories FOR SELECT USING (true);
CREATE POLICY "Public read" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Public read" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public read" ON public.event_photos FOR SELECT USING (true);
CREATE POLICY "Public read" ON public.temple_officials FOR SELECT USING (true);
CREATE POLICY "Public read" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public read" ON public.news_updates FOR SELECT USING (true);

-- ============================================
-- Insert Default Site Settings
-- ============================================
INSERT INTO public.site_settings (key, value, description) VALUES
  ('site_name', 'හරිතගිරි විහාරය', 'Temple name in Sinhala'),
  ('site_name_en', 'Harithagiri Viharaya', 'Temple name in English'),
  ('address', 'හරිත ගම, ගින්තොට', 'Temple address'),
  ('phone', '', 'Contact phone'),
  ('email', '', 'Contact email'),
  ('facebook', '', 'Facebook page URL'),
  ('youtube', '', 'YouTube channel URL');

-- ============================================
-- Insert Default Gallery Categories
-- ============================================
INSERT INTO public.gallery_categories (slug, name, name_si, icon, display_order) VALUES
  ('stupa', 'Stupa', 'ස්තූපය', '🏛️', 1),
  ('angiris', 'Angiris Maha Seya', 'ආංගීරස මහා සෑය', '🕌', 2),
  ('dhatu', 'Dhatu Mandiraya', 'ධාතු මන්දිරය', '⚱️', 3),
  ('buddha-mandira', 'Buddha Mandira', 'බුද්ධ මන්දිර', '🙏', 4),
  ('dolosmahe', 'Dolosmahe Pahan', 'දොලොස්මහේ පහන', '🪷', 5),
  ('ananda-bodhi', 'Ananda Bodhi', 'ආනන්ද බෝධිය', '🌳', 6),
  ('parani-bodhi', 'Parani Bodhi', 'පැරණි බෝධිය', '🍃', 7),
  ('dharma-salawa', 'Dharma Salawa', 'ධර්ම ශාලාව', '📖', 8),
  ('avasa-geya', 'Avasa Geya', 'ආවාස ගෙය', '🏠', 9),
  ('dana-salawa', 'Dana Salawa', 'දාන ශාලාව', '🍚', 10),
  ('mani-akkhitha', 'Mani Akkhitha', 'මණිඅක්ඛිත අංග රාජ ප්‍රතිමාව', '💎', 11),
  ('praweshamarga', 'Praweshamarga', 'ප්‍රවේශ මාර්ග', '🛤️', 12),
  ('events', 'Events', 'උත්සව', '🎉', 13);
