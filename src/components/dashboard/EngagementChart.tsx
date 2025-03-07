
import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

const data = [
  { date: 'Aug 1', instagram: 1500, twitter: 900, linkedin: 500, tiktok: 2200 },
  { date: 'Aug 8', instagram: 1800, twitter: 1200, linkedin: 700, tiktok: 3000 },
  { date: 'Aug 15', instagram: 1600, twitter: 1100, linkedin: 800, tiktok: 3400 },
  { date: 'Aug 22', instagram: 2100, twitter: 1500, linkedin: 1200, tiktok: 4000 },
  { date: 'Aug 29', instagram: 2400, twitter: 1800, linkedin: 1500, tiktok: 4600 },
  { date: 'Sep 5', instagram: 2700, twitter: 2100, linkedin: 1800, tiktok: 5200 },
  { date: 'Sep 12', instagram: 3000, twitter: 2400, linkedin: 2100, tiktok: 5800 },
];

type Platform = 'instagram' | 'twitter' | 'linkedin' | 'tiktok' | 'all';

interface PlatformOption {
  value: Platform;
  label: string;
  color: string;
}

const platformOptions: PlatformOption[] = [
  { value: 'all', label: 'All Platforms', color: '#9b87f5' },
  { value: 'instagram', label: 'Instagram', color: '#E1306C' },
  { value: 'twitter', label: 'Twitter', color: '#1DA1F2' },
  { value: 'linkedin', label: 'LinkedIn', color: '#0077B5' },
  { value: 'tiktok', label: 'TikTok', color: '#25F4EE' },
];

export function EngagementChart() {
  const [activePlatform, setActivePlatform] = useState<Platform>('all');

  return (
    <div className="p-6 rounded-xl glass-morphism">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h3 className="text-lg font-semibold">Engagement Overview</h3>
        
        <div className="flex flex-wrap gap-2">
          {platformOptions.map((option) => (
            <button
              key={option.value}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                activePlatform === option.value
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
              onClick={() => setActivePlatform(option.value)}
              style={{
                borderWidth: activePlatform === option.value ? 1 : 0,
                borderColor: option.color,
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              {platformOptions.slice(1).map((platform) => (
                <linearGradient
                  key={platform.value}
                  id={`gradient-${platform.value}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={platform.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={platform.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid stroke="#2A2A2A" strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#9CA3AF' }} 
              axisLine={{ stroke: '#2A2A2A' }} 
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#9CA3AF' }} 
              axisLine={{ stroke: '#2A2A2A' }} 
              tickLine={false}
              tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F1F1F', 
                border: 'none', 
                borderRadius: '0.5rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
              }} 
              itemStyle={{ color: '#FFFFFF' }}
              labelStyle={{ color: '#9CA3AF', marginBottom: '0.5rem' }}
            />
            
            {(activePlatform === 'all' || activePlatform === 'instagram') && (
              <Area 
                type="monotone" 
                dataKey="instagram" 
                name="Instagram" 
                stroke="#E1306C" 
                fill="url(#gradient-instagram)" 
                fillOpacity={1}
                strokeWidth={2}
              />
            )}
            
            {(activePlatform === 'all' || activePlatform === 'twitter') && (
              <Area 
                type="monotone" 
                dataKey="twitter" 
                name="Twitter" 
                stroke="#1DA1F2" 
                fill="url(#gradient-twitter)" 
                fillOpacity={1}
                strokeWidth={2}
              />
            )}
            
            {(activePlatform === 'all' || activePlatform === 'linkedin') && (
              <Area 
                type="monotone" 
                dataKey="linkedin" 
                name="LinkedIn" 
                stroke="#0077B5" 
                fill="url(#gradient-linkedin)" 
                fillOpacity={1}
                strokeWidth={2}
              />
            )}
            
            {(activePlatform === 'all' || activePlatform === 'tiktok') && (
              <Area 
                type="monotone" 
                dataKey="tiktok" 
                name="TikTok" 
                stroke="#25F4EE" 
                fill="url(#gradient-tiktok)" 
                fillOpacity={1}
                strokeWidth={2}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
