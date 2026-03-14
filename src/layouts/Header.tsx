import { useState, useRef, useEffect } from 'react';
import { Bell, Search, UserCircle, LogOut, Settings, User, AlertTriangle, CheckCircle, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/Input';

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsSearchOpen(e.target.value.length > 0);
  };

  const executeSearch = (path: string) => {
    setSearchQuery('');
    setIsSearchOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setIsAccountOpen(false);
    navigate('/login');
  };

  return (
    <header className="h-16 border-b bg-white border-gray-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10 w-full">
      <div className="flex items-center w-full max-w-[200px] md:max-w-none md:w-96 relative" ref={searchRef}>
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 mr-2 text-gray-500 hover:bg-gray-100 rounded-md lg:hidden flex-shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            type="search" 
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search machines or tickets (e.g. M-100)" 
            className="pl-9 bg-gray-50 border-transparent focus:bg-white focus:border-blue-500" 
          />
        </div>
        
        {/* Search Results Dropdown */}
        {isSearchOpen && (
          <div className="absolute top-full mt-2 w-full bg-white rounded-md shadow-lg border border-gray-100 py-2 z-50">
            <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Quick Results for "{searchQuery}"</div>
            <button 
              onClick={() => executeSearch('/machines')}
              className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2"
            >
              <Search className="w-3 h-3 text-gray-400" /> Machine Profile: {searchQuery}
            </button>
            <button 
              onClick={() => executeSearch('/tickets')}
              className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2"
            >
              <Search className="w-3 h-3 text-gray-400" /> Ticket History: {searchQuery}
            </button>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => { setIsNotifOpen(!isNotifOpen); setIsAccountOpen(false); }}
            className="relative p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white"></span>
          </button>
          
          {isNotifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-md shadow-lg border border-gray-100 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100 font-semibold text-gray-800">Notifications</div>
              <div className="max-h-64 overflow-y-auto">
                <div className="px-4 py-3 hover:bg-slate-50 border-b border-gray-50 cursor-pointer flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Critical Breakdown</p>
                    <p className="text-xs text-gray-500">Robot Arm A1 has failed on Line 2.</p>
                    <p className="text-xs text-gray-400 mt-1">10 mins ago</p>
                  </div>
                </div>
                <div className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">PM Completed</p>
                    <p className="text-xs text-gray-500">Scheduled maintenance finished for Extruder C.</p>
                    <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                  </div>
                </div>
              </div>
              <div className="px-4 py-2 border-t border-gray-100 text-center">
                <button className="text-sm text-blue-600 hover:underline font-medium">Mark all as read</button>
              </div>
            </div>
          )}
        </div>

        <div className="border-l border-gray-200 h-6 mx-2"></div>
        
        {/* User Account */}
        <div className="relative" ref={accountRef}>
          <button 
            onClick={() => { setIsAccountOpen(!isAccountOpen); setIsNotifOpen(false); }}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <UserCircle className="w-6 h-6 text-gray-400" />
            <span>My Account</span>
          </button>

          {isAccountOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">admin@factory.com</p>
              </div>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-slate-50 flex items-center gap-2" onClick={() => navigate('/admin')}>
                <User className="w-4 h-4" /> Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-slate-50 flex items-center gap-2" onClick={() => navigate('/admin')}>
                <Settings className="w-4 h-4" /> Settings
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
