'use client'

import React, { useState, useEffect } from 'react'
import { Quote, Heart, Pen, BookOpen, User } from 'lucide-react'

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

const About = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null)

  useEffect(() => {
    // Load about content from localStorage
    const loadAboutContent = () => {
      try {
        const savedContent = localStorage.getItem('aboutContent')
        if (savedContent) {
          const parsedContent = JSON.parse(savedContent)
          setAboutContent(parsedContent)
          console.log('Hakkımda içeriği yüklendi:', parsedContent)
        }
      } catch (error) {
        console.error('Hakkımda içeriği yüklenirken hata:', error)
      }
    }

    loadAboutContent()
  }, [])

  // If content is not loaded yet, show loading or default content
  if (!aboutContent) {
    return (
      <section id="about" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const achievements = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Yayınlanmış Kitap",
      count: "1",
      description: "İlk kitabım büyük beğeni topladı"
    },
    {
      icon: <Pen className="w-8 h-8" />,
      title: "Yazma Deneyimi",
      count: "5+",
      description: "Yıllardır kelimelerle dans ediyorum"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Okuyucu Kalbine Dokundu",
      count: "1000+",
      description: "Hikayelerimle ruhları buluşturuyorum"
    }
  ]

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary-900 mb-6">
              {aboutContent.title || 'Hikayemin Arkasında'}
            </h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              {aboutContent.subtitle || 'Her yazarın kendine özgü bir hikayesi vardır. Benimkisi, kelimelerle başlayan ve ruhlarla devam eden bir yolculuk.'}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              {/* Quote */}
              <div className="relative">
                <Quote className="absolute -top-4 -left-4 w-12 h-12 text-primary-200" />
                <blockquote className="text-xl md:text-2xl font-serif italic text-secondary-800 leading-relaxed pl-8">
                  "{aboutContent.personalQuote || 'Yazmak benim için nefes almak gibi. Kelimeler, düşüncelerimle dünya arasındaki en güzel köprü.'}"
                </blockquote>
              </div>

              {/* Bio Text */}
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  {aboutContent.biography || 'Merhaba, ben Hilal Yılmaz. Küçük yaşlardan beri kelimelerin büyüsüne kapılmış, hikayeler anlatmanın gücüne inanan bir yazarım.'}
                </p>
                
                <p className="text-lg leading-relaxed">
                  {aboutContent.writingJourney || 'Yazarlık serüvenim küçük hikayelerle başladı ve zamanla hayatımın en büyük tutkusu haline geldi.'}
                </p>

                <p className="text-lg leading-relaxed">
                  {aboutContent.inspiration || 'İlhamımı günlük hayattan, insanların hikayelerinden ve doğanın güzelliklerinden alıyorum.'}
                </p>
              </div>

              {/* Personal Touch */}
              <div className="bg-primary-50 p-6 rounded-xl border-l-4 border-primary-600">
                <h3 className="font-serif text-xl font-semibold text-secondary-900 mb-3">
                  Yazma Felsefemin Temeli
                </h3>
                <p className="text-secondary-700">
                  Her hikayenin bir ruhu vardır ve bu ruhu okuyucuya en saf haliyle ulaştırmak 
                  benim görevim. Kelimeler sadece harfler değil, duygularımızın en samimi ifadesidir.
                </p>
              </div>

              {/* Hobbies & Interests */}
              {aboutContent.hobbies && aboutContent.hobbies.length > 0 && (
                <div className="bg-secondary-50 p-6 rounded-xl">
                  <h3 className="font-serif text-xl font-semibold text-secondary-900 mb-4">
                    İlgi Alanlarım
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {aboutContent.hobbies.filter(hobby => hobby.trim()).map((hobby, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Stats & Visual */}
            <div className="space-y-8">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-80 h-96 mx-auto bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
                  {aboutContent.profileImage ? (
                    <img 
                      src={aboutContent.profileImage} 
                      alt="Hilal Yılmaz" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-5xl font-serif text-primary-600">HY</span>
                      </div>
                      <p className="text-primary-700 font-medium">Profil fotoğrafı yakında eklenecek</p>
                    </div>
                  )}
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-300 rounded-full opacity-60"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-secondary-200 rounded-full opacity-40"></div>
              </div>

              {/* Achievement Cards */}
              <div className="grid grid-cols-1 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="card p-6 text-center transform hover:scale-105 transition-transform duration-200">
                    <div className="flex items-center justify-center text-primary-600 mb-3">
                      {achievement.icon}
                    </div>
                    <div className="text-3xl font-bold text-secondary-900 mb-2">
                      {achievement.count}
                    </div>
                    <h3 className="font-semibold text-secondary-900 mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-secondary-600">
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Achievements List */}
              {aboutContent.achievements && aboutContent.achievements.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="font-serif text-xl font-semibold text-secondary-900 mb-4">
                    Başarılarım
                  </h3>
                  <ul className="space-y-2">
                    {aboutContent.achievements.filter(achievement => achievement.trim()).map((achievement, index) => (
                      <li key={index} className="flex items-center gap-2 text-secondary-700">
                        <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Favorite Books */}
              {aboutContent.favoritebooks && aboutContent.favoritebooks.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="font-serif text-xl font-semibold text-secondary-900 mb-4">
                    Favori Kitaplarım
                  </h3>
                  <ul className="space-y-2">
                    {aboutContent.favoritebooks.filter(book => book.trim()).map((book, index) => (
                      <li key={index} className="flex items-center gap-2 text-secondary-700">
                        <BookOpen className="w-4 h-4 text-primary-600" />
                        {book}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 