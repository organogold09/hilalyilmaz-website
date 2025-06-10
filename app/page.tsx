'use client'

import React from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Books from '@/components/Books'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'
import { usePageTransition } from '@/hooks/usePageTransition'

export default function HomePage() {
  const { isTransitioning, navigateWithTransition, onTransitionComplete } = usePageTransition()
  
  console.log('Ana sayfa - isTransitioning:', isTransitioning)
  
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Books navigateWithTransition={navigateWithTransition} />
      <Contact />
      <Footer />
      <PageTransition 
        isActive={isTransitioning} 
        onComplete={onTransitionComplete} 
      />
    </main>
  )
} 