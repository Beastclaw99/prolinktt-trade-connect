
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ClientDashboard from "./pages/client/ClientDashboard";
import ProfessionalDashboard from "./pages/professional/ProfessionalDashboard";
import JobPostings from "./pages/client/JobPostings";
import JobPostNew from "./pages/client/JobPostNew";
import FindJobs from "./pages/professional/FindJobs";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Helper component to redirect users to their appropriate dashboard
function DashboardRedirect() {
  const { profile } = useAuth();
  
  if (!profile) {
    return <Navigate to="/login" replace />;
  }
  
  return <Navigate to={profile.role === "client" ? "/client-dashboard" : "/professional-dashboard"} replace />;
}

// Create a component to hold the routes
function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected Client Routes */}
      <Route element={<ProtectedRoute userTypes={["client"]} />}>
        <Route path="/client-dashboard" element={<ClientDashboard />}>
          <Route path="job-postings" element={<JobPostings />} />
          <Route path="job-postings/new" element={<JobPostNew />} />
          <Route path="messages" element={<div>Messages</div>} /> {/* Placeholder for Messages component */}
          <Route path="scheduling" element={<div>Scheduling</div>} /> {/* Placeholder for Scheduling component */}
          <Route path="payments" element={<div>Payments</div>} /> {/* Placeholder for Payments component */}
          <Route path="contracts" element={<div>Contracts</div>} /> {/* Placeholder for Contracts component */}
          <Route path="reviews" element={<div>Reviews</div>} /> {/* Placeholder for Reviews component */}
          <Route path="find-professionals" element={<div>Find Professionals</div>} /> {/* Placeholder for Find Professionals component */}
          <Route path="support" element={<div>Support</div>} /> {/* Placeholder for Support component */}
          <Route path="settings" element={<div>Settings</div>} /> {/* Placeholder for Settings component */}
        </Route>
      </Route>
      
      {/* Protected Professional Routes */}
      <Route element={<ProtectedRoute userTypes={["professional"]} />}>
        <Route path="/professional-dashboard" element={<ProfessionalDashboard />}>
          <Route path="find-jobs" element={<FindJobs />} />
          <Route path="profile" element={<div>Profile</div>} /> {/* Placeholder for Profile component */}
          <Route path="messages" element={<div>Messages</div>} /> {/* Placeholder for Messages component */}
          <Route path="schedule" element={<div>Schedule</div>} /> {/* Placeholder for Schedule component */}
          <Route path="time-tracking" element={<div>Time Tracking</div>} /> {/* Placeholder for Time Tracking component */}
          <Route path="payments" element={<div>Payments</div>} /> {/* Placeholder for Payments component */}
          <Route path="job-completion" element={<div>Job Completion</div>} /> {/* Placeholder for Job Completion component */}
          <Route path="reviews" element={<div>Reviews & Ratings</div>} /> {/* Placeholder for Reviews component */}
          <Route path="support" element={<div>Support</div>} /> {/* Placeholder for Support component */}
          <Route path="settings" element={<div>Settings</div>} /> {/* Placeholder for Settings component */}
        </Route>
      </Route>
      
      {/* Route to redirect users to their appropriate dashboard */}
      <Route path="/dashboard" element={<DashboardRedirect />} />
      
      {/* Catch-all route for 404 errors */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
