"use client";

import { motion, type Variants } from "framer-motion";

const features = [
  {
    icon: (
      <svg className="w-7 h-7" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg>
    ),
    title: "Cimnastik",
    desc: "Esneklik, güç ve zarafet",
    accent: "teal",
  },
  {
    icon: (
      <svg className="w-7 h-7" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
    title: "Taekwondo",
    desc: "Disiplin, saygı ve özgüven",
    accent: "primary",
  },
  {
    icon: (
      <svg className="w-7 h-7" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    title: "Başakşehir",
    desc: "İstanbul'un kalbinde",
    accent: "teal",
  },
  {
    icon: (
      <svg className="w-7 h-7" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
      </svg>
    ),
    title: "Milli Antrenörler",
    desc: "Uzman eğitim kadrosu",
    accent: "primary",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: i * 0.06 },
  }),
};

export default function About() {
  return (
    <section id="hakkimizda" className="w-full py-24 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center justify-center text-center mb-16"
        >
          <span className="inline-block bg-teal/10 text-teal-dark border border-teal/25 font-bold text-xs tracking-[3px] uppercase px-5 py-2 rounded-full">
            Hakkımızda
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-dark tracking-[-0.015em] mt-3 mb-6">
            Sporun Gücüne <span className="text-primary">İnanıyoruz</span>
          </h2>
          <p className="text-gray text-lg leading-relaxed max-w-2xl">
            Liva Spor Kulübü olarak, Başakşehir Ispartakule&apos;de cimnastik ve
            taekwondo branşlarında profesyonel eğitim veriyoruz. Milli sporcu
            antrenörlerimiz eşliğinde, çocuklarınızın hem fiziksel hem de
            zihinsel gelişimini destekliyoruz.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group flex flex-col items-center text-center p-6 rounded-2xl bg-gray-light hover:shadow-xl transition-shadow duration-300 cursor-default"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300 ${
                  feature.accent === "teal"
                    ? "bg-teal/10 text-teal group-hover:bg-teal group-hover:text-white"
                    : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                }`}
              >
                {feature.icon}
              </div>
              <h3 className="font-bold text-dark text-base mb-1">{feature.title}</h3>
              <p className="text-gray text-sm leading-snug">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
