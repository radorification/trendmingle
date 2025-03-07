
import { Sidebar } from '@/components/layout/Sidebar';

const Analytics = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 p-8 overflow-auto max-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-gray-400">Track and analyze your social media performance</p>
          </div>
          
          <div className="glass-morphism rounded-xl p-6 flex items-center justify-center min-h-[60vh]">
            <p className="text-xl text-gray-400">Analytics Dashboard Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
