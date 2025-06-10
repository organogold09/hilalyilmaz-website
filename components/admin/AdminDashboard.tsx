'use client'

import React from 'react'
import Link from 'next/link'
import { 
  BarChart3, 
  Users, 
  FileText, 
  Eye, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  BookOpen,
  Palette,
  Settings,
  Image
} from 'lucide-react'

export default function AdminDashboard() {
  // Gerçek zamanlı istatistikler (örnek veriler)
  const [stats, setStats] = React.useState({
    totalViews: 12450,
    totalPosts: 24,
    totalBooks: 8,
    mediaFiles: 156,
    weeklyViews: 890,
    monthlyViews: 3420
  })

  const quickActions = [
    { name: 'Yeni Blog Yazısı', icon: FileText, href: '/admin/blog', color: 'bg-blue-500' },
    { name: 'Kitap Ekle', icon: BookOpen, href: '/admin/books', color: 'bg-green-500' },
    { name: 'Renkleri Düzenle', icon: Palette, href: '/admin/colors', color: 'bg-purple-500' },
    { name: 'Medya Yükle', icon: Image, href: '/admin/media', color: 'bg-orange-500' },
    { name: 'Site Ayarları', icon: Settings, href: '/admin/settings', color: 'bg-gray-600' },
  ]

  const recentActivities = [
    { action: 'Yeni blog yazısı yayınlandı', time: '2 saat önce', type: 'success' },
    { action: 'Kitap bilgileri güncellendi', time: '5 saat önce', type: 'info' },
    { action: 'Medya dosyası yüklendi', time: '1 gün önce', type: 'success' },
    { action: 'Site renkleri değiştirildi', time: '2 gün önce', type: 'warning' },
    { action: 'Hakkımda sayfası güncellendi', time: '3 gün önce', type: 'info' },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="text-green-500" size={16} />
      case 'warning': return <AlertCircle className="text-yellow-500" size={16} />
      case 'info': return <Clock className="text-blue-500" size={16} />
      default: return <Clock className="text-gray-500" size={16} />
    }
  }

  return (
    <div className="space-y-6">
      {/* Hoşgeldin Mesajı */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Hoşgeldin, Hilmi!</h1>
        <p className="text-blue-100">Admin panelinizde tüm içeriklerinizi yönetebilirsiniz.</p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Görüntülenme</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="text-green-500" size={16} />
            <span className="text-green-500 text-sm ml-1">+{stats.weeklyViews} bu hafta</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Blog Yazıları</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPosts}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="text-green-600" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <Link href="/admin/blog" className="text-green-600 text-sm hover:underline">
              Tümünü görüntüle →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Kitaplarım</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBooks}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <Link href="/admin/books" className="text-purple-600 text-sm hover:underline">
              Kitapları yönet →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Medya Dosyaları</p>
              <p className="text-2xl font-bold text-gray-900">{stats.mediaFiles}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Image className="text-orange-600" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <Link href="/admin/media" className="text-orange-600 text-sm hover:underline">
              Medya kütüphanesi →
            </Link>
          </div>
        </div>
      </div>

      {/* Hızlı Eylemler ve Son Aktiviteler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hızlı Eylemler */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Hızlı Eylemler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link
                  key={action.name}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="text-white" size={20} />
                  </div>
                  <span className="font-medium text-gray-900">{action.name}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Son Aktiviteler */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Son Aktiviteler</h2>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                {getActivityIcon(activity.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Site Durumu */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Site Durumu</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-500" size={20} />
            <div>
              <p className="font-medium text-gray-900">Site Aktif</p>
              <p className="text-sm text-gray-500">Tüm sistemler çalışıyor</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-500" size={20} />
            <div>
              <p className="font-medium text-gray-900">Yedekleme</p>
              <p className="text-sm text-gray-500">Son: 2 saat önce</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <TrendingUp className="text-blue-500" size={20} />
            <div>
              <p className="font-medium text-gray-900">Performans</p>
              <p className="text-sm text-gray-500">Mükemmel (95/100)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 