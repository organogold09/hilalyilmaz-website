import mysql from 'mysql2/promise'

// MySQL bağlantı havuzu
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'hilalyilmaz_website',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
})

// Veritabanı bağlantısını test et
export async function testConnection() {
  try {
    const connection = await pool.getConnection()
    console.log('✅ MySQL bağlantısı başarılı')
    connection.release()
    return true
  } catch (error) {
    console.error('❌ MySQL bağlantı hatası:', error)
    return false
  }
}

export default pool 