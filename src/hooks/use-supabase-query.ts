import { useQuery, useMutation, UseQueryOptions, UseMutationOptions, QueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Generic type for the return data
type Data<T> = T extends { data?: infer U } ? U : T;

// Generic type for the error
type Error = any;

// Generic type for the params
type Params<T> = T extends { params?: infer U } ? U : T;

// useSupabaseQuery hook
export function useSupabaseQuery<
  T extends (...args: any) => any,
  TQueryFnData = Data<Awaited<ReturnType<T>>>,
  TError = Error,
  TData = TQueryFnData
>(
  fn: T,
  params: Params<ReturnType<T>>,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey' | 'queryFn'>
) {
  const queryKey = [String(fn.name), params];

  return useQuery<TQueryFnData, TError, TData>({
    queryKey,
    queryFn: async () => {
      const result = await fn(params);
      return (result as any)?.data;
    },
    ...options,
  });
}

// useSupabaseMutation hook
export function useSupabaseMutation<
  T extends (...args: any) => any,
  TError = Error,
  TContext = unknown,
>(
  fn: T,
  options?: Omit<UseMutationOptions<Data<Awaited<ReturnType<T>>>, TError, Params<ReturnType<T>>, TContext>, 'mutationFn'>
) {
  return useMutation<Data<Awaited<ReturnType<T>>>, TError, Params<ReturnType<T>>, TContext>({
    mutationFn: async (params) => {
      const result = await fn(params);
      return (result as any)?.data;
    },
    ...options,
  });
}

// Fix the specific function with the TS error on line 138
export const invalidateQueries = (client: QueryClient, key: string | string[]) => {
  const queryKey = Array.isArray(key) ? key : [key];
  client.invalidateQueries({ queryKey });
};
