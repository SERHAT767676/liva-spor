# Scroll-Scrub Yöntem Testi Raporu (FAZ 2)

**Test klibi:** taekwondo.mp4 (9.7 sn, dikey 720×1280) · **Canlı test sayfası:** `localhost:3000/dev-test/scrub-test.html` *(sadece geliştirme — canlıya çıkmadan `public/dev-test/` silinecek)*

## Boyut karşılaştırması (540px genişlik, ~10 sn klip)

| Yöntem | Boyut | Dosya sayısı |
|---|---|---|
| A: all-keyframe mp4 (`-g 1`, crf 28) + `video.currentTime` | 3.2 MB | 1 |
| B: WebP frame sekansı (12fps, q68) + canvas | 2.8 MB | 117 |

Not: normal (scrub'sız) encode aynı klipte ~0.9 MB olurdu — scrub her iki yöntemde de ~3 kat boyut bedeli ödetiyor. 20 sn'lik yatay 960px hero videosunda tahmin: 6–9 MB. **Bu yüzden scrub SADECE masaüstünde yüklenecek; mobil normal oynatma + hafif mp4 alacak (plandaki karar doğrulandı).**

## Teknik değerlendirme

**Yöntem A — video.currentTime:**
- ✅ Tek dosya, basit kod, GSAP ScrollTrigger ile doğrudan senkron
- ✅ All-keyframe encode ile masaüstü Chrome/Edge/Firefox'ta kare-hassas akıcı
- ❌ iOS Safari'de currentTime scrub tarihsel olarak güvenilmez (atlama/donma) — ama mobilde zaten scrub kullanmayacağız

**Yöntem B — canvas frame sekansı:**
- ✅ Her platformda deterministik, iOS dahil
- ❌ 117 ayrı HTTP isteği + bellek tüketimi (her kare decode edilmiş tutulursa RAM şişer)
- ❌ Kod karmaşıklığı: preload yönetimi, retina ölçekleme

## 📌 KARAR (öneri)
**Yöntem A (video.currentTime) + mobilde scrub'sız fallback.** Gerekçe: mobilde zaten normal oynatma yapılacağı için A'nın tek zayıf noktası (iOS) devre dışı kalıyor; masaüstünde ise A daha basit ve tek dosya. Yöntem B yedek planda kalır — masaüstü testinde takılma görülürse geçilir.

## Uygulama notları (FAZ 3 için)
- Scrub kaynağı: `ffmpeg -i ham.mp4 -an -c:v libx264 -preset slow -crf 24 -g 1 -vf scale=1280:-2 -pix_fmt yuv420p -movflags +faststart hero-scrub.mp4`
- Mobil kaynak: normal GOP, 720p, crf 26, `<source media>` veya JS ile seçim
- `preload="auto"` sadece masaüstü scrub videosunda; `video.load()` sonrası `canplaythrough` bekle, o ana kadar poster göster
