'use client'

import React, { useState, useEffect } from 'react'
import { 
  Save, 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Shield,
  Zap,
  Bell,
  Eye,
  Settings,
  Linkedin,
  Image,
  Upload
} from 'lucide-react'

interface SiteSettings {
  siteName: string
  siteDescription: string
  siteUrl: string
  email: string
  phone: string
  address: string
  metaKeywords: string
  favicon: string
  socialMedia: {
    facebook: string
    twitter: string
    instagram: string
    linkedin: string
    youtube: string
  }
  seo: {
    enableSitemap: boolean
    enableRobots: boolean
    googleAnalytics: string
    googleSearchConsole: string
  }
  performance: {
    enableCaching: boolean
    enableCompression: boolean
    enableLazyLoading: boolean
  }
  notifications: {
    emailNotifications: boolean
    pushNotifications: boolean
    adminAlerts: boolean
  }
}

const SettingsManager = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'Hilal Yılmaz - Yazar',
    siteDescription: 'Genç Türk yazarı Hilal Yılmaz\'ın resmi websitesi. Kitaplar, blog yazıları ve daha fazlası.',
    siteUrl: 'https://hilalyilmazhy.com',
    email: 'hilal@hilalyilmazhy.com',
    phone: '+90 555 123 45 67',
    address: 'İstanbul, Türkiye',
    metaKeywords: 'hilal yılmaz, türk yazarı, kitap, roman, edebiyat, genç yazar',
    favicon: '',
    socialMedia: {
      facebook: 'https://facebook.com/hilalyilmazhy',
      twitter: 'https://twitter.com/hilalyilmazhy',
      instagram: 'https://instagram.com/hilalyilmazhy',
      linkedin: 'https://linkedin.com/in/hilalyilmazhy',
      youtube: 'https://youtube.com/@hilalyilmazhy'
    },
    seo: {
      enableSitemap: true,
      enableRobots: true,
      googleAnalytics: 'G-XXXXXXXXXX',
      googleSearchConsole: ''
    },
    performance: {
      enableCaching: true,
      enableCompression: true,
      enableLazyLoading: true
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      adminAlerts: true
    }
  })

  const [activeTab, setActiveTab] = useState<'general' | 'social' | 'seo' | 'performance' | 'notifications'>('general')
  const [faviconPreview, setFaviconPreview] = useState<string>('')

  // Load settings from localStorage on component mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem('siteSettings')
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings)
          setSettings(parsedSettings)
          if (parsedSettings.favicon) {
            setFaviconPreview(parsedSettings.favicon)
          }
        }
      } catch (error) {
        console.error('Site ayarları yüklenirken hata:', error)
      }
    }

    loadSettings()
  }, [])

  const handleInputChange = (section: string, field: string, value: string | boolean) => {
    if (section === 'root') {
      setSettings(prev => ({
        ...prev,
        [field]: value
      }))
    } else {
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof SiteSettings] as object),
          [field]: value
        }
      }))
    }
  }

  const handleFaviconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Lütfen geçerli bir resim dosyası seçin.')
        return
      }

      // Check file size (max 1MB)
      if (file.size > 1024 * 1024) {
        alert('Favicon dosyası 1MB\'dan küçük olmalıdır.')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setFaviconPreview(result)
        setSettings(prev => ({
          ...prev,
          favicon: result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const saveSettings = () => {
    try {
      // Save to localStorage
      localStorage.setItem('siteSettings', JSON.stringify(settings))
      
      // Update favicon in document head
      if (settings.favicon) {
        let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement
        if (!link) {
          link = document.createElement('link')
          link.rel = 'icon'
          document.head.appendChild(link)
        }
        link.href = settings.favicon
      }
      
      console.log('Site ayarları kaydediliyor:', settings)
      alert('Site ayarları başarıyla kaydedildi! Favicon güncellendi.')
    } catch (error) {
      console.error('Site ayarları kaydedilirken hata:', error)
      alert('Site ayarları kaydedilirken bir hata oluştu.')
    }
  }

  const tabs = [
    { id: 'general', name: 'Genel Ayarlar', icon: Globe },
    { id: 'social', name: 'Sosyal Medya', icon: Facebook },
    { id: 'seo', name: 'SEO Ayarları', icon: Eye },
    { id: 'performance', name: 'Performans', icon: Zap },
    { id: 'notifications', name: 'Bildirimler', icon: Bell }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Site Ayarları</h1>
          <p className="text-gray-600">Website'nizin genel ayarlarını ve konfigürasyonlarını yönetin</p>
        </div>
        <button
          onClick={saveSettings}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
        >
          <Save size={16} />
          Değişiklikleri Kaydet
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Ayar Kategorileri</h3>
            <div className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-sm">{tab.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Globe size={20} />
                  Genel Ayarlar
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Adı
                    </label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => handleInputChange('root', 'siteName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site URL
                    </label>
                    <input
                      type="url"
                      value={settings.siteUrl}
                      onChange={(e) => handleInputChange('root', 'siteUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Açıklaması
                  </label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) => handleInputChange('root', 'siteDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail size={16} className="inline mr-2" />
                      E-posta
                    </label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleInputChange('root', 'email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone size={16} className="inline mr-2" />
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={settings.phone}
                      onChange={(e) => handleInputChange('root', 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin size={16} className="inline mr-2" />
                    Adres
                  </label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => handleInputChange('root', 'address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Anahtar Kelimeler
                  </label>
                  <input
                    type="text"
                    value={settings.metaKeywords}
                    onChange={(e) => handleInputChange('root', 'metaKeywords', e.target.value)}
                    placeholder="anahtar, kelime, virgül, ile, ayrılmış"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Favicon (Tarayıcı Sekmesi Logosu)
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {faviconPreview ? (
                        <img 
                          src={faviconPreview} 
                          alt="Favicon Preview" 
                          className="w-12 h-12 rounded border-2 border-gray-200 object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <Image size={20} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFaviconUpload}
                        className="hidden"
                        id="favicon-upload"
                      />
                      <label
                        htmlFor="favicon-upload"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
                      >
                        <Upload size={16} />
                        Favicon Yükle
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG veya ICO formatında, maksimum 1MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Social Media */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Facebook size={20} />
                  Sosyal Medya Hesapları
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Facebook size={16} className="inline mr-2 text-blue-600" />
                      Facebook
                    </label>
                    <input
                      type="url"
                      value={settings.socialMedia.facebook}
                      onChange={(e) => handleInputChange('socialMedia', 'facebook', e.target.value)}
                      placeholder="https://facebook.com/kullaniciadi"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Twitter size={16} className="inline mr-2 text-sky-500" />
                      Twitter / X
                    </label>
                    <input
                      type="url"
                      value={settings.socialMedia.twitter}
                      onChange={(e) => handleInputChange('socialMedia', 'twitter', e.target.value)}
                      placeholder="https://twitter.com/kullaniciadi"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Instagram size={16} className="inline mr-2 text-pink-600" />
                      Instagram
                    </label>
                    <input
                      type="url"
                      value={settings.socialMedia.instagram}
                      onChange={(e) => handleInputChange('socialMedia', 'instagram', e.target.value)}
                      placeholder="https://instagram.com/kullaniciadi"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Linkedin size={16} className="inline mr-2 text-blue-700" />
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={settings.socialMedia.linkedin}
                      onChange={(e) => handleInputChange('socialMedia', 'linkedin', e.target.value)}
                      placeholder="https://linkedin.com/in/kullaniciadi"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Youtube size={16} className="inline mr-2 text-red-600" />
                      YouTube
                    </label>
                    <input
                      type="url"
                      value={settings.socialMedia.youtube}
                      onChange={(e) => handleInputChange('socialMedia', 'youtube', e.target.value)}
                      placeholder="https://youtube.com/@kanaladi"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SEO Settings */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Eye size={20} />
                  SEO Ayarları
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Google Analytics ID
                      </label>
                      <input
                        type="text"
                        value={settings.seo.googleAnalytics}
                        onChange={(e) => handleInputChange('seo', 'googleAnalytics', e.target.value)}
                        placeholder="G-XXXXXXXXXX"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Google Search Console
                      </label>
                      <input
                        type="text"
                        value={settings.seo.googleSearchConsole}
                        onChange={(e) => handleInputChange('seo', 'googleSearchConsole', e.target.value)}
                        placeholder="Doğrulama kodu"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.seo.enableSitemap}
                        onChange={(e) => handleInputChange('seo', 'enableSitemap', e.target.checked)}
                        className="mr-3"
                      />
                      <span className="text-sm font-medium text-gray-700">Sitemap oluştur</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.seo.enableRobots}
                        onChange={(e) => handleInputChange('seo', 'enableRobots', e.target.checked)}
                        className="mr-3"
                      />
                      <span className="text-sm font-medium text-gray-700">Robots.txt oluştur</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Performance */}
            {activeTab === 'performance' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Zap size={20} />
                  Performans Ayarları
                </h2>

                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.performance.enableCaching}
                        onChange={(e) => handleInputChange('performance', 'enableCaching', e.target.checked)}
                        className="mr-3"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Önbellekleme (Caching) aktif</span>
                        <p className="text-xs text-gray-500">Site hızını artırır</p>
                      </div>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.performance.enableCompression}
                        onChange={(e) => handleInputChange('performance', 'enableCompression', e.target.checked)}
                        className="mr-3"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Sıkıştırma (Gzip) aktif</span>
                        <p className="text-xs text-gray-500">Dosya boyutlarını küçültür</p>
                      </div>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.performance.enableLazyLoading}
                        onChange={(e) => handleInputChange('performance', 'enableLazyLoading', e.target.checked)}
                        className="mr-3"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Lazy Loading aktif</span>
                        <p className="text-xs text-gray-500">Resimler gerektiğinde yüklenir</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Bell size={20} />
                  Bildirim Ayarları
                </h2>

                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.notifications.emailNotifications}
                        onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
                        className="mr-3"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">E-posta bildirimleri</span>
                        <p className="text-xs text-gray-500">Yeni mesaj ve yorumlar için e-posta al</p>
                      </div>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.notifications.pushNotifications}
                        onChange={(e) => handleInputChange('notifications', 'pushNotifications', e.target.checked)}
                        className="mr-3"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Push bildirimleri</span>
                        <p className="text-xs text-gray-500">Tarayıcı bildirimleri</p>
                      </div>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.notifications.adminAlerts}
                        onChange={(e) => handleInputChange('notifications', 'adminAlerts', e.target.checked)}
                        className="mr-3"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Admin uyarıları</span>
                        <p className="text-xs text-gray-500">Sistem uyarıları ve güvenlik bildirimleri</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsManager 