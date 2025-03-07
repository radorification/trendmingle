
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

export function AccountSettings() {
  const { toast } = useToast();
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [timezone, setTimezone] = useState('UTC');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSaveChanges = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings Saved",
        description: "Your account settings have been saved successfully",
      });
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Profile Settings</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Full Name
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="timezone" className="text-sm font-medium">
            Timezone
          </label>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger id="timezone">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UTC">UTC</SelectItem>
              <SelectItem value="EST">Eastern Time (EST)</SelectItem>
              <SelectItem value="CST">Central Time (CST)</SelectItem>
              <SelectItem value="MST">Mountain Time (MST)</SelectItem>
              <SelectItem value="PST">Pacific Time (PST)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="pt-4">
        <Button 
          onClick={handleSaveChanges} 
          disabled={isLoading}
          className="bg-brand-purple hover:bg-brand-purple-light"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
