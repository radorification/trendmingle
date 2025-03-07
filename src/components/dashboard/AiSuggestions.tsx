
import { Sparkles, Copy, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface SuggestionProps {
  title: string;
  type: 'hashtags' | 'caption' | 'idea';
  content: string;
}

const defaultSuggestions: SuggestionProps[] = [
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

// Alternative suggestions for regenerate functionality
const alternativeSuggestions: Record<'hashtags' | 'caption' | 'idea', string[]> = {
  hashtags: [
    "#CreativeWorkspace #MondayMotivation #RemoteLifestyle #OfficeWithAView #DigitalNomadLife",
    "#ProductivityHacks #LocationIndependent #WorkAndTravel #WorkspaceGoals #RemoteWorkLife",
    "#FutureOfWork #WorkFromWherever #FlexibleLifestyle #CoworkingSpace #NomadLife"
  ],
  caption: [
    "Monday blues? Not when your office looks like this! Productivity soars when you love where you work. 🌊💻 #RemoteWorkPerks",
    "Trading the cubicle for coastlines. Finding inspiration in new surroundings makes all the difference in my creative process. Where are you working from today? 🌴✨",
    "The best part of remote work? Making anywhere your office. Today's productivity soundtrack: ocean waves. 🌊 What's your ideal work environment?"
  ],
  idea: [
    "Share a day-in-the-life video showing how you balance work and exploration as a digital nomad.",
    "Create a comparison post of 'Corporate Life vs. Remote Work' with the pros and cons you've experienced.",
    "Start a weekly series showcasing different remote work setups and locations you've tried."
  ]
};

export function AiSuggestions() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'hashtags' | 'caption' | 'idea'>('hashtags');
  const [copied, setCopied] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<SuggestionProps[]>(defaultSuggestions);
  const [isRegenerating, setIsRegenerating] = useState(false);
  
  const activeSuggestion = suggestions.find(s => s.type === activeTab);
  
  const copyToClipboard = () => {
    if (activeSuggestion) {
      navigator.clipboard.writeText(activeSuggestion.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Copied to clipboard",
        description: "Content has been copied to your clipboard",
      });
    }
  };
  
  const handleRegenerate = () => {
    setIsRegenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Get random alternative suggestion for the active tab
      const alternatives = alternativeSuggestions[activeTab];
      const randomIndex = Math.floor(Math.random() * alternatives.length);
      const newContent = alternatives[randomIndex];
      
      // Update the suggestions
      setSuggestions(prev => 
        prev.map(suggestion => 
          suggestion.type === activeTab 
            ? { ...suggestion, content: newContent }
            : suggestion
        )
      );
      
      setIsRegenerating(false);
      
      toast({
        title: "Regenerated content",
        description: `New ${activeTab} suggestion has been generated`,
      });
    }, 1000);
  };
  
  return (
    <div className="p-6 rounded-xl glass-morphism">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Sparkles className="text-brand-purple mr-2 h-5 w-5" />
          <h3 className="text-lg font-semibold">AI Suggestions</h3>
        </div>
        
        <button 
          className={cn(
            "text-xs flex items-center gap-1 text-brand-purple hover:text-brand-purple-light transition-colors",
            isRegenerating && "opacity-50 cursor-not-allowed"
          )}
          onClick={handleRegenerate}
          disabled={isRegenerating}
        >
          <span>{isRegenerating ? "Regenerating..." : "Regenerate"}</span>
          <Sparkles size={14} className={isRegenerating ? "animate-pulse" : ""} />
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
