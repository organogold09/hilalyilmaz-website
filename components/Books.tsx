'use client'

import React, { useState, useEffect } from 'react'
import { Star, ExternalLink, Calendar, Users, ArrowRight, Eye, ChevronLeft, ChevronRight, X } from 'lucide-react'
import Link from 'next/link'

interface BookData {
  title: string
  subtitle: string
  description: string
  publishDate: string
  pages: string
  genre: string
  isbn: string
  publisher: string
  excerpt: string
  themes: string[]
  amazonLink?: string
  coverImage?: string
}

interface AdminBook {
  id: string
  title: string
  description: string
  publishDate: string
  pageCount?: number
  genre: string
  isbn: string
  tags?: string[]
  amazonLink?: string
  coverImage?: string
  featured?: boolean
}

interface BooksProps {
  navigateWithTransition: (url: string) => void
}

const Books = ({ navigateWithTransition }: BooksProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [bookData, setBookData] = useState<BookData | null>(null)
  const totalPages = 17

  // Admin panelinden kitap verilerini yükle
  useEffect(() => {
    const loadBookData = () => {
      try {
        const savedBooks = localStorage.getItem('books')
        
        if (savedBooks) {
          const books: AdminBook[] = JSON.parse(savedBooks)
          
          // İlk kitabı veya öne çıkarılan kitabı al
          const featuredBook = books.find((book: AdminBook) => book.featured) || books[0]
          
          if (featuredBook) {
            const processedBookData = {
              title: featuredBook.title,
              subtitle: featuredBook.description,
              description: featuredBook.description,
              publishDate: new Date(featuredBook.publishDate).getFullYear().toString(),
              pages: featuredBook.pageCount?.toString() || "169",
              genre: featuredBook.genre,
              isbn: featuredBook.isbn,
              publisher: "Yayınevi Adı",
              excerpt: featuredBook.description.substring(0, 150) + "...",
              themes: featuredBook.tags || ["Aşk", "Kayıp", "Yeniden Doğuş"],
              amazonLink: featuredBook.amazonLink,
              coverImage: featuredBook.coverImage
            }
            setBookData(processedBookData)
          }
        }
      } catch (error) {
        console.error('Kitap verileri yüklenirken hata:', error)
      }
    }

    loadBookData()
    
    // Admin panelinden değişiklikleri dinle
    const handleStorageChange = () => {
      loadBookData()
    }
    
    // Interval ile de kontrol et (aynı sekme içinde değişiklikler için)
    const intervalId = setInterval(loadBookData, 2000)
    
    window.addEventListener('storage', handleStorageChange)
    
    // Focus event - sayfa odağa geldiğinde kontrol et
    const handleFocus = () => {
      loadBookData()
    }
    
    window.addEventListener('focus', handleFocus)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', handleFocus)
      clearInterval(intervalId)
    }
  }, [])

  // Kullanılacak kitap verisi
  const book = bookData || {
    title: "İlk Kitabım",
    subtitle: "Ruhun Derinliklerinde Bir Yolculuk", 
    description: "Bu kitap, insan ruhunun en derin köşelerini keşfeden, aşk, kayıp ve yeniden doğuş temalarını işleyen güçlü bir eser. Her sayfa, okuyucuyu kendi iç dünyasıyla yüzleştiren samimi bir anlatıma sahip.",
    publishDate: "2023",
    pages: "169",
    genre: "Roman",
    isbn: "978-XXX-XXX-XXX-X",
    publisher: "Yayınevi Adı",
    excerpt: "Bazen hayat bizi öyle anlar yaşatır ki, sanki zamanın kendisi durur ve biz o anda sonsuzluğa dokunuruz. İşte bu kitap, tam da o anları yakalamaya çalışan bir hikaye...",
    themes: ["Aşk", "Kayıp", "Yeniden Doğuş", "İç Yolculuk", "İnsan İlişkileri"],
    amazonLink: "https://www.amazon.fr/S%C3%A9pia-Hilal-YILMAZ/dp/B0DQY9G8YR",
    coverImage: null
  }

  // Eğer admin panelinden veri yoksa hiçbir şey gösterme
  if (!bookData) {
    return (
      <section id="books" className="section-padding bg-secondary-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary-900 mb-6">
                Kitaplarım
              </h2>
              <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                Kelimelerle örülü dünyalarıma hoş geldiniz. Her kitap, farklı bir ruh halinin kapısı.
              </p>
            </div>
            
            <div className="text-center py-16">
              <p className="text-lg text-secondary-600">
                Henüz bir kitap eklenmemiş. Admin panelinden kitap bilgilerinizi ekleyebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const handleBlogClick = () => {
    console.log('Blog butonuna tıklandı, sayfa geçişi başlatılıyor...')
    navigateWithTransition('/blog')
  }

  const handleBuyClick = () => {
    const amazonLink = bookData.amazonLink || "https://www.amazon.fr/S%C3%A9pia-Hilal-YILMAZ/dp/B0DQY9G8YR"
    window.open(amazonLink, '_blank')
  }

  const handlePreviewClick = () => {
    setIsPreviewOpen(true)
    setCurrentPage(1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const getPageImagePath = (pageNumber: number) => {
    return `/book/Sayfa${pageNumber}.png`
  }

  const purchaseLinks = [
    { name: "Kitapyurdu", url: "#", color: "bg-blue-600" },
    { name: "D&R", url: "#", color: "bg-red-600" },
    { name: "Hepsiburada", url: "#", color: "bg-orange-600" },
    { name: "Amazon", url: "#", color: "bg-yellow-600" }
  ]

  return (
    <section id="books" className="section-padding bg-secondary-50">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary-900 mb-6">
              Kitaplarım
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Kelimelerle örülü dünyalarıma hoş geldiniz. Her kitap, farklı bir ruh halinin kapısı.
            </p>
          </div>

          {/* Main Book Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
            {/* Book Cover & Visual */}
            <div className="relative">
              <div className="relative group flex justify-center">
                {/* Book Cover - Show actual cover image if available */}
                {bookData.coverImage ? (
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-700 group-hover:scale-105">
                    <img 
                      src={`/img/${bookData.coverImage}`} 
                      alt={bookData.title}
                      className="w-80 h-auto object-cover rounded-2xl"
                      style={{ aspectRatio: '3/4' }}
                      onError={(e) => {
                        console.error('Resim yüklenemedi:', `/img/${bookData.coverImage}`)
                        // Fallback to gradient design if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallbackDiv = target.nextElementSibling as HTMLElement;
                        if (fallbackDiv) {
                          fallbackDiv.classList.remove('hidden');
                        }
                      }}
                    />
                    {/* Fallback gradient design (hidden by default) */}
                    <div className="hidden bg-gradient-to-br from-primary-500 to-primary-700 p-8 rounded-2xl shadow-2xl transform perspective-1000 hover:rotate-y-5 transition-all duration-700 group-hover:scale-105 w-80" style={{ aspectRatio: '3/4' }}>
                      <div className="text-center text-white h-full flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {bookData.title}
                        </h3>
                        <div className="text-lg font-medium">Hilal Yılmaz</div>
                        <p className="text-sm mt-2 opacity-75">Resim yüklenemedi</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Default gradient design when no cover image */
                  <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-8 rounded-2xl shadow-2xl transform perspective-1000 hover:rotate-y-5 transition-all duration-700 group-hover:scale-105 w-80" style={{ aspectRatio: '3/4' }}>
                    <div className="text-center text-white h-full flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {bookData.title}
                      </h3>
                      <div className="text-lg font-medium">Hilal Yılmaz</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 grid grid-cols-2 gap-4 max-w-80 mx-auto">
                <button 
                  onClick={handleBuyClick}
                  className="text-center p-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    <span className="font-bold">Satın Al</span>
                  </div>
                </button>
                <button 
                  onClick={handlePreviewClick}
                  className="text-center p-4 bg-white hover:bg-gray-50 text-primary-600 border-2 border-primary-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Eye className="w-5 h-5" />
                    <span className="font-bold">Önizleme</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Book Details */}
            <div className="space-y-8">
              {/* Title & Basic Info */}
              <div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
                  {bookData.title}
                </h3>
                
                <div className="flex flex-wrap gap-4 text-sm text-secondary-600 mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{bookData.publishDate}</span>
                  </div>
                  <span>•</span>
                  <span>{bookData.pages} sayfa</span>
                  <span>•</span>
                  <span>{bookData.genre}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-lg text-secondary-700 leading-relaxed mb-6">
                  {bookData.description}
                </p>
              </div>

              {/* Themes */}
              <div>
                <h4 className="font-semibold text-secondary-900 mb-3">Ana Temalar</h4>
                <div className="flex flex-wrap gap-2">
                  {bookData.themes.map((theme, idx) => (
                    <span key={idx} className="bg-primary-200 text-primary-700 px-3 py-1 rounded-full text-sm">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Modal */}
          {isPreviewOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="text-xl font-bold text-gray-900">Kitap Önizlemesi</h3>
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <img
                      src={getPageImagePath(currentPage)}
                      alt={`Sayfa ${currentPage}`}
                      className="max-w-full max-h-[60vh] object-contain shadow-lg rounded"
                      onError={(e) => {
                        console.error(`Sayfa ${currentPage} yüklenemedi:`, e);
                      }}
                    />
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-lg'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Geri
                    </button>

                    <span className="text-gray-600 font-medium">
                      {currentPage} / {totalPages}
                    </span>

                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-lg'
                      }`}
                    >
                      İleri
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog Teaser Section */}
          <div className="mt-20 bg-gradient-to-r from-primary-50 to-secondary-50 p-8 lg:p-12 rounded-2xl text-center">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-secondary-900 mb-4">
              Yazma Yolculuğumda Yaşadıklarım
            </h3>
            <p className="text-secondary-600 mb-8 max-w-2xl mx-auto">
              Yazma sürecim, karakterlerimle kurduğum bağ ve edebiyat dünyasındaki deneyimlerim hakkında yazdığım yazıları blog sayfamda paylaşıyorum.
            </p>
            <button 
              onClick={handleBlogClick}
              className="btn-primary inline-flex items-center gap-2"
            >
              Blog Yazılarımı Oku
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Books 