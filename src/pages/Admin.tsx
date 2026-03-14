import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { UserCog, BookOpen, Settings, Bell, Plus, Save } from 'lucide-react';

export function Admin() {
  const [activeTab, setActiveTab] = useState<'users' | 'library' | 'settings'>('users');
  
  // User Management State
  const [users, setUsers] = useState([
    { id: 1, empId: 'EMP-001', name: 'John Smith', role: 'Machine Operator', department: 'Production Line 1', status: 'Active' },
    { id: 2, empId: 'ENG-205', name: 'Sarah Jenkins', role: 'Service Engineer', department: 'Maintenance Dept', status: 'Active' },
    { id: 3, empId: 'MGR-102', name: 'Michael Chen', role: 'System Admin', department: 'Management', status: 'Active' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleEditClick = (user: any) => {
    setCurrentUser(user);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = {
      empId: formData.get('empId') as string,
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      department: formData.get('department') as string,
      status: formData.get('status') as string,
    };

    if (isEditing && currentUser) {
      setUsers(users.map(u => u.id === currentUser.id ? { ...u, ...userData } : u));
    } else {
      setUsers([...users, { id: Date.now(), ...userData }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Administration</h1>
        <p className="text-gray-500">Manage user access, system libraries, and preferences</p>
      </div>

      <div className="flex space-x-1 border-b border-gray-200">
        <TabButton 
          active={activeTab === 'users'} 
          onClick={() => setActiveTab('users')} 
          icon={<UserCog className="w-4 h-4" />} 
          label="User Management" 
        />
        <TabButton 
          active={activeTab === 'library'} 
          onClick={() => setActiveTab('library')} 
          icon={<BookOpen className="w-4 h-4" />} 
          label="Root Cause & Parts Library" 
        />
        <TabButton 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')} 
          icon={<Settings className="w-4 h-4" />} 
          label="System Settings" 
        />
      </div>

      {activeTab === 'users' && (
        <>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
              <CardTitle>System Users</CardTitle>
              <Button size="sm" className="gap-2" onClick={() => { setIsEditing(false); setCurrentUser(null); setIsModalOpen(true); }}>
                <Plus className="w-4 h-4" />
                Add User
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.empId}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.status === 'Active' ? 'text-green-600 bg-green-100' : 'text-slate-600 bg-slate-100'}`}>
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => handleEditClick(user)}>
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* User Modal (Add/Edit) */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-slate-50">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {isEditing ? 'Edit User Profile' : 'Add New User'}
                  </h2>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                    ✕
                  </button>
                </div>
                <form onSubmit={handleUserSubmit} className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <Input name="name" defaultValue={currentUser?.name || ''} required placeholder="e.g. Jane Doe" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Employee ID</label>
                      <Input name="empId" defaultValue={currentUser?.empId || ''} required placeholder="e.g. EMP-005" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Status</label>
                      <select name="status" defaultValue={currentUser?.status || 'Active'} className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Role</label>
                    <select name="role" defaultValue={currentUser?.role || 'Machine Operator'} className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="Machine Operator">Machine Operator</option>
                      <option value="Service Engineer">Service Engineer</option>
                      <option value="System Admin">System Admin</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Department</label>
                    <Input name="department" defaultValue={currentUser?.department || ''} required placeholder="e.g. Maintenance Dept" />
                  </div>
                  
                  <div className="pt-4 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button type="submit">{isEditing ? 'Save Changes' : 'Create User'}</Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'library' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
              <CardTitle>Root Cause Library</CardTitle>
              <Button size="sm" variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Entry
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">RC-E01</TableCell>
                    <TableCell>Motor Overheating / Burnout</TableCell>
                    <TableCell>Electrical</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">RC-M05</TableCell>
                    <TableCell>Bearing Failure</TableCell>
                    <TableCell>Mechanical</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">RC-S02</TableCell>
                    <TableCell>Sensor Calibration Error</TableCell>
                    <TableCell>Software/Sensor</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
              <CardTitle>Spare Parts Inventory</CardTitle>
              <Button size="sm" variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Part
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Part No.</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Stock Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">P-10024</TableCell>
                    <TableCell>Thermal Overload Relay 15A</TableCell>
                    <TableCell>24 units</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">P-80512</TableCell>
                    <TableCell>Conveyor Belt Type C</TableCell>
                    <TableCell><span className="text-amber-600 font-medium">3 units (Low)</span></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">P-33091</TableCell>
                    <TableCell>Inductive Proximity Sensor</TableCell>
                    <TableCell>18 units</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'settings' && (
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Application Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Settings</h3>
              
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg"><Bell className="w-5 h-5 text-slate-600" /></div>
                  <div>
                    <p className="font-medium text-slate-900">Critical Fault Alerts</p>
                    <p className="text-sm text-slate-500">Send immediate SMS alerts to assigned engineers</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg"><Bell className="w-5 h-5 text-slate-600" /></div>
                  <div>
                    <p className="font-medium text-slate-900">Daily Digest Report</p>
                    <p className="text-sm text-slate-500">Email summary of previous day's maintenance</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <div className="space-y-4 mt-8">
              <h3 className="text-lg font-medium">System Integrations</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">ERP System API Key</label>
                  <Input type="password" value="************************" readOnly />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">AI Diagnosis Model Endpoint</label>
                  <Input type="url" value="https://api.internal.com/v1/predict" readOnly />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button className="gap-2">
                <Save className="w-4 h-4" />
                Save Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
        active 
          ? 'border-blue-600 text-blue-600 bg-blue-50/50' 
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
