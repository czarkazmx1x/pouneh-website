// Unsplash API with Supabase Caching
import { createClient } from '@/lib/supabase/client'

export interface UnsplashImage {
  id: string
  url: string
  thumbUrl: string
  photographer: string
  photographerUrl: string
  description: string | null
}

export async function searchUnsplashImages(
  query: string, 
  limit: number = 9
): Promise<UnsplashImage[]> {
  const supabase = createClient()
  
  // Check cache first (cache for 24 hours)
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const { data: cached } = await supabase
    .from('unsplash_images')
    .select('*')
    .eq('search_query', query)
    .gte('created_at', oneDayAgo)
    .limit(limit)
  
  if (cached && cached.length > 0) {
    return cached.map(img => ({
      id: img.image_id,
      url: img.image_url,
      thumbUrl: img.thumb_url,
      thumbUrl: img.thumb_url,
      photographer: img.photographer,
      photographerUrl: img.photographer_url,
      description: img.description
    }))
  }
  
  // Fetch from API if not cached
  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
  
  if (!accessKey) {
    console.warn('Unsplash API key not configured')
    return []
  }
  
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${limit}&client_id=${accessKey}`
    )
    
    if (!response.ok) throw new Error('Unsplash API failed')
    
    const data = await response.json()
    const images: UnsplashImage[] = data.results.map((photo: any) => ({
      id: photo.id,
      url: photo.urls.regular,
      thumbUrl: photo.urls.thumb,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
      description: photo.description || photo.alt_description
    }))
    
    // Cache the results
    // Cache the results
    const cachePromises = images.map(img => 
      supabase.from('unsplash_images').upsert({
        search_query: query,
        image_id: img.id,
        image_url: img.url,
        thumb_url: img.thumbUrl,
        photographer: img.photographer,
        photographer_url: img.photographerUrl,
        description: img.description,
        data: data.results.find((p: any) => p.id === img.id),
        updated_at: new Date().toISOString()
      })
    )
    
    await Promise.all(cachePromises)
    
    return images
  } catch (error) {
    console.error('Unsplash fetch error:', error)
    return []
  }
}

// Popular searches for Vision Board
export const VISION_CATEGORIES = {
  home: ['cozy apartment', 'dream home', 'beautiful interior', 'home decor'],
  career: ['success', 'professional woman', 'office inspiration', 'career growth'],
  self: ['self love', 'confidence', 'meditation', 'empowerment'],
  lifestyle: ['morning light', 'peaceful', 'nature', 'wellness']
}
