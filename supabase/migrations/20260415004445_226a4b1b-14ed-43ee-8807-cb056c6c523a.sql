
CREATE TABLE public.site_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key text NOT NULL UNIQUE,
  value text NOT NULL,
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site_settings"
ON public.site_settings FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert site_settings"
ON public.site_settings FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update site_settings"
ON public.site_settings FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete site_settings"
ON public.site_settings FOR DELETE
USING (true);
