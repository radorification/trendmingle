
import { Sidebar } from '@/components/layout/Sidebar';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { TrendingTopics } from '@/components/dashboard/TrendingTopics';
import { UpcomingPosts } from '@/components/dashboard/UpcomingPosts';
import { EngagementChart } from '@/components/dashboard/EngagementChart';
import { AiSuggestions } from '@/components/dashboard/AiSuggestions';
import { Users, TrendingUp, MessagesSquare, Eye } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 p-8 overflow-auto max-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-400">Welcome back! Here's what's happening with your social media.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard 
              title="Followers" 
              value="2,345" 
              change={{ value: 12.8, positive: true }}
              icon={Users}
            />
            <MetricCard 
              title="Engagement Rate" 
              value="4.6%" 
              change={{ value: 0.8, positive: true }}
              icon={TrendingUp}
            />
            <MetricCard 
              title="Comments" 
              value="342" 
              change={{ value: 5.3, positive: true }}
              icon={MessagesSquare}
            />
            <MetricCard 
              title="Impressions" 
              value="15.2k" 
              change={{ value: 2.1, positive: false }}
              icon={Eye}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <EngagementChart />
            </div>
            <div>
              <AiSuggestions />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UpcomingPosts />
            <TrendingTopics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
