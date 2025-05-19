
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import ClientDashboardOverview from "@/components/dashboard/client/ClientDashboardOverview";

const ClientDashboard = () => {
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
        userType="client"
        userName="John Doe"
        unreadMessages={3}
        unreadNotifications={2}
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
