
import { Link } from "react-router-dom";
import JobPostForm from "@/components/job/JobPostForm";

const JobPostNew = () => {
  return (
    <div className="space-y-6">
      <div>
        <Link 
          to="/client-dashboard/job-postings" 
          className="text-prolink-blue hover:text-prolink-blue-dark inline-flex items-center text-sm"
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to job postings
        </Link>
      </div>
      
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create New Job Posting</h1>
        <p className="text-gray-600 mt-1">Fill in the details below to create a new job posting and find qualified professionals.</p>
      </div>
      
      <JobPostForm />
    </div>
  );
};

export default JobPostNew;
