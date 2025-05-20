
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

export type RealtimeEvent = 'INSERT' | 'UPDATE' | 'DELETE';

interface UseRealtimeOptions {
  schema?: string;
  table: string;
  event?: RealtimeEvent | RealtimeEvent[];
  filter?: string;
}

export function useRealtime<T = any>(options: UseRealtimeOptions) {
  const { schema = 'public', table, event = ['INSERT', 'UPDATE', 'DELETE'], filter } = options;
  const [data, setData] = useState<T | null>(null);
  const [eventType, setEventType] = useState<RealtimeEvent | null>(null);

  useEffect(() => {
    let channel: RealtimeChannel;

    // Function to handle setup of realtime subscription
    const setupSubscription = () => {
      channel = supabase.channel('schema-db-changes');

      // Setup events to listen to
      const events = Array.isArray(event) ? event : [event];

      events.forEach((eventType) => {
        const config: any = {
          event: eventType,
          schema,
          table
        };

        // Add filter if provided
        if (filter) {
          config.filter = filter;
        }

        channel = channel.on(
          'postgres_changes',
          config,
          (payload) => {
            console.log(`Realtime ${eventType} event:`, payload);
            setData(payload.new as T);
            setEventType(eventType);
          }
        );
      });

      // Subscribe to the channel
      channel.subscribe((status) => {
        console.log(`Realtime subscription status: ${status}`);
      });
    };

    setupSubscription();

    // Cleanup function
    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [schema, table, event, filter]);

  return { data, eventType };
}
