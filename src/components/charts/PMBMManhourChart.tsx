import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PMBMManhourData } from '../../types/dashboard';

interface Props {
  data: PMBMManhourData[];
}

export function PMBMManhourChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
        <Tooltip 
          cursor={{ fill: '#f8fafc' }}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
        <Bar 
          dataKey="preventiveMaintenanceHr" 
          name="Preventive (Hrs)" 
          stackId="a" 
          fill="#3b82f6" 
          radius={[0, 0, 4, 4]} 
          maxBarSize={60}
        />
        <Bar 
          dataKey="breakdownMaintenanceHr" 
          name="Breakdown (Hrs)" 
          stackId="a" 
          fill="#f59e0b" 
          radius={[4, 4, 0, 0]} 
          maxBarSize={60}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
