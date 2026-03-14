import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FailureStatusData } from '../../types/dashboard';

interface Props {
  data: FailureStatusData[];
}

export function FailureTrendChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
        <Tooltip 
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
        <Line 
          type="monotone" 
          dataKey="noOfFailures" 
          name="Monthly Failures" 
          stroke="#ef4444" 
          strokeWidth={3} 
          dot={{ r: 4, strokeWidth: 2 }} 
          activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2, fill: '#fff' }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
