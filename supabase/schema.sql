-- Supabase Database Schema for Hapoel TLV Fan Archive
-- Run this SQL in your Supabase project's SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create contributions table
CREATE TABLE IF NOT EXISTS contributions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('story', 'correction', 'title', 'legend', 'season', 'event')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  year INTEGER,
  source_url TEXT,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Anyone can read approved contributions
CREATE POLICY "Approved contributions are viewable by everyone"
ON contributions FOR SELECT
USING (status = 'approved');

-- Users can read their own contributions
CREATE POLICY "Users can view their own contributions"
ON contributions FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own contributions
CREATE POLICY "Users can create contributions"
ON contributions FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Admins can do everything (you'll need to set up admin emails in your app)
-- For now, let all authenticated users manage all contributions
CREATE POLICY "Admins can manage all contributions"
ON contributions FOR ALL
USING (
  auth.uid() IN (
    SELECT id FROM auth.users 
    WHERE email IN ('admin@hapoeltlv.fan', 'shay@example.com')
  )
);

-- Alternative: All users can manage all (for demo purposes)
-- If you want to test without setting up admin emails, comment out the policy above and use this:
-- CREATE POLICY "All users can manage contributions"
-- ON contributions FOR ALL
-- USING (auth.uid() IS NOT NULL);

-- Create indexes for better performance
CREATE INDEX idx_contributions_status ON contributions(status);
CREATE INDEX idx_contributions_type ON contributions(type);
CREATE INDEX idx_contributions_user_id ON contributions(user_id);
CREATE INDEX idx_contributions_created_at ON contributions(created_at DESC);

-- Function to get user email
CREATE OR REPLACE FUNCTION public.get_user_email(user_id UUID)
RETURNS TEXT AS $$
  SELECT email FROM auth.users WHERE id = user_id;
$$ LANGUAGE SQL SECURITY DEFINER;

-- Note: You'll also need to set up Supabase Auth in your project:
-- 1. Go to Authentication > Providers > Email
-- 2. Enable "Email" provider
-- 3. Optionally configure SMTP settings

-- For production, also consider:
-- - Adding a user_profiles table for additional user data
-- - Setting up storage buckets for image uploads
-- - Adding email templates for password reset
