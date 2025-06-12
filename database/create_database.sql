-- Hilal Yılmaz Website Veritabanı Kurulumu
-- XAMPP MySQL için

-- Veritabanını oluştur
CREATE DATABASE IF NOT EXISTS hilalyilmaz_website 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Veritabanını seç
USE hilalyilmaz_website;

-- Başarı mesajı
SELECT 'Veritabanı başarıyla oluşturuldu!' as message; 