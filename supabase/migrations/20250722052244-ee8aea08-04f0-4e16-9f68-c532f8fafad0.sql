-- Add display_order column to products table
ALTER TABLE public.products 
ADD COLUMN display_order INTEGER DEFAULT 0;

-- Update existing products with sequential display order based on creation date
UPDATE public.products 
SET display_order = subquery.rn
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) as rn
  FROM public.products
) AS subquery
WHERE public.products.id = subquery.id;