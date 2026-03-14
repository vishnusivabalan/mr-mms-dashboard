import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BreakdownContributionData } from '../../types/dashboard';

interface Props {
  data: BreakdownContributionData[];
}

export function BreakdownContributionChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
        <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
        <YAxis dataKey="line" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
        <Tooltip 
          cursor={{ fill: '#f8fafc' }}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          formatter={(value: any, name: any) => [
            name === 'breakdownHours' ? `${value} Hrs` : `${value}%`, 
            name === 'breakdownHours' ? 'Downtime' : 'Contribution'
          ]}
        />
        <Bar dataKey="breakdownHours" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} />
      </BarChart>
    </ResponsiveContainer>
  );
}
