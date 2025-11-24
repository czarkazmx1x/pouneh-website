-- Vision Board Items Table
-- Run ONLY this file in Supabase SQL Editor

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

-- Create policies (allow public read/write for now)
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
