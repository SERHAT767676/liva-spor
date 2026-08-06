"use client";

import { motion } from "framer-motion";

const faqs = [
  {
    q: "Çocuğum kaç yaşında başlayabilir?",
    a: "Gruplarımız yaşa ve seviyeye göre düzenlenir; öğrencilerimizin çoğu 4-12 yaş aralığındadır. Çocuğunuz için en uygun grubu belirlemek adına WhatsApp'tan bize yazmanız yeterli.",
  },
  {
    q: "Deneme dersi gerçekten ücretsiz mi?",
    a: "Evet! İlk deneme dersi tamamen ücretsizdir. Çocuğunuz branşı deneyimler, siz de salonumuzu ve antrenörlerimizi yakından tanırsınız — hiçbir taahhüt olmadan.",
  },
  {
    q: "Özel kıyafet veya ekipman gerekiyor mu?",
    a: "İlk dersler için rahat bir spor kıyafeti yeterlidir. Düzenli devam kararı sonrasında branşa özel kıyafet ve ekipman konusunda sizi biz yönlendiriyoruz.",
  },
  {
    q: "Dersler hangi gün ve saatlerde?",
    a: "Hafta içi 15:00–20:30, hafta sonu 10:00–17:00 aralığında seviyeye göre gruplar halinde ders yapılır. Güncel program ve uygun kontenjan için iletişime geçin.",
  },
  {
    q: "Jimnastik mi cimnastik mi? İkisi aynı şey mi?",
    a: "İkisi de aynı sporu ifade eder. Günlük dilde 'jimnastik' yazımı daha yaygındır; Türkiye Cimnastik Federasyonu ise resmî olarak 'cimnastik' yazımını kullanır. Yani Ispartakule veya Başakşehir'de jimnastik kursu arıyorsanız doğru yerdesiniz — kulübümüzde federasyon standartlarında cimnastik eğitimi veriyoruz.",
  },
  {
    q: "Salonunuz nerede? Hangi bölgelere yakınsınız?",
    a: "Salonumuz Başakşehir Ispartakule bölgesinde, Şahintepe Muratdere Caddesi üzerindedir. Ispartakule, Bahçeşehir ve çevresinden ulaşım oldukça kolaydır — cimnastik ve taekwondo (tekvando) derslerimiz için yol tarifini WhatsApp'tan anında gönderebiliriz.",
  },
  {
    q: "Kayıt için ne yapmam gerekiyor?",
    a: "WhatsApp'tan mesaj atmanız yeterli — deneme dersinizi planlayalım, sorularınızı yanıtlayalım. Dilerseniz salonumuza gelip yerinde de görüşebilirsiniz.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq() {
  return (
    <section id="sss" className="w-full py-24 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-primary/10 text-primary border border-primary/25 font-bold text-xs tracking-[3px] uppercase px-5 py-2 rounded-full">
            SSS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-dark tracking-[-0.015em] mt-3">
            Merak <span className="text-primary">Edilenler</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <motion.details
              key={f.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group rounded-2xl bg-gray-light border border-black/5 open:border-teal/30 open:shadow-lg open:shadow-teal/5 transition-[border-color,box-shadow] duration-300"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 font-semibold text-dark transition-colors duration-150 active:bg-black/5 [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="shrink-0 w-8 h-8 rounded-full bg-teal/10 text-teal-text flex items-center justify-center transition-transform duration-300 group-open:rotate-45 text-xl font-bold">
                  +
                </span>
              </summary>
              <p className="px-6 pb-5 text-gray leading-relaxed text-sm sm:text-base">
                {f.a}
              </p>
            </motion.details>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-gray text-sm mt-8"
        >
          Başka sorunuz mu var?{" "}
          <a
            href="https://wa.me/905416445376"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-text font-semibold hover:underline active:opacity-70"
          >
            WhatsApp&apos;tan sorun
          </a>{" "}
          — genellikle dakikalar içinde yanıtlıyoruz.
        </motion.p>
      </div>
    </section>
  );
}
