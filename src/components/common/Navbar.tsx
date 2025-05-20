
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, Bell, MessageSquare, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile"; // Fixed import name

const Navbar = () => {
  const { user, profile, signOut } = useAuth();
  const isMobile = useIsMobile(); // Use the correct hook directly
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!profile) return "U";
    
    const firstInitial = profile.first_name?.charAt(0) || "";
    const lastInitial = profile.last_name?.charAt(0) || "";
    
    return (firstInitial + lastInitial).toUpperCase();
  };

  const getDashboardLink = () => {
    if (!profile) return "/";
    
    return profile.role === "client" ? "/client-dashboard" : "/professional-dashboard";
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="font-bold text-xl text-prolink-blue">ProLinkTT</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">How It Works</Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">Find Pros</Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">About Us</Link>
          </nav>

          {/* Desktop Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="flex items-center justify-between px-4 py-2 border-b">
                      <h3 className="font-medium">Notifications</h3>
                      <Button variant="link" size="sm" className="h-auto p-0">Mark all as read</Button>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      <div className="py-2 px-4 hover:bg-muted cursor-pointer border-b">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium">New proposal received</p>
                          <span className="text-xs text-muted-foreground">10m ago</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">John Doe submitted a proposal for your job: "Bathroom Renovation in Port of Spain"</p>
                      </div>
                      <div className="py-2 px-4 hover:bg-muted cursor-pointer border-b">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium">Payment received</p>
                          <span className="text-xs text-muted-foreground">2h ago</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">You've received a payment of $250 for "Kitchen Cabinet Installation"</p>
                      </div>
                    </div>
                    <div className="p-2 border-t">
                      <Link to="#" className="block text-center text-xs text-prolink-blue hover:underline">
                        View all notifications
                      </Link>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Messages */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <MessageSquare className="h-5 w-5" />
                      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500"></span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="flex items-center justify-between px-4 py-2 border-b">
                      <h3 className="font-medium">Messages</h3>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      <div className="py-2 px-4 hover:bg-muted cursor-pointer border-b">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <p className="text-sm font-medium">James Davis</p>
                              <span className="text-xs text-muted-foreground">12m ago</span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">Hello, I'm interested in discussing your kitchen renovation project.</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2 px-4 hover:bg-muted cursor-pointer border-b">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>SM</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <p className="text-sm font-medium">Sarah Miller</p>
                              <span className="text-xs text-muted-foreground">1d ago</span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">Thank you for your quick response. I've attached the invoice for your review.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 border-t">
                      <Link to="#" className="block text-center text-xs text-prolink-blue hover:underline">
                        View all messages
                      </Link>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="flex items-center gap-2 hover:bg-gray-100 rounded-full p-1 pr-3"
                    >
                      <Avatar className="h-8 w-8 border border-gray-200">
                        <AvatarImage src={profile?.avatar_url || ""} />
                        <AvatarFallback className="bg-prolink-blue text-white">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{profile?.first_name || "User"}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-medium">{profile?.first_name} {profile?.last_name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <div className="mt-1">
                        <span className={cn(
                          "text-xs px-1.5 py-0.5 rounded-full",
                          profile?.role === "professional" 
                            ? "bg-amber-100 text-amber-800" 
                            : "bg-blue-100 text-blue-800"
                        )}>
                          {profile?.role === "professional" ? "Professional" : "Client"}
                        </span>
                      </div>
                    </div>
                    <Link to={getDashboardLink()}>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link to={`${getDashboardLink()}/settings`}>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button>Join Now</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col px-4 pt-2 pb-4 space-y-2">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-gray-100">Home</Link>
            <Link to="#" className="px-3 py-2 rounded-md hover:bg-gray-100">How It Works</Link>
            <Link to="#" className="px-3 py-2 rounded-md hover:bg-gray-100">Find Pros</Link>
            <Link to="#" className="px-3 py-2 rounded-md hover:bg-gray-100">About Us</Link>
            
            {user ? (
              <>
                <hr className="my-2" />
                <Link to={getDashboardLink()} className="px-3 py-2 rounded-md hover:bg-gray-100 flex items-center">
                  <User className="mr-2 h-4 w-4" /> Dashboard
                </Link>
                <Link to="#" className="px-3 py-2 rounded-md hover:bg-gray-100 flex items-center">
                  <Bell className="mr-2 h-4 w-4" /> Notifications
                </Link>
                <Link to="#" className="px-3 py-2 rounded-md hover:bg-gray-100 flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4" /> Messages
                </Link>
                <Link to={`${getDashboardLink()}/settings`} className="px-3 py-2 rounded-md hover:bg-gray-100 flex items-center">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </Link>
                <button
                  onClick={() => signOut()}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 flex items-center text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <hr className="my-2" />
                <Link to="/login" className="block">
                  <Button variant="outline" className="w-full mb-2">Log in</Button>
                </Link>
                <Link to="/register" className="block">
                  <Button className="w-full">Join Now</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
