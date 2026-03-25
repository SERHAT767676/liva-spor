import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Liva Spor Kulübü | Cimnastik & Taekwondo - Başakşehir",
  description:
    "Liva Spor Kulübü - Başakşehir'de profesyonel cimnastik ve taekwondo eğitimi. Milli sporcu antrenörlerle geleceğin şampiyonlarını yetiştiriyoruz.",
  keywords: [
    "cimnastik",
    "taekwondo",
    "spor kulübü",
    "başakşehir",
    "liva spor",
    "çocuk spor",
  ],
  openGraph: {
    title: "Liva Spor Kulübü | Cimnastik & Taekwondo",
    description:
      "Başakşehir'de profesyonel cimnastik ve taekwondo eğitimi.",
    url: "https://livasporkulubu.com",
    siteName: "Liva Spor Kulübü",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
