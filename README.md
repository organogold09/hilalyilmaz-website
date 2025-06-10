# Hilal Yılmaz - Yazar Websitesi

Bu, Türk edebiyatının genç ve yetenekli yazarı **Hilal Yılmaz**'ın resmi websitesidir. Modern, responsive ve kullanıcı dostu bir tasarımla oluşturulmuştur.

## 🌟 Özellikler

- **Modern Tasarım**: Temiz, minimalist ve profesyonel görünüm
- **Tam Responsive**: Tüm cihazlarda mükemmel görüntü
- **Hızlı ve Optimize**: Next.js 14 ile geliştirilmiş
- **SEO Optimized**: Arama motorları için optimize edilmiş
- **Etkileşimli Animasyonlar**: Smooth scroll ve hover efektleri
- **İletişim Formu**: Ziyaretçiler ile direkt iletişim
- **Blog Sistemi**: Yazılar ve güncellemeler için hazır
- **Sosyal Medya Entegrasyonu**: Tüm platformlara kolay erişim

## 🛠️ Teknolojiler

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Modern CSS framework
- **Lucide React** - İkonlar
- **Framer Motion** - Animasyonlar
- **Responsive Design** - Mobile-first yaklaşım

## 📦 Kurulum

### Önkoşullar
- Node.js 18+ 
- npm veya yarn

### Adımlar

1. **Depoyu klonlayın**
   ```bash
   git clone https://github.com/kullanici/hilalyilmazhy-website.git
   cd hilalyilmazhy-website
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   # veya
   yarn install
   ```

3. **Geliştirme sunucusunu başlatın**
   ```bash
   npm run dev
   # veya
   yarn dev
   ```

4. **Tarayıcıda açın**
   [http://localhost:3000](http://localhost:3000) adresine gidin

## 🚀 Deployment

### Vercel ile Deploy
```bash
npm run build
npm run start
```

### Diğer Platformlar
```bash
npm run build
```
Build edilen dosyalar `/.next` klasöründe oluşur.

## 📂 Proje Yapısı

```
hilalyilmazhy-website/
├── app/
│   ├── globals.css          # Global CSS stilleri
│   ├── layout.tsx           # Ana layout
│   └── page.tsx            # Ana sayfa
├── components/
│   ├── Header.tsx          # Navigation bar
│   ├── Hero.tsx           # Ana hero bölümü
│   ├── About.tsx          # Hakkında bölümü
│   ├── Books.tsx          # Kitaplar bölümü
│   ├── Blog.tsx           # Blog bölümü
│   ├── Contact.tsx        # İletişim bölümü
│   └── Footer.tsx         # Footer
├── public/                 # Statik dosyalar
├── package.json
├── tailwind.config.js     # Tailwind konfigürasyonu
├── tsconfig.json          # TypeScript konfigürasyonu
└── next.config.js         # Next.js konfigürasyonu
```

## 🎨 Özelleştirme

### Renkler
Tailwind config dosyasında renk paletini düzenleyebilirsiniz:
- `primary`: Ana marka rengi (turuncu tonları)
- `secondary`: İkincil renk (gri tonları)

### İçerik Güncelleme
- **Kitap bilgileri**: `components/Books.tsx` dosyasında
- **Blog yazıları**: `components/Blog.tsx` dosyasında
- **Kişisel bilgiler**: `components/About.tsx` dosyasında
- **İletişim bilgileri**: `components/Contact.tsx` dosyasında

### Fotoğraf Ekleme
Profil fotoğraflarını `public` klasörüne ekleyip component'lerde referans verebilirsiniz.

## 📧 İletişim

- **Website**: [hilalyilmazhy.com](https://hilalyilmazhy.com)
- **E-posta**: iletisim@hilalyilmazhy.com
- **Twitter**: [@hilalyilmazhy](#)
- **Instagram**: [@hilalyilmazhy](#)

## 📄 Lisans

Bu proje özel mülkiyettir. Tüm hakları **Hilal Yılmaz**'a aittir.

## 🤝 Katkıda Bulunma

Bu websitesi ile ilgili önerileriniz için lütfen iletişime geçin.

---

**Hilal Yılmaz** - *Kelimelerle Ruh Arasındaki Köprü* 