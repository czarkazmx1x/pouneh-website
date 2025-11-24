# Supabase Integration Guide

## ✅ Setup Complete

Supabase has been successfully integrated into your Pouneh_Website project!

## 📁 Files Created

- `src/lib/supabase/client.ts` - Client-side Supabase client
- `src/lib/supabase/server.ts` - Server-side Supabase client
- `.env.local` - Environment variables with your credentials
- `src/app/supabase-example/page.tsx` - Example usage page

## 🚀 Quick Start

### 1. Using Supabase in Server Components

```typescript
import { createClient } from '@/lib/supabase/server'

export default async function MyPage() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('your_table')
    .select('*')
  
  return <div>{/* Your component */}</div>
}
```

### 2. Using Supabase in Client Components

```typescript
'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function MyClientComponent() {
  const [data, setData] = useState([])
  const supabase = createClient()
  
  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from('your_table').select('*')
      setData(data || [])
    }
    fetchData()
  }, [])
  
  return <div>{/* Your component */}</div>
}
```

## 🔐 Authentication Example

```typescript
const supabase = createClient()

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})

// Sign out
await supabase.auth.signOut()

// Get current user
const { data: { user } } = await supabase.auth.getUser()
```

## 📊 Database Operations

### Insert Data
```typescript
const { data, error } = await supabase
  .from('your_table')
  .insert({ column1: 'value1', column2: 'value2' })
```

### Update Data
```typescript
const { data, error } = await supabase
  .from('your_table')
  .update({ column1: 'new_value' })
  .eq('id', 1)
```

### Delete Data
```typescript
const { data, error } = await supabase
  .from('your_table')
  .delete()
  .eq('id', 1)
```

## 🔄 Real-time Subscriptions

```typescript
const channel = supabase
  .channel('table-changes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'your_table' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()
```

## 📚 Useful Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Your Supabase Dashboard](https://ugmmejecfpyihwnxsgpt.supabase.co)

## 🎯 Next Steps

1. **Create Tables**: Go to your Supabase dashboard and create tables
2. **Test the Example**: Run `npm run dev` and visit `/supabase-example`
3. **Add Features**: Start using Supabase in your existing pages
4. **Security**: Set up Row Level Security (RLS) policies in Supabase

## 🔒 Security Note

Your credentials are stored in `.env.local` which is gitignored by default.
Never commit this file to version control!
```
