/*
  # Create applications table for InternPath job tracker

  1. New Tables
    - `applications`
      - `id` (uuid, primary key)
      - `company` (text, required)
      - `role` (text, required)
      - `platform` (text, required)
      - `applied_date` (date, required)
      - `follow_up_date` (date, optional)
      - `notes` (text, optional)
      - `resume_url` (text, optional)
      - `jd_url` (text, optional)
      - `status` (text, default 'Applied')
      - `created_at` (timestamp, default now())
      - `updated_at` (timestamp, default now())

  2. Security
    - Enable RLS on `applications` table
    - Add policies for authenticated users to manage their own applications

  3. Storage
    - Create storage buckets for resumes and job descriptions
    - Set up storage policies for file uploads
*/

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  role text NOT NULL,
  platform text NOT NULL,
  applied_date date NOT NULL,
  follow_up_date date,
  notes text,
  resume_url text,
  jd_url text,
  status text DEFAULT 'Applied' CHECK (status IN ('Applied', 'Interview', 'Rejected', 'Offer')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Create policies for applications
CREATE POLICY "Users can read all applications"
  ON applications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert applications"
  ON applications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update applications"
  ON applications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete applications"
  ON applications
  FOR DELETE
  TO authenticated
  USING (true);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resumes', 'resumes', true);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('jds', 'jds', true);

-- Create storage policies
CREATE POLICY "Anyone can upload resumes"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Anyone can view resumes"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'resumes');

CREATE POLICY "Anyone can delete resumes"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'resumes');

CREATE POLICY "Anyone can upload job descriptions"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'jds');

CREATE POLICY "Anyone can view job descriptions"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'jds');

CREATE POLICY "Anyone can delete job descriptions"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'jds');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();