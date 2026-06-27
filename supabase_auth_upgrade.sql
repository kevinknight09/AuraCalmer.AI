-- 1. Add user_id column to journal_entries
ALTER TABLE public.journal_entries 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- 2. Delete the old anonymous policies
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.journal_entries;
DROP POLICY IF EXISTS "Allow anonymous insert access" ON public.journal_entries;

-- 3. Create secure policies for authenticated users
CREATE POLICY "Users can only see their own entries" 
ON public.journal_entries FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert their own entries" 
ON public.journal_entries FOR INSERT 
WITH CHECK (auth.uid() = user_id);
