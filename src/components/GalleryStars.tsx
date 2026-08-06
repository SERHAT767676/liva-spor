"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const filters = ["Tümü", "Cimnastik", "Taekwondo"];

const items = [
  { label: "Cimnastik Antrenman", branch: "Cimnastik", src: "/images/cm1.webp", span: "col-span-2 row-span-2" },
  { label: "Taekwondo Müsabaka",  branch: "Taekwondo", src: "/images/t1.webp",  span: "" },
  { label: "Taekwondo Antrenman", branch: "Taekwondo", src: "/images/t2.webp",  span: "" },
  { label: "Cimnastik Çalışması", branch: "Cimnastik", src: "/images/cm2.webp", span: "" },
  { label: "Taekwondo Grup",      branch: "Taekwondo", src: "/images/t3.webp",  span: "" },
  { label: "Cimnastik Gösteri",   branch: "Cimnastik", src: "/images/cm3.webp", span: "col-span-2" },
];

const branchColor: Record<string, string> = {
  Cimnastik: "bg-teal/80",
  Taekwondo: "bg-primary/80",
};

// Her kart için sabit yıldız pozisyonları (yüzde olarak).
// dx/dy: kaybolurken saçılma yönü — kartın merkezinden dışa doğru.
// Sabit değerler; render sırasında rastgele üretilmemeli (hidrasyon uyuşmazlığı
// ve her render'da değişen davranış riski).
const STAR_CONFIGS = [
  { top: 15, left: 20, size: 14, delay: 0,    rot: 20,  dx: -52, dy: -58 },
  { top: 30, left: 75, size: 10, delay: 0.08, rot: -15, dx: 44,  dy: -34 },
  { top: 60, left: 15, size: 12, delay: 0.04, rot: 45,  dx: -58, dy: 18  },
  { top: 70, left: 80, size: 9,  delay: 0.12, rot: -30, dx: 50,  dy: 36  },
  { top: 45, left: 50, size: 11, delay: 0.06, rot: 10,  dx: 8,   dy: -12 },
  { top: 10, left: 55, size: 8,  delay: 0.1,  rot: -50, dx: 14,  dy: -56 },
  { top: 80, left: 45, size: 10, delay: 0.14, rot: 35,  dx: -16, dy: 52  },
];

function StarIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

function GalleryCard({
  item,
  dokunmaAcik,
  onDokun,
}: {
  item: typeof items[0];
  dokunmaAcik: boolean;
  onDokun: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  // Dokunmatikte parmak kalkınca etiket kaybolmasın: dokunuş durumu kilitler.
  // Hover yalnızca gerçek fareyle çalışsın — dokunuşun ürettiği sahte hover
  // takılı kalıyordu.
  const acik = hovered || dokunmaAcik;

  return (
    <div
      className="group relative w-full h-full overflow-hidden rounded-2xl cursor-pointer"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setHovered(false);
      }}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse") onDokun();
      }}
    >
      {/* Fotoğraf */}
      <Image
        src={item.src}
        alt={item.label}
        fill
        className="object-cover"
        style={{
          filter: acik ? "blur(0px) brightness(1)" : "blur(2.5px) brightness(0.85)",
          transform: acik ? "scale(1.06)" : "scale(1)",
          transition: "filter 0.45s ease, transform 0.5s ease",
        }}
        sizes="(max-width: 768px) 50vw, 25vw"
      />

      {/* Hafif koyu overlay (yıldız göründüğünde daha iyi kontrast) */}
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{
          background: acik ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.18)",
        }}
      />

      {/* Yıldızlar */}
      <AnimatePresence>
        {!acik &&
          STAR_CONFIGS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.9, 0.7, 1, 0.8],
                scale: [0, 1.1, 0.9, 1, 0.95],
                rotate: [0, s.rot, s.rot * 0.5, s.rot],
              }}
              exit={{
                opacity: 0,
                scale: 0,
                x: s.dx,
                y: s.dy,
                rotate: s.rot * 4,
                transition: { duration: 0.4, delay: s.delay },
              }}
              transition={{
                duration: 0.5,
                delay: s.delay + 0.1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1.5 + i * 0.3,
              }}
              style={{
                position: "absolute",
                top: `${s.top}%`,
                left: `${s.left}%`,
                color: i % 3 === 0 ? "#2EC4B6" : i % 3 === 1 ? "#ffffff" : "#FFD700",
                filter: "drop-shadow(0 0 4px currentColor)",
                pointerEvents: "none",
              }}
            >
              <StarIcon size={s.size} />
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Hover label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span
          className="text-white font-bold text-sm drop-shadow transition-opacity duration-300"
          style={{ opacity: acik ? 1 : 0 }}
        >
          {item.label}
        </span>
        <span
          className={`text-white text-xs font-semibold px-3 py-1 rounded-full transition-opacity duration-300 ${branchColor[item.branch]}`}
          style={{ opacity: acik ? 1 : 0 }}
        >
          {item.branch}
        </span>
      </div>
    </div>
  );
}

export default function GalleryStars() {
  const [active, setActive] = useState("Tümü");
  // Dokunmatikte aynı anda tek kart açık kalsın
  const [dokunulan, setDokunulan] = useState<string | null>(null);
  const filtered = active === "Tümü" ? items : items.filter((i) => i.branch === active);

  return (
    <section id="galeri" className="w-full py-24 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-teal/10 text-teal-dark border border-teal/25 font-bold text-xs tracking-[3px] uppercase px-5 py-2 rounded-full">
            Galeri
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-dark tracking-[-0.015em] mt-3">
            Fotoğraf <span className="text-primary">Galerisi</span>
          </h2>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="flex justify-center gap-2 mb-10"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              aria-pressed={active === f}
              className={`inline-flex items-center justify-center min-h-11 px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-300 active:scale-95 ${
                active === f
                  ? "bg-teal text-white shadow-lg shadow-teal/25 scale-105"
                  : "bg-white text-gray hover:text-dark hover:shadow-md"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 auto-rows-[140px] sm:auto-rows-[180px] md:auto-rows-[200px]"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.label}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.3 }}
                className={`relative ${item.span}`}
              >
                <GalleryCard
                  item={item}
                  dokunmaAcik={dokunulan === item.label}
                  onDokun={() =>
                    setDokunulan((v) => (v === item.label ? null : item.label))
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
