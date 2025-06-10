'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Heart, ArrowUp, Twitter, Instagram, Linkedin, Mail, Facebook, Youtube } from 'lucide-react'

interface SocialMedia {
  facebook: string
  twitter: string
  instagram: string
  linkedin: string
  youtube: string
}

interface SiteSettings {
  siteName: string
  siteDescription: string
  email: string
  phone: string
  address: string
  socialMedia: SocialMedia
}

const Footer = () => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Load settings from localStorage
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem('siteSettings')
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings)
          setSiteSettings(parsedSettings)
          console.log('Site ayarları yüklendi:', parsedSettings)
        }
      } catch (error) {
        console.error('Site ayarları yüklenirken hata:', error)
      }
    }

    loadSettings()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  // Dinamik linkler - sayfa bazında
  const getQuickLinks = () => {
    if (pathname === '/blog') {
      return [
        { name: 'Ana Sayfa', href: '/', type: 'link' },
        { name: 'Hakkımda', href: '/#about', type: 'link' },
        { name: 'Kitaplarım', href: '/#books', type: 'link' },
        { name: 'İletişim', href: '/#contact', type: 'link' }
      ]
    } else {
      return [
        { name: 'Ana Sayfa', href: '#home', type: 'scroll' },
        { name: 'Hakkımda', href: '#about', type: 'scroll' },
        { name: 'Kitaplarım', href: '#books', type: 'scroll' },
        { name: 'Blog', href: '/blog', type: 'link' },
        { name: 'İletişim', href: '#contact', type: 'scroll' }
      ]
    }
  }

  const quickLinks = getQuickLinks()

  const socialLinks = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      url: siteSettings?.socialMedia?.facebook || '#',
      color: 'hover:text-blue-500'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      url: siteSettings?.socialMedia?.twitter || '#',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      url: siteSettings?.socialMedia?.instagram || '#',
      color: 'hover:text-pink-400'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      url: siteSettings?.socialMedia?.linkedin || '#',
      color: 'hover:text-blue-600'
    },
    {
      name: 'YouTube',
      icon: <Youtube className="w-5 h-5" />,
      url: siteSettings?.socialMedia?.youtube || '#',
      color: 'hover:text-red-500'
    },
    {
      name: 'E-posta',
      icon: <Mail className="w-5 h-5" />,
      url: `mailto:${siteSettings?.email || 'iletisim@hilalyilmazhy.com'}`,
      color: 'hover:text-primary-400'
    }
  ]

  const handleLinkClick = (link: any) => {
    if (link.type === 'link') {
      window.location.href = link.href
    } else {
      const element = document.querySelector(link.href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="bg-secondary-900 text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              {siteSettings?.siteName || 'Hilal Yılmaz'}
            </h3>
            <p className="text-secondary-300 leading-relaxed mb-6 max-w-md">
              {siteSettings?.siteDescription || 'Kelimelerle ruhları buluşturan, her hikayede yeni bir dünya yaratan yazar. Edebiyat tutkumun ve yazma serüvenimin her anını sizlerle paylaşıyorum.'}
            </p>
            <div className="flex items-center gap-2 text-secondary-400">
              <span>Sevgiyle yazıldı</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>Paris'ten</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Hızlı Linkler</h4>
            <nav className="space-y-3">
              {quickLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleLinkClick(link)}
                  className="block text-secondary-300 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Bağlantıda Kalın</h4>
            <div className="space-y-4">
              <div>
                <p className="text-secondary-300 text-sm mb-3">
                  Sosyal medyada takip edin:
                </p>
                <div className="flex gap-3 flex-wrap">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 bg-secondary-800 rounded-lg transition-all duration-200 hover:bg-secondary-700 transform hover:-translate-y-1 ${social.color}`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-secondary-300 text-sm mb-2">
                  Güncellemeler için:
                </p>
                <p className="text-white font-medium">
                  {siteSettings?.email || 'iletisim@hilalyilmazhy.com'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-secondary-800 border-t border-secondary-700">
        <div className="container-custom py-8">
          <div className="text-center">
            <h4 className="text-xl font-serif font-semibold mb-3">
              Hikayelerimi Kaçırmayın
            </h4>
            <p className="text-secondary-300 mb-6 max-w-2xl mx-auto">
              Yeni kitap duyurularım, blog yazılarım ve özel içeriklerim için e-posta listemize katılın.
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 bg-secondary-800 border border-secondary-700 rounded-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="btn-primary">
                Abone Ol
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-secondary-400 text-sm">
              <p className="flex items-center gap-2">
                <span>Sevgiyle yazıldı</span>
                <Heart className="w-4 h-4 text-red-400 animate-pulse" fill="currentColor" />
                <span>Paris'ten</span>
                <span className="mx-2">•</span>
                <span>© {currentYear} {siteSettings?.siteName || 'Hilal Yılmaz'}.</span>
                <a href="#" className="hover:text-white transition-colors duration-200 ml-2">
                  Gizlilik Politikası
                </a>
                <span className="mx-1">|</span>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Kullanım Şartları
                </a>
              </p>
            </div>
            
            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-secondary-400 hover:text-white transition-all duration-200 group"
              aria-label="Başa dön"
            >
              <span className="text-sm">Başa Dön</span>
              <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 