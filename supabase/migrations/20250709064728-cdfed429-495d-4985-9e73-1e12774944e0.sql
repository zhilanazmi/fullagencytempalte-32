-- Grant admin access to the user who just signed in (latest user)
-- Based on the auth logs, this should be the most recent successful login
INSERT INTO user_roles (user_id, role) 
SELECT id, 'admin'::app_role 
FROM auth.users 
WHERE email = 'agrealtorsdxb@gmail.com';