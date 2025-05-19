
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import ProfessionalDashboardOverview from "@/components/dashboard/professional/ProfessionalDashboardOverview";

const ProfessionalDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Close the sidebar when changing routes (on mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader 
        userType="professional"
        userName="Michael Chen"
        unreadMessages={5}
        unreadNotifications={1}
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
