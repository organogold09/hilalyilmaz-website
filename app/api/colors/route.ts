import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import { ResultSetHeader } from 'mysql2'

// Query helper function
async function query(sql: string, params?: any[]): Promise<any[] | ResultSetHeader> {
  const connection = await pool.getConnection()
  try {
    const [results] = await connection.execute(sql, params)
    return results as any[] | ResultSetHeader
  } finally {
    connection.release()
  }
}

// GET - Renk paletlerini getir
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const active = searchParams.get('active')
    
    if (active === 'true') {
      // Sadece aktif paleti getir
      const result = await query(
        'SELECT * FROM color_palettes WHERE is_active = TRUE LIMIT 1'
      ) as any[]
      
      if (result.length === 0) {
        return NextResponse.json({ error: 'Aktif renk paleti bulunamadı' }, { status: 404 })
      }
      
      const palette = result[0]
      return NextResponse.json({
        id: palette.id,
        name: palette.palette_name,
        colors: JSON.parse(palette.colors),
        isActive: palette.is_active,
        createdAt: palette.created_at
      })
    } else {
      // Tüm paletleri getir
      const result = await query(
        'SELECT * FROM color_palettes ORDER BY is_active DESC, created_at DESC'
      ) as any[]
      
      const palettes = result.map((palette: any) => ({
        id: palette.id,
        name: palette.palette_name,
        colors: JSON.parse(palette.colors),
        isActive: palette.is_active,
        createdAt: palette.created_at,
        createdBy: palette.created_by
      }))
      
      return NextResponse.json(palettes)
    }
  } catch (error) {
    console.error('Renk paletleri getirme hatası:', error)
    return NextResponse.json(
      { error: 'Renk paletleri getirilemedi' },
      { status: 500 }
    )
  }
}

// POST - Yeni renk paleti oluştur veya güncelle
export async function POST(request: NextRequest) {
  try {
    // Admin session kontrolü
    const adminSession = request.headers.get('x-admin-session')
    if (!adminSession) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const body = await request.json()
    const { id, name, colors, isActive } = body

    if (!name || !colors) {
      return NextResponse.json(
        { error: 'Palet adı ve renkler gereklidir' },
        { status: 400 }
      )
    }

    if (id) {
      // Güncelleme
      if (isActive) {
        // Önce diğer tüm paletleri pasif yap
        await query('UPDATE color_palettes SET is_active = FALSE')
      }
      
      const result = await query(
        `UPDATE color_palettes 
         SET palette_name = ?, colors = ?, is_active = ?, updated_at = NOW()
         WHERE id = ?`,
        [name, JSON.stringify(colors), isActive || false, id]
      ) as ResultSetHeader

      if (result.affectedRows === 0) {
        return NextResponse.json({ error: 'Palet bulunamadı' }, { status: 404 })
      }

      return NextResponse.json({ 
        message: 'Renk paleti başarıyla güncellendi',
        id: id
      })
    } else {
      // Yeni palet oluşturma
      if (isActive) {
        // Önce diğer tüm paletleri pasif yap
        await query('UPDATE color_palettes SET is_active = FALSE')
      }
      
      const result = await query(
        `INSERT INTO color_palettes (palette_name, colors, is_active, created_by)
         VALUES (?, ?, ?, ?)`,
        [name, JSON.stringify(colors), isActive || false, 'admin']
      ) as ResultSetHeader

      return NextResponse.json({ 
        message: 'Renk paleti başarıyla oluşturuldu',
        id: result.insertId
      })
    }
  } catch (error) {
    console.error('Renk paleti kaydetme hatası:', error)
    return NextResponse.json(
      { error: 'Renk paleti kaydedilemedi' },
      { status: 500 }
    )
  }
}

// PUT - Aktif paleti değiştir
export async function PUT(request: NextRequest) {
  try {
    // Admin session kontrolü
    const adminSession = request.headers.get('x-admin-session')
    if (!adminSession) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Palet ID gereklidir' },
        { status: 400 }
      )
    }

    // Önce tüm paletleri pasif yap
    await query('UPDATE color_palettes SET is_active = FALSE')
    
    // Seçilen paleti aktif yap
    const result = await query(
      'UPDATE color_palettes SET is_active = TRUE WHERE id = ?',
      [id]
    ) as ResultSetHeader

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Palet bulunamadı' }, { status: 404 })
    }

    return NextResponse.json({ 
      message: 'Aktif palet başarıyla değiştirildi'
    })
  } catch (error) {
    console.error('Aktif palet değiştirme hatası:', error)
    return NextResponse.json(
      { error: 'Aktif palet değiştirilemedi' },
      { status: 500 }
    )
  }
}

// DELETE - Renk paleti sil
export async function DELETE(request: NextRequest) {
  try {
    // Admin session kontrolü
    const adminSession = request.headers.get('x-admin-session')
    if (!adminSession) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Palet ID gereklidir' },
        { status: 400 }
      )
    }

    // Aktif paleti silmeye izin verme
    const activeCheck = await query(
      'SELECT is_active FROM color_palettes WHERE id = ?',
      [id]
    ) as any[]

    if (activeCheck.length > 0 && activeCheck[0].is_active) {
      return NextResponse.json(
        { error: 'Aktif palet silinemez' },
        { status: 400 }
      )
    }

    const result = await query(
      'DELETE FROM color_palettes WHERE id = ?',
      [id]
    ) as ResultSetHeader

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Palet bulunamadı' }, { status: 404 })
    }

    return NextResponse.json({ 
      message: 'Renk paleti başarıyla silindi'
    })
  } catch (error) {
    console.error('Renk paleti silme hatası:', error)
    return NextResponse.json(
      { error: 'Renk paleti silinemedi' },
      { status: 500 }
    )
  }
} 