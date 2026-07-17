const items = [
  "CİMNASTİK",
  "TAEKWONDO",
  "BAŞAKŞEHİR",
  "MİLLİ ANTRENÖRLER",
  "ÜCRETSİZ DENEME DERSİ",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span className="px-6 sm:px-8 text-white/75 font-bold tracking-[4px] text-xs sm:text-sm whitespace-nowrap">
            {t}
          </span>
          <span className="text-teal text-base" aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section
      aria-hidden="true"
      className="w-full bg-dark border-y border-white/10 py-4 overflow-hidden"
    >
      <div className="liva-marquee flex w-max">
        <Row />
        <Row />
      </div>
    </section>
  );
}
