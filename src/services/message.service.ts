
import { supabase } from "@/integrations/supabase/client";
import { Message } from "@/types/supabase";

export const messageService = {
  async sendMessage(messageData: Omit<Message, "id" | "created_at">): Promise<Message | null> {
    const { data, error } = await supabase
      .from('messages')
      .insert(messageData)
      .select()
      .single();

    if (error) {
      console.error("Error sending message:", error);
      throw error;
    }

    return data;
  },

  async getConversation(userId1: string, userId2: string, jobId?: string): Promise<Message[]> {
    let query = supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${userId1},recipient_id.eq.${userId1}`)
      .or(`sender_id.eq.${userId2},recipient_id.eq.${userId2}`)
      .order('created_at', { ascending: true });

    if (jobId) {
      query = query.eq('job_id', jobId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching conversation:", error);
      throw error;
    }

    return data || [];
  },

  async getConversations(userId: string): Promise<any[]> {
    // This query gets the most recent message from each distinct conversation
    const { data, error } = await supabase.rpc('get_user_conversations', {
      user_id: userId
    });

    if (error) {
      console.error("Error fetching conversations:", error);
      throw error;
    }

    return data || [];
  },

  async markAsRead(messageIds: string[]): Promise<void> {
    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .in('id', messageIds);

    if (error) {
      console.error("Error marking messages as read:", error);
      throw error;
    }
  },

  subscribeToNewMessages(userId: string, callback: (message: Message) => void): () => void {
    const channel = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `recipient_id=eq.${userId}`
        },
        (payload) => {
          callback(payload.new as Message);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }
};
