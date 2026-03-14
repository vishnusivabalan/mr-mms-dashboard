import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
}

export function ChartContainer({ title, children, className, subtitle }: ChartContainerProps) {
  return (
    <Card className={`flex flex-col h-[400px] ${className || ''}`}>
      <CardHeader className="pb-2 flex-none">
        <CardTitle className="text-lg">{title}</CardTitle>
        {subtitle && <p className="text-xs text-slate-500 line-clamp-1">{subtitle}</p>}
      </CardHeader>
      <CardContent className="flex-1 w-full min-h-0 pb-6">
        {children}
      </CardContent>
    </Card>
  );
}
