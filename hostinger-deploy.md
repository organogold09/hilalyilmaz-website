# Hostinger Deployment Rehberi

## 📋 Adım Adım Hostinger'a Yükleme

### 1. Static Export Oluşturma
```bash
# Proje klasöründe terminal açın
npm run build
```

### 2. Dosyaları Hazırlama
- Build sonrası `.next/static` klasöründeki dosyalar
- `public` klasöründeki tüm dosyalar
- Ana sayfa için `index.html` oluşturun

### 3. Hostinger cPanel Adımları
1. **Hostinger hesabınıza giriş yapın**
2. **cPanel'e gidin**
3. **File Manager'ı açın**
4. **public_html klasörüne gidin**
5. **Tüm dosyaları yükleyin**

### 4. Domain Ayarları
- `hilalyilmazhy.com` domain'ini `public_html`'e yönlendirin
- DNS ayarlarını kontrol edin
- SSL sertifikası aktif edin

## 🔧 Alternatif Yöntem: GitHub + Hostinger

1. **GitHub'a kod yükleyin**
2. **Hostinger'da Git deployment aktif edin**
3. **Otomatik sync kurulumu yapın**

## ✅ Test Listesi
- [ ] Domain açılıyor mu?
- [ ] Mobile responsive çalışıyor mu?
- [ ] Tüm sayfalar yükleniyor mu?
- [ ] İletişim formu çalışıyor mu?
- [ ] Görseller görünüyor mu?

## 📞 Sorun Çözüm
- Cache temizleme: Ctrl+F5
- 404 hatası: .htaccess dosyası ekleyin
- Yavaş yüklenme: Görselleri optimize edin 