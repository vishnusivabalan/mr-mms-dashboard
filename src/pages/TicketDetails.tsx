import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TicketService } from '@/services/api';
import { Ticket } from '@/types';
import { CheckCircle, AlertTriangle, Cpu, Wrench, Sparkles } from 'lucide-react';

export function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    // In a real app we'd fetch the specific ticket by ID
    TicketService.getTickets().then((data: Ticket[]) => {
      setTicket(data[0]); // Using mock data
    });
  }, [id]);

  if (!ticket) return <div className="p-8 text-center text-gray-500">Loading ticket details...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ticket {ticket.ticketId}</h1>
          <p className="text-gray-500">Machine {ticket.machineId} Maintenance Request</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/tickets')}>Back to List</Button>
          <Button className="gap-2 bg-green-600 hover:bg-green-700">
            <CheckCircle className="w-4 h-4" />
            Close Ticket
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Issue Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 p-4 rounded-md border border-slate-100">
                <p className="text-slate-800">{ticket.description}</p>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-500">Status</label>
                  <p className="font-medium text-slate-900">{ticket.status}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-500">Priority</label>
                  <p className="font-medium text-slate-900">{ticket.priority}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-500">Reported By</label>
                  <p className="font-medium text-slate-900">{ticket.createdBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-500">Date</label>
                  <p className="font-medium text-slate-900">{new Date(ticket.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-500" />
                Service Engineer Action Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Update Status</label>
                  <select className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="In Progress">In Progress (Diagnosis)</option>
                    <option value="Waiting on Parts">Waiting on Parts</option>
                    <option value="Repairing">Repairing</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Repair Notes & Root Cause</label>
                  <textarea 
                    className="flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    placeholder="Document your findings..."
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <Button type="button">Save Log Update</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* AI Diagnosis Panel (Placeholder) */}
        <div className="space-y-6">
          <Card className="border-purple-200 bg-purple-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-purple-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                AI Diagnosis Assist
              </CardTitle>
              <p className="text-xs text-purple-600/80">Based on historical fault patterns</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white p-3 rounded border border-purple-100 shadow-sm">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Possible Cause</span>
                <p className="text-sm font-medium text-slate-800 mt-1">Thermal overload relay tripped due to prolonged high load.</p>
              </div>
              <div className="bg-white p-3 rounded border border-purple-100 shadow-sm">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Suggested Repair</span>
                <p className="text-sm font-medium text-slate-800 mt-1">Reset relay, check motor cooling fins, and verify phase currents.</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white p-3 rounded border border-purple-100 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Similar Case</span>
                  <p className="text-sm font-medium text-blue-600 hover:underline cursor-pointer mt-1">TKT-0892</p>
                </div>
                <div className="bg-white p-3 rounded border border-purple-100 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Est. Time</span>
                  <p className="text-sm font-medium text-slate-800 mt-1">45 mins</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-slate-500" />
                Machine Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Name</span>
                <span className="text-sm font-medium">Injection Molder B2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Location</span>
                <span className="text-sm font-medium">Plant A - Zone 1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Status</span>
                <span className="text-sm font-medium text-red-600">Faulty</span>
              </div>
              <Button variant="outline" className="w-full mt-4 text-sm" onClick={() => navigate(`/machines/${ticket.machineId}`)}>
                View Full Machine Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
