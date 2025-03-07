
import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { 
  Image, MessageSquare, Hash, CalendarClock, Sparkles, Upload, 
  Instagram, Twitter, Linkedin, Clock, Maximize2, X, Plus, Smile
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-500' },
  { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'from-blue-400 to-blue-600' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'from-blue-600 to-blue-800' },
];

const suggestedHashtags = [
  '#DigitalMarketing',
  '#SocialMediaTips',
  '#ContentCreator',
  '#GrowthHacking',
  '#PersonalBranding',
  '#BusinessTips',
  '#MarketingStrategy',
  '#SocialMediaMarketing',
  '#Entrepreneur',
];

const Create = () => {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([platforms[0].id]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateContent = () => {
    setIsGenerating(true);
    // Simulate AI generation delay
    setTimeout(() => {
      setContent("Just wrapped up our quarterly strategy meeting! 📊\n\nExcited to share that we're launching a new product line next month that's going to revolutionize how teams collaborate remotely.\n\nStay tuned for more details!");
      setIsGenerating(false);
    }, 1500);
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const addHashtag = (tag: string) => {
    if (!hashtags.includes(tag)) {
      setHashtags([...hashtags, tag]);
    }
  };

  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter(t => t !== tag));
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 p-8 overflow-auto max-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Create Content</h1>
              <p className="text-gray-400">Craft, schedule, and optimize your social media posts</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="glass-morphism rounded-xl p-6 mb-6">
                <div className="flex flex-wrap gap-3 mb-6">
                  {platforms.map((platform) => {
                    const Icon = platform.icon;
                    const isSelected = selectedPlatforms.includes(platform.id);
                    
                    return (
                      <button
                        key={platform.id}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-md transition-all",
                          isSelected
                            ? "bg-gradient-to-r text-white font-medium shadow-lg"
                            : "bg-white/10 text-gray-300 hover:bg-white/20"
                        )}
                        style={{
                          backgroundImage: isSelected ? `linear-gradient(to right, var(--tw-gradient-stops))` : '',
                        }}
                        onClick={() => togglePlatform(platform.id)}
                      >
                        <div className={isSelected ? platform.color : ''}>
                          <Icon size={18} />
                        </div>
                        <span>{platform.name}</span>
                      </button>
                    );
                  })}
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="content" className="text-sm font-medium">Content</Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 gap-1 text-brand-purple hover:text-brand-purple-light"
                      onClick={handleGenerateContent}
                      disabled={isGenerating}
                    >
                      <Sparkles size={14} />
                      <span>{isGenerating ? 'Generating...' : 'Generate with AI'}</span>
                    </Button>
                  </div>
                  <div className="relative">
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="What do you want to share?"
                      className="min-h-[200px] bg-white/5 border-white/10 resize-none"
                    />
                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                      <button className="text-gray-400 hover:text-white">
                        <Smile size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-white">
                        <Maximize2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-2 block">Media</Label>
                  <div className="border border-dashed border-white/20 rounded-lg p-8 flex flex-col items-center justify-center text-center">
                    <div className="bg-white/5 rounded-full p-3 mb-3">
                      <Upload size={24} className="text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-400 mb-2">Drag and drop files here, or click to browse</p>
                    <p className="text-xs text-gray-500">Supports JPG, PNG, GIF, MP4 (max 100MB)</p>
                    
                    <Button variant="outline" size="sm" className="mt-4">
                      Browse Files
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-2 block">Hashtags</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {hashtags.map((tag) => (
                      <div 
                        key={tag} 
                        className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{tag}</span>
                        <button 
                          onClick={() => removeHashtag(tag)}
                          className="text-gray-400 hover:text-white"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    
                    {hashtags.length === 0 && (
                      <p className="text-sm text-gray-500">No hashtags added yet</p>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Suggested hashtags:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedHashtags.map((tag) => (
                        <button
                          key={tag}
                          className={cn(
                            "px-3 py-1 rounded-full text-xs transition-colors",
                            hashtags.includes(tag)
                              ? "bg-brand-purple/20 text-brand-purple"
                              : "bg-white/10 text-gray-300 hover:bg-white/20"
                          )}
                          onClick={() => addHashtag(tag)}
                          disabled={hashtags.includes(tag)}
                        >
                          {tag}
                        </button>
                      ))}
                      
                      <button className="flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-white/5 text-gray-400 hover:bg-white/10 transition-colors">
                        <Plus size={10} />
                        <span>Generate more</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button variant="outline">Save as Draft</Button>
                <Button className="bg-brand-purple hover:bg-brand-purple-light">Schedule Post</Button>
              </div>
            </div>
            
            <div>
              <div className="glass-morphism rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Schedule</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="date" className="text-sm font-medium mb-2 block">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarClock className="mr-2 h-4 w-4" />
                          {selectedDate ? (
                            selectedDate.toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label htmlFor="time" className="text-sm font-medium mb-2 block">Time</Label>
                    <div className="relative">
                      <Input
                        id="time"
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="pl-10"
                      />
                      <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="best-time" className="text-sm font-medium">Use AI best time suggestion</Label>
                      <Switch id="best-time" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Let our AI suggest the best time to post for maximum engagement</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-morphism rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Preview</h3>
                
                <Tabs defaultValue="instagram" className="w-full">
                  <TabsList className="w-full mb-4">
                    {platforms.map((platform) => (
                      selectedPlatforms.includes(platform.id) && (
                        <TabsTrigger 
                          key={platform.id} 
                          value={platform.id}
                          className="flex-1"
                        >
                          {platform.name}
                        </TabsTrigger>
                      )
                    ))}
                  </TabsList>
                  
                  {platforms.map((platform) => (
                    selectedPlatforms.includes(platform.id) && (
                      <TabsContent key={platform.id} value={platform.id}>
                        <div className="bg-black/50 rounded-lg p-4 border border-white/10">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                              <span className="text-xs font-bold">JD</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">johndoe</p>
                              <p className="text-xs text-gray-500">John Doe</p>
                            </div>
                          </div>
                          
                          {content ? (
                            <p className="text-sm whitespace-pre-line mb-3">{content}</p>
                          ) : (
                            <div className="h-20 mb-3 bg-white/5 rounded-md animate-pulse"></div>
                          )}
                          
                          {hashtags.length > 0 && (
                            <p className="text-sm text-brand-purple-light mb-3">
                              {hashtags.join(' ')}
                            </p>
                          )}
                          
                          <div className="aspect-video bg-white/5 rounded-md flex items-center justify-center">
                            <Image className="text-gray-500" size={24} />
                          </div>
                        </div>
                      </TabsContent>
                    )
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
