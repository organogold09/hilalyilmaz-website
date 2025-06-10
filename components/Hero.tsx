'use client'

import React from 'react'
import { ChevronDown } from 'lucide-react'

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated Profile Image Placeholder */}
          <div className="mb-8 animate-fade-in">
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-primary-500 flex items-center justify-center shadow-xl animate-float">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-white flex items-center justify-center">
                <span className="text-4xl md:text-5xl font-serif text-primary-500">HY</span>
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="animate-slide-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-secondary-900 mb-6 leading-tight">
              Hilal <span className="text-primary-500">Yılmaz</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-secondary-600 mb-8 font-light">
              Kelimelerle Ruh Arasındaki Köprü
            </p>

            <div className="max-w-2xl mx-auto mb-12">
              <p className="text-lg text-secondary-700 leading-relaxed">
                Hayatın derinliklerini keşfeden, insanlık hikayelerini kaleme alan bir yazar. 
                Her satırda bir ruh, her kelimede bir dünya yaratmanın peşindeyim.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => document.querySelector('#books')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary w-full sm:w-auto"
              >
                Kitaplarımı Keşfet
              </button>
              <button 
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary w-full sm:w-auto"
              >
                Hakkımda Daha Fazla
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce mt-10">
            <button
              onClick={scrollToAbout}
              className="text-primary-500 hover:text-primary-600 transition-colors duration-200"
              aria-label="Aşağı kaydır"
            >
              <ChevronDown size={32} />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-100 rounded-full opacity-50 animate-float"></div>
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-primary-100 rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-20 w-12 h-12 bg-primary-100 rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  )
}

export default Hero 