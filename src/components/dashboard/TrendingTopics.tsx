
import { Sparkles } from 'lucide-react';

interface TrendingTopic {
  topic: string;
  growth: number;
  category: string;
}

const topics: TrendingTopic[] = [
  { topic: '#AI', growth: 78, category: 'Technology' },
  { topic: '#SummerVibes', growth: 45, category: 'Lifestyle' },
  { topic: '#DigitalNomad', growth: 32, category: 'Work' },
  { topic: '#ClimateAction', growth: 28, category: 'Environment' },
  { topic: '#MentalHealthAwareness', growth: 24, category: 'Wellness' },
];

export function TrendingTopics() {
  return (
    <div className="p-6 rounded-xl glass-morphism">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Trending Topics</h3>
        <button className="text-xs flex items-center gap-1 text-brand-purple hover:text-brand-purple-light transition-colors">
          <Sparkles size={14} />
          <span>Generate ideas</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {topics.map((topic, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{topic.topic}</p>
              <p className="text-xs text-gray-500">{topic.category}</p>
            </div>
            <div className="text-sm font-medium text-green-400">
              +{topic.growth}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
