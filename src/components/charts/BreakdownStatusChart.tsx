import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BreakdownStatusData } from '../../types/dashboard';

interface Props {
  data: BreakdownStatusData[];
}

export function BreakdownStatusChart({ data }: Props) {
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
        <Bar dataKey="under1Hr" name="< 1 Hr" stackId="a" fill="#10b981" maxBarSize={60} radius={[0, 0, 0, 0]} />
        <Bar dataKey="oneToTwoHrs" name="1-2 Hrs" stackId="a" fill="#f59e0b" maxBarSize={60} radius={[0, 0, 0, 0]} />
        <Bar dataKey="over2Hrs" name="> 2 Hrs" stackId="a" fill="#ef4444" maxBarSize={60} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
