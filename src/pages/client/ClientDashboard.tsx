
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getUnreadMessagesCount } from "@/services/message.service";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import ClientDashboardOverview from "@/components/dashboard/client/ClientDashboardOverview";
import { Loader2 } from "lucide-react";

const ClientDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, isLoading, refreshProfile } = useAuth();
  
  useEffect(() => {
    // If user is loaded but profile is not, try to refresh it
    if (user && !profile) {
      refreshProfile(user.id);
    }
    // If user is loaded but doesn't have the correct role, redirect
    else if (profile && profile.role !== 'client') {
      console.log("ClientDashboard: User is not a client, redirecting to professional dashboard");
      navigate('/professional-dashboard');
    }
  }, [user, profile, navigate, refreshProfile]);

  // Get unread messages count
  const { data: unreadMessages = 0 } = useQuery({
    queryKey: ['unreadMessages', user?.id],
    queryFn: () => user ? getUnreadMessagesCount(user.id) : Promise.resolve(0),
    enabled: !!user,
  });

  // Close the sidebar when changing routes (on mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  if (isLoading || !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-prolink-blue" />
        <span className="text-prolink-blue font-medium">Loading client dashboard...</span>
      </div>
    );
  }
  
  // Display the full name if available, otherwise fallback to "Client"
  const displayName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : "Client";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader 
        userType="client"
        userName={displayName}
        unreadMessages={unreadMessages}
        unreadNotifications={2} // TODO: Implement real notification count
        onSidebarToggle={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar userType="client" isOpen={isSidebarOpen} />
        
        <div className="flex-1 overflow-auto p-6">
          {location.pathname === '/client-dashboard' ? (
            <ClientDashboardOverview />
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
