@AGENTS.md


# Liva Spor — Proje Anayasası (özet)

- Bu, canlı ve yayında olan bir siteyi GÜNCELLEME projesidir — sıfırdan yapım değil. Her oturumda önce `PROGRESS.md` oku.
- **KRİTİK:** `git push origin master` = Vercel'de anında canlı deploy. Push sadece Serhat onayıyla (FAZ 4).
- Fazlar: 0-Analiz✅ → 1-Plan✅ → 2-Asset'ler → 3-Geliştirme → 4-Test+Yayın. Detay: `docs/faz1-plan.md`, `docs/site-analizi.md`.
- Ekip: `.claude/agents/` (proje-yoneticisi, tasarimci, frontend-gelistirici, video-asset-uzmani, qa-testci). Teknik not: `.claude/skills/liva-site-bilgisi/`.
- Marka: koyu kırmızı + turkuaz (token'lar globals.css'te). Dil: Türkçe. Hedef: telefondaki veli 30 sn'de ikna olup WhatsApp'a basmalı.
- Yedekler: git branch `yedek-canli-site-2026-07-17` + `backup/`. Mevcut siteyi bozma; test edilmemiş kod canlıya gitmez.
- Lighthouse bazı: Perf 54 / SEO 100 (mobil, canlı) — altına düşmek yasak, hedef 85+.
