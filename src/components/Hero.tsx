"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image - Zoomed, bottom focused, heavy blur */}
      <div
        className="absolute inset-0 scale-130"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 70%",
          filter: "blur(10px) brightness(1.4) saturate(1.1)",
        }}
      />

      {/* Light Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/15 to-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full">
        {/* Logo */}
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl scale-125" />
          <Image
            src="/images/logo.png"
            alt="Liva Spor Kulübü logosu"
            width={176}
            height={176}
            className="relative h-32 sm:h-44 w-auto"
            priority
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-10 drop-shadow-lg">
          Geleceğin Şampiyonları
          <br />
          <span className="inline-block border-2 border-teal/50 rounded-xl px-6 py-2 text-orange-400 drop-shadow-md">Burada Yetişir</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto mb-16 leading-relaxed font-light tracking-wide drop-shadow">
          Cimnastik & Taekwondo eğitimiyle çocuğunuzun potansiyelini keşfedin.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-md sm:max-w-none">
          <a
            href="https://wa.me/905416445376"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp ile ücretsiz deneme dersi için iletişime geç"
            className="w-full sm:w-auto bg-teal hover:bg-teal-light text-white font-bold text-sm sm:text-base px-8 sm:px-12 py-4 sm:py-5 rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl shadow-teal/25 tracking-wide text-center"
          >
            Ücretsiz Deneme Dersi
          </a>
          <a
            href="#iletisim"
            aria-label="İletişim bölümüne git"
            className="w-full sm:w-auto border-2 border-white/30 hover:border-teal/50 text-white font-semibold text-sm sm:text-base px-8 sm:px-12 py-4 sm:py-5 rounded-2xl transition-all duration-300 hover:bg-white/10 tracking-wide text-center"
          >
            İletişim
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1">
          <div className="w-1 h-2 bg-teal rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
