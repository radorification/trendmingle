
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Post {
  title: string;
  platform: 'instagram' | 'twitter' | 'linkedin' | 'tiktok';
  date: string;
  time: string;
  status: 'scheduled' | 'draft' | 'idea';
}

const posts: Post[] = [
  { 
    title: "New Product Announcement", 
    platform: "linkedin", 
    date: "Today", 
    time: "2:30 PM", 
    status: "scheduled" 
  },
  { 
    title: "Behind the Scenes Video", 
    platform: "instagram", 
    date: "Tomorrow", 
    time: "9:15 AM", 
    status: "scheduled" 
  },
  { 
    title: "Industry News Reaction", 
    platform: "twitter", 
    date: "Sep 15", 
    time: "12:00 PM", 
    status: "draft" 
  },
  { 
    title: "Tutorial: 5 Tips for...", 
    platform: "tiktok", 
    date: "Sep 17", 
    time: "5:45 PM", 
    status: "idea" 
  },
];

export function UpcomingPosts() {
  const getPlatformColor = (platform: Post['platform']) => {
    switch (platform) {
      case 'instagram':
        return 'from-pink-500 to-purple-500';
      case 'twitter':
        return 'from-blue-400 to-blue-600';
      case 'linkedin':
        return 'from-blue-600 to-blue-800';
      case 'tiktok':
        return 'from-pink-500 to-cyan-400';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  const getPlatformLabel = (platform: Post['platform']) => {
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

  const getStatusColor = (status: Post['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-green-500/20 text-green-400';
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'idea':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="p-6 rounded-xl glass-morphism">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Upcoming Posts</h3>
        <button className="text-xs flex items-center gap-1 text-brand-purple hover:text-brand-purple-light transition-colors">
          <CalendarIcon size={14} />
          <span>View all</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={cn(
              "h-10 w-10 rounded-md bg-gradient-to-br flex items-center justify-center shrink-0",
              getPlatformColor(post.platform)
            )}>
              <span className="text-xs font-bold text-white">
                {getPlatformLabel(post.platform).substring(0, 2)}
              </span>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{post.title}</p>
              <div className="flex items-center text-xs text-gray-400 gap-2">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.time}</span>
              </div>
            </div>
            
            <div className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              getStatusColor(post.status)
            )}>
              {post.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
