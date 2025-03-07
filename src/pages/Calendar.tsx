
import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { 
  Plus, Calendar as CalendarIcon, Filter, ChevronLeft, ChevronRight, 
  Instagram, Twitter, Linkedin, BarChart2 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Post {
  id: string;
  title: string;
  date: Date;
  platform: 'instagram' | 'twitter' | 'linkedin';
  status: 'scheduled' | 'draft' | 'posted';
  engagement?: number;
}

const dummyPosts: Post[] = [
  {
    id: '1',
    title: 'New Product Launch Announcement',
    date: new Date(2023, 8, 15, 14, 30),
    platform: 'instagram',
    status: 'scheduled',
  },
  {
    id: '2',
    title: 'Industry Trend Analysis',
    date: new Date(2023, 8, 17, 10, 0),
    platform: 'linkedin',
    status: 'draft',
  },
  {
    id: '3',
    title: 'Customer Success Story',
    date: new Date(2023, 8, 15, 9, 0),
    platform: 'twitter',
    status: 'scheduled',
  },
  {
    id: '4',
    title: 'Behind the Scenes Team Photo',
    date: new Date(2023, 8, 14, 16, 45),
    platform: 'instagram',
    status: 'posted',
    engagement: 128,
  },
  {
    id: '5',
    title: 'Weekly Tips Thread',
    date: new Date(2023, 8, 14, 12, 0),
    platform: 'twitter',
    status: 'posted',
    engagement: 87,
  },
];

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  
  // Group posts by date for month view
  const groupedPosts: Record<string, Post[]> = {};
  
  dummyPosts.forEach(post => {
    const dateKey = post.date.toISOString().split('T')[0];
    if (!groupedPosts[dateKey]) {
      groupedPosts[dateKey] = [];
    }
    groupedPosts[dateKey].push(post);
  });

  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get platform icon
  const getPlatformIcon = (platform: Post['platform']) => {
    switch (platform) {
      case 'instagram':
        return <Instagram size={14} />;
      case 'twitter':
        return <Twitter size={14} />;
      case 'linkedin':
        return <Linkedin size={14} />;
      default:
        return null;
    }
  };

  // Custom content renderer for each day
  const renderDayContent = (day: Date) => {
    const dateKey = day.toISOString().split('T')[0];
    const postsForDay = groupedPosts[dateKey] || [];
    
    return (
      <div className="h-full flex flex-col">
        <div className="text-right mb-1">
          {day.getDate()}
        </div>
        
        <div className="flex-1 overflow-hidden">
          {postsForDay.slice(0, 3).map((post, i) => (
            <div 
              key={post.id}
              className={cn(
                "text-xs mb-1 p-1 rounded truncate flex items-center gap-1",
                post.status === 'posted' && 'bg-green-500/20 text-green-400',
                post.status === 'scheduled' && 'bg-blue-500/20 text-blue-400',
                post.status === 'draft' && 'bg-yellow-500/20 text-yellow-400'
              )}
            >
              {getPlatformIcon(post.platform)}
              {post.title}
            </div>
          ))}
          
          {postsForDay.length > 3 && (
            <div className="text-xs text-gray-500 px-1">
              +{postsForDay.length - 3} more
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 p-8 overflow-auto max-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Content Calendar</h1>
              <p className="text-gray-400">Schedule and manage your content across platforms</p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Filter size={16} />
                <span>Filter</span>
              </Button>
              
              <Button className="gap-2 bg-brand-purple hover:bg-brand-purple-light">
                <Plus size={16} />
                <span>New Post</span>
              </Button>
            </div>
          </div>
          
          <div className="glass-morphism rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                  <ChevronLeft size={16} />
                </Button>
                
                <div className="flex items-center">
                  <CalendarIcon size={18} className="mr-2 text-brand-purple" />
                  <h2 className="text-lg font-semibold">
                    {date ? date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}
                  </h2>
                </div>
                
                <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                  <ChevronRight size={16} />
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  className={cn(
                    "px-3 py-1 text-sm rounded-md transition-colors",
                    view === 'month' ? "bg-brand-purple text-white" : "bg-white/10 hover:bg-white/20"
                  )}
                  onClick={() => setView('month')}
                >
                  Month
                </button>
                <button
                  className={cn(
                    "px-3 py-1 text-sm rounded-md transition-colors",
                    view === 'week' ? "bg-brand-purple text-white" : "bg-white/10 hover:bg-white/20"
                  )}
                  onClick={() => setView('week')}
                >
                  Week
                </button>
                <button
                  className={cn(
                    "px-3 py-1 text-sm rounded-md transition-colors",
                    view === 'day' ? "bg-brand-purple text-white" : "bg-white/10 hover:bg-white/20"
                  )}
                  onClick={() => setView('day')}
                >
                  Day
                </button>
              </div>
            </div>
            
            <div className="bg-black/25 rounded-lg p-1">
              <CalendarComponent 
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full pointer-events-auto"
                components={{
                  DayContent: ({ date: dayDate }) => renderDayContent(dayDate),
                }}
              />
            </div>
          </div>
          
          <div className="glass-morphism rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Upcoming Posts</h3>
            
            <div className="space-y-4">
              {dummyPosts
                .filter(post => post.status !== 'posted')
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .map((post) => (
                  <div key={post.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="w-12 text-center">
                      <div className="text-xs text-gray-400">
                        {post.date.toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div className="text-xl font-bold">
                        {post.date.getDate()}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="font-medium mb-1">{post.title}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <CalendarIcon size={14} />
                          {formatTime(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          {getPlatformIcon(post.platform)}
                          {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      post.status === 'scheduled' ? "bg-blue-500/20 text-blue-400" : "bg-yellow-500/20 text-yellow-400"
                    )}>
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </div>
                    
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                      <ChevronRight size={14} />
                    </Button>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
