"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from "framer-motion";

// Süzülen ışık parçacıkları (sabit konumlar — SSR/istemci uyumu için rastgele yok)
const PARTICLES = [
  { top: "18%", left: "8%",  size: 7, delay: 0,   dur: 5.2, color: "#2EC4B6" },
  { top: "32%", left: "16%", size: 5, delay: 1.1, dur: 6.4, color: "#ffffff" },
  { top: "64%", left: "11%", size: 6, delay: 2.3, dur: 5.8, color: "#D4AF37" },
  { top: "78%", left: "22%", size: 4, delay: 0.6, dur: 7.1, color: "#2EC4B6" },
  { top: "22%", left: "84%", size: 6, delay: 1.7, dur: 5.5, color: "#2EC4B6" },
  { top: "38%", left: "91%", size: 4, delay: 0.3, dur: 6.8, color: "#ffffff" },
  { top: "58%", left: "87%", size: 7, delay: 2.9, dur: 5.1, color: "#D4AF37" },
  { top: "74%", left: "78%", size: 5, delay: 1.4, dur: 6.2, color: "#2EC4B6" },
  { top: "12%", left: "38%", size: 4, delay: 2.0, dur: 7.4, color: "#ffffff" },
  { top: "16%", left: "63%", size: 5, delay: 0.9, dur: 5.9, color: "#2EC4B6" },
  { top: "85%", left: "45%", size: 6, delay: 1.9, dur: 6.6, color: "#ffffff" },
  { top: "88%", left: "62%", size: 4, delay: 0.2, dur: 5.4, color: "#D4AF37" },
];

export default function Hero() {
  // Sinematik video arka plan: animasyon isteyen kullanıcıda, LCP boyandıktan
  // sonra devreye girer (fotoğraf poster olarak kalır). Mobil dikey sürüm alır.
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mobile = !window.matchMedia("(min-width: 768px)").matches;
    const t = setTimeout(
      () => setVideoSrc(mobile ? "/videos/hero-bg-mobil.mp4" : "/videos/hero-bg.mp4"),
      1200
    );
    return () => clearTimeout(t);
  }, []);

  // Parallax doğrudan motion value'ya bağlı olduğu için MotionConfig'in
  // reducedMotion ayarı bunu kapsamaz — ayrıca kapatılması gerekiyor.
  const hareketAzalt = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const bgX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const bgY = useTransform(springY, [-0.5, 0.5], [-20, 20]);
  const logoX = useTransform(springX, [-0.5, 0.5], [-32, 32]);
  const logoY = useTransform(springY, [-0.5, 0.5], [-32, 32]);
  const contentX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const contentY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (hareketAzalt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background — Parallax katman 1 (en yavaş) */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          inset: "-12%",
          // 10px blur altında gösterildiği için küçük varyant yeterli (282KB -> 57KB)
          backgroundImage: "url('/images/hero-bg-blur.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 70%",
          filter: "blur(10px) brightness(1.05) saturate(1.1)",
          x: bgX,
          y: bgY,
        }}
      />

      {/* Sinematik video arka plan — fotoğrafın üzerine yumuşak geçişle biner */}
      {videoSrc && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{
            zIndex: 1,
            filter: "brightness(.62) saturate(1.15)",
            animation: "liva-fade-up 1.6s ease-out both",
          }}
          src={videoSrc}
        />
      )}

      {/* Overlay — başlık okunurluğu için koyulaştırıldı + vinyet */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-black/25 to-black/65"
        style={{ zIndex: 2 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2, background: "radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(0,0,0,.45) 100%)" }}
      />

      {/* Renk ışımaları — köşelerde süzülen marka renkleri */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          zIndex: 3, top: "-8%", left: "-6%", width: "44vw", height: "44vw",
          maxWidth: 520, maxHeight: 520, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(46,196,182,.32) 0%, transparent 65%)",
          filter: "blur(48px)", animation: "liva-blob 9s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          zIndex: 3, bottom: "-10%", right: "-8%", width: "50vw", height: "50vw",
          maxWidth: 560, maxHeight: 560, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,26,26,.4) 0%, transparent 65%)",
          filter: "blur(52px)", animation: "liva-blob 11s ease-in-out infinite reverse",
        }}
      />

      {/* Süzülen parçacıklar */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute pointer-events-none rounded-full"
          style={{
            zIndex: 3, top: p.top, left: p.left, width: p.size, height: p.size,
            background: p.color, boxShadow: `0 0 ${p.size * 2}px ${p.size / 2}px ${p.color}55`,
            animation: `liva-float ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* İçerik */}
      <div
        className="relative flex flex-col items-center justify-center text-center px-6 w-full"
        style={{ zIndex: 4 }}
      >
        {/* Logo — Parallax katman 2 (orta); giriş animasyonu CSS'te (LCP JS beklemesin) */}
        <motion.div className="relative mb-10" style={{ x: logoX, y: logoY }}>
          <div className="liva-enter-solid" style={{ animationDelay: "0.05s" }}>
            <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl scale-125" />
            <Image
              src="/images/logo.png"
              alt="Liva Spor Kulübü logosu"
              width={176}
              height={176}
              className="relative h-32 sm:h-44 w-auto max-w-[88vw] object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </motion.div>

        {/* Metin — Parallax katman 3 (en hafif) */}
        <motion.div
          className="flex flex-col items-center"
          style={{ x: contentX, y: contentY }}
        >
          <div
            className="liva-enter-solid mb-6 inline-flex items-center gap-2 rounded-full border border-teal/40 bg-black/30 px-5 py-2 backdrop-blur-sm"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="text-teal font-semibold text-xs sm:text-sm tracking-[2px] uppercase">
              Başakşehir · Cimnastik &amp; Taekwondo
            </span>
          </div>

          <h1
            className="liva-enter-solid text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-[-0.02em] leading-[1.1] mb-10 drop-shadow-lg"
            style={{ animationDelay: "0.15s" }}
          >
            Geleceğin{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(100deg, #D4AF37 0%, #3DD5C7 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 2px 8px rgba(0,0,0,.4))",
              }}
            >
              Şampiyonları
            </span>
            <br />
            <span
              className="inline-block rounded-xl px-6 py-2 text-teal drop-shadow-md border border-teal/40"
              style={{
                background: "linear-gradient(135deg, rgba(46,196,182,.16) 0%, rgba(139,26,26,.2) 100%)",
                boxShadow: "0 0 32px rgba(46,196,182,.25), inset 0 0 24px rgba(46,196,182,.06)",
              }}
            >
              Burada Yetişir
            </span>
          </h1>

          <p
            className="liva-enter text-base sm:text-lg text-white/80 max-w-xl mx-auto mb-16 leading-relaxed font-light tracking-wide drop-shadow"
            style={{ animationDelay: "0.4s" }}
          >
            Cimnastik & Taekwondo eğitimiyle çocuğunuzun potansiyelini keşfedin.
          </p>

          <div
            className="liva-enter flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-md sm:max-w-none"
            style={{ animationDelay: "0.55s" }}
          >
            <a
              href="https://wa.me/905416445376"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp ile ücretsiz deneme dersi için iletişime geç"
              className="liva-cta-pulse w-full sm:w-auto bg-teal hover:bg-teal-light text-white font-bold text-sm sm:text-base px-8 sm:px-12 py-4 sm:py-5 rounded-2xl transition-[background-color,scale] duration-300 hover:scale-105 active:scale-[0.97] tracking-wide text-center"
            >
              Ücretsiz Deneme Dersi
            </a>
            <a
              href="#iletisim"
              aria-label="İletişim bölümüne git"
              className="w-full sm:w-auto border-2 border-white/30 hover:border-teal/50 text-white font-semibold text-sm sm:text-base px-8 sm:px-12 py-4 sm:py-5 rounded-2xl transition-[background-color,border-color,scale] duration-300 hover:bg-white/10 active:scale-[0.97] tracking-wide text-center"
            >
              İletişim
            </a>
          </div>
        </motion.div>
      </div>

      {/* Kaydırma daveti — sayfanın devamı olduğunu net söyler */}
      <motion.button
        type="button"
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.95, behavior: "smooth" })}
        aria-label="Aşağı kaydır, siteyi keşfet"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 group cursor-pointer bg-transparent border-0"
        style={{ zIndex: 4 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        whileTap={{ scale: 0.94 }}
      >
        <span className="text-white/70 group-hover:text-white text-xs font-semibold tracking-[2px] uppercase transition-colors">
          Keşfetmek için kaydır
        </span>
        <span className="flex flex-col items-center animate-bounce" aria-hidden="true">
          <svg className="w-5 h-5 text-teal -mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
          <svg className="w-5 h-5 text-teal/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </motion.button>
    </section>
  );
}
