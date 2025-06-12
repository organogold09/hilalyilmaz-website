'use client'

import React, { useState, useEffect } from 'react'
import { 
  Save, 
  Plus, 
  Edit3, 
  Trash2, 
  BookOpen, 
  Eye,
  Star,
  DollarSign,
  Calendar,
  Tag
} from 'lucide-react'

interface Book {
  id: string
  title: string
  description: string
  excerpt: string
  price: string
  currency: string
  amazonLink: string
  coverImage: string
  publishDate: string
  isbn: string
  pageCount: number
  genre: string
  status: 'published' | 'draft' | 'coming-soon'
  featured: boolean
  tags: string[]
}

const BooksManager = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [showModal, setShowModal] = useState(false)

  // Load books from API on component mount
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await fetch('/api/books')
        if (response.ok) {
          const data = await response.json()
          setBooks(data)
          console.log('Kitaplar API\'den yüklendi:', data)
        } else {
          console.log('API\'den kitap verisi yüklenemedi, varsayılan içerik kullanılıyor')
          // Varsayılan kitapları localStorage'a kaydet (geçici)
          const defaultBooks: Book[] = [
            {
              id: '1',
              title: 'Sépia',
              description: 'Sépia est un roman poignant qui explore les méandres de la mémoire et des émotions enfouies. À travers le regard d\'un personnage en quête de vérité, l\'histoire dévoile les souvenirs d\'une vie marquée par les silences, les regrets et les non-dits.',
              excerpt: 'Hayat bazen beklenmedik sürprizlerle dolu...',
              price: '25',
              currency: '₺',
              amazonLink: 'https://www.amazon.fr/S%C3%A9pia-Hilal-YILMAZ/dp/B0DQY9G8YR',
              coverImage: 'kitap.jpg',
              publishDate: '2024-01-01',
              isbn: '978-123456789',
              pageCount: 169,
              genre: 'Roman',
              status: 'published',
              featured: true,
              tags: ['Aşk', 'Kayıp', 'Yeniden Doğuş', 'İç Yolculuk', 'İnsan İlişkileri']
            }
          ]
          setBooks(defaultBooks)
          localStorage.setItem('books', JSON.stringify(defaultBooks))
        }
      } catch (error) {
        console.error('Kitaplar yüklenirken hata:', error)
        // Hata durumunda localStorage'dan yükle
        try {
          const savedBooks = localStorage.getItem('books')
          if (savedBooks) {
            setBooks(JSON.parse(savedBooks))
            console.log('Kitaplar localStorage\'dan yüklendi')
          }
        } catch (localError) {
          console.error('localStorage\'dan kitap yükleme hatası:', localError)
        }
      }
    }

    loadBooks()
  }, [])

  const openModal = (book?: Book) => {
    if (book) {
      setEditingBook(book)
    } else {
      setEditingBook({
        id: '',
        title: '',
        description: '',
        excerpt: '',
        price: '',
        currency: '₺',
        amazonLink: '',
        coverImage: '',
        publishDate: '',
        isbn: '',
        pageCount: 0,
        genre: '',
        status: 'draft',
        featured: false,
        tags: []
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setEditingBook(null)
    setShowModal(false)
  }

  const saveBook = async () => {
    if (!editingBook) return

    try {
      // Admin session kontrolü
      const adminSession = localStorage.getItem('adminSession')
      if (!adminSession) {
        alert('Admin oturumu bulunamadı. Lütfen tekrar giriş yapın.')
        return
      }

      // API formatına dönüştür
      const bookData = {
        id: editingBook.id ? parseInt(editingBook.id) : undefined,
        title: editingBook.title,
        description: editingBook.description,
        excerpt: editingBook.excerpt,
        price: parseFloat(editingBook.price) || 0,
        currency: editingBook.currency,
        amazon_link: editingBook.amazonLink,
        cover_image: editingBook.coverImage,
        publish_date: editingBook.publishDate,
        isbn: editingBook.isbn,
        page_count: editingBook.pageCount,
        genre: editingBook.genre,
        status: editingBook.status,
        featured: editingBook.featured,
        tags: editingBook.tags
      }

      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-session': 'true'
        },
        body: JSON.stringify(bookData)
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Kitap veritabanına kaydedildi:', result)
        
        // Başarılı kayıt sonrası listeyi yenile
        const booksResponse = await fetch('/api/books')
        if (booksResponse.ok) {
          const updatedBooks = await booksResponse.json()
          setBooks(updatedBooks)
        }
        
        // localStorage'ı da güncelle (yedek)
        const updatedBooks = editingBook.id 
          ? books.map(book => book.id === editingBook.id ? editingBook : book)
          : [...books, { ...editingBook, id: result.id?.toString() || Date.now().toString() }]
        
        localStorage.setItem('books', JSON.stringify(updatedBooks))
        
        closeModal()
        alert(`✅ Kitap başarıyla veritabanına ${editingBook.id ? 'güncellendi' : 'eklendi'}!`)
      } else {
        const error = await response.json()
        console.error('API kitap kayıt hatası:', error)
        
        // API hatası durumunda localStorage'a kaydet
        const updatedBooks = editingBook.id 
          ? books.map(book => book.id === editingBook.id ? editingBook : book)
          : [...books, { ...editingBook, id: Date.now().toString() }]
        
        setBooks(updatedBooks)
        localStorage.setItem('books', JSON.stringify(updatedBooks))
        
        closeModal()
        alert(`⚠️ Veritabanına kayıt yapılamadı, geçici olarak localStorage'a kaydedildi.`)
      }
    } catch (error) {
      console.error('Kitap kaydetme hatası:', error)
      
      // Hata durumunda localStorage'a kaydet
      const updatedBooks = editingBook.id 
        ? books.map(book => book.id === editingBook.id ? editingBook : book)
        : [...books, { ...editingBook, id: Date.now().toString() }]
      
      setBooks(updatedBooks)
      localStorage.setItem('books', JSON.stringify(updatedBooks))
      
      closeModal()
      alert('⚠️ Bağlantı hatası! Geçici olarak localStorage\'a kaydedildi.')
    }
  }

  const deleteBook = async (bookId: string) => {
    if (!confirm('Bu kitabı silmek istediğinizden emin misiniz?')) return

    try {
      // Admin session kontrolü
      const adminSession = localStorage.getItem('adminSession')
      if (!adminSession) {
        alert('Admin oturumu bulunamadı. Lütfen tekrar giriş yapın.')
        return
      }

      const response = await fetch(`/api/books?id=${bookId}`, {
        method: 'DELETE',
        headers: {
          'x-admin-session': 'true'
        }
      })

      if (response.ok) {
        console.log('Kitap veritabanından silindi')
        
        // Başarılı silme sonrası listeyi yenile
        const booksResponse = await fetch('/api/books')
        if (booksResponse.ok) {
          const updatedBooks = await booksResponse.json()
          setBooks(updatedBooks)
        }
        
        // localStorage'ı da güncelle
        const updatedBooks = books.filter(book => book.id !== bookId)
        localStorage.setItem('books', JSON.stringify(updatedBooks))
        
        alert('✅ Kitap başarıyla veritabanından silindi!')
      } else {
        const error = await response.json()
        console.error('API kitap silme hatası:', error)
        
        // API hatası durumunda localStorage'dan sil
        const updatedBooks = books.filter(book => book.id !== bookId)
        setBooks(updatedBooks)
        localStorage.setItem('books', JSON.stringify(updatedBooks))
        
        alert('⚠️ Veritabanından silinemedi, geçici olarak localStorage\'dan silindi.')
      }
    } catch (error) {
      console.error('Kitap silme hatası:', error)
      
      // Hata durumunda localStorage'dan sil
      const updatedBooks = books.filter(book => book.id !== bookId)
      setBooks(updatedBooks)
      localStorage.setItem('books', JSON.stringify(updatedBooks))
      
      alert('⚠️ Bağlantı hatası! Geçici olarak localStorage\'dan silindi.')
    }
  }

  const updateField = (field: keyof Book, value: any) => {
    if (!editingBook) return
    setEditingBook(prev => ({ ...prev!, [field]: value }))
  }

  const statusColors = {
    published: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    'coming-soon': 'bg-blue-100 text-blue-800'
  }

  const statusLabels = {
    published: 'Yayınlandı',
    draft: 'Taslak',
    'coming-soon': 'Yakında'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kitaplarım</h1>
          <p className="text-gray-600">Kitaplarınızı yönetin, yeni kitap ekleyin</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
        >
          <Plus size={16} />
          Yeni Kitap Ekle
        </button>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Cover Image */}
            <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center overflow-hidden">
              {book.coverImage ? (
                <img src={`/img/${book.coverImage}`} alt={book.title} className="w-full h-full object-cover" />
              ) : (
                <BookOpen size={48} className="text-gray-400" />
              )}
            </div>

            <div className="p-4">
              {/* Title & Status */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 text-lg truncate">{book.title}</h3>
                {book.featured && <Star size={16} className="text-yellow-500 fill-current" />}
              </div>

              <div className="mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[book.status]}`}>
                  {statusLabels[book.status]}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{book.description}</p>

              {/* Price & Genre */}
              <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <DollarSign size={14} />
                  {book.price} {book.currency}
                </span>
                <span className="flex items-center gap-1">
                  <Tag size={14} />
                  {book.genre}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(book)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-1"
                >
                  <Edit3 size={14} />
                  Düzenle
                </button>
                <button
                  onClick={() => deleteBook(book.id)}
                  className="px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors duration-200"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && editingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {editingBook.id ? 'Kitap Düzenle' : 'Yeni Kitap Ekle'}
              </h2>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kitap Adı *
                  </label>
                  <input
                    type="text"
                    value={editingBook.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    value={editingBook.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Price & Currency */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fiyat
                    </label>
                    <input
                      type="number"
                      value={editingBook.price}
                      onChange={(e) => updateField('price', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Para Birimi
                    </label>
                    <select
                      value={editingBook.currency}
                      onChange={(e) => updateField('currency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="₺">₺ (TL)</option>
                      <option value="$">$ (USD)</option>
                      <option value="€">€ (EUR)</option>
                    </select>
                  </div>
                </div>

                {/* Genre & Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tür
                    </label>
                    <input
                      type="text"
                      value={editingBook.genre}
                      onChange={(e) => updateField('genre', e.target.value)}
                      placeholder="Roman, Hikaye, Şiir..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durum
                    </label>
                    <select
                      value={editingBook.status}
                      onChange={(e) => updateField('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="draft">Taslak</option>
                      <option value="published">Yayınlandı</option>
                      <option value="coming-soon">Yakında</option>
                    </select>
                  </div>
                </div>

                {/* Cover Image & Amazon Link */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kapak Resmi Dosya Adı
                    </label>
                    <input
                      type="text"
                      value={editingBook.coverImage}
                      onChange={(e) => updateField('coverImage', e.target.value)}
                      placeholder="kitap.jpg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Sadece dosya adını yazın (örn: kitap.jpg). Dosya public/img/ klasöründe olmalı.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amazon Linki
                    </label>
                    <input
                      type="url"
                      value={editingBook.amazonLink}
                      onChange={(e) => updateField('amazonLink', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Publish Date & Page Count */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Yayın Tarihi
                    </label>
                    <input
                      type="date"
                      value={editingBook.publishDate}
                      onChange={(e) => updateField('publishDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sayfa Sayısı
                    </label>
                    <input
                      type="number"
                      value={editingBook.pageCount}
                      onChange={(e) => updateField('pageCount', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Featured */}
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingBook.featured}
                      onChange={(e) => updateField('featured', e.target.checked)}
                      className="mr-3"
                    />
                    <span className="text-sm font-medium text-gray-700">Öne çıkarılsın</span>
                  </label>
                </div>

                {/* Tags/Themes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temalar/Etiketler
                  </label>
                  <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-3">
                    {[
                      'Aşk', 'Kayıp', 'Yeniden Doğuş', 'İç Yolculuk', 'İnsan İlişkileri',
                      'Aile', 'Arkadaşlık', 'Çocukluk', 'Gençlik', 'Yaşlılık',
                      'Ölüm', 'Hayat', 'Umut', 'Keder', 'Mutluluk',
                      'Özlem', 'Hasret', 'Ayrılık', 'Kavuşma', 'Anılar',
                      'Rüyalar', 'Gerçeklik', 'Hayal', 'Zaman', 'Mekân',
                      'Doğa', 'Şehir', 'Köy', 'Deniz', 'Dağ',
                      'Kış', 'İlkbahar', 'Yaz', 'Sonbahar', 'Gece',
                      'Gündüz', 'Ay', 'Güneş', 'Yıldızlar', 'Rüzgar',
                      'Sessizlik', 'Müzik', 'Kelimeler', 'Düşünceler', 'Duygular'
                    ].map((theme) => (
                      <label key={theme} className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          checked={editingBook.tags.includes(theme)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              updateField('tags', [...editingBook.tags, theme])
                            } else {
                              updateField('tags', editingBook.tags.filter(tag => tag !== theme))
                            }
                          }}
                          className="mr-2"
                        />
                        {theme}
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Kitabınızın ana temalarını seçin (birden fazla seçilebilir)
                  </p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={saveBook}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
                >
                  <Save size={16} />
                  Kaydet
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BooksManager 