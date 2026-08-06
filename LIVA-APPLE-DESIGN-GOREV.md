# GÖREV: Liva Spor Kulübü Sitesi — Apple Design Denetimi ve İyileştirmesi

Bu dosya senin görev tanımın. Fazları **sırayla** uygula. Faz 3'te DUR ve onay bekle.

---

## MUTLAK KURALLAR

Bunlar tartışmaya kapalı. İhlal edersen görev başarısızdır.

1. **Canlı siteye dokunmadan önce tam yedek al.** Yedek alındığını doğrulamadan tek satır değiştirme.
2. **Git kullan.** `apple-design-audit` adında yeni bir branch aç. Ana branch'e doğrudan commit yok.
3. **Faz 3'ten sonra DUR.** Raporu yazdıktan sonra kullanıcı onayı gelmeden Faz 4'e geçme.
4. **Marka renkleri sabit:** koyu kırmızı `#8B1A1A`, turkuaz `#2EC4B6`. Bunları "daha Apple'vari" diye değiştirme, açma, soluklaştırma.
5. **GSAP + ScrollTrigger kalacak.** Skill sana Motion/Framer Motion önerecek. Framework değiştirme, kütüphane migrasyonu yapma. Skill'in ilkelerini mevcut GSAP koduna uygula.
6. **Yeni bağımlılık ekleme.** Gerekliyse raporda gerekçesiyle öner, kurma.
7. **SEO'ya dokunma.** Mevcut meta etiketleri, başlık hiyerarşisi (h1/h2), structured data, alt metinler, URL yapısı, sitemap — hiçbiri değişmeyecek. Görsel iyileştirme uğruna semantik HTML bozulmayacak.
8. **Türkçe içerik aynen kalacak.** Metin yazmıyorsun, düzenlemiyorsun.
9. **Mobil öncelikli.** Trafiğin ezici çoğunluğu Instagram üzerinden mobilden geliyor. Bir iyileştirme mobilde çalışmıyorsa yapılmamış sayılır.

---

## FAZ 0 — Skill kurulumu

Proje kök dizininde çalıştır:

```bash
npx -y skills add emilkowalski/skills --skill apple-design --agent claude-code
npx -y skills add emilkowalski/skills --skill review-animations --agent claude-code
```

Kurulum sonrası doğrula:

- `.claude/skills/` altında `apple-design` ve `review-animations` var mı?
- `SKILL.md` dosyalarını **oku**. Faz 2'deki denetimi bu dosyaların içeriğine dayandıracaksın, benim aşağıdaki özetime değil. Benim listem hatırlatma; skill'in kendisi otorite.

Kurulum başarısız olursa dur ve bildir. Elle indirmeye çalışma.

---

## FAZ 1 — Keşif ve yedek

Sırayla:

1. **Yığını tespit et.** Statik HTML mi, WordPress teması mı, bir build sistemi var mı? `package.json`, `wp-content`, `index.html`, `.git` — ne varsa haritasını çıkar.
2. **Yedek al.**
   - Statik/build'li ise: `git checkout -b apple-design-audit` + mevcut hâlin sıkıştırılmış kopyası `yedek/YYYY-AA-GG-oncesi.zip`
   - WordPress ise: tema klasörünün tam kopyası + kullanıcıya "veritabanı yedeğini panelden al" uyarısı ver ve **onay gelene kadar bekle**.
3. **Envanter çıkar.** Hangi sayfalar var, hangi dosyalarda animasyon kodu geçiyor (GSAP çağrıları, CSS `transition`, `@keyframes`, `scroll` dinleyicileri), hangi CSS dosyaları aktif.
4. Bulduklarını 10 satırı geçmeyecek şekilde özetle ve Faz 2'ye geç.

---

## FAZ 2 — Denetim

Siteyi aşağıdaki başlıklar altında tara. Her bulgu için: **dosya + satır + sorun + neden sorun + önerilen düzeltme**.

Tahmin yürütme. Kodu oku. Emin olamadığın yeri "doğrulanamadı" diye işaretle.

### 2.1 Tepki ve geri bildirim
- Tıklanabilir öğeler basıldığı anda mı tepki veriyor, bırakıldığında mı?
- Butonlarda, kart bağlantılarında, menü öğelerinde `:active` durumu var mı?
- Gereksiz gecikme var mı (yapay timer, bekleyen transition, debounce)?

### 2.2 Animasyon kalitesi
- Easing seçimleri doğru mu? (Giriş animasyonlarında yanlış eğri kullanımı en yaygın hata.)
- Süreler tutarlı mı, yoksa her yerde farklı rastgele değerler mi var?
- Sadece `transform` ve `opacity` mi animate ediliyor? `width`, `height`, `top`, `left`, `margin` animasyonu varsa işaretle — bunlar kare düşürür.
- ScrollTrigger tetikleyicileri mobilde erken/geç mi tetikleniyor?
- Animasyon sırasında kullanıcı girdisi kilitleniyor mu?

### 2.3 Mekânsal tutarlılık
- Bir öğe nereden geliyorsa oraya dönüyor mu? (Sağdan gelen panel sağa kapanmalı, aşağı değil.)
- Açılır menüler, popover'lar, modallar kendilerini tetikleyen öğeden mi büyüyor, yoksa ekran ortasından mı? `transform-origin` doğru mu?

### 2.4 Tipografi
- `letter-spacing` her boyutta aynı sabit değer mi? Öyleyse sorun: büyük başlıklar sıkılaştırılmalı, gövde metni nötr kalmalı.
- `line-height` büyük başlıklarda gereğinden gevşek mi?
- Font boyutları `px` ile mi sabitlenmiş? Kullanıcının tarayıcı yazı boyutu ayarı çalışıyor mu?
- Hiyerarşi sadece boyutla mı kurulmuş, ağırlık kullanılmış mı?

### 2.5 Katman, derinlik, materyal
- Sabit üst menü opak bir şerit mi, içeriğin altından aktığı yarı saydam bir katman mı?
- Yarı saydam yüzey üstüne yarı saydam yüzey bindirilmiş mi? (Okunabilirlik çöker.)
- Gölgeler tutarlı mı, yoksa her bileşende farklı mı?
- Sert 1px ayırıcı çizgiler mi kullanılmış?

### 2.6 Erişilebilirlik ve dayanıklılık
- `prefers-reduced-motion` desteği var mı? Yoksa bu **kritik** bulgudur.
- Dokunma hedefleri mobilde yeterince büyük mü (min 44px)?
- Kontrast oranları marka renkleriyle beyaz/koyu zemin üzerinde geçer not alıyor mu?
- Odak (focus) göstergeleri klavye kullanıcısı için görünür mü?

### 2.7 Performans
- Sayfa yükünde kaç animasyon aynı anda çalışıyor?
- Görseller doğru boyutta mı, lazy-load var mı?
- Yavaş bağlantıda ilk anlamlı boyama ne durumda?

---

## FAZ 3 — Rapor ve DURMA NOKTASI

`DENETIM-RAPORU.md` dosyasını proje kökünde oluştur. Yapısı:

```
# Denetim Raporu — [tarih]

## Özet
[5 cümleyi geçmeyen genel değerlendirme. Süslemeden, dürüstçe.]

## Kritik bulgular (hemen düzeltilmeli)
| # | Dosya:satır | Sorun | Etkisi | Düzeltme | Risk |

## Orta öncelikli
[aynı tablo]

## Düşük öncelikli / kozmetik
[aynı tablo]

## Dokunulmaması gerekenler
[Zaten doğru yapılmış şeyler. Bunları listele ki yanlışlıkla "iyileştirilmesin".]

## Önerilen uygulama sırası
1. ...
2. ...
[Her maddede tahmini süre ve bozma riski]
```

Rapor kurallarına uy:

- **Abartma.** "Muhteşem olacak", "profesyonel görünüm kazanacak" gibi cümleler yok. Ne değişecek, neden değişecek, o kadar.
- **Her bulgu somut olsun.** "Animasyonlar iyileştirilebilir" kabul edilmez. "hero.js:42'de fadeIn için ease-in kullanılmış, giriş animasyonu ease-out olmalı" kabul edilir.
- **Riski dürüstçe yaz.** Bir düzeltme mobilde bir şeyi bozabilecekse söyle.
- **Yapmaman gerekenleri de yaz.** Skill'in önerdiği ama bu sitede mantıklı olmayan şeyler varsa (örn. jest tabanlı sürükleme, bu sitede kullanıcı hiçbir şeyi sürüklemiyor) bunu belirt.

Raporu yazdıktan sonra **DUR**. Kullanıcıya raporu özetle ve şunu sor:

> Hangi maddeleri uygulamamı istiyorsun? Hepsi / sadece kritikler / seçtiklerim?

Onay gelmeden Faz 4'e geçme.

---

## FAZ 4 — Uygulama

Sadece onaylanan maddeler. Onaylanmayanı "madem buradayım" diye yapma.

Kurallar:

1. **Her madde ayrı commit.** Commit mesajı: `fix(anim): hero fadeIn easing düzeltildi (#3)` formatında, rapor madde numarasıyla eşleşsin.
2. **Bir seferde bir madde.** Değiştir, kontrol et, commit et, sonrakine geç.
3. **Her maddeden sonra siteyi mobil genişlikte (375px) ve masaüstünde (1440px) kontrol et.** Bir şey bozulduysa o commit'i geri al ve raporla.
4. **Kapsam kayması yok.** Yolda gördüğün başka bir sorunu düzeltme — not al, sona ekle.
5. Emin olmadığın bir yerde dur ve sor. Tahminle ilerleme.

---

## FAZ 5 — Doğrulama ve teslim

1. Değişiklik öncesi/sonrası karşılaştırması yap: hangi maddeler uygulandı, hangileri atlandı, neden.
2. `DENETIM-RAPORU.md` dosyasının sonuna "Uygulama Kaydı" bölümü ekle.
3. Kırılmadığını doğrula: tüm sayfalar açılıyor mu, formlar çalışıyor mu, menü mobilde açılıp kapanıyor mu, ScrollTrigger animasyonları tetikleniyor mu.
4. Yolda not aldığın kapsam dışı sorunları ayrı bir liste olarak sun.
5. Kullanıcıya branch'i nasıl merge edeceğini ve gerekirse nasıl geri alacağını tek paragrafta anlat.

---

## BAŞLARKEN

Faz 0'dan başla. Her fazın sonunda ne yaptığını tek paragrafta özetle, sonraki faza geç. Faz 3'te dur.

---

## Tamamlanan Turlar

- **2026-08-06/07 — Apple design denetimi, tüm maddeler kapandı.** Branch `apple-design-audit`. Detay: `DENETIM-RAPORU.md`.
  - Güvenli paket (17 madde) + #12 (açık zemin turkuaz metin) + #13 (cam navbar) + #6-pin (dvh) + #20 (smooth scroll/pin) uygulandı; son dördü gerçek telefonda doğrulandı.
  - **#2 CTA kontrastı: V1 seçildi**, mevcut hâl kalıyor (turkuaz üstü beyaz metin, 2.17:1 — bilinçli kabul edilmiş erişilebilirlik açığı).
  - **#8 düştü:** ölçümle çürütüldü, Tailwind 4 `hover:` varyantını zaten kapılıyor.
  - **#4b** (yıldız sayısı) ve **#22/#25** (menü easing'i, gölge dili) uygulanmadı — görünüm kararı / kapsam dışı.
  - `scroll-margin-top` denendi, ölçümle gereksiz çıktı, geri alındı.
- **Açık sorun:** 375×812'de hero viewport'a sığmıyor, "İletişim" butonu kaydırma davetiyle çakışıyor (kapsam dışı bulgu; dar ekranlarda veya yatay modda görülür).
- **Branch merge EDİLMEDİ, push EDİLMEDİ.**
