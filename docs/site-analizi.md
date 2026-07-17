# Liva Spor Kulübü — Mevcut Site Analizi

**Tarih:** 17 Temmuz 2026 · **Analiz eden:** Claude Code (FAZ 0)

---

## 1. Teknoloji

| Katman | Ne kullanılıyor |
|---|---|
| Framework | **Next.js 16.2.1** (App Router) + React 19 + TypeScript |
| Stil | Tailwind CSS 4 (tema token'ları `globals.css` içinde) |
| Animasyon | framer-motion 12 (yaygın kullanımda) + **gsap 3.15 (FAZ 0'da eklendi)** |
| 3D | three.js 0.183 (ThreeOrb, TaekwondoFigure) |
| Font | Poppins (Google Fonts, `display: swap`) |
| Analitik | Google Analytics 4 (G-QEG6MQGF6G) |
| Hosting | **Vercel** — GitHub `SERHAT767676/liva-spor` master push'unda otomatik deploy |
| Alan adı | livasporkulubu.com |

Sonuç: Site builder/WordPress değil, **tam kontrol bizde olan modern bir React sitesi.** Scroll efektleri için teknik kısıt yok.

## 2. Sayfa yapısı (tek sayfa)

`page.tsx` sırası: Navbar → Hero → ScrollOrb → About (Hakkımızda) → Branches (Cimnastik/Taekwondo, video'lu) → Programs → GalleryStars (galeri) → Contact (harita + iletişim) → Footer + sabit WhatsApp butonu.

**Asset envanteri:**
- Videolar: `cimnastik.mp4` (1.7MB), `taekwondo.mp4` (3.6MB) — Branches bölümünde
- Görseller: `hero-bg.jpg` **1.2MB (ağır)**, `cm1-3.jpeg` (0.8–1.6MB, **ağır**), `t1-3.jpeg` (~100KB, iyi), logolar

## 3. ⚠️ Kritik durum: Yerel kod ≠ Canlı site

Canlıdaki site son commit'te (`e6f47ed`, Nisan 2026). Ancak yerel klasörde **hiç commit'lenmemiş ve yayınlanmamış büyük değişiklikler var** (10 Nisan tarihli):
- Yeni bileşenler: `ScrollOrb` (scroll'la açılan ışık bandı), `ThreeOrb`, `TaekwondoFigure` (3D figürler), `ParticlesCanvas` (parçacık efekti), `GalleryStars` (galerinin yeni sürümü)
- Hero tamamen yeniden yazılmış (mouse-parallax katmanları)
- Yeni galeri fotoğrafları (cm1-3, t1-3)

Yani geçmişte bir "efektli sürüm" denemesi başlamış ama canlıya alınmamış. **Serhat'a sorulacak:** bu taslak korunup üzerine mi inşa edelim, yoksa canlı sürümü baz mı alalım?

## 4. İyi durumda — korunmalı

- ✅ **SEO temeli sağlam:** title/description/OG/Twitter meta, canonical, SportsClub JSON-LD (adres+telefon), sitemap.ts, robots.ts. Bozulmamalı.
- ✅ WhatsApp CTA zaten sticky (sağ alt) + hero'da "Ücretsiz Deneme Dersi" birincil buton — doğru dönüşüm kurgusu.
- ✅ Marka renkleri tema token'ı olarak tanımlı (`primary #8B1A1A`, `teal #2EC4B6`) — tutarlı kullanım kolay.
- ✅ Erişilebilirlik temelleri: aria-label'lar, semantic section'lar mevcut.
- ✅ 3D bileşenler `dynamic(..., {ssr:false})` ile doğru izole edilmiş.
- ✅ Videolarda `playsInline`/`muted` deseni (Branches) mobil uyumlu.

## 5. Zayıf / güncellenmeli

- 🔴 **hero-bg.jpg 1.2MB** ve CSS `background-image` olarak yükleniyor → Next `<Image>` optimizasyonundan yararlanmıyor; mobil LCP'yi doğrudan vuruyor.
- 🔴 Galeri fotoğrafları cm1-3.jpeg 0.8–1.6MB — sıkıştırılmalı (hedef <300KB, WebP).
- 🟡 Hero başlığındaki `text-orange-400` marka dışı renk — kırmızı/turkuaz kimliğe çekilmeli.
- 🟡 `prefers-reduced-motion` desteği **hiçbir bileşende yok** — eklenecek.
- 🟡 ScrollOrb'daki `useTransform`'un `map` içinde çağrılması React hook kuralını ihlal ediyor (çalışıyor ama kırılgan).
- 🟡 Şu anki scroll deneyimi "tek güçlü an"dan yoksun: efektler (orb, parçacık, 3D figür) dekoratif; kulübü anlatan scrollytelling yok.
- 🟢 Poppins 6 ağırlıkla yükleniyor — 3-4'e indirilebilir.

## 6. Scroll efektleri nasıl eklenir (teknik yol)

Kısıt yok; öneri:
1. **GSAP ScrollTrigger** kuruldu (3.15). Pin'li hero + scroll-scrub antrenman videosu ana moment olarak buraya yapılır.
2. Scrub videosu **all-keyframe** (`-g 1`) encode edilmeli; iOS Safari için canvas frame sekansı alternatifi FAZ 2'de test edilecek.
3. Mevcut framer-motion reveal'ları hafif bölüm animasyonu olarak kalır — iki kütüphane aynı elemanı yönetmez.
4. Mobil/zayıf cihaz: poster + kısa otomatik mp4 fallback + `prefers-reduced-motion` desteği.

## 7. Lighthouse baz ölçümü (canlı site, mobil — 17 Tem 2026)

| Kategori | Skor |
|---|---|
| **Performance** | **54** 🔴 |
| Accessibility | 96 |
| Best Practices | 100 |
| SEO | 100 |

Detay: FCP 1.8s · **LCP 6.1s** (hedef <2.5s) · TBT 690ms · CLS 0 · Speed Index 6.0s · **Toplam sayfa 7.2MB**

Yorum: SEO ve erişilebilirlik mükemmel; sorun tamamen ağırlık (hero-bg.jpg, videolar, JS bundle). Bu, güncelleme sırasında hem efekt ekleyip hem skoru YÜKSELTME fırsatı demek — asset optimizasyonu tek başına büyük kazanç sağlar. Ham veri: `docs/lighthouse-baseline.json`.

## 8. Deploy / risk haritası

- `git push origin master` → Vercel otomatik canlıya alır. **Tüm geliştirme push'suz, yerel branch'te yapılacak.**
- Yedekler: git branch `yedek-canli-site-2026-07-17` (canlı durum) + `backup/2026-07-17-calisma-kopyasi/` (bugünkü çalışma ağacı).
- En riskli noktalar: `layout.tsx` (SEO/analitik), `globals.css` (tema), Branches videoları, WhatsApp linkleri.
