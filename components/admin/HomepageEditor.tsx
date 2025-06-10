'use client'

import React, { useState } from 'react'
import { 
  Save, 
  Eye, 
  RotateCcw, 
  Upload,
  Image,
  Type,
  Quote,
  Star,
  Heart,
  BookOpen,
  Edit3,
  Plus,
  Trash2
} from 'lucide-react'

interface HeroContent {
  title: string
  subtitle: string
  description: string
  ctaText: string
  ctaLink: string
  backgroundImage: string
  profileImage: string
}

interface BookContent {
  title: string
  description: string
  price: string
  amazonLink: string
  coverImage: string
  featured: boolean
}

const HomepageEditor = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: 'Hilal Yılmaz',
    subtitle: 'Genç Türk Yazarı',
    description: 'Kelimelerle düşünceleri, hikayelerle hayatları değiştiren genç bir kalem. Edebiyatın büyülü dünyasında okuyucularla buluşan hikayeler.',
    ctaText: 'Kitaplarımı Keşfet',
    ctaLink: '/kitaplar',
    backgroundImage: '/images/hero-bg.jpg',
    profileImage: '/images/profile.jpg'
  })

  const [books, setBooks] = useState<BookContent[]>([
    {
      title: 'İlk Kitabım',
      description: 'Gençlik, aşk ve hayata dair samimi bir hikaye...',
      price: '25₺',
      amazonLink: '#',
      coverImage: '/images/book-cover.jpg',
      featured: true
    }
  ])

  const [previewMode, setPreviewMode] = useState(false)
  const [activeSection, setActiveSection] = useState<'hero' | 'books' | 'about'>('hero')

  const handleHeroChange = (field: keyof HeroContent, value: string) => {
    setHeroContent(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleBookChange = (index: number, field: keyof BookContent, value: string | boolean) => {
    setBooks(prev => prev.map((book, i) => 
      i === index ? { ...book, [field]: value } : book
    ))
  }

  const addBook = () => {
    setBooks(prev => [...prev, {
      title: 'Yeni Kitap',
      description: 'Kitap açıklaması...',
      price: '0₺',
      amazonLink: '#',
      coverImage: '/images/placeholder.jpg',
      featured: false
    }])
  }

  const removeBook = (index: number) => {
    setBooks(prev => prev.filter((_, i) => i !== index))
  }

  const saveChanges = () => {
    const data = {
      hero: heroContent,
      books: books
    }
    console.log('Ana sayfa içeriği kaydediliyor:', data)
    alert('Değişiklikler başarıyla kaydedildi!')
  }

  const resetToDefault = () => {
    // Varsayılan değerlere dön
    setHeroContent({
      title: 'Hilal Yılmaz',
      subtitle: 'Genç Türk Yazarı',
      description: 'Kelimelerle düşünceleri, hikayelerle hayatları değiştiren genç bir kalem.',
      ctaText: 'Kitaplarımı Keşfet',
      ctaLink: '/kitaplar',
      backgroundImage: '/images/hero-bg.jpg',
      profileImage: '/images/profile.jpg'
    })
  }

  const sections = [
    { id: 'hero', name: 'Hero Bölümü', icon: Star },
    { id: 'books', name: 'Kitaplar', icon: BookOpen },
    { id: 'about', name: 'Hakkımda', icon: Heart }
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ana Sayfa Düzenle</h1>
          <p className="text-gray-600">Website ana sayfasının içeriklerini düzenleyin</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 ${
              previewMode 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Eye size={16} />
            {previewMode ? 'Düzenleme Modu' : 'Önizleme'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Bölümler</h3>
            <div className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id as any)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={16} />
                    {section.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="space-y-3">
              <button
                onClick={saveChanges}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Save size={16} />
                Kaydet
              </button>
              <button
                onClick={resetToDefault}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} />
                Sıfırla
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {!previewMode ? (
            /* Edit Mode */
            <div className="space-y-6">
              {/* Hero Section */}
              {activeSection === 'hero' && (
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <Star size={20} />
                    Hero Bölümü
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Title & Subtitle */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ana Başlık
                        </label>
                        <input
                          type="text"
                          value={heroContent.title}
                          onChange={(e) => handleHeroChange('title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Alt Başlık
                        </label>
                        <input
                          type="text"
                          value={heroContent.subtitle}
                          onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Açıklama
                      </label>
                      <textarea
                        value={heroContent.description}
                        onChange={(e) => handleHeroChange('description', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    {/* CTA Button */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Buton Metni
                        </label>
                        <input
                          type="text"
                          value={heroContent.ctaText}
                          onChange={(e) => handleHeroChange('ctaText', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Buton Linki
                        </label>
                        <input
                          type="text"
                          value={heroContent.ctaLink}
                          onChange={(e) => handleHeroChange('ctaLink', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Images */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Profil Fotoğrafı URL
                        </label>
                        <input
                          type="text"
                          value={heroContent.profileImage}
                          onChange={(e) => handleHeroChange('profileImage', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Arkaplan Resmi URL
                        </label>
                        <input
                          type="text"
                          value={heroContent.backgroundImage}
                          onChange={(e) => handleHeroChange('backgroundImage', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Books Section */}
              {activeSection === 'books' && (
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <BookOpen size={20} />
                      Kitaplar Bölümü
                    </h2>
                    <button
                      onClick={addBook}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Kitap Ekle
                    </button>
                  </div>

                  <div className="space-y-6">
                    {books.map((book, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-medium text-gray-900">Kitap #{index + 1}</h3>
                          <button
                            onClick={() => removeBook(index)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Kitap Adı
                            </label>
                            <input
                              type="text"
                              value={book.title}
                              onChange={(e) => handleBookChange(index, 'title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Fiyat
                            </label>
                            <input
                              type="text"
                              value={book.price}
                              onChange={(e) => handleBookChange(index, 'price', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Açıklama
                            </label>
                            <textarea
                              value={book.description}
                              onChange={(e) => handleBookChange(index, 'description', e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Kapak Resmi URL
                            </label>
                            <input
                              type="text"
                              value={book.coverImage}
                              onChange={(e) => handleBookChange(index, 'coverImage', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Amazon Link
                            </label>
                            <input
                              type="text"
                              value={book.amazonLink}
                              onChange={(e) => handleBookChange(index, 'amazonLink', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={book.featured}
                              onChange={(e) => handleBookChange(index, 'featured', e.target.checked)}
                              className="mr-2"
                            />
                            <span className="text-sm font-medium text-gray-700">Öne Çıkarılsın</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* About Section */}
              {activeSection === 'about' && (
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <Heart size={20} />
                    Hakkımda Bölümü
                  </h2>
                  <p className="text-gray-600">Bu bölüm yakında eklenecek...</p>
                </div>
              )}
            </div>
          ) : (
            /* Preview Mode */
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Önizleme</h2>
              
              {/* Hero Preview */}
              <div className="mb-8 p-6 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
                    <Image size={48} className="text-white/80" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">{heroContent.title}</h1>
                  <p className="text-xl mb-4 text-white/90">{heroContent.subtitle}</p>
                  <p className="mb-6 text-white/80 max-w-2xl mx-auto">{heroContent.description}</p>
                  <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                    {heroContent.ctaText}
                  </button>
                </div>
              </div>

              {/* Books Preview */}
              {books.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Kitaplarım</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {books.map((book, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                          <BookOpen size={48} className="text-gray-400" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">{book.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{book.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-primary-600">{book.price}</span>
                          {book.featured && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                              Öne Çıkarılan
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomepageEditor 