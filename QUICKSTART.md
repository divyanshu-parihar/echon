# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Set Up Supabase (2 minutes)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to **Project Settings** → **API** and copy:
   - Project URL
   - anon public key

### Step 2: Configure Environment (30 seconds)

```bash
cd frontend
cp .env.example .env
```

Edit `.env` and paste your Supabase credentials:
```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 3: Install & Run (1 minute)

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Step 4: Enable Google OAuth (Optional - 2 minutes)

1. In Supabase dashboard: **Authentication** → **Providers** → **Google**
2. Toggle **Enable Sign in with Google**
3. Follow the Google Cloud Console setup in [SETUP.md](frontend/SETUP.md)

## ✅ You're Ready!

- Visit the landing page
- Click "Get Started" to sign up
- Build your first trading strategy!

## 📚 Next Steps

- Read [SETUP.md](frontend/SETUP.md) for detailed configuration
- Check [FEATURES.md](frontend/FEATURES.md) for all features
- Explore the strategy builder interface

## 🎯 What You Can Do Now

### Without Google OAuth
- ✅ Sign up with email/password
- ✅ Sign in with email/password
- ✅ Reset password
- ✅ Build visual strategies
- ✅ Export/import strategies

### With Google OAuth
- ✅ All of the above, plus:
- ✅ One-click sign in with Google
- ✅ Automatic account creation

## 🐛 Troubleshooting

### Can't sign in?
- Check that your `.env` file has the correct Supabase credentials
- Restart the dev server after changing `.env`

### Google OAuth not working?
- Make sure you've enabled it in Supabase
- Verify the redirect URI matches your Supabase project

### Build errors?
- Run `npm install` again
- Clear node_modules: `rm -rf node_modules && npm install`

## 💡 Tips

1. **Use the landing page** - Great starting point to understand the app
2. **Try drag & drop** - Drag filter nodes from the sidebar to the canvas
3. **Click nodes** - Click on nodes to configure them
4. **Connect nodes** - Drag from one node's handle to another
5. **Export your work** - Use the "Export Strategy" button to save

## 🎨 Design Highlights

- Modern gradient design (purple to pink)
- Smooth animations and transitions
- Professional n8n-inspired interface
- Fully responsive layout

## 📖 Learn More

- [Supabase Docs](https://supabase.com/docs)
- [React Flow Docs](https://reactflow.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)

---

**Happy Building! 🚀**
