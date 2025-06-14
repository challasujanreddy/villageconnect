
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAccommodations = (villageId?: string) => {
  return useQuery({
    queryKey: ["accommodations", villageId],
    queryFn: async () => {
      let query = supabase
        .from("accommodations")
        .select(`
          *,
          villages (
            name,
            location,
            country
          ),
          profiles (
            full_name,
            avatar_url
          )
        `);
      
      if (villageId) {
        query = query.eq("village_id", villageId);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching accommodations:", error);
        throw error;
      }
      
      return data;
    },
  });
};
