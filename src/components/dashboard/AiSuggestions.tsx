
import { Sparkles, Copy, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SuggestionProps {
  title: string;
  type: 'hashtags' | 'caption' | 'idea';
  content: string;
}

const suggestions: SuggestionProps[] = [
  {
    title: "Trending Hashtags",
    type: "hashtags",
    content: "#WorkFromAnywhere #DigitalNomad #RemoteWork #TravelTuesday #WorkLifeBalance"
  },
  {
    title: "Caption Suggestion",
    type: "caption",
    content: "Embracing the nomad lifestyle! Working with this view makes Monday feel like a vacation. What's your ideal workspace? 💻🌴 #WorkFromAnywhere"
  },
  {
    title: "Content Idea",
    type: "idea",
    content: "Create a short tutorial showing your 3-step workflow optimization process that saves you 5 hours each week."
  }
];

export function AiSuggestions() {
  const [activeTab, setActiveTab] = useState<'hashtags' | 'caption' | 'idea'>('hashtags');
  const [copied, setCopied] = useState<boolean>(false);
  
  const activeSuggestion = suggestions.find(s => s.type === activeTab);
  
  const copyToClipboard = () => {
    if (activeSuggestion) {
      navigator.clipboard.writeText(activeSuggestion.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <div className="p-6 rounded-xl glass-morphism">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Sparkles className="text-brand-purple mr-2 h-5 w-5" />
          <h3 className="text-lg font-semibold">AI Suggestions</h3>
        </div>
        
        <button className="text-xs flex items-center gap-1 text-brand-purple hover:text-brand-purple-light transition-colors">
          <span>Regenerate</span>
          <Sparkles size={14} />
        </button>
      </div>
      
      <div className="flex border-b border-white/10 mb-4">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.type}
            className={cn(
              "pb-2 px-4 text-sm font-medium transition-colors",
              activeTab === suggestion.type
                ? "text-brand-purple border-b-2 border-brand-purple"
                : "text-gray-400 hover:text-white"
            )}
            onClick={() => setActiveTab(suggestion.type)}
          >
            {suggestion.title}
          </button>
        ))}
      </div>
      
      <div className="bg-white/5 rounded-lg p-4 mb-4">
        <p className="text-sm leading-relaxed">
          {activeSuggestion?.content}
        </p>
      </div>
      
      <div className="flex gap-2">
        <button
          className="text-xs flex items-center gap-1 px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
          onClick={copyToClipboard}
        >
          {copied ? "Copied!" : "Copy"}
          <Copy size={14} />
        </button>
        
        <button
          className="text-xs flex items-center gap-1 px-3 py-2 rounded-md bg-brand-purple hover:bg-brand-purple-light transition-colors ml-auto"
        >
          Use this
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
