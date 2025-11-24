import { NextRequest, NextResponse } from 'next/server'

const jobs = [
  {
    id: 1,
    title: 'Full Stack Developer',
    company: 'Tech Co.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $180k',
    description: 'We are looking for an experienced full stack developer to join our growing team. You will work on cutting-edge projects using modern technologies.',
    logo: '🚀',
    posted: '2 days ago',
    category: 'Engineering',
    remote: false
  },
  {
    id: 2,
    title: 'Creative Director',
    company: 'Design Studio',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$150k - $200k',
    description: 'Lead our creative team and shape the visual direction of innovative projects. Bring your unique vision to life.',
    logo: '🎨',
    posted: '1 week ago',
    category: 'Design',
    remote: false
  },
  {
    id: 3,
    title: 'Global Solutions',
    company: 'Imovate Corp Corp',
    location: 'Remote',
    type: 'Full-time',
    salary: '$100k - $140k',
    description: 'Join our global team to solve complex business challenges worldwide. Work with diverse clients across industries.',
    logo: '🌍',
    posted: '3 days ago',
    category: 'Consulting',
    remote: true
  },
  {
    id: 4,
    title: 'Senior Product Manager',
    company: 'StartupHub',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$130k - $170k',
    description: 'Drive product strategy and execution for our innovative SaaS platform. Work closely with engineering and design teams.',
    logo: '📊',
    posted: '1 day ago',
    category: 'Product',
    remote: true
  },
  {
    id: 5,
    title: 'UX Designer',
    company: 'Creative Labs',
    location: 'Seattle, WA',
    type: 'Contract',
    salary: '$80k - $100k',
    description: 'Create beautiful and intuitive user experiences for our mobile and web applications.',
    logo: '✏️',
    posted: '4 days ago',
    category: 'Design',
    remote: false
  },
  {
    id: 6,
    title: 'Data Scientist',
    company: 'AI Innovations',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$140k - $180k',
    description: 'Apply machine learning and statistical analysis to solve real-world problems. Work with cutting-edge AI technologies.',
    logo: '🤖',
    posted: '5 days ago',
    category: 'Data Science',
    remote: true
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const type = searchParams.get('type')
    const remote = searchParams.get('remote')

    let filteredJobs = jobs

    if (search) {
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category) {
      filteredJobs = filteredJobs.filter(job => job.category === category)
    }

    if (type) {
      filteredJobs = filteredJobs.filter(job => job.type === type)
    }

    if (remote === 'true') {
      filteredJobs = filteredJobs.filter(job => job.remote)
    }

    return NextResponse.json({
      success: true,
      data: filteredJobs,
      total: filteredJobs.length
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch jobs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Here you would typically save the job to a database
    // For now, we'll just return a success response
    const newJob = {
      id: jobs.length + 1,
      ...body,
      posted: 'Just now',
      logo: '🏢'
    }

    return NextResponse.json({
      success: true,
      data: newJob,
      message: 'Job posted successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to post job' },
      { status: 500 }
    )
  }
}