'use client'

import { useState } from 'react'
import { Menu, X, Briefcase, FileText, ExternalLink, Download, DollarSign } from 'lucide-react'
import Link from 'next/link'

export default function Resources() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const jobBoards = [
    { name: 'GIS Field Services', url: '#', description: 'Property inspection opportunities' },
    { name: 'MCS360', url: '#', description: 'Field inspector positions' },
    { name: 'Superior Mortgage Services', url: '#', description: 'Mortgage field services' },
    { name: 'National Field Network', url: '#', description: 'National inspection network' }
  ]

  const supportLinks = [
    { name: 'OSHA 30 Certification Portal', url: '#', icon: FileText },
    { name: 'Florida Inspector Licensing Info', url: '#', icon: FileText },
    { name: 'Resume Template for Inspectors', url: '#', icon: Download },
    { name: 'Relocation Budget Tracker', url: '#', icon: DollarSign }
  ]

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
              <Link href="/career-tracker" className="text-gray-800 hover:text-purple-600 transition-colors font-medium">Career Tracker</Link>
              <Link href="/vision-board" className="text-gray-800 hover:text-purple-600 transition-colors font-medium">Vision Board</Link>
              <Link href="/moon-log" className="text-gray-800 hover:text-purple-600 transition-colors font-medium">Moon Log</Link>
              <Link href="/resources" className="text-purple-600 font-medium">Resources</Link>
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
              <Link href="/career-tracker" className="block px-3 py-2 text-gray-800 hover:text-purple-600 transition-colors font-medium">Career Tracker</Link>
              <Link href="/vision-board" className="block px-3 py-2 text-gray-800 hover:text-purple-600 transition-colors font-medium">Vision Board</Link>
              <Link href="/moon-log" className="block px-3 py-2 text-gray-800 hover:text-purple-600 transition-colors font-medium">Moon Log</Link>
              <Link href="/resources" className="block px-3 py-2 text-purple-600 font-medium">Resources</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            🪜 Resources — Saturn's Toolkit
          </h2>
          <p className="text-lg text-white/90 mb-2 drop-shadow-md max-w-2xl mx-auto">
            These are your earthly tools — to bring your cosmic dreams into form.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 pb-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Tampa Job Boards */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-white/30">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="text-purple-600" size={28} />
              <h3 className="text-2xl font-bold text-gray-900">🔹 Tampa Job Boards</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {jobBoards.map((board, index) => (
                <a
                  key={index}
                  href={board.url}
                  className="flex items-start justify-between p-5 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all group"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                      {board.name}
                    </h4>
                    <p className="text-sm text-gray-600">{board.description}</p>
                  </div>
                  <ExternalLink className="text-purple-600 group-hover:scale-110 transition-transform" size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Support Links */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-white/30">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="text-purple-600" size={28} />
              <h3 className="text-2xl font-bold text-gray-900">🔹 Support Links</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {supportLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <a
                    key={index}
                    href={link.url}
                    className="flex items-center justify-between p-5 bg-white rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="text-purple-600" size={24} />
                      <span className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                        {link.name}
                      </span>
                    </div>
                    <ExternalLink className="text-purple-600 group-hover:scale-110 transition-transform" size={18} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Messages from the Sky */}
          <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-xl shadow-2xl p-8 border border-white/30">
            <h3 className="text-2xl font-bold text-purple-900 mb-6 text-center">🔮 Messages from the Sky</h3>
            <div className="space-y-4">
              <div className="bg-white/60 p-5 rounded-lg">
                <p className="text-gray-800 italic text-center">
                  "Your chart reminds you: purpose is not found — it's revealed through discipline."
                </p>
              </div>
              <div className="bg-white/60 p-5 rounded-lg">
                <p className="text-gray-800 italic text-center">
                  "When you organize your path, you magnetize your destiny."
                </p>
              </div>
              <div className="bg-white/60 p-5 rounded-lg">
                <p className="text-gray-800 italic text-center">
                  "You are in your rebuild era — beautiful things take structure."
                </p>
              </div>
            </div>
          </div>

          {/* North Node Reminder */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-white/30 text-center">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">🌺 Your North Node Reminder</h3>
            <p className="text-lg text-gray-800 italic leading-relaxed">
              "The world needs your integrity and your eye for detail. Don't rush what the stars are still writing for you. Keep showing up — that's your magic."
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}
