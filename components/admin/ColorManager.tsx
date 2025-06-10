'use client'

import React, { useState, useEffect } from 'react'
import { 
  Palette, 
  Save, 
  RotateCcw, 
  Eye, 
  Download,
  Upload,
  Lightbulb,
  Moon,
  Sun,
  Sparkles
} from 'lucide-react'

interface ColorPalette {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textSecondary: string
  border: string
}

const ColorManager = () => {
  const [currentPalette, setCurrentPalette] = useState<ColorPalette>({
    primary: '#d97706',
    secondary: '#f59e0b',
    accent: '#fbbf24',
    background: '#ffffff',
    surface: '#f9fafb',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb'
  })

  const [previewMode, setPreviewMode] = useState(false)
  const [savedPalettes, setSavedPalettes] = useState([
    { name: 'Turuncu Tema (Varsayılan)', colors: currentPalette },
    { name: 'Mavi Tema', colors: { ...currentPalette, primary: '#3b82f6', secondary: '#60a5fa', accent: '#93c5fd' } },
    { name: 'Yeşil Tema', colors: { ...currentPalette, primary: '#10b981', secondary: '#34d399', accent: '#6ee7b7' } },
    { name: 'Mor Tema', colors: { ...currentPalette, primary: '#8b5cf6', secondary: '#a78bfa', accent: '#c4b5fd' } },
  ])

  const colorCategories = [
    { key: 'primary', name: 'Ana Renk', description: 'Butonlar, linkler ve vurgu noktaları' },
    { key: 'secondary', name: 'İkincil Renk', description: 'Hover efektleri ve yardımcı öğeler' },
    { key: 'accent', name: 'Vurgu Rengi', description: 'Özel vurgular ve dekorasyonlar' },
    { key: 'background', name: 'Arkaplan', description: 'Ana sayfa arkaplan rengi' },
    { key: 'surface', name: 'Yüzey', description: 'Kartlar ve panel arka planları' },
    { key: 'text', name: 'Ana Metin', description: 'Başlıklar ve ana metin rengi' },
    { key: 'textSecondary', name: 'İkincil Metin', description: 'Açıklamalar ve yardımcı metinler' },
    { key: 'border', name: 'Kenarlık', description: 'Çizgiler ve ayırıcılar' },
  ]

  const handleColorChange = (colorKey: keyof ColorPalette, value: string) => {
    setCurrentPalette(prev => ({
      ...prev,
      [colorKey]: value
    }))
  }

  const applyPalette = (palette: ColorPalette) => {
    setCurrentPalette(palette)
  }

  const resetToDefault = () => {
    const defaultPalette = savedPalettes[0].colors
    setCurrentPalette(defaultPalette)
  }

  const savePalette = () => {
    // CSS değişkenlerini güncelle
    const root = document.documentElement
    root.style.setProperty('--color-primary', currentPalette.primary)
    root.style.setProperty('--color-secondary', currentPalette.secondary)
    root.style.setProperty('--color-accent', currentPalette.accent)
    root.style.setProperty('--color-background', currentPalette.background)
    root.style.setProperty('--color-surface', currentPalette.surface)
    root.style.setProperty('--color-text', currentPalette.text)
    root.style.setProperty('--color-text-secondary', currentPalette.textSecondary)
    root.style.setProperty('--color-border', currentPalette.border)

    // Primary renk için RGB değerlerini hesapla ve ayarla
    const primaryRgb = hexToRgb(currentPalette.primary)
    if (primaryRgb) {
      root.style.setProperty('--color-primary-rgb', `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`)
      
      // Lighter shades (50, 100, 200, 300)
      const lighter50 = {
        r: Math.min(255, Math.round(primaryRgb.r + (255 - primaryRgb.r) * 0.9)),
        g: Math.min(255, Math.round(primaryRgb.g + (255 - primaryRgb.g) * 0.9)),
        b: Math.min(255, Math.round(primaryRgb.b + (255 - primaryRgb.b) * 0.9))
      }
      const lighter100 = {
        r: Math.min(255, Math.round(primaryRgb.r + (255 - primaryRgb.r) * 0.8)),
        g: Math.min(255, Math.round(primaryRgb.g + (255 - primaryRgb.g) * 0.8)),
        b: Math.min(255, Math.round(primaryRgb.b + (255 - primaryRgb.b) * 0.8))
      }
      const lighter200 = {
        r: Math.min(255, Math.round(primaryRgb.r + (255 - primaryRgb.r) * 0.6)),
        g: Math.min(255, Math.round(primaryRgb.g + (255 - primaryRgb.g) * 0.6)),
        b: Math.min(255, Math.round(primaryRgb.b + (255 - primaryRgb.b) * 0.6))
      }
      const lighter300 = {
        r: Math.min(255, Math.round(primaryRgb.r + (255 - primaryRgb.r) * 0.4)),
        g: Math.min(255, Math.round(primaryRgb.g + (255 - primaryRgb.g) * 0.4)),
        b: Math.min(255, Math.round(primaryRgb.b + (255 - primaryRgb.b) * 0.4))
      }
      
      // Darker shades (600, 700)
      const darker600 = {
        r: Math.max(0, Math.round(primaryRgb.r * 0.8)),
        g: Math.max(0, Math.round(primaryRgb.g * 0.8)),
        b: Math.max(0, Math.round(primaryRgb.b * 0.8))
      }
      const darker700 = {
        r: Math.max(0, Math.round(primaryRgb.r * 0.7)),
        g: Math.max(0, Math.round(primaryRgb.g * 0.7)),
        b: Math.max(0, Math.round(primaryRgb.b * 0.7))
      }
      
      root.style.setProperty('--color-primary-50', `${lighter50.r}, ${lighter50.g}, ${lighter50.b}`)
      root.style.setProperty('--color-primary-100', `${lighter100.r}, ${lighter100.g}, ${lighter100.b}`)
      root.style.setProperty('--color-primary-200', `${lighter200.r}, ${lighter200.g}, ${lighter200.b}`)
      root.style.setProperty('--color-primary-300', `${lighter300.r}, ${lighter300.g}, ${lighter300.b}`)
      root.style.setProperty('--color-primary-600', `${darker600.r}, ${darker600.g}, ${darker600.b}`)
      root.style.setProperty('--color-primary-700', `${darker700.r}, ${darker700.g}, ${darker700.b}`)
    }

    // Secondary ve accent renkleri için de RGB değerlerini ayarla
    const secondaryRgb = hexToRgb(currentPalette.secondary)
    if (secondaryRgb) {
      root.style.setProperty('--color-secondary-rgb', `${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}`)
    }

    const accentRgb = hexToRgb(currentPalette.accent)
    if (accentRgb) {
      root.style.setProperty('--color-accent-rgb', `${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}`)
    }

    // Local storage'a kaydet
    localStorage.setItem('colorPalette', JSON.stringify(currentPalette))
    
    console.log('Renk paleti kaydediliyor:', currentPalette)
    alert('Renk paleti başarıyla kaydedildi! Ana sayfaya giderek değişiklikleri görebilirsiniz.')
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  // Sayfa yüklendiğinde kaydedilmiş renkleri uygula
  useEffect(() => {
    const savedPalette = localStorage.getItem('colorPalette')
    if (savedPalette) {
      const palette = JSON.parse(savedPalette)
      setCurrentPalette(palette)
      
      // Renkleri uygula
      const root = document.documentElement
      root.style.setProperty('--color-primary', palette.primary)
      root.style.setProperty('--color-secondary', palette.secondary)
      root.style.setProperty('--color-accent', palette.accent)
      root.style.setProperty('--color-background', palette.background)
      root.style.setProperty('--color-surface', palette.surface)
      root.style.setProperty('--color-text', palette.text)
      root.style.setProperty('--color-text-secondary', palette.textSecondary)
      root.style.setProperty('--color-border', palette.border)

      // Primary renk için RGB değerlerini hesapla ve ayarla
      const primaryRgb = hexToRgb(palette.primary)
      if (primaryRgb) {
        root.style.setProperty('--color-primary-rgb', `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`)
        
        // Lighter shades (50, 100, 200, 300)
        const lighter50 = {
          r: Math.min(255, Math.round(primaryRgb.r + (255 - primaryRgb.r) * 0.9)),
          g: Math.min(255, Math.round(primaryRgb.g + (255 - primaryRgb.g) * 0.9)),
          b: Math.min(255, Math.round(primaryRgb.b + (255 - primaryRgb.b) * 0.9))
        }
        const lighter100 = {
          r: Math.min(255, Math.round(primaryRgb.r + (255 - primaryRgb.r) * 0.8)),
          g: Math.min(255, Math.round(primaryRgb.g + (255 - primaryRgb.g) * 0.8)),
          b: Math.min(255, Math.round(primaryRgb.b + (255 - primaryRgb.b) * 0.8))
        }
        const lighter200 = {
          r: Math.min(255, Math.round(primaryRgb.r + (255 - primaryRgb.r) * 0.6)),
          g: Math.min(255, Math.round(primaryRgb.g + (255 - primaryRgb.g) * 0.6)),
          b: Math.min(255, Math.round(primaryRgb.b + (255 - primaryRgb.b) * 0.6))
        }
        const lighter300 = {
          r: Math.min(255, Math.round(primaryRgb.r + (255 - primaryRgb.r) * 0.4)),
          g: Math.min(255, Math.round(primaryRgb.g + (255 - primaryRgb.g) * 0.4)),
          b: Math.min(255, Math.round(primaryRgb.b + (255 - primaryRgb.b) * 0.4))
        }
        
        // Darker shades (600, 700)
        const darker600 = {
          r: Math.max(0, Math.round(primaryRgb.r * 0.8)),
          g: Math.max(0, Math.round(primaryRgb.g * 0.8)),
          b: Math.max(0, Math.round(primaryRgb.b * 0.8))
        }
        const darker700 = {
          r: Math.max(0, Math.round(primaryRgb.r * 0.7)),
          g: Math.max(0, Math.round(primaryRgb.g * 0.7)),
          b: Math.max(0, Math.round(primaryRgb.b * 0.7))
        }
        
        root.style.setProperty('--color-primary-50', `${lighter50.r}, ${lighter50.g}, ${lighter50.b}`)
        root.style.setProperty('--color-primary-100', `${lighter100.r}, ${lighter100.g}, ${lighter100.b}`)
        root.style.setProperty('--color-primary-200', `${lighter200.r}, ${lighter200.g}, ${lighter200.b}`)
        root.style.setProperty('--color-primary-300', `${lighter300.r}, ${lighter300.g}, ${lighter300.b}`)
        root.style.setProperty('--color-primary-600', `${darker600.r}, ${darker600.g}, ${darker600.b}`)
        root.style.setProperty('--color-primary-700', `${darker700.r}, ${darker700.g}, ${darker700.b}`)
      }

      console.log('Kaydedilmiş renkler uygulandı:', palette)
    }
  }, [])

  const exportPalette = () => {
    const dataStr = JSON.stringify(currentPalette, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'renk-paleti.json'
    link.click()
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Renkler & Tema</h1>
          <p className="text-gray-600">Website'nizin renk paletini ve tema ayarlarını yönetin</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 ${
              previewMode 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Eye size={16} />
            {previewMode ? 'Önizleme Açık' : 'Önizleme'}
          </button>
          <button
            onClick={exportPalette}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
          >
            <Download size={16} />
            Dışa Aktar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Color Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Colors */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Palette size={20} />
              Renk Düzenleyici
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {colorCategories.map((category) => (
                <div key={category.key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {category.name}
                  </label>
                  <p className="text-xs text-gray-500 mb-2">{category.description}</p>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={currentPalette[category.key as keyof ColorPalette]}
                      onChange={(e) => handleColorChange(category.key as keyof ColorPalette, e.target.value)}
                      className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentPalette[category.key as keyof ColorPalette]}
                      onChange={(e) => handleColorChange(category.key as keyof ColorPalette, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          {previewMode && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Önizleme</h3>
              <div 
                className="rounded-lg p-6 space-y-4"
                style={{ backgroundColor: currentPalette.background }}
              >
                <div 
                  className="rounded-lg p-4"
                  style={{ backgroundColor: currentPalette.surface }}
                >
                  <h4 
                    className="text-xl font-bold mb-2"
                    style={{ color: currentPalette.text }}
                  >
                    Örnek Başlık
                  </h4>
                  <p 
                    className="mb-4"
                    style={{ color: currentPalette.textSecondary }}
                  >
                    Bu bir örnek paragraf metnidir. Bu şekilde renkler nasıl görünecek?
                  </p>
                  <div className="flex gap-2">
                    <button 
                      className="px-4 py-2 rounded-lg text-white font-medium"
                      style={{ backgroundColor: currentPalette.primary }}
                    >
                      Ana Buton
                    </button>
                    <button 
                      className="px-4 py-2 rounded-lg text-white font-medium"
                      style={{ backgroundColor: currentPalette.secondary }}
                    >
                      İkincil Buton
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={savePalette}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2 font-medium"
            >
              <Save size={16} />
              Değişiklikleri Kaydet
            </button>
            <button
              onClick={resetToDefault}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Varsayılana Dön
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Saved Palettes */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Kayıtlı Temalar</h3>
            <div className="space-y-3">
              {savedPalettes.map((palette, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{palette.name}</p>
                      <div className="flex gap-1 mt-1">
                        {Object.values(palette.colors).slice(0, 4).map((color, colorIndex) => (
                          <div
                            key={colorIndex}
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => applyPalette(palette.colors)}
                      className="opacity-0 group-hover:opacity-100 px-2 py-1 text-xs bg-blue-600 text-white rounded transition-opacity duration-200"
                    >
                      Uygula
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
              <Lightbulb size={18} />
              İpuçları
            </h3>
            <div className="space-y-3 text-sm text-blue-800">
              <p>• Kontrastı yüksek renkler seçin (metin okunabilirliği için)</p>
              <p>• Ana renginiz markanızı yansıtmalı</p>
              <p>• Çok fazla farklı renk kullanmaktan kaçının</p>
              <p>• Değişiklikleri kaydetmeden önce önizlemeyi kontrol edin</p>
            </div>
          </div>

          {/* Color Harmony */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles size={18} />
              Renk Uyumu
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Monokromatik:</strong> Aynı rengin farklı tonları</p>
              <p><strong>Analog:</strong> Renk çemberinde yan yana olan renkler</p>
              <p><strong>Tamamlayıcı:</strong> Karşıt renkler (mavi-turuncu)</p>
              <p><strong>Üçgen:</strong> Eşit mesafeli üç renk</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorManager 