import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { 
  BarChart3, 
  Wrench, 
  Settings, 
  TicketCheck, 
  Activity, 
  FileBox, 
  Briefcase,
  X
} from 'lucide-react';

const navItems = [
  { icon: BarChart3, label: 'Dashboard', href:('/') },
  { icon: TicketCheck, label: 'Tickets', href:('/tickets') },
  { icon: Activity, label: 'Machines', href:('/machines') },
  { icon: Wrench, label: 'Maintenance', href:('/maintenance') },
  { icon: FileBox, label: 'Reports', href:('/reports') },
  { icon: Briefcase, label: 'Admin', href:('/admin') },
];

export function Sidebar({ isOpen, setIsOpen }: { isOpen?: boolean; setIsOpen?: (val: boolean) => void }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/80 z-40 lg:hidden" 
          onClick={() => setIsOpen && setIsOpen(false)}
        />
      )}
      
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col h-screen transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-500" />
            <span className="font-bold text-lg text-white">MR&MMS</span>
          </div>
          <button 
            className="lg:hidden text-slate-400 hover:text-white p-1"
            onClick={() => setIsOpen && setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || 
                           (item.href !== '/' && location.pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsOpen && setIsOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md font-medium transition-colors',
                isActive 
                  ? 'bg-blue-600/10 text-blue-400' 
                  : 'hover:bg-slate-800 hover:text-white'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 text-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-medium">
            S
          </div>
          <div>
            <p className="text-white font-medium">System Manager</p>
            <p className="text-slate-500 text-xs">Admin Role</p>
          </div>
        </div>
      </div>
      </aside>
    </>
  );
}
