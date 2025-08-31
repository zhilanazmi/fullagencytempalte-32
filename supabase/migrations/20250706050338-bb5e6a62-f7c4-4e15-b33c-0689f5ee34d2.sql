
-- Add remix_url and preview_url columns to the products table
ALTER TABLE public.products 
ADD COLUMN remix_url TEXT,
ADD COLUMN preview_url TEXT;
