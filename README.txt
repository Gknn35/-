
# Gökhan Özkanlı — Online Panel ile Tam Site
- Yönetim: /admin.html
- Şifre: varsayılan **gokhan123** (Netlify env: ADMIN_PASSWORD ile değiştirebilirsiniz)
- Şarkı ekleme: /admin.html sayfasından, dosyaları seç → Yükle ve Ekle
- Liste: /songs.html fonksiyonlardan (`/.netlify/functions/songs`) okur
- Medya dosyaları Netlify **Blobs** üzerinde tutulur ve `/.netlify/functions/file?key=...` ile yayınlanır.
