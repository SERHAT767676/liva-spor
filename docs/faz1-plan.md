# FAZ 1 — Güncelleme Planı (17 Tem 2026)

Hedef cümle: *Telefondan giren veli 30 saniyede "burası ciddi, profesyonel bir kulüp" demeli ve WhatsApp'a basmalı.*

## A. Scroll koreografisi — REVİZE (17 Tem, Serhat kararı)

> ❌ Scroll-scrub video İPTAL. Videolar normal döngüde (baştan sara sara) oynar.
> ✅ Scroll anları = **figür geçişleri**: tekme atan taekwondocu ve hareket yapan cimnastikçi, bölümler arası geçişi sahneler.

### 1. Hero: sade ve hızlı
Optimize arka plan + logo + başlık (kontrast düzeltilmiş) + CTA'lar. Video scrub yok; mevcut giriş animasyonları hafifletilerek korunur.

### 2. Figür geçişi #1 — TEKME (ana moment)
Hero'dan sonraki geçişte taekwondocu figür sahneye girer; scroll ilerledikçe **gerilir → tekmeyi atar → tekmenin darbesiyle sonraki bölüm ekrana savrulup yerine oturur** (hız çizgileri + kısa sarsıntı ile). GSAP ScrollTrigger pin + scrub, ama video değil figür animasyonu — dosya maliyeti yok denecek kadar az.

### 3. Figür geçişi #2 — CİMNASTİK
Branches→Programs (veya Galeri öncesi) geçişinde cimnastikçi figür takla/çember hareketiyle ekrandan geçer, yeni bölüm arkasından yuvarlanıp gelir.

**Uygulama tekniği (iki seviye):**
- **Seviye 1 (eldeki tek-poz PNG'lerle, hemen yapılabilir):** figürün tümüne gövde hareketi — gerilme (squash), fırlama (translate+rotate), darbe anı efektleri. Mevcut `taekwondo-guncel.png` / `cimnastik.png` kullanılır.
- **Seviye 2 (yükseltme, asset gelirse):** 8–12 karelik poz sekansı (şeffaf WebP flipbook) — gerçek tekme/takla hareketi kare kare scroll'a bağlanır. Serhat AI ile üretebilir (asset-list'te tarif var).
- Mobil + `prefers-reduced-motion`: pin'siz kısa versiyon / animasyonsuz doğrudan geçiş.

### 4. Güven şeridi (değişmedi)
Sayaçlı rakamlar: sporcu · yıl · branş · madalya. Scroll'a girince tek seferlik sayar.

### 5. Kalan bölümler: hafif reveal (değişmedi)
Branches videoları **normal `loop autoplay muted`** olarak kalır. Başka pin yok — pin sadece 2 figür geçişinde.

### 6. Nisan taslağı dekoratifleri — KALDIRILACAK (onaylı)
ScrollOrb ışık bandı, parçacıklar, 3D küre kaldırılır. Figür PNG'leri ise yeni geçiş animasyonlarında YAŞAR (taslaktaki emek boşa gitmiyor).

## B. Tasarım tazeleme (kimlik sabit)
- Hero başlık kontrastı düzelt: koyu overlay güçlendir; `text-orange-400` → turkuaz/altın vurgu (marka içi).
- Mobilde taşan logo bloğunu ölçekle (390px'te "SPOR KULÜBÜ" kesiliyor — taslak hatası).
- Tipografi ölçeği netleşsin: H1 clamp(), gövde 16-18px; Poppins ağırlıkları 6→4'e insin.
- Bölüm aralıkları tutarlı ritme bağlansın (örn. 96px masaüstü / 64px mobil).

## C. Mobil + performans (Lighthouse 54 → 85+ hedefi)
1. `hero-bg.jpg` (1.2MB) kalkıyor → yerine optimize video poster (WebP ~80KB).
2. Galeri jpeg'leri (0.8–1.6MB) → WebP, her biri <300KB.
3. Videolar: masaüstü 1080p ~2.5Mbps, mobil 720p ~1.2Mbps ayrı kaynak; scrub videosu all-keyframe.
4. `preload="none"` + `IntersectionObserver` ile alt bölüm videoları geç yüklensin.

## D. WhatsApp CTA stratejisi
- Sticky yeşil buton her ekranda (mevcut ✓, korunur).
- Scroll-video finali büyük CTA'ya bağlanır ("Ücretsiz Deneme Dersi").
- Navbar'daki buton korunur. Tüm linkler `wa.me/905416445376`.

## E. Risk haritası

| Değişiklik | Risk | Önlem |
|---|---|---|
| Hero yeniden yapımı | 🔴 Yüksek — sitenin ilk izlenimi | Yedek branch mevcut; localhost onayı olmadan push yok |
| Dekoratif efekt temizliği | 🟡 Orta — taslak emeği | `yedek-canli-site` + backup/ klasöründe duruyor |
| Asset optimizasyonu | 🟢 Düşük | Orijinaller backup'ta |
| layout.tsx (SEO/GA) | — | **Dokunulmayacak** |
| Deploy | 🔴 push = anında canlı | FAZ 4 onayına kadar `git push` yasak |

## Serhat'tan istenecekler (FAZ 2'de netleşir)
- 1 adet **yatay, 15-25 sn** akıcı antrenman videosu (scroll ana momenti için; tek plan veya 3 kısa kesit).
- Güven şeridi rakamları (kaç sporcu, kaç yıl, madalya vb.).
