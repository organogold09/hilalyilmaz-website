-- İçerik Yönetimi Tabloları
-- Hilal Yılmaz Website Content Management

-- Hakkımda İçeriği Tablosu
CREATE TABLE IF NOT EXISTS about_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL DEFAULT 'Hakkımda',
    subtitle VARCHAR(255) DEFAULT '',
    biography TEXT,
    personal_quote TEXT,
    profile_image VARCHAR(500),
    writing_journey TEXT,
    inspiration TEXT,
    achievements JSON,
    hobbies JSON,
    favorite_books JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT,
    
    FOREIGN KEY (updated_by) REFERENCES admin_users(id) ON DELETE SET NULL,
    INDEX idx_updated_at (updated_at)
);

-- Kitaplar Tablosu
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    excerpt TEXT,
    price DECIMAL(10,2),
    currency VARCHAR(10) DEFAULT '₺',
    amazon_link VARCHAR(500),
    cover_image VARCHAR(500),
    publish_date DATE,
    isbn VARCHAR(50),
    page_count INT,
    genre VARCHAR(100),
    status ENUM('published', 'draft', 'coming-soon') DEFAULT 'draft',
    featured BOOLEAN DEFAULT FALSE,
    tags JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    
    FOREIGN KEY (created_by) REFERENCES admin_users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_featured (featured),
    INDEX idx_publish_date (publish_date)
);

-- Blog Yazıları Tablosu
CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content LONGTEXT,
    excerpt TEXT,
    featured_image VARCHAR(500),
    status ENUM('published', 'draft', 'scheduled') DEFAULT 'draft',
    featured BOOLEAN DEFAULT FALSE,
    publish_date TIMESTAMP NULL,
    meta_title VARCHAR(255),
    meta_description TEXT,
    tags JSON,
    categories JSON,
    read_time INT DEFAULT 0,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    author_id INT,
    
    FOREIGN KEY (author_id) REFERENCES admin_users(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_featured (featured),
    INDEX idx_publish_date (publish_date)
);

-- Site Ayarları Tablosu
CREATE TABLE IF NOT EXISTS site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value LONGTEXT,
    setting_type ENUM('text', 'json', 'boolean', 'number') DEFAULT 'text',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT,
    
    FOREIGN KEY (updated_by) REFERENCES admin_users(id) ON DELETE SET NULL,
    INDEX idx_setting_key (setting_key)
);

-- Medya Dosyaları Tablosu
CREATE TABLE IF NOT EXISTS media_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT,
    mime_type VARCHAR(100),
    alt_text VARCHAR(255),
    caption TEXT,
    file_type ENUM('image', 'document', 'video', 'audio', 'other') DEFAULT 'other',
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_by INT,
    
    FOREIGN KEY (uploaded_by) REFERENCES admin_users(id) ON DELETE SET NULL,
    INDEX idx_file_type (file_type),
    INDEX idx_uploaded_at (uploaded_at)
);

-- Varsayılan Hakkımda İçeriği
INSERT IGNORE INTO about_content (
    title,
    subtitle,
    biography,
    personal_quote,
    writing_journey,
    inspiration,
    achievements,
    hobbies,
    favorite_books
) VALUES (
    'Hakkımda',
    'Genç Türk Yazarı',
    'Merhaba! Ben Hilal Yılmaz. Kelimelerle düşünceleri, hikayelerle hayatları değiştirmeye çalışan genç bir yazarım. Edebiyatın büyülü dünyasında okuyucularımla buluşmaktan büyük mutluluk duyuyorum.',
    'Hayat, yazdığımız hikayelerden çok daha güzel.',
    'Yazarlık serüvenim çocuklukta başladı. İlk hikayemi 12 yaşında yazdım ve o günden beri kelimelerle dans ediyorum.',
    'İlhamımı günlük hayattan, insanların hikayelerinden ve doğanın güzelliğinden alıyorum.',
    '["İlk kitabım yayınlandı", "Okuyucularımla buluştum", "Yazma tutkumu keşfettim"]',
    '["Kitap okumak", "Doğa yürüyüşleri", "Fotoğrafçılık", "Müzik dinlemek"]',
    '["Aşk-ı Memnu - Halit Ziya Uşaklıgil", "Tutunamayanlar - Oğuz Atay", "Saatleri Ayarlama Enstitüsü - Ahmet Hamdi Tanpınar"]'
);

-- Varsayılan Site Ayarları
INSERT IGNORE INTO site_settings (setting_key, setting_value, setting_type, description) VALUES
('site_title', 'Hilal Yılmaz - Genç Türk Yazarı', 'text', 'Site başlığı'),
('site_description', 'Kelimelerle düşünceleri, hikayelerle hayatları değiştiren genç bir kalem.', 'text', 'Site açıklaması'),
('contact_email', 'info@hilalyilmaz.com', 'text', 'İletişim e-postası'),
('social_instagram', '', 'text', 'Instagram hesabı'),
('social_twitter', '', 'text', 'Twitter hesabı'),
('social_facebook', '', 'text', 'Facebook hesabı'),
('hero_title', 'Hilal Yılmaz', 'text', 'Ana sayfa başlık'),
('hero_subtitle', 'Genç Türk Yazarı', 'text', 'Ana sayfa alt başlık'),
('hero_description', 'Kelimelerle düşünceleri, hikayelerle hayatları değiştiren genç bir kalem. Edebiyatın büyülü dünyasında okuyucularla buluşan hikayeler.', 'text', 'Ana sayfa açıklama');

-- Güvenlik notları:
-- 1. JSON alanlar için MySQL 5.7+ gereklidir
-- 2. Dosya yükleme işlemleri güvenli dizinlerde yapılmalıdır
-- 3. Medya dosyaları için boyut sınırlaması konulmalıdır
-- 4. Düzenli yedekleme yapılmalıdır 