import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FileBarChart, Download, Calendar, ArrowRight } from 'lucide-react';

export function Reports() {
  const reportsList = [
    { title: 'Monthly Maintenance Cost', description: 'Detailed breakdown of maintenance expenses vs budget', icon: <FileBarChart className="text-blue-500 w-8 h-8" /> },
    { title: 'Power Consumption Analysis', description: 'Energy usage trends across all major equipment', icon: <FileBarChart className="text-emerald-500 w-8 h-8" /> },
    { title: 'Machine Failure Analysis', description: 'Top failure causes and M/C breakdown duration metrics', icon: <FileBarChart className="text-red-500 w-8 h-8" /> },
    { title: 'Engineer Performance KPI', description: 'Ticket resolution times and completion rates', icon: <FileBarChart className="text-purple-500 w-8 h-8" /> }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports Module</h1>
        <p className="text-gray-500">Generate and export system analytics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-transparent">
          <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between">
            <div className="space-y-2 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">Generate Monthly Executive Report</h2>
              <p className="text-blue-100 max-w-lg">
                Compile all KPI metrics, downtime analytics, and cost trends into a single PDF document for management review.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 rounded-lg p-1 flex">
                <select className="bg-transparent text-white border-none focus:outline-none text-sm px-3 cursor-pointer">
                  <option className="text-slate-900">November 2023</option>
                  <option className="text-slate-900">October 2023</option>
                  <option className="text-slate-900">September 2023</option>
                </select>
              </div>
              <Button className="bg-white text-blue-600 hover:bg-gray-50 gap-2">
                <Download className="w-4 h-4" />
                Export PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {reportsList.map((report, idx) => (
          <Card key={idx} className="hover:border-blue-200 transition-colors group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 -mr-4 -mt-4 bg-slate-50 rounded-bl-full w-24 h-24 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
              {report.icon}
            </div>
            <CardContent className="p-6">
              <div className="flex flex-col h-full">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{report.title}</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-[80%]">{report.description}</p>
                
                <div className="mt-auto flex items-center justify-between">
                  <span className="flex items-center text-xs text-gray-400 gap-1 border border-gray-100 bg-gray-50 px-2 py-1 rounded-md">
                    <Calendar className="w-3 h-3" /> Updated Today
                  </span>
                  <div className="flex items-center text-blue-600 text-sm font-medium gap-1 group-hover:translate-x-1 transition-transform">
                    View Report <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
