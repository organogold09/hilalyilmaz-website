import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import { RowDataPacket, ResultSetHeader } from 'mysql2'

interface Book {
  id?: number
  title: string
  description: string
  excerpt: string
  price: number
  currency: string
  amazon_link: string
  cover_image: string
  publish_date: string
  isbn: string
  page_count: number
  genre: string
  status: 'published' | 'draft' | 'coming-soon'
  featured: boolean
  tags: string[]
}

// GET - Tüm kitapları getir
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const featured = searchParams.get('featured')

    let query = 'SELECT * FROM books'
    const conditions: string[] = []
    const params: any[] = []

    if (status) {
      conditions.push('status = ?')
      params.push(status)
    }

    if (featured === 'true') {
      conditions.push('featured = TRUE')
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ')
    }

    query += ' ORDER BY featured DESC, updated_at DESC'

    const [rows] = await pool.execute<RowDataPacket[]>(query, params)

    const books = rows.map(row => ({
      id: row.id,
      title: row.title,
      description: row.description,
      excerpt: row.excerpt,
      price: row.price,
      currency: row.currency,
      amazon_link: row.amazon_link,
      cover_image: row.cover_image,
      publish_date: row.publish_date,
      isbn: row.isbn,
      page_count: row.page_count,
      genre: row.genre,
      status: row.status,
      featured: row.featured,
      tags: row.tags ? JSON.parse(row.tags) : []
    }))

    return NextResponse.json(books)
  } catch (error) {
    console.error('Kitapları getirme hatası:', error)
    return NextResponse.json({ 
      error: 'Sunucu hatası' 
    }, { status: 500 })
  }
}

// POST - Yeni kitap ekle veya güncelle
export async function POST(request: NextRequest) {
  try {
    const body: Book = await request.json()

    // Admin session kontrolü
    const adminSession = request.headers.get('x-admin-session')
    if (!adminSession) {
      return NextResponse.json({ 
        error: 'Yetkisiz erişim' 
      }, { status: 401 })
    }

    const tagsJson = JSON.stringify(body.tags || [])

    if (body.id) {
      // Güncelle
      await pool.execute(
        `UPDATE books SET 
         title = ?, description = ?, excerpt = ?, price = ?, currency = ?,
         amazon_link = ?, cover_image = ?, publish_date = ?, isbn = ?,
         page_count = ?, genre = ?, status = ?, featured = ?, tags = ?,
         updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [
          body.title, body.description, body.excerpt, body.price, body.currency,
          body.amazon_link, body.cover_image, body.publish_date, body.isbn,
          body.page_count, body.genre, body.status, body.featured, tagsJson,
          body.id
        ]
      )

      return NextResponse.json({ 
        success: true, 
        message: 'Kitap başarıyla güncellendi',
        id: body.id
      })
    } else {
      // Yeni kitap ekle
      const [result] = await pool.execute<ResultSetHeader>(
        `INSERT INTO books 
         (title, description, excerpt, price, currency, amazon_link, 
          cover_image, publish_date, isbn, page_count, genre, status, featured, tags) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          body.title, body.description, body.excerpt, body.price, body.currency,
          body.amazon_link, body.cover_image, body.publish_date, body.isbn,
          body.page_count, body.genre, body.status, body.featured, tagsJson
        ]
      )

      return NextResponse.json({ 
        success: true, 
        message: 'Kitap başarıyla eklendi',
        id: result.insertId
      })
    }

  } catch (error) {
    console.error('Kitap kaydetme hatası:', error)
    return NextResponse.json({ 
      error: 'Sunucu hatası' 
    }, { status: 500 })
  }
}

// DELETE - Kitap sil
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ 
        error: 'Kitap ID gerekli' 
      }, { status: 400 })
    }

    // Admin session kontrolü
    const adminSession = request.headers.get('x-admin-session')
    if (!adminSession) {
      return NextResponse.json({ 
        error: 'Yetkisiz erişim' 
      }, { status: 401 })
    }

    await pool.execute('DELETE FROM books WHERE id = ?', [id])

    return NextResponse.json({ 
      success: true, 
      message: 'Kitap başarıyla silindi' 
    })

  } catch (error) {
    console.error('Kitap silme hatası:', error)
    return NextResponse.json({ 
      error: 'Sunucu hatası' 
    }, { status: 500 })
  }
} 