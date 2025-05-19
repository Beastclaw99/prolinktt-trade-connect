
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const JobPostings = () => {
  // Mock data for job postings
  const jobPostings = [
    {
      id: 1,
      title: "Kitchen Renovation - Plumbing Work",
      description: "Need a professional plumber for installation of new sink, dishwasher, and water lines as part of kitchen remodel.",
      status: "active",
      location: "Austin, TX",
      category: "Plumbing",
      postedDate: "2 days ago",
      proposals: 6,
      budget: "$900 - $1,200"
    },
    {
      id: 2,
      title: "Electrical Wiring for Home Office",
      description: "Looking for an electrician to install new outlets, lighting fixtures, and internet wiring for a home office space.",
      status: "active",
      location: "Remote",
      category: "Electrical",
      postedDate: "3 days ago",
      proposals: 4,
      budget: "$400 - $600"
    },
    {
      id: 3,
      title: "Bathroom Fixture Installation",
      description: "Need installation of new bathroom vanity, toilet, and shower fixtures.",
      status: "pending",
      location: "Austin, TX",
      category: "Plumbing",
      postedDate: "5 hours ago",
      proposals: 2,
      budget: "$300 - $450"
    },
    {
      id: 4,
      title: "Deck Repair and Staining",
      description: "Wooden deck needs repair of broken boards and complete staining. Approximately 300 sq ft.",
      status: "completed",
      location: "Austin, TX",
      category: "Carpentry",
      postedDate: "2 weeks ago",
      proposals: 8,
      budget: "$1,200 - $1,500"
    },
    {
      id: 5,
      title: "HVAC System Maintenance",
      description: "Annual maintenance service needed for residential HVAC system including cleaning and inspection.",
      status: "expired",
      location: "Dallas, TX",
      category: "HVAC",
      postedDate: "30 days ago",
      proposals: 3,
      budget: "$200 - $300"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'active':
        return <div className="flex items-center text-green-600"><div className="h-2 w-2 rounded-full bg-green-600 mr-2"></div> Active</div>;
      case 'pending':
        return <div className="flex items-center text-amber-600"><Clock size={16} className="mr-2" /> Pending</div>;
      case 'completed':
        return <div className="flex items-center text-blue-600"><CheckCircle size={16} className="mr-2" /> Completed</div>;
      case 'expired':
        return <div className="flex items-center text-gray-500"><AlertTriangle size={16} className="mr-2" /> Expired</div>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
          <p className="text-gray-600 mt-1">Manage all your job postings in one place</p>
        </div>
        
        <Link to="/client-dashboard/job-postings/new">
          <Button className="btn-primary flex items-center gap-2">
            <Plus size={18} />
            Post New Job
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search job postings" 
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={18} />
          Filter
        </Button>
      </div>

      <div className="space-y-4">
        {jobPostings.map((job) => (
          <Card key={job.id} className="overflow-hidden card-hover">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
                    {getStatusIcon(job.status)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Posted {job.postedDate}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="bg-gray-100 text-gray-700 text-sm rounded-full px-3 py-1">
                    {job.category}
                  </div>
                  <div className="bg-gray-100 text-gray-700 text-sm rounded-full px-3 py-1">
                    {job.location}
                  </div>
                  <div className="bg-gray-100 text-gray-700 text-sm rounded-full px-3 py-1">
                    {job.budget}
                  </div>
                </div>
                
                <div className="flex flex-col xs:flex-row xs:items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">{job.proposals}</span>
                    <span className="text-gray-500"> proposals received</span>
                  </div>
                  <div className="flex gap-3 mt-3 xs:mt-0">
                    <Link to={`/client-dashboard/job-postings/${job.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    {job.status === 'active' && (
                      <Link to={`/client-dashboard/job-postings/${job.id}/edit`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                    )}
                    {job.status === 'pending' && (
                      <Button className="btn-primary" size="sm">
                        Publish Now
                      </Button>
                    )}
                    {job.status === 'expired' && (
                      <Button className="btn-secondary" size="sm">
                        Repost
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobPostings;
