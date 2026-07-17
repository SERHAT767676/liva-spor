"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#hakkimizda", label: "Hakkımızda" },
  { href: "#branslar", label: "Branşlar" },
  { href: "#programlar", label: "Ders Programı" },
  { href: "#galeri", label: "Galeri" },
  { href: "#iletisim", label: "İletişim" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        <a href="#hero" aria-label="Ana sayfaya dön" className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-md flex items-center justify-center">
            <Image
              src="/images/logo.jpg"
              alt="Liva Spor Kulübü logosu"
              width={40}
              height={40}
              className="w-full h-full object-contain scale-125"
            />
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                scrolled
                  ? "text-dark hover:text-teal"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="https://wa.me/905416445376"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ücretsiz deneme dersi için WhatsApp ile iletişime geç"
          className={`hidden md:block font-semibold text-sm px-6 py-2.5 rounded-lg transition-all duration-300 hover:scale-105 ${
            scrolled
              ? "bg-teal hover:bg-teal-light text-white shadow-md shadow-teal/20"
              : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
          }`}
        >
          Ücretsiz Deneme
        </a>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg"
          aria-label="Menüyü aç/kapat"
        >
          <div className="flex flex-col gap-1.5 w-6">
            <span
              className={`block h-0.5 rounded-full transition-all duration-300 ${
                scrolled ? "bg-dark" : "bg-white"
              } ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-0.5 rounded-full transition-all duration-300 ${
                scrolled ? "bg-dark" : "bg-white"
              } ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
            />
            <span
              className={`block h-0.5 rounded-full transition-all duration-300 ${
                scrolled ? "bg-dark" : "bg-white"
              } ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-white/98 backdrop-blur-md border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-5 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-dark font-medium py-3 px-4 rounded-xl hover:bg-gray-50 hover:text-teal transition-colors text-sm"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="https://wa.me/905416445376"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-3 bg-teal hover:bg-teal-light text-white font-bold py-4 px-4 rounded-xl text-center text-sm transition-colors"
              >
                Ücretsiz Deneme Dersi
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
