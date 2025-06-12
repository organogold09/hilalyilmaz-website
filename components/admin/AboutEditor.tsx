'use client'

import React, { useState, useEffect } from 'react'
import { 
  Save, 
  Eye, 
  User, 
  Heart,
  BookOpen,
  Award,
  Coffee,
  Quote,
  Image as ImageIcon,
  Plus,
  Trash2,
  Upload,
  Camera
} from 'lucide-react'

interface AboutContent {
  title: string
  subtitle: string
  biography: string
  personalQuote: string
  profileImage: string
  achievements: string[]
  hobbies: string[]
  writingJourney: string
  inspiration: string
  favoritebooks: string[]
}

const AboutEditor = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent>({
    title: 'Hakkımda',
    subtitle: 'Hayatım, Yazarlık Serüvenim ve Ben',
    biography: 'Merhaba! Ben Hilal Yılmaz. Genç yaşımdan itibaren kelimelerin büyülü dünyasında kaybolmayı seven, hikayeler anlatmaya tutkuyla bağlı bir yazarım. Edebiyat fakültesi mezunu olarak, Türk edebiyatına kendi tarzımla katkıda bulunmaya çalışıyorum.',
    personalQuote: 'Kelimeler, ruhun en derin köşelerindeki sesleri duyurmanın en güzel yoludur.',
    profileImage: '/img/profile-about.jpg',
    achievements: [
      '2023 Genç Yazar Ödülü',
      'İlk romanım 10.000+ satış',
      '5+ dergi ve blog yazısı'
    ],
    hobbies: [
      'Kitap okumak',
      'Kahve içmek',
      'Doğa yürüyüşleri',
      'Fotoğrafçılık'
    ],
    writingJourney: 'Yazarlık serüvenim lise yıllarında küçük hikayeler yazarak başladı. Üniversitede edebiyat eğitimi alırken, kendi sesimi bulmaya odaklandım. İlk kitabımı yazmaya başladığımda, sadece bir hobi olarak gördüğüm yazarlığın aslında hayatımın en büyük tutkusu olduğunu anladım.',
    inspiration: 'İlhamımı günlük hayattan, insanların hikayelerinden ve doğanın güzelliklerinden alıyorum. Her insan farklı bir hikaye taşır ve ben bu hikayeleri keşfetmeyi, anlamlandırmayı ve okuyucularımla paylaşmayı seviyorum.',
    favoritebooks: [
      'Simyacı - Paulo Coelho',
      'Suç ve Ceza - Dostoyevski',
      'Aşk-ı Memnu - Halit Ziya Uşaklıgil'
    ]
  })

  const [previewMode, setPreviewMode] = useState(false)

  // Load about content from API on component mount
  useEffect(() => {
    const loadAboutContent = async () => {
      try {
        const response = await fetch('/api/about')
        if (response.ok) {
          const data = await response.json()
          setAboutContent(data)
          console.log('Hakkımda içeriği API\'den yüklendi:', data)
        } else {
          console.log('API\'den veri yüklenemedi, varsayılan içerik kullanılıyor')
          // Varsayılan içeriği localStorage'a kaydet (geçici)
          localStorage.setItem('aboutContent', JSON.stringify(aboutContent))
        }
      } catch (error) {
        console.error('Hakkımda içeriği yüklenirken hata:', error)
        // Hata durumunda localStorage'dan yükle
        try {
          const savedContent = localStorage.getItem('aboutContent')
          if (savedContent) {
            const parsedContent = JSON.parse(savedContent)
            setAboutContent(parsedContent)
            console.log('Hakkımda içeriği localStorage\'dan yüklendi')
          }
        } catch (localError) {
          console.error('localStorage\'dan yükleme hatası:', localError)
        }
      }
    }

    loadAboutContent()
  }, [])

  const handleInputChange = (field: keyof AboutContent, value: string | string[]) => {
    setAboutContent(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addListItem = (field: 'achievements' | 'hobbies' | 'favoritebooks') => {
    setAboutContent(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const updateListItem = (field: 'achievements' | 'hobbies' | 'favoritebooks', index: number, value: string) => {
    setAboutContent(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const removeListItem = (field: 'achievements' | 'hobbies' | 'favoritebooks', index: number) => {
    setAboutContent(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const saveChanges = async () => {
    try {
      // Admin session token'ını al
      const adminSession = localStorage.getItem('adminSession')
      if (!adminSession) {
        alert('Admin oturumu bulunamadı. Lütfen tekrar giriş yapın.')
        return
      }

      const response = await fetch('/api/about', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-session': 'true' // Basit session kontrolü
        },
        body: JSON.stringify(aboutContent)
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Hakkımda içeriği veritabanına kaydedildi:', result)
        
        // Başarılı kayıt sonrası localStorage'ı da güncelle (yedek olarak)
        localStorage.setItem('aboutContent', JSON.stringify(aboutContent))
        
        alert('✅ Hakkımda sayfası başarıyla veritabanına kaydedildi!')
      } else {
        const error = await response.json()
        console.error('API kayıt hatası:', error)
        
        // API hatası durumunda localStorage'a kaydet
        localStorage.setItem('aboutContent', JSON.stringify(aboutContent))
        alert('⚠️ Veritabanına kayıt yapılamadı, geçici olarak localStorage\'a kaydedildi. Lütfen veritabanı bağlantınızı kontrol edin.')
      }
    } catch (error) {
      console.error('Hakkımda içeriği kaydedilirken hata:', error)
      
      // Hata durumunda localStorage'a kaydet
      localStorage.setItem('aboutContent', JSON.stringify(aboutContent))
      alert('⚠️ Bağlantı hatası! Geçici olarak localStorage\'a kaydedildi.')
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setAboutContent(prev => ({
          ...prev,
          profileImage: result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hakkımda Sayfası</h1>
          <p className="text-gray-600">Kişisel bilgilerinizi ve yazarlık serüveninizi düzenleyin</p>
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
          <button
            onClick={saveChanges}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
          >
            <Save size={16} />
            Kaydet
          </button>
        </div>
      </div>

      {!previewMode ? (
        /* Edit Mode */
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User size={20} />
              Temel Bilgiler
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sayfa Başlığı
                  </label>
                  <input
                    type="text"
                    value={aboutContent.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alt Başlık
                  </label>
                  <input
                    type="text"
                    value={aboutContent.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Camera size={16} className="inline mr-2" />
                  Profil Fotoğrafı
                </label>
                <div className="space-y-3">
                  {/* Image Preview */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                      {aboutContent.profileImage ? (
                        <img 
                          src={aboutContent.profileImage} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={24} className="text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="profile-upload"
                      />
                      <label
                        htmlFor="profile-upload"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer inline-flex items-center gap-2"
                      >
                        <Upload size={16} />
                        Resim Yükle
                      </label>
                    </div>
                  </div>
                  {/* URL Input */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Veya resim URL'si girin:
                    </label>
                    <input
                      type="text"
                      value={aboutContent.profileImage}
                      onChange={(e) => handleInputChange('profileImage', e.target.value)}
                      placeholder="https://example.com/profile.jpg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Biyografi
                </label>
                <textarea
                  value={aboutContent.biography}
                  onChange={(e) => handleInputChange('biography', e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Quote size={16} className="inline mr-2" />
                  Kişisel Söz / Motto
                </label>
                <input
                  type="text"
                  value={aboutContent.personalQuote}
                  onChange={(e) => handleInputChange('personalQuote', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Writing Journey */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen size={20} />
              Yazarlık Serüveni
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yazarlık Hikayeniz
                </label>
                <textarea
                  value={aboutContent.writingJourney}
                  onChange={(e) => handleInputChange('writingJourney', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İlham Kaynağınız
                </label>
                <textarea
                  value={aboutContent.inspiration}
                  onChange={(e) => handleInputChange('inspiration', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Award size={20} />
                Başarılar ve Ödüller
              </h2>
              <button
                onClick={() => addListItem('achievements')}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1"
              >
                <Plus size={14} />
                Ekle
              </button>
            </div>
            
            <div className="space-y-2">
              {aboutContent.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => updateListItem('achievements', index, e.target.value)}
                    placeholder="Başarı/ödül açıklaması"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => removeListItem('achievements', index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Hobbies */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Coffee size={20} />
                Hobiler ve İlgi Alanları
              </h2>
              <button
                onClick={() => addListItem('hobbies')}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1"
              >
                <Plus size={14} />
                Ekle
              </button>
            </div>
            
            <div className="space-y-2">
              {aboutContent.hobbies.map((hobby, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={hobby}
                    onChange={(e) => updateListItem('hobbies', index, e.target.value)}
                    placeholder="Hobi/ilgi alanı"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => removeListItem('hobbies', index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Favorite Books */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Heart size={20} />
                Favori Kitaplar
              </h2>
              <button
                onClick={() => addListItem('favoritebooks')}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1"
              >
                <Plus size={14} />
                Ekle
              </button>
            </div>
            
            <div className="space-y-2">
              {aboutContent.favoritebooks.map((book, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={book}
                    onChange={(e) => updateListItem('favoritebooks', index, e.target.value)}
                    placeholder="Kitap adı - Yazar"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => removeListItem('favoritebooks', index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Preview Mode */
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center overflow-hidden">
                {aboutContent.profileImage ? (
                  <img src={aboutContent.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-gray-400" />
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{aboutContent.title}</h1>
              <p className="text-xl text-gray-600">{aboutContent.subtitle}</p>
            </div>

            {/* Quote */}
            {aboutContent.personalQuote && (
              <div className="bg-primary-50 p-6 rounded-lg mb-8 text-center">
                <Quote size={24} className="mx-auto text-primary-600 mb-2" />
                <p className="text-lg italic text-gray-700">"{aboutContent.personalQuote}"</p>
              </div>
            )}

            {/* Biography */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Biyografi</h2>
              <p className="text-gray-700 leading-relaxed">{aboutContent.biography}</p>
            </div>

            {/* Writing Journey */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen size={24} />
                Yazarlık Serüvenim
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">{aboutContent.writingJourney}</p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">İlham Kaynağım</h3>
              <p className="text-gray-700 leading-relaxed">{aboutContent.inspiration}</p>
            </div>

            {/* Achievements */}
            {aboutContent.achievements.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award size={24} />
                  Başarılar ve Ödüller
                </h2>
                <ul className="space-y-2">
                  {aboutContent.achievements.filter(a => a.trim()).map((achievement, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              {/* Hobbies */}
              {aboutContent.hobbies.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Coffee size={24} />
                    Hobilerim
                  </h2>
                  <ul className="space-y-2">
                    {aboutContent.hobbies.filter(h => h.trim()).map((hobby, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        {hobby}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Favorite Books */}
              {aboutContent.favoritebooks.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Heart size={24} />
                    Favori Kitaplarım
                  </h2>
                  <ul className="space-y-2">
                    {aboutContent.favoritebooks.filter(b => b.trim()).map((book, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                        {book}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AboutEditor 