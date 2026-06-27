-- Supabase Schema for AuraCalmer.AI

-- 1. Create the journal_entries table
CREATE TABLE IF NOT EXISTS public.journal_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  text TEXT NOT NULL,
  mood TEXT,
  dominant_emotion TEXT,
  positivity_score INTEGER,
  coping_suggestion TEXT,
  stress_triggers TEXT[]
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

-- For this hackathon MVP without user auth, we allow anonymous read/write access.
-- In production, you would restrict this to authenticated users based on auth.uid()
CREATE POLICY "Allow anonymous read access" ON public.journal_entries FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert access" ON public.journal_entries FOR INSERT WITH CHECK (true);
