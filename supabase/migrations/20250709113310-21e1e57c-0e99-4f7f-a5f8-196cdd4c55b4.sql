-- Remove all unauthorized admin users (keep only your accounts)
DELETE FROM public.user_roles 
WHERE role = 'admin' 
AND user_id NOT IN (
  '52b051a3-385b-4234-af93-37a1104e893c',  -- viktoroddy@gmail.com
  'e8774a9c-030d-46c8-be02-2be63b32005a',  -- viktorodainyi@gmail.com
  '51f1a719-bbdf-4d31-a8ce-0f7da23fdf4a'   -- agrealtorsdxb@gmail.com
);

-- Drop ALL existing policies on user_roles to start fresh
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Bootstrap first admin" ON public.user_roles;
DROP POLICY IF EXISTS "Hardcoded admin users only" ON public.user_roles;

-- Create new secure policies
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Hardcoded admins can view all roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() IN (
  '52b051a3-385b-4234-af93-37a1104e893c',
  'e8774a9c-030d-46c8-be02-2be63b32005a', 
  '51f1a719-bbdf-4d31-a8ce-0f7da23fdf4a'
));

-- ONLY allow your specific accounts to insert admin roles
CREATE POLICY "Only hardcoded users can create admin roles"
ON public.user_roles
FOR INSERT
WITH CHECK (
  auth.uid() = user_id AND 
  role = 'admin' AND 
  auth.uid() IN (
    '52b051a3-385b-4234-af93-37a1104e893c',
    'e8774a9c-030d-46c8-be02-2be63b32005a',
    '51f1a719-bbdf-4d31-a8ce-0f7da23fdf4a'
  )
);

-- Allow regular user role insertions
CREATE POLICY "Anyone can create user roles"
ON public.user_roles
FOR INSERT
WITH CHECK (
  auth.uid() = user_id AND 
  role = 'user'
);

-- Only hardcoded admins can update/delete roles
CREATE POLICY "Only hardcoded admins can update roles"
ON public.user_roles
FOR UPDATE
USING (auth.uid() IN (
  '52b051a3-385b-4234-af93-37a1104e893c',
  'e8774a9c-030d-46c8-be02-2be63b32005a',
  '51f1a719-bbdf-4d31-a8ce-0f7da23fdf4a'
));

CREATE POLICY "Only hardcoded admins can delete roles"
ON public.user_roles
FOR DELETE
USING (auth.uid() IN (
  '52b051a3-385b-4234-af93-37a1104e893c',
  'e8774a9c-030d-46c8-be02-2be63b32005a',
  '51f1a719-bbdf-4d31-a8ce-0f7da23fdf4a'
));