import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export interface Village {
  id: string;
  owner: string;
  name: string;
  state?: string | null;
  description?: string | null;
  hero_image?: string | null;
  nightly_price?: number | null;
  guide_fee?: number | null;
  created_at: string;
  updated_at: string;
  profiles?: {
    full_name?: string | null;
  };
}

type VillageInsert = Omit<Village, 'id' | 'created_at' | 'updated_at' | 'profiles'>;
type VillageUpdate = Partial<Omit<Village, 'id' | 'owner' | 'created_at' | 'profiles'>>;

const villageSelectQuery = `
  id,
  owner,
  name,
  state,
  description,
  hero_image,
  nightly_price,
  guide_fee,
  created_at,
  updated_at,
  profiles:owner (full_name)
`;

export const useVillages = () => {
  const [villages, setVillages] = useState<Village[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchVillages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('villages')
        .select(villageSelectQuery)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setVillages((data || []) as Village[]);
    } catch (error) {
      console.error('Error fetching villages:', error);
      toast({
        title: "Error",
        description: "Failed to load villages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVillages();
  }, []);

  return { villages, loading, refetch: fetchVillages };
};

export const useVillage = (id: string) => {
  const [village, setVillage] = useState<Village | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchVillage = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('villages')
        .select(villageSelectQuery)
        .eq('id', id)
        .single();

      if (error) throw error;

      setVillage(data as Village);
    } catch (err) {
      console.error('Error fetching village:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVillage();
  }, [id]);

  return { village, loading, error, refetch: fetchVillage };
};

export const useHostVillages = () => {
  const [villages, setVillages] = useState<Village[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchHostVillages = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('villages')
        .select(villageSelectQuery)
        .eq('owner', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setVillages((data || []) as Village[]);
    } catch (error) {
      console.error('Error fetching host villages:', error);
      toast({
        title: "Error",
        description: "Failed to load your villages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchHostVillages();
    }
  }, [user]);

  const createVillage = async (villageData: Omit<VillageInsert, 'owner'>) => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to create a village",
        variant: "destructive",
      });
      return { data: null, error: new Error('Not authenticated') };
    }

    try {
      const insertPayload: VillageInsert = {
        ...villageData,
        owner: user.id,
      };

      const { data, error } = await supabase
        .from('villages')
        .insert(insertPayload)
        .select(villageSelectQuery)
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Village created successfully",
      });

      await fetchHostVillages();
      return { data, error: null };
    } catch (error) {
      console.error('Error creating village:', error);
      toast({
        title: "Error",
        description: "Failed to create village",
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const updateVillage = async (id: string, updates: VillageUpdate) => {
    try {
      const { data, error } = await supabase
        .from('villages')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select(villageSelectQuery)
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Village updated successfully",
      });

      await fetchHostVillages();
      return { data, error: null };
    } catch (error) {
      console.error('Error updating village:', error);
      toast({
        title: "Error",
        description: "Failed to update village",
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const deleteVillage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('villages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Village deleted successfully",
      });

      await fetchHostVillages();
      return { error: null };
    } catch (error) {
      console.error('Error deleting village:', error);
      toast({
        title: "Error",
        description: "Failed to delete village",
        variant: "destructive",
      });
      return { error };
    }
  };

  return {
    villages,
    loading,
    createVillage,
    updateVillage,
    deleteVillage,
    refetch: fetchHostVillages,
  };
};