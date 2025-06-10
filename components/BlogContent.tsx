'use client'

import React, { useState } from 'react'
import { Calendar, Clock, ArrowRight, Eye, Search, Tag } from 'lucide-react'

const BlogContent = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [searchTerm, setSearchTerm] = useState("")

  const blogPosts = [
    {
      id: 1,
      title: "Yazmanın Ritüelleri: Günlük Yazma Pratiğim",
      excerpt: "Her sabah kalktığımda ilk yaptığım şey, kahvemi alıp yazmaya başlamak. Bu yazıda yazma ritüellerimi ve günlük rutinlerimi paylaşıyorum.",
      category: "Yazma Süreci",
      date: "15 Kasım 2023",
      readTime: "5 dk",
      views: 324,
      image: "/placeholder-blog-1.jpg",
      featured: true
    },
    {
      id: 2,
      title: "Karakter Yaratmanın Sırları",
      excerpt: "Gerçek karakterler nasıl yaratılır? Bu yazıda karakter geliştirme sürecimi ve karakterlerime ruh katma yöntemlerimi anlatıyorum.",
      category: "Yazma Teknikleri",
      date: "8 Kasım 2023",
      readTime: "7 dk",
      views: 256,
      image: "/placeholder-blog-2.jpg",
      featured: false
    },
    {
      id: 3,
      title: "İlk Kitabımı Yazma Serüvenim",
      excerpt: "İlk kitabımı yazma sürecinde yaşadığım zorluklar, öğrendiklerim ve bu yolculukta beni motive eden unsurları paylaşıyorum.",
      category: "Kişisel",
      date: "1 Kasım 2023",
      readTime: "6 dk",
      views: 412,
      image: "/placeholder-blog-3.jpg",
      featured: false
    },
    {
      id: 4,
      title: "Okuyucu Mektupları ve Beni Etkileyen Geri Dönüşler",
      excerpt: "Okuyucularımdan gelen mektuplar beni nasıl etkiliyor ve yazma motivasyonuma nasıl katkıda bulunuyor?",
      category: "Okuyucu İlişkileri",
      date: "25 Ekim 2023",
      readTime: "4 dk",
      views: 189,
      image: "/placeholder-blog-4.jpg",
      featured: false
    },
    {
      id: 5,
      title: "Edebiyatın Dijital Dönüşümü",
      excerpt: "Sosyal medya çağında edebiyat nasıl değişiyor? Dijital platformların yazarlık üzerindeki etkilerini inceliyorum.",
      category: "Edebiyat",
      date: "18 Ekim 2023",
      readTime: "8 dk",
      views: 298,
      image: "/placeholder-blog-5.jpg",
      featured: false
    },
    {
      id: 6,
      title: "Yazmak İçin İlham Bulma Yolları",
      excerpt: "Yaratıcı krizle nasıl başa çıkılır? İlham bulmak için kullandığım teknikleri ve önerilerimi paylaşıyorum.",
      category: "Yazma Süreci",
      date: "10 Ekim 2023",
      readTime: "5 dk",
      views: 367,
      image: "/placeholder-blog-6.jpg",
      featured: false
    }
  ]

  const categories = ["Tümü", "Yazma Süreci", "Yazma Teknikleri", "Kişisel", "Okuyucu İlişkileri", "Edebiyat"]

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "Tümü" || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-secondary-900 mb-6">
              Blog & Yazılarım
            </h1>
            <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Yazma sürecim, düşüncelerim ve edebiyat dünyasından güncel konular hakkında yazdığım yazılar. 
              Her hafta yeni içeriklerle sizlerle buluşuyorum.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Blog yazılarında ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Category Stats */}
              <div className="flex items-center gap-4 text-sm text-secondary-600">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span>{blogPosts.length} yazı</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{blogPosts.reduce((total, post) => total + post.views, 0)} okunma</span>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-secondary-100 text-secondary-700 hover:bg-primary-100 hover:text-primary-500'
                  }`}
                >
                  {category}
                  {category !== "Tümü" && (
                    <span className="ml-2 text-xs opacity-75">
                      ({blogPosts.filter(post => post.category === category).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          {filteredPosts.filter(post => post.featured).map((post) => (
            <div key={post.id} className="mb-16">
              <div className="card overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative">
                    <div className="w-full h-64 lg:h-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
                      <span className="text-primary-600 font-medium">Öne Çıkan Yazı Görseli</span>
                    </div>
                    <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Öne Çıkan
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center gap-4 text-sm text-secondary-500 mb-4">
                      <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-serif font-bold text-secondary-900 mb-4 line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-secondary-700 leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <button className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200">
                        Devamını Oku
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-1 text-secondary-500 text-sm">
                        <Eye className="w-4 h-4" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Results Info */}
          {searchTerm && (
            <div className="mb-8 p-4 bg-primary-50 rounded-lg border border-primary-200">
              <p className="text-primary-700">
                <strong>"{searchTerm}"</strong> için {filteredPosts.length} sonuç bulundu
              </p>
            </div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(post => !post.featured).map((post) => (
              <article key={post.id} className="card group cursor-pointer">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <div className="w-full h-48 bg-gradient-to-br from-secondary-100 to-secondary-200 flex items-center justify-center">
                    <span className="text-secondary-500 font-medium">Blog Görseli</span>
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-secondary-700">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-secondary-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{post.views}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-serif font-semibold text-secondary-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
                    {post.title}
                  </h3>

                  <p className="text-secondary-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <button className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200 group-hover:gap-3">
                    Devamını Oku
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl text-secondary-300 mb-4">📝</div>
              <h3 className="text-xl font-serif font-semibold text-secondary-900 mb-2">
                Sonuç bulunamadı
              </h3>
              <p className="text-secondary-600 mb-6">
                Arama kriterlerinize uygun blog yazısı bulunamadı.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("Tümü")
                }}
                className="btn-primary"
              >
                Filtreleri Temizle
              </button>
            </div>
          )}

          {/* Load More Button */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <button className="btn-secondary">
                Daha Fazla Yazı Yükle
              </button>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-16 bg-gradient-to-r from-primary-50 to-secondary-50 p-8 lg:p-12 rounded-2xl text-center">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-secondary-900 mb-4">
              Yeni Yazılarımdan Haberdar Olun
            </h3>
            <p className="text-secondary-600 mb-8 max-w-2xl mx-auto">
              Blog yazılarımı, yeni proje duyurularımı ve yazma sürecimle ilgili güncellemeleri e-posta ile alın.
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="btn-primary">
                Abone Ol
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogContent 