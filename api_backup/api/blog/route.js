import { NextResponse } from 'next/server';
import pool from '@/lib/database';

// GET - Tüm blog yazılarını getir
export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    const [rows] = await connection.execute(
      'SELECT * FROM blog_posts ORDER BY created_at DESC'
    );
    
    connection.release();
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Blog yazıları getirme hatası:', error);
    return NextResponse.json(
      { error: 'Blog yazıları getirilemedi' },
      { status: 500 }
    );
  }
}

// POST - Yeni blog yazısı ekle
export async function POST(request) {
  try {
    const post = await request.json();
    const connection = await pool.getConnection();
    
    const [result] = await connection.execute(
      `INSERT INTO blog_posts (title, content, excerpt, featured_image, author, status, published_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        post.title,
        post.content,
        post.excerpt,
        post.featured_image,
        post.author || 'Hilal Yılmaz',
        post.status || 'draft',
        post.status === 'published' ? new Date() : null
      ]
    );
    
    connection.release();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Blog yazısı başarıyla eklendi',
      id: result.insertId 
    });
  } catch (error) {
    console.error('Blog yazısı ekleme hatası:', error);
    return NextResponse.json(
      { error: 'Blog yazısı eklenemedi' },
      { status: 500 }
    );
  }
} 