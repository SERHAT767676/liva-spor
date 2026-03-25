export default function Trainers() {
  const trainers = [
    {
      name: "Antrenör 1",
      role: "Baş Antrenör - Cimnastik",
      badge: "Milli Sporcu",
    },
    {
      name: "Antrenör 2",
      role: "Baş Antrenör - Taekwondo",
      badge: "Milli Sporcu",
    },
    {
      name: "Antrenör 3",
      role: "Yardımcı Antrenör - Cimnastik",
      badge: "Lisanslı",
    },
    {
      name: "Antrenör 4",
      role: "Yardımcı Antrenör - Taekwondo",
      badge: "Lisanslı",
    },
  ];

  return (
    <section id="antrenorler" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold font-semibold text-sm tracking-widest uppercase">
            Kadromuz
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mt-3">
            Uzman <span className="text-gold">Antrenörler</span>
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mt-6 rounded-full" />
        </div>

        {/* Trainer Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((trainer) => (
            <div
              key={trainer.name}
              className="group relative overflow-hidden rounded-2xl bg-gray-light hover:shadow-xl transition-all duration-300"
            >
              {/* Placeholder Photo */}
              <div className="aspect-[3/4] bg-gradient-to-b from-dark/5 to-dark/20 flex items-center justify-center">
                <svg
                  className="w-20 h-20 text-dark/10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>

              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark via-dark/90 to-transparent p-6 pt-16">
                <span className="inline-block bg-gold/20 text-gold text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  {trainer.badge}
                </span>
                <h3 className="text-lg font-bold text-white">{trainer.name}</h3>
                <p className="text-white/60 text-sm">{trainer.role}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray text-sm mt-8">
          * Antrenör fotoğrafları ve isimleri yakında eklenecektir.
        </p>
      </div>
    </section>
  );
}
