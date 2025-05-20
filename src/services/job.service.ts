
import { supabase } from "@/integrations/supabase/client";
import { Job, JobInsert, Proposal, ProposalInsert, job_status, proposal_status } from "@/types";
import { v4 as uuidv4 } from 'uuid';

export const createJob = async (job: Omit<JobInsert, 'id' | 'created_at'>): Promise<Job> => {
  try {
    const jobId = uuidv4();
    const { data, error } = await supabase
      .from('jobs')
      .insert([
        {
          id: jobId,
          ...job,
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data as Job;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

export const getJobById = async (jobId: string): Promise<Job | null> => {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (error) {
      throw error;
    }

    return data as Job;
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return null;
  }
};

export const updateJobStatus = async (jobId: string, status: job_status): Promise<void> => {
  try {
    const { error } = await supabase
      .from('jobs')
      .update({ status })
      .eq('id', jobId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating job status:', error);
    throw error;
  }
};

export const getAllJobs = async (): Promise<Job[]> => {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data as Job[];
  } catch (error) {
    console.error("Error fetching all jobs:", error);
    return [];
  }
};

export const getJobsByClientId = async (clientId: string): Promise<Job[]> => {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data as Job[];
  } catch (error) {
    console.error("Error fetching jobs by client ID:", error);
    return [];
  }
};

export const deleteJob = async (jobId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', jobId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error deleting job:", error);
  }
};

// Proposals
export const createProposal = async (proposal: Omit<ProposalInsert, 'id' | 'created_at'>): Promise<Proposal> => {
  try {
    const proposalId = uuidv4();
    const { data, error } = await supabase
      .from('proposals')
      .insert([
        {
          id: proposalId,
          ...proposal,
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data as Proposal;
  } catch (error) {
    console.error("Error creating proposal:", error);
    throw error;
  }
};

export const getProposalById = async (proposalId: string): Promise<Proposal | null> => {
  try {
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .eq('id', proposalId)
      .single();

    if (error) {
      throw error;
    }

    return data as Proposal;
  } catch (error) {
    console.error("Error fetching proposal by ID:", error);
    return null;
  }
};

export const getProposalsByJobId = async (jobId: string): Promise<Proposal[]> => {
  try {
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .eq('job_id', jobId);

    if (error) {
      throw error;
    }

    return data as Proposal[];
  } catch (error) {
    console.error("Error fetching proposals by job ID:", error);
    return [];
  }
};

export const getProposalsByProfessionalId = async (professionalId: string): Promise<Proposal[]> => {
  try {
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .eq('professional_id', professionalId);

    if (error) {
      throw error;
    }

    return data as Proposal[];
  } catch (error) {
    console.error("Error fetching proposals by professional ID:", error);
    return [];
  }
};

export const updateProposalStatus = async (
  proposalId: string, 
  status: proposal_status
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('proposals')
      .update({ status })
      .eq('id', proposalId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating proposal status:', error);
    throw error;
  }
};

export const deleteProposal = async (proposalId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('proposals')
      .delete()
      .eq('id', proposalId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error deleting proposal:", error);
  }
};
