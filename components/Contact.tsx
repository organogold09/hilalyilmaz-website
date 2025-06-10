'use client'

import React, { useState, useEffect } from 'react'
import { Mail, MapPin, Phone, Send, Twitter, Instagram, Linkedin, Facebook, Youtube } from 'lucide-react'

interface SocialMedia {
  facebook: string
  twitter: string
  instagram: string
  linkedin: string
  youtube: string
}

interface SiteSettings {
  siteName: string
  email: string
  phone: string
  address: string
  socialMedia: SocialMedia
}

const Contact = () => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  useEffect(() => {
    // Load settings from localStorage
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem('siteSettings')
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings)
          setSiteSettings(parsedSettings)
        }
      } catch (error) {
        console.error('Site ayarları yüklenirken hata:', error)
      }
    }

    loadSettings()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log('Form submitted:', formData)
    alert('Mesajınız gönderildi! En kısa sürede size dönüş yapacağım.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "E-posta",
      content: siteSettings?.email || "iletisim@hilalyilmazhy.com",
      link: `mailto:${siteSettings?.email || "iletisim@hilalyilmazhy.com"}`
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Konum",
      content: siteSettings?.address || "İstanbul, Türkiye",
      link: null
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Telefon",
      content: siteSettings?.phone || "+90 XXX XXX XX XX",
      link: siteSettings?.phone ? `tel:${siteSettings.phone}` : "tel:+90XXXXXXXXX"
    }
  ]

  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      url: siteSettings?.socialMedia?.facebook || "#",
      color: "hover:bg-blue-600"
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      url: siteSettings?.socialMedia?.twitter || "#",
      color: "hover:bg-blue-500"
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      url: siteSettings?.socialMedia?.instagram || "#",
      color: "hover:bg-pink-500"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: siteSettings?.socialMedia?.linkedin || "#",
      color: "hover:bg-blue-600"
    },
    {
      name: "YouTube",
      icon: <Youtube className="w-5 h-5" />,
      url: siteSettings?.socialMedia?.youtube || "#",
      color: "hover:bg-red-600"
    }
  ]

  return (
    <section id="contact" className="section-padding bg-secondary-50">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary-900 mb-6">
              İletişime Geçin
            </h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Sorularınız, projeleriniz veya sadece merhaba demek için benimle iletişime geçebilirsiniz. 
              Her mesajınızı okuyorum ve mümkün olan en kısa sürede yanıtlıyorum.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-2xl font-serif font-bold text-secondary-900 mb-6">
                  Birlikte Çalışalım
                </h3>
                <p className="text-secondary-700 leading-relaxed mb-8">
                  Yeni projeler, işbirlikleri ve okuyucu görüşleri için her zaman açığım. 
                  Yazma dünyası hakkında konuşmayı, deneyimlerimi paylaşmayı ve yeni hikayeler 
                  keşfetmeyi seviyorum.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="card p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary-100 text-primary-600 rounded-lg flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary-900 mb-1">
                          {info.title}
                        </h4>
                        {info.link ? (
                          <a 
                            href={info.link}
                            className="text-secondary-600 hover:text-primary-600 transition-colors duration-200"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <span className="text-secondary-600">{info.content}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-semibold text-secondary-900 mb-4">
                  Sosyal Medyada Takip Edin
                </h4>
                <div className="flex gap-3 flex-wrap">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-white text-secondary-600 rounded-lg transition-all duration-200 hover:text-white transform hover:-translate-y-1 shadow-md hover:shadow-lg ${social.color}`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="bg-primary-50 p-6 rounded-xl border-l-4 border-primary-600">
                <blockquote className="text-secondary-800 italic">
                  "Her mesaj yeni bir hikaye, her soru yeni bir keşif. 
                  Benimle paylaştığınız her şey yazma yolculuğuma ilham veriyor."
                </blockquote>
                <cite className="text-primary-600 font-medium block mt-3">- Hilal Yılmaz</cite>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="card p-8">
                <h3 className="text-2xl font-serif font-bold text-secondary-900 mb-6">
                  Mesaj Gönderin
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                        Ad Soyad *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                        placeholder="Adınız ve soyadınız"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                        E-posta *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 mb-2">
                      Konu *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      placeholder="Mesajınızın konusu"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                      Mesaj *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                      placeholder="Mesajınızı buraya yazın..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-5 h-5" />
                    Mesajı Gönder
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact 