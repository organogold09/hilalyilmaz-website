'use client'

import React, { useState, useEffect } from 'react'

interface PageTransitionProps {
  isActive: boolean
  onComplete: () => void
}

const PageTransition = ({ isActive, onComplete }: PageTransitionProps) => {
  const [animationPhase, setAnimationPhase] = useState<'expand' | 'contract' | 'complete'>('expand')

  useEffect(() => {
    if (isActive) {
      console.log('PageTransition aktif edildi')
      setAnimationPhase('expand')
      
      // Expand phase: 0 -> full screen (2 seconds)
      const expandTimer = setTimeout(() => {
        console.log('Expand fazı tamamlandı, contract fazına geçiliyor')
        setAnimationPhase('contract')
        
        // Contract phase: full screen -> 0 (2 seconds)
        const contractTimer = setTimeout(() => {
          console.log('Contract fazı tamamlandı, geçiş tamamlanıyor')
          setAnimationPhase('complete')
          onComplete()
        }, 2000)

        return () => clearTimeout(contractTimer)
      }, 2000)

      return () => clearTimeout(expandTimer)
    }
  }, [isActive, onComplete])

  if (!isActive) return null

  const getScaleClass = () => {
    switch (animationPhase) {
      case 'expand':
        return 'animate-expand-full'
      case 'contract':
        return 'animate-contract-full'
      default:
        return 'scale-0'
    }
  }

  const getHYOpacity = () => {
    // HY monogramını sadece belirli aşamalarda göster
    switch (animationPhase) {
      case 'expand':
        return 'opacity-100'
      case 'contract':
        return 'opacity-100'
      default:
        return 'opacity-0'
    }
  }

  const getBlurIntensity = () => {
    // Blur efektinin yoğunluğu
    switch (animationPhase) {
      case 'expand':
        return 'backdrop-blur-lg'
      case 'contract':
        return 'backdrop-blur-lg'
      default:
        return 'backdrop-blur-none'
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {/* Blur Background Layer */}
      <div className={`absolute inset-0 bg-white/10 transition-all duration-700 ${getBlurIntensity()}`}></div>
      
      {/* Centered Circle Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Expanding/Contracting Circle */}
        <div 
          className={`
            rounded-full bg-primary-500
            flex items-center justify-center
            shadow-2xl
            ${getScaleClass()}
          `}
          style={{
            width: '1px',
            height: '1px',
            minWidth: '1px',
            minHeight: '1px',
            filter: 'drop-shadow(0 0 50px rgba(var(--color-primary-rgb), 0.3))',
          }}
        >
          {/* Inner White Circle with HY */}
          <div className={`w-40 h-40 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${getHYOpacity()}`}>
            <span className="text-5xl font-serif text-primary-500 font-bold select-none drop-shadow-sm">HY</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageTransition 