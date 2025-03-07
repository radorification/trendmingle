import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquarePlus, 
  BarChart3, 
  Settings, 
  Users, 
  Sparkles,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, active }: SidebarItemProps) => {
  return (
    <Link to={href} className="w-full">
      <div 
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
          active 
            ? "bg-brand-purple text-white" 
            : "text-gray-300 hover:bg-white/10"
        )}
      >
        <Icon size={18} />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
};

export function Sidebar() {
  const pathname = window.location.pathname;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  
  // Close sidebar when screen size changes to larger than mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when route changes (mobile only)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);
  
  const handleLogout = async () => {
    await signOut();
    navigate('/signin');
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-black/50 rounded-md border border-white/10 text-white"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={cn(
          "h-screen bg-black/50 border-r border-white/10 flex flex-col fixed md:static z-40 transition-all duration-300",
          isSidebarOpen 
            ? "left-0 w-64" 
            : "-left-64 md:left-0 w-64 md:w-64"
        )}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 px-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">TrendMingle</span>
          </div>
        </div>
        
        <div className="mt-8 px-3 flex-1 flex flex-col gap-1">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            href="/" 
            active={pathname === '/'} 
          />
          <SidebarItem 
            icon={Calendar} 
            label="Content Calendar" 
            href="/calendar" 
            active={pathname === '/calendar'} 
          />
          <SidebarItem 
            icon={MessageSquarePlus} 
            label="Create Content" 
            href="/create" 
            active={pathname === '/create'} 
          />
          <SidebarItem 
            icon={BarChart3} 
            label="Analytics" 
            href="/analytics" 
            active={pathname === '/analytics'} 
          />
          <SidebarItem 
            icon={Users} 
            label="Team" 
            href="/team" 
            active={pathname === '/team'} 
          />
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            href="/settings" 
            active={pathname === '/settings'} 
          />
        </div>
        
        <div className="p-4 border-t border-white/10">
          <div 
            className="flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer transition-colors px-3 py-2"
            onClick={handleLogout}
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-purple/20 to-brand-blue/20 flex items-center justify-center">
              <span className="text-sm font-medium text-white">{user?.email?.substring(0, 2).toUpperCase() || 'JD'}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{user?.email || 'John Doe'}</p>
              <p className="text-xs text-gray-500">Free Plan</p>
            </div>
            <LogOut size={18} />
          </div>
        </div>
      </div>
    </>
  );
}
