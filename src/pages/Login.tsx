import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Settings } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login process
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4">
      <div className="mb-8 flex items-center gap-3 text-white">
        <div className="bg-blue-600 p-3 rounded-lg">
          <Settings className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">MR&MMS</h1>
          <p className="text-blue-400 text-sm font-medium">Machine Repair & Maintenance</p>
        </div>
      </div>
      
      <Card className="w-full max-w-md border-slate-800 bg-slate-800 text-white shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">System Login</CardTitle>
          <p className="text-slate-400 text-center text-sm">Enter your credentials to access the system</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Employee ID</label>
              <Input 
                type="text" 
                placeholder="Enter ID (e.g. EMP-001)" 
                className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                required
              />
            </div>
            
            <div className="flex items-center justify-between text-sm py-2">
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-700 bg-slate-900 text-blue-600" />
                Remember me
              </label>
              <a href="#" className="text-blue-400 hover:text-blue-300">Forgot password?</a>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <p className="mt-8 text-slate-500 text-sm text-center max-w-sm">
        Authorized access only. By logging in, you agree to the company's IT security policies.
      </p>
    </div>
  );
}
