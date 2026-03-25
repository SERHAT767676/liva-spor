export default function Footer() {
  return (
    <footer className="bg-dark-light border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-white/30 text-sm">
          &copy; {new Date().getFullYear()} Liva Spor Kulübü. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
