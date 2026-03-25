"use client";

export default function Branches() {
  return (
    <section id="branslar" className="py-24 bg-gray-light">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-teal font-semibold text-sm tracking-widest uppercase">
            Branşlarımız
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-dark mt-3">
            İki Güçlü <span className="text-primary">Branş</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl mx-auto items-stretch">
          {/* Sol - Cimnastik */}
          <div className="group relative h-[500px] sm:h-[600px] rounded-3xl overflow-hidden cursor-pointer">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center brightness-110 transition-transform duration-700 group-hover:scale-105"
            >
              <source src="/videos/cimnastik.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500" />
            <div className="relative z-10 h-full flex flex-col justify-end p-8 sm:p-10">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 drop-shadow-lg">
                Cimnastik
              </h3>
              <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-sm mb-6 drop-shadow">
                Esneklik, güç ve zarafetin buluştuğu cimnastik eğitimiyle
                çocuğunuzun koordinasyon, denge ve özgüvenini geliştiriyoruz.
              </p>
              <a
                href="https://wa.me/905416445376"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cimnastik hakkında WhatsApp ile bilgi al"
                className="inline-flex items-center gap-2 w-fit font-semibold text-sm px-6 py-3 rounded-xl bg-teal hover:bg-teal-light text-white transition-all duration-300"
              >
                Bilgi Al
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Sağ - Taekwondo */}
          <div className="group relative h-[500px] sm:h-[600px] rounded-3xl overflow-hidden cursor-pointer">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center brightness-110 transition-transform duration-700 group-hover:scale-105"
            >
              <source src="/videos/taekwondo.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500" />
            <div className="relative z-10 h-full flex flex-col justify-end p-8 sm:p-10">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 drop-shadow-lg">
                Taekwondo
              </h3>
              <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-sm mb-6 drop-shadow">
                Disiplin, saygı ve savunma becerilerini kazandıran taekwondo
                eğitimimizle çocuğunuzun bedensel ve ruhsal gelişimini destekliyoruz.
              </p>
              <a
                href="https://wa.me/905416445376"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Taekwondo hakkında WhatsApp ile bilgi al"
                className="inline-flex items-center gap-2 w-fit font-semibold text-sm px-6 py-3 rounded-xl bg-primary hover:bg-primary-light text-white transition-all duration-300"
              >
                Bilgi Al
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
