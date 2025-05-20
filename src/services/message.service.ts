import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export const sendMessage = async (
  senderId: string,
  receiverId: string,
  content: string
): Promise<Message | null> => {
  try {
    const messageId = uuidv4();
    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          id: messageId,
          sender_id: senderId,
          receiver_id: receiverId,
          content,
          timestamp: new Date().toISOString(),
          read: false,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error sending message:", error);
      return null;
    }

    return data as Message;
  } catch (error) {
    console.error("Error sending message:", error);
    return null;
  }
};

export const getMessagesBetweenUsers = async (
  userId1: string,
  userId2: string
): Promise<Message[]> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
      .order('timestamp', { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
      return [];
    }

    return data as Message[];
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

export const markMessageAsRead = async (messageId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('id', messageId);

    if (error) throw error;
  } catch (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
};

export const getUnreadMessagesCount = async (userId: string): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact' })
      .eq('receiver_id', userId)
      .eq('read', false);

    if (error) {
      console.error("Error fetching unread messages count:", error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error("Error fetching unread messages count:", error);
    return 0;
  }
};
