# Liva Spor — İlerleme Takibi

> Her oturumda önce `CLAUDE.md` (proje anayasası, C:\Users\serha altındaki oturum notu), sonra bu dosya okunur.
> Proje klasörü: `c:\Users\serha\OneDrive\Masaüstü\kodlama\liva-spor`

## Durum: FAZ 1 onaylandı ✅ — FAZ 2 sürüyor

---

## FAZ 0 — Ekip Kurulumu + Analiz (17 Tem 2026) ✅

**Biten işler:**
- [x] 5 subagent tanımlandı: `.claude/agents/` → proje-yoneticisi, tasarimci, frontend-gelistirici, video-asset-uzmani, qa-testci
- [x] Proje skill'i: `.claude/skills/liva-site-bilgisi/` (site yapısı + scroll-video teknik notları)
- [x] Araçlar: gsap 3.15 npm'e eklendi; ffmpeg 8.1 sistemde mevcut; Next.js dev ortamı hazır
- [x] Analiz raporu: `docs/site-analizi.md`
- [x] Lighthouse baz ölçümü (canlı, mobil): **Perf 54 / A11y 96 / BP 100 / SEO 100** — `docs/lighthouse-baseline.json`
- [x] Yedekler: git branch `yedek-canli-site-2026-07-17` + `backup/2026-07-17-calisma-kopyasi/` (backup/ gitignore'a eklendi)

**Alınan kararlar:**
- Site Next.js 16 + Vercel (GitHub master push = otomatik canlı deploy). Geliştirme push'suz yapılacak.
- GSAP sadece scroll-scrub/pin için; mevcut framer-motion reveal'ları korunuyor.

**Serhat'ın kararları (17 Tem):**
1. Nisan taslağı → "önce bana göster" dedi; dev sunucu localhost:3000'de açıldı, ekran görüntüleri alındı (mobilde logo taşması + başlık kontrast sorunu tespit edildi). Nihai karar bekleniyor.
2. FAZ 1 planı hazırlansın → onaylandı.

## FAZ 1 — Güncelleme Planı ⏳ (plan sunuldu, onay bekliyor)

- [x] Plan yazıldı: `docs/faz1-plan.md`
- [x] **Serhat onayladı (17 Tem):** plan kabul + dekoratif efektler (ScrollOrb, parçacıklar, 3D figürler) KALDIRILACAK, tek güçlü scroll-video momenti gelecek. Taslak `yedek-canli-site-2026-07-17` + `backup/` içinde korunuyor.

## FAZ 2 — Görsel/Video Seçimi 🔄 (sürüyor)

- [x] `docs/asset-list.md` hazır — Serhat'tan beklenen: **yatay 15-25 sn hero videosu** (kritik: eldeki tüm videolar dikey/9sn, hero için kullanılamaz) + güven şeridi rakamları
- [x] Mevcut görseller WebP'ye çevrildi: 5.6MB → ~1.3MB (orijinaller duruyor, kod FAZ 3'te .webp'ye geçecek)
- [x] Branches videoları yeniden sıkıştırıldı: `*-opt.mp4` → 5.4MB → 2.1MB
- [x] Scrub yöntem testi: `docs/scrub-yontem-raporu.md` — **karar önerisi: video.currentTime (masaüstü) + mobilde scrub'sız fallback.** Manuel test: `localhost:3000/dev-test/scrub-test.html`
- [x] **PLAN REVİZESİ (17 Tem, Serhat):** scroll-scrub video İPTAL — videolar normal döngüde kalacak. Scroll anları figür geçişleri olacak: tekme atan taekwondocu tekmenin sonunda sonraki bölümü "getirir", cimnastikçi takla geçişi yapar. Önce eldeki tek-poz PNG'lerle (Seviye 1), poz sekansı gelirse flipbook'a yükseltilir (Seviye 2). Yatay hero videosu artık GEREKMİYOR.
- [x] **Güven şeridi İPTAL (17 Tem, Serhat):** rakam bölümü olmayacak — plandan çıkarıldı
- [x] Tekme + takla geçiş demosu yapıldı: `localhost:3000/dev-test/tekme-demo.html` (GSAP pin+scrub, mevcut figür PNG'leriyle)
- [x] Demo v2 (17 Tem, Serhat isteği): figürler ekran boyu (92vh/80vh) + tekme anında **cam kırılması efekti** — darbe noktasından çatlaklar çizilir, ekran 8 parçaya ayrılıp dökülür, yeni bölüm arkasından çıkar; takla geçişinde bölüm perde gibi açılır. Serhat'ın onayı bekleniyor → FAZ 3
- [ ] Opsiyonel: AI poz sekansı (asset-list.md'de tarif var — Seviye 2 yükseltmesi)
- [ ] ⚠️ Canlıya çıkmadan önce `public/dev-test/` klasörü SİLİNECEK

## FAZ 3 — Geliştirme 🔄 (ana iş bitti — Serhat'ın localhost incelemesi bekleniyor)

**Yapılanlar (17 Tem):**
- [x] `KickTransition.tsx`: Hero→About arası dev taekwondocu + tekme + cam kırılması (çatlaklar SVG, 8 parça clip-path, LIVA filigranlı ekran) → "HAKKIMIZDA" splash
- [x] `FlipTransition.tsx`: About→Branches arası dev cimnastikçi taklası + perde açılışı → "BRANŞLARIMIZ" splash
- [x] Dekoratifler silindi: ScrollOrb, ParticlesCanvas, ThreeOrb, TaekwondoFigure (+ `three` paketi kaldırıldı). Yedek: backup/ + git branch
- [x] Hero: kontrast düzeltildi (koyu overlay), turuncu→turkuaz, mobil logo sığdırıldı, hero-bg.webp
- [x] Performans: görseller WebP, Branches videoları lazy-load (+poster) ve opt.mp4, GSAP dinamik import, hero girişleri CSS animasyonu (LCP artık JS beklemiyor)
- [x] `prefers-reduced-motion`: global CSS + her iki geçişte statik fallback (test edildi)
- [x] QA (puppeteer, mobil 390px): taşma yok, sayfa hatası yok, pin/kırılma/takla çalışıyor, WhatsApp erişilebilir
- [x] Yerel Lighthouse (mobil): **Perf 64 / A11y 96 / BP 100 / SEO 100**, sayfa 7.2MB→**0.9MB**, TBT 690→250ms. (Gerçek tarayıcıda LCP ~1.0s; simülasyondaki 6.1s localhost TTFB kaynaklı — canlı Vercel'de FAZ 4'te ölçülecek)

**Revizyon turu (17-18 Tem, Serhat geri bildirimleriyle):**
- [x] Hero zenginleştirme: parçacıklar, renk ışımaları, rozet, nabız CTA, degrade başlık
- [x] Splash sahnelerine doku (ışınlar + LIVA filigran + noktalar); takla sahnesinin siyah fonu sahneye dönüştü
- [x] Branşlar yeniden tasarımı: video yan sütunda TAM görünür (9:16), renkli panel yanda; ayna kompozisyon; maskotlar; cam çerçeveler (GlassFrame)
- [x] Yeni cimnastik videosu: CİMNASTİK.mov (36MB) → cimnastik2-opt.mp4 (4MB) + poster
- [x] **Hero sinematik video arka plan**: hero-bg.mp4 (yatay kırpım, 18sn, 2.2MB); masaüstü + animasyon açık kullanıcıda, LCP sonrası yüklenir; mobilde foto
- [x] Kayan şerit (Marquee.tsx), premium 3 kolonlu Footer, SSS bölümü (Faq.tsx, 5 soru — **cevapları Serhat doğrulamalı**)
- [x] Temizlik: ölü bileşenler (Gallery, Trainers), eski jpeg/png/videolar silindi; public 17MB→~14MB; dev-test kaldırıldı

**Kalanlar:**
- [ ] Serhat son turu inceleyip "yayınla" diyecek
- [ ] FAZ 4: commit + push (= canlı deploy), canlı doğrulama + Lighthouse
## FAZ 4 — Test + Canlıya Alma ⬜
