import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface AdminAuthState {
  isAdmin: boolean | null;
  loading: boolean;
  error: string | null;
}

export const useAdminAuth = () => {
  const { user, session } = useAuth();
  const [adminState, setAdminState] = useState<AdminAuthState>({
    isAdmin: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user || !session) {
        setAdminState({
          isAdmin: false,
          loading: false,
          error: null,
        });
        return;
      }

      try {
        setAdminState(prev => ({ ...prev, loading: true, error: null }));

        // Directly query user_roles table to check admin status
        const { data: adminData, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (error) {
          console.error('Error checking admin status:', error);
          throw error;
        }

        const isAdmin = !!adminData;

        setAdminState({
          isAdmin: isAdmin,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error checking admin status:', error);
        setAdminState({
          isAdmin: false,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to verify admin status',
        });
      }
    };

    checkAdminStatus();
  }, [user, session]);

  return adminState;
};