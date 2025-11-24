'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Moon, Plus, Calendar, Loader2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { getTodaysMoonPhase, getSimplifiedPhase, type MoonPhaseData } from '@/lib/api/moonPhase'

// Force dynamic rendering to avoid build-time errors
export const dynamic = 'force-dynamic'

interface JournalEntry {
  id: string
  date: string
  bodyFeeling: string
  lunarPhase: 'new' | 'waxing' | 'full' | 'waning'
  action: string
}

export default function MoonLog() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentMoonPhase, setCurrentMoonPhase] = useState<MoonPhaseData | null>(null)
  const [isLoadingMoon, setIsLoadingMoon] = useState(true)
  
  const [newEntry, setNewEntry] = useState({
    bodyFeeling: '',
    lunarPhase: 'new' as 'new' | 'waxing' | 'full' | 'waning',
    action: ''
  })

  const supabase = createClient()

  useEffect(() => {
    loadEntries()
    loadCurrentMoonPhase()
  }, [])

  const loadCurrentMoonPhase = async () => {
    setIsLoadingMoon(true)
    try {
      const moonData = await getTodaysMoonPhase()
      if (moonData) {
        setCurrentMoonPhase(moonData)
        // Auto-fill the lunar phase in the form
        setNewEntry(prev => ({
          ...prev,
          lunarPhase: getSimplifiedPhase(moonData.phase)
        }))
      }
    } catch (error) {
      console.error('Error loading moon phase:', error)
    } finally {
      setIsLoadingMoon(false)
    }
  }

  const loadEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('moon_log_entries')
        .select('*')
        .order('date', { ascending: false })
      
      if (error) throw error
      
      const formattedEntries: JournalEntry[] = (data || []).map((entry: any) => ({
        id: entry.id,
        date: entry.date,
        bodyFeeling: entry.body_feeling,
        lunarPhase: entry.lunar_phase as 'new' | 'waxing' | 'full' | 'waning',
        action: entry.action
      }))
      
      setEntries(formattedEntries)
    } catch (error) {
      console.error('Error loading entries:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addEntry = async () => {
    if (!newEntry.bodyFeeling || !newEntry.action) return
    
    try {
      const today = new Date().toISOString().split('T')[0]
      
      const { data, error } = await supabase
        .from('moon_log_entries')
        .insert({
          date: today,
          body_feeling: newEntry.bodyFeeling,
          lunar_phase: newEntry.lunarPhase,
          action: newEntry.action
        })
        .select()
        .single()
      
      if (error) throw error
      
      const formattedEntry: JournalEntry = {
        id: data.id,
        date: data.date,
        bodyFeeling: data.body_feeling,
        lunarPhase: data.lunar_phase,
        action: data.action
      }
      
      setEntries([formattedEntry, ...entries])
      setNewEntry({ bodyFeeling: '', lunarPhase: newEntry.lunarPhase, action: '' })
    } catch (error) {
      console.error('Error adding entry:', error)
      alert('Failed to add entry. Please try again.')
    }
  }

  const deleteEntry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return
    
    try {
      const { error } = await supabase
        .from('moon_log_entries')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      setEntries(entries.filter(entry => entry.id !== id))
    } catch (error) {
      console.error('Error deleting entry:', error)
      alert('Failed to delete entry. Please try again.')
    }
  }

  const getMoonEmoji = (phase: string) => {
    switch(phase) {
      case 'new': return '🌑'
      case 'waxing': return '🌒'
      case 'full': return '🌕'
      case 'waning': return '🌘'
      default: return '🌙'
    }
  }

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <img 
          src="/fantasy-bg.jpg" 
          alt="Fantasy background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-purple-900/30 to-blue-900/40"></div>
      </div>

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
              <Link href="/moon-log" className="text-purple-600 font-medium">Moon Log</Link>
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
              <Link href="/career-tracker" className="block px-3 py-2 text-gray-800 hover:text-purple-600 transition-colors font-medium">Career Tracker</Link>
              <Link href="/vision-board" className="block px-3 py-2 text-gray-800 hover:text-purple-600 transition-colors font-medium">Vision Board</Link>
              <Link href="/moon-log" className="block px-3 py-2 text-purple-600 font-medium">Moon Log</Link>
              <Link href="/resources" className="block px-3 py-2 text-gray-800 hover:text-purple-600 transition-colors font-medium">Resources</Link>
            </div>
          )}
        </div>
      </nav>

      <section className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              🌙 Moon Log — Track Your Lunar Journey
            </h2>
            <p className="text-lg text-white/90 mb-2 drop-shadow-md">
              Align your energy with the moon phases
            </p>
            {isLoadingMoon ? (
              <div className="flex items-center justify-center gap-2 mt-4">
                <Loader2 className="animate-spin text-white" size={20} />
                <p className="text-white/80">Loading today's moon phase...</p>
              </div>
            ) : currentMoonPhase ? (
              <div className="mt-6 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="text-6xl mb-3">{currentMoonPhase.phaseEmoji}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{currentMoonPhase.phase}</h3>
                <p className="text-white/80 text-lg">{currentMoonPhase.illumination}% Illuminated</p>
              </div>
            ) : null}
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-8 mb-8 border border-white/30">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Plus className="text-purple-600" size={28} />
              New Journal Entry
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">How does your body feel?</label>
                <textarea
                  value={newEntry.bodyFeeling}
                  onChange={(e) => setNewEntry({...newEntry, bodyFeeling: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                  rows={3}
                  placeholder="Describe how you're feeling physically and emotionally..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lunar Phase</label>
                <select
                  value={newEntry.lunarPhase}
                  onChange={(e) => setNewEntry({...newEntry, lunarPhase: e.target.value as any})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="new">🌑 New Moon</option>
                  <option value="waxing">🌒 Waxing Moon</option>
                  <option value="full">🌕 Full Moon</option>
                  <option value="waning">🌘 Waning Moon</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What action did you take today?</label>
                <textarea
                  value={newEntry.action}
                  onChange={(e) => setNewEntry({...newEntry, action: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                  rows={3}
                  placeholder="Describe actions you took toward your goals..."
                />
              </div>
              <button
                onClick={addEntry}
                disabled={!newEntry.bodyFeeling || !newEntry.action}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Add Entry
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-white" size={48} />
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🌙</div>
              <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">No Entries Yet</h3>
              <p className="text-white/80 drop-shadow-md">Start tracking your lunar journey above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <div key={entry.id} className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/30 group relative hover:shadow-2xl transition-all">
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-all"
                    title="Delete entry"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{getMoonEmoji(entry.lunarPhase)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="text-purple-600" size={20} />
                        <span className="text-gray-600 font-medium">{new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Body Feeling:</h4>
                      <p className="text-gray-700 mb-4">{entry.bodyFeeling}</p>
                      <h4 className="font-semibold text-gray-900 mb-2">Action Taken:</h4>
                      <p className="text-gray-700">{entry.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
