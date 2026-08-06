import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Yerel ağdaki telefondan dev sunucusuna erişim için. Yalnızca `next dev`
  // sırasında geçerlidir, üretim yapısını ve canlı siteyi etkilemez.
  // NOT: Bunlar bu makinenin yerel IP'leri. IP değişirse (modem yeniden
  // başlatılınca, başka ağa bağlanınca, DHCP yenileyince) buradaki değerleri
  // güncelle — yoksa telefonda sayfa açılır ama JS engellenir: butonlar
  // tepkisiz kalır, animasyonlar çalışmaz. Güncel IP: ipconfig
  allowedDevOrigins: ["192.168.1.66", "192.168.1.2"],
};

export default nextConfig;
