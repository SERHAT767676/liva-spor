"use client";

import { motion } from "framer-motion";

const scheduleCards = [
  {
    title: "Hafta İçi",
    subtitle: "Pazartesi — Cuma",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    items: [
      { branch: "Cimnastik", time: "15:00 – 20:30", color: "teal" },
      { branch: "Taekwondo", time: "15:00 – 20:30", color: "primary" },
    ],
    note: "Seviyeye göre gruplar halinde",
    accent: "teal",
  },
  {
    title: "Haftasonu",
    subtitle: "Cumartesi — Pazar",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
    items: [
      { branch: "Cimnastik", time: "10:00 – 17:00", color: "teal" },
      { branch: "Taekwondo", time: "10:00 – 17:00", color: "primary" },
    ],
    note: "Yoğunlaştırılmış antrenman & müsabaka hazırlığı",
    accent: "primary",
  },
];

export default function Programs() {
  return (
    <section id="programlar" className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-primary/10 text-primary border border-primary/25 font-bold text-xs tracking-[3px] uppercase px-5 py-2 rounded-full">
            Ders Programı
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-dark mt-3">
            Haftalık <span className="text-primary">Program</span>
          </h2>
          <p className="text-gray mt-4 max-w-xl mx-auto text-base leading-relaxed">
            Dersler hafta içi ve haftasonu düzenlenmektedir. Güncel program ve
            uygun grup için bizimle iletişime geçin.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {scheduleCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="rounded-3xl bg-gray-light p-8 flex flex-col gap-6 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Header */}
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                    card.accent === "teal"
                      ? "bg-teal/10 text-teal"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark">{card.title}</h3>
                  <p className="text-gray text-sm">{card.subtitle}</p>
                </div>
              </div>

              {/* Branch rows */}
              <div className="flex flex-col gap-3">
                {card.items.map((item) => (
                  <div
                    key={item.branch}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border ${
                      item.color === "teal"
                        ? "bg-teal/5 border-teal/20"
                        : "bg-primary/5 border-primary/20"
                    }`}
                  >
                    <span
                      className={`font-semibold text-sm ${
                        item.color === "teal" ? "text-teal-dark" : "text-primary"
                      }`}
                    >
                      {item.branch}
                    </span>
                    <span className="text-dark font-medium text-sm">{item.time}</span>
                  </div>
                ))}
              </div>

              {/* Note */}
              <p className="text-gray text-xs leading-relaxed border-t border-black/5 pt-4">
                {card.note}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <p className="text-gray text-sm mb-4">
            Program değişiklik gösterebilir. Güncel bilgi için iletişime geçin.
          </p>
          <a
            href="https://wa.me/905416445376"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-teal hover:bg-teal-light text-white font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-teal/20"
          >
            Kayıt için İletişime Geç
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
