import React from 'react'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hilal Yılmaz - Yazar',
  description: 'Türk edebiyatının genç ve yetenekli yazarı Hilal Yılmaz\'ın resmi websitesi. Kitapları, yazıları ve kişisel bloguna buradan ulaşabilirsiniz.',
  keywords: ['Hilal Yılmaz', 'yazar', 'kitap', 'Türk edebiyatı', 'roman', 'hikaye'],
  authors: [{ name: 'Hilal Yılmaz' }],
  creator: 'Hilal Yılmaz',
  publisher: 'Hilal Yılmaz',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Hilal Yılmaz - Yazar',
    description: 'Türk edebiyatının genç ve yetenekli yazarı Hilal Yılmaz\'ın resmi websitesi.',
    url: 'https://hilalyilmazhy.com',
    siteName: 'Hilal Yılmaz',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hilal Yılmaz - Yazar',
    description: 'Türk edebiyatının genç ve yetenekli yazarı Hilal Yılmaz\'ın resmi websitesi.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Load favicon from localStorage
                  const savedSettings = localStorage.getItem('siteSettings');
                  if (savedSettings) {
                    const settings = JSON.parse(savedSettings);
                    if (settings.favicon) {
                      let link = document.querySelector("link[rel*='icon']");
                      if (!link) {
                        link = document.createElement('link');
                        link.rel = 'icon';
                        document.head.appendChild(link);
                      }
                      link.href = settings.favicon;
                    }
                  }

                  // Hex to RGB function
                  function hexToRgb(hex) {
                    const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
                    return result ? {
                      r: parseInt(result[1], 16),
                      g: parseInt(result[2], 16),
                      b: parseInt(result[3], 16)
                    } : null;
                  }

                  // Apply colors to DOM
                  function applyColors(palette) {
                    const root = document.documentElement;
                    
                    // Temel renkleri ayarla
                    root.style.setProperty('--color-primary', palette.primary);
                    root.style.setProperty('--color-secondary', palette.secondary);
                    root.style.setProperty('--color-accent', palette.accent);
                    root.style.setProperty('--color-background', palette.background);
                    root.style.setProperty('--color-surface', palette.surface);
                    root.style.setProperty('--color-text', palette.text);
                    root.style.setProperty('--color-text-secondary', palette.textSecondary);
                    root.style.setProperty('--color-border', palette.border);
                    
                    // Primary renk tonlarını hesapla
                    const primaryRgb = hexToRgb(palette.primary);
                    if (primaryRgb) {
                      root.style.setProperty('--color-primary-rgb', primaryRgb.r + ', ' + primaryRgb.g + ', ' + primaryRgb.b);
                      
                      // Lighter shades
                      const lighter50 = {
                        r: Math.min(255, Math.round(primaryRgb.r + (255 - primaryRgb.r) * 0.9)),
                        g: Math.min(255, Math.round(primaryRgb.g + (255 - primaryRgb.g) * 0.9)),
                        b: Math.min(255, Math.round(primaryRgb.b + (255 - primaryRgb.b) * 0.9))
                      };
                      const lighter100 = {
                        r: Math.min(255, Math.round(primaryRgb.r + (255 - primaryRgb.r) * 0.8)),
                        g: Math.min(255, Math.round(primaryRgb.g + (255 - primaryRgb.g) * 0.8)),
                        b: Math.min(255, Math.round(primaryRgb.b + (255 - primaryRgb.b) * 0.8))
                      };
                      
                      // Darker shades
                      const darker600 = {
                        r: Math.max(0, Math.round(primaryRgb.r * 0.8)),
                        g: Math.max(0, Math.round(primaryRgb.g * 0.8)),
                        b: Math.max(0, Math.round(primaryRgb.b * 0.8))
                      };
                      const darker700 = {
                        r: Math.max(0, Math.round(primaryRgb.r * 0.7)),
                        g: Math.max(0, Math.round(primaryRgb.g * 0.7)),
                        b: Math.max(0, Math.round(primaryRgb.b * 0.7))
                      };
                      
                      root.style.setProperty('--color-primary-50', lighter50.r + ', ' + lighter50.g + ', ' + lighter50.b);
                      root.style.setProperty('--color-primary-100', lighter100.r + ', ' + lighter100.g + ', ' + lighter100.b);
                      root.style.setProperty('--color-primary-600', darker600.r + ', ' + darker600.g + ', ' + darker600.b);
                      root.style.setProperty('--color-primary-700', darker700.r + ', ' + darker700.g + ', ' + darker700.b);
                    }
                  }

                  // Load active color palette from database
                  fetch('/api/colors?active=true')
                    .then(response => {
                      if (response.ok) {
                        return response.json();
                      }
                      throw new Error('API failed');
                    })
                    .then(data => {
                      console.log('Aktif renk paleti veritabanından yüklendi:', data);
                      applyColors(data.colors);
                      // localStorage'a da kaydet (yedek olarak)
                      localStorage.setItem('colorPalette', JSON.stringify(data.colors));
                    })
                    .catch(error => {
                      console.log('Veritabanından renk yüklenemedi, localStorage deneniyor...', error);
                      
                      // Fallback to localStorage
                      const savedPalette = localStorage.getItem('colorPalette');
                      if (savedPalette) {
                        const palette = JSON.parse(savedPalette);
                        applyColors(palette);
                        console.log('Renk paleti localStorage\'dan yüklendi');
                      } else {
                        console.log('Hiçbir renk paleti bulunamadı, varsayılan renkler kullanılacak');
                      }
                    });

                } catch (e) {
                  console.log('Settings loading error:', e);
                }
              })();
            `
          }}
        />
      </head>
      <body className="antialiased bg-secondary-50">
        {children}
      </body>
    </html>
  )
} 