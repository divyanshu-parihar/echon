# Token Strategy Builder - Setup Guide

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - Name: token-strategy-builder
   - Database Password: (choose a secure password)
   - Region: (choose closest to you)
4. Wait for the project to be created (takes ~2 minutes)

### 2. Enable Google OAuth

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Google** in the list and click to expand
3. Toggle **Enable Sign in with Google** to ON
4. You'll need to set up Google OAuth credentials:

#### Setting up Google OAuth:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Configure the OAuth consent screen if prompted
6. Choose **Web application** as the application type
7. Add authorized redirect URIs:
   - `https://<your-project-ref>.supabase.co/auth/v1/callback`
   - (Get your project ref from Supabase dashboard URL)
8. Copy the **Client ID** and **Client Secret**
9. Paste them into Supabase Google provider settings
10. Save the configuration

### 3. Get Your Supabase Credentials

1. In Supabase dashboard, go to **Project Settings** → **API**
2. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under Project API keys)

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

1. Copy the example env file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Features

### Landing Page
- Modern, n8n-inspired design
- Feature showcase
- Call-to-action sections

### Authentication
- **Email/Password Sign Up** - Create account with email
- **Email/Password Sign In** - Login with credentials
- **Google OAuth** - One-click sign in with Google
- **Password Reset** - Forgot password flow
- **Protected Routes** - Automatic redirect for authenticated users

### Strategy Builder (App)
- Visual workflow builder
- Drag-and-drop filter nodes
- Real-time configuration
- Export/Import strategies
- User profile with sign out

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── FilterNode.tsx       # Custom node component
│   │   ├── Sidebar.tsx          # Drag-and-drop sidebar
│   │   ├── ConfigPanel.tsx      # Node configuration panel
│   │   └── ProtectedRoute.tsx   # Auth guard component
│   ├── contexts/
│   │   └── AuthContext.tsx      # Authentication context
│   ├── lib/
│   │   └── supabase.ts          # Supabase client
│   ├── pages/
│   │   ├── Landing.tsx          # Landing page
│   │   ├── Login.tsx            # Login page
│   │   ├── Signup.tsx           # Signup page
│   │   ├── ForgotPassword.tsx   # Password reset page
│   │   └── AppPage.tsx          # Main app (strategy builder)
│   ├── App.tsx                  # Router configuration
│   ├── main.tsx                 # App entry point
│   └── types.ts                 # TypeScript types
└── .env                         # Environment variables
```

## Troubleshooting

### Google OAuth not working
- Make sure the redirect URI in Google Cloud Console matches exactly
- Check that Google provider is enabled in Supabase
- Verify Client ID and Secret are correct

### "Missing Supabase environment variables" error
- Ensure `.env` file exists in the frontend directory
- Check that variable names start with `VITE_`
- Restart the dev server after changing `.env`

### Authentication not persisting
- Check browser console for errors
- Verify Supabase URL and anon key are correct
- Clear browser cache and cookies

## Next Steps

1. Customize the landing page content
2. Add more filter node types
3. Implement backend API for strategy persistence
4. Add user profile management
5. Implement strategy sharing features

## Support

For issues or questions:
- Check Supabase documentation: https://supabase.com/docs
- React Flow documentation: https://reactflow.dev
- React Router documentation: https://reactrouter.com
