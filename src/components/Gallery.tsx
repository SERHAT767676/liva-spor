"use client";

export default function Gallery() {
  const items = [
    { label: "Cimnastik Antrenman", span: "col-span-2 row-span-2" },
    { label: "Taekwondo Müsabaka", span: "" },
    { label: "Salon", span: "" },
    { label: "Grup Çalışması", span: "" },
    { label: "Madalya Töreni", span: "" },
    { label: "Esneklik Çalışması", span: "col-span-2" },
  ];

  return (
    <section id="galeri" className="py-24 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold font-semibold text-sm tracking-widest uppercase">
            Galeri
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mt-3">
            Anlarımız <span className="text-gold">Kareler</span>de
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mt-6 rounded-full" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px] md:auto-rows-[200px]">
          {items.map((item) => (
            <div
              key={item.label}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-dark/5 to-dark/15 cursor-pointer ${item.span}`}
            >
              {/* Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-dark/10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                  />
                </svg>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/80 transition-all duration-300 flex items-center justify-center">
                <span className="text-dark font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray text-sm mt-8">
          * Galeri fotoğrafları yakında eklenecektir.
        </p>
      </div>
    </section>
  );
}
