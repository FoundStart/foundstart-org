import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';
import { useToast } from '@/hooks/use-toast';

export function useDomainFavorites() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('domain_favorites')
        .select('domain_name')
        .eq('user_id', user.id);

      if (error) throw error;
      setFavorites(data?.map(f => f.domain_name) || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const toggleFavorite = async (domainName: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save domains to your wishlist.",
        variant: "destructive"
      });
      return;
    }

    const isFavorite = favorites.includes(domainName);

    try {
      if (isFavorite) {
        const { error } = await supabase
          .from('domain_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('domain_name', domainName);

        if (error) throw error;
        setFavorites(prev => prev.filter(f => f !== domainName));
        toast({
          title: "Removed from wishlist",
          description: `${domainName} has been removed from your wishlist.`
        });
      } else {
        const { error } = await supabase
          .from('domain_favorites')
          .insert({ user_id: user.id, domain_name: domainName });

        if (error) throw error;
        setFavorites(prev => [...prev, domainName]);
        toast({
          title: "Added to wishlist",
          description: `${domainName} has been added to your wishlist.`
        });
      }
    } catch (error: any) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update wishlist.",
        variant: "destructive"
      });
    }
  };

  const isFavorite = (domainName: string) => favorites.includes(domainName);

  return { favorites, loading, toggleFavorite, isFavorite, refetch: fetchFavorites };
}
