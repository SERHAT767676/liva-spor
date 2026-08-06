"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Darbe noktası (ekran yüzdesi)
const IX = 58;
const IY = 42;

export default function KickTransition() {
  const stageRef = useRef<HTMLElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const cracksRef = useRef<SVGSVGElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }

    const stage = stageRef.current;
    const glass = glassRef.current;
    const svg = cracksRef.current;
    if (!stage || !glass || !svg) return;

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

    // ── Çatlak çizgileri: darbe noktasından ışınsal kırık hatlar + bağ halkaları
    const NS = "http://www.w3.org/2000/svg";
    const paths: SVGPathElement[] = [];
    const rays = 13;
    const ringPts: [number, number][][] = [[], []];
    for (let i = 0; i < rays; i++) {
      const ang = (i / rays) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const len = 42 + Math.random() * 28;
      let d = `M ${IX} ${IY}`;
      let x = IX;
      let y = IY;
      const segs = 5 + Math.floor(Math.random() * 3);
      for (let s = 1; s <= segs; s++) {
        const r = (len * s) / segs;
        x = IX + Math.cos(ang) * r + (Math.random() - 0.5) * 3;
        y = IY + Math.sin(ang) * r * 1.05 + (Math.random() - 0.5) * 3;
        d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
        if (s === 2) ringPts[0].push([x, y]);
        if (s === 3) ringPts[1].push([x, y]);
      }
      const p = document.createElementNS(NS, "path");
      p.setAttribute("d", d);
      p.setAttribute("vector-effect", "non-scaling-stroke");
      svg.appendChild(p);
      paths.push(p);
    }
    ringPts.forEach((ring) => {
      if (ring.length < 3) return;
      const p = document.createElementNS(NS, "path");
      p.setAttribute("d", "M " + ring.map((pt) => `${pt[0].toFixed(1)} ${pt[1].toFixed(1)}`).join(" L "));
      p.setAttribute("vector-effect", "non-scaling-stroke");
      p.style.strokeWidth = "1.2";
      svg.appendChild(p);
      paths.push(p);
    });
    paths.forEach((p) => {
      const L = p.getTotalLength();
      p.style.strokeDasharray = String(L);
      p.style.strokeDashoffset = String(L);
    });

    // ── Cam parçaları: darbe noktasından ışınsal dilimler; her parça aynı tam
    //    ekran içeriği taşır, birleşikken kusursuz tek ekran görünür
    const SHARDS = 8;
    const shardEls: HTMLDivElement[] = [];
    const edgePoint = (a: number) => [IX + Math.cos(a) * 160, IY + Math.sin(a) * 160];
    for (let i = 0; i < SHARDS; i++) {
      const a1 = (i / SHARDS) * Math.PI * 2;
      const a2 = ((i + 1) / SHARDS) * Math.PI * 2;
      const am = (a1 + a2) / 2;
      const [x1, y1] = edgePoint(a1);
      const [x2, y2] = edgePoint(a2);
      const el = document.createElement("div");
      el.className = "liva-shard";
      el.style.cssText = "position:absolute;inset:0;will-change:transform,opacity;";
      el.style.clipPath = `polygon(${IX}% ${IY}%, ${x1}% ${y1}%, ${x2}% ${y2}%)`;
      el.dataset.dx = String(Math.cos(am));
      el.innerHTML =
        '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:radial-gradient(ellipse at 50% 30%, #1c0808 0%, #0A0A0A 70%);">' +
        '<div style="font-size:clamp(48px,11vw,130px);font-weight:800;letter-spacing:6px;color:transparent;-webkit-text-stroke:2px rgba(46,196,182,.35);user-select:none;">LIVA</div>' +
        '<div style="color:rgba(255,255,255,.35);letter-spacing:8px;font-size:clamp(12px,2vw,20px);font-weight:600;user-select:none;">SPOR KULÜBÜ</div></div>';
      glass.appendChild(el);
      shardEls.push(el);
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(
        { isMobile: "(max-width: 767px)", isDesktop: "(min-width: 768px)" },
        (mmCtx) => {
          const { isMobile } = mmCtx.conditions as { isMobile: boolean };
          // Animasyon scroll'a bağlı: kaydırdıkça ilerler, geri sarılabilir.
          // Sahne boyunca "kaydırmaya devam et" hatırlatıcısı görünür.
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: isMobile ? "+=1600" : "+=2400",
              scrub: 0.4,
              pin: true,
            },
          });

          tl.fromTo(".liva-kicker", { x: "-70vw", opacity: 0 }, { x: 0, opacity: 1, duration: 2, ease: "power2.out" })
            .to(".liva-kicker", { x: "-6vw", rotation: -11, scaleY: 0.93, scaleX: 1.05, duration: 1.5, ease: "power1.inOut" })
            .to(".liva-kicker", { x: isMobile ? "26vw" : "20vw", rotation: 15, scaleY: 1.04, scaleX: 1, duration: 0.7, ease: "power4.in" }, "kick")
            .to(".liva-impact", { opacity: 1, scale: 2.4, duration: 0.25 }, "kick+=0.55")
            .to(".liva-impact", { opacity: 0, scale: 3.4, duration: 0.45 }, "kick+=0.8")
            .fromTo(".liva-speedlines", { opacity: 0, x: -50 }, { opacity: 1, x: 50, duration: 0.5 }, "kick+=0.5")
            .to(".liva-speedlines", { opacity: 0, duration: 0.4 }, "kick+=1")
            .to(stage, {
              keyframes: [
                { x: -11, y: 5, duration: 0.05 }, { x: 10, y: -6, duration: 0.05 },
                { x: -7, y: 4, duration: 0.05 }, { x: 5, y: -3, duration: 0.05 },
                { x: 0, y: 0, duration: 0.07 },
              ],
            }, "kick+=0.6")
            .set(svg, { visibility: "visible", opacity: 1 }, "kick+=0.58")
            .to(paths, { strokeDashoffset: 0, duration: 0.9, stagger: 0.04, ease: "power3.out" }, "kick+=0.6")
            .to({}, { duration: 0.6 })
            .to(shardEls, {
              x: (_i: number, el: HTMLDivElement) => `${parseFloat(el.dataset.dx || "0") * (30 + Math.random() * 25)}vw`,
              y: "115vh",
              rotation: () => (Math.random() - 0.5) * 140,
              opacity: 0.15,
              duration: 3,
              stagger: { each: 0.18, from: "random" },
              ease: "power2.in",
            }, "fall")
            .to(svg, { opacity: 0, duration: 1 }, "fall+=0.8")
            // Mobilde figür splash yazısını kapatmasın: küçülüp sol alt köşeye çekilir
            .to(".liva-kicker", {
              x: isMobile ? "-30vw" : "-14vw",
              y: isMobile ? "12vh" : "6vh",
              scale: isMobile ? 0.45 : 0.68,
              opacity: isMobile ? 0.55 : 0.9,
              duration: 2,
              ease: "power1.inOut",
            }, "fall+=0.5")
            .fromTo(".liva-splash > *", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.6, stagger: 0.25 }, "fall+=1.2")
            .to(".liva-scroll-hint", { opacity: 0, duration: 0.6 }, "fall+=1")
            .to({}, { duration: 1 });
        }
      );
    }, stage);

    cleanup = () => {
      ctx.revert();
      glass.innerHTML = "";
      svg.innerHTML = "";
    };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  // Animasyon istemeyen kullanıcıya sade, statik tanıtım ekranı
  if (reduced) {
    return (
      <section aria-label="Hakkımızda tanıtım" className="relative w-full py-24 flex flex-col items-center justify-center text-center px-6"
        style={{ background: "linear-gradient(160deg,#8B1A1A 0%, #5e0f0f 45%, #2EC4B6 160%)" }}>
        <span className="text-teal font-extrabold text-sm tracking-[3px]">HAKKIMIZDA</span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3">Disiplin. Özgüven. Şampiyonluk.</h2>
      </section>
    );
  }

  return (
    <section ref={stageRef} aria-label="Taekwondo tekme geçişi" className="relative w-full h-[100dvh] overflow-hidden bg-dark">
      {/* Kırılan ekranın arkasından çıkan tanıtım */}
      <div className="liva-splash absolute inset-0 z-[1] flex flex-col items-center justify-center text-center px-6"
        style={{ background: "linear-gradient(160deg,#8B1A1A 0%, #5e0f0f 45%, #2EC4B6 160%)" }}>
        {/* Doku: ışın deseni + filigran + süzülen noktalar */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
          <div style={{
            position: "absolute", inset: "-25%",
            background: "repeating-conic-gradient(from 0deg at 50% 42%, rgba(255,255,255,.05) 0deg 7deg, transparent 7deg 22deg)",
          }} />
          <div style={{
            position: "absolute", bottom: "-4%", left: "50%", transform: "translateX(-50%)",
            fontSize: "clamp(120px,26vw,320px)", fontWeight: 800, letterSpacing: 10, lineHeight: 1,
            color: "transparent", WebkitTextStroke: "2px rgba(255,255,255,.08)", userSelect: "none",
          }}>LIVA</div>
          {[
            { top: "16%", left: "12%", size: 7, delay: 0, dur: 5.5 },
            { top: "28%", left: "86%", size: 5, delay: 1.2, dur: 6.3 },
            { top: "68%", left: "8%", size: 5, delay: 2.1, dur: 5.9 },
            { top: "74%", left: "90%", size: 7, delay: 0.7, dur: 6.7 },
            { top: "12%", left: "58%", size: 4, delay: 1.6, dur: 7.2 },
          ].map((p, i) => (
            <div key={i} style={{
              position: "absolute", top: p.top, left: p.left, width: p.size, height: p.size,
              borderRadius: "50%", background: "#2EC4B6",
              boxShadow: `0 0 ${p.size * 2}px ${p.size / 2}px rgba(46,196,182,.4)`,
              animation: `liva-float ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }} />
          ))}
        </div>
        <span className="relative inline-block bg-black/25 border border-teal/40 text-teal font-extrabold text-sm tracking-[3px] px-5 py-2 rounded-full backdrop-blur-sm">HAKKIMIZDA</span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-[-0.02em] leading-[1.1] mt-3 mb-4">
          Disiplin. Özgüven.<br />Şampiyonluk.
        </h2>
        <p className="max-w-xl text-white/80 leading-relaxed">
          Milli sporcu antrenörlerle cimnastik ve taekwondo eğitimi.
        </p>
        <a href="https://wa.me/905416445376" target="_blank" rel="noopener noreferrer"
          aria-label="WhatsApp ile iletişime geç"
          className="mt-6 inline-block bg-teal hover:bg-teal-light text-white font-bold px-8 py-4 rounded-2xl transition-colors active:scale-[0.97]">
          Ücretsiz Deneme Dersi
        </a>
      </div>

      {/* Kırılacak "cam" ekran (parçalar JS ile üretilir) */}
      <div ref={glassRef} className="absolute inset-0 z-[2]" />

      {/* Çatlaklar — darbe anına kadar tamamen gizli */}
      <svg ref={cracksRef} viewBox="0 0 100 100" preserveAspectRatio="none"
        className="absolute inset-0 z-[3] w-full h-full pointer-events-none"
        style={{ opacity: 0, visibility: "hidden", stroke: "#fff", strokeWidth: 2.2, fill: "none", filter: "drop-shadow(0 0 6px rgba(46,196,182,.9))" }}
        aria-hidden="true" />

      {/* Darbe flaşı */}
      <div className="liva-impact absolute z-[4] rounded-full"
        style={{
          width: 140, height: 140, opacity: 0, transform: "scale(.3)",
          left: `calc(${IX}vw - 70px)`, top: `calc(${IY}vh - 70px)`,
          background: "radial-gradient(circle,#fff 0%, #2EC4B6 35%, transparent 70%)",
        }} aria-hidden="true" />

      {/* Hız çizgileri */}
      <div className="liva-speedlines absolute z-[4]" aria-hidden="true"
        style={{ opacity: 0, width: "36vw", height: "16vh", left: "20vw", top: `calc(${IY}vh - 8vh)` }}>
        <i style={{ position: "absolute", top: "8%", left: 0, width: "80%", height: 5, borderRadius: 5, background: "linear-gradient(90deg,#2EC4B6,transparent)" }} />
        <i style={{ position: "absolute", top: "46%", left: "8%", width: "92%", height: 7, borderRadius: 5, background: "linear-gradient(90deg,#fff,transparent)" }} />
        <i style={{ position: "absolute", top: "82%", left: "4%", width: "70%", height: 5, borderRadius: 5, background: "linear-gradient(90deg,#2EC4B6,transparent)" }} />
      </div>

      {/* Kaydırma hatırlatıcısı — sahne boyunca görünür, sonda kaybolur */}
      <div className="liva-scroll-hint absolute bottom-5 left-1/2 -translate-x-1/2 z-[20] pointer-events-none">
        <span className="flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white/90 text-xs font-semibold tracking-[2px] uppercase px-5 py-2.5 rounded-full border border-teal/30 animate-pulse">
          <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
          Kaydırmaya devam et
        </span>
      </div>

      {/* DEV taekwondocu */}
      <div className="liva-kicker absolute bottom-0 left-[2vw] z-[5] h-[68vh] md:h-[92vh]"
        style={{ transformOrigin: "50% 88%", filter: "drop-shadow(0 14px 34px rgba(0,0,0,.55))" }}>
        <Image src="/images/taekwondo-guncel.webp" alt="Tekme atan taekwondocu"
          width={650} height={927} className="h-full w-auto max-w-[94vw] object-contain" draggable={false} />
      </div>
    </section>
  );
}
