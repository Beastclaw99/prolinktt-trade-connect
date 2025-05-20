
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, MessageSquare, Menu, Search, X, LogOut, Settings, User } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';

interface DashboardHeaderProps {
  userType: 'client' | 'professional';
  userName: string;
  unreadMessages?: number;
  unreadNotifications?: number;
  onSidebarToggle: () => void;
  isSidebarOpen: boolean;
}

const DashboardHeader = ({
  userType,
  userName,
  unreadMessages = 0,
  unreadNotifications = 0,
  onSidebarToggle,
  isSidebarOpen
}: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const { signOut, profile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };
  
  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!profile) return userName.charAt(0).toUpperCase();
    
    const firstInitial = profile.first_name?.charAt(0) || "";
    const lastInitial = profile.last_name?.charAt(0) || "";
    
    return (firstInitial + lastInitial).toUpperCase() || userName.charAt(0).toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center mr-4 lg:hidden">
          <Button variant="ghost" size="icon" onClick={onSidebarToggle} className="text-gray-500">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
        
        <div className="hidden lg:flex mr-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-md bg-gradient-to-r from-prolink-blue to-prolink-green p-1">
              <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L4 9V21H20V9L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 13H8V21H16V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800">ProLinkTT</span>
          </Link>
        </div>

        <form onSubmit={handleSearch} className="relative flex-1 mr-4 max-w-md">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="search"
              placeholder={userType === 'client' ? "Search professionals..." : "Search jobs..."}
              className="h-10 w-full rounded-md border border-gray-300 bg-white pl-9 pr-4 focus:border-prolink-blue focus:outline-none focus:ring-1 focus:ring-prolink-blue text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        <div className="flex items-center gap-4 md:gap-6 ml-auto">
          <Link to={`/${userType}-dashboard/messages`}>
            <Button variant="ghost" size="icon" className="relative text-gray-500">
              <MessageSquare size={20} />
              {unreadMessages > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-prolink-green text-[10px] font-medium text-white flex items-center justify-center">
                  {unreadMessages > 99 ? '99+' : unreadMessages}
                </span>
              )}
            </Button>
          </Link>

          <Button variant="ghost" size="icon" className="relative text-gray-500">
            <Bell size={20} />
            {unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                {unreadNotifications > 99 ? '99+' : unreadNotifications}
              </span>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-9 w-9 border border-gray-200">
                  <AvatarImage src={profile?.avatar_url || undefined} alt={userName} />
                  <AvatarFallback className="bg-gray-100 text-gray-800">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userType === 'client' ? 'Client Account' : 'Professional Account'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to={`/${userType}-dashboard/profile`}>
                <DropdownMenuItem className="flex items-center gap-2">
                  <User size={16} />
                  <span>My Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link to={`/${userType}-dashboard/settings`}>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Settings size={16} />
                  <span>Settings</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
