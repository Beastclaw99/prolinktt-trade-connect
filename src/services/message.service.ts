
import { supabase } from "@/integrations/supabase/client";
import { Message, MessageDB, MessageInsert, dbToClientMessage, clientToDbMessage } from "@/types";
import { v4 as uuidv4 } from 'uuid';

export const sendMessage = async (
  senderId: string,
  receiverId: string,
  content: string
): Promise<Message | null> => {
  try {
    const messageId = uuidv4();
    const messageData: MessageInsert = {
      id: messageId,
      sender_id: senderId,
      recipient_id: receiverId,
      content,
      read: false,
    };
    
    const { data, error } = await supabase
      .from('messages')
      .insert([messageData])
      .select()
      .single();

    if (error) {
      console.error("Error sending message:", error);
      return null;
    }

    // Convert DB format to client format
    return dbToClientMessage(data as MessageDB);
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
      .or(`and(sender_id.eq.${userId1},recipient_id.eq.${userId2}),and(sender_id.eq.${userId2},recipient_id.eq.${userId1})`)
      .order('created_at', { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
      return [];
    }

    // Convert all messages from DB format to client format
    return (data as MessageDB[]).map(dbToClientMessage);
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
      .eq('recipient_id', userId)
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
