
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { 
  Home, 
  BriefcaseBusiness, 
  Inbox, 
  CalendarDays, 
  CreditCard, 
  FileText, 
  Star, 
  FileCheck2, 
  HelpCircle, 
  User,
  Clock,
  Search
} from 'lucide-react';

interface SidebarProps {
  userType: 'client' | 'professional';
  isOpen: boolean;
}

interface SidebarItem {
  name: string;
  to: string;
  icon: React.ReactNode;
}

const Sidebar = ({ userType, isOpen }: SidebarProps) => {
  const location = useLocation();
  
  const clientNavItems: SidebarItem[] = [
    {
      name: 'Dashboard',
      to: '/client-dashboard',
      icon: <Home size={20} />,
    },
    {
      name: 'Job Postings',
      to: '/client-dashboard/job-postings',
      icon: <BriefcaseBusiness size={20} />,
    },
    {
      name: 'Messages',
      to: '/client-dashboard/messages',
      icon: <Inbox size={20} />,
    },
    {
      name: 'Scheduling',
      to: '/client-dashboard/scheduling',
      icon: <CalendarDays size={20} />,
    },
    {
      name: 'Payments',
      to: '/client-dashboard/payments',
      icon: <CreditCard size={20} />,
    },
    {
      name: 'Contracts',
      to: '/client-dashboard/contracts',
      icon: <FileText size={20} />,
    },
    {
      name: 'Reviews',
      to: '/client-dashboard/reviews',
      icon: <Star size={20} />,
    },
    {
      name: 'Find Professionals',
      to: '/client-dashboard/find-professionals',
      icon: <Search size={20} />,
    },
    {
      name: 'Support',
      to: '/client-dashboard/support',
      icon: <HelpCircle size={20} />,
    },
  ];

  const professionalNavItems: SidebarItem[] = [
    {
      name: 'Dashboard',
      to: '/professional-dashboard',
      icon: <Home size={20} />,
    },
    {
      name: 'My Profile',
      to: '/professional-dashboard/profile',
      icon: <User size={20} />,
    },
    {
      name: 'Find Jobs',
      to: '/professional-dashboard/find-jobs',
      icon: <Search size={20} />,
    },
    {
      name: 'Messages',
      to: '/professional-dashboard/messages',
      icon: <Inbox size={20} />,
    },
    {
      name: 'Schedule',
      to: '/professional-dashboard/schedule',
      icon: <CalendarDays size={20} />,
    },
    {
      name: 'Time Tracking',
      to: '/professional-dashboard/time-tracking',
      icon: <Clock size={20} />,
    },
    {
      name: 'Payments',
      to: '/professional-dashboard/payments',
      icon: <CreditCard size={20} />,
    },
    {
      name: 'Job Completion',
      to: '/professional-dashboard/job-completion',
      icon: <FileCheck2 size={20} />,
    },
    {
      name: 'Reviews & Ratings',
      to: '/professional-dashboard/reviews',
      icon: <Star size={20} />,
    },
    {
      name: 'Support',
      to: '/professional-dashboard/support',
      icon: <HelpCircle size={20} />,
    },
  ];

  const navItems = userType === 'client' ? clientNavItems : professionalNavItems;

  return (
    <aside 
      className={cn(
        'bg-white border-r border-gray-200 fixed inset-y-0 left-0 z-20 w-64 transition-transform transform lg:translate-x-0 lg:static lg:w-64 lg:shrink-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      {/* Mobile logo */}
      <div className="flex h-16 items-center border-b px-6 lg:hidden">
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

      <div className="px-4 py-6 space-y-6">
        {/* User account type indicator */}
        <div className={`rounded-lg p-3 ${userType === 'client' ? 'bg-blue-50' : 'bg-green-50'}`}>
          <p className={`text-sm font-medium ${userType === 'client' ? 'text-prolink-blue' : 'text-prolink-green'}`}>
            {userType === 'client' ? 'Client Account' : 'Professional Account'}
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            
            return (
              <Link
                key={item.name}
                to={item.to}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium',
                  isActive
                    ? userType === 'client' 
                      ? 'bg-prolink-blue text-white' 
                      : 'bg-prolink-green text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
