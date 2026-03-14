import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Activity, Clock, Wrench, DollarSign } from 'lucide-react';
import { DashboardDataPayload } from '@/types/dashboard';
import { DashboardServiceAPI } from '@/services/dashboardService';

// Layout Container
import { ChartContainer } from '@/components/dashboard/ChartContainer';

// Individual Chart Components used for Machine Analytics
import { FailureTrendChart } from '@/components/charts/FailureTrendChart';
import { MaintenanceCostChart } from '@/components/charts/MaintenanceCostChart';
import { PowerConsumptionChart } from '@/components/charts/PowerConsumptionChart';
import { PMBMManhourChart } from '@/components/charts/PMBMManhourChart';
import { BreakdownStatusChart } from '@/components/charts/BreakdownStatusChart';
import { DowntimeCauseChart } from '@/components/charts/DowntimeCauseChart';
import { MaintenanceStatusChart } from '@/components/charts/MaintenanceStatusChart';
import { CompletedVsScheduledChart } from '@/components/charts/CompletedVsScheduledChart';
import { BreakdownContributionChart } from '@/components/charts/BreakdownContributionChart';

export function Dashboard() {
  const [data, setData] = useState<DashboardDataPayload | null>(null);

  useEffect(() => {
    DashboardServiceAPI.getDashboardData().then(fetchedData => {
      setData(fetchedData);
    });
  }, []);

  if (!data) return <div className="p-8 text-center text-gray-500">Loading comprehensive dashboard analytics...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Advanced Analytics Dashboard</h1>
        <p className="text-gray-500">Comprehensive overview of factory performance metrics</p>
      </div>
      
      {/* Top Horizon KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI value={data.kpis.totalFailures} label="Total Failures" icon={<Activity className="text-red-500" />} />
        <KPI value={`S$${(data.kpis.totalMaintenanceCost/1000).toLocaleString()}k`} label="Total Maintenance Cost" icon={<DollarSign className="text-emerald-500" />} />
        <KPI value={`${data.kpis.averageRepairTime}h`} label="Average Repair Time" icon={<Clock className="text-amber-500" />} />
        <KPI value={`${(data.kpis.powerConsumption/1000).toLocaleString()}k kWh`} label="Power Consumption" icon={<Wrench className="text-blue-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ROW 1 */}
        <ChartContainer title="Failure Trend" subtitle="Monthly count of machine failures across all lines">
          <FailureTrendChart data={data.failureStatus} />
        </ChartContainer>

        <ChartContainer title="Maintenance Cost Trend" subtitle="Actual expenditure versus budgeted allowances">
          <MaintenanceCostChart data={data.maintenanceCost} />
        </ChartContainer>

        {/* ROW 2 */}
        <ChartContainer title="PM vs BM Manhours" subtitle="Preventive vs Breakdown allocated maintenance time">
          <PMBMManhourChart data={data.pmBmManhour} />
        </ChartContainer>

        <ChartContainer title="Power Consumption" subtitle="Measured operational power cost vs target budget">
          <PowerConsumptionChart data={data.powerConsumption} />
        </ChartContainer>

        {/* ROW 3 */}
        <ChartContainer title="Breakdown Duration" subtitle="Monthly categorization of downtime recovery effort">
          <BreakdownStatusChart data={data.breakdownStatus} />
        </ChartContainer>

        <ChartContainer title="Downtime Cause Distribution" subtitle="Primary historical triggers of equipment halts">
          <DowntimeCauseChart data={data.downtimeCause} />
        </ChartContainer>

        {/* ROW 4 */}
        <ChartContainer title="Task Completion Rate" subtitle="Scheduled maintenance vs successfully completed tasks">
          <CompletedVsScheduledChart data={data.completedVsScheduled} />
        </ChartContainer>

        <ChartContainer title="Breakdown Contribution by Line" subtitle="Production line impact based on downtime hours">
          <BreakdownContributionChart data={data.breakdownContribution} />
        </ChartContainer>

        {/* ROW 5 (Spans full width typically, or placed evenly based on layout sizing) */}
        <div className="lg:col-span-2">
           <ChartContainer title="Current Maintenance Status" subtitle="Live distribution of all active system tickets">
            <MaintenanceStatusChart data={data.maintenanceStatus} />
          </ChartContainer>
        </div>

      </div>
    </div>
  );
}

function KPI({ value, label, icon }: { value: string | number, label: string, icon: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="bg-slate-50 p-3 rounded-lg">{icon}</div>
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-bold tracking-tight text-slate-900 truncate" title={String(value)}>{value}</h3>
          <p className="text-sm font-medium text-slate-500 mt-1">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
