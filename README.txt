
# Gökhan Özkanlı — Kişisel Müzik Sitesi (Hazır Paket)

Bu klasörde, **hemen aç ve kullan** mantığında çalışan statik bir web sitesi bulunur.

## 1) Hemen yerelde dene
- `index.html` dosyasını çift tıkla → tarayıcıda açılır.
- `Şarkılarım` sayfasında yer alan parçalara tıklayıp dinleyebilirsin.

> Not: Bazı tarayıcılarda yerel dosya güvenlik kısıtları olabilir. Sorun olursa Chrome'da açmayı dene.

## 2) Ücretsiz yayına alma (2 dk)
- **GitHub Pages**: Bu klasörü bir GitHub deposu olarak yükle → **Settings → Pages** → Source: `main` → Save. Link otomatik oluşur.
- **Netlify**: netlify.com → New site from Git → Depoyu bağla → Deploy. Tek tıkla yayınlanır.
- **Vercel**: vercel.com → Add New… → Project → Depoyu seç → Deploy.

## 3) Şarkı ekleme (kod yok)
1. `assets/audio/` içine `.mp3` veya `.wav` yükle.
2. `assets/img/` içine kapak görseli (JPG/PNG/SVG) koy.
3. `songs.json` dosyasını aç (Not Defteri ile bile olur) ve yeni şarkıyı aşağıdaki formatta ekle:

```json
{ 
  "title": "Parça Adı",
  "artist": "Gökhan Özkanlı",
  "cover": "assets/img/KAPAK_DOSYASI.svg",
  "audio": "assets/audio/PARCA_DOSYASI.mp3",
  "duration": "3:12"
}
```

> Değişiklikten sonra `songs.html` sayfasını yenilemen yeterlidir.

## Renkler & Stil
- Tema: **Siyah / Kırmızı / Beyaz**
- Modern animasyonlar, sayfa geçişleri ve kartlar hazırdır.

İyi yayınlar!


## Yönetim (Kodsuz)
- `admin.html` sayfasını **Chrome (masaüstü)** ile açın.
- **Site klasörünü seç** düğmesi ile ZIP'ten çıkardığınız ana klasörü seçin (içinde `index.html` var).
- **Şarkılar** bölümünden başlık yazıp ses ve kapak dosyalarını seçin → *Şarkı ekle*.
- **Klipler** bölümünden başlık yazıp video ve poster seçin → *Klip ekle*.
- Listeden **Sil** düğmesi ile öğeyi kaldırabilirsiniz (dosyaları da silmeye çalışır).
- Tüm değişiklikler `songs.json` ve `videos.json` dosyalarına yazılır; site hemen güncellenir.
- Not: iPhone/Safari bu yönetim panelinin dosya yazma yeteneklerini desteklemeyebilir. Değişiklikler için masaüstü Chrome önerilir.


## Uyumlu Yönetim (Tarayıcı Bağımsız)
- `admin_compatible.html` dosyasını açın (Chrome/Safari/Edge fark etmez).
- Şarkı ve kliplerinizi forma ekleyin.
- **Güncellenmiş songs.json / videos.json** dosyalarını indirin.
- Bu dosyaları site klasörünüzdeki aynı dosyaların üzerine kopyalayın.
- (Gerekirse audio/video/kapak dosyalarını ilgili `assets/` klasörlerine sürükleyip bırakın.)


## Online Panel (Netlify + Git Gateway)
1) GitHub hesabında boş bir repo oluştur (ör. `gokhan-ozkanli-site`) ve bu klasörün tüm içeriğini yükle. Branch adı `main` olsun.
2) Netlify'a (free) giriş yap → **Add new site** → **Import an existing project** → GitHub'ı bağla → bu repo'yu seç.
3) Build ayarı gerekmiyor (statik). **Publish directory:** `/` (root). Deploy et.
4) Netlify panelinde **Identity** bölümünü **Enable Identity** ile aç. Registration: **Invite only**.
5) Identity → **Services** → **Enable Git Gateway** (GitHub izni ister, onayla).
6) Identity → **Users** → **Invite users** ile kendi e-posta adresine davet gönder. E-postadaki daveti açıp şifre oluştur.
7) Artık sitende `/admin/` adresine gir → Netlify Identity ile giriş yap → Şarkılar/Klipler sekmelerinden dosyaları **yükle ve kaydet**.
