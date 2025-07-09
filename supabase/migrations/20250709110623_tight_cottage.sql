/*
  # Create tributes table

  1. New Tables
    - `tributes`
      - `id` (uuid, primary key)
      - `full_name` (text, required)
      - `tribute` (text, required)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `tributes` table
    - Add policy for public read access
    - Add policy for public insert access
*/

CREATE TABLE IF NOT EXISTS tributes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  tribute text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tributes ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all tributes
CREATE POLICY "Anyone can read tributes"
  ON tributes
  FOR SELECT
  TO public
  USING (true);

-- Allow public insert access for new tributes
CREATE POLICY "Anyone can insert tributes"
  ON tributes
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public delete access (for admin functionality)
CREATE POLICY "Anyone can delete tributes"
  ON tributes
  FOR DELETE
  TO public
  USING (true);

-- Create an index for better performance on created_at
CREATE INDEX IF NOT EXISTS tributes_created_at_idx ON tributes(created_at DESC);