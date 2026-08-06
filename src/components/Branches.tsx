"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Videolar görünür olana kadar indirilmez — açılışta bant genişliğini hero'ya bırakır
function LazyVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          video.src = src;
          video.play().catch(() => {});
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      loop
      muted
      playsInline
      preload="none"
      poster={poster}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover object-center brightness-105"
    />
  );
}

// Premium cam çerçeve — içi boş, video arkasında akmaya devam eder
function GlassFrame({ accent }: { accent: string }) {
  const corner: React.CSSProperties = {
    position: "absolute",
    width: 26,
    height: 26,
    borderColor: accent,
    borderStyle: "solid",
    borderWidth: 0,
    filter: `drop-shadow(0 0 6px ${accent})`,
  };
  return (
    <div
      aria-hidden="true"
      className="absolute inset-3 z-[9] pointer-events-none rounded-2xl"
      style={{
        border: "1px solid rgba(255,255,255,.35)",
        boxShadow: "inset 0 0 28px rgba(255,255,255,.07), inset 0 0 2px rgba(255,255,255,.25)",
      }}
    >
      <span style={{ ...corner, top: -2, left: -2, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 16 }} />
      <span style={{ ...corner, top: -2, right: -2, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 16 }} />
      <span style={{ ...corner, bottom: -2, left: -2, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 16 }} />
      <span style={{ ...corner, bottom: -2, right: -2, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 16 }} />
    </div>
  );
}

function handleTilt(e: React.MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  e.currentTarget.style.transform = `perspective(1200px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
  e.currentTarget.style.transition = "transform 0.06s linear";
}

function resetTilt(e: React.MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg)";
  e.currentTarget.style.transition = "transform 0.6s ease";
}

export default function Branches() {
  return (
    <section id="branslar" className="w-full py-24 bg-gray-light">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-teal/10 text-teal-dark border border-teal/25 font-bold text-xs tracking-[3px] uppercase px-5 py-2 rounded-full">
            Branşlarımız
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-dark mt-3">
            İki Güçlü <span className="text-primary">Branş</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl mx-auto items-stretch">

          {/* Cimnastik — video solda TAM BOY (kırpılmaz), turkuaz panel sağda */}
          <div
            className="sm:h-[520px] lg:h-[620px] cursor-pointer"
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="group relative w-full h-full rounded-3xl overflow-hidden flex flex-col sm:flex-row shadow-xl shadow-teal/15 border border-teal/20"
              style={{ background: "linear-gradient(135deg, #1FA89B 0%, #2EC4B6 60%, #3DD5C7 100%)" }}
            >
              {/* Video sütunu — 9:16 oranında, hiç kırpılmadan */}
              <div className="relative w-full aspect-[9/16] sm:w-auto sm:h-full sm:aspect-[9/16] shrink-0 overflow-hidden rounded-b-none sm:rounded-r-3xl">
                <LazyVideo src="/videos/cimnastik2-opt.mp4" poster="/videos/cimnastik2-poster.webp" />
                <GlassFrame accent="rgba(46,196,182,.85)" />
                <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-teal-dark font-bold text-xs tracking-[2px] uppercase px-4 py-2 rounded-full shadow-lg">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                  </svg>
                  Cimnastik
                </span>
              </div>

              {/* Bilgi paneli */}
              <div className="relative flex-1 p-6 sm:p-8 text-white flex flex-col justify-center min-h-[260px]">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden"
                  style={{ background: "repeating-conic-gradient(from 0deg at 110% -10%, rgba(255,255,255,.25) 0deg 6deg, transparent 6deg 20deg)" }} />

                {/* Maskot */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-2 right-2 sm:right-3 w-20 sm:w-28 pointer-events-none"
                  style={{
                    aspectRatio: "1/1",
                    background: "url('/images/cimnastik.webp') no-repeat right center / 200% auto",
                    filter: "drop-shadow(0 8px 16px rgba(0,0,0,.3))",
                    animation: "liva-bob 3.2s ease-in-out infinite",
                  }}
                />

                <motion.div
                  className="relative pb-16 sm:pb-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 drop-shadow">
                    Esneklik · Güç · Zarafet
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Denge", "Esneklik", "Koordinasyon"].map((f) => (
                      <span key={f} className="inline-flex items-center gap-1.5 bg-white/20 border border-white/30 text-white font-semibold text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        {f}
                      </span>
                    ))}
                  </div>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-5">
                    Cimnastik eğitimiyle çocuğunuzun koordinasyon, denge ve
                    özgüvenini geliştiriyoruz.
                  </p>
                  <a
                    href="https://wa.me/905416445376"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Cimnastik hakkında WhatsApp ile bilgi al"
                    className="inline-flex items-center gap-2 w-fit font-bold text-sm px-6 py-3 rounded-xl bg-white text-teal-dark hover:bg-gray-light transition-all duration-300 hover:scale-105 active:scale-[0.97] shadow-lg"
                  >
                    Bilgi Al
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Taekwondo — ayna düzen: video sağda TAM BOY, kırmızı panel solda */}
          <div
            className="sm:h-[520px] lg:h-[620px] cursor-pointer"
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="group relative w-full h-full rounded-3xl overflow-hidden flex flex-col sm:flex-row-reverse shadow-xl shadow-primary/15 border border-primary/20"
              style={{ background: "linear-gradient(315deg, #A52525 0%, #8B1A1A 55%, #6d1414 100%)" }}
            >
              {/* Video sütunu */}
              <div className="relative w-full aspect-[9/16] sm:w-auto sm:h-full sm:aspect-[9/16] shrink-0 overflow-hidden rounded-b-none sm:rounded-l-3xl">
                <LazyVideo src="/videos/taekwondo-opt.mp4" poster="/videos/taekwondo-poster.webp" />
                <GlassFrame accent="rgba(255,255,255,.8)" />
                <span className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-primary font-bold text-xs tracking-[2px] uppercase px-4 py-2 rounded-full shadow-lg">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13 2 3 14h6l-2 8 10-12h-6l2-8z" />
                  </svg>
                  Taekwondo
                </span>
              </div>

              {/* Bilgi paneli */}
              <div className="relative flex-1 p-6 sm:p-8 text-white flex flex-col justify-center min-h-[260px]">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden"
                  style={{ background: "repeating-linear-gradient(-55deg, rgba(255,255,255,.22) 0 3px, transparent 3px 26px)" }} />

                {/* Maskot */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-2 left-3 sm:left-4 w-16 sm:w-24 pointer-events-none"
                  style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,.35))", animation: "liva-bob 3.6s ease-in-out .4s infinite reverse" }}
                >
                  <Image src="/images/taekwondo-guncel.webp" alt="" width={650} height={927}
                    className="w-full h-auto" draggable={false} />
                </div>

                <motion.div
                  className="relative pb-16 sm:pb-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 drop-shadow">
                    Disiplin · Saygı · Güç
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Disiplin", "Özgüven", "Savunma"].map((f) => (
                      <span key={f} className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white font-semibold text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        {f}
                      </span>
                    ))}
                  </div>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-5">
                    Taekwondo eğitimiyle çocuğunuzun bedensel ve ruhsal
                    gelişimini destekliyoruz.
                  </p>
                  <a
                    href="https://wa.me/905416445376"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Taekwondo hakkında WhatsApp ile bilgi al"
                    className="inline-flex items-center gap-2 w-fit font-bold text-sm px-6 py-3 rounded-xl bg-white text-primary hover:bg-gray-light transition-all duration-300 hover:scale-105 active:scale-[0.97] shadow-lg"
                  >
                    Bilgi Al
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
