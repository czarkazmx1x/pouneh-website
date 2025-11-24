'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Plus, Heart, Home, Sunrise, User, Search, Loader2, Type, Upload, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { searchUnsplashImages, type UnsplashImage } from '@/lib/api/unsplash'
import { createClient } from '@/lib/supabase/client'

interface VisionItem {
  id: string
  title: string
  description: string
  imageUrl?: string
  category: 'home' | 'career' | 'self' | 'lifestyle'
  photographer?: string
  photographerUrl?: string
  isTextOnly?: boolean
}

export default function VisionBoard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [addMode, setAddMode] = useState<'search' | 'text' | 'upload'>('search')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<UnsplashImage[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<'home' | 'career' | 'self' | 'lifestyle'>('lifestyle')
  const [isLoading, setIsLoading] = useState(true)
  
  // Text-only form fields
  const [textTitle, setTextTitle] = useState('')
  const [textDescription, setTextDescription] = useState('')
  
  // Upload form fields
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadTitle, setUploadTitle] = useState('')
  const [uploadDescription, setUploadDescription] = useState('')
  
  const [visionItems, setVisionItems] = useState<VisionItem[]>([])
  const supabase = createClient()

  // Load vision items from Supabase on mount
  useEffect(() => {
    loadVisionItems()
  }, [])

  const loadVisionItems = async () => {
    try {
      const { data, error } = await supabase
        .from('vision_items')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      const items: VisionItem[] = (data || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description || '',
        imageUrl: item.image_url,
        category: item.category as 'home' | 'career' | 'self' | 'lifestyle',
        photographer: item.photographer,
        photographerUrl: item.photographer_url,
        isTextOnly: item.is_text_only
      }))
      
      setVisionItems(items)
    } catch (error) {
      console.error('Error loading vision items:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setIsSearching(true)
    try {
      const results = await searchUnsplashImages(searchQuery, 9)
      setSearchResults(results)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleAddVision = async (image: UnsplashImage) => {
    try {
      const { data, error } = await supabase
        .from('vision_items')
        .insert({
          title: image.description || 'My Vision',
          description: image.description || 'Added to my vision board',
          image_url: image.url,
          category: selectedCategory,
          photographer: image.photographer,
          photographer_url: image.photographerUrl,
          is_text_only: false
        })
        .select()
        .single()
      
      if (error) throw error
      
      const newVision: VisionItem = {
        id: data.id,
        title: data.title,
        description: data.description,
        imageUrl: data.image_url,
        category: data.category,
        photographer: data.photographer,
        photographerUrl: data.photographer_url
      }
      
      setVisionItems([newVision, ...visionItems])
      setShowAddModal(false)
      setSearchResults([])
      setSearchQuery('')
    } catch (error) {
      console.error('Error adding vision:', error)
      alert('Failed to add vision. Please try again.')
    }
  }

  const handleAddTextVision = async () => {
    if (!textTitle.trim()) return
    
    try {
      const { data, error } = await supabase
        .from('vision_items')
        .insert({
          title: textTitle,
          description: textDescription,
          category: selectedCategory,
          is_text_only: true
        })
        .select()
        .single()
      
      if (error) throw error
      
      const newVision: VisionItem = {
        id: data.id,
        title: data.title,
        description: data.description,
        category: data.category,
        isTextOnly: true
      }
      
      setVisionItems([newVision, ...visionItems])
      setShowAddModal(false)
      setTextTitle('')
      setTextDescription('')
    } catch (error) {
      console.error('Error adding text vision:', error)
      alert('Failed to add text vision. Please try again.')
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddUploadedVision = async () => {
    if (!uploadedImage || !uploadTitle.trim()) return
    
    try {
      const { data, error } = await supabase
        .from('vision_items')
        .insert({
          title: uploadTitle,
          description: uploadDescription,
          image_url: uploadedImage,
          category: selectedCategory,
          is_text_only: false
        })
        .select()
        .single()
      
      if (error) throw error
      
      const newVision: VisionItem = {
        id: data.id,
        title: data.title,
        description: data.description,
        imageUrl: data.image_url,
        category: data.category
      }
      
      setVisionItems([newVision, ...visionItems])
      setShowAddModal(false)
      setUploadedImage(null)
      setUploadTitle('')
      setUploadDescription('')
    } catch (error) {
      console.error('Error adding uploaded vision:', error)
      alert('Failed to add uploaded vision. Please try again.')
    }
  }

  const handleQuickSearch = async (query: string) => {
    setSearchQuery(query)
    setShowAddModal(true)
    setAddMode('search')
    setIsSearching(true)
    try {
      const results = await searchUnsplashImages(query, 9)
      setSearchResults(results)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleDeleteVision = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vision?')) return
    
    try {
      const { error } = await supabase
        .from('vision_items')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      setVisionItems(visionItems.filter(item => item.id !== id))
    } catch (error) {
      console.error('Error deleting vision:', error)
      alert('Failed to delete vision. Please try again.')
    }
  }

  const closeModal = () => {
    setShowAddModal(false)
    setSearchResults([])
    setSearchQuery('')
    setTextTitle('')
    setTextDescription('')
    setUploadedImage(null)
    setUploadTitle('')
    setUploadDescription('')
    setAddMode('search')
  }

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <img src="/fantasy-bg.jpg" alt="Fantasy background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-blue-900/30 to-indigo-900/40"></div>
      </div>
      <nav className="relative z-10 bg-white/90 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/"><h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent cursor-pointer">Pouneh's Path To Success</h1></Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-800 hover:text-purple-600 transition-colors font-medium">Home</Link>
              <Link href="/career-tracker" className="text-gray-800 hover:text-purple-600 transition-colors font-medium">Career Tracker</Link>
              <Link href="/vision-board" className="text-purple-600 font-medium">Vision Board</Link>
              <Link href="/moon-log" className="text-gray-800 hover:text-purple-600 transition-colors font-medium">Moon Log</Link>
              <Link href="/resources" className="text-gray-800 hover:text-purple-600 transition-colors font-medium">Resources</Link>
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md">Profile</button>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 hover:text-purple-600">{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2 bg-white/90 backdrop-blur-md rounded-lg mt-2">
              <Link href="/" className="block px-3 py-2 text-gray-800 hover:text-purple-600 transition-colors font-medium">Home</Link>
              <Link href="/career-tracker" className="block px-3 py-2 text-gray-800 hover:text-purple-600 transition-colors font-medium">Career Tracker</Link>
              <Link href="/vision-board" className="block px-3 py-2 text-purple-600 font-medium">Vision Board</Link>
              <Link href="/moon-log" className="block px-3 py-2 text-gray-800 hover:text-purple-600 transition-colors font-medium">Moon Log</Link>
              <Link href="/resources" className="block px-3 py-2 text-gray-800 hover:text-purple-600 transition-colors font-medium">Resources</Link>
            </div>
          )}
        </div>
      </nav>
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">💖 Vision Board — Venus Page</h2>
          <p className="text-lg text-white/90 mb-2 drop-shadow-md max-w-2xl mx-auto">Your dreams are already forming in the unseen. Add images that make you feel safe, inspired, and seen.</p>
          <p className="text-white/80 drop-shadow-md italic mb-8">"When your Venus is honored, everything else aligns."</p>
        </div>
      </section>
      <section className="relative z-10 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-6 mb-8 border border-white/30">
            <button onClick={() => setShowAddModal(true)} className="w-full flex items-center justify-center gap-3 p-6 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all group">
              <Plus className="text-purple-600 group-hover:scale-110 transition-transform" size={32} />
              <span className="text-lg font-medium text-purple-600">Add New Vision</span>
            </button>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-purple-600" size={48} />
            </div>
          ) : visionItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">Your Vision Board is Empty</h3>
              <p className="text-white/80 drop-shadow-md">Click "Add New Vision" to start manifesting your dreams!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visionItems.map((item) => (
                <div key={item.id} className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-white/30 hover:shadow-2xl transition-all group relative">
                  <button
                    onClick={() => handleDeleteVision(item.id)}
                    className="absolute top-3 right-3 z-10 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-all"
                    title="Delete vision"
                  >
                    <Trash2 size={16} />
                  </button>
                  {item.isTextOnly ? (
                  <div className="relative h-48 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center p-6">
                    <div className="text-center">
                      <h3 className="text-white font-bold text-2xl mb-2">{item.title}</h3>
                      {item.description && <p className="text-white/90 text-sm">{item.description}</p>}
                    </div>
                    <div className="absolute top-3 right-3">
                      {item.category === 'home' && <Home size={20} className="text-white/60" />}
                      {item.category === 'career' && <Sunrise size={20} className="text-white/60" />}
                      {item.category === 'self' && <User size={20} className="text-white/60" />}
                      {item.category === 'lifestyle' && <Heart size={20} className="text-white/60" />}
                    </div>
                  </div>
                ) : (
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                      <div className="flex items-center gap-2">
                        {item.category === 'home' && <Home size={16} className="text-white/80" />}
                        {item.category === 'career' && <Sunrise size={16} className="text-white/80" />}
                        {item.category === 'self' && <User size={16} className="text-white/80" />}
                        {item.category === 'lifestyle' && <Heart size={16} className="text-white/80" />}
                        <span className="text-white/80 text-sm capitalize">{item.category}</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="p-4">
                  {!item.isTextOnly && <p className="text-gray-700 text-sm italic">{item.description}</p>}
                  {item.photographer && (<p className="text-xs text-gray-500 mt-2">Photo by <a href={item.photographerUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">{item.photographer}</a></p>)}
                  {item.isTextOnly && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Type size={12} />
                      <span className="capitalize">{item.category}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            </div>
          )}
          <div className="mt-8 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl shadow-lg p-8 border border-white/30">
            <h3 className="text-2xl font-semibold text-purple-900 mb-4 flex items-center gap-2"><Heart className="text-pink-600" size={28} />Quick Add</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white/60 p-4 rounded-lg cursor-pointer hover:bg-white transition-all" onClick={() => handleQuickSearch('dream home interior')}><span className="text-2xl mb-2 block">🏠</span><p className="font-medium">Search Images</p></div>
              <div className="bg-white/60 p-4 rounded-lg cursor-pointer hover:bg-white transition-all" onClick={() => { setShowAddModal(true); setAddMode('upload'); }}><span className="text-2xl mb-2 block">📸</span><p className="font-medium">Upload Photo</p></div>
              <div className="bg-white/60 p-4 rounded-lg cursor-pointer hover:bg-white transition-all" onClick={() => { setShowAddModal(true); setAddMode('text'); }}><span className="text-2xl mb-2 block">✍️</span><p className="font-medium">Add Text</p></div>
              <div className="bg-white/60 p-4 rounded-lg cursor-pointer hover:bg-white transition-all" onClick={() => handleQuickSearch('success inspiration')}><span className="text-2xl mb-2 block">✨</span><p className="font-medium">Get Inspired</p></div>
            </div>
          </div>
        </div>
      </section>
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-2xl font-bold text-gray-900">Add New Vision</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
            </div>
            <div className="p-6">
              <div className="flex gap-2 mb-6">
                <button 
                  onClick={() => setAddMode('search')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${addMode === 'search' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <Search className="inline mr-2" size={18} />
                  Search
                </button>
                <button 
                  onClick={() => setAddMode('upload')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${addMode === 'upload' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <Upload className="inline mr-2" size={18} />
                  Upload
                </button>
                <button 
                  onClick={() => setAddMode('text')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${addMode === 'text' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <Type className="inline mr-2" size={18} />
                  Text
                </button>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="grid grid-cols-4 gap-3">
                  {(['home', 'career', 'self', 'lifestyle'] as const).map((cat) => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)} className={`p-3 rounded-lg border-2 transition-all ${selectedCategory === cat ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}>
                      <div className="text-2xl mb-1">{cat === 'home' && '🏠'}{cat === 'career' && '💼'}{cat === 'self' && '✨'}{cat === 'lifestyle' && '🌸'}</div>
                      <div className="text-sm font-medium capitalize">{cat}</div>
                    </button>
                  ))}
                </div>
              </div>
              {addMode === 'search' ? (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search Images</label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} placeholder="Search for inspiration..." className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" />
                      </div>
                      <button onClick={handleSearch} disabled={isSearching || !searchQuery.trim()} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                        {isSearching ? (<><Loader2 className="animate-spin" size={20} />Searching...</>) : ('Search')}
                      </button>
                    </div>
                  </div>
                  {isSearching ? (
                    <div className="flex justify-center items-center py-12"><Loader2 className="animate-spin text-purple-600" size={40} /></div>
                  ) : searchResults.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                      {searchResults.map((image) => (
                        <div key={image.id} className="relative group cursor-pointer" onClick={() => handleAddVision(image)}>
                          <img src={image.thumbUrl} alt={image.description || 'Vision image'} className="w-full h-40 object-cover rounded-lg" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all rounded-lg flex items-center justify-center">
                            <Plus className="text-white opacity-0 group-hover:opacity-100 transition-all" size={32} />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">by {image.photographer}</p>
                        </div>
                      ))}
                    </div>
                  ) : searchQuery && !isSearching ? (
                    <div className="text-center py-12 text-gray-500">No results found. Try a different search term.</div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">Search for images to add to your vision board</div>
                  )}
                </>
              ) : addMode === 'upload' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image *</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        {uploadedImage ? (
                          <div className="relative w-full h-full">
                            <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-contain rounded-lg" />
                            <button
                              onClick={(e) => { e.preventDefault(); setUploadedImage(null); }}
                              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-12 h-12 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        )}
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vision Title *</label>
                    <input 
                      type="text" 
                      value={uploadTitle} 
                      onChange={(e) => setUploadTitle(e.target.value)}
                      placeholder="Give your vision a title..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                    <textarea 
                      value={uploadDescription} 
                      onChange={(e) => setUploadDescription(e.target.value)}
                      placeholder="Add any details about this vision..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                      rows={3}
                      maxLength={200}
                    />
                  </div>
                  <button 
                    onClick={handleAddUploadedVision}
                    disabled={!uploadedImage || !uploadTitle.trim()}
                    className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Add Uploaded Vision
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vision Title *</label>
                    <input 
                      type="text" 
                      value={textTitle} 
                      onChange={(e) => setTextTitle(e.target.value)}
                      placeholder="e.g., Dream Salary: $150k, My Own Home, CEO of My Company"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                    <textarea 
                      value={textDescription} 
                      onChange={(e) => setTextDescription(e.target.value)}
                      placeholder="Add any details about this vision..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                      rows={3}
                      maxLength={200}
                    />
                  </div>
                  <button 
                    onClick={handleAddTextVision}
                    disabled={!textTitle.trim()}
                    className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Add Text Vision
                  </button>
                  <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-900 font-medium mb-2">💡 Text Vision Ideas:</p>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Financial goals: "Earning $200k/year"</li>
                      <li>• Career milestones: "VP of Marketing by 2026"</li>
                      <li>• Life achievements: "Own a beachfront condo"</li>
                      <li>• Personal affirmations: "I am worthy of success"</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
