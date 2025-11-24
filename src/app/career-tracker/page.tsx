'use client'

import { useState } from 'react'
import { Menu, X, Briefcase, Send, BookOpen, Users as UsersIcon, Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Application {
  id: number
  role: string
  company: string
  status: 'applied' | 'follow-up' | 'interview' | 'offer'
  date: string
}

interface Certification {
  id: number
  name: string
  progress: number
  targetDate: string
}

export default function CareerTracker() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [applications, setApplications] = useState<Application[]>([
    { id: 1, role: 'Property Inspector', company: 'GIS Field Services', status: 'applied', date: '2025-10-10' },
    { id: 2, role: 'Field Inspector', company: 'MCS360', status: 'follow-up', date: '2025-10-08' },
  ])
  
  const [certifications, setCertifications] = useState<Certification[]>([
    { id: 1, name: 'OSHA 30 Certification', progress: 60, targetDate: '2025-11-15' },
    { id: 2, name: 'Florida Inspector License', progress: 30, targetDate: '2025-12-01' },
  ])

  const [newApp, setNewApp] = useState({ role: '', company: '' })
  const [newCert, setNewCert] = useState({ name: '', targetDate: '' })

  const addApplication = () => {
    if (newApp.role && newApp.company) {
      setApplications([...applications, {
        id: Date.now(),
        role: newApp.role,
        company: newApp.company,
        status: 'applied',
        date: new Date().toISOString().split('T')[0]
      }])
      setNewApp({ role: '', company: '' })
    }
  }

  const addCertification = () => {
    if (newCert.name && newCert.targetDate) {
      setCertifications([...certifications, {
        id: Date.now(),
        name: newCert.name,
        progress: 0,
        targetDate: newCert.targetDate
      }])
      setNewCert({ name: '', targetDate: '' })
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* Fantasy Background */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/fantasy-bg.jpg" 
          alt="Fantasy background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-blue-900/30 to-indigo-900/40"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-white/90 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent cursor-pointer">
                  Pouneh's Path To Success
                </h1>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-800 hover:text-purple-600 transition-colors font-medium">Home</Link>
              <Link href="/career-tracker" className="text-purple-600 font-medium">Career Tracker</Link>
              <Link href="/vision-board" className="text-gray-800 hover:text-purple-600 transition-colors font-medium">Vision Board</Link>
              <Link href="/moon-log" className="text-gray-800 hover:text-purple-600 transition-colors font-medium">Moon Log</Link>
              <Link href="/resources" className="text-gray-800 hover:text-purple-600 transition-colors font-medium">Resources</Link>
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md">
                Profile
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 hover:text-purple-600">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2 bg-white/90 backdrop-blur-md rounded-lg mt-2">
              <Link href="/" className="block px-3 py-2 text-gray-800 hover:text-purple-600 transition-colors font-medium">Home</Link>
              <Link href="/career-tracker" className="block px-3 py-2 text-purple-600 font-medium">Career Tracker</Link>
              <Link href="/vision-board" className="block px-3 py-2 text-gray-800 hover:text-purple-600 transition-colors font-medium">Vision Board</Link>
              <Link href="/moon-log" className="block px-3 py-2 text-gray-800 hover:text-purple-600 transition-colors font-medium">Moon Log</Link>
              <Link href="/resources" className="block px-3 py-2 text-gray-800 hover:text-purple-600 transition-colors font-medium">Resources</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            🌞 Career Tracker — Your 10th House Goals
          </h2>
          <p className="text-lg text-white/90 mb-2 drop-shadow-md italic">
            "Saturn teaches: progress is a devotion, not a race."
          </p>
          <p className="text-white/80 drop-shadow-md max-w-2xl mx-auto mb-8">
            Use this page to keep track of your applications, certifications, and connections. Each step you record is a spell of manifestation.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 pb-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Dream Roles & Applications */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-white/30">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="text-purple-600" size={28} />
              <h3 className="text-2xl font-bold text-gray-900">🌱 Dream Role & Applications</h3>
            </div>
            
            {/* Add New Application */}
            <div className="mb-6 p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Add New Application</h4>
              <div className="grid md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Role Title"
                  value={newApp.role}
                  onChange={(e) => setNewApp({...newApp, role: e.target.value})}
                  className="px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={newApp.company}
                  onChange={(e) => setNewApp({...newApp, company: e.target.value})}
                  className="px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button
                  onClick={addApplication}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  <Plus size={20} /> Add
                </button>
              </div>
            </div>

            {/* Applications List */}
            <div className="space-y-3">
              {applications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-purple-100 hover:border-purple-300 transition-all">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{app.role}</h4>
                    <p className="text-sm text-purple-600">{app.company}</p>
                    <p className="text-xs text-gray-500 mt-1">Applied: {app.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      app.status === 'applied' ? 'bg-blue-100 text-blue-800' :
                      app.status === 'follow-up' ? 'bg-yellow-100 text-yellow-800' :
                      app.status === 'interview' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Courses */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-white/30">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="text-purple-600" size={28} />
              <h3 className="text-2xl font-bold text-gray-900">🌙 Courses & Certifications</h3>
            </div>
            
            {/* Add New Certification */}
            <div className="mb-6 p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Add New Certification</h4>
              <div className="grid md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Certification Name"
                  value={newCert.name}
                  onChange={(e) => setNewCert({...newCert, name: e.target.value})}
                  className="px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  type="date"
                  value={newCert.targetDate}
                  onChange={(e) => setNewCert({...newCert, targetDate: e.target.value})}
                  className="px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button
                  onClick={addCertification}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  <Plus size={20} /> Add
                </button>
              </div>
            </div>

            {/* Certifications List */}
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-4 bg-white rounded-lg border border-purple-100">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                      <p className="text-sm text-gray-600">Target: {cert.targetDate}</p>
                    </div>
                    <span className="text-sm font-medium text-purple-600">{cert.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${cert.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Journal Prompt */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl shadow-lg p-8 border border-white/30">
            <h3 className="text-xl font-semibold text-purple-900 mb-3">💫 Journal Prompt</h3>
            <p className="text-gray-800 italic">
              "Which of these roles feels like a reflection of my purpose, not just my paycheck?"
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}
