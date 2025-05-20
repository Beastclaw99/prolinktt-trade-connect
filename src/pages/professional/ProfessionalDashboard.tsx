
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getUnreadMessagesCount } from "@/services/message.service";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import ProfessionalDashboardOverview from "@/components/dashboard/professional/ProfessionalDashboardOverview";

const ProfessionalDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, profile } = useAuth();
  
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
  
  // Display the full name if available, otherwise fallback to "Professional"
  const displayName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : "Professional";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader 
        userType="professional"
        userName={displayName}
        unreadMessages={unreadMessages}
        unreadNotifications={1} // TODO: Implement real notification count
        onSidebarToggle={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar userType="professional" isOpen={isSidebarOpen} />
        
        <div className="flex-1 overflow-auto p-6">
          {location.pathname === '/professional-dashboard' ? (
            <ProfessionalDashboardOverview />
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
