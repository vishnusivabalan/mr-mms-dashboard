import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { TicketService } from '@/services/api';
import { Ticket } from '@/types';
import { Plus, Search, Filter, List, UserCircle, Users, Clock } from 'lucide-react';

export function Tickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const data = await TicketService.getTickets();
      setTickets(data);
    } catch (error) {
      console.error('Failed to load tickets', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'Critical': return 'text-red-600 bg-red-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Medium': return 'text-amber-600 bg-amber-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Open': return 'text-blue-600 border-blue-200 bg-blue-50';
      case 'In Progress': return 'text-amber-600 border-amber-200 bg-amber-50';
      case 'Closed': return 'text-green-600 border-green-200 bg-green-50';
      default: return 'text-slate-600 border-slate-200 bg-slate-50';
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    if (activeTab === 'my') return ticket.createdBy === 'Op-Janice'; // Mock current user
    if (activeTab === 'assigned') return ticket.assignedEngineer === 'Eng-Mike'; // Mock assigned engineer
    if (activeTab === 'history') return ticket.status === 'Closed';
    return true; // 'all' tab
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ticket Management</h1>
          <p className="text-gray-500">View and manage all maintenance tickets</p>
        </div>
        <Button onClick={() => navigate('/tickets/create')} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Ticket
        </Button>
      </div>
      
      <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-100 mb-6 max-w-2xl overflow-x-auto whitespace-nowrap">
        <button 
          onClick={() => setActiveTab('all')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
        >
          <List className="w-4 h-4" /> All Active
        </button>
        <button 
          onClick={() => setActiveTab('my')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'my' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
        >
          <UserCircle className="w-4 h-4" /> My Tickets
        </button>
        <button 
          onClick={() => setActiveTab('assigned')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'assigned' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
        >
          <Users className="w-4 h-4" /> Assigned
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'history' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
        >
          <Clock className="w-4 h-4" /> History
        </button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
          <CardTitle>Recent Tickets</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 h-9 text-sm">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <input 
                placeholder="Search tickets..." 
                className="h-9 pl-9 pr-4 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Loading tickets...</div>
          ) : (
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Machine ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.length === 0 ? (
                  <TableRow>
                     <TableCell colSpan={7} className="h-24 text-center text-slate-500">
                        No tickets found for this view.
                     </TableCell>
                  </TableRow>
                ) : (
                  filteredTickets.map((ticket) => (
                  <TableRow key={ticket.ticketId}>
                    <TableCell className="font-medium text-blue-600">{ticket.ticketId}</TableCell>
                    <TableCell>{ticket.machineId}</TableCell>
                    <TableCell className="max-w-xs truncate">{ticket.description}</TableCell>
                    <TableCell>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => navigate(`/tickets/${ticket.ticketId}`)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                )))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
