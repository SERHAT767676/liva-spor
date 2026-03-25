"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-md flex items-center justify-center">
            <img
              src="/images/logo.jpg"
              alt="Liva Spor Kulübü"
              className="w-full h-full object-contain scale-125"
            />
          </div>
        </a>

        {/* CTA */}
        <a
          href="#iletisim"
          className={`font-semibold text-sm px-6 py-2.5 rounded-lg transition-all duration-300 ${
            scrolled
              ? "bg-primary hover:bg-primary-light text-white"
              : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
          }`}
        >
          İletişim
        </a>
      </div>
    </nav>
  );
}
