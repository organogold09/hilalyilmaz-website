const mysql = require('mysql2/promise');

// Veritabanı bağlantı konfigürasyonu
const dbConfig = {
  host: 'localhost',
  user: 'u813608202_main_kayit',
  password: 'Jupiter1984/',
  database: 'u813608202_main_kayit',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Bağlantı havuzu oluştur
const pool = mysql.createPool(dbConfig);

// Veritabanı tablolarını oluştur
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Site ayarları tablosu
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id INT PRIMARY KEY AUTO_INCREMENT,
        setting_key VARCHAR(255) UNIQUE NOT NULL,
        setting_value TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Kitaplar tablosu
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS books (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        cover_image VARCHAR(500),
        publish_date DATE,
        isbn VARCHAR(50),
        price DECIMAL(10,2),
        amazon_link VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Blog yazıları tablosu
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        content LONGTEXT,
        excerpt TEXT,
        featured_image VARCHAR(500),
        author VARCHAR(100),
        status ENUM('draft', 'published') DEFAULT 'draft',
        published_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Medya dosyaları tablosu
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS media_files (
        id INT PRIMARY KEY AUTO_INCREMENT,
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255),
        file_path VARCHAR(500) NOT NULL,
        file_size INT,
        mime_type VARCHAR(100),
        alt_text VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Varsayılan site ayarlarını ekle
    await connection.execute(`
      INSERT IGNORE INTO site_settings (setting_key, setting_value) VALUES
      ('siteName', 'Hilal Yılmaz - Yazar'),
      ('siteDescription', 'Genç Türk yazarı Hilal Yılmaz\'ın resmi websitesi. Kitaplar, blog yazıları ve daha fazlası.'),
      ('siteUrl', 'https://hilalyilmazhy.com'),
      ('email', 'hilal@hilalyilmazhy.com'),
      ('phone', '+90 555 123 45 67'),
      ('address', 'İstanbul, Türkiye'),
      ('metaKeywords', 'hilal yılmaz, türk yazarı, kitap, roman, edebiyat, genç yazar'),
      ('favicon', ''),
      ('socialMedia', '{"facebook":"https://facebook.com/hilalyilmazhy","twitter":"https://twitter.com/hilalyilmazhy","instagram":"https://instagram.com/hilalyilmazhy","linkedin":"https://linkedin.com/in/hilalyilmazhy","youtube":"https://youtube.com/@hilalyilmazhy"}'),
      ('seo', '{"enableSitemap":true,"enableRobots":true,"googleAnalytics":"G-XXXXXXXXXX","googleSearchConsole":""}'),
      ('performance', '{"enableCaching":true,"enableCompression":true,"enableLazyLoading":true}'),
      ('notifications', '{"emailNotifications":true,"pushNotifications":false,"adminAlerts":true}')
    `);

    connection.release();
    console.log('Veritabanı tabloları başarıyla oluşturuldu');
  } catch (error) {
    console.error('Veritabanı başlatma hatası:', error);
  }
}

// Veritabanını başlat
initializeDatabase();

module.exports = pool; 