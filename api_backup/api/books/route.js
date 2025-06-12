import { NextResponse } from 'next/server';
import pool from '@/lib/database';

// GET - Tüm kitapları getir
export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    const [rows] = await connection.execute(
      'SELECT * FROM books ORDER BY created_at DESC'
    );
    
    connection.release();
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Kitaplar getirme hatası:', error);
    return NextResponse.json(
      { error: 'Kitaplar getirilemedi' },
      { status: 500 }
    );
  }
}

// POST - Yeni kitap ekle
export async function POST(request) {
  try {
    const book = await request.json();
    const connection = await pool.getConnection();
    
    const [result] = await connection.execute(
      `INSERT INTO books (title, description, cover_image, publish_date, isbn, price, amazon_link) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        book.title,
        book.description,
        book.cover_image,
        book.publish_date,
        book.isbn,
        book.price,
        book.amazon_link
      ]
    );
    
    connection.release();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Kitap başarıyla eklendi',
      id: result.insertId 
    });
  } catch (error) {
    console.error('Kitap ekleme hatası:', error);
    return NextResponse.json(
      { error: 'Kitap eklenemedi' },
      { status: 500 }
    );
  }
} 