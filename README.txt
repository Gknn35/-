
# OAuth'lu Online Panel — Hızlı Kurulum
1) GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
   - Homepage: https://YOUR_SITE_NAME.netlify.app
   - Callback: https://YOUR_SITE_NAME.netlify.app/.netlify/functions/auth

2) Netlify → Site configuration → Build & deploy → Environment variables
   - GITHUB_CLIENT_ID = (Client ID)
   - GITHUB_CLIENT_SECRET = (Client Secret)
   - Kaydet → Deploy site

3) admin/config.yml'de `repo:` satırını kendi repo adresinle değiştir (örn. gknn35/gokhan-ozkanli-site).

4) /admin/ → GitHub ile giriş → Şarkılar/Klipler → Publish.
