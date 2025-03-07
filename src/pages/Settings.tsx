
import { Sidebar } from '@/components/layout/Sidebar';

const Settings = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 p-8 overflow-auto max-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-gray-400">Configure your account and application preferences</p>
          </div>
          
          <div className="glass-morphism rounded-xl p-6 flex items-center justify-center min-h-[60vh]">
            <p className="text-xl text-gray-400">Settings Panel Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
