import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Machine } from '@/types';
import { Server, Search, Filter } from 'lucide-react';

export function Machines() {
  const navigate = useNavigate();
  const [machines, setMachines] = useState<Machine[]>([]);

  useEffect(() => {
    // Generate mock machines
    const mockMachines: Machine[] = Array.from({ length: 12 }).map((_, i) => ({
      machineId: `M-${100 + i}`,
      machineName: `Injection Molder B${i+1}`,
      location: `Plant A - Zone ${Math.floor(i/4) + 1}`,
      installDate: `202${Math.floor(i/3)}-05-15`,
      status: i % 5 === 0 ? 'Faulty' : i % 8 === 0 ? 'Maintenance' : 'Operational'
    }));
    setMachines(mockMachines);
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Operational': return 'text-green-600 bg-green-100';
      case 'Faulty': return 'text-red-600 bg-red-100';
      case 'Maintenance': return 'text-amber-600 bg-amber-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Machine Directory</h1>
          <p className="text-gray-500">View and manage all factory equipment</p>
        </div>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5 text-slate-500" />
            Equipment Roster
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 h-9 text-sm">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <input 
                placeholder="Search machines..." 
                className="h-9 pl-9 pr-4 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Machine ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Install Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {machines.map((machine) => (
                <TableRow key={machine.machineId}>
                  <TableCell className="font-medium">{machine.machineId}</TableCell>
                  <TableCell>{machine.machineName}</TableCell>
                  <TableCell>{machine.location}</TableCell>
                  <TableCell className="text-gray-500">{machine.installDate}</TableCell>
                  <TableCell>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(machine.status)}`}>
                      {machine.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => navigate(`/machines/${machine.machineId}`)}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
