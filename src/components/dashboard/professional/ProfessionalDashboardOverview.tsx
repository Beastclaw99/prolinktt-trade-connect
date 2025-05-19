
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, Clock, DollarSign, Star, MessageSquare, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ProfessionalDashboardOverview = () => {
  // Mock data for dashboard statistics
  const stats = [
    {
      title: "Active Jobs",
      value: "2",
      icon: <BriefcaseBusiness className="h-5 w-5 text-prolink-green" />,
      iconBg: "bg-green-50",
      link: "/professional-dashboard/jobs"
    },
    {
      title: "Pending Proposals",
      value: "5",
      icon: <Clock className="h-5 w-5 text-amber-500" />,
      iconBg: "bg-amber-50",
      link: "/professional-dashboard/proposals"
    },
    {
      title: "Earnings This Month",
      value: "$1,250",
      icon: <DollarSign className="h-5 w-5 text-emerald-500" />,
      iconBg: "bg-emerald-50",
      link: "/professional-dashboard/payments"
    },
    {
      title: "Rating",
      value: "4.8",
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      iconBg: "bg-yellow-50",
      link: "/professional-dashboard/reviews"
    }
  ];

  // Mock data for recent job matches
  const recentJobs = [
    {
      title: "Kitchen Renovation - Plumbing Work",
      client: "John Doe",
      location: "Austin, TX",
      price: "$900 - $1,200",
      postedDate: "2 days ago",
      matchScore: "92% match"
    },
    {
      title: "Electrical Wiring for Home Office",
      client: "Sarah Johnson",
      location: "Dallas, TX",
      price: "$400 - $600",
      postedDate: "3 days ago",
      matchScore: "88% match"
    },
    {
      title: "Bathroom Fixture Installation",
      client: "Robert Smith",
      location: "Houston, TX",
      price: "$300 - $450",
      postedDate: "5 hours ago",
      matchScore: "95% match"
    }
  ];

  // Mock data for active projects
  const activeJobs = [
    {
      title: "Kitchen Renovation Project",
      client: "David Miller",
      dueDate: "Dec 15, 2023",
      progress: 65,
      hoursLogged: 24,
      totalHours: 40
    },
    {
      title: "Outdoor Deck Repair",
      client: "Emily Taylor",
      dueDate: "Dec 10, 2023",
      progress: 30,
      hoursLogged: 8,
      totalHours: 25
    }
  ];

  // Mock data for pending actions
  const pendingActions = [
    {
      title: "Submit timesheet for Kitchen Project",
      type: "Timesheet",
      date: "Due today"
    },
    {
      title: "Client message requires response",
      type: "Message",
      date: "12 hours ago"
    },
    {
      title: "New job proposal awaiting submission",
      type: "Proposal",
      date: "Expires in 2 days"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, Michael</h1>
          <p className="text-gray-600">Here's what's happening with your work</p>
        </div>
        <Button className="btn-secondary flex items-center gap-2">
          <MessageSquare size={18} />
          Check Messages
        </Button>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`${stat.iconBg} p-3 rounded-full`}>
                  {stat.icon}
                </div>
                <Link to={stat.link} className="text-sm font-medium text-prolink-green hover:underline">
                  View details
                </Link>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
                <p className="text-gray-600 mt-1">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Profile completion card */}
      <Card className="card-hover">
        <CardHeader className="pb-4">
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>A complete profile helps you get more job opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-grow space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">Profile completion</span>
                <span className="font-medium text-gray-700">70%</span>
              </div>
              <Progress value={70} className="h-2 bg-gray-200" indicatorClassName="bg-prolink-green" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                Add Portfolio
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                Add Certification
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                Complete Skills
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent job matches */}
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle>Job Matches</CardTitle>
            <CardDescription>Recent jobs that match your skills and preferences</CardDescription>
          </div>
          <Link to="/professional-dashboard/find-jobs">
            <Button variant="outline">Find More Jobs</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentJobs.map((job, i) => (
              <div key={i} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{job.title}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                      <p className="text-sm text-gray-500">Client: {job.client}</p>
                      <p className="text-sm text-gray-500">Location: {job.location}</p>
                      <p className="text-sm text-gray-500">Budget: {job.price}</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Posted {job.postedDate}</p>
                  </div>
                  <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 md:gap-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {job.matchScore}
                    </span>
                    <Link to={`/professional-dashboard/jobs/${i}`} className="text-sm text-prolink-green hover:underline">
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active jobs */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Active Jobs</CardTitle>
            <CardDescription>Your currently ongoing jobs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {activeJobs.map((job, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900">{job.title}</h3>
                    <Link to={`/professional-dashboard/jobs/${i}/details`} className="text-sm text-prolink-green hover:underline">
                      Details
                    </Link>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Client: {job.client}</span>
                    <span className="text-gray-600">Due: {job.dueDate}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-prolink-green rounded-full h-2.5"
                      style={{ width: `${job.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-700">{job.progress}%</span>
                  </div>
                  <div className="flex justify-between text-sm pt-1">
                    <span className="text-gray-600">Hours logged: {job.hoursLogged}/{job.totalHours}</span>
                    <Link to={`/professional-dashboard/time-tracking/${i}`} className="text-prolink-green hover:underline">
                      Log Time
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending actions */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Action Required</CardTitle>
            <CardDescription>Items that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingActions.map((action, i) => (
                <div key={i} className="flex items-start p-3 rounded-md border border-gray-100 hover:border-gray-200 bg-white">
                  <div className="bg-red-50 p-2 rounded-full mr-4">
                    <AlertCircle size={20} className="text-red-500" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-900">{action.title}</h3>
                    <div className="flex flex-col xs:flex-row xs:items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                        {action.type}
                      </span>
                      <span className="text-xs text-gray-500">{action.date}</span>
                    </div>
                  </div>
                  <Link to="#" className="text-sm text-prolink-green hover:underline ml-2">
                    Take Action
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalDashboardOverview;
