-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT,
  short_description TEXT NOT NULL,
  content TEXT,
  cover_image TEXT,
  is_published BOOLEAN DEFAULT true,
  published_at DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Contact Info
CREATE TABLE IF NOT EXISTS contact_infos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  address TEXT,
  service_areas TEXT[] DEFAULT '{}',
  map_embed_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Customer Reviews
CREATE TABLE IF NOT EXISTS customer_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  installation_type TEXT,
  savings_percent NUMERIC,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Products
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT DEFAULT 'Inverter' CHECK (category IN ('Inverter', 'Battery', 'Accessory')),
  brand TEXT,
  price NUMERIC NOT NULL,
  description TEXT,
  image TEXT,
  specs TEXT[] DEFAULT '{}',
  stock INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Quote Requests
CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  monthly_bill TEXT,
  property_type TEXT CHECK (property_type IN ('Home', 'Shop', 'Office', 'Factory', 'Farm', 'Other')),
  system_type TEXT CHECK (system_type IN ('On-Grid', 'Hybrid', 'Off-Grid', 'Not Sure')),
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Services
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  location TEXT,
  system_size TEXT,
  system_type TEXT,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  completion_date DATE,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Solar Packages
CREATE TABLE IF NOT EXISTS solar_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  system_size TEXT NOT NULL,
  best_for TEXT NOT NULL,
  monthly_units TEXT,
  components TEXT[] DEFAULT '{}',
  coverage_percent INTEGER DEFAULT 80,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_solar_packages_active ON solar_packages(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_customer_reviews_approved ON customer_reviews(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_active ON projects(is_active, sort_order);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['blog_posts', 'contact_infos', 'customer_reviews', 'products', 'projects', 'quote_requests', 'services', 'solar_packages']
  LOOP
    EXECUTE format('
      CREATE TRIGGER set_updated_at
        BEFORE UPDATE ON %I
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at();
    ', t);
  END LOOP;
END;
$$;
