import { supabase } from './supabase';

// Interface for the profile data
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

// Interface for a trend item
export interface Trend {
  id: string;
  title: string;
  description: string;
  category: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  likes: number;
  tags?: string[];
}

// Profiles API
export const profilesApi = {
  // Get the current user's profile
  async getCurrentProfile(): Promise<Profile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    
    return data;
  },
  
  // Update the current user's profile
  async updateProfile(profile: Partial<Profile>): Promise<Profile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', user.id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating profile:', error);
      return null;
    }
    
    return data;
  },
};

// Trends API
export const trendsApi = {
  // Get all trends
  async getTrends(): Promise<Trend[]> {
    const { data, error } = await supabase
      .from('trends')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching trends:', error);
      return [];
    }
    
    return data || [];
  },
  
  // Get a specific trend by ID
  async getTrendById(id: string): Promise<Trend | null> {
    const { data, error } = await supabase
      .from('trends')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching trend:', error);
      return null;
    }
    
    return data;
  },
  
  // Create a new trend
  async createTrend(trend: Omit<Trend, 'id' | 'created_at' | 'updated_at' | 'likes'>): Promise<Trend | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('trends')
      .insert({
        ...trend,
        created_by: user.id,
        likes: 0,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating trend:', error);
      return null;
    }
    
    return data;
  },
  
  // Update a trend
  async updateTrend(id: string, trend: Partial<Trend>): Promise<Trend | null> {
    const { data, error } = await supabase
      .from('trends')
      .update(trend)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating trend:', error);
      return null;
    }
    
    return data;
  },
  
  // Delete a trend
  async deleteTrend(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('trends')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting trend:', error);
      return false;
    }
    
    return true;
  },
  
  // Like a trend
  async likeTrend(id: string): Promise<boolean> {
    const { error } = await supabase.rpc('increment_trend_likes', {
      trend_id: id
    });
    
    if (error) {
      console.error('Error liking trend:', error);
      return false;
    }
    
    return true;
  },
}; 