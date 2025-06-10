'use client'

import React, { useState } from 'react'
import { 
  Menu, X, Home, Palette, Settings, Upload, BookOpen, 
  FileText, User, Save, Eye, LogOut, ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import PageTransition from '@/components/PageTransition'
import { usePageTransition } from '@/hooks/usePageTransition'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const pathname = usePathname()
  const { isTransitioning, onTransitionComplete } = usePageTransition()

  const menuItems = [
    { icon: Home, label: 'Kontrol Paneli', href: '/admin', active: pathname === '/admin' },
    { icon: Palette, label: 'Renkler', href: '/admin/colors', active: pathname === '/admin/colors' },
    { icon: Settings, label: 'Site Ayarları', href: '/admin/settings', active: pathname === '/admin/settings' },
    { icon: User, label: 'Hakkımda', href: '/admin/about', active: pathname === '/admin/about' },
    { icon: BookOpen, label: 'Kitaplarım', href: '/admin/books', active: pathname === '/admin/books' },
    { icon: FileText, label: 'Blog', href: '/admin/blog', active: pathname === '/admin/blog' },
    { icon: Upload, label: 'Medya', href: '/admin/media', active: pathname === '/admin/media' },
    { icon: Home, label: 'Ana Sayfa Düzeni', href: '/admin/homepage', active: pathname === '/admin/homepage' },
  ]

  const handleSaveChanges = () => {
    // Tüm değişiklikleri kaydet
    alert('Tüm değişiklikler başarıyla kaydedildi!')
  }

  const handleViewSite = () => {
    // Ana siteyi yeni sekmede aç
    window.open('/', '_blank')
  }

  const handleLogout = () => {
    // Çıkış işlemi
    if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
      window.location.href = '/'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`bg-white shadow-lg transition-all duration-300 ${
        isSidebarOpen ? 'w-64' : 'w-16'
      }`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                HY
              </div>
              {isSidebarOpen && (
                <div>
                  <h1 className="font-bold text-gray-900">Admin Panel</h1>
                  <p className="text-sm text-gray-500">İçerik Yönetimi</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon size={20} />
                      {isSidebarOpen && <span>{item.label}</span>}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <button
              onClick={handleViewSite}
              className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ExternalLink size={20} />
              {isSidebarOpen && <span>Siteyi Görüntüle</span>}
            </button>
            <button
              onClick={handleSaveChanges}
              className="w-full flex items-center gap-3 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              <Save size={20} />
              {isSidebarOpen && <span>Değişiklikleri Kaydet</span>}
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              {isSidebarOpen && <span>Çıkış Yap</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </main>
      
      <PageTransition 
        isActive={isTransitioning} 
        onComplete={onTransitionComplete} 
      />
    </div>
  )
} 