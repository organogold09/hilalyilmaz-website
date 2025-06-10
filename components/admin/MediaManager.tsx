'use client'

import React, { useState } from 'react'
import { 
  Upload, 
  Image, 
  Trash2, 
  Download,
  Search,
  Filter,
  Grid,
  List,
  Eye,
  Edit3,
  Copy,
  Check,
  FileText,
  Film,
  Music,
  Archive
} from 'lucide-react'

interface MediaFile {
  id: string
  name: string
  type: 'image' | 'video' | 'audio' | 'document' | 'other'
  size: string
  url: string
  uploadDate: string
  dimensions?: string
}

const MediaManager = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video' | 'document'>('all')
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [files, setFiles] = useState<MediaFile[]>([])

  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: '1',
      name: 'profile-photo.jpg',
      type: 'image',
      size: '245 KB',
      url: '/images/profile.jpg',
      uploadDate: '2024-01-15',
      dimensions: '800x800'
    },
    {
      id: '2',
      name: 'hero-background.jpg',
      type: 'image',
      size: '1.2 MB',
      url: '/images/hero-bg.jpg',
      uploadDate: '2024-01-14',
      dimensions: '1920x1080'
    },
    {
      id: '3',
      name: 'book-cover-1.jpg',
      type: 'image',
      size: '456 KB',
      url: '/images/book-cover.jpg',
      uploadDate: '2024-01-13',
      dimensions: '600x900'
    },
    {
      id: '4',
      name: 'bio-document.pdf',
      type: 'document',
      size: '89 KB',
      url: '/documents/bio.pdf',
      uploadDate: '2024-01-12'
    }
  ])

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image size={20} />
      case 'video': return <Film size={20} />
      case 'audio': return <Music size={20} />
      case 'document': return <FileText size={20} />
      default: return <Archive size={20} />
    }
  }

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'image': return 'text-blue-600'
      case 'video': return 'text-purple-600'
      case 'audio': return 'text-green-600'
      case 'document': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || file.type === filterType
    return matchesSearch && matchesFilter
  })

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    )
  }

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([])
    } else {
      setSelectedFiles(filteredFiles.map(file => file.id))
    }
  }

  const handleDeleteSelected = () => {
    if (confirm(`${selectedFiles.length} dosyayı silmek istediğinizden emin misiniz?`)) {
      setMediaFiles(prev => prev.filter(file => !selectedFiles.includes(file.id)))
      setSelectedFiles([])
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach(file => {
      // Dosya tipini belirle
      let type: 'image' | 'video' | 'document' = 'document'
      if (file.type.startsWith('image/')) type = 'image'
      else if (file.type.startsWith('video/')) type = 'video'

      // Dosya boyutunu MB cinsine çevir
      const sizeInMB = Math.round(file.size / (1024 * 1024) * 100) / 100

      // URL'yi oluştur (gerçek uygulamada dosya sunucuya yüklenecek)
      const url = URL.createObjectURL(file)

      const newFile: MediaFile = {
        id: (Date.now() + Math.random()).toString(),
        name: file.name,
        type,
        size: `${sizeInMB} MB`,
        url,
        uploadDate: new Date().toLocaleDateString('tr-TR'),
        dimensions: type === 'image' ? '800x600' : undefined
      }

      setFiles(prev => [newFile, ...prev])
    })

    // Input'u temizle
    event.target.value = ''
    if (files) {
      // Normalde burada dosyalar yüklenir ve API'ye gönderilir
      console.log('Yüklenen dosyalar:', files)
      alert(`${files.length} dosya yüklendi!`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Medya Kütüphanesi</h1>
          <p className="text-gray-600">Resim, video ve belge dosyalarınızı yönetin</p>
        </div>
        
        {/* Upload Button */}
        <div className="relative">
          <input
            type="file"
            multiple
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
            <Upload size={16} />
            Dosya Yükle
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search & Filter */}
          <div className="flex gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Dosya ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tüm Dosyalar</option>
              <option value="image">Resimler</option>
              <option value="video">Videolar</option>
              <option value="document">Belgeler</option>
            </select>
          </div>

          {/* View Mode & Actions */}
          <div className="flex gap-3 items-center">
            {selectedFiles.length > 0 && (
              <>
                <span className="text-sm text-gray-600">{selectedFiles.length} seçili</span>
                <button
                  onClick={handleDeleteSelected}
                  className="px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm flex items-center gap-1"
                >
                  <Trash2 size={14} />
                  Sil
                </button>
              </>
            )}
            
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {filteredFiles.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedFiles.length === filteredFiles.length}
                onChange={handleSelectAll}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Tümünü seç</span>
            </label>
          </div>
        )}
      </div>

      {/* File Grid/List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {filteredFiles.length === 0 ? (
          <div className="p-12 text-center">
            <Image size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Dosya bulunamadı</h3>
            <p className="text-gray-600">Arama kriterlerinize uygun dosya bulunmuyor.</p>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredFiles.map((file) => (
                <div key={file.id} className="group relative">
                  <div className={`border-2 rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                    selectedFiles.includes(file.id) 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    {/* File Preview */}
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                      {file.type === 'image' ? (
                        <img 
                          src={file.url} 
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`${getFileTypeColor(file.type)}`}>
                          {getFileIcon(file.type)}
                        </div>
                      )}
                    </div>

                    {/* File Info */}
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">{file.size}</p>
                      {file.dimensions && (
                        <p className="text-xs text-gray-500">{file.dimensions}</p>
                      )}
                    </div>

                    {/* Selection Checkbox */}
                    <div className="absolute top-2 left-2">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => handleFileSelect(file.id)}
                        className="rounded"
                      />
                    </div>

                    {/* Actions */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="flex gap-1">
                        <button
                          onClick={() => copyToClipboard(file.url)}
                          className="p-1 bg-white rounded shadow-sm hover:bg-gray-50"
                          title="URL'yi kopyala"
                        >
                          {copiedUrl === file.url ? (
                            <Check size={12} className="text-green-600" />
                          ) : (
                            <Copy size={12} className="text-gray-600" />
                          )}
                        </button>
                        <button
                          onClick={() => window.open(file.url, '_blank')}
                          className="p-1 bg-white rounded shadow-sm hover:bg-gray-50"
                          title="Görüntüle"
                        >
                          <Eye size={12} className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* List View */
          <div className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dosya
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tip
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Boyut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFiles.map((file) => (
                  <tr key={file.id} className={selectedFiles.includes(file.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(file.id)}
                          onChange={() => handleFileSelect(file.id)}
                          className="mr-4"
                        />
                        <div className="flex items-center">
                          <div className={`mr-3 ${getFileTypeColor(file.type)}`}>
                            {getFileIcon(file.type)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            {file.dimensions && (
                              <p className="text-xs text-gray-500">{file.dimensions}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {file.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {file.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {file.uploadDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(file.url)}
                          className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                        >
                          {copiedUrl === file.url ? <Check size={14} /> : <Copy size={14} />}
                          {copiedUrl === file.url ? 'Kopyalandı' : 'Kopyala'}
                        </button>
                        <button
                          onClick={() => window.open(file.url, '_blank')}
                          className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
                        >
                          <Eye size={14} />
                          Görüntüle
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Storage Info */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Depolama Bilgisi</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{mediaFiles.length}</p>
            <p className="text-sm text-blue-800">Toplam Dosya</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">2.1 MB</p>
            <p className="text-sm text-green-800">Kullanılan Alan</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-600">97.9 MB</p>
            <p className="text-sm text-gray-800">Boş Alan</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaManager 