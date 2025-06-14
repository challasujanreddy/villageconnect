
-- Drop the existing villages table and recreate with our schema
DROP TABLE IF EXISTS public.villages CASCADE;

-- Create the villages table with the correct schema for our app
CREATE TABLE public.villages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  state TEXT,
  description TEXT,
  hero_image TEXT,
  nightly_price NUMERIC,
  guide_fee NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.villages ENABLE ROW LEVEL SECURITY;

-- Recreate policies for the new table structure
CREATE POLICY "Hosts can manage own villages" ON public.villages
  FOR ALL USING (owner = auth.uid());

CREATE POLICY "Everyone can view villages" ON public.villages
  FOR SELECT USING (true);

-- Update the experiences table to properly reference villages
ALTER TABLE public.experiences 
DROP CONSTRAINT IF EXISTS experiences_village_id_fkey;

ALTER TABLE public.experiences 
ADD CONSTRAINT experiences_village_id_fkey 
FOREIGN KEY (village_id) REFERENCES public.villages(id) ON DELETE CASCADE;
