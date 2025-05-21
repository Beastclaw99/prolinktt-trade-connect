
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  userTypes?: ("client" | "professional")[];
}

const ProtectedRoute = ({ userTypes }: ProtectedRouteProps) => {
  const { user, profile, isLoading, refreshProfile } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Log for debugging purposes
    if (user && profile) {
      console.log("ProtectedRoute: User profile loaded", profile);
    } else if (user && !profile) {
      console.log("ProtectedRoute: User authenticated but profile not loaded, refreshing...");
      refreshProfile(user.id);
    }
  }, [user, profile, refreshProfile]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-prolink-blue" />
        <span className="text-prolink-blue font-medium">Loading your profile...</span>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    // Save the attempted URL for redirect after login
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
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
