# Quick API Setup Instructions

## ⚡ Quick Start (5 minutes)

### 1. Set Up Supabase Tables (2 min)
1. Open: https://ugmmejecfpyihwnxsgpt.supabase.co/project/_/sql/new
2. Copy all SQL from `supabase/schema.sql`
3. Paste and click "Run"
4. You should see "Success. No rows returned"

### 2. Get Unsplash API Key (2 min)
1. Go to: https://unsplash.com/developers
2. Sign up/Login
3. Click "New Application"
4. Accept terms, fill form (use "Pouneh's Website" as app name)
5. Copy your **Access Key**
6. Open `.env.local` and replace:
   ```
   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your-unsplash-access-key-here
   ```
   with your actual key

### 3. (Optional) Get Adzuna Jobs API (3 min)
The site works without this (uses fallback jobs), but real jobs are better!

1. Go to: https://developer.adzuna.com/signup
2. Fill the form
3. Check email for credentials
4. Open `.env.local` and add:
   ```
   ADZUNA_APP_ID=your-actual-id
   ADZUNA_APP_KEY=your-actual-key
   ```

### 4. Restart Server
```bash
# Stop current server (Ctrl+C)
npm run dev
```

## ✅ Test It Works

Visit these pages:
- http://localhost:3000 - Should show jobs
- http://localhost:3000/moon-log - Should show today's moon phase
- http://localhost:3000/vision-board - Ready for image search


## 🎉 You're Done!

The APIs are now ready. The caching system will:
- Speed up your site ⚡
- Save API quota 💰
- Work perfectly on Vercel 🚀

---

## 📝 Quick Reference

**Moon Phase API**: No key needed ✅
**Unsplash API**: https://unsplash.com/developers
**Adzuna Jobs API**: https://developer.adzuna.com/signup
**Supabase Dashboard**: https://ugmmejecfpyihwnxsgpt.supabase.co

Need help? Check `API_SETUP.md` for detailed instructions!
