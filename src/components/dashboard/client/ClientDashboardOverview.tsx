
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, Clock, Users, MessageSquare, AlertCircle, Plus } from 'lucide-react';

const ClientDashboardOverview = () => {
  // Mock data for dashboard statistics
  const stats = [
    {
      title: "Active Jobs",
      value: "3",
      icon: <BriefcaseBusiness className="h-5 w-5 text-prolink-blue" />,
      iconBg: "bg-blue-50",
      link: "/client-dashboard/job-postings"
    },
    {
      title: "Pending Proposals",
      value: "12",
      icon: <Clock className="h-5 w-5 text-amber-500" />,
      iconBg: "bg-amber-50",
      link: "/client-dashboard/job-postings"
    },
    {
      title: "Hired Professionals",
      value: "5",
      icon: <Users className="h-5 w-5 text-prolink-green" />,
      iconBg: "bg-green-50",
      link: "/client-dashboard/professionals"
    },
    {
      title: "Unread Messages",
      value: "7",
      icon: <MessageSquare className="h-5 w-5 text-purple-500" />,
      iconBg: "bg-purple-50",
      link: "/client-dashboard/messages"
    }
  ];

  // Mock data for recent job postings
  const recentJobs = [
    {
      title: "Kitchen Renovation - Plumbing Work",
      status: "Active",
      proposals: 6,
      date: "Posted 2 days ago",
      statusColor: "bg-green-500"
    },
    {
      title: "Electrical Wiring for Home Office",
      status: "Active",
      proposals: 4,
      date: "Posted 3 days ago",
      statusColor: "bg-green-500"
    },
    {
      title: "Bathroom Fixture Installation",
      status: "Pending",
      proposals: 2,
      date: "Posted 5 hours ago",
      statusColor: "bg-amber-500"
    }
  ];

  // Mock data for active projects
  const activeProjects = [
    {
      title: "Kitchen Renovation Project",
      professional: "Michael Chen",
      dueDate: "Dec 15, 2023",
      progress: 65
    },
    {
      title: "Outdoor Deck Repair",
      professional: "Sarah Johnson",
      dueDate: "Dec 10, 2023",
      progress: 30
    }
  ];

  // Mock data for pending actions
  const pendingActions = [
    {
      title: "Review proposal for Kitchen Renovation",
      type: "Proposal Review",
      date: "Due in 1 day"
    },
    {
      title: "Pay invoice for Outdoor Deck Repair",
      type: "Payment Due",
      date: "Due in 3 days"
    },
    {
      title: "Complete project feedback for Fence Installation",
      type: "Feedback Required",
      date: "Due today"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, John</h1>
          <p className="text-gray-600">Here's what's happening with your projects</p>
        </div>
        <Button className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Post New Job
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
                <Link to={stat.link} className="text-sm font-medium text-prolink-blue hover:underline">
                  View all
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

      {/* Recent job postings */}
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle>Recent Job Postings</CardTitle>
            <CardDescription>Your recently posted jobs and their current status</CardDescription>
          </div>
          <Link to="/client-dashboard/job-postings">
            <Button variant="outline">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentJobs.map((job, i) => (
              <div key={i} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${job.statusColor}`}></div>
                      <h3 className="font-medium text-gray-900">{job.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{job.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">{job.proposals}</span>
                      <span className="text-gray-500"> proposals</span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                      {job.status}
                    </span>
                    <Link to={`/client-dashboard/job-postings/${i}`} className="text-sm text-prolink-blue hover:underline">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active projects */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>Currently ongoing projects and their progress</CardDescription>
          </CardHeader>
          <CardContent>
            {activeProjects.length > 0 ? (
              <div className="space-y-5">
                {activeProjects.map((project, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900">{project.title}</h3>
                      <Link to="#" className="text-sm text-prolink-blue hover:underline">
                        Details
                      </Link>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Professional: {project.professional}</span>
                      <span className="text-gray-600">Due: {project.dueDate}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-prolink-blue rounded-full h-2.5"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-700">{project.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No active projects at the moment.</p>
                <Link to="/client-dashboard/job-postings/new">
                  <Button className="mt-4">Post a Job</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending actions */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Action Required</CardTitle>
            <CardDescription>Items that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingActions.length > 0 ? (
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
                    <Link to="#" className="text-sm text-prolink-blue hover:underline ml-2">
                      Take Action
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No pending actions at this time.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientDashboardOverview;
