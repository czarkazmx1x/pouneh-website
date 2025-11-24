-- Moon Log Journal Entries Table
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS moon_log_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID, -- For future user authentication
  date DATE NOT NULL,
  body_feeling TEXT NOT NULL,
  lunar_phase VARCHAR(50) NOT NULL,
  action TEXT NOT NULL,
  moon_phase_id UUID REFERENCES moon_phases(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_moon_log_date ON moon_log_entries(date DESC);
CREATE INDEX IF NOT EXISTS idx_moon_log_user ON moon_log_entries(user_id);

-- Enable Row Level Security
ALTER TABLE moon_log_entries ENABLE ROW LEVEL SECURITY;

-- Create policies (allow public read/write for now)
CREATE POLICY "Allow public read access on moon_log_entries"
  ON moon_log_entries FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access on moon_log_entries"
  ON moon_log_entries FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access on moon_log_entries"
  ON moon_log_entries FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Allow public delete access on moon_log_entries"
  ON moon_log_entries FOR DELETE
  TO public
  USING (true);
