
import { Sidebar } from '@/components/layout/Sidebar';

const Team = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 p-8 overflow-auto max-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-3xl font-bold">Team</h1>
            <p className="text-gray-400">Manage collaboration and workflow with your team</p>
          </div>
          
          <div className="glass-morphism rounded-xl p-6 flex items-center justify-center min-h-[60vh]">
            <p className="text-xl text-gray-400">Team Management Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
