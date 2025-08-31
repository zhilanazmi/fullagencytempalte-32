-- Remove admin access from wrong account and grant to correct account
DELETE FROM user_roles WHERE user_id = '51f1a719-bbdf-4d31-a8ce-0f7da23fdf4a' AND role = 'admin';

-- Grant admin access to viktoroddy@gmail.com
INSERT INTO user_roles (user_id, role) 
VALUES ('52b051a3-385b-4234-af93-37a1104e893c', 'admin');