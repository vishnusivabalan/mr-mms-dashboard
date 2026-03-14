import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MaintenanceStatusData } from '../../types/dashboard';

interface Props {
  data: MaintenanceStatusData[];
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#64748b'];

export function MaintenanceStatusChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          dataKey="count"
          nameKey="status"
          label={({ name, percent }: any) => `${name} (${(percent * 100).toFixed(0)}%)`}
          labelLine={true}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
