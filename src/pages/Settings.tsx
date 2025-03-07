import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SocialMediaAccounts } from '@/components/settings/SocialMediaAccounts';
import { AccountSettings } from '@/components/settings/AccountSettings';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { toast } = useToast();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await signOut();
    navigate('/signin');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 p-8 overflow-auto max-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-gray-400">Configure your account and application preferences</p>
          </div>
          
          <div className="glass-morphism rounded-xl p-6">
            <Tabs defaultValue="accounts" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="accounts">Social Media Accounts</TabsTrigger>
                <TabsTrigger value="account">Account Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="accounts">
                <SocialMediaAccounts />
              </TabsContent>
              
              <TabsContent value="account">
                <AccountSettings />
                
                <div className="mt-10 pt-6 border-t border-white/10">
                  <h3 className="text-lg font-medium mb-4">Logout</h3>
                  <Button 
                    variant="destructive" 
                    className="flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
