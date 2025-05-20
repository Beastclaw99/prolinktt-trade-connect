
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ClientDashboard from "./pages/client/ClientDashboard";
import ProfessionalDashboard from "./pages/professional/ProfessionalDashboard";
import JobPostings from "./pages/client/JobPostings";
import JobPostNew from "./pages/client/JobPostNew";
import FindJobs from "./pages/professional/FindJobs";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
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
                {/* Add more client dashboard routes as needed */}
              </Route>
            </Route>
            
            {/* Protected Professional Routes */}
            <Route element={<ProtectedRoute userTypes={["professional"]} />}>
              <Route path="/professional-dashboard" element={<ProfessionalDashboard />}>
                <Route path="find-jobs" element={<FindJobs />} />
                {/* Add more professional dashboard routes as needed */}
              </Route>
            </Route>
            
            {/* Catch-all route for 404 errors */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
