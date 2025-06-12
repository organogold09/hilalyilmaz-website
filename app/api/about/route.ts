import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import { RowDataPacket, ResultSetHeader } from 'mysql2'

interface AboutContent {
  id?: number
  title: string
  subtitle: string
  biography: string
  personal_quote: string
  profile_image: string
  writing_journey: string
  inspiration: string
  achievements: string[]
  hobbies: string[]
  favorite_books: string[]
}

// GET - Hakkımda içeriğini getir
export async function GET() {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM about_content ORDER BY updated_at DESC LIMIT 1'
    )

    if (rows.length === 0) {
      return NextResponse.json({ 
        error: 'Hakkımda içeriği bulunamadı' 
      }, { status: 404 })
    }

    const content = rows[0]
    
    // JSON alanları parse et
    const aboutContent: AboutContent = {
      id: content.id,
      title: content.title,
      subtitle: content.subtitle,
      biography: content.biography,
      personal_quote: content.personal_quote,
      profile_image: content.profile_image,
      writing_journey: content.writing_journey,
      inspiration: content.inspiration,
      achievements: content.achievements ? JSON.parse(content.achievements) : [],
      hobbies: content.hobbies ? JSON.parse(content.hobbies) : [],
      favorite_books: content.favorite_books ? JSON.parse(content.favorite_books) : []
    }

    return NextResponse.json(aboutContent)
  } catch (error) {
    console.error('Hakkımda içeriği getirme hatası:', error)
    return NextResponse.json({ 
      error: 'Sunucu hatası' 
    }, { status: 500 })
  }
}

// POST - Hakkımda içeriğini güncelle
export async function POST(request: NextRequest) {
  try {
    const body: AboutContent = await request.json()

    // Admin session kontrolü (basit kontrol)
    const adminSession = request.headers.get('x-admin-session')
    if (!adminSession) {
      return NextResponse.json({ 
        error: 'Yetkisiz erişim' 
      }, { status: 401 })
    }

    // Mevcut içeriği kontrol et
    const [existingRows] = await pool.execute<RowDataPacket[]>(
      'SELECT id FROM about_content LIMIT 1'
    )

    const achievementsJson = JSON.stringify(body.achievements || [])
    const hobbiesJson = JSON.stringify(body.hobbies || [])
    const favoriteBooksJson = JSON.stringify(body.favorite_books || [])

    if (existingRows.length > 0) {
      // Güncelle
      await pool.execute(
        `UPDATE about_content SET 
         title = ?, subtitle = ?, biography = ?, personal_quote = ?, 
         profile_image = ?, writing_journey = ?, inspiration = ?,
         achievements = ?, hobbies = ?, favorite_books = ?,
         updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [
          body.title, body.subtitle, body.biography, body.personal_quote,
          body.profile_image, body.writing_journey, body.inspiration,
          achievementsJson, hobbiesJson, favoriteBooksJson,
          existingRows[0].id
        ]
      )
    } else {
      // Yeni kayıt ekle
      await pool.execute(
        `INSERT INTO about_content 
         (title, subtitle, biography, personal_quote, profile_image, 
          writing_journey, inspiration, achievements, hobbies, favorite_books) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          body.title, body.subtitle, body.biography, body.personal_quote,
          body.profile_image, body.writing_journey, body.inspiration,
          achievementsJson, hobbiesJson, favoriteBooksJson
        ]
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Hakkımda içeriği başarıyla güncellendi' 
    })

  } catch (error) {
    console.error('Hakkımda içeriği güncelleme hatası:', error)
    return NextResponse.json({ 
      error: 'Sunucu hatası' 
    }, { status: 500 })
  }
} 