"use client";

import { useEffect, useRef, useState } from "react";

export default function FlipTransition() {
  const stageRef = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }
    const stage = stageRef.current;
    if (!stage) return;

    // GSAP açılış paketine girmesin — LCP sonrası dinamik yüklenir
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]);
    if (cancelled) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(
        { isMobile: "(max-width: 767px)", isDesktop: "(min-width: 768px)" },
        (mmCtx) => {
          const { isMobile } = mmCtx.conditions as { isMobile: boolean };
          // Animasyon scroll'a bağlı: kaydırdıkça ilerler, geri sarılabilir.
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: isMobile ? "+=1300" : "+=1800",
              scrub: 0.4,
              pin: true,
            },
          });

          tl.fromTo(".liva-gymnast", { x: 0 }, { x: "185vw", duration: 5, ease: "none" })
            .to(".liva-gymnast", { rotation: 1440, duration: 5, ease: "power1.inOut" }, 0)
            .to(".liva-gymnast", { y: isMobile ? -55 : -90, duration: 1.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0)
            .to(".liva-curtain", { clipPath: "inset(0% 0 0 0)", duration: 3.4, ease: "power2.inOut" }, 0.9)
            .fromTo(".liva-curtain > *", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, stagger: 0.25 }, 2.2)
            .to(".liva-scroll-hint2", { opacity: 0, duration: 0.6 }, 3.2)
            .to({}, { duration: 0.6 });
        }
      );
    }, stage);

    cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  if (reduced) {
    return (
      <section aria-label="Branşlar tanıtım" className="relative w-full py-24 flex flex-col items-center justify-center text-center px-6"
        style={{ background: "linear-gradient(160deg,#0f4f49 0%, #2EC4B6 120%)" }}>
        <span className="font-extrabold text-sm tracking-[3px]" style={{ color: "#04302c" }}>BRANŞLARIMIZ</span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3">Cimnastik &amp; Taekwondo Enerjisi</h2>
      </section>
    );
  }

  return (
    <section ref={stageRef} aria-label="Cimnastik takla geçişi" className="relative w-full h-[100dvh] overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 35%, #24100f 0%, #120909 55%, #0A0A0A 100%)" }}>
      {/* Sahne dokusu — cimnastikçi siyah boşlukta değil, ışıklı sahnede takla atar */}
      <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div style={{
          position: "absolute", inset: "-25%",
          background: "repeating-conic-gradient(from 0deg at 50% 40%, rgba(46,196,182,.05) 0deg 7deg, transparent 7deg 22deg)",
        }} />
        <div style={{
          position: "absolute", top: "-12%", left: "-8%", width: "42vw", height: "42vw",
          maxWidth: 500, maxHeight: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,26,26,.45) 0%, transparent 65%)",
          filter: "blur(50px)", animation: "liva-blob 10s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "-12%", right: "-8%", width: "46vw", height: "46vw",
          maxWidth: 540, maxHeight: 540, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(46,196,182,.28) 0%, transparent 65%)",
          filter: "blur(52px)", animation: "liva-blob 12s ease-in-out infinite reverse",
        }} />
        <div style={{
          position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)",
          fontSize: "clamp(100px,22vw,280px)", fontWeight: 800, letterSpacing: 10, lineHeight: 1,
          color: "transparent", WebkitTextStroke: "2px rgba(46,196,182,.1)", userSelect: "none",
          whiteSpace: "nowrap",
        }}>LIVA</div>
        {[
          { top: "20%", left: "14%", size: 6, delay: 0.2, dur: 5.7 },
          { top: "32%", left: "82%", size: 5, delay: 1.3, dur: 6.4 },
          { top: "62%", left: "8%", size: 5, delay: 2.2, dur: 6.1 },
          { top: "70%", left: "88%", size: 7, delay: 0.8, dur: 5.4 },
          { top: "14%", left: "60%", size: 4, delay: 1.8, dur: 7 },
        ].map((p, i) => (
          <div key={i} style={{
            position: "absolute", top: p.top, left: p.left, width: p.size, height: p.size,
            borderRadius: "50%", background: "#2EC4B6",
            boxShadow: `0 0 ${p.size * 2}px ${p.size / 2}px rgba(46,196,182,.4)`,
            animation: `liva-float ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }} />
        ))}
      </div>
      {/* Takladan sonra perde gibi açılan tanıtım */}
      <div className="liva-curtain absolute inset-0 z-[1] flex flex-col items-center justify-center text-center px-6"
        style={{ background: "linear-gradient(160deg,#0f4f49 0%, #2EC4B6 120%)", clipPath: "inset(100% 0 0 0)" }}>
        {/* Doku: ışın deseni + filigran + süzülen noktalar */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
          <div style={{
            position: "absolute", inset: "-25%",
            background: "repeating-conic-gradient(from 0deg at 50% 45%, rgba(255,255,255,.06) 0deg 7deg, transparent 7deg 22deg)",
          }} />
          <div style={{
            position: "absolute", bottom: "-4%", left: "50%", transform: "translateX(-50%)",
            fontSize: "clamp(120px,26vw,320px)", fontWeight: 800, letterSpacing: 10, lineHeight: 1,
            color: "transparent", WebkitTextStroke: "2px rgba(255,255,255,.12)", userSelect: "none",
          }}>LIVA</div>
          {[
            { top: "14%", left: "10%", size: 6, delay: 0.4, dur: 5.6 },
            { top: "24%", left: "88%", size: 5, delay: 1.5, dur: 6.5 },
            { top: "70%", left: "6%", size: 5, delay: 2.4, dur: 6 },
            { top: "78%", left: "92%", size: 7, delay: 0.9, dur: 5.3 },
          ].map((p, i) => (
            <div key={i} style={{
              position: "absolute", top: p.top, left: p.left, width: p.size, height: p.size,
              borderRadius: "50%", background: "#fff",
              boxShadow: `0 0 ${p.size * 2}px ${p.size / 2}px rgba(255,255,255,.35)`,
              animation: `liva-float ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }} />
          ))}
        </div>
        <span className="relative inline-block bg-white/20 font-extrabold text-sm tracking-[3px] px-5 py-2 rounded-full backdrop-blur-sm" style={{ color: "#04302c" }}>BRANŞLARIMIZ</span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-[-0.02em] leading-[1.1] mt-3 mb-4">
          Cimnastik &amp; Taekwondo<br />Enerjisi
        </h2>
        <p className="max-w-xl leading-relaxed" style={{ color: "#e8fffd" }}>
          İki güçlü branş, tek çatı altında — çocuğunuza en uygun olanı birlikte seçelim.
        </p>
      </div>

      {/* Kaydırma hatırlatıcısı — sahne boyunca görünür, sonda kaybolur */}
      <div className="liva-scroll-hint2 absolute bottom-5 left-1/2 -translate-x-1/2 z-[20] pointer-events-none">
        <span className="flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white/90 text-xs font-semibold tracking-[2px] uppercase px-5 py-2.5 rounded-full border border-teal/30 animate-pulse">
          <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
          Kaydırmaya devam et
        </span>
      </div>

      {/* DEV cimnastikçi — ekranı kaplayarak takla atar */}
      <div className="liva-gymnast absolute bottom-[4vh] left-[-70vw] z-[5] h-[52vh] md:h-[80vh]"
        style={{ filter: "drop-shadow(0 14px 34px rgba(0,0,0,.55))" }} aria-hidden="true">
        <div className="h-full" style={{
          aspectRatio: "1/1",
          background: "url('/images/cimnastik.webp') no-repeat right center / 200% auto",
        }} />
      </div>
    </section>
  );
}
