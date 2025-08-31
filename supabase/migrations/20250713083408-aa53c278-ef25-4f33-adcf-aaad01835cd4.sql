-- Create password reset tokens table
CREATE TABLE public.password_reset_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can insert password reset tokens" 
ON public.password_reset_tokens 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view unexpired unused tokens" 
ON public.password_reset_tokens 
FOR SELECT 
USING (NOT used AND expires_at > now());

CREATE POLICY "Anyone can update tokens to mark as used" 
ON public.password_reset_tokens 
FOR UPDATE 
USING (NOT used AND expires_at > now());

-- Create index for performance
CREATE INDEX idx_password_reset_tokens_token ON public.password_reset_tokens(token);
CREATE INDEX idx_password_reset_tokens_email ON public.password_reset_tokens(email);
CREATE INDEX idx_password_reset_tokens_expires ON public.password_reset_tokens(expires_at);

-- Create function to clean up expired tokens
CREATE OR REPLACE FUNCTION public.cleanup_expired_reset_tokens()
RETURNS void
LANGUAGE sql
AS $$
DELETE FROM public.password_reset_tokens 
WHERE expires_at < now() - INTERVAL '1 hour';
$$;