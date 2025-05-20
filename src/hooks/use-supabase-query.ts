
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient, QueryKey } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";

// Type helper for Supabase tables
export type Tables = Database['public']['Tables'];
export type TablesNames = keyof Tables;

// Generic typed hook to fetch data from any Supabase table
export function useSupabaseQuery<T extends TablesNames>(
  table: T,
  options: {
    queryKey: QueryKey;
    select?: string;
    match?: Record<string, any>;
    order?: { column: string; ascending?: boolean };
    limit?: number;
    single?: boolean;
    enabled?: boolean;
    filters?: (query: any) => any;
  }
) {
  const { session } = useAuth();
  const { toast } = useToast();

  return useQuery({
    queryKey: options.queryKey,
    queryFn: async () => {
      try {
        let query = supabase
          .from(table)
          .select(options.select || '*');

        // Apply custom filters if provided
        if (options.filters) {
          query = options.filters(query);
        }

        // Apply match conditions
        if (options.match) {
          Object.entries(options.match).forEach(([key, value]) => {
            query = query.eq(key, value);
          });
        }

        // Apply ordering
        if (options.order) {
          query = query.order(options.order.column, { ascending: options.order.ascending ?? false });
        }

        // Apply limit
        if (options.limit) {
          query = query.limit(options.limit);
        }

        // Get single result or multiple
        const { data, error } = options.single
          ? await query.single()
          : await query;

        if (error) throw error;
        return data;
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: "Error fetching data",
            description: error.message,
            variant: "destructive"
          });
        }
        throw error;
      }
    },
    enabled: !!session && (options.enabled !== false)
  });
}

// Generic mutation hook for Supabase tables
export function useSupabaseMutation<T extends TablesNames>(
  table: T,
  options: {
    queryKey: QueryKey;
    operation: 'insert' | 'update' | 'delete';
    match?: Record<string, any>;
    onSuccess?: () => void;
  }
) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      try {
        let query;
        
        switch (options.operation) {
          case 'insert':
            query = supabase.from(table).insert(data);
            break;
          case 'update':
            query = supabase.from(table).update(data);
            if (options.match) {
              Object.entries(options.match).forEach(([key, value]) => {
                query = query.eq(key, value);
              });
            }
            break;
          case 'delete':
            query = supabase.from(table).delete();
            if (options.match) {
              Object.entries(options.match).forEach(([key, value]) => {
                query = query.eq(key, value);
              });
            }
            break;
        }

        const { error } = await query;
        if (error) throw error;
        return data;
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive"
          });
        }
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate the relevant query to trigger a refetch
      queryClient.invalidateQueries(options.queryKey);
      
      if (options.onSuccess) {
        options.onSuccess();
      }
      
      toast({
        title: "Success",
        description: `${options.operation === 'insert' ? 'Created' : options.operation === 'update' ? 'Updated' : 'Deleted'} successfully.`,
      });
    }
  });
}
