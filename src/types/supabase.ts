import { Database } from "@/integrations/supabase/types";

export type Tables = Database["public"]["Tables"];
export type TablesNames = keyof Tables;

export type Profile = Tables["profiles"]["Row"];
export type Job = Tables["jobs"]["Row"];
export type Proposal = Tables["proposals"]["Row"];
export type Message = Tables["messages"]["Row"];
export type Contract = Tables["contracts"]["Row"];
export type Invoice = Tables["invoices"]["Row"];
export type Payment = Tables["payments"]["Row"];
export type Review = Tables["reviews"]["Row"];
export type Notification = Tables["notifications"]["Row"];
export type SupportTicket = Tables["support_tickets"]["Row"];
export type SupportTicketMessage = Tables["support_ticket_messages"]["Row"];

export type UserRole = Database["public"]["Enums"]["user_role"];
export type JobType = Database["public"]["Enums"]["job_type"];
export type JobStatus = Database["public"]["Enums"]["job_status"];
export type ProposalStatus = Database["public"]["Enums"]["proposal_status"];
export type ContractStatus = Database["public"]["Enums"]["contract_status"];
export type InvoiceStatus = Database["public"]["Enums"]["invoice_status"];
export type PaymentStatus = Database["public"]["Enums"]["payment_status"];
export type SupportTicketStatus = Database["public"]["Enums"]["support_ticket_status"];

// Add these type definitions if they don't exist
export type job_status = 'draft' | 'active' | 'in_progress' | 'completed' | 'cancelled';
export type proposal_status = 'pending' | 'accepted' | 'rejected' | 'withdrawn';
