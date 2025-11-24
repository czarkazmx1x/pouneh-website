// Adzuna Jobs API with Supabase Caching
import { createClient } from '@/lib/supabase/server'

export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  description: string
  url: string
  logo?: string
}

export async function searchJobs(
  query: string = 'developer',
  location: string = 'us',
  maxResults: number = 6
): Promise<Job[]> {
  const supabase = await createClient()
  
  // Check cache first (cache for 6 hours)
  const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
  const { data: cached } = await supabase
    .from('jobs_cache')
    .select('*')
    .gte('created_at', sixHoursAgo)
    .limit(maxResults)
  
  if (cached && cached.length >= maxResults) {
  if (cached && cached.length >= maxResults) {
    return cached.map(job => ({
      id: job.job_id,
      title: job.title,
      company: job.company || 'Company',
      location: job.location || 'Remote',
      type: job.job_type || 'Full-time',
      salary: job.salary_min && job.salary_max 
        ? `$${Math.floor(job.salary_min/1000)}k - $${Math.floor(job.salary_max/1000)}k`
        : 'Competitive',
      description: job.description || '',
      url: job.url || '#',
      logo: '💼'
    }))
  }
  
  // Fetch from Adzuna API if not cached
  const appId = process.env.ADZUNA_APP_ID
  const appKey = process.env.ADZUNA_APP_KEY
  
  if (!appId || !appKey) {
    console.warn('Adzuna API credentials not configured, using fallback data')
    return getFallbackJobs()
  }
  
  try {
    const url = `https://api.adzuna.com/v1/api/jobs/${location}/search/1?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(query)}&results_per_page=${maxResults}`
    
    const response = await fetch(url)
    
    
    if (!response.ok) throw new Error('Adzuna API failed')
    
    const data = await response.json()
    const jobs: Job[] = data.results.map((job: any) => ({
      id: job.id,
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      type: job.contract_time || 'Full-time',
      salary: job.salary_min && job.salary_max 
        ? `$${Math.floor(job.salary_min/1000)}k - $${Math.floor(job.salary_max/1000)}k`
        : 'Competitive',
      description: job.description.substring(0, 200) + '...',
      url: job.redirect_url,
      logo: '💼'
    }))
    
    // Cache the results
    const cachePromises = jobs.map(job => 
      supabase.from('jobs_cache').upsert({
        job_id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        job_type: job.type,
        salary_min: job.salary.includes('k') ? parseInt(job.salary.split('-')[0].replace(/\D/g, '')) * 1000 : null,
        salary_max: job.salary.includes('k') ? parseInt(job.salary.split('-')[1]?.replace(/\D/g, '') || '0') * 1000 : null,
        description: job.description,
        url: job.url,
        data: data.results.find((j: any) => j.id === job.id),
        data: data.results.find((j: any) => j.id === job.id),
        updated_at: new Date().toISOString()
      })
    )
    
    await Promise.all(cachePromises)
    
    return jobs
  } catch (error) {
    console.error('Jobs API fetch error:', error)
    return getFallbackJobs()
  }
}

// Fallback jobs when API is not available
function getFallbackJobs(): Job[] {
  return [
    {
      id: '1',
      title: 'Full Stack Developer',
      company: 'Tech Co.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $180k',
      description: 'We are looking for an experienced full stack developer to join our growing team.',
      logo: '🚀',
      url: '#'
    },
    {
      id: '2',
      title: 'Creative Director',
      company: 'Design Studio',
      location: 'New York, NY',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$150k - $200k',
      description: 'Lead our creative team and shape the visual direction of innovative projects.',
      logo: '🎨',
      url: '#'
    },
    {
      id: '3',
      title: 'Global Solutions Manager',
      company: 'Innovative Corp',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100k - $140k',
      description: 'Join our global team to solve complex business challenges worldwide.',
      logo: '🌍',
      url: '#'
    }
  ]
}
