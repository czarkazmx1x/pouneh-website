'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, BookOpen, Mail, Heart, Sparkles, Rabbit, Flower } from 'lucide-react'
import '@/styles/magical.css'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null

  // Generate floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDelay: Math.random() * 15,
    animationDuration: 15 + Math.random() * 10
  }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50 overflow-hidden relative">
      {/* Floating magical particles */}
      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`
            }}
          />
        ))}
      </div>
      {/* Magical Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Flower className="h-8 w-8 text-purple-600" />
              <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Pouneh Wildflower
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-purple-600 transition-colors">Home</a>
              <a href="#books" className="text-gray-700 hover:text-purple-600 transition-colors">Books</a>
              <a href="#about" className="text-gray-700 hover:text-purple-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-purple-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Background with parallax effect */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-pink-900/20 z-10" />
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <Rabbit className="h-12 w-12 text-white/80" />
        </div>
        <div className="absolute top-40 right-20 animate-pulse">
          <Sparkles className="h-8 w-8 text-yellow-300/80" />
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce" style={{ animationDelay: '1s' }}>
          <Flower className="h-10 w-10 text-pink-300/80" />
        </div>

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <Badge className="mb-6 bg-purple-100 text-purple-800 hover:bg-purple-200">
            ✨ Award-Winning Children's Author
          </Badge>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="block text-white drop-shadow-lg mb-2">Pouneh</span>
            <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
              Wildflower
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow">
            Where wonder blooms and imagination takes flight through magical tales that transport children to enchanted worlds beyond their wildest dreams
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-200 magical-button">
              <BookOpen className="mr-2 h-5 w-5" />
              Explore Books
            </Button>
            <Button size="lg" variant="outline" className="bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30 px-8 py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-200 magical-button">
              <Mail className="mr-2 h-5 w-5" />
              Get in Touch
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section id="books" className="py-20 px-4 bg-gradient-to-b from-transparent to-purple-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800">📚 Magical Stories</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Enchanted Tales
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Step into magical worlds where anything is possible and every page holds a new adventure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Book 1 */}
            <Card className="group overflow-hidden bg-white/80 backdrop-blur-sm border-purple-100 magical-card">
              <div className="relative overflow-hidden h-80">
                <img 
                  src="/book1-cover.jpg" 
                  alt="The Rabbit's Garden" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Badge className="absolute top-4 right-4 bg-yellow-400 text-yellow-900">
                  Bestseller
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-purple-800">The Rabbit's Garden</h3>
                <p className="text-gray-600 mb-4">
                  Follow little Lily as she discovers a secret garden where rabbits talk and flowers sing...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Book 2 */}
            <Card className="group overflow-hidden bg-white/80 backdrop-blur-sm border-purple-100 magical-card">
              <div className="relative overflow-hidden h-80">
                <img 
                  src="/book2-cover.jpg" 
                  alt="The Floating Forest" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Badge className="absolute top-4 right-4 bg-purple-400 text-white">
                  New Release
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-purple-800">The Floating Forest</h3>
                <p className="text-gray-600 mb-4">
                  Journey to a magical forest that floats among the clouds, where animals have wings...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Coming Soon Card */}
            <Card className="group overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 h-full flex flex-col justify-center items-center text-center">
                <Sparkles className="h-16 w-16 text-purple-400 mb-4 animate-pulse" />
                <h3 className="text-2xl font-bold mb-2 text-purple-800">More Magic Coming</h3>
                <p className="text-gray-600 mb-4">
                  New enchanted tales are blooming in the garden of imagination...
                </p>
                <Badge className="bg-purple-200 text-purple-800">Coming Soon</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-b from-purple-50/50 to-pink-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl transform rotate-3 opacity-20"></div>
              <img 
                src="/author-portrait.jpg" 
                alt="Pouneh Wildflower" 
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4">
                <div className="flex items-center space-x-3">
                  <Heart className="h-8 w-8 text-red-500 fill-red-500" />
                  <div>
                    <p className="font-bold text-lg">15+ Books</p>
                    <p className="text-sm text-gray-600">Published</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Badge className="mb-4 bg-purple-100 text-purple-800">🌸 About the Author</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Weaving Magic with Words
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Pouneh Wildflower is an award-winning children's author who has captivated young readers worldwide with her enchanting tales and whimsical storytelling. With a background in early childhood education and a heart full of wonder, she creates stories that spark imagination and nurture young minds.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Her books have been translated into over 20 languages and have won numerous literary awards, including the prestigious Children's Book of the Year award. Pouneh believes that every child deserves to experience the magic of storytelling and the joy of getting lost in a good book.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">2M+</p>
                  <p className="text-sm text-gray-600">Books Sold</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-pink-600">50+</p>
                  <p className="text-sm text-gray-600">Awards</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">30+</p>
                  <p className="text-sm text-gray-600">Countries</p>
                </div>
              </div>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Read Full Story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-b from-pink-50/50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-purple-100 text-purple-800">📧 Get in Touch</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Let's Create Magic Together
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're interested in school visits, book signings, or just want to share the wonder of reading, Pouneh would love to hear from you!
          </p>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="text-left mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
                placeholder="Your magical message..."
              />
            </div>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8">
              <Mail className="mr-2 h-5 w-5" />
              Send Message
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-800 to-pink-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Flower className="h-8 w-8" />
                <span className="font-bold text-xl">Pouneh Wildflower</span>
              </div>
              <p className="text-purple-200">
                Creating magical worlds for young readers, one story at a time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-purple-200">
                <li><a href="#books" className="hover:text-white transition-colors">Books</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Books</h4>
              <ul className="space-y-2 text-purple-200">
                <li><a href="#" className="hover:text-white transition-colors">The Rabbit's Garden</a></li>
                <li><a href="#" className="hover:text-white transition-colors">The Floating Forest</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Upcoming Releases</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-purple-200">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-700 mt-8 pt-8 text-center text-purple-200">
            <p>&copy; 2024 Pouneh Wildflower. All rights reserved. Made with 💜 and magic.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}