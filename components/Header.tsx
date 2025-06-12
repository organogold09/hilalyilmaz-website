'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import PageTransition from './PageTransition'
import { usePageTransition } from '../hooks/usePageTransition'
import AdminLoginModal from './admin/AdminLoginModal'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null)
  const pathname = usePathname()
  const { isTransitioning, navigateWithTransition, scrollWithTransition, onTransitionComplete } = usePageTransition()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Gizli admin girişi için tıklama sayacını sıfırla
  useEffect(() => {
    if (clickCount === 5) {
      setShowAdminLogin(true)
      setClickCount(0)
    }
  }, [clickCount])

  const navItems = [
    { name: 'Ana Sayfa', href: '#home', section: 'home' },
    { name: 'Hakkımda', href: '#about', section: 'about' },
    { name: 'Kitaplarım', href: '#books', section: 'books' },
    { name: 'Blog', href: '/blog', section: 'blog' },
    { name: 'İletişim', href: '#contact', section: 'contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsMobileMenuOpen(false)
    
    // Eğer blog sayfasında değilsek ve blog'a gitmiyorsak, normal scroll işlemi
    if (pathname === '/' && item.section !== 'blog') {
      scrollToSection(item.href)
    }
    // Blog'a gidiyorsak, transition ile git
    else if (item.section === 'blog') {
      navigateWithTransition('/blog')
    }
    // Blog sayfasındaysak ve blog'a tıklandıysa, hiçbir şey yapma
    else if (pathname === '/blog' && item.section === 'blog') {
      return
    }
    // Diğer durumlarda transition ile ana sayfaya git
    else if (item.section !== 'blog') {
      scrollWithTransition(item.href)
    }
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    // Gizli admin girişi için tıklama sayacı
    const newClickCount = clickCount + 1
    setClickCount(newClickCount)
    
    // Önceki timeout'u temizle
    if (clickTimeout) {
      clearTimeout(clickTimeout)
    }
    
    // 2 saniye sonra sayacı sıfırla
    const timeout = setTimeout(() => {
      setClickCount(0)
    }, 2000)
    setClickTimeout(timeout)
    
    // Normal logo işlevi (sadece 5. tıklamada değilse)
    if (newClickCount < 5) {
      if (pathname === '/') {
        scrollToSection('#home')
      } else {
        navigateWithTransition('/')
      }
    }
  }

  return (
    <>
      <PageTransition 
        isActive={isTransitioning} 
        onComplete={onTransitionComplete}
      />
      
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button 
                onClick={handleLogoClick}
                className={`text-2xl md:text-3xl font-serif font-bold text-secondary-900 hover:text-primary-500 transition-all duration-200 select-none ${
                  clickCount > 0 ? 'animate-pulse' : ''
                }`}
                title={clickCount > 0 ? `${5 - clickCount} tıklama kaldı...` : ''}
              >
                Hilal Yılmaz
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  disabled={isTransitioning}
                  className={`font-medium transition-colors duration-200 relative group disabled:opacity-50 ${
                    (pathname === '/blog' && item.section === 'blog') || 
                    (pathname === '/' && item.section === 'home')
                      ? 'text-primary-500' 
                      : 'text-secondary-700 hover:text-primary-500'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all duration-200 group-hover:w-full ${
                    (pathname === '/blog' && item.section === 'blog') || 
                    (pathname === '/' && item.section === 'home') ? 'w-full' : 'w-0'
                  }`}></span>
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-secondary-700 hover:text-primary-500 transition-colors duration-200"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-secondary-200 py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    disabled={isTransitioning}
                    className={`text-left px-4 py-2 font-medium transition-colors duration-200 disabled:opacity-50 ${
                      (pathname === '/blog' && item.section === 'blog') || 
                      (pathname === '/' && item.section === 'home')
                        ? 'text-primary-500' 
                        : 'text-secondary-700 hover:text-primary-500'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Admin Login Modal */}
      <AdminLoginModal 
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
      />
    </>
  )
}

export default Header 