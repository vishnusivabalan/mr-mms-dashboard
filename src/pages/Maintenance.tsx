import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { CalendarClock, FileDown, Play, Check, Loader2 } from 'lucide-react';

export function Maintenance() {
  const [tasks, setTasks] = useState([
    { id: 'PM-102', machine: 'Conveyor Belt Type C', freq: 'Weekly', due: 'Tomorrow (Nov 24)', est: '2 hrs', status: 'Due Soon', color: 'amber', state: 'pending' },
    { id: 'PM-105', machine: 'Injection Molder B2', freq: 'Monthly', due: 'Dec 01, 2023', est: '4 hrs', status: 'Scheduled', color: 'slate', state: 'pending' },
    { id: 'PM-098', machine: 'Robot Arm A1', freq: 'Quarterly', due: 'Nov 20, 2023', est: '6 hrs', status: 'Overdue', color: 'red', state: 'pending' }
  ]);

  const handleStartTask = (taskId: string) => {
    // Simulate starting a task by setting state to 'running'
    setTasks(current => current.map(task => 
      task.id === taskId ? { ...task, state: 'running' } : task
    ));

    // Simulate task completion after 2 seconds
    setTimeout(() => {
      setTasks(current => current.map(task => 
        task.id === taskId ? { ...task, state: 'completed', status: 'Done', color: 'green' } : task
      ));
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Preventive Maintenance</h1>
          <p className="text-gray-500">Upcoming scheduled maintenance tasks</p>
        </div>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
          <CardTitle className="flex items-center gap-2">
            <CalendarClock className="w-5 h-5 text-blue-500" />
            Schedule List
          </CardTitle>
          <Button variant="outline" size="sm" className="gap-2">
            <FileDown className="w-4 h-4" />
            Export Plan
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task ID</TableHead>
                <TableHead>Machine</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Next Due Date</TableHead>
                <TableHead>Est. Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>{task.machine}</TableCell>
                  <TableCell>{task.freq}</TableCell>
                  <TableCell className={`font-medium ${task.color === 'red' ? 'text-red-600' : task.color === 'amber' ? 'text-amber-600' : ''}`}>
                    {task.due}
                  </TableCell>
                  <TableCell>{task.est}</TableCell>
                  <TableCell>
                    <span className={`bg-${task.color}-100 text-${task.color}-700 px-2 py-1 rounded-full text-xs font-semibold`}>
                      {task.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {task.state === 'pending' && (
                      <Button variant="ghost" size="sm" className="text-blue-600 gap-1 hover:bg-blue-50" onClick={() => handleStartTask(task.id)}>
                        <Play className="w-4 h-4" /> Start
                      </Button>
                    )}
                    {task.state === 'running' && (
                      <Button variant="ghost" size="sm" className="text-amber-500 gap-1 cursor-default pointer-events-none" disabled>
                        <Loader2 className="w-4 h-4 animate-spin" /> In Progress
                      </Button>
                    )}
                    {task.state === 'completed' && (
                      <Button variant="ghost" size="sm" className="text-green-600 gap-1 cursor-default pointer-events-none hover:bg-transparent" disabled>
                        <Check className="w-4 h-4" /> Completed
                      </Button>
                    )}
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
