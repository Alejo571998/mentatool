
-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tools table
CREATE TABLE public.tools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;

-- Everyone can read
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Anyone can view tools" ON public.tools FOR SELECT USING (true);

-- Anyone can manage (no auth for now, simple admin use)
CREATE POLICY "Anyone can insert categories" ON public.categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update categories" ON public.categories FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete categories" ON public.categories FOR DELETE USING (true);

CREATE POLICY "Anyone can insert tools" ON public.tools FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update tools" ON public.tools FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete tools" ON public.tools FOR DELETE USING (true);

-- Indexes
CREATE INDEX idx_tools_category ON public.tools(category_id);
CREATE INDEX idx_categories_sort ON public.categories(sort_order);
CREATE INDEX idx_tools_sort ON public.tools(sort_order);
