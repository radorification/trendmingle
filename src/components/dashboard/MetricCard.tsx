
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    positive: boolean;
  };
  icon: LucideIcon;
  className?: string;
}

export function MetricCard({ title, value, change, icon: Icon, className }: MetricCardProps) {
  return (
    <div className={cn("p-6 rounded-xl glass-morphism", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          
          {change && (
            <div className="flex items-center mt-2">
              <span 
                className={cn(
                  "text-xs font-medium",
                  change.positive ? "text-green-400" : "text-red-400"
                )}
              >
                {change.positive ? '+' : ''}{change.value}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        
        <div className="h-10 w-10 rounded-md bg-brand-purple/20 flex items-center justify-center">
          <Icon className="text-brand-purple h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
