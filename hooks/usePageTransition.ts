'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const router = useRouter()

  const navigateWithTransition = useCallback((url: string) => {
    if (isTransitioning) {
      console.log('Geçiş zaten devam ediyor, yeni geçiş başlatılmıyor')
      return
    }

    console.log('Sayfa geçişi başlatılıyor:', url)
    setIsTransitioning(true)
    
    // Wait for expand animation to complete, then navigate
    setTimeout(() => {
      console.log('Navigasyon yapılıyor:', url)
      router.push(url)
    }, 2000)
  }, [isTransitioning, router])

  const scrollWithTransition = useCallback((selector: string) => {
    if (isTransitioning) return

    setIsTransitioning(true)
    
    // Wait for expand animation to complete, then scroll
    setTimeout(() => {
      // Navigate to home first if not already there
      if (window.location.pathname !== '/') {
        router.push(`/${selector}`)
      } else {
        // Already on home, just scroll
        const element = document.querySelector(selector)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }, 2000)
  }, [isTransitioning, router])

  const onTransitionComplete = useCallback(() => {
    console.log('Transition tamamlandı, state reset ediliyor')
    setIsTransitioning(false)
  }, [])

  return {
    isTransitioning,
    navigateWithTransition,
    scrollWithTransition,
    onTransitionComplete
  }
} 