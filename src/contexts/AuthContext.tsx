
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { Database } from "@/integrations/supabase/types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  signUp: (email: string, password: string, metadata: { first_name: string; last_name: string; role: "client" | "professional" }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  refreshProfile: (userId: string) => Promise<Profile | null>; // Updated return type to match implementation
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch profile function with retry logic
  const fetchProfile = async (userId: string, retryCount = 0): Promise<Profile | null> => {
    try {
      console.log(`AuthProvider: Fetching profile for user ${userId}, attempt ${retryCount + 1}`);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        
        // If profile not found and we haven't retried too many times,
        // wait a bit and try again (could be database replication lag)
        if (error.code === 'PGRST116' && retryCount < 3) {
          console.log(`Profile not found, retrying in ${(retryCount + 1) * 500}ms...`);
          return new Promise((resolve) => {
            setTimeout(async () => {
              const result = await fetchProfile(userId, retryCount + 1);
              resolve(result);
            }, (retryCount + 1) * 500);
          });
        }
        return null;
      }

      console.log("AuthProvider: Profile fetched", data);
      setProfile(data);
      return data;
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      return null;
    }
  };

  // Initialize session
  useEffect(() => {
    console.log("AuthProvider: Setting up auth state listener");
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          // Use setTimeout to prevent deadlock
          setTimeout(() => {
            fetchProfile(currentSession.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("AuthProvider: Initial session check", session ? "found session" : "no session");
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setIsLoading(false);
    });

    return () => {
      console.log("AuthProvider: Cleaning up auth state listener");
      subscription.unsubscribe();
    };
  }, []);

  // Sign up function
  async function signUp(email: string, password: string, metadata: { first_name: string; last_name: string; role: "client" | "professional" }) {
    console.log("AuthProvider: Signing up with", { email, metadata });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });

      if (error) {
        console.error("Signup error:", error);
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }

      console.log("AuthProvider: Signup successful", data);
      
      toast({
        title: "Registration successful",
        description: "Welcome to ProLinkTT!",
      });
      
      // Wait a moment for the profile to be created via the database trigger
      setTimeout(async () => {
        if (data.user) {
          const profile = await fetchProfile(data.user.id);
          
          // Redirect to the appropriate dashboard based on role
          const dashboardPath = metadata.role === "client" 
            ? "/client-dashboard" 
            : "/professional-dashboard";
            
          navigate(dashboardPath);
        }
      }, 500);
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Registration failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
      throw error;
    }
  }

  // Sign in function
  async function signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }

      // Get redirect path from URL or default to dashboard
      const params = new URLSearchParams(location.search);
      const redirectTo = params.get('redirect') || "/dashboard";

      toast({
        title: "Login successful",
        description: "Welcome back!",
      });

      // Wait briefly for profile to load before navigating
      setTimeout(async () => {
        if (data.user) {
          const fetchedProfile = await fetchProfile(data.user.id);
          
          if (fetchedProfile?.role === "client") {
            navigate("/client-dashboard");
          } else if (fetchedProfile?.role === "professional") {
            navigate("/professional-dashboard");
          } else {
            navigate(redirectTo); // Fallback
          }
        }
      }, 300);
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
      throw error;
    }
  }

  // Sign out function
  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }

      // The auth state listener will handle clearing the user state
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });

      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    }
  }

  // Update profile function
  async function updateProfile(data: Partial<Profile>) {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to update your profile",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) {
        toast({
          title: "Error updating profile",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }

      // Refresh profile data
      fetchProfile(user.id);

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    }
  }

  // Function to refresh the profile manually with retry logic
  async function refreshProfile(userId: string) {
    return await fetchProfile(userId);
  }

  const value = {
    session,
    user,
    profile,
    isLoading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
