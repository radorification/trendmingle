
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Instagram, Twitter, Linkedin, Check, X, RefreshCw } from 'lucide-react';

type SocialMediaPlatform = 'instagram' | 'twitter' | 'linkedin' | 'tiktok';

type SocialAccount = {
  platform: SocialMediaPlatform;
  username: string;
  connected: boolean;
  lastSync?: string;
};

export function SocialMediaAccounts() {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<SocialAccount[]>([
    { platform: 'instagram', username: '', connected: false },
    { platform: 'twitter', username: '', connected: false },
    { platform: 'linkedin', username: '', connected: false },
    { platform: 'tiktok', username: '', connected: false },
  ]);
  const [loading, setLoading] = useState<SocialMediaPlatform | null>(null);

  const getPlatformIcon = (platform: SocialMediaPlatform) => {
    switch (platform) {
      case 'instagram':
        return <Instagram size={20} className="text-pink-500" />;
      case 'twitter':
        return <Twitter size={20} className="text-blue-400" />;
      case 'linkedin':
        return <Linkedin size={20} className="text-blue-600" />;
      case 'tiktok':
        return (
          <svg width="20" height="20" viewBox="0 0 448 512" fill="currentColor" className="text-black dark:text-white">
            <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getPlatformName = (platform: SocialMediaPlatform) => {
    switch (platform) {
      case 'instagram':
        return 'Instagram';
      case 'twitter':
        return 'Twitter';
      case 'linkedin':
        return 'LinkedIn';
      case 'tiktok':
        return 'TikTok';
      default:
        return platform;
    }
  };

  const handleUsernameChange = (platform: SocialMediaPlatform, username: string) => {
    setAccounts(accounts.map(account => 
      account.platform === platform ? { ...account, username } : account
    ));
  };

  const handleConnect = async (platform: SocialMediaPlatform) => {
    const account = accounts.find(acc => acc.platform === platform);
    if (!account || !account.username.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid username",
        variant: "destructive",
      });
      return;
    }

    setLoading(platform);
    
    // Simulate API call
    setTimeout(() => {
      setAccounts(accounts.map(acc => 
        acc.platform === platform 
          ? { ...acc, connected: true, lastSync: new Date().toISOString() } 
          : acc
      ));
      
      setLoading(null);
      
      toast({
        title: "Account Connected",
        description: `Your ${getPlatformName(platform)} account has been connected successfully`,
      });
    }, 1500);
  };

  const handleDisconnect = (platform: SocialMediaPlatform) => {
    setAccounts(accounts.map(acc => 
      acc.platform === platform ? { ...acc, connected: false, lastSync: undefined } : acc
    ));
    
    toast({
      title: "Account Disconnected",
      description: `Your ${getPlatformName(platform)} account has been disconnected`,
    });
  };

  const handleSyncNow = (platform: SocialMediaPlatform) => {
    setLoading(platform);
    
    // Simulate API call
    setTimeout(() => {
      setAccounts(accounts.map(acc => 
        acc.platform === platform 
          ? { ...acc, lastSync: new Date().toISOString() } 
          : acc
      ));
      
      setLoading(null);
      
      toast({
        title: "Account Synced",
        description: `Your ${getPlatformName(platform)} data has been synced successfully`,
      });
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-medium mb-4">Connected Accounts</h3>
      
      {accounts.map((account) => (
        <div key={account.platform} className="bg-white/5 rounded-lg p-5 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-3 md:w-1/4">
            {getPlatformIcon(account.platform)}
            <span className="font-medium">{getPlatformName(account.platform)}</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1">
            {!account.connected ? (
              <>
                <Input 
                  placeholder={`Enter your ${getPlatformName(account.platform)} username`}
                  value={account.username}
                  onChange={(e) => handleUsernameChange(account.platform, e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={() => handleConnect(account.platform)}
                  disabled={loading === account.platform}
                  className="w-full md:w-auto whitespace-nowrap"
                >
                  {loading === account.platform ? 'Connecting...' : 'Connect Account'}
                </Button>
              </>
            ) : (
              <div className="flex flex-wrap items-center gap-3 flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="px-2 py-1 bg-white/10">
                    @{account.username}
                  </Badge>
                  <Badge className="bg-green-600 text-white">
                    <Check size={12} className="mr-1" />
                    Connected
                  </Badge>
                </div>
                
                {account.lastSync && (
                  <span className="text-sm text-gray-400">
                    Last synced: {new Date(account.lastSync).toLocaleString()}
                  </span>
                )}
                
                <div className="ml-auto flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8"
                    onClick={() => handleSyncNow(account.platform)}
                    disabled={loading === account.platform}
                  >
                    {loading === account.platform ? (
                      <RefreshCw size={14} className="animate-spin mr-1" />
                    ) : (
                      <RefreshCw size={14} className="mr-1" />
                    )}
                    Sync Now
                  </Button>
                  
                  <Button
                    size="sm" 
                    variant="destructive"
                    className="h-8"
                    onClick={() => handleDisconnect(account.platform)}
                  >
                    <X size={14} className="mr-1" />
                    Disconnect
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="bg-white/5 rounded-lg p-5">
        <h4 className="font-medium mb-4">Auto-Sync Settings</h4>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Automatic Data Synchronization</p>
            <p className="text-sm text-gray-400">Automatically sync your account data every 6 hours</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
    </div>
  );
}
