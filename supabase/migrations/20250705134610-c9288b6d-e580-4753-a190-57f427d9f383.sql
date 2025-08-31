
-- Create a products table to store product information
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price_type TEXT CHECK (price_type IN ('Free', 'Premium')) DEFAULT 'Free',
  page_type TEXT DEFAULT 'Full home page',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies for products (making them publicly readable but only admins can modify)
CREATE POLICY "Anyone can view products" 
  ON public.products 
  FOR SELECT 
  USING (true);

-- For now, authenticated users can insert/update/delete products
-- You can restrict this further to admin users later
CREATE POLICY "Authenticated users can insert products" 
  ON public.products 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products" 
  ON public.products 
  FOR UPDATE 
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete products" 
  ON public.products 
  FOR DELETE 
  TO authenticated
  USING (true);
