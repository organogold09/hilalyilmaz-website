-- Admin Kullanıcıları Tablosu
-- Hilal Yılmaz Website Admin Panel

CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    full_name VARCHAR(100),
    role ENUM('admin', 'editor') DEFAULT 'admin',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    login_attempts INT DEFAULT 0,
    locked_until TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_active (is_active),
    INDEX idx_created_at (created_at)
);

-- Admin Oturumları Tablosu
CREATE TABLE IF NOT EXISTS admin_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE CASCADE,
    INDEX idx_session_token (session_token),
    INDEX idx_user_id (user_id),
    INDEX idx_expires_at (expires_at)
);

-- Admin Aktivite Logları Tablosu
CREATE TABLE IF NOT EXISTS admin_activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
);

-- Varsayılan Admin Kullanıcısı (İlk kurulum için)
-- Not: Bu kullanıcı ilk giriş sonrası değiştirilmelidir
INSERT IGNORE INTO admin_users (
    username, 
    password_hash, 
    email, 
    full_name, 
    role
) VALUES (
    'admin',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G', -- 'admin123' hash'i
    'admin@hilalyilmazhy.com',
    'Site Yöneticisi',
    'admin'
);

-- Güvenlik için eski oturumları temizleme prosedürü
DELIMITER //
CREATE PROCEDURE CleanExpiredSessions()
BEGIN
    DELETE FROM admin_sessions 
    WHERE expires_at < NOW();
    
    -- 30 günden eski aktivite loglarını temizle
    DELETE FROM admin_activity_logs 
    WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY);
END //
DELIMITER ;

-- Otomatik temizlik için event scheduler (opsiyonel)
-- SET GLOBAL event_scheduler = ON;
-- CREATE EVENT IF NOT EXISTS cleanup_admin_sessions
-- ON SCHEDULE EVERY 1 HOUR
-- DO CALL CleanExpiredSessions();

-- Güvenlik notları:
-- 1. Şifreler bcrypt ile hash'lenmelidir
-- 2. Session token'lar rastgele ve güvenli olmalıdır
-- 3. IP adresi ve user agent kontrolü yapılmalıdır
-- 4. Başarısız giriş denemeleri sınırlandırılmalıdır
-- 5. Düzenli olarak eski kayıtlar temizlenmelidir 