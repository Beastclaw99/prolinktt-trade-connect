
import { Database } from "@/integrations/supabase/types";

// Export predefined types from supabase.ts
export type { job_status, proposal_status } from "./supabase";

// Database tables
type Tables = Database["public"]["Tables"];

// Job types
export type Job = Tables["jobs"]["Row"];
export type JobInsert = Tables["jobs"]["Insert"];
export type JobUpdate = Tables["jobs"]["Update"];

// Proposal types
export type Proposal = Tables["proposals"]["Row"];
export type ProposalInsert = Tables["proposals"]["Insert"];
export type ProposalUpdate = Tables["proposals"]["Update"];

// Message types
export type MessageDB = Tables["messages"]["Row"];
export type MessageInsert = Tables["messages"]["Insert"];
export type MessageUpdate = Tables["messages"]["Update"];

// Custom Message type for client usage (to maintain compatibility with existing code)
export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string; // Maps to recipient_id in DB
  content: string;
  timestamp: string; // Maps to created_at in DB
  read: boolean;
}

// Helper function to convert between DB and client message formats
export const dbToClientMessage = (dbMessage: MessageDB): Message => {
  return {
    id: dbMessage.id,
    sender_id: dbMessage.sender_id,
    receiver_id: dbMessage.recipient_id,
    content: dbMessage.content,
    timestamp: dbMessage.created_at || new Date().toISOString(),
    read: dbMessage.read || false,
  };
};

export const clientToDbMessage = (clientMessage: Partial<Message>): Partial<MessageInsert> => {
  const result: Partial<MessageInsert> = {
    id: clientMessage.id,
    sender_id: clientMessage.sender_id,
    recipient_id: clientMessage.receiver_id,
    content: clientMessage.content,
    read: clientMessage.read,
  };
  
  return result;
};
