
-- Create a storage bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true);

-- Create storage policies for the product-images bucket
CREATE POLICY "Anyone can view product images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images" 
ON storage.objects FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can update product images" 
ON storage.objects FOR UPDATE 
TO authenticated
USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can delete product images" 
ON storage.objects FOR DELETE 
TO authenticated
USING (bucket_id = 'product-images');

-- Update the products table to support multiple images
ALTER TABLE public.products 
ADD COLUMN thumbnail_url TEXT,
ADD COLUMN image_1_url TEXT,
ADD COLUMN image_2_url TEXT;

-- Update existing products to move image_url to thumbnail_url
UPDATE public.products 
SET thumbnail_url = image_url 
WHERE image_url IS NOT NULL;

-- Remove the old image_url column
ALTER TABLE public.products DROP COLUMN image_url;
