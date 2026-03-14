import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MaintenanceCostData } from '../../types/dashboard';

interface Props {
  data: MaintenanceCostData[];
}

export function MaintenanceCostChart({ data }: Props) {
  const formatYAxis = (tickItem: number) => {
    return `₹${tickItem / 1000}k`;
  };

  const formatTooltip = (value: any) => {
    return `₹${value.toLocaleString()}`;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
        <YAxis tickFormatter={formatYAxis} axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
        <Tooltip 
          formatter={formatTooltip}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
        <Line 
          type="monotone" 
          dataKey="maintenanceCost" 
          name="Actual Cost" 
          stroke="#2563eb" 
          strokeWidth={3} 
          dot={{ r: 4 }} 
          activeDot={{ r: 6 }} 
        />
        <Line 
          type="monotone" 
          dataKey="budgetCost" 
          name="Budgeted Cost" 
          stroke="#94a3b8" 
          strokeWidth={2} 
          strokeDasharray="5 5" 
          dot={false}
          activeDot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
