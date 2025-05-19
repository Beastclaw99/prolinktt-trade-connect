
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, DollarSign, Calendar, Star } from "lucide-react";

const FindJobs = () => {
  // Mock data for job listings
  const jobListings = [
    {
      id: 1,
      title: "Kitchen Renovation - Plumbing Work",
      description: "Need a professional plumber for installation of new sink, dishwasher, and water lines as part of kitchen remodel. Experience with modern fixtures and knowledge of building codes required.",
      client: {
        name: "John Doe",
        rating: 4.8,
        jobsPosted: 12
      },
      location: "Austin, TX",
      type: "on-site",
      category: "Plumbing",
      subcategory: "Fixture Installation",
      skills: ["Pipe Fitting", "Fixture Installation", "Water Line Installation"],
      postedDate: "2 days ago",
      proposals: 6,
      budget: "$900 - $1,200",
      duration: "3-5 days",
      matchScore: 92
    },
    {
      id: 2,
      title: "Electrical Wiring for Home Office",
      description: "Looking for an electrician to install new outlets, lighting fixtures, and internet wiring for a home office space. Need someone with experience in residential electrical work.",
      client: {
        name: "Sarah Johnson",
        rating: 4.2,
        jobsPosted: 5
      },
      location: "Remote",
      type: "remote",
      category: "Electrical",
      subcategory: "General Wiring",
      skills: ["Electrical Wiring", "Outlet Installation", "Lighting Fixtures"],
      postedDate: "3 days ago",
      proposals: 4,
      budget: "$400 - $600",
      duration: "1-2 days",
      matchScore: 88
    },
    {
      id: 3,
      title: "Bathroom Fixture Installation",
      description: "Need installation of new bathroom vanity, toilet, and shower fixtures. Looking for someone who can also help with minor plumbing adjustments as needed.",
      client: {
        name: "Robert Smith",
        rating: 5.0,
        jobsPosted: 8
      },
      location: "Houston, TX",
      type: "on-site",
      category: "Plumbing",
      subcategory: "Fixture Installation",
      skills: ["Fixture Installation", "Bathroom Renovation", "Plumbing"],
      postedDate: "5 hours ago",
      proposals: 2,
      budget: "$300 - $450",
      duration: "1 day",
      matchScore: 95
    },
    {
      id: 4,
      title: "Custom Cabinetry for Kitchen",
      description: "Looking for a skilled carpenter to design and build custom kitchen cabinets. Must have portfolio of previous cabinetry work and experience with hardwood construction.",
      client: {
        name: "Emily Taylor",
        rating: 4.7,
        jobsPosted: 3
      },
      location: "Dallas, TX",
      type: "on-site",
      category: "Carpentry",
      subcategory: "Cabinetry",
      skills: ["Cabinetry", "Woodworking", "Kitchen Design"],
      postedDate: "1 day ago",
      proposals: 7,
      budget: "$3,500 - $5,000",
      duration: "2 weeks",
      matchScore: 85
    },
    {
      id: 5,
      title: "HVAC System Maintenance",
      description: "Annual maintenance service needed for residential HVAC system including cleaning, inspection, and minor repairs if necessary.",
      client: {
        name: "David Wilson",
        rating: 4.5,
        jobsPosted: 15
      },
      location: "Austin, TX",
      type: "on-site",
      category: "HVAC",
      subcategory: "Maintenance",
      skills: ["HVAC Maintenance", "Troubleshooting", "System Cleaning"],
      postedDate: "1 week ago",
      proposals: 10,
      budget: "$200 - $300",
      duration: "3-4 hours",
      matchScore: 78
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobListings);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredJobs(jobListings);
      return;
    }
    
    const results = jobListings.filter(job => 
      job.title.toLowerCase().includes(term) || 
      job.description.toLowerCase().includes(term) ||
      job.category.toLowerCase().includes(term) ||
      job.subcategory.toLowerCase().includes(term) ||
      job.skills.some(skill => skill.toLowerCase().includes(term))
    );
    
    setFilteredJobs(results);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Find Jobs</h1>
        <p className="text-gray-600 mt-1">Browse job opportunities that match your skills and preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search jobs by keyword, skill, or category" 
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={18} />
          Filter Jobs
        </Button>
      </div>

      <div className="space-y-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="overflow-hidden card-hover">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <span>Client: {job.client.name}</span>
                    <div className="flex items-center">
                      <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
                      <span>{job.client.rating}</span>
                    </div>
                    <span>({job.client.jobsPosted} jobs posted)</span>
                  </div>
                </div>
                <Badge className="bg-prolink-green text-white hover:bg-prolink-green-dark">
                  {job.matchScore}% Match
                </Badge>
              </div>
              
              <p className="text-gray-600 mb-4">{job.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={16} className="mr-2 text-gray-500" />
                  <span>{job.location}</span>
                  <span className="ml-2 text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                    {job.type === 'on-site' ? 'On-site' : 'Remote'}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign size={16} className="mr-2 text-gray-500" />
                  <span>Budget: {job.budget}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-2 text-gray-500" />
                  <span>Duration: {job.duration}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                  {job.category}
                </Badge>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                  {job.subcategory}
                </Badge>
                {job.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-col xs:flex-row xs:items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm">
                  <span className="text-gray-500">Posted {job.postedDate} • </span>
                  <span className="text-gray-700">{job.proposals} proposals</span>
                </div>
                <div className="flex gap-3 mt-3 xs:mt-0">
                  <Link to={`/professional-dashboard/jobs/${job.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                  <Link to={`/professional-dashboard/jobs/${job.id}/apply`}>
                    <Button className="btn-secondary" size="sm">
                      Submit Proposal
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FindJobs;
