
import { supabase } from "@/integrations/supabase/client";
import { Job, Proposal } from "@/types/supabase";

export const jobService = {
  // Job CRUD operations
  async createJob(jobData: Omit<Job, "id" | "created_at" | "updated_at">): Promise<Job | null> {
    const { data, error } = await supabase
      .from('jobs')
      .insert(jobData)
      .select()
      .single();

    if (error) {
      console.error("Error creating job:", error);
      throw error;
    }

    return data;
  },

  async getJob(id: string): Promise<Job | null> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*, client:client_id(id, first_name, last_name, avatar_url, average_rating)')
      .eq('id', id)
      .single();

    if (error) {
      console.error("Error fetching job:", error);
      throw error;
    }

    return data;
  },

  async getJobs(options?: {
    status?: string;
    category?: string;
    client_id?: string;
    limit?: number;
    order?: { column: string; ascending: boolean };
  }): Promise<Job[]> {
    let query = supabase
      .from('jobs')
      .select('*, client:client_id(id, first_name, last_name, avatar_url, average_rating)');

    if (options?.status) {
      query = query.eq('status', options.status);
    }

    if (options?.category) {
      query = query.eq('category', options.category);
    }

    if (options?.client_id) {
      query = query.eq('client_id', options.client_id);
    }

    if (options?.order) {
      query = query.order(options.order.column, { ascending: options.order.ascending });
    } else {
      // Default order by created_at
      query = query.order('created_at', { ascending: false });
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching jobs:", error);
      throw error;
    }

    return data || [];
  },

  async updateJob(id: string, updates: Partial<Job>): Promise<Job | null> {
    const { data, error } = await supabase
      .from('jobs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Error updating job:", error);
      throw error;
    }

    return data;
  },

  async deleteJob(id: string): Promise<void> {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting job:", error);
      throw error;
    }
  },

  // Proposal operations
  async createProposal(proposalData: Omit<Proposal, "id" | "created_at" | "updated_at">): Promise<Proposal | null> {
    const { data, error } = await supabase
      .from('proposals')
      .insert(proposalData)
      .select()
      .single();

    if (error) {
      console.error("Error creating proposal:", error);
      throw error;
    }

    return data;
  },

  async getJobProposals(jobId: string): Promise<Proposal[]> {
    const { data, error } = await supabase
      .from('proposals')
      .select('*, professional:professional_id(id, first_name, last_name, avatar_url, average_rating, hourly_rate)')
      .eq('job_id', jobId);

    if (error) {
      console.error("Error fetching job proposals:", error);
      throw error;
    }

    return data || [];
  },

  async getProfessionalProposals(professionalId: string): Promise<Proposal[]> {
    const { data, error } = await supabase
      .from('proposals')
      .select('*, job:job_id(id, title, description, status, client_id, budget_min, budget_max, hourly_rate)')
      .eq('professional_id', professionalId);

    if (error) {
      console.error("Error fetching professional proposals:", error);
      throw error;
    }

    return data || [];
  },

  async updateProposalStatus(id: string, status: string): Promise<Proposal | null> {
    const { data, error } = await supabase
      .from('proposals')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Error updating proposal status:", error);
      throw error;
    }

    return data;
  }
};
