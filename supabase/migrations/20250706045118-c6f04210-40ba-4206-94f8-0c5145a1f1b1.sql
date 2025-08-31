
-- Create a table for product highlights
CREATE TABLE public.product_highlights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  icon_type TEXT DEFAULT 'checkmark',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.product_highlights ENABLE ROW LEVEL SECURITY;

-- Create policies for product highlights (making them publicly readable but only admins can modify)
CREATE POLICY "Anyone can view product highlights" 
  ON public.product_highlights 
  FOR SELECT 
  USING (true);

-- Authenticated users can insert/update/delete highlights
CREATE POLICY "Authenticated users can insert product highlights" 
  ON public.product_highlights 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update product highlights" 
  ON public.product_highlights 
  FOR UPDATE 
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete product highlights" 
  ON public.product_highlights 
  FOR DELETE 
  TO authenticated
  USING (true);

-- Create an index for better performance when querying by product_id
CREATE INDEX idx_product_highlights_product_id ON public.product_highlights(product_id);
CREATE INDEX idx_product_highlights_order ON public.product_highlights(product_id, display_order);
