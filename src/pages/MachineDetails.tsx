import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Activity, MapPin, Calendar, CheckCircle, ArrowLeft, PenTool, History, QrCode, X } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

export function MachineDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Mock data for the specific machine
  const machine = {
    id: id || 'M-001',
    name: 'CNC Milling Center A',
    model: 'Haas VF-2',
    serialNumber: 'SN-987654321',
    location: 'Production Floor 1, Zone B',
    status: 'Operational',
    lastMaintenance: '2023-10-15',
    nextMaintenance: '2023-12-15',
    installDate: '2019-03-10',
    totalUptime: '94.5%',
    powerConsumption: '12 kW/h',
  };

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading machine profile...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/machines')} className="text-gray-500 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5 mr-1" /> Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{machine.name}</h1>
            <p className="text-gray-500">Machine ID: {machine.id}</p>
          </div>
        </div>
        <div>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 border border-green-200 flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            {machine.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Technical Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <p className="text-sm text-gray-500 mb-1">Model / Manufacturer</p>
                <p className="font-medium text-gray-800">{machine.model}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Serial Number</p>
                <p className="font-medium text-gray-800">{machine.serialNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> Location
                </p>
                <p className="font-medium text-gray-800">{machine.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Installed On
                </p>
                <p className="font-medium text-gray-800">{machine.installDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Avg Power Consumption</p>
                <p className="font-medium text-gray-800">{machine.powerConsumption}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <Activity className="w-4 h-4" /> Uptime Rating
                </p>
                <p className="font-medium text-green-600">{machine.totalUptime}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenTool className="w-5 h-5 text-blue-500" />
              Maintenance Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <p className="text-sm text-slate-500">Last Serviced</p>
              <p className="text-lg font-semibold text-slate-800">{machine.lastMaintenance}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-600">Next Scheduled PM</p>
              <p className="text-lg font-semibold text-blue-900">{machine.nextMaintenance}</p>
            </div>
            <div className="pt-4 flex gap-2">
              <Button variant="outline" className="flex-1 gap-2 border-slate-300" onClick={() => setIsQrModalOpen(true)}>
                <QrCode className="w-4 h-4" />
                QR Code
              </Button>
              <Button className="flex-1" onClick={() => navigate('/tickets/create')}>
                Report Fault
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Failure History Section */}
      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center gap-2">
        <History className="w-6 h-6 text-slate-500" />
        Machine Failure History
      </h2>
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Ticket ID</th>
                <th className="px-6 py-4">Fault Description</th>
                <th className="px-6 py-4">Date Reported</th>
                <th className="px-6 py-4">Resolution Time</th>
                <th className="px-6 py-4">Engineer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Mock history rows */}
              <tr className="hover:bg-slate-50/50">
                <td className="px-6 py-4 font-medium text-blue-600">TKT-892</td>
                <td className="px-6 py-4 text-slate-700">Spindle vibration exceeding limits</td>
                <td className="px-6 py-4 text-slate-500">Oct 12, 2023</td>
                <td className="px-6 py-4 text-slate-500">4h 15m</td>
                <td className="px-6 py-4 text-slate-500">Mike R.</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="px-6 py-4 font-medium text-blue-600">TKT-754</td>
                <td className="px-6 py-4 text-slate-700">Coolant pump failure</td>
                <td className="px-6 py-4 text-slate-500">Aug 28, 2023</td>
                <td className="px-6 py-4 text-slate-500">1h 45m</td>
                <td className="px-6 py-4 text-slate-500">Sarah J.</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="px-6 py-4 font-medium text-blue-600">TKT-601</td>
                <td className="px-6 py-4 text-slate-700">Door interlock sensor malfunction</td>
                <td className="px-6 py-4 text-slate-500">Jul 05, 2023</td>
                <td className="px-6 py-4 text-slate-500">0h 45m</td>
                <td className="px-6 py-4 text-slate-500">Tech Team</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* QR Code Modal Dialog */}
      {isQrModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={(e) => { if(e.target === e.currentTarget) setIsQrModalOpen(false); }}>
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-gray-500" />
                Machine Quick Access
              </h3>
              <button 
                onClick={() => setIsQrModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 flex flex-col items-center justify-center space-y-6">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <QRCodeCanvas 
                  value={`${window.location.origin}/machines/${machine.id}`} 
                  size={200}
                  level="H"
                  includeMargin={false}
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900 text-lg">{machine.id}</p>
                <p className="text-sm text-gray-500 mt-1">Scan to open machine profile or report a fault directly from mobile.</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3">
               <Button variant="outline" className="flex-1" onClick={() => setIsQrModalOpen(false)}>Close</Button>
               <Button className="flex-1 gap-2">
                 Download Print
               </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
