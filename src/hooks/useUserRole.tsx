import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';

interface RoleResult {
  userId: string;
  isAdmin: boolean;
}

export const useUserRole = () => {
  const { user } = useAuth();
  const [result, setResult] = useState<RoleResult | null>(null);

  useEffect(() => {
    if (!user) {
      setResult(null);
      return;
    }
    let cancelled = false;
    supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle()
      .then(({ data, error }) => {
        if (!cancelled) setResult({ userId: user.id, isAdmin: !!data && !error });
      });
    return () => { cancelled = true; };
  }, [user]);

  // Derived, not effect-driven: the moment a user object appears, loading is
  // already true in the SAME render, because the stored result still belongs
  // to the previous (or no) user. An effect-based setLoading(true) runs one
  // commit too late - AdminDashboard would see loading=false + isAdmin=false
  // and redirect to /dashboard before the query even started (cold-load bug).
  const loading = !!user && result?.userId !== user.id;
  const isAdmin = !!user && result?.userId === user.id && result.isAdmin;

  return { isAdmin, loading };
};
