'use client'

import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogContent from '@/components/BlogContent'
import PageTransition from '@/components/PageTransition'
import { usePageTransition } from '@/hooks/usePageTransition'

export default function BlogPage() {
  const { isTransitioning, onTransitionComplete } = usePageTransition()
  
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16 md:pt-20">
        <BlogContent />
      </div>
      <Footer />
      <PageTransition 
        isActive={isTransitioning} 
        onComplete={onTransitionComplete} 
      />
    </main>
  )
} 