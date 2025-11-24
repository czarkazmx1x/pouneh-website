-- API Cache Tables for Pouneh's Path To Success
-- Run this in your Supabase SQL Editor: https://ugmmejecfpyihwnxsgpt.supabase.co

-- Moon Phase Cache
CREATE TABLE IF NOT EXISTS moon_phases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  phase VARCHAR(50) NOT NULL,
  illumination DECIMAL(5,2),
  phase_emoji VARCHAR(10),
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Unsplash Images Cache
CREATE TABLE IF NOT EXISTS unsplash_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  search_query VARCHAR(255) NOT NULL,
  image_id VARCHAR(255) NOT NULL,
  image_url TEXT NOT NULL,
  thumb_url TEXT,
  photographer VARCHAR(255),
  photographer_url TEXT,
  description TEXT,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Jobs Cache
CREATE TABLE IF NOT EXISTS jobs_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  company VARCHAR(255),
  location VARCHAR(255),
  job_type VARCHAR(100),
  salary_min INTEGER,
  salary_max INTEGER,
  description TEXT,
  url TEXT,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_moon_phases_date ON moon_phases(date);
CREATE INDEX IF NOT EXISTS idx_unsplash_search ON unsplash_images(search_query);
CREATE INDEX IF NOT EXISTS idx_jobs_created ON jobs_cache(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE moon_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE unsplash_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs_cache ENABLE ROW LEVEL SECURITY;

-- Create policies (allow public read access for cached data)
CREATE POLICY "Allow public read access on moon_phases"
  ON moon_phases FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on unsplash_images"
  ON unsplash_images FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on jobs_cache"
  ON jobs_cache FOR SELECT
  TO public
  USING (true);

-- Note: For write operations, you'll need to set up service role access
-- or create specific policies based on your authentication setup
-- Vision Board Items Table
-- Add this to your existing Supabase schema

CREATE TABLE IF NOT EXISTS vision_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID, -- For future user authentication
  title VARCHAR(200) NOT NULL,
  description TEXT,
  image_url TEXT,
  category VARCHAR(50) NOT NULL,
  photographer VARCHAR(255),
  photographer_url TEXT,
  is_text_only BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_vision_items_created ON vision_items(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_vision_items_user ON vision_items(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE vision_items ENABLE ROW LEVEL SECURITY;

-- Create policies (allow public read/write for now, we'll add user auth later)
CREATE POLICY "Allow public read access on vision_items"
  ON vision_items FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access on vision_items"
  ON vision_items FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access on vision_items"
  ON vision_items FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Allow public delete access on vision_items"
  ON vision_items FOR DELETE
  TO public
  USING (true);
