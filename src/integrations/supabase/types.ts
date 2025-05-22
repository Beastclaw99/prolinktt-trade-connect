export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contracts: {
        Row: {
          client_id: string
          created_at: string | null
          description: string
          end_date: string | null
          hourly_rate: number | null
          id: string
          job_id: string
          price: number | null
          professional_id: string
          start_date: string
          status: Database["public"]["Enums"]["contract_status"] | null
          terms: string
          title: string
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          description: string
          end_date?: string | null
          hourly_rate?: number | null
          id?: string
          job_id: string
          price?: number | null
          professional_id: string
          start_date: string
          status?: Database["public"]["Enums"]["contract_status"] | null
          terms: string
          title: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          description?: string
          end_date?: string | null
          hourly_rate?: number | null
          id?: string
          job_id?: string
          price?: number | null
          professional_id?: string
          start_date?: string
          status?: Database["public"]["Enums"]["contract_status"] | null
          terms?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contracts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number
          client_id: string
          contract_id: string
          created_at: string | null
          description: string | null
          due_date: string
          id: string
          invoice_number: string
          issue_date: string | null
          items: Json | null
          job_id: string
          professional_id: string
          status: Database["public"]["Enums"]["invoice_status"] | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          client_id: string
          contract_id: string
          created_at?: string | null
          description?: string | null
          due_date: string
          id?: string
          invoice_number: string
          issue_date?: string | null
          items?: Json | null
          job_id: string
          professional_id: string
          status?: Database["public"]["Enums"]["invoice_status"] | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          client_id?: string
          contract_id?: string
          created_at?: string | null
          description?: string | null
          due_date?: string
          id?: string
          invoice_number?: string
          issue_date?: string | null
          items?: Json | null
          job_id?: string
          professional_id?: string
          status?: Database["public"]["Enums"]["invoice_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          attachments: string[] | null
          budget_max: number | null
          budget_min: number | null
          category: string
          client_id: string
          created_at: string | null
          description: string
          end_date: string | null
          hourly_rate: number | null
          id: string
          job_type: Database["public"]["Enums"]["job_type"]
          location: string | null
          skills_required: string[] | null
          start_date: string | null
          status: Database["public"]["Enums"]["job_status"] | null
          subcategory: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          attachments?: string[] | null
          budget_max?: number | null
          budget_min?: number | null
          category: string
          client_id: string
          created_at?: string | null
          description: string
          end_date?: string | null
          hourly_rate?: number | null
          id?: string
          job_type: Database["public"]["Enums"]["job_type"]
          location?: string | null
          skills_required?: string[] | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          subcategory?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          attachments?: string[] | null
          budget_max?: number | null
          budget_min?: number | null
          category?: string
          client_id?: string
          created_at?: string | null
          description?: string
          end_date?: string | null
          hourly_rate?: number | null
          id?: string
          job_type?: Database["public"]["Enums"]["job_type"]
          location?: string | null
          skills_required?: string[] | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          subcategory?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          attachments: string[] | null
          content: string
          created_at: string | null
          id: string
          job_id: string | null
          read: boolean | null
          recipient_id: string
          sender_id: string
        }
        Insert: {
          attachments?: string[] | null
          content: string
          created_at?: string | null
          id?: string
          job_id?: string | null
          read?: boolean | null
          recipient_id: string
          sender_id: string
        }
        Update: {
          attachments?: string[] | null
          content?: string
          created_at?: string | null
          id?: string
          job_id?: string | null
          read?: boolean | null
          recipient_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          link: string | null
          message: string
          read: boolean | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          link?: string | null
          message: string
          read?: boolean | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          link?: string | null
          message?: string
          read?: boolean | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          client_id: string
          created_at: string | null
          id: string
          invoice_id: string
          payment_date: string | null
          payment_method: string | null
          professional_id: string
          status: Database["public"]["Enums"]["payment_status"] | null
          transaction_id: string | null
        }
        Insert: {
          amount: number
          client_id: string
          created_at?: string | null
          id?: string
          invoice_id: string
          payment_date?: string | null
          payment_method?: string | null
          professional_id: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          client_id?: string
          created_at?: string | null
          id?: string
          invoice_id?: string
          payment_date?: string | null
          payment_method?: string | null
          professional_id?: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          average_rating: number | null
          bio: string | null
          certifications: string[] | null
          created_at: string | null
          first_name: string | null
          hourly_rate: number | null
          id: string
          last_name: string | null
          phone: string | null
          rating_count: number | null
          role: Database["public"]["Enums"]["user_role"] | null
          skills: string[] | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          average_rating?: number | null
          bio?: string | null
          certifications?: string[] | null
          created_at?: string | null
          first_name?: string | null
          hourly_rate?: number | null
          id: string
          last_name?: string | null
          phone?: string | null
          rating_count?: number | null
          role?: Database["public"]["Enums"]["user_role"] | null
          skills?: string[] | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          average_rating?: number | null
          bio?: string | null
          certifications?: string[] | null
          created_at?: string | null
          first_name?: string | null
          hourly_rate?: number | null
          id?: string
          last_name?: string | null
          phone?: string | null
          rating_count?: number | null
          role?: Database["public"]["Enums"]["user_role"] | null
          skills?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      proposals: {
        Row: {
          cover_letter: string
          created_at: string | null
          estimated_hours: number | null
          hourly_rate: number | null
          id: string
          job_id: string
          price: number | null
          professional_id: string
          status: Database["public"]["Enums"]["proposal_status"] | null
          timeline_days: number | null
          updated_at: string | null
        }
        Insert: {
          cover_letter: string
          created_at?: string | null
          estimated_hours?: number | null
          hourly_rate?: number | null
          id?: string
          job_id: string
          price?: number | null
          professional_id: string
          status?: Database["public"]["Enums"]["proposal_status"] | null
          timeline_days?: number | null
          updated_at?: string | null
        }
        Update: {
          cover_letter?: string
          created_at?: string | null
          estimated_hours?: number | null
          hourly_rate?: number | null
          id?: string
          job_id?: string
          price?: number | null
          professional_id?: string
          status?: Database["public"]["Enums"]["proposal_status"] | null
          timeline_days?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "proposals_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposals_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          job_id: string
          rating: number
          reviewee_id: string
          reviewer_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          job_id: string
          rating: number
          reviewee_id: string
          reviewer_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          job_id?: string
          rating?: number
          reviewee_id?: string
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewee_id_fkey"
            columns: ["reviewee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      support_ticket_messages: {
        Row: {
          attachments: string[] | null
          created_at: string | null
          id: string
          message: string
          sender_id: string
          ticket_id: string
        }
        Insert: {
          attachments?: string[] | null
          created_at?: string | null
          id?: string
          message: string
          sender_id: string
          ticket_id: string
        }
        Update: {
          attachments?: string[] | null
          created_at?: string | null
          id?: string
          message?: string
          sender_id?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_ticket_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          attachments: string[] | null
          created_at: string | null
          description: string
          id: string
          status: Database["public"]["Enums"]["support_ticket_status"] | null
          subject: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          attachments?: string[] | null
          created_at?: string | null
          description: string
          id?: string
          status?: Database["public"]["Enums"]["support_ticket_status"] | null
          subject: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          attachments?: string[] | null
          created_at?: string | null
          description?: string
          id?: string
          status?: Database["public"]["Enums"]["support_ticket_status"] | null
          subject?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      contract_status: "draft" | "active" | "completed" | "terminated"
      invoice_status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
      job_status: "draft" | "active" | "in_progress" | "completed" | "cancelled"
      job_type: "one-time" | "recurring"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      proposal_status: "pending" | "accepted" | "rejected" | "withdrawn"
      support_ticket_status: "open" | "in_progress" | "resolved" | "closed"
      user_role: "client" | "professional"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      contract_status: ["draft", "active", "completed", "terminated"],
      invoice_status: ["draft", "sent", "paid", "overdue", "cancelled"],
      job_status: ["draft", "active", "in_progress", "completed", "cancelled"],
      job_type: ["one-time", "recurring"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      proposal_status: ["pending", "accepted", "rejected", "withdrawn"],
      support_ticket_status: ["open", "in_progress", "resolved", "closed"],
      user_role: ["client", "professional"],
    },
  },
} as const
