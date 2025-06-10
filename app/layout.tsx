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
                  const savedPalette = localStorage.getItem('colorPalette');
                  if (savedPalette) {
                    const palette = JSON.parse(savedPalette);
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
                    
                    // Hex to RGB function
                    function hexToRgb(hex) {
                      const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
                      return result ? {
                        r: parseInt(result[1], 16),
                        g: parseInt(result[2], 16),
                        b: parseInt(result[3], 16)
                      } : null;
                    }
                    
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
                } catch (e) {
                  console.log('Color loading error:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-secondary-50">
        {children}
      </body>
    </html>
  )
} 