# TrendMingle - AI-Powered Social Media Manager

TrendMingle is a modern, AI-powered social media management platform designed for creators and marketing teams. It streamlines content scheduling, provides AI-generated suggestions, and offers comprehensive analytics across multiple social media platforms.

## Features

- **AI-Powered Content Creation**: Generate captions, hashtags, and post ideas tailored to your brand voice
- **Multi-Platform Support**: Manage Instagram, Twitter, LinkedIn, and TikTok from one dashboard
- **Smart Scheduling**: Calendar view with AI-suggested optimal posting times
- **Analytics & Insights**: Track engagement metrics and identify content performance trends
- **Team Collaboration**: Workflow management with approval processes (coming soon)
- **Authentication**: Secure user authentication using Supabase Auth
- **Database Integration**: Fast and scalable database with Supabase PostgreSQL

## Tech Stack

- **Frontend**: React with TypeScript
- **UI Components**: shadcn/ui and Tailwind CSS
- **Charting**: Recharts
- **Icons**: Lucide React
- **Authentication & Backend**: Supabase
- **Database**: PostgreSQL (via Supabase)

## Screenshots

### Dashboard
<img width="1449" alt="dash1" src="https://github.com/user-attachments/assets/dcb6492f-78e1-420a-898e-1865f63413bc" />
<img width="1449" alt="dash2" src="https://github.com/user-attachments/assets/d5e97baa-adcd-47c8-8012-f84086cb63ae" />


### Content Calendar
<img width="1449" alt="calendar" src="https://github.com/user-attachments/assets/5b95979f-3c0b-41b6-8b8f-6225c65f0861" />

### Content Creation
<img width="1449" alt="create_content" src="https://github.com/user-attachments/assets/f9617f8e-f98f-452a-a855-bf3574dcd05e" />
g)

### Settings
<img width="1449" alt="settings" src="https://github.com/user-attachments/assets/5c8e559e-32d4-4313-b5d2-397dd73f0de3" />


## Getting Started

### Prerequisites

- Node.js 16.0 or later
- npm or yarn package manager
- Supabase account (free tier available)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/trendmingle.git
cd trendmingle
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
   - Rename `.env.example` to `.env`
   - Fill in your Supabase credentials:
     ```
     VITE_SUPABASE_URL=https://your-project-url.supabase.co
     VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

4. Set up your Supabase project
   - Create a new project in Supabase
   - Set up the authentication providers you need (Email, Google, etc.)
   - Create the necessary database tables:
     - `profiles`: To store user profile information
     - `trends`: To store trend data

5. Start the development server
```bash
npm run dev
# or
yarn dev
```

6. Open your browser and navigate to http://localhost:5173

## Usage

1. **Sign Up/Sign In**: Create an account or sign in to your existing account
2. **Connect Your Accounts**: Link your social media accounts in the Settings panel
3. **Create Content**: Use the Create Content tab to craft posts with AI assistance
4. **Schedule Posts**: Use the Calendar to plan and schedule your content
5. **Monitor Performance**: Review metrics and engagement data in the Dashboard

## Supabase Setup

### Authentication

TrendMingle uses Supabase for authentication. To set up authentication in your Supabase project:

1. Go to your Supabase project dashboard
2. Navigate to Authentication → Providers
3. Enable Email/Password sign-in (or any other providers you want)
4. Optionally configure email templates for confirmation emails

### Database

Create the following tables in your Supabase database:

1. `profiles` table:
   ```sql
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
     email TEXT NOT NULL,
     full_name TEXT,
     avatar_url TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

2. `trends` table:
   ```sql
   CREATE TABLE trends (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT,
     category TEXT NOT NULL,
     created_by UUID REFERENCES auth.users NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     likes INTEGER DEFAULT 0,
     tags TEXT[]
   );
   ```

3. Create RLS policies for security:
   ```sql
   -- For profiles table
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Users can view their own profile" ON profiles
     FOR SELECT USING (auth.uid() = id);
   CREATE POLICY "Users can update their own profile" ON profiles
     FOR UPDATE USING (auth.uid() = id);
     
   -- For trends table
   ALTER TABLE trends ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Anyone can read trends" ON trends
     FOR SELECT USING (true);
   CREATE POLICY "Authenticated users can create trends" ON trends
     FOR INSERT WITH CHECK (auth.uid() = created_by);
   CREATE POLICY "Users can update their own trends" ON trends
     FOR UPDATE USING (auth.uid() = created_by);
   CREATE POLICY "Users can delete their own trends" ON trends
     FOR DELETE USING (auth.uid() = created_by);
   ```

4. Create the function for incrementing likes:
   ```sql
   CREATE OR REPLACE FUNCTION increment_trend_likes(trend_id UUID)
   RETURNS VOID AS $$
   BEGIN
     UPDATE trends
     SET likes = likes + 1
     WHERE id = trend_id;
   END;
   $$ LANGUAGE plpgsql;
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
