-- Remove the dangerous bootstrap policy that allows anyone to become admin
DROP POLICY IF EXISTS "Bootstrap first admin" ON public.user_roles;

-- Create a hardcoded admin policy that only allows specific user IDs to be admins
CREATE POLICY "Hardcoded admin users only"
ON public.user_roles
FOR INSERT
WITH CHECK (
  auth.uid() = user_id AND 
  role = 'admin' AND 
  user_id IN (
    '52b051a3-385b-4234-af93-37a1104e893c',  -- viktoroddy@gmail.com
    'e8774a9c-030d-46c8-be02-2be63b32005a',  -- viktorodainyi@gmail.com
    '51f1a719-bbdf-4d31-a8ce-0f7da23fdf4a',  -- agrealtorsdxb@gmail.com 
    'f1234567-1234-1234-1234-123456789abc'   -- placeholder for other account
  )
);