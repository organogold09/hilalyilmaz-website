'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { X, Eye, EyeOff, Lock, User, Shield } from 'lucide-react'

interface AdminLoginModalProps {
  isOpen: boolean
  onClose: () => void
}

interface AdminCredentials {
  username: string
  password: string
  createdAt: string
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFirstTime, setIsFirstTime] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      // Admin credentials var mı kontrol et
      const adminCreds = localStorage.getItem('adminCredentials')
      setIsFirstTime(!adminCreds)
      setError('')
      setUsername('')
      setPassword('')
    }
  }, [isOpen])

  const createAdminCredentials = () => {
    if (!username.trim() || !password.trim()) {
      setError('Kullanıcı adı ve şifre gereklidir')
      return
    }

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır')
      return
    }

    const adminCreds: AdminCredentials = {
      username: username.trim(),
      password: password, // Gerçek uygulamada hash'lenmelidir
      createdAt: new Date().toISOString()
    }

    localStorage.setItem('adminCredentials', JSON.stringify(adminCreds))
    localStorage.setItem('adminSession', JSON.stringify({
      isLoggedIn: true,
      loginTime: new Date().toISOString(),
      username: username.trim()
    }))

    console.log('Admin credentials oluşturuldu:', { username: username.trim() })
    
    // Admin paneline yönlendir
    router.push('/admin')
    onClose()
  }

  const handleLogin = () => {
    setIsLoading(true)
    setError('')

    try {
      const adminCreds = localStorage.getItem('adminCredentials')
      
      if (!adminCreds) {
        setError('Admin hesabı bulunamadı')
        setIsLoading(false)
        return
      }

      const credentials: AdminCredentials = JSON.parse(adminCreds)

      if (username.trim() !== credentials.username || password !== credentials.password) {
        setError('Kullanıcı adı veya şifre hatalı')
        setIsLoading(false)
        return
      }

      // Başarılı giriş
      localStorage.setItem('adminSession', JSON.stringify({
        isLoggedIn: true,
        loginTime: new Date().toISOString(),
        username: username.trim()
      }))

      console.log('Admin girişi başarılı:', { username: username.trim() })
      
      // Admin paneline yönlendir
      router.push('/admin')
      onClose()

    } catch (error) {
      console.error('Login hatası:', error)
      setError('Giriş sırasında bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isFirstTime) {
      createAdminCredentials()
    } else {
      handleLogin()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6" />
              <h2 className="text-xl font-bold">
                {isFirstTime ? 'Admin Hesabı Oluştur' : 'Admin Girişi'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-primary-100 text-sm mt-1">
            {isFirstTime 
              ? 'İlk kez giriş yapıyorsunuz. Admin hesabınızı oluşturun.'
              : 'Gizli admin paneline erişim için giriş yapın.'
            }
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kullanıcı Adı
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Admin kullanıcı adı"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Şifre
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder={isFirstTime ? "Güçlü bir şifre oluşturun" : "Admin şifreniz"}
                required
                minLength={isFirstTime ? 6 : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {isFirstTime && (
              <p className="text-xs text-gray-500 mt-1">
                En az 6 karakter olmalıdır
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {isFirstTime ? 'Hesap Oluşturuluyor...' : 'Giriş Yapılıyor...'}
              </div>
            ) : (
              isFirstTime ? 'Admin Hesabı Oluştur' : 'Admin Paneline Giriş Yap'
            )}
          </button>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-blue-600 text-xs">
              🔒 Bu gizli admin paneli sadece site yöneticisi içindir. 
              {isFirstTime && ' Oluşturduğunuz bilgileri güvenli bir yerde saklayın.'}
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLoginModal 