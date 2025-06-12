import { NextResponse } from 'next/server';
import pool from '@/lib/database';

// GET - Tüm ayarları getir
export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    const [rows] = await connection.execute(
      'SELECT setting_key, setting_value FROM site_settings'
    );
    
    connection.release();
    
    // Ayarları objeye çevir
    const settings = {};
    rows.forEach(row => {
      try {
        // JSON string'leri parse et
        settings[row.setting_key] = JSON.parse(row.setting_value);
      } catch {
        // String değerleri olduğu gibi kullan
        settings[row.setting_key] = row.setting_value;
      }
    });
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Ayarlar getirme hatası:', error);
    return NextResponse.json(
      { error: 'Ayarlar getirilemedi' },
      { status: 500 }
    );
  }
}

// POST - Ayarları güncelle
export async function POST(request) {
  try {
    const settings = await request.json();
    const connection = await pool.getConnection();
    
    // Her ayarı güncelle
    for (const [key, value] of Object.entries(settings)) {
      const stringValue = typeof value === 'object' ? JSON.stringify(value) : value;
      
      await connection.execute(
        'INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
        [key, stringValue, stringValue]
      );
    }
    
    connection.release();
    
    return NextResponse.json({ success: true, message: 'Ayarlar başarıyla kaydedildi' });
  } catch (error) {
    console.error('Ayarlar kaydetme hatası:', error);
    return NextResponse.json(
      { error: 'Ayarlar kaydedilemedi' },
      { status: 500 }
    );
  }
} 