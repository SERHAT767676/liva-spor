export default function Programs() {
  const schedule = [
    {
      day: "Pazartesi",
      classes: [
        { time: "15:00 - 16:00", branch: "Cimnastik", level: "Minikler" },
        { time: "16:00 - 17:30", branch: "Cimnastik", level: "Yıldızlar" },
        { time: "17:30 - 19:00", branch: "Taekwondo", level: "Tüm Seviyeler" },
      ],
    },
    {
      day: "Salı",
      classes: [
        { time: "15:00 - 16:00", branch: "Taekwondo", level: "Minikler" },
        { time: "16:00 - 17:30", branch: "Taekwondo", level: "Yıldızlar" },
        { time: "17:30 - 19:00", branch: "Cimnastik", level: "Tüm Seviyeler" },
      ],
    },
    {
      day: "Çarşamba",
      classes: [
        { time: "15:00 - 16:00", branch: "Cimnastik", level: "Minikler" },
        { time: "16:00 - 17:30", branch: "Cimnastik", level: "Yıldızlar" },
        { time: "17:30 - 19:00", branch: "Taekwondo", level: "Tüm Seviyeler" },
      ],
    },
    {
      day: "Perşembe",
      classes: [
        { time: "15:00 - 16:00", branch: "Taekwondo", level: "Minikler" },
        { time: "16:00 - 17:30", branch: "Taekwondo", level: "Yıldızlar" },
        { time: "17:30 - 19:00", branch: "Cimnastik", level: "Tüm Seviyeler" },
      ],
    },
    {
      day: "Cuma",
      classes: [
        { time: "15:00 - 16:30", branch: "Cimnastik", level: "Müsabaka Grubu" },
        { time: "16:30 - 18:00", branch: "Taekwondo", level: "Müsabaka Grubu" },
      ],
    },
  ];

  return (
    <section id="programlar" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold font-semibold text-sm tracking-widest uppercase">
            Ders Programı
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mt-3">
            Haftalık <span className="text-gold">Program</span>
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mt-6 rounded-full" />
        </div>

        {/* Schedule Grid */}
        <div className="grid md:grid-cols-5 gap-4">
          {schedule.map((day) => (
            <div
              key={day.day}
              className="rounded-2xl border border-gray-light overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Day Header */}
              <div className="bg-dark text-white text-center py-4 font-bold text-sm tracking-wide">
                {day.day}
              </div>

              {/* Classes */}
              <div className="p-4 flex flex-col gap-3">
                {day.classes.map((cls) => (
                  <div
                    key={cls.time + cls.branch}
                    className={`rounded-xl p-3 text-center ${
                      cls.branch === "Cimnastik"
                        ? "bg-gold/10 border border-gold/20"
                        : "bg-red/10 border border-red/20"
                    }`}
                  >
                    <div
                      className={`text-xs font-bold ${
                        cls.branch === "Cimnastik" ? "text-gold-dark" : "text-red"
                      }`}
                    >
                      {cls.branch}
                    </div>
                    <div className="text-dark font-semibold text-sm mt-1">
                      {cls.time}
                    </div>
                    <div className="text-gray text-xs mt-0.5">{cls.level}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray text-sm mt-8">
          * Program değişiklik gösterebilir. Güncel bilgi için iletişime geçin.
        </p>
      </div>
    </section>
  );
}
