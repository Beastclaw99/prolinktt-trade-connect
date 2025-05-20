
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  userTypes?: ("client" | "professional")[];
}

const ProtectedRoute = ({ userTypes }: ProtectedRouteProps) => {
  const { user, profile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-prolink-blue" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Check role-specific access if userTypes is provided and profile is loaded
  if (userTypes && profile && !userTypes.includes(profile.role as "client" | "professional")) {
    // Redirect to appropriate dashboard based on role
    if (profile.role === "client") {
      return <Navigate to="/client-dashboard" replace />;
    } else {
      return <Navigate to="/professional-dashboard" replace />;
    }
  }

  // User is authenticated and has the right role (or no specific role is required)
  return <Outlet />;
};

export default ProtectedRoute;
