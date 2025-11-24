-- Add write permissions for moon_phases table
-- Run this in Supabase SQL Editor
-- This adds INSERT and UPDATE permissions only (READ already exists)

-- Drop existing policies if they exist (optional, for clean slate)
DROP POLICY IF EXISTS "Allow public insert access on moon_phases" ON moon_phases;
DROP POLICY IF EXISTS "Allow public update access on moon_phases" ON moon_phases;

-- Allow public insert (for caching API data)
CREATE POLICY "Allow public insert access on moon_phases"
  ON moon_phases FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public update (for refreshing cache)
CREATE POLICY "Allow public update access on moon_phases"
  ON moon_phases FOR UPDATE
  TO public
  USING (true);
