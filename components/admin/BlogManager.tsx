'use client'

import React, { useState } from 'react'
import { 
  Save, 
  Plus, 
  Edit3, 
  Trash2, 
  FileText, 
  Eye,
  Calendar,
  Tag,
  User
} from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  featuredImage: string
  publishDate: string
  status: 'published' | 'draft'
  tags: string[]
  author: string
  readTime: number
}

const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Yazarlık Serüvenim Nasıl Başladı?',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      excerpt: 'Yazarlık hayatımın ilk adımları ve bu süreçte yaşadığım deneyimler...',
      featuredImage: '/images/blog-1.jpg',
      publishDate: '2024-01-15',
      status: 'published',
      tags: ['yazarlık', 'başlangıç', 'deneyim'],
      author: 'Hilal Yılmaz',
      readTime: 5
    },
    {
      id: '2',
      title: 'Edebiyatın Gençlerdeki Etkisi',
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      excerpt: 'Edebiyatın genç nesil üzerindeki olumlu etkilerini inceliyoruz...',
      featuredImage: '/images/blog-2.jpg',
      publishDate: '2024-01-10',
      status: 'draft',
      tags: ['edebiyat', 'gençlik', 'etki'],
      author: 'Hilal Yılmaz',
      readTime: 8
    }
  ])

  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [showModal, setShowModal] = useState(false)

  const openModal = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post)
    } else {
      setEditingPost({
        id: '',
        title: '',
        content: '',
        excerpt: '',
        featuredImage: '',
        publishDate: new Date().toISOString().split('T')[0],
        status: 'draft',
        tags: [],
        author: 'Hilal Yılmaz',
        readTime: 5
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setEditingPost(null)
    setShowModal(false)
  }

  const savePost = () => {
    if (!editingPost) return

    if (editingPost.id) {
      // Update existing post
      setPosts(prev => prev.map(post => 
        post.id === editingPost.id ? editingPost : post
      ))
    } else {
      // Add new post
      const newPost = { ...editingPost, id: Date.now().toString() }
      setPosts(prev => [...prev, newPost])
    }
    
    closeModal()
    alert(`Blog yazısı başarıyla ${editingPost.id ? 'güncellendi' : 'eklendi'}!`)
  }

  const deletePost = (postId: string) => {
    if (confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
      setPosts(prev => prev.filter(post => post.id !== postId))
      alert('Blog yazısı başarıyla silindi!')
    }
  }

  const updateField = (field: keyof BlogPost, value: any) => {
    if (!editingPost) return
    setEditingPost(prev => ({ ...prev!, [field]: value }))
  }

  const updateTags = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag)
    updateField('tags', tags)
  }

  const statusColors = {
    published: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800'
  }

  const statusLabels = {
    published: 'Yayınlandı',
    draft: 'Taslak'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Yazıları</h1>
          <p className="text-gray-600">Blog yazılarınızı yönetin, yeni yazı ekleyin</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
        >
          <Plus size={16} />
          Yeni Yazı Ekle
        </button>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Yazı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Okuma Süresi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        {post.featuredImage ? (
                          <img src={post.featuredImage} alt={post.title} className="h-12 w-12 rounded-lg object-cover" />
                        ) : (
                          <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <FileText size={20} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{post.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{post.excerpt}</div>
                        <div className="flex gap-1 mt-1">
                          {post.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="text-xs text-gray-500">+{post.tags.length - 2}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[post.status]}`}>
                      {statusLabels[post.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(post.publishDate).toLocaleDateString('tr-TR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {post.readTime} dakika
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal(post)}
                        className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                      >
                        <Edit3 size={14} />
                        Düzenle
                      </button>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-red-600 hover:text-red-900 flex items-center gap-1"
                      >
                        <Trash2 size={14} />
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {posts.length === 0 && (
          <div className="p-12 text-center">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz blog yazısı yok</h3>
            <p className="text-gray-600 mb-4">İlk blog yazınızı eklemek için butona tıklayın.</p>
            <button
              onClick={() => openModal()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Yeni Yazı Ekle
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {editingPost.id ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı'}
              </h2>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Başlık *
                  </label>
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Özet
                  </label>
                  <textarea
                    value={editingPost.excerpt}
                    onChange={(e) => updateField('excerpt', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İçerik *
                  </label>
                  <textarea
                    value={editingPost.content}
                    onChange={(e) => updateField('content', e.target.value)}
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Öne Çıkan Resim URL
                  </label>
                  <input
                    type="url"
                    value={editingPost.featuredImage}
                    onChange={(e) => updateField('featuredImage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Etiketler (virgülle ayırın)
                  </label>
                  <input
                    type="text"
                    value={editingPost.tags.join(', ')}
                    onChange={(e) => updateTags(e.target.value)}
                    placeholder="yazarlık, edebiyat, roman"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Publish Date, Status, Read Time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Yayın Tarihi
                    </label>
                    <input
                      type="date"
                      value={editingPost.publishDate}
                      onChange={(e) => updateField('publishDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durum
                    </label>
                    <select
                      value={editingPost.status}
                      onChange={(e) => updateField('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="draft">Taslak</option>
                      <option value="published">Yayınla</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Okuma Süresi (dakika)
                    </label>
                    <input
                      type="number"
                      value={editingPost.readTime}
                      onChange={(e) => updateField('readTime', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={savePost}
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

export default BlogManager 