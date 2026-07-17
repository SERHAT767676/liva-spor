---
name: liva-site-bilgisi
description: Liva Spor sitesinin teknik yapısı, deploy akışı ve scroll-video teknik notları. Sitede kod değişikliği, animasyon işi veya deploy öncesi bu bilgiyi yükle.
---

# Liva Spor Sitesi — Teknik Bilgi Notu

## Yapı
- **Stack:** Next.js 16.2.1 (App Router) + React 19 + Tailwind 4 + TypeScript + framer-motion 12 + three 0.183 + gsap 3.15
- **Tek sayfa:** `src/app/page.tsx` → Navbar, Hero, ScrollOrb, About, Branches, Programs, GalleryStars, Contact, Footer, WhatsAppButton
- **Tema token'ları:** `src/app/globals.css` → `@theme inline` (primary #8B1A1A, teal #2EC4B6, gold #D4AF37)
- **SEO:** `layout.tsx` içinde metadata + SportsClub JSON-LD + GA4 (G-QEG6MQGF6G). Bozma.

## Deploy akışı (KRİTİK)
- GitHub `SERHAT767676/liva-spor` master branch → Vercel otomatik deploy → livasporkulubu.com
- **`git push origin master` = anında canlıya çıkar.** Push sadece Serhat onayıyla.
- Yedek: `yedek-canli-site-2026-07-17` branch'i canlıdaki son commit'te (e6f47ed); `backup/` klasöründe çalışma kopyası var.
- Dikkat: çalışma ağacında canlıya hiç gitmemiş commit'siz değişiklikler var (ScrollOrb, ThreeOrb, TaekwondoFigure, ParticlesCanvas, GalleryStars + yeni görseller, Nisan 2026).

## Scroll-video teknik notları
- Scrub için video **all-keyframe** encode edilmeli: `ffmpeg -i in.mp4 -g 1 -c:v libx264 -pix_fmt yuv420p -movflags +faststart -an out.mp4` — yoksa currentTime atlamalı çalışır.
- iOS Safari'de `video.currentTime` scrub güvenilmez olabilir; alternatif: canvas frame sekansı (WebP kareler) veya iOS'ta videoyu normal oynatıp sadece reveal animasyonu vermek.
- GSAP ScrollTrigger React'te: `useGSAP` (@gsap/react) veya `useEffect` + cleanup'ta `ScrollTrigger.kill()`. React 19 StrictMode çift mount'a dikkat.
- framer-motion zaten section reveal'ları yapıyor — GSAP'ı sadece pin/scrub gereken yerde kullan, aynı elemana ikisini bağlama.

## Test
- Build: `npm run build` (tsc + eslint dahil). Dev: `npm run dev` (localhost:3000).
- Lighthouse baz ölçümü: `docs/lighthouse-baseline.json` (mobil, canlı site). Skor altına düşme; hedef Performance 85+.
