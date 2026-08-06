# Denetim Raporu — 6 Ağustos 2026

Kapsam: `livasporkulubu.com` (Next.js 16 + React 19 + Tailwind 4, framer-motion 12 + GSAP 3.15).
Ölçüt: `.claude/skills/apple-design/SKILL.md` ve `.claude/skills/review-animations/SKILL.md` + `STANDARDS.md`.
Yöntem: kaynak kod okuması + WCAG kontrast hesabı (script ile ölçüldü, göz kararı değil). Tarayıcıda çalışma zamanı ölçümü **yapılmadı** — kare düşmesi/TBT iddiaları "hesaplanan risk" düzeyindedir, ölçüm değildir.

## Özet

Site tasarım olarak iyi durumda: marka dili tutarlı, GSAP geçişleri `matchMedia` ile mobil/masaüstü ayrılmış, videolar lazy yükleniyor, hero girişi CSS'e alınmış. İki yapısal boşluk var: **framer-motion animasyonlarının hiçbiri `prefers-reduced-motion`'a uymuyor** (globals.css'teki global kural yalnızca CSS animasyonlarını durdurur, JS animasyonlarını değil), ve **hiçbir tıklanabilir öğede `:active` durumu yok** — mobilde basma anında sıfır geri bildirim var. Ana CTA'nın kontrastı (beyaz metin / turkuaz zemin) 2.17:1 ile AA'nın belirgin altında; bu marka rengine dokunmadan çözülemez, kararı size bırakıyorum. Geri kalan bulgular tekil ve düşük riskli düzeltmeler.

---

## Kritik bulgular (hemen düzeltilmeli)

| # | Dosya:satır | Sorun | Etkisi | Düzeltme | Risk |
|---|---|---|---|---|---|
| 1 | `About.tsx:63,86` · `Programs.tsx:42,63,121` · `Branches.tsx:87,110,147,192,227` · `Contact.tsx:57,76,99,119` · `Faq.tsx:54,71,92` · `GalleryStars.tsx:79,142,158,188` · `Navbar.tsx:108,117,129` · `Hero.tsx:70,154,169,243` | framer-motion animasyonlarının hiçbiri `prefers-reduced-motion`'ı dikkate almıyor. `globals.css:24-35`'teki global kural `animation-duration`/`transition-duration` sıfırlar — framer-motion inline `style` ile transform yazar, o kuraldan **etkilenmez**. `useReducedMotion` veya `MotionConfig` kodda hiç geçmiyor (grep: 0 sonuç). | Hareket hassasiyeti olan kullanıcıda (vestibüler rahatsızlık, migren) tüm kaydırma-içeri animasyonları, hero parallax'ı ve galerideki 42 sonsuz yıldız animasyonu tam hızda çalışır. Skill'de "kritik" olarak işaretli. | `src/components/MotionProvider.tsx` adında tek amaçlı client bileşeni: `<MotionConfig reducedMotion="user">`. `page.tsx`'te içeriği sarmalar. Framer bu modda transform/layout animasyonlarını atlar, opacity'yi bırakır — skill'in istediği davranış. | Düşük. Yeni bağımlılık yok (framer-motion zaten kurulu). Yeni bir dosya eklenir. Etkisi yalnızca reduced-motion açık kullanıcılarda görünür; normal kullanıcıda hiçbir şey değişmez. |
| 2 | `Hero.tsx:227` · `Programs.tsx:135` · `Footer.tsx:79` · `Navbar.tsx:72` · `GalleryStars.tsx:172` | Ana CTA: beyaz metin turkuaz (`#2EC4B6`) zemin üzerinde **2.17:1**. AA normal metin eşiği 4.5:1, büyük metin eşiği 3:1. Her iki eşiğin de altında. `teal-dark` (`#1FA89B`) kullanılsa bile 2.94:1 — yine kalıyor. | Sitenin dönüşüm noktası olan "Ücretsiz Deneme Dersi" butonu, güneş altındaki telefonda ve düşük görme keskinliğinde okunmuyor. Instagram'dan mobil gelen trafikte doğrudan dönüşüm kaybı. | **Marka rengine dokunmadan tek çözüm metin rengini değiştirmek.** Turkuaz zemin + çok koyu turkuaz metin (`#0A3B36`) → 8.9:1. Alternatif: turkuaz zeminli buton yerine koyu kırmızı (`#8B1A1A`, beyaz metinle 9.29:1) birincil CTA yapmak. | **Orta-yüksek (görsel).** Butonun görünümü değişir; markanın "beyaz yazılı turkuaz buton" kimliğinden sapar. Teknik risk yok. **Bu maddede karar sizin** — onaylamazsanız hiçbir şey yapmam, rapora "bilinçli kabul edilmiş" diye yazarım. |
| 3 | Tüm tıklanabilir öğeler (grep `active:` → 0 sonuç): `Hero.tsx:222,231,243` · `Navbar.tsx:35,50,65,80,117,129` · `Branches.tsx:169,249` · `Programs.tsx:131` · `GalleryStars.tsx:166` · `Contact.tsx:76,99` · `Footer.tsx:37,55,65,68,74` · `WhatsAppButton.tsx:5` · `Faq.tsx:79,100` | Hiçbir butonda/linkte `:active` durumu yok. Geri bildirim yalnızca `hover:` üzerinden geliyor — dokunmatikte hover yoktur. | Skill'in 1. maddesi: "tepki parmak *bastığı* anda gelmeli, bıraktığında değil". Mobilde kullanıcı bastığını hiç anlamıyor; WhatsApp yönlendirmesi 200-400 ms sürdüğü için "tıkladım mı?" hissi oluşuyor. Mobil öncelikli bir sitede en yüksek etki/maliyet oranına sahip madde. | Tıklanabilir öğelere `active:scale-[0.97]` + `transition-transform duration-[160ms]` (STANDARDS.md: 0.95-0.98 aralığı, 100-160 ms). Tailwind sınıfı, ek CSS gerekmez. | Düşük. Sadece basılı tutarken görünür. Tek dikkat: `transition-all` ile birlikte kullanılırsa istenmeyen özellikler de animasyon alır — madde #7 ile birlikte yapılmalı. |
| 4 | `GalleryStars.tsx:76-114` | Üç ayrı sorun aynı yerde: (a) 6 kart × 7 yıldız = **42 adet `repeat: Infinity` framer-motion animasyonu**, galeri görünmese bile mount anında başlar; (b) `initial={{ scale: 0 }}` (satır 81) — skill'in "asla `scale(0)`" kuralı; (c) `exit` içinde `Math.random()` (satır 90-91) render sırasında çağrılıyor. | (a) rAF ana iş parçacığında sürekli iş; TBT'yi büyütür (baz TBT ~380 ms). Ölçülmedi, hesaplanan risk. (b) yıldızlar yoktan var oluyor, fiziksel değil. (c) her render'da farklı çıkış yönü — davranış öngörülemez. | (a) Yıldız sayısını 7→3-4'e indir ve `whileInView` ile kapıla, ya da tamamen sil (skill'in "en güçlü hamle çoğu zaman animasyonu silmektir" maddesi). (b) `scale: 0` → `scale: 0.6` + `opacity: 0`. (c) rastgeleliği `STAR_CONFIGS`'e sabit alan olarak taşı. | Düşük-orta. Yıldızlar galerinin görsel imzası; azaltmak görünümü sadeleştirir. Silme kararı sizin. |
| 5 | `GalleryStars.tsx:50-51` | `onTouchStart` → `setHovered(true)`, `onTouchEnd` → `setHovered(false)`. Parmak kalkar kalkmaz etiket kaybolur. | Mobilde kullanıcı fotoğrafın hangi branşa ait olduğunu **hiç okuyamaz** — etiket parmağın altında, sonra anında kayboluyor. Trafiğin çoğunluğu mobil olduğu için galeri etiketleri fiilen çalışmıyor. | `onTouchEnd` yerine dokunuşta durumu kilitle (`onClick` ile toggle) veya `onTouchEnd`'i kaldırıp bir sonraki karta dokunulduğunda öncekini kapat. | Düşük. Masaüstü hover davranışı değişmez. |
| 6 | `KickTransition.tsx:190` · `FlipTransition.tsx:77` (`h-screen`) · `Hero.tsx:65` (`min-h-screen`) | `100vh` iOS Safari'de adres çubuğunu **dahil eder**; görünen alan gerçekte daha kısadır. `dvh` kullanılmamış. | Hero'nun alt 60-100 px'i iOS'ta ilk açılışta görünmez — "Keşfetmek için kaydır" daveti (`Hero.tsx:243`, `bottom-6`) ve zıplayan ok kesilir. Pin'li sahnelerde alt kenardaki "Kaydırmaya devam et" hatırlatıcısı (`KickTransition.tsx:260`, `FlipTransition.tsx:156`) da aynı riski taşır. | `h-screen` → `h-[100dvh]`, `min-h-screen` → `min-h-[100dvh]`. | **Orta.** ScrollTrigger `pin` yüksekliği viewport'a bağlı; `dvh` iOS'ta adres çubuğu daralınca değişir ve pin hesabı kayabilir. Pin'li iki sahnede `dvh`'ye geçmeden önce gerçek iOS cihazda test şart. Hero'da (pin yok) risk yok. Öneri: **önce sadece Hero'da uygula**, pin'li sahneleri ayrı ele al. |

---

## Orta öncelikli

| # | Dosya:satır | Sorun | Etkisi | Düzeltme | Risk |
|---|---|---|---|---|---|
| 7 | 17 yerde: `Navbar.tsx:27,70,87,92,97` · `Hero.tsx:227,234` · `Branches.tsx:174,254` · `Programs.tsx:135` · `Footer.tsx:79` · `Contact.tsx:89` · `Faq.tsx:77` · `GalleryStars.tsx:69` · `WhatsAppButton.tsx:10` | `transition-all` — skill'in "görür görmez işaretle" listesinin ilk maddesi. | Amaçlanmayan özellikler de animasyon alır (`box-shadow`, `border-color`, `background`, hatta layout özellikleri). `Navbar.tsx:27`'de `py-4`→`py-2` geçişi `transition-all` altında **padding animasyonu** demektir — layout özelliği, GPU dışı. | Her yerde amaçlanan özelliği yaz: `transition-colors`, `transition-transform`, `transition-shadow` veya birleşik `transition-[transform,background-color]`. | Düşük. Mekanik değişiklik; her dosyada gözle doğrulanmalı. |
| 8 | `Hero.tsx:227,234` · `Navbar.tsx:70,124` · `Branches.tsx:174,254` · `Programs.tsx:135` · `Footer.tsx:42,56,79` · `WhatsAppButton.tsx:10` · `About.tsx:93` · `Programs.tsx:69` · `Contact.tsx:86,108` | `hover:scale-105`, `hover:scale-110`, `whileHover` — hiçbiri `@media (hover: hover) and (pointer: fine)` ile kapılanmamış (grep: 0 sonuç). | Dokunmatikte bir öğeye basıldığında tarayıcı sahte hover üretir ve **parmak kalktıktan sonra hover durumu takılı kalır**. Kullanıcı başka yere dokunana kadar buton büyümüş halde durur. Mobilde görünür bir kusur. | Hover hareketlerini `@media (hover: hover)` altına al. Tailwind 4'te `hover:` varyantı v4'te varsayılan olarak `@media (hover: hover)` ile sarılır — **bu doğrulanmalı**; sarılıyorsa madde düşer, sarılmıyorsa `globals.css`'e özel varyant eklenir. framer-motion `whileHover` (About:93, Programs:69, Contact:86,108) **kesinlikle kapılanmamıştır**, o kısım her hâlükârda geçerli. | Düşük. |
| 9 | `globals.css:100-111` (`liva-cta-pulse`) | Sonsuz `box-shadow` animasyonu. `box-shadow` GPU özelliği değildir — her karede paint tetikler. Skill #7: yalnızca `transform` ve `opacity`. | Ana CTA butonunda, sayfa açık olduğu sürece kesintisiz. Mobil GPU'da sürekli paint yükü. Ölçülmedi. | Halkayı bir `::after` pseudo-elemente taşı; `transform: scale()` + `opacity` ile animate et. Aynı görsel sonuç, GPU'da. | Düşük-orta. Görsel eşdeğerliği ayarlamak birkaç deneme ister. |
| 10 | `Navbar.tsx:80-102` (hamburger ≈ 40×34 px) · `GalleryStars.tsx:166-178` (filtre butonları ≈ 36 px yükseklik) · `Footer.tsx:55-58,65-70` (metin linkleri ≈ 20 px yükseklik) | Dokunma hedefleri 44 px'in altında. Ölçüler koddan hesaplandı (`p-2` + 3×`h-0.5` + 2×`gap-1.5` = 34 px; `py-2` + 20 px satır = 36 px). | Mobilde ıskalanan dokunuşlar. Hamburger sitedeki tek mobil navigasyon yolu — en kritik olanı. | Hamburger: `p-2` → `p-3` (44×42) veya sabit `min-w-11 min-h-11`. Filtreler: `py-2` → `py-2.5` + `min-h-11`. Footer linkleri: `py-1.5` ekle. | Düşük. Footer'da satır aralığı görsel olarak açılır. |
| 11 | `Hero.tsx:184` (h1, `text-4xl`→`text-7xl` = 36→72 px, `leading-tight`) · `About.tsx:73` · `Branches.tsx:97` · `Programs.tsx:52` · `GalleryStars.tsx:152` · `Faq.tsx:64` · `Contact.tsx:67` (h2'ler) · `KickTransition.tsx:221` · `FlipTransition.tsx:147` | Büyük başlıklarda `letter-spacing` ayarlanmamış (varsayılan `0`), `leading-tight` (1.25) 72 px'te gevşek. Skill #15: harfler büyüdükçe göze daha ayrık görünür, büyük metin **negatif** tracking ister; leading boyutla ters orantılı olmalı. | Hero başlığı 72 px'te dağınık duruyor; sıkı bir başlık daha kararlı okunur. Yalnızca estetik — okunabilirlik kaybı yok. | h1: `tracking-[-0.02em] leading-[1.05]`. h2'ler (30-60 px): `tracking-[-0.015em]`. Gövde metni ve küçük rozetler **değişmez** (`tracking-[2px]`/`[3px]` küçük uppercase metinde doğru kullanım). | Düşük. Türkçe uzun kelimelerde (`Şampiyonları`) satır kırılımı değişebilir — 375 px'te kontrol edilmeli. |
| 12 | `About.tsx:70` · `Branches.tsx:94,174` · `GalleryStars.tsx:149` · `Faq.tsx:81,103` | `text-teal-dark` (`#1FA89B`) açık zeminde: beyaz üstünde **2.94:1**, `bg-teal/10` üstünde **2.72:1**, `#F5F5F5` üstünde **2.70:1**. AA eşiği 4.5:1. | Rozet metinleri ("HAKKIMIZDA", "BRANŞLARIMIZ", "GALERİ") ve "Bilgi Al" buton metni düşük kontrastlı. Rozetler dekoratif tekrar olduğu için bilgi kaybı düşük, ama "Bilgi Al" tıklanabilir bir CTA. | Açık zeminde kullanılan turkuazı koyulaştır (`#0F6E65` → beyaz üstünde 5.6:1). **Bu marka turkuazını değiştirmek değildir** — turkuaz zemin/vurgu rengi olarak aynen kalır, yalnızca *açık zemin üzerindeki metin* varyantı için koyu bir ton tanımlanır. | Orta (görsel). Yeni bir token (`--color-teal-text`) eklemek gerekir. Marka renk kuralına takılıyorsa madde atlanabilir. |
| 13 | `Navbar.tsx:29` | `bg-white/95 backdrop-blur-md` — %95 opaklıkta blur fiilen görünmez. Skill #12: gezinme çubuğu içeriğin *altından aktığı* yarı saydam bir katman olmalı, opak bir şerit değil. | Kaydırıldığında üst şerit içerikten kopuk, düz beyaz bir bant gibi duruyor. Derinlik hissi yok. | `bg-white/95` → `bg-white/75` + `backdrop-blur-xl backdrop-saturate-150`. `prefers-reduced-transparency: reduce` için `globals.css`'e opak geri dönüş kuralı. | Düşük-orta. Şeffaflaşan şeritte koyu fotoğraf geçerken menü metni okunurluğu düşebilir — 375 px'te hero ve galeri üstünde kontrol edilmeli. |
| 14 | `About.tsx:55` (`i * 0.13` = 130 ms) · `Programs.tsx:68` (`i * 0.15` = 150 ms) | Stagger gecikmeleri STANDARDS.md'nin 30-80 ms aralığının iki katı. 4 kartlık About ızgarasında son kart 390 ms + 550 ms süre = ~940 ms sonra tam görünür. | Kartlar "yavaş yavaş sıraya diziliyor" hissi veriyor; kullanıcı ilk kartı okurken dördüncüsü hâlâ geliyor. | `i * 0.13` → `i * 0.06`, `i * 0.15` → `i * 0.07`. `Contact.tsx:85` ve `Faq.tsx:76` zaten 80 ms — dokunma. | Çok düşük. |
| 15 | `Branches.tsx:106,188` | Kart konteynerinde `cursor-pointer` var ama kart tıklanabilir değil — yalnızca içindeki "Bilgi Al" linki (`:169,:249`) tıklanabilir. | Yanlış afordans: masaüstünde kullanıcı kartın herhangi bir yerine tıklıyor, hiçbir şey olmuyor. Skill'in "eşleme" (mapping) ilkesinin ihlali. Mobilde etkisiz. | `cursor-pointer` sınıfını konteynerden kaldır — ya da kartın tamamını WhatsApp linki yap. | Düşük. İkinci seçenek yapıyı değiştirir; ilkini öneriyorum. |
| 16 | Tüm interaktif öğeler (grep `focus:`/`focus-visible` → 0 sonuç) | Odak göstergesi hiç tasarlanmamış; tarayıcı varsayılanına bırakılmış. Koyu zeminli bölümlerde (`Contact`, `Footer`, hero) varsayılan halka görünürlüğü şüpheli. | Klavye kullanıcısı nerede olduğunu koyu bölümlerde göremeyebilir. Doğrulanamadı — gerçek tarayıcıda sekme turu atılmadı. | Tıklanabilir öğelere `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal`. | Düşük. Yalnızca klavye odağında görünür. |
| 17 | `Hero.tsx:74` | `hero-bg.webp` (282 KB) CSS `background-image` ile yükleniyor — Next Image optimizasyonu **devre dışı**, mobilde de tam boyut iniyor. Üstelik `filter: blur(10px)` uygulanıyor, yani detayın tamamı zaten atılıyor. | LCP yolunda 282 KB gereksiz yük. Blur'lu gösterilen bir görsel için ~800 px genişlik (≈40 KB) görsel olarak ayırt edilemez. Baz Lighthouse Perf 54-55; hedef 85+. | `ffmpeg`/`sharp` ile 800 px genişlikte `hero-bg-blur.webp` üret, `Hero.tsx:74`'te onu kullan. Orijinal dosyaya dokunma (`layout.tsx:77` structured data'da `hero-bg.jpg` geçiyor — **o dosyaya dokunulmayacak**, SEO kuralı). | Düşük. Yeni dosya eklenir. Görsel fark blur altında ayırt edilemez; öncesi/sonrası ekran görüntüsüyle doğrulanmalı. |
| 18 | `Branches.tsx:223` | Maskot `<Image width={650} height={927}>` ama ekranda 64-96 px genişlikte gösteriliyor; `sizes` verilmemiş. Next.js `sizes` yokken `100vw` varsayar ve en büyük varyantı indirir. | ~54 KB kaynak görsel 96 px'lik bir maskot için indiriliyor. Küçük ama bedava kazanç. | `sizes="96px"` ekle. (`Branches.tsx:141` ve `FlipTransition.tsx:170`'teki CSS `background` kullanımları Next Image'dan geçmiyor — ayrı konu, dokunulmayacak.) | Çok düşük. |
| 19 | `Footer.tsx:33,47,56,65,68,71` (`text-white/45` = **4.48:1**) · `Footer.tsx:90` (`text-white/30` = **2.61:1**) | Koyu zeminde düşük opaklıklı metin. 4.48 AA'yı kıl payı kaçırıyor (4.5), 2.61 belirgin şekilde kalıyor. | Footer'daki adres, telefon ve hızlı erişim linkleri sınırda; telif satırı okunmuyor. Telif satırı düşük öneme sahip, adres/telefon değil. | `text-white/45` → `text-white/60` (6.4:1). Telif `text-white/30` → `text-white/45` (4.48:1, sınırda ama küçük ve önemsiz metin). | Çok düşük. Footer bir tık daha parlak görünür. |
| 20 | `globals.css:21` + `Navbar.tsx:50-61` + `Footer.tsx:55` | `html { scroll-behavior: smooth }` ile anchor linkler + **iki `pin`'li ScrollTrigger sahnesi** (mobilde +1600 px ve +1300 px ek kaydırma) bir arada. "Branşlar"a tıklayan kullanıcı ~4000 px'lik bir smooth-scroll yolculuğuna çıkar ve yol üzerindeki iki sahne hızlandırılmış şekilde oynar. | Menüden bölüm seçimi uzun ve kafa karıştırıcı. Mobilde daha belirgin (menüden seçim ana navigasyon yolu). Gerçek tarayıcıda ölçülmedi — kod okumasından çıkarıldı. | İki seçenek: (a) anchor linklerde `behavior: "auto"` kullanan bir tıklama işleyicisi (anlık atlama, sahne atlanır); (b) `scroll-behavior: smooth`'u koru, kabul et. GSAP `ScrollToPlugin` **yeni bağımlılık olmadığı için** (gsap paketinde geliyor) bir seçenek — ancak kural gereği kurulum önerisi olarak bırakıyorum, uygulamıyorum. | **Orta.** Smooth scroll'u kaldırmak sitenin genel his kalitesini düşürebilir. Gerçek cihazda denenmeden karar verilmemeli. |

---

## Düşük öncelikli / kozmetik

| # | Dosya:satır | Sorun | Etkisi | Düzeltme | Risk |
|---|---|---|---|---|---|
| 21 | `globals.css:62,77` | `.liva-enter` / `.liva-enter-solid` → `ease-out` (tarayıcı varsayılanı). STANDARDS.md: yerleşik CSS easing'leri zayıf, güçlü özel eğri beklenir. | Hero girişi biraz "yumuşak" — kusur değil, keskinlik eksikliği. | `cubic-bezier(0.23, 1, 0.32, 1)`. | Çok düşük. |
| 22 | `Navbar.tsx:112` | Mobil menü `height: 0 → "auto"` animasyonu + `ease: "easeInOut"`. `height` layout özelliğidir (GPU dışı); skill giriş/çıkışta `ease-out` ister. | Menü açılışında düzen yeniden hesaplanır. Menü küçük olduğu için pratikte fark edilir kare düşmesi beklenmez — ölçülmedi. | En düşük riskli düzeltme yalnızca easing: `easeInOut` → `easeOut`. `height`→`transform` dönüşümü ise menüyü yeniden yapılandırmayı gerektirir; **önermiyorum**, kazanç riski karşılamıyor. | Easing değişimi çok düşük; yapısal değişim yüksek. |
| 23 | `GalleryStars.tsx:69` | `transition-all duration-400` — yalnızca `background` değişiyor. Ayrıca `duration-400` Tailwind ölçeğinde standart bir adım değil (v4 dinamik değer desteğiyle geçerli olabilir — **doğrulanmadı**). | Yok denecek kadar az. | `transition-colors duration-300`. | Çok düşük. |
| 24 | `Hero.tsx:251` | Kaydırma daveti `delay: 1.4` s sonra beliriyor. | İlk 1.4 saniye boyunca sayfanın devamı olduğuna dair görsel ipucu yok. Instagram'dan gelen kullanıcının ilk saniyeleri kritik. | `delay: 0.9`. | Çok düşük. |
| 25 | Genel | Gölge dili karışık: `shadow-md`, `shadow-lg`, `shadow-xl`, renkli `shadow-teal/15`, `shadow-teal/20`, `shadow-teal/25`, `shadow-green-500/30`, `shadow-primary/15`. Skill #12: yüzey büyüdükçe gölge derinleşmeli, dil tutarlı olmalı. | Bileşenler arası derinlik hiyerarşisi net değil. Tek tek bakıldığında kusur görünmüyor. | İki kademeli bir ölçek belirle (küçük öğe / büyük yüzey) ve renkli gölgeleri yalnızca marka renkli butonlarda bırak. | Düşük ama **çok sayıda dosyaya dokunur** — kapsam kayması riski. Son sıraya alınmalı. |

---

## Dokunulmaması gerekenler

Bunlar zaten doğru yapılmış. Yanlışlıkla "iyileştirilmemeli":

1. **`Hero.tsx:41-49` — parallax `useSpring` ile yumuşatılması.** Skill'in tam olarak önerdiği yöntem: fare konumunu doğrudan transform'a bağlamak yapay durur, spring ile interpolasyon momentum verir. `stiffness: 60, damping: 20` makul.
2. **`KickTransition.tsx:106-109` ve `FlipTransition.tsx:31-34` — `gsap.matchMedia()` ile mobil/masaüstü ayrımı.** Doğru araç, doğru kullanım. Mobilde daha kısa sahne (`+=1600` vs `+=2400`) ve figürün küçülüp kenara çekilmesi (`KickTransition.tsx:150-156`) bilinçli mobil uyarlaması.
3. **`KickTransition.tsx:179-187` ve `FlipTransition.tsx:66-74` — reduced-motion statik geri dönüşleri.** JS ile kontrol edilip tamamen ayrı, sade bir bölüm render ediliyor. Skill'in istediğinden fazlası. (Bulgu #1 bu iki bileşeni **kapsamıyor** — onlar zaten doğru.)
4. **`Branches.tsx:8-40` — `LazyVideo` + IntersectionObserver + `rootMargin: 200px` + poster.** Sayfa ağırlığını 7.2 MB'tan 1.1 MB'a indiren yaklaşımın parçası.
5. **`KickTransition.tsx:32-35` / `FlipTransition.tsx:22-25` — GSAP'ın dinamik import'u.** LCP'yi JS beklemesinden kurtarıyor.
6. **`globals.css:49-77` — hero girişinin CSS animasyonu olması.** Hidrasyon beklemeden ilk boyamada çalışır; skill "önceden belirlenmiş hareket için CSS" der. Doğru karar.
7. **`globals.css:120-122` — marquee `linear` easing.** Sabit hızlı hareket için doğru eğri.
8. **Tailwind'in `rem` tabanlı tipografi ölçeği.** Kullanıcının tarayıcı yazı boyutu ayarı çalışıyor; sabit `px` başlık yok. Skill #15'in "Dynamic Type" karşılığı sağlanmış.
9. **Ağırlık + boyut ile kurulmuş hiyerarşi** (`font-extrabold` / `font-bold` / `font-semibold` / `font-light`) — yalnızca boyutla kurulmamış.
10. **Küçük uppercase rozetlerde pozitif `tracking-[2px]`/`[3px]`.** Skill'in tam istediği: küçük metin pozitif tracking alır. Madde #11 yalnızca **büyük başlıkları** hedefler, bunlara dokunulmayacak.
11. **Koyu kırmızı `#8B1A1A` kontrastları:** beyaz üstünde 9.29:1, beyaz metinle zemin olarak 9.29:1. Sorunsuz.
12. **Scroll'a bağlı `pin` + `scrub` geçiş kararı** (PROGRESS.md, 18 Tem). Otomatik oynatma denenip bilinçli olarak geri alınmış. Bu bir tasarım kararıdır, denetim konusu değil.
13. **`liva-scroll-hint` / `liva-scroll-hint2` hatırlatıcıları.** Pin'li sahnede kullanıcının "sayfa dondu" sanmasını önlüyor — skill'in "yön bulma" (wayfinding) ilkesi.
14. **Tüm SEO yapısı:** meta etiketleri, `jsonLd` (`layout.tsx:70-128`), `faqJsonLd` (`Faq.tsx:36-44`), başlık hiyerarşisi, `alt` metinleri, `sitemap.ts`, `robots.ts`. Kural gereği hiçbirine dokunulmayacak.

---

## Skill'in önerdiği ama bu sitede uygulanmayacaklar

Rapor dürüst olsun diye açıkça yazıyorum — bunlar atlanacak, unutulduğu için değil:

- **Sürükleme/jest mekaniği** (apple-design §2, §5, §6, §9, §10; STANDARDS.md "Gestures & drag"): pointer capture, hız devri, momentum projeksiyonu, lastik bandı direnci. **Bu sitede kullanıcı hiçbir şeyi sürüklemiyor.** Sürüklenebilir tek bir öğe yok. Tamamı kapsam dışı.
- **Motion / Framer Motion'a geçiş, spring tabanlı yeniden yazım** (apple-design §4): GSAP + ScrollTrigger kalacak (kural 5). Skill'in ilkeleri mevcut GSAP koduna uygulanacak, kütüphane değişmeyecek.
- **Kesilebilirlik / spring ile yeniden hedefleme** (apple-design §3): buradaki tek uzun hareket `scrub`'lu ScrollTrigger'dır ve doğası gereği kesilebilir — kullanıcı ters yöne kaydırdığı anda sahne geri sarılır. Ek bir şey gerekmiyor.
- **Haptik geri bildirim ve ses** (apple-design §13): bir tanıtım sitesinde yeri yok. Vibration API mobil tarayıcılarda tutarsız ve izinsiz titreşim rahatsız edicidir.
- **"Animasyonu sil"** (review-animations, düzeltme hiyerarşisi 1. madde): geçiş sahneleri (`KickTransition`, `FlipTransition`) sitenin ayırt edici özelliği ve sizin açık kararınız. Silme önerisi getirilmeyecek. Yalnızca #4'te galeri yıldızları için — tekrar eden dekoratif hareket olduğu için — azaltma seçeneği sunuldu.
- **`prefers-reduced-transparency` ve `prefers-contrast`** (apple-design §14): şu an hiç desteklenmiyor. Madde #13 (navbar şeffaflaşması) uygulanırsa `reduced-transparency` geri dönüşü **zorunlu** hale gelir; uygulanmazsa gereksiz. Bu yüzden ayrı madde açmadım, #13'ün parçası.
- **Yeni bağımlılık gerektiren her şey:** GSAP `ScrollToPlugin` (madde #20 için faydalı olurdu, gsap paketi içinde geliyor ama yine de yeni bir modül) — kural 6 gereği yalnızca öneri olarak bırakıldı, kurulmadı.

---

## Önerilen uygulama sırası

Sıralama etki/risk oranına göre. Her madde ayrı commit, her maddeden sonra 375 px ve 1440 px kontrolü.

| Sıra | Madde | Ne yapılır | Süre | Bozma riski |
|---|---|---|---|---|
| 1 | **#3** | Tıklanabilir öğelere `:active` basma geri bildirimi | 25 dk | Çok düşük — #7 ile birlikte yapılmalı |
| 2 | **#7** | `transition-all` → hedefli geçişler (17 yer) | 30 dk | Düşük |
| 3 | **#1** | `MotionConfig reducedMotion="user"` sarmalayıcı | 15 dk | Düşük |
| 4 | **#5** | Galeri mobil dokunma davranışı | 15 dk | Düşük |
| 5 | **#10** | Dokunma hedeflerini 44 px'e çıkar | 20 dk | Düşük |
| 6 | **#4** | Galeri yıldızları: sayı azaltma + `scale(0)` düzeltmesi + rastgeleliği sabitleme | 25 dk | Düşük-orta (görsel) |
| 7 | **#8** | Hover hareketlerini `hover: hover` ile kapıla (önce Tailwind 4 davranışı doğrulanır) | 25 dk | Düşük |
| 8 | **#19** | Footer metin opaklıkları | 10 dk | Çok düşük |
| 9 | **#14** | Stagger gecikmelerini 60-70 ms'ye çek | 10 dk | Çok düşük |
| 10 | **#15** | Branches kartlarından yanlış `cursor-pointer` | 5 dk | Çok düşük |
| 11 | **#16** | `focus-visible` odak halkaları | 20 dk | Düşük |
| 12 | **#9** | `liva-cta-pulse` → transform/opacity | 25 dk | Düşük-orta (görsel eşleme) |
| 13 | **#11** | Büyük başlıklarda tracking/leading | 20 dk | Düşük — 375 px'te satır kırılımı kontrolü şart |
| 14 | **#18** | Maskot `sizes="96px"` | 5 dk | Çok düşük |
| 15 | **#17** | Blur'lu hero arka planı için küçük varyant üret | 30 dk | Düşük — yeni dosya |
| 16 | **#6 (yalnız Hero)** | `min-h-screen` → `min-h-[100dvh]` | 10 dk | Düşük |
| 17 | **#21, #23, #24** | Kozmetik üçlü (easing eğrisi, `transition-colors`, davet gecikmesi) | 15 dk | Çok düşük |
| — | **#2** | CTA kontrastı | 20 dk | **Karar sizin** — marka görünümünü değiştirir |
| — | **#12** | Açık zemin turkuaz metin tonu | 25 dk | **Karar sizin** — yeni renk token'ı |
| — | **#13** | Navbar şeffaflığı (+ `reduced-transparency` geri dönüşü) | 35 dk | **Orta** — koyu görsel üstünde okunurluk testi şart |
| — | **#20** | Smooth scroll + pin etkileşimi | 40 dk | **Orta** — gerçek cihaz testi olmadan yapılmamalı |
| — | **#6 (pin'li sahneler)** | `h-screen` → `h-[100dvh]` | 30 dk | **Orta-yüksek** — ScrollTrigger pin hesabı; gerçek iOS testi şart |
| — | **#22, #25** | Menü easing'i + gölge dili | 45 dk | #25 çok dosyaya dokunur, en sona |

Kesintisiz uygulanırsa 1-17. sıralar toplam **≈ 5 saat**.

---

## Ölçülmeyenler (dürüstlük notu)

- Gerçek cihazda/tarayıcıda kare hızı, TBT, LCP **ölçülmedi**. Performansla ilgili tüm iddialar (#4, #9, #17, #22) kod okumasından çıkarılan risklerdir.
- iOS Safari davranışı (#6, #20) gerçek cihazda **doğrulanmadı**.
- Tailwind 4'ün `hover:` varyantını `@media (hover: hover)` ile sarıp sarmadığı (#8) **doğrulanmadı** — uygulama öncesi kontrol edilecek.
- Klavye ile sekme turu **atılmadı** (#16).
- `duration-400` sınıfının Tailwind 4'te geçerli olup olmadığı (#23) **doğrulanmadı**.
- Bu makinede tarayıcı otomasyonu güvenilir çalışmıyor; görsel doğrulama Faz 4'te dev sunucu + elle kontrol ile yapılacak.

---

# Uygulama Kaydı — 6 Ağustos 2026

Branch: `apple-design-audit` · 17 düzeltme commit'i + 1 rapor commit'i · 22 dosya, +913/−80 satır.
Onaylanan kapsam: **güvenli paket** (#2 karar bekliyor, #12 ve riskli maddeler bu turda yok).

## Uygulananlar

| # | Commit | Ne yapıldı | Doğrulama |
|---|---|---|---|
| 3 | `2f13c31`, `bfad873` | Tıklanabilir öğelere basma geri bildirimi: butonlarda `active:scale-[0.97]`, metin linklerinde `active:opacity-60`, framer bileşenlerinde `whileTap` | 7 temsili öğede Playwright ile ölçüldü, 7/7 tepki veriyor |
| 7 | `890d4da` | 17 yerdeki `transition-all` gerçekten değişen özelliklerle değiştirildi | `transition-all` grep: 0 sonuç; navbar geçişi + menü ölçümle doğrulandı |
| 1 | `256cba2` | `MotionProvider` (`MotionConfig reducedMotion="user"`) + hero parallax'ta `useReducedMotion` | Öncesi: yıldız transform + parallax çalışıyordu. Sonrası: ikisi de durdu; normal modda çalışmaya devam ediyor |
| 5 | `3f854bf` | Galeri etiketleri dokunuşta kilitleniyor; hover `pointerType` ile gerçek fareye bağlandı | Mobilde tap sonrası etiket opaklığı 0→1; başka karta dokununca öncekisi kapanıyor; masaüstü hover korundu |
| 10 | `202fcaf` | Dokunma hedefleri 44px'e çıkarıldı | Ölçüldü: hamburger 40×34→44×44, galeri filtresi 38→46, footer linkleri 20→44 |
| 4a | `76f3937` | Galeri yıldızlarının çıkış yönü `STAR_CONFIGS`'te sabit `dx/dy` alanlarına taşındı | Filtre geçişlerinde konsol/JS hatası yok |
| 19 | `0baf0a1` | Footer metin opaklıkları | Hesaplandı: 4.48→**7.30:1**, telif 2.61→**5.37:1** |
| 14 | `eee3800` | Stagger 130/150ms → 60/70ms | — |
| 15 | `7ebf56b` | Branşlar kartlarından yanlış `cursor-pointer` | — |
| 16 | `22ba006` | Klavye odak göstergesi (beyaz+siyah çift halka) | Sekme turunda 8/8 durakta halka doğrulandı |
| 9 | `7c9610b` | CTA nabzı `box-shadow` → `::after` + `transform`/`opacity` | `::after` transform/opacity örneklendi; eleman gölgesi statik |
| 11 | `25d9ad6` | Büyük başlıklarda `tracking`/`leading` | 375px'te taşma yok, satır kırılımı bozulmadı |
| 18 | `2f61fee` | Branşlar maskotuna `sizes="96px"` | — |
| 17 | `f50a261` | `hero-bg-blur.webp` (800×1067) üretildi: **282KB → 57KB** | 1440px'te blur altında kalite farkı görünmüyor |
| 6 | `3e8ffac` | Hero `min-h-screen` → `min-h-[100dvh]` (**yalnızca Hero**) | — |
| 21, 24 | `7de9ed6` | Giriş eğrisi `cubic-bezier(0.23,1,0.32,1)`; kaydırma daveti 1.4s→0.9s | — |
| 23 | (#7 içinde) | Geçersiz `duration-400` → `transition-colors duration-300` | Aynı satırda olduğu için #7 ile birlikte yapıldı |

## Uygulanmayanlar ve nedenleri

| # | Neden |
|---|---|
| **2** — CTA kontrastı | **KARAR VERİLDİ (6 Ağu): V1 — mevcut hâl kalıyor.** Turkuaz zemin üzerinde beyaz metin, 2.17:1. Bu, bilinçli olarak kabul edilmiş bir erişilebilirlik açığıdır: güneş altında ve düşük görme keskinliğinde ana çağrı butonunun metni okunmayabilir. Marka görünümü korunmak istendiği için kod değiştirilmedi. |
| **8** — hover kapılaması | **Gereksiz çıktı.** Ölçüm: Tailwind 4 `hover:` varyantını zaten `@media (hover: hover)` ile sarıyor (dokunmatik emülasyonda `hover:scale-105` hiç uygulanmadı), framer `whileHover` da dokunuşta tetiklenmiyor. Raporun bu maddesi **düşmüştür**. |
| **4b** — yıldız sayısını azaltma | Görünüm kararı; sizin talimatınızla ertelendi. |
| **12** — açık zemin turkuaz metin tonu | **UYGULANDI (`5457015`).** Yeni `--color-teal-text: #0F6E65` yalnızca metin için; marka turkuazı zemin/vurgu olarak aynen duruyor. Ölçüm: beyaz 2.94→**6.11:1**, açık gri 2.70→**5.60:1**, `bg-teal/10` 2.72→**5.64:1**, `bg-teal/5` 2.83→**5.87:1**. |
| **13** — navbar şeffaflığı | **UYGULANDI (`2d3aa47`).** `bg-white/95`+`blur-md` → %72 beyaz + `blur(20px) saturate(180%)`. Raporda yazdığım okunabilirlik riski **gerçekleşmedi**: gerçek piksel örneklemesiyle ölçülen menü metni kontrastı beyaz bölümde 19.8:1, açık gride 19.3:1, galeride 19.3:1, koyu İletişim bölümünde **10.31:1** — en kötü durum bile AA eşiğinin iki katından fazla. `prefers-reduced-transparency` ve `@supports not (backdrop-filter)` geri dönüşleri eklendi. |
| **20** — smooth scroll + pin etkileşimi | Riskli grup; gerçek cihaz testi gerekiyor. |
| **6 (pin'li sahneler)** | ScrollTrigger pin hesabı `dvh` ile iOS'ta kayabilir; gerçek cihaz testi olmadan yapılmadı. |
| **22, 25** | Menü easing'i ve gölge dili; kapsam dışı bırakıldı. |
| **#4'teki `scale: 0`** | Raporda #4'ün parçasıydı ama 4a/4b ayrımında yer almadı. Görünümü değiştirdiği için **sormadan yapılmadı**. |

## Kırılma kontrolü (375px ve 1440px, Playwright)

Her iki genişlikte de: 7/7 bölüm yerinde · mobil menü açılıp kapanıyor (panel 345px) · her iki `pin`'li ScrollTrigger sahnesi pin-spacer üretiyor ve figürler dönüyor · SSS açılıyor · galeri filtresi çalışıyor · 10 WhatsApp bağlantısı · JS/konsol hatası yok.

**SEO korundu:** `h1=1`, `h2=8`, `h3=8`, 2 adet JSON-LD (SportsClub + FAQPage) — denetim öncesiyle aynı. Meta etiketleri, `sitemap.ts`, `robots.ts`, `alt` metinleri, `hero-bg.jpg` (structured data görseli) hiç değiştirilmedi.

## CTA varyant karşılaştırması (madde #2 — karar sizde)

Geçici bir Next.js route'unda gerçek buton sınıflarıyla üretildi, ekran görüntüsü alındı, **route silindi** (canlıya çıkma riski yok, commit edilmedi).

- `Masaüstü/liva-cta-varyantlari.html` — tek dosya, çift tıklayıp açabilirsiniz
- `Masaüstü/liva-cta-varyantlari-375px.png` — 375px tam sayfa görüntü

| Varyant | Birincil buton | Ölçülen kontrast | AA (4.5:1) |
|---|---|---|---|
| V1 — mevcut | beyaz metin / `#2EC4B6` | **2.17:1** | kalır |
| V2 — koyu metin | `#0A3B36` / `#2EC4B6` | **5.73:1** | geçer |
| V3 — bordo birincil | beyaz / `#8B1A1A`, turkuaz ikincile geçer | **9.29:1** | geçer |

**Düzeltme:** Raporun ilk sürümünde V2 için "8.9:1" yazmıştım; o değer hesaplanmamış bir tahmindi. Ölçülen değer **5.73:1** — AA eşiğini yine geçiyor ama farkı bilerek karar verin.

## Yolda görülen, kapsam dışı bırakılan bulgular

Talimat gereği düzeltilmedi, not edildi:

1. **375×812'de hero içeriği viewport'a sığmıyor** — "İletişim" butonu ile "Keşfetmek için kaydır" daveti çakışıyor. `#11` ve `#6` sonrası hafifledi ama tamamen çözülmedi. Denetim raporunda yoktu; ekran görüntüsünde tespit edildi.
2. **`KickTransition.tsx:45-54,140,142`'de `Math.random()`** — çatlak deseni ve cam parçalarının düşüş yönü her yüklemede farklı. `useEffect` içinde olduğu için hidrasyon riski **yok**; kasıtlı bir tasarım tercihi olabilir. #4a kapsamına alınmadı.
3. **Basma tepkisi süresi 300ms** — `active:scale` geçişleri butonların mevcut 300ms süresini kullanıyor. STANDARDS.md buton basma geri bildirimi için 100-160ms öneriyor. Süre değişikliği #7'nin kapsamı dışındaydı.
4. **Reduced-motion'da galeri yıldızlarının opaklığı hâlâ yanıp sönüyor** — `MotionConfig` transform animasyonlarını durduruyor, opaklığı kasıtlı olarak bırakıyor. Vestibüler risk (hareket) giderildi; dekoratif yanıp sönme kaldı.
5. **`public/images/hero-bg.jpg` (1.2MB)** yalnızca structured data ve opengraph için duruyor, kullanıcıya servis edilmiyor. SEO kuralı gereği dokunulmadı.

## Not: marka renkleri

Görev tanımında koyu kırmızı `#8B0000` ve turkuaz `#40E0D0` yazıyor. Koddaki gerçek değerler farklı: `globals.css:6` `--color-primary: #8B1A1A`, `globals.css:8` `--color-teal: #2EC4B6`. Kural "bu renkleri değiştirme" olduğu için **koddaki mevcut değerlere dokunmadım** ve tüm kontrast hesaplarını gerçek değerlerle yaptım. Görev tanımındaki hex'ler yaklaşık hatırlanmış görünüyor; bir yanlış anlama varsa söyleyin.
