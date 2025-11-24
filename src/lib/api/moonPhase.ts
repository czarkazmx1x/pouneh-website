import { createClient } from '@/lib/supabase/client'

export interface MoonPhaseData {
  date: string
  phase: string
  illumination: number
  phaseEmoji: string
}

// Calculate moon phase based on date (no API needed!)
function calculateMoonPhase(date: Date): { phase: string; illumination: number; emoji: string } {
  // Known new moon reference: October 21, 2025 at noon UTC
  const knownNewMoon = new Date('2025-10-21T12:00:00Z').getTime()
  
  // Use noon UTC for the input date to avoid timezone issues
  const dateAtNoon = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0)
  const currentDate = dateAtNoon.getTime()
  
  // Lunar cycle is approximately 29.53 days
  const lunarCycle = 29.53058770576
  
  // Calculate days since/until known new moon
  let daysSinceNew = ((currentDate - knownNewMoon) / (1000 * 60 * 60 * 24)) % lunarCycle
  
  // Handle dates before reference new moon
  if (daysSinceNew < 0) {
    daysSinceNew += lunarCycle
  }
  
  // Calculate phase based on days
  let phase = ''
  let emoji = ''
  let illumination = 0
  
  if (daysSinceNew < 1.84566) {
    phase = 'New Moon'
    emoji = '🌑'
    illumination = 0
  } else if (daysSinceNew < 7.38264) {
    phase = 'Waxing Crescent'
    emoji = '🌒'
    illumination = Math.round((daysSinceNew / 7.38264) * 50)
  } else if (daysSinceNew < 9.22830) {
    phase = 'First Quarter'
    emoji = '🌓'
    illumination = 50
  } else if (daysSinceNew < 14.76528) {
    phase = 'Waxing Gibbous'
    emoji = '🌔'
    illumination = Math.round(50 + ((daysSinceNew - 7.38264) / 7.38264) * 50)
  } else if (daysSinceNew < 16.61094) {
    phase = 'Full Moon'
    emoji = '🌕'
    illumination = 100
  } else if (daysSinceNew < 22.14792) {
    phase = 'Waning Gibbous'
    emoji = '🌖'
    illumination = Math.round(100 - ((daysSinceNew - 14.76528) / 7.38264) * 50)
  } else if (daysSinceNew < 23.99358) {
    phase = 'Last Quarter'
    emoji = '🌗'
    illumination = 50
  } else if (daysSinceNew < 29.53058) {
    phase = 'Waning Crescent'
    emoji = '🌘'
    illumination = Math.round(50 - ((daysSinceNew - 22.14792) / 7.38264) * 50)
  } else {
    phase = 'New Moon'
    emoji = '🌑'
    illumination = 0
  }
  
  return { phase, illumination, emoji }
}

// Fetch moon phase from calculation and cache in Supabase
export async function fetchMoonPhase(date: string): Promise<MoonPhaseData | null> {
  const supabase = createClient()
  
  try {
    // Check if we have cached data
    const { data: cached, error: cacheError } = await supabase
      .from('moon_phases')
      .select('*')
      .eq('date', date)
      .single()
    
    if (cached && !cacheError) {
      return {
        date: cached.date,
        phase: cached.phase,
        illumination: parseFloat(cached.illumination),
        phaseEmoji: cached.phase_emoji
      }
    }
    
    // Calculate moon phase
    const dateObj = new Date(date)
    const calculated = calculateMoonPhase(dateObj)
    
    // Cache in Supabase
    const { error: insertError } = await supabase
      .from('moon_phases')
      .insert({
        date: date,
        phase: calculated.phase,
        illumination: calculated.illumination,
        phase_emoji: calculated.emoji,
        data: { calculated: true }
      })
    
    if (insertError) {
      console.error('Error caching moon phase:', insertError)
    }
    
    return {
      date: date,
      phase: calculated.phase,
      illumination: calculated.illumination,
      phaseEmoji: calculated.emoji
    }
    
  } catch (error) {
    console.error('Error fetching moon phase:', error)
    return null
  }
}

// Get today's moon phase
export async function getTodaysMoonPhase(): Promise<MoonPhaseData | null> {
  const today = new Date().toISOString().split('T')[0]
  return fetchMoonPhase(today)
}

// Get simplified phase name for UI
export function getSimplifiedPhase(phase: string): 'new' | 'waxing' | 'full' | 'waning' {
  const phaseLower = phase.toLowerCase()
  
  if (phaseLower.includes('new')) return 'new'
  if (phaseLower.includes('full')) return 'full'
  if (phaseLower.includes('waxing')) return 'waxing'
  if (phaseLower.includes('waning')) return 'waning'
  
  return 'new'
}
