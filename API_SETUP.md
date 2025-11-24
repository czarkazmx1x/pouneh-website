# 🚀 API Integration Setup Guide

## ✅ What's Been Integrated

Your site now has **3 powerful APIs** with smart caching:

1. **🌙 Moon Phase API** - Real lunar data for Moon Log
2. **🖼️ Unsplash API** - Beautiful images for Vision Board  
3. **💼 Adzuna Jobs API** - Real job listings for homepage

## 📋 Setup Checklist

### Step 1: Set Up Supabase Tables

Go to your Supabase SQL Editor:
👉 https://ugmmejecfpyihwnxsgpt.supabase.co/project/_/sql

Copy and paste the SQL from: `supabase/schema.sql`

Click **Run** to create all tables.

### Step 2: Get API Keys

#### Unsplash API (Required for Vision Board)
1. Go to: https://unsplash.com/developers
2. Create a free account
3. Create a new app
4. Copy your **Access Key**
5. Add to `.env.local`: `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your-key-here`

#### Adzuna Jobs API (Optional - has fallback)
1. Go to: https://developer.adzuna.com/signup
2. Create a free account
3. Get your **App ID** and **App Key**
4. Add to `.env.local`:
   ```
   ADZUNA_APP_ID=your-app-id
   ADZUNA_APP_KEY=your-app-key
   ```

#### Moon Phase API
✅ No key needed! Works out of the box.


### Step 3: Deploy to Vercel

When deploying to Vercel, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://ugmmejecfpyihwnxsgpt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your-key
ADZUNA_APP_ID=your-id
ADZUNA_APP_KEY=your-key
```

## 🎯 How It Works

### Smart Caching Strategy

```
User visits page
    ↓
Check Supabase cache
    ↓
Fresh data? → Use cache ⚡ (instant!)
    ↓
Stale data? → Fetch API → Update cache → Show data
```

### Cache Duration
- **Moon Phase**: Cached per day
- **Unsplash Images**: Cached for 24 hours
- **Jobs**: Cached for 6 hours

This means:
- ✅ Super fast loading
- ✅ Won't hit API rate limits
- ✅ Works on Vercel free tier
- ✅ Saves API quota

## 📊 API Usage

### Free Tier Limits
- **Moon Phase**: Unlimited (no key)
- **Unsplash**: 50 requests/hour (plenty with caching!)
- **Adzuna**: 5,000 calls/month (you'll use ~240/month with caching)

### With Our Caching

- **Moon Phase**: ~30 API calls/month (1 per day)
- **Unsplash**: ~40 API calls/month (cached 24hrs)
- **Jobs**: ~120 API calls/month (cached 6hrs)

**Total**: ~190 API calls/month across all services! 🎉

## 🧪 Testing

### Test Moon Phase API
```typescript
import { getMoonPhase } from '@/lib/api/moonPhase'
const phase = await getMoonPhase()
console.log(phase) // { phase: "Waxing Crescent", emoji: "🌒", ... }
```

### Test Unsplash API  
```typescript
import { searchUnsplashImages } from '@/lib/api/unsplash'
const images = await searchUnsplashImages('dream home')
console.log(images) // Array of beautiful images
```

### Test Jobs API
```typescript
import { searchJobs } from '@/lib/api/jobs'
const jobs = await searchJobs('developer', 'us')
console.log(jobs) // Array of job listings
```

## 🔧 Files Created

- `src/lib/api/moonPhase.ts` - Moon phase logic
- `src/lib/api/unsplash.ts` - Image search logic
- `src/lib/api/jobs.ts` - Job search logic
- `supabase/schema.sql` - Database tables
- `.env.local` - Configuration (updated)

## 🚨 Troubleshooting

**API not working?**
1. Check `.env.local` has correct keys
2. Restart dev server: `npm run dev`
3. Check Supabase tables are created
4. Check browser console for errors


**Caching not working?**
- Check Supabase RLS policies are set
- Verify tables exist in Supabase dashboard
- Check browser network tab

**Vercel deployment issues?**
- Add ALL environment variables
- Check build logs for errors
- Ensure Supabase is accessible

## 📖 Next Steps

Now that the infrastructure is ready, you need to:

1. **Set up Supabase tables** (run schema.sql)
2. **Get API keys** (Unsplash, Adzuna)
3. **Update pages** to use the new APIs

Ready to integrate into your pages? I can help with that next! 🚀
